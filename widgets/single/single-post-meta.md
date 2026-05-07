# Widget: `post-meta`

> **Source:** `bricks/includes/elements/post-meta.php`
> **Category:** single | **css_selector:** `.post-meta`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị metadata bài viết theo dynamic data tags — author, date, views, categories...

---

## Content Controls

### Meta (repeater) — key: `meta`
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `dynamicData` | text | Dynamic data tag vd: `{author_name}`, `{post_date}`, `{post_comments}`, `{post_categories}` |

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | direction | `row` (inline) hoặc `column` |
| `gutter` | number+unit → `gap` | Khoảng cách giữa items |
| `separator` | text | Ký tự ngăn cách (vd: `•`, `|`, `-`) |
| `separatorColor` | color → `.separator` | Màu separator |

---

## Common Dynamic Data Tags

| Tag | Mô tả |
|-----|-------|
| `{author_name}` | Tên tác giả |
| `{post_date}` | Ngày đăng |
| `{post_modified_date}` | Ngày cập nhật |
| `{post_comments}` | Số comments |
| `{post_categories}` | Category links |
| `{post_tags}` | Tag links |
| `{reading_time}` | Thời gian đọc |

---

## Ví dụ JSON

```json
{
  "id": "pmArticle",
  "name": "post-meta",
  "parent": "ctnPostHeader",
  "settings": {
    "meta": [
      {"id": "m001", "dynamicData": "{author_name}"},
      {"id": "m002", "dynamicData": "{post_date}"},
      {"id": "m003", "dynamicData": "{post_categories}"}
    ],
    "direction": "row",
    "gutter": "8px",
    "separator": "·",
    "separatorColor": {"hex": "#AAAAAA"},
    "_typography": {
      "font-size": "14px",
      "color": {"hex": "#888888"}
    }
  }
}
```
