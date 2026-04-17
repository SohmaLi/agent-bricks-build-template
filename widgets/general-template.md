# Widget: `template`

> **Source:** `bricks/includes/elements/template.php`
> **Category:** general

Nhúng một Bricks template đã có (section, content, popup) vào trong trang hiện tại.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `template` | select | Template ID (chọn từ danh sách section/content/popup đã publish) |
| `noRoot` | checkbox | Render không có `div.brxe-template` wrapper |

---

## Lưu ý

- Template phải ở status `publish` mới render được
- Không thể nhúng chính mình (infinite loop protection)
- Khi `noRoot = true`: style tab sẽ không áp dụng
- Popup templates được xử lý đặc biệt qua AJAX

---

## Ví dụ JSON

```json
{
  "id": "tplCta",
  "name": "template",
  "parent": "ctnFooterTop",
  "settings": {
    "template": 142,
    "noRoot": false
  }
}
```
