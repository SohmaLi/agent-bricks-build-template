# Widget: `post-author`

> **Source:** `bricks/includes/elements/post-author.php`
> **Category:** single
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị thông tin tác giả bài viết: avatar, tên, bio, link tất cả bài.

---

## Content Controls

### Avatar Group
| Key | Type | Mô tả |
|-----|------|-------|
| `avatar` | checkbox | Hiển thị avatar (default: true) |
| `avatarSize` | number+unit → `.avatar` height/width | Kích thước (default: 60px) |
| `avatarPosition` | select | `"left"` (default), `"top"`, `"right"`, `"bottom"` |
| `avatarBorder` | border → `.avatar` | Border |
| `avatarBoxShadow` | box-shadow → `.avatar` | Shadow |

### Name Group
| Key | Type | Mô tả |
|-----|------|-------|
| `name` | checkbox | Hiển thị tên (default: true) |
| `nameTag` | text | HTML tag (default: `h2`) |
| `website` | checkbox | Link tên đến website tác giả |
| `nameTypography` | typography → `.author-name` | Typography |

### Bio Group
| Key | Type | Mô tả |
|-----|------|-------|
| `bio` | checkbox | Hiển thị bio (default: true) |
| `bioTypography` | typography → `.author-bio` | Typography |

### Posts Group
| Key | Type | Mô tả |
|-----|------|-------|
| `postsLink` | checkbox | Hiển thị link "Tất cả bài" (default: true) |
| `postsText` | text | Text button (default: "All author posts") |
| `postsSize` | select | Button size: `sm`, `md`, `lg`, `xl` |
| `postsStyle` | select | Button style (default: `primary`) |
| `postsPadding` | spacing → `.bricks-button` | Padding button |
| `postsBackgroundColor` | color → `.bricks-button` | BG button |
| `postsBorder` | border → `.bricks-button` | Border |
| `postsTypography` | typography → `.bricks-button` | Typography |

---

## HTML Structure

```html
<div class="brxe-post-author avatar-left">
  <img class="avatar" src="...">
  <div class="content">
    <h2 class="author-name"><a href="...">Tên tác giả</a></h2>
    <p class="author-bio">Mô tả tác giả...</p>
    <a class="bricks-button bricks-background-primary" href="...">All author posts</a>
  </div>
</div>
```

---

## Ví dụ JSON

```json
{
  "id": "paAuthor",
  "name": "post-author",
  "parent": "ctnSingleFooter",
  "settings": {
    "avatar": true,
    "avatarSize": "72px",
    "avatarPosition": "left",
    "avatarBorder": {
      "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
    },
    "name": true,
    "nameTag": "h3",
    "website": false,
    "nameTypography": {
      "font-size": "18px",
      "font-weight": "700",
      "color": {"hex": "#282829"}
    },
    "bio": true,
    "bioTypography": {
      "font-size": "15px",
      "color": {"hex": "#666666"}
    },
    "postsLink": true,
    "postsText": "Xem tất cả bài viết",
    "postsStyle": "primary"
  }
}
```
