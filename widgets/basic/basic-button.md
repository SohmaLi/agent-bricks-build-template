# Widget: `button`

> **Source:** `bricks/includes/elements/button.php`
> **Category:** basic | **Tag mặc định:** `span` (→ `a` khi có link)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

---

## Content Controls

| Key | Type | Options / Ví dụ | Ghi chú |
|-----|------|----------------|---------|
| `text` | text | `"Xem bài chia sẻ"` | Label của button |
| `tag` | text | `"span"`, `"button"`, `"div"` | Chỉ hiện khi **không có** link |
| `size` | select | `xs`, `sm`, `md`, `lg`, `xl` | Predefined sizes |
| `style` | select | `primary`, `secondary`, `light`, `dark`, ... | Theme style color |
| `circle` | checkbox | `true` / không có | Bo tròn |
| `outline` | checkbox | `true` / không có | Outline style |
| `link` | link | `{"url": "#", "newTab": false}` | Khi có link, tag → `<a>` |

### Icon controls
| Key | Mô tả |
|-----|-------|
| `icon` | Object chọn icon (Font Awesome) |
| `iconPosition` | `"left"`, `"right"` (default) |
| `iconGap` | Gap giữa icon và text |
| `iconSpace` | `true` = `justify-content: space-between` |
| `iconTypography` | Typography của icon (font-size, color...) |

---

## Ví dụ JSON

### CTA Button cơ bản
```json
{
  "id": "btnCTA",
  "name": "button",
  "parent": "blkLeft",
  "settings": {
    "text": "Xem bài chia sẻ",
    "link": {"url": "#", "newTab": false},
    "_background": {"color": {"hex": "#007cfc"}},
    "_border": {
      "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
    },
    "_padding": {"top": "12px", "bottom": "12px", "left": "32px", "right": "32px"},
    "_typography": {
      "color": {"hex": "#ffffff"},
      "font-size": "16px",
      "font-weight": "600"
    }
  }
}
```

### Button với hover effect
```json
{
  "id": "btnHover",
  "name": "button",
  "parent": "blkActions",
  "settings": {
    "text": "Đăng ký ngay",
    "link": {"url": "/register"},
    "_background": {"color": {"hex": "#007cfc"}},
    "_border": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "_padding": {"top": "14px", "bottom": "14px", "left": "28px", "right": "28px"},
    "_typography": {"color": {"hex": "#ffffff"}, "font-size": "16px", "font-weight": "500"},
    "_cssTransition": "all 0.2s ease",
    "_cssCustom": "#brxe-btnHover:hover { background: #0056b3; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,124,252,0.3); }"
  }
}
```

### Outline button
```json
{
  "id": "btnOutline",
  "name": "button",
  "parent": "blkActions",
  "settings": {
    "text": "Tìm hiểu thêm",
    "link": {"url": "#"},
    "_background": {"color": {"hex": "transparent"}},
    "_border": {
      "width": {"top": "2px", "right": "2px", "bottom": "2px", "left": "2px"},
      "style": "solid",
      "color": {"hex": "#007cfc"},
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "_padding": {"top": "12px", "bottom": "12px", "left": "24px", "right": "24px"},
    "_typography": {"color": {"hex": "#007cfc"}, "font-weight": "500"}
  }
}
```
