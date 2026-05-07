# Widget: `text` (Rich Text)

> **Source:** `bricks/includes/elements/text.php`
> **Category:** basic | **Tag mặc định:** `div`
> **Label trong editor:** "Rich Text"

Khác với `text-basic` ở chỗ có WYSIWYG editor đầy đủ (bold, italic, link, list...). Render trong `<div>`.

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `text` | editor | `"<p>Nội dung <strong>đậm</strong></p>"` | Full HTML editor với toolbar |
| `type` | select | `"hero"`, `"lead"` | Style preset, thêm class `bricks-type-{value}` |
| `style` | select | theme style values | Color preset |
| `wordsLimit` | number | `50` | Giới hạn số từ |
| `readMore` | text | `"Xem thêm"` | Hiện khi content bị cắt |

---

## Style Controls

Kế thừa từ `base.php`. Đặc biệt:
- `_typography` → áp dụng cả cho `a` bên trong
- `_background` → áp dụng lên wrapper `<div>`

---

## Khác biệt `text` vs `text-basic`

| | `text` (Rich Text) | `text-basic` |
|-|--------------------|--------------|
| Editor | WYSIWYG đầy đủ | Textarea đơn giản |
| Dùng cho | Nội dung dài, có format | Label, caption ngắn |
| Tag | `div` (cố định) | `div`, `p`, `span`, `figcaption`... |
| Performance | Nặng hơn | Nhẹ hơn |

---

## Ví dụ JSON

### Paragraph có format
```json
{
  "id": "txtRich",
  "name": "text",
  "parent": "blkContent",
  "settings": {
    "text": "<p>Chuyên viên với hơn <strong>10 năm kinh nghiệm</strong> trong lĩnh vực công nghệ.</p>",
    "_typography": {
      "font-size": "18px",
      "line-height": "1.8",
      "color": {"hex": "#444444"}
    },
    "_margin": {"bottom": "24px"}
  }
}
```

### Lead text
```json
{
  "id": "txtLead",
  "name": "text",
  "parent": "blkHero",
  "settings": {
    "text": "<p>Khám phá thế giới công nghệ qua góc nhìn chuyên gia.</p>",
    "type": "lead",
    "_typography": {
      "font-size": "20px",
      "font-weight": "500",
      "color": {"hex": "#666666"}
    }
  }
}
```
