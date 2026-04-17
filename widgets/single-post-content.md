# Widget: `post-content`

> **Source:** `bricks/includes/elements/post-content.php`
> **Category:** single

Render nội dung bài viết WordPress (the_content) hoặc nội dung Bricks.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `dataSource` | select | `"editor"` (WordPress, default) hoặc `"bricks"` |

- Khi `dataSource = "editor"`: Render `the_content()` từ WordPress editor — enqueue `wp-block-library`
- Khi `dataSource = "bricks"`: Render Bricks data của post đó (dùng trong page-in-page)

---

## Ví dụ JSON

```json
{
  "id": "pcContent",
  "name": "post-content",
  "parent": "ctnSingle",
  "settings": {
    "dataSource": "editor",
    "_cssCustom": "%root% { font-size: 17px; line-height: 1.8; color: #444; } %root% h2 { font-size: 24px; margin-top: 40px; } %root% img { max-width: 100%; }"
  }
}
```
