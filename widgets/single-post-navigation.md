# Widget: `post-navigation`

> **Source:** `bricks/includes/elements/post-navigation.php`
> **Category:** single | **Tag:** `nav`

Điều hướng Prev/Next bài viết — hiển thị label, tiêu đề, arrows, thumbnail.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `_direction` | direction | `row` (ngang) hoặc `column` |
| `postWidth` | number+unit → `a` | Max-width của mỗi nav item |
| `inSameTerm` | checkbox | Chỉ điều hướng trong cùng taxonomy |
| `taxonomy` | select | Taxonomy slug (khi `inSameTerm = true`) |
| `excludedTerms` | multi-select | Loại trừ các terms |

### Label Group
| Key | Type | Mô tả |
|-----|------|-------|
| `label` | checkbox | Hiển thị label (default: true) |
| `prevLabel` | text | Text prev (default: "Previous post") |
| `nextLabel` | text | Text next (default: "Next post") |
| `labelTypography` | typography → `.label` | Typography |

### Title Group
| Key | Type | Mô tả |
|-----|------|-------|
| `title` | checkbox | Hiển thị tiêu đề post (default: true) |
| `titleTag` | text | HTML tag (default: `h5`) |
| `titleTypography` | typography → `.title` | Typography |
| `prevJustifyContent` | justify-content → `.prev-post` | Align prev |
| `nextJustifyContent` | justify-content → `.next-post` | Align next |

### Arrows Group
| Key | Type | Mô tả |
|-----|------|-------|
| `prevArrow` | icon | Icon cho Prev |
| `nextArrow` | icon | Icon cho Next |
| `arrowTypography` | typography | Typography arrows |

### Image Group
| Key | Type | Mô tả |
|-----|------|-------|
| `image` | checkbox | Hiển thị thumbnail (default: true) |
| `imageSize` | select | Thumbnail size |
| `imageHeight/Width` | number+unit → `.image` | Kích thước thumbnail |
| `imageBorder` | border → `.image` | Border |

---

## Ví dụ JSON

```json
{
  "id": "pnNav",
  "name": "post-navigation",
  "parent": "ctnSingle",
  "settings": {
    "_direction": "row",
    "label": true,
    "prevLabel": "Bài trước",
    "nextLabel": "Bài tiếp theo",
    "labelTypography": {
      "font-size": "12px",
      "font-weight": "600",
      "color": {"hex": "#999999"},
      "text-transform": "uppercase"
    },
    "title": true,
    "titleTag": "h5",
    "titleTypography": {
      "font-size": "16px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    },
    "image": false,
    "prevJustifyContent": "flex-start",
    "nextJustifyContent": "flex-end"
  }
}
```
