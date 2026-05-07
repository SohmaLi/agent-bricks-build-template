# Widget: `logo`

> **Source:** `bricks/includes/elements/logo.php`
> **Category:** general | **Tag:** `a`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị logo site (image hoặc text), tự động link về homepage.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `logo` | image | Logo image từ media library |
| `logoInverse` | image | Logo inverse (dùng cho sticky header) |
| `logoHeight` | number+unit | Chiều cao `.bricks-site-logo` |
| `logoWidth` | number+unit | Chiều rộng `.bricks-site-logo` |
| `logoText` | text | Fallback text nếu không có ảnh (default: tên site) |
| `logoLoading` | select | `"eager"` (default) hoặc `"lazy"` |
| `logoUrl` | link | Custom link (default: home_url) |

---

## Lưu ý

- Render trong `<a>` tag → luôn có link
- SVG logo: set `logoHeight` và `logoWidth` theo `px`
- `logoInverse` tự động dùng khi header có `headerSticky`

---

## Ví dụ JSON

### Logo image
```json
{
  "id": "logoMain",
  "name": "logo",
  "parent": "blkHeader",
  "settings": {
    "logo": {"id": 10, "url": "https://site.com/logo.png"},
    "logoInverse": {"id": 11, "url": "https://site.com/logo-white.png"},
    "logoHeight": "40px",
    "logoWidth": "auto",
    "logoLoading": "eager"
  }
}
```

### Logo text
```json
{
  "id": "logoText",
  "name": "logo",
  "parent": "blkHeader",
  "settings": {
    "logoText": "Vietnix",
    "_typography": {
      "font-size": "24px",
      "font-weight": "800",
      "color": {"hex": "#007cfc"}
    }
  }
}
```

### SVG logo
```json
{
  "id": "logoSVG",
  "name": "logo",
  "parent": "blkHeader",
  "settings": {
    "logo": {"id": 15, "url": "https://site.com/logo.svg"},
    "logoHeight": "36px",
    "logoWidth": "120px",
    "logoLoading": "eager"
  }
}
```
