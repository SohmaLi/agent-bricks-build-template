# Widget: `sidebar`

> **Source:** `bricks/includes/elements/sidebar.php`
> **Category:** wordpress
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Render WordPress sidebar (widget area) đã đăng ký trong theme.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `sidebar` | select | WordPress sidebar ID đã đăng ký |
| `margin` | spacing → `.bricks-widget-wrapper` | Margin giữa các widgets |
| `titleTypography` | typography → `.bricks-widget-title`, `h1`-`h6` | Typography tiêu đề widget |
| `contentTypography` | typography | Typography nội dung |
| `searchBackground` | color → `input[type=search]` | BG ô tìm kiếm |
| `searchBorder` | border → `input[type=search]` | Border ô tìm kiếm |

---

## Lưu ý

- Phải có sidebar được đăng ký trong theme (`register_sidebar()`)
- Sidebar phải có widgets đang active
- Enqueue `wp-block-library` và `global-styles` cho Gutenberg blocks

---

## Ví dụ JSON

```json
{
  "id": "sbRight",
  "name": "sidebar",
  "parent": "ctnLayout",
  "settings": {
    "sidebar": "sidebar-1",
    "margin": {"bottom": "32px"},
    "titleTypography": {
      "font-size": "16px",
      "font-weight": "700",
      "color": {"hex": "#282829"}
    },
    "contentTypography": {
      "font-size": "15px",
      "line-height": "1.6"
    }
  }
}
```
