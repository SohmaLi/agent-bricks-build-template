# Widget: `post-excerpt`

> **Source:** `bricks/includes/elements/post-excerpt.php`
> **Category:** single

Hiển thị excerpt của bài viết — hỗ trợ cắt ngắn tùy chỉnh. Dùng trong loops/archive.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `length` | number (max 999) | Số từ excerpt (default: 15) |
| `more` | text | Text sau excerpt (default: `…`) |
| `keepHTML` | checkbox | Giữ formatting HTML |

---

## Lưu ý

- Trong Query Loop: Tự động dùng excerpt/description của loop object
- Trong Archive: Dùng taxonomy/author description
- `keepHTML`: Nếu bật sẽ giữ `<p>`, `<strong>`... thay vì strip về plain text

---

## Ví dụ JSON

```json
{
  "id": "peCard",
  "name": "post-excerpt",
  "parent": "ctnPostCard",
  "settings": {
    "length": 25,
    "more": "...",
    "keepHTML": false,
    "_typography": {
      "font-size": "15px",
      "line-height": "1.6",
      "color": {"hex": "#666666"}
    },
    "_margin": {"bottom": "16px"}
  }
}
```
