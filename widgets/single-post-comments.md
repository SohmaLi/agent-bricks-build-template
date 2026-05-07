# Widget: `post-comments`

> **Source:** `bricks/includes/elements/post-comments.php`
> **Category:** single

Hệ thống comments đầy đủ — có thể dùng Bricks layout hoặc WordPress template mặc định.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `source` | select | `"bricks"` (default, full control) hoặc `"wordpress"` (dùng `comments_template()`) |

### Title Group *(chỉ khi source = bricks)*
| Key | Type | Mô tả |
|-----|------|-------|
| `title` | checkbox | Hiển thị tiêu đề số comments |
| `titleTag` | select | `h3` (default), `h1`-`h6`, `div` |
| `titleTypography` | typography → `.comments-title` | Typography |

### Avatar Group
| Key | Type | Mô tả |
|-----|------|-------|
| `avatar` | checkbox | Hiện avatar Gravatar |
| `avatarSize` | number+unit | Kích thước (default: 60) |
| `avatarBorder` | border → `.avatar` | Border |
| `avatarBoxShadow` | box-shadow → `.avatar` | Shadow |

### Comment Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `commentAuthorTag` | — | HTML tag tên tác giả (default: `h5`) |
| `commentAuthorTypography` | `.comment-author .fn` | Typography tên |
| `commentMetaTypography` | `.comment-meta` | Typography meta (date, etc) |
| `commentContentTypography` | `.comment-content` | Typography nội dung |

### Form Group
| Key | Type | Mô tả |
|-----|------|-------|
| `formTitle` | checkbox | Hiện tiêu đề form (default: true) |
| `formTitleTag` | select | HTML tag (default: `h4`) |
| `formTitleText` | text | Text tiêu đề form (default: "Leave your comment") |
| `label` | checkbox | Hiện labels (default: true) |
| `labelTypography` | typography → `label` | Typography |
| `fieldKeys` | multi-select | Fields: `author`, `email`, `url` |
| `fieldBackgroundColor` | color → input/textarea | BG fields |
| `fieldBorder` | border → input/textarea | Border |
| `fieldTypography` | typography → input/textarea | Typography |
| `fieldResize` | select | Textarea resize: `none`, `vertical`, `horizontal`, `both` |
| `cookies` | checkbox | Hiện cookie consent |
| `cookiesRequired` | checkbox | Bắt buộc consent |

### Submit Button Group
| Key | Type | Mô tả |
|-----|------|-------|
| `submitButtonText` | text | Text (default: "Submit Comment") |
| `submitButtonSize` | select | Button size |
| `submitButtonStyle` | select | Button style (default: `primary`) |
| `submitButtonBackgroundColor` | color → `.bricks-button` | BG |
| `submitButtonBorder` | border → `.bricks-button` | Border |
| `submitButtonTypography` | typography → `.bricks-button` | Typography |

---

## Ví dụ JSON

```json
{
  "id": "pcComments",
  "name": "post-comments",
  "parent": "ctnSingle",
  "settings": {
    "source": "bricks",
    "title": true,
    "titleTag": "h3",
    "avatar": true,
    "avatarSize": "48px",
    "label": false,
    "fieldKeys": ["author", "email"],
    "fieldBorder": {
      "style": "solid",
      "color": {"hex": "#E0E0E0"},
      "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"},
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "submitButtonText": "Gửi bình luận",
    "submitButtonStyle": "primary"
  }
}
```
