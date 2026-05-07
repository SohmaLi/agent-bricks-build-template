# Widget: `template`

> **Source:** `bricks/includes/elements/template.php`
> **Category:** general
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Nhúng một Bricks template đã có (section, content, popup) vào trong trang hiện tại.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `template` | select / number | Template ID (chọn từ danh sách section/content/popup đã publish) |
| `noRoot` | checkbox | Render không có `div.brxe-template` wrapper |
| `lazy` | checkbox | Lazy load template (load khi scroll đến) |

---

## Lưu ý

- Template phải ở status `publish` mới render được
- Không thể nhúng chính mình (infinite loop protection)
- Khi `noRoot = true`: style tab sẽ không áp dụng
- Popup templates được xử lý đặc biệt qua AJAX
- `template` nhận giá trị **số nguyên** là post ID của Bricks template

---

## Use Cases phổ biến

| Trường hợp | Cách dùng |
|-----------|-----------|
| Tái sử dụng CTA banner | Tạo template CTA riêng → nhúng vào nhiều trang |
| Footer phức tạp | Tạo footer content template → nhúng vào footer template |
| Popup content | Tạo template nội dung → nhúng vào `offcanvas`/popup |
| Global section | 1 lần edit → update toàn site |

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

---

> ✅ **Template thực tế (ID 7557):** `settings: []` (settings rỗng)
> → Key duy nhất bắt buộc là `template` (integer ID). Các key khác optional.
