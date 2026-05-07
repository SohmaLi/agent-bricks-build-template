# Widget: `related-posts`

> **Source:** `bricks/includes/elements/related-posts.php`
> **Category:** single | **css_selector:** `li`

Hiển thị danh sách bài viết liên quan theo taxonomy. Layout grid tùy chỉnh.

---

## Content Controls

### Title Group
| Key | Type | Mô tả |
|-----|------|-------|
| `title` | text | Tiêu đề section (vd: "Bài viết liên quan") |
| `titleTag` | select | `h2`-`h6` (default: `h2`) |
| `titleMargin` | spacing → `.related-posts-title` | Margin |
| `titleTypography` | typography → `.related-posts-title` | Typography |

### Query Group
| Key | Type | Mô tả |
|-----|------|-------|
| `post_type` | select | Post type lọc |
| `count` | number (1-4) | Số bài tối đa (default: 3) |
| `order` | select | `ASC`, `DESC` |
| `orderby` | select | `date`, `rand`, `title`, ... |
| `taxonomies` | multi-select | Taxonomy chung (default: `category`, `post_tag`) |

### Layout Group
| Key | Type | Mô tả |
|-----|------|-------|
| `columns` | number (1-6) → `ul` grid-template-columns | Số cột |
| `gap` | number+unit → `ul` gap | Khoảng cách |

### Content Group — repeater key: `content`
> ⚠️ JSON key là **`content`** (không phải `fields`). Mỗi item trong array cần có `id` duy nhất.

| Sub-key | Type | Mô tả |
|---------|------|-------|
| `id` | text | ID duy nhất cho mỗi field (bắt buộc) |
| `dynamicData` | text | Dynamic data tag vd: `{post_title:link}`, `{post_date}`, `{post_excerpt:20}` |
| `tag` | select | HTML tag: `div`, `p`, `h1`-`h6` |
| `dynamicMargin/Padding/Background/Border/Typography` | — | Styling field |

### Image Group
| Key | Type | Mô tả |
|-----|------|-------|
| `noImage` | checkbox | Tắt thumbnail |
| `imageSize` | select | WordPress image size |
| `imagePosition` | select | `top`, `right`, `bottom`, `left` |
| `imageHeight/Width` | number+unit → `img` | Kích thước |
| `imageMargin` | spacing → `figure` | Margin |

### Content Group
| Key | Type | Mô tả |
|-----|------|-------|
| `overlay` | checkbox | Overlay content lên ảnh |
| `contentWidth/Padding/Background` | — | Styling content area |

---

## Ví dụ JSON

```json
{
  "id": "rpRelated",
  "name": "related-posts",
  "parent": "ctnSingle",
  "settings": {
    "title": "Bài viết liên quan",
    "titleTag": "h3",
    "titleTypography": {
      "font-size": "22px",
      "font-weight": "700"
    },
    "titleMargin": {"bottom": "24px"},
    "count": 3,
    "columns": 3,
    "gap": "24px",
    "orderby": "rand",
    "taxonomies": ["category"],
    "imagePosition": "top",
    "imageSize": "medium",
    "content": [
      {
        "id": "f001",
        "dynamicData": "{post_title:link}",
        "tag": "h4",
        "dynamicMargin": {"top": "12px"},
        "dynamicTypography": {
          "font-size": "16px",
          "font-weight": "600"
        }
      },
      {
        "id": "f002",
        "dynamicData": "{post_date}",
        "dynamicTypography": {
          "font-size": "13px",
          "color": {"hex": "#999999"}
        }
      }
    ]
  }
}
```
