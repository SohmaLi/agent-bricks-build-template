#!/usr/bin/env python3
"""
scripts/lib/wp_login.py
Đăng nhập WordPress + nạp trang nhanh cho mọi script Playwright (screenshot, zoom evidence,
gate mobile/line-clamp, và script tạm agent tự viết trong phiên).

Hỗ trợ site có lớp bảo vệ trước form login (vd. vietnix.vn):
    WP_FIREWALL       URL trang login riêng (slug ẩn thay cho /wp-login.php). Bỏ trống → <WP_URL>/wp-login.php
    WP_FIREWALL_USER  \\  HTTP Basic Auth (openresty "Authorized Only") chặn trước form login.
    WP_FIREWALL_PASS  /  Bỏ trống → không gửi Basic Auth.

Tối ưu tốc độ (2026-11-09, đo trên stag: 1 lần chụp 18s → ~5s):
  * Phiên đăng nhập được LƯU (storage_state) vào scratch/.wp_session/ và dùng lại giữa các
    script/lần chạy trong SESSION_MAX_AGE. Trước khi dùng lại luôn xác thực bằng
    GET /wp-admin/profile.php (200 = còn login, 302 = hết hạn → login lại) để không bao giờ
    chụp nhầm trang chủ (template chưa public bị 301 về home khi mất login).
  * Login chỉ chờ tới lúc redirect commit (cookie đã set) — KHÔNG chờ /wp-admin/ tải xong
    (dashboard không bao giờ đạt networkidle → trước đây mất trọn 5s timeout mỗi lần).
  * goto_settled() chờ font + ảnh ĐANG HIỂN THỊ thay cho networkidle/sleep cố định
    (ảnh lazy trong header/footer/menu ẩn không bao giờ load → chờ "mọi ảnh" là kẹt timeout).
  * prepare_context() chặn tracker/chat bên thứ ba (GTM, FB, Crisp, ads, Gravatar).

Usage (khuyến nghị — 1 browser cho mọi viewport/section):
    from lib.wp_login import new_wp_page, goto_settled
    browser = p.chromium.launch(headless=True)
    page = new_wp_page(browser, 1440, 900)          # context + chặn tracker + login (dùng lại phiên)
    goto_settled(page, url)                         # load + font + ảnh hiển thị; KHÔNG cần wait_for_timeout
    page.screenshot(path=..., full_page=True)
    page.context.close()

Usage (tương thích cũ):
    context = browser.new_context(viewport=..., **browser_context_kwargs())
    page = context.new_page()
    wp_login(page)   # raise RuntimeError nếu không đăng nhập được
"""

import hashlib
import json
import os
import re
import time
from pathlib import Path
from urllib.parse import urlsplit

from .bricks_mcp import _get_config

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SESSION_DIR = PROJECT_ROOT / 'scratch' / '.wp_session'   # gitignored (scratch/), xoá khi CLEANUP
SESSION_MAX_AGE = 6 * 3600                               # giây; cookie WP sống 48h, giữ ngắn cho chắc

BLOCKED_HOSTS = (
    'googletagmanager.com', 'google-analytics.com', 'googlesyndication.com', 'doubleclick.net',
    'googleadservices.com', 'connect.facebook.net', 'facebook.com', 'crisp.chat',
    'gravatar.com', 'hotjar.com', 'clarity.ms', 'tiktok.com', 'zalo.me',
)
_BLOCK_RE = re.compile(r'^https?://([^/]*\.)?(' + '|'.join(re.escape(h) for h in BLOCKED_HOSTS) + r')(:\d+)?/')

# Chờ font + ảnh đang hiển thị + 2 frame. Ảnh trong phần tử ẩn bị bỏ qua (lazy → không bao giờ load).
_SETTLE_JS = """async (maxImgMs) => {
  try { await document.fonts.ready; } catch (e) {}
  const vis = [...document.images].filter(i => !i.complete && i.getClientRects().length && i.offsetWidth > 0);
  vis.forEach(i => { i.loading = 'eager'; });
  await Promise.all(vis.map(i => new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, maxImgMs); })));
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  return vis.length;
}"""

_verified_session = None   # (path, mtime) đã xác thực còn login trong process này


def _wp_url() -> str:
    return _get_config('WP_URL', 'http://localhost:8000').rstrip('/')


def login_url() -> str:
    return _get_config('WP_FIREWALL') or f"{_wp_url()}/wp-login.php"


def has_credentials() -> bool:
    return bool(_get_config('WP_USER') and _get_config('WP_PASS'))


def _session_path() -> Path:
    key = hashlib.sha1(f"{_wp_url()}|{_get_config('WP_USER') or ''}".encode()).hexdigest()[:12]
    return SESSION_DIR / f"{key}.json"


def _cached_session():
    """Path phiên đã lưu nếu còn trong hạn, ngược lại None."""
    path = _session_path()
    try:
        if time.time() - path.stat().st_mtime < SESSION_MAX_AGE:
            return path
    except OSError:
        pass
    return None


def _save_session(context) -> None:
    path = _session_path()
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        tmp = path.with_suffix(f'.{os.getpid()}.tmp')
        context.storage_state(path=str(tmp))
        os.chmod(tmp, 0o600)
        os.replace(tmp, path)   # atomic — an toàn khi nhiều script chạy song song
    except Exception as exc:   # không lưu được thì chỉ mất tối ưu, không hỏng chức năng
        print(f"⚠️  Không lưu được phiên đăng nhập ({exc}) — lần sau sẽ login lại.")


def invalidate_session() -> None:
    global _verified_session
    _verified_session = None
    try:
        _session_path().unlink()
    except OSError:
        pass


def browser_context_kwargs(reuse_session: bool = True) -> dict:
    """kwargs cho browser.new_context(): Basic Auth (giới hạn origin WP_URL) + phiên đăng nhập đã lưu."""
    kwargs = {}
    user, password = _get_config('WP_FIREWALL_USER'), _get_config('WP_FIREWALL_PASS')
    if user and password:
        parts = urlsplit(_wp_url())
        kwargs['http_credentials'] = {
            'username': user,
            'password': password,
            'origin': f"{parts.scheme}://{parts.netloc}",
        }
    if reuse_session and has_credentials():
        cached = _cached_session()
        if cached:
            kwargs['storage_state'] = str(cached)
    return kwargs


def prepare_context(context) -> None:
    """Chặn tracker/chat bên thứ ba: trang tải nhanh hơn và screenshot không dính bong bóng chat."""
    context.route(_BLOCK_RE, lambda route: route.abort())


def _has_login_cookie(context) -> bool:
    return any(c['name'].startswith('wordpress_logged_in_') for c in context.cookies())


def is_logged_in(context, timeout: int = 15000) -> bool:
    """Xác thực thật phía server: /wp-admin/profile.php trả 200 khi còn login, 302 khi không."""
    try:
        resp = context.request.get(f"{_wp_url()}/wp-admin/profile.php", max_redirects=0, timeout=timeout)
        return resp.status == 200
    except Exception:
        return False


def settle(page, max_img_ms: int = 4000, buffer_ms: int = 150) -> None:
    """Chờ render ổn định: font + ảnh đang hiển thị + 2 frame (+ buffer nhỏ cho transition)."""
    try:
        page.evaluate(_SETTLE_JS, max_img_ms)
    except Exception:
        pass   # trang đang điều hướng/đóng — caller tự xử lý bước kế
    if buffer_ms:
        page.wait_for_timeout(buffer_ms)


_PAGE_LOGGED_IN_JS = "() => !!document.body && (document.body.classList.contains('logged-in') || !!document.getElementById('wpadminbar'))"


def _ensure_logged_in_on_page(page, url: str, timeout: int) -> None:
    """Chốt hậu kiểm trên CHÍNH trang đích: context có cookie login mà trang render ra không phải
    trạng thái đã login (cookie frontend hết hạn/bị huỷ, template private bị 301 về trang chủ)
    → bỏ phiên lưu, login lại, tải lại. Chặn lỗi chụp nhầm trang mà vẫn báo thành công."""
    if not (has_credentials() and _has_login_cookie(page.context)):
        return
    try:
        ok = page.evaluate(_PAGE_LOGGED_IN_JS)
    except Exception:
        return
    if ok:
        return
    print(f"⚠️  Trang {page.url} render ở trạng thái CHƯA đăng nhập — bỏ phiên lưu, đăng nhập lại.")
    invalidate_session()
    page.context.clear_cookies()
    wp_login(page, timeout=min(timeout, 30000))
    page.goto(url, wait_until='load', timeout=timeout)
    if not page.evaluate(_PAGE_LOGGED_IN_JS):
        print(f"⚠️  Sau khi đăng nhập lại, {page.url} vẫn không có body.logged-in/#wpadminbar — "
              "kiểm tra URL có đúng trang cần chụp không.")


def goto_settled(page, url: str, timeout: int = 60000, idle_ms: int = 0) -> None:
    """page.goto chờ `load`, hậu kiểm trạng thái login trên trang, rồi settle() (font + ảnh hiển thị).

    KHÔNG dùng networkidle làm điều kiện: vietnix.vn (chat widget/analytics/LiteSpeed) không bao
    giờ đạt networkidle (sự cố 2026-10-12) → mất trọn timeout mỗi lần. idle_ms > 0 chỉ để
    tương thích script cũ cần chờ thêm XHR."""
    page.goto(url, wait_until='load', timeout=timeout)
    _ensure_logged_in_on_page(page, url, timeout)
    if idle_ms:
        try:
            page.wait_for_load_state('networkidle', timeout=idle_ms)
        except Exception:
            pass
    settle(page)


def wp_login(page, timeout: int = 30000) -> None:
    """Đăng nhập WP (dùng lại phiên đã lưu nếu server xác nhận còn hiệu lực).

    Kiểm tra cookie wordpress_logged_in_* sau login để chống false-success."""
    global _verified_session
    context = page.context

    if _has_login_cookie(context):
        cached = _cached_session()
        stamp = (str(cached), cached.stat().st_mtime) if cached else None
        if stamp and stamp == _verified_session:
            return
        if is_logged_in(context):
            if stamp:
                _verified_session = stamp
            print("Dùng lại phiên đăng nhập WordPress đã lưu.")
            return
        print("Phiên đăng nhập đã lưu hết hiệu lực — đăng nhập lại.")
        invalidate_session()
        context.clear_cookies()

    url = login_url()
    print(f"Đang đăng nhập vào WordPress tại: {url}")
    page.goto(url, wait_until='domcontentloaded', timeout=timeout)
    page.fill('#user_login', _get_config('WP_USER'), timeout=timeout)
    page.fill('#user_pass', _get_config('WP_PASS'))
    # Chỉ chờ tới khi response redirect về (cookie đã set) — không chờ /wp-admin/ render.
    with page.expect_navigation(wait_until='commit', timeout=timeout):
        page.click('#wp-submit')
    if not _has_login_cookie(context):
        raise RuntimeError(
            f"Đăng nhập WP thất bại (không có cookie wordpress_logged_in_*). URL hiện tại: {page.url}. "
            "Kiểm tra WP_USER/WP_PASS, WP_FIREWALL (URL login) và WP_FIREWALL_USER/PASS trong .env."
        )
    _save_session(context)
    cached = _cached_session()
    _verified_session = (str(cached), cached.stat().st_mtime) if cached else None
    print("Đăng nhập thành công.")


def new_wp_page(browser, width: int, height: int, dpr: float = 1, login: bool = True,
                block_third_party: bool = True, **context_kwargs):
    """Tạo context (viewport + Basic Auth + phiên đã lưu + chặn tracker) và trả về page đã login.

    Dùng 1 `browser` cho mọi viewport/section; đóng bằng page.context.close()."""
    context = browser.new_context(
        viewport={'width': width, 'height': height},
        device_scale_factor=dpr,
        **browser_context_kwargs(),
        **context_kwargs,
    )
    if block_third_party:
        prepare_context(context)
    page = context.new_page()
    if login and has_credentials():
        wp_login(page)
    return page
