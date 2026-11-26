#!/usr/bin/env python3
"""
validate_mobile_overflow.py
Gate bổ trợ F2 (rubric.md) / phòng lỗi §21 (bricks_rules.md) — đo thật document.scrollWidth
qua Playwright thay vì "mở DevTools nhìn mắt". Dùng cho cả trang thật (page_id) lẫn
1 section template riêng (qua URL preview).

Usage:
  python3 validate_mobile_overflow.py --page-id 9136
  python3 validate_mobile_overflow.py --url "http://localhost:8000/?page_id=9136" --viewport 390
  python3 validate_mobile_overflow.py --page-id 9136 --viewport 390 --viewport 768 --tolerance 40
"""
import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_OK = True
except ImportError:
    PLAYWRIGHT_OK = False

from scripts.lib.bricks_mcp import _get_config
from scripts.lib.wp_login import new_wp_page, goto_settled


def check_overflow(browser, url: str, viewport: int, tolerance: int):
    page = new_wp_page(browser, viewport, 900)   # login dùng lại phiên đã lưu (lib/wp_login.py)
    try:
        goto_settled(page, url)

        scroll_width = page.evaluate("document.documentElement.scrollWidth")
        offenders = page.evaluate(
            """(vw) => {
                const els = document.querySelectorAll('body *');
                const out = [];
                els.forEach(el => {
                    const r = el.getBoundingClientRect();
                    if (r.right > vw + 5 && r.width < 5000) {
                        out.push({
                            tag: el.tagName,
                            id: el.id || '',
                            cls: (typeof el.className === 'string') ? el.className.slice(0, 60) : '',
                            width: Math.round(r.width),
                            right: Math.round(r.right),
                        });
                    }
                });
                out.sort((a, b) => b.right - a.right);
                return out.slice(0, 15);
            }""",
            viewport,
        )
        return scroll_width, offenders
    finally:
        page.context.close()


def main():
    if not PLAYWRIGHT_OK:
        print("❌ Playwright chưa cài. Chạy: pip3 install playwright && playwright install chromium")
        sys.exit(1)

    ap = argparse.ArgumentParser(description="Đo document.scrollWidth thật (không nhìn mắt) để bắt lỗi tràn ngang mobile.")
    ap.add_argument("--page-id", type=int, help="WordPress page ID (dùng ?page_id=)")
    ap.add_argument("--url", help="URL đầy đủ (thay cho --page-id)")
    ap.add_argument("--viewport", type=int, action="append", default=None,
                     help="Viewport width cần check (có thể lặp lại). Mặc định: 390")
    ap.add_argument("--tolerance", type=int, default=20,
                     help="Sai số cho phép (px) trước khi coi là FAIL — mặc định 20px "
                          "(chừa cho scrollbar/site header ngoài phạm vi build)")
    args = ap.parse_args()

    if not args.page_id and not args.url:
        ap.error("Cần --page-id hoặc --url")

    wp_url = _get_config("WP_URL", "http://localhost:8000").rstrip("/")
    url = args.url or f"{wp_url}/?page_id={args.page_id}"
    viewports = args.viewport or [390]

    print(f"\n{'='*60}\n  Gate — Mobile Overflow Check (scrollWidth thật)\n  URL: {url}\n{'='*60}")

    fail = False
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)   # 1 browser cho mọi viewport
        try:
            for vw in viewports:
                results.append((vw, *check_overflow(browser, url, vw, args.tolerance)))
        finally:
            browser.close()

    for vw, scroll_width, offenders in results:
        delta = scroll_width - vw
        status = "✅ PASS" if delta <= args.tolerance else "❌ FAIL"
        if delta > args.tolerance:
            fail = True
        print(f"\n  [{vw}px] scrollWidth={scroll_width}px (delta={delta}px, tolerance={args.tolerance}px) → {status}")
        if delta > args.tolerance and offenders:
            print("  Phần tử tràn (rộng nhất trước):")
            for o in offenders[:8]:
                sel = f"#{o['id']}" if o["id"] else f".{o['cls'].split()[0]}" if o["cls"] else o["tag"]
                print(f"    - {sel}  width={o['width']}px  right={o['right']}px")

    print(f"\n{'='*60}")
    if fail:
        print("  ❌ FAIL — có viewport tràn ngang vượt tolerance. Xem bricks_rules.md §21.")
        sys.exit(1)
    print("  ✅ PASS — không tràn ngang ở mọi viewport đã check.")
    print(f"{'='*60}\n")
    sys.exit(0)


if __name__ == "__main__":
    main()
