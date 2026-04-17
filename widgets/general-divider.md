# Widget: `divider`

> **Source:** `bricks/includes/elements/divider.php`
> **Category:** general | **Tag:** `div`

Đường kẻ phân cách ngang hoặc dọc, có thể thêm icon ở giữa.

---

## Content Controls

| Key | Type | Options / Ví dụ | Mô tả |
|-----|------|----------------|-------|
| `direction` | select | `"horizontal"` (default), `"vertical"` | Hướng |
| `height` | number+unit | `"2px"` | Độ dày đường kẻ |
| `width` | number+unit | `"100px"` | Chiều dài (dọc: width của border) |
| `style` | select | `"solid"`, `"dashed"`, `"dotted"`, `"double"` | Style đường kẻ |
| `color` | color | `{"hex": "#dddddd"}` | Màu đường kẻ |
| `justifyContent` | justify-content | `"flex-start"`, `"center"`, `"flex-end"` | Căn chỉnh tổng thể |

### Icon (optional)
| Key | Type | Mô tả |
|-----|------|-------|
| `icon` | icon | Icon ở giữa divider |
| `iconTypography` | typography | Typography của icon |
| `iconAlignItems` | align-items | Căn chỉnh icon theo cross axis |
| `iconPosition` | select | `"left"`, `"center"` (default), `"right"` — vị trí icon |
| `iconSpacing` | number+unit | Gap giữa icon và các đường kẻ (default: `30px`) |
| `link` | link | Link cho icon |

---

## CSS Selectors quan trọng

- `.line` — Đường kẻ (có thể là 2 đường nếu có icon)
- `.icon` — Wrapper icon

---

## Ví dụ JSON

### Divider đơn giản ngang
```json
{
  "id": "divLine",
  "name": "divider",
  "parent": "ctnSection",
  "settings": {
    "height": "1px",
    "color": {"hex": "#e5e5e5"},
    "style": "solid",
    "_margin": {"top": "32px", "bottom": "32px"}
  }
}
```

### Divider dày có màu brand
```json
{
  "id": "divBrand",
  "name": "divider",
  "parent": "blkContent",
  "settings": {
    "height": "3px",
    "width": "60px",
    "color": {"hex": "#007cfc"},
    "style": "solid",
    "justifyContent": "flex-start",
    "_margin": {"top": "16px", "bottom": "24px"}
  }
}
```

### Divider với icon ở giữa
```json
{
  "id": "divIcon",
  "name": "divider",
  "parent": "secSplit",
  "settings": {
    "height": "1px",
    "color": {"hex": "#dddddd"},
    "style": "dashed",
    "icon": {"library": "themify", "icon": "ti-star"},
    "iconPosition": "center",
    "iconSpacing": "20px",
    "iconTypography": {
      "color": {"hex": "#007cfc"},
      "font-size": "18px"
    }
  }
}
```

### Divider dọc (phân cách cột)
```json
{
  "id": "divVertical",
  "name": "divider",
  "parent": "blkRow",
  "settings": {
    "direction": "vertical",
    "width": "1px",
    "color": {"hex": "#eeeeee"},
    "_height": "100%"
  }
}
```
