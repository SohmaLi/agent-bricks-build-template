#!/usr/bin/env python3
"""
screenshot_templates.py
Chụp ảnh tất cả section templates và toàn trang — dùng ở cuối DO phase và DONE phase.

Modes:
  1. --all-sections  : Chụp từng template (headerDisabled) → plans/screenshots/sec*.png
  2. --full-page     : Chụp toàn trang (page_id) → plans/screenshots/full-desktop.png + full-mobile.png
  3. --section <key> : Chụp 1 section cụ thể

Usage:
    # Chụp toàn bộ sections từ mapping file:
    python3 scripts/screenshot_templates.py --all-sections

    # Chụp full page (desktop + mobile):
    python3 scripts/screenshot_templates.py --full-page --page-id 1234

    # Chụp 1 section:
    python3 scripts/screenshot_templates.py --section sec100

    # Chụp tất cả + full page:
    python3 scripts/screenshot_templates.py --all-sections --full-page --page-id 1234

    # Lưu vào thư mục khác:
    python3 scripts/screenshot_templates.py --all-sections --output-dir plans/screenshots/session-01
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path
from typing import Optional

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

try:
    from playwright.sync_api import sync_playwright, Page
    PLAYWRIGHT_OK = True
except ImportError:
    PLAYWRIGHT_OK = False

from scripts.lib.bricks_mcp import _get_config, load_template_mapping
from scripts.lib.wp_login import new_wp_page, goto_settled, settle

# ── Config ───────────────────────────────────────────────────────────────────

MAPPING_PATH   = Path(__file__).resolve().parent.parent / 'plans' / 'template_mapping.json'
DEFAULT_OUTPUT = Path(__file__).resolve().parent.parent / 'plans' / 'screenshots'

VIEWPORTS = {
    'desktop': {'width': 1440, 'height': 900},
    'tablet':  {'width': 991,  'height': 768},
    'mobile':  {'width': 390,  'height': 844},
}


# ── Playwright Helpers ────────────────────────────────────────────────────────

def _get_wp_url() -> str:
    return _get_config('WP_URL', 'http://localhost:8000').rstrip('/')


USER_AGENT = (
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
    'AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/120.0.0.0 Safari/537.36'
)


def _new_page(browser, viewport_name: str):
    """Page đã login (dùng lại phiên lưu sẵn) trên browser dùng chung — xem lib/wp_login.py."""
    vp = VIEWPORTS.get(viewport_name, VIEWPORTS['desktop'])
    return new_wp_page(browser, vp['width'], vp['height'],
                       dpr=2 if viewport_name == 'mobile' else 1, user_agent=USER_AGENT)


def _capture_url(
    page: Page,
    url: str,
    output_path: Path,
    wait_ms: int = 0,
    full_page: bool = True
):
    """Điều hướng tới URL và chụp ảnh (chờ font + ảnh hiển thị, không sleep cố định)."""
    goto_settled(page, url)
    # Scroll xuống để trigger lazyload/animation-on-scroll, rồi chờ ảnh mới hiện ra
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    settle(page, buffer_ms=0)
    page.evaluate("window.scrollTo(0, 0)")
    settle(page)
    if wait_ms:
        page.wait_for_timeout(wait_ms)   # chỉ khi user truyền --wait (animation dài)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(output_path), full_page=full_page)
    print(f"    ✅ Saved: {output_path.name}")


# ── Screenshot Modes ─────────────────────────────────────────────────────────

def screenshot_section(
    browser,
    section_key: str,
    template_id: int,
    output_dir: Path,
    viewports: list = None,
    template_url: str = None,
    wait_ms: int = 0,
):
    """Chụp 1 section template.

    Bắt buộc có `template_url` (URL page tạm chứa section, xem AGENTS.md §5 —
    tạo page với page_settings {"headerDisabled":true,"footerDisabled":true} rồi
    dùng `<WP_URL>/?page_id=<ID>`). KHÔNG có fallback `?bricks_template_preview=`:
    query var đó không tồn tại trong Bricks 1.12.3 (đã grep source, xem
    bricks_rules.md §14) — WP sẽ bỏ qua nó và trả về TRANG CHỦ, tức screenshot
    "thành công" nhưng chụp sai nội dung mà không ai phát hiện.
    """
    viewports = viewports or ['desktop', 'mobile']
    if not template_url:
        print(f"\n  ❌ {section_key} (Template {template_id}): thiếu 'url' trong template_mapping.json — "
              f"bỏ qua thay vì chụp nhầm trang chủ.")
        print("     → Tạo page tạm (headerDisabled/footerDisabled) chứa section, rồi thêm "
              "\"url\": \"<WP_URL>/?page_id=<ID>\" vào entry mapping (xem AGENTS.md §5, bricks_rules.md §14).")
        return {vp: None for vp in viewports}
    preview_url = template_url

    print(f"\n  📸 {section_key} (Template {template_id})")

    results = {}
    for vp_name in viewports:
        page = None
        try:
            page = _new_page(browser, vp_name)
            output_path = output_dir / f"{section_key}-{vp_name}.png"
            print(f"    [{vp_name}] {VIEWPORTS[vp_name]['width']}px → {output_path.name}")
            _capture_url(page, preview_url, output_path, wait_ms=wait_ms)
            results[vp_name] = str(output_path)
        except Exception as e:
            print(f"    ❌ [{vp_name}] Lỗi: {e}", file=sys.stderr)
            results[vp_name] = None
        finally:
            if page:
                page.context.close()

    return results


def screenshot_full_page(
    browser,
    page_id: int,
    output_dir: Path,
    wp_url: str,
    viewports: list = None,
    wait_ms: int = 0,
):
    """Chụp toàn trang WordPress (full-page scroll)."""
    viewports = viewports or ['desktop', 'mobile']
    page_url = f"{wp_url}/?page_id={page_id}"

    print(f"\n  🌐 Full Page (ID={page_id})")
    print(f"     URL: {page_url}")

    results = {}
    for vp_name in viewports:
        page = None
        try:
            page = _new_page(browser, vp_name)
            output_path = output_dir / f"full-{vp_name}.png"
            print(f"    [{vp_name}] {VIEWPORTS[vp_name]['width']}px → {output_path.name}")
            _capture_url(page, page_url, output_path, wait_ms=wait_ms)
            results[vp_name] = str(output_path)
        except Exception as e:
            print(f"    ❌ [{vp_name}] Lỗi: {e}", file=sys.stderr)
            results[vp_name] = None
        finally:
            if page:
                page.context.close()

    return results


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    if not PLAYWRIGHT_OK:
        print("❌ Playwright chưa được cài đặt.")
        print("   Chạy: pip3 install playwright && playwright install chromium")
        sys.exit(1)

    parser = argparse.ArgumentParser(
        description='Chụp ảnh section templates và full page cho DONE phase review.'
    )

    parser.add_argument('--all-sections', action='store_true',
                        help='Chụp tất cả sections trong template_mapping.json')
    parser.add_argument('--section', metavar='KEY',
                        help='Chụp 1 section cụ thể (ví dụ: sec100)')
    parser.add_argument('--full-page', action='store_true',
                        help='Chụp toàn trang WordPress')
    parser.add_argument('--page-id', type=int,
                        help='WordPress page ID (dùng với --full-page)')
    parser.add_argument('--output-dir', default=str(DEFAULT_OUTPUT),
                        help=f'Thư mục lưu ảnh (mặc định: {DEFAULT_OUTPUT})')
    parser.add_argument('--viewports', nargs='+',
                        choices=['desktop', 'tablet', 'mobile'],
                        default=['desktop', 'mobile'],
                        help='Viewports cần chụp (mặc định: desktop mobile)')
    parser.add_argument('--mapping', default=str(MAPPING_PATH),
                        help='Path tới template_mapping.json')
    parser.add_argument('--wait', type=int, default=0,
                        help='Chờ THÊM sau khi trang đã ổn định (ms, mặc định 0 — script đã tự chờ '
                             'font + ảnh hiển thị; chỉ tăng khi có animation dài)')

    args = parser.parse_args()

    if not args.all_sections and not args.section and not args.full_page:
        parser.print_help()
        print("\n❌ Cần ít nhất 1 trong: --all-sections, --section <key>, --full-page")
        sys.exit(1)

    output_dir = Path(args.output_dir)
    wp_url = _get_wp_url()

    print(f"\n{'='*55}")
    print(f"  Screenshot Templates")
    print(f"  Site: {wp_url}")
    print(f"  Output: {output_dir}")
    print(f"  Viewports: {args.viewports}")
    print(f"{'='*55}")

    all_results = {}
    start_time = time.time()
    pw = sync_playwright().start()
    browser = pw.chromium.launch(headless=True)   # 1 browser cho mọi section × viewport
    try:
        # ─── Chụp sections ───
        if args.all_sections or args.section:
            try:
                mapping = load_template_mapping(args.mapping)
            except FileNotFoundError:
                print(f"❌ template_mapping.json không tìm thấy: {args.mapping}")
                print("   Tạo file mapping trong bước PLAN (schema: xem MAPPING-FIGMA-FLOW.md §3):")
                print('   { "<section_key>": {"template_id": <ID>, "url": "<WP_URL>/?page_id=<page tạm>"},')
                print('     "page": {"page_id": <ID trang thật>} }')
                sys.exit(1)

            # Lọc sections (bỏ key 'page')
            sections = {k: v for k, v in mapping.items() if k != 'page'}

            if args.section:
                if args.section not in sections:
                    print(f"❌ Section '{args.section}' không có trong mapping. "
                          f"Available: {list(sections.keys())}")
                    sys.exit(1)
                sections = {args.section: sections[args.section]}

            print(f"\n[Sections] Chụp {len(sections)} section(s)...")
            for key, info in sections.items():
                tmpl_id = info.get('template_id')
                if not tmpl_id:
                    print(f"  ⚠️  {key}: template_id không có trong mapping, bỏ qua")
                    continue

                results = screenshot_section(
                    browser,
                    section_key=key,
                    template_id=tmpl_id,
                    output_dir=output_dir,
                    viewports=args.viewports,
                    template_url=info.get('url'),
                    wait_ms=args.wait,
                )
                all_results[key] = results

        # ─── Chụp full page ───
        if args.full_page:
            # Lấy page_id từ args hoặc mapping
            page_id = args.page_id
            if not page_id:
                try:
                    mapping = load_template_mapping(args.mapping)
                    page_id = mapping.get('page', {}).get('page_id')
                except FileNotFoundError:
                    pass

            if not page_id:
                print("❌ Cần truyền --page-id hoặc có page_id trong template_mapping.json")
                sys.exit(1)

            print(f"\n[Full Page] Chụp trang ID={page_id}...")
            full_results = screenshot_full_page(
                browser,
                page_id=page_id,
                output_dir=output_dir,
                wp_url=wp_url,
                viewports=args.viewports,
                wait_ms=args.wait,
            )
            all_results['_full_page'] = full_results
    finally:
        browser.close()
        pw.stop()


    # ─── Summary ───
    elapsed = time.time() - start_time
    total_ok = sum(
        1 for group in all_results.values()
        for v in group.values() if v is not None
    )
    total = sum(len(g) for g in all_results.values())

    print(f"\n{'='*55}")
    print(f"  ✅ Screenshot hoàn tất: {total_ok}/{total} ảnh OK ({elapsed:.1f}s)")
    print(f"  📁 Output: {output_dir}/")

    for key, group in all_results.items():
        label = key if key != '_full_page' else 'Full Page'
        for vp, path in group.items():
            status = "✅" if path else "❌"
            name = Path(path).name if path else "FAILED"
            print(f"     {status} {label} [{vp}]: {name}")

    print(f"{'='*55}\n")

    # Ghi index JSON
    index_path = output_dir / 'screenshot_index.json'
    index_path.parent.mkdir(parents=True, exist_ok=True)
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)
    print(f"  📄 Index: {index_path}")

    sys.exit(0 if total_ok == total else 1)


if __name__ == '__main__':
    main()
