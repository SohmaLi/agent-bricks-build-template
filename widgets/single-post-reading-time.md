# Widget: `post-reading-time`

> **Source:** `bricks/includes/elements/post-reading-time.php`
> **Category:** single | **Scripts:** bricksPostReadingTime

Tính và hiển thị thời gian đọc bài viết — tự động từ word count.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `contentSelector` | text | CSS selector content area (default: `.brxe-post-content`, fallback: `#brx-content`) |
| `prefix` | text | Text trước số phút (default: `"Reading time: "`) |
| `suffix` | text | Text sau số phút (default: `" minutes"`) |
| `calculationMethod` | select | `"words"` (words/min) hoặc `"characters"` (chars/min) |
| `wordsPerMinute` | number | Tốc độ đọc từ/phút (default: 200) |
| `charactersPerMinute` | number | Tốc độ đọc ký tự/phút (default: 1000) — khi `calculationMethod = "characters"` |

---

## Cách hoạt động

- **Trong Query Loop**: Tính PHP server-side từ `post_content` của post hiện tại
- **Ngoài loop**: Tính JavaScript client-side bằng cách scan `contentSelector`

---

## Ví dụ JSON

```json
{
  "id": "prtReading",
  "name": "post-reading-time",
  "parent": "ctnPostMeta",
  "settings": {
    "prefix": "Thời gian đọc: ",
    "suffix": " phút",
    "calculationMethod": "words",
    "wordsPerMinute": 200,
    "_typography": {
      "font-size": "13px",
      "color": {"hex": "#888888"}
    }
  }
}
```
