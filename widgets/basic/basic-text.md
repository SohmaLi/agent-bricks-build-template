# Widget: `text` (Rich Text)

> **Source:** `bricks/includes/elements/text.php`
> **Category:** basic | **Tag mặc định:** `div`
> **Label trong editor:** "Rich Text"
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Khác với `text-basic` ở chỗ có WYSIWYG editor đầy đủ (bold, italic, link, list...). Render trong `<div>`.

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `text` | editor | `"<p>Nội dung <strong>đậm</strong></p>"` | Full WYSIWYG editor (bold, italic, link, list...) + dynamic data |
| `type` | select | `"hero"`, `"lead"` | Thêm class `bricks-type-{value}` — style preset từ theme |
| `style` | select | theme style values | Color preset từ theme styles |

> **Lưu ý:** `text` (Rich Text) KHÔNG có `wordsLimit` / `readMore` / `tag` / `link`. Nếu cần các tính năng đó dùng `text-basic`.

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
