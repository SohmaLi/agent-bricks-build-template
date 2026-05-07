# Widget: `post-reading-progress-bar`

> **Source:** `bricks/includes/elements/post-reading-progress-bar.php`
> **Category:** single | **Tag:** `<progress>` | **Scripts:** bricksPostReadingProgressBar
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Thanh tiến độ đọc bài viết — tự động cập nhật khi scroll.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `contentSelector` | text | CSS selector content cần track (default: `body`) |
| `barPosition` | select | `"top"` (default), `"bottom"`, `"custom"` |
| `barHeight` | number+unit | Chiều cao thanh (default: `12px`) |
| `barColor` | color → `&::-webkit-progress-value`, `&::-moz-progress-bar` | Màu progress |
| `barBackgroundColor` | color → `&::-webkit-progress-bar` | Màu track |

---

## Lưu ý

- Render `<progress value="0" max="100">` — JS cập nhật `value` khi scroll
- Position `top/bottom` → fixed position tự động
- Position `custom` → tự đặt position qua `_cssCustom`

---

## Ví dụ JSON

```json
{
  "id": "prpBar",
  "name": "post-reading-progress-bar",
  "parent": "ctnFixedHeader",
  "settings": {
    "contentSelector": ".brxe-post-content",
    "barPosition": "top",
    "barHeight": "4px",
    "barColor": {"hex": "#007cfc"},
    "barBackgroundColor": {"hex": "#E5E5E5"}
  }
}
```
