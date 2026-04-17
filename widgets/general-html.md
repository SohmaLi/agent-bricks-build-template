# Widget: `html`

> **Source:** `bricks/includes/elements/html.php`
> **Category:** general
> **`$deprecated = true`** — Widget này được đánh dấu deprecated (không khuyến nghị dùng)

Widget để nhúng raw HTML. Render không có wrapper element bên ngoài.

---

## Khi nào dùng `html`

> ⚠️ **Ưu tiên dùng `_cssCustom` trên native widgets thay vì `html`**

Chỉ dùng khi:
- Cần inject HTML structure đặc biệt mà không widget nào làm được
- Cần nhúng third-party embed code (widget chat, form HTML, ...)
- Cần cấu trúc HTML semantic phức tạp không thể dựng bằng native elements

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `html` | code (text/html) | Raw HTML code |

---

## Lưu ý

- Render raw HTML — không sanitize
- Không có wrapper element → CSS trên Style tab không áp dụng được
- Khác `code` widget ở chỗ: `html` chỉ nhập HTML thông thường, không chạy PHP

---

## Ví dụ JSON

### Nhúng HTML đơn giản
```json
{
  "id": "htmlCustom",
  "name": "html",
  "parent": "blkContent",
  "settings": {
    "html": "<div class=\"my-custom-component\">\n  <span class=\"badge\">Mới</span>\n  <p>Nội dung tùy chỉnh</p>\n</div>"
  }
}
```

### Nhúng iframe (video embed)
```json
{
  "id": "htmlIframe",
  "name": "html",
  "parent": "blkMedia",
  "settings": {
    "html": "<div class=\"video-responsive\">\n  <iframe src=\"https://...\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe>\n</div>"
  }
}
```
