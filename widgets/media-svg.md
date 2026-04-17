# Widget: `svg`

> **Source:** `bricks/includes/elements/svg.php`
> **Category:** media | **Tag:** `svg`

Hiển thị SVG inline từ file media, dynamic data, hoặc SVG code trực tiếp.

---

## Content Controls

| Key | Type | Options | Ghi chú |
|-----|------|---------|---------|
| `source` | select | `""` (File), `"dynamicData"`, `"code"` | Nguồn SVG |
| `file` | svg | `{"id": 101, "url": "..."}` | File SVG từ media library |
| `dynamicData` | text | `"{custom_field_name}"` | Dynamic data → phải là file/image |
| `code` | code | `<svg>...</svg>` | SVG code trực tiếp (cần quyền execute code) |
| `height` | number+unit | `"48px"` | Height SVG |
| `width` | number+unit | `"48px"` | Width SVG |
| `strokeWidth` | number | `2` | Stroke width (áp dụng cho toàn bộ paths) |
| `stroke` | color | `{"hex": "#007cfc"}` | Stroke color |
| `fill` | color | `{"hex": "#007cfc"}` | Fill color |
| `link` | link | `{"url": "#"}` | Bọc SVG trong `<a>` |

---

## Lưu ý quan trọng

- `code` source yêu cầu **quyền execute code** trong Bricks Settings → Builder Access
- SVG từ `file` đọc trực tiếp từ server path → cần file .svg hợp lệ trong media library
- `stroke` và `fill` dùng CSS `!important` → override style inline trong SVG

---

## Ví dụ JSON

### SVG từ file media
```json
{
  "id": "svgLogo",
  "name": "svg",
  "parent": "blkHeader",
  "settings": {
    "source": "",
    "file": {"id": 205, "url": "https://site.com/logo.svg"},
    "width": "120px",
    "height": "40px"
  }
}
```

### SVG icon với màu brand
```json
{
  "id": "svgCheck",
  "name": "svg",
  "parent": "blkFeature",
  "settings": {
    "source": "",
    "file": {"id": 206, "url": "https://site.com/check-icon.svg"},
    "width": "24px",
    "height": "24px",
    "fill": {"hex": "#007cfc"}
  }
}
```
