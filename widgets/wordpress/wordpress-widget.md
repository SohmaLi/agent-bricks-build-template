# Widget: `wordpress`

> **Source:** `bricks/includes/elements/wordpress.php` (verified Bricks 2.3.4)
> **Category:** wordpress | **Tag:** `div`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Render **WordPress Legacy Widgets** (widgets cũ từ WP widget system) trong Bricks.

> ⚠️ **Legacy widget** — Với Bricks 2.x nên ưu tiên dùng `posts`, `sidebar`, hoặc custom elements thay thế.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `type` | select | Loại widget: `"posts"`, `"pages"`, `"categories"`, `"tags"`, `"custom-menu"`, `"calendar"`, `"meta"`, `"archives"`, `"search"`, `"text"`, `"html"`, `"rss"` |
| `icon` | icon | Icon cho list items |
| `iconTypography` | typography | Typography icon |
| `widgetSeparator` | separator | Separator group widget settings |

### Title Group
| Key | Type | Mô tả |
|-----|------|-------|
| `title` | text | Tiêu đề widget |
| `titletag` | select | HTML tag tiêu đề: `h2`-`h6`, `div`, `span`, `p` |
| `titleTypography` | typography | Typography tiêu đề |
| `titleBorder` | border | Border wrapper tiêu đề |
| `titleSeparator` | separator | Separator group title style |

### Content Group
| Key | Type | Mô tả |
|-----|------|-------|
| `contentTypography` | typography | Typography nội dung |

### Settings theo `type`

#### `type: "posts"` (Recent Posts)
| Key | Type | Mô tả |
|-----|------|-------|
| `postsNumber` | number | Số bài hiển thị (default: 5) |
| `postsDate` | checkbox | Hiện ngày đăng |
| `postsFeaturedImage` | checkbox | Hiện thumbnail |
| `postsFeaturedImageSize` | select | Kích thước thumbnail |
| `postsImageHeight` | number+unit | Chiều cao thumbnail |
| `postsImageWidth` | number+unit | Chiều rộng thumbnail |
| `postsTitleTypography` | typography | Typography tiêu đề bài |
| `postsMetaTypography` | typography | Typography meta (date) |

#### `type: "categories"` / `type: "tags"`
| Key | Type | Mô tả |
|-----|------|-------|
| `taxonomy` | select | Taxonomy slug |
| `showCount` | checkbox | Hiện số lượng bài |
| `direction` | direction | `row` / `column` |
| `include` | text | Term IDs cần include |
| `exclude` | text | Term IDs cần exclude |
| `sortBy` | select | Sắp xếp theo: `name`, `count`, `id` |

#### `type: "posts"` (số comment)
| Key | Type | Mô tả |
|-----|------|-------|
| `commentsNumber` | number | Số comments hiển thị |

---

## Ví dụ JSON

### Recent Posts widget
```json
{
  "id": "wpPosts",
  "name": "wordpress",
  "parent": "ctnSidebar",
  "settings": {
    "type": "posts",
    "icon": {"library": "ionicons", "icon": "ion-ios-arrow-forward"},
    "title": "Bài viết mới nhất",
    "titletag": "h3",
    "postsNumber": 5,
    "postsDate": true,
    "postsFeaturedImage": true,
    "postsFeaturedImageSize": "thumbnail"
  }
}
```

### Categories widget
```json
{
  "id": "wpCats",
  "name": "wordpress",
  "parent": "blkSidebar",
  "settings": {
    "type": "categories",
    "icon": {"library": "themify", "icon": "ti-angle-right"},
    "title": "Danh mục",
    "titletag": "h4",
    "showCount": true,
    "taxonomy": "category",
    "sortBy": "name"
  }
}
```

### HTML widget
```json
{
  "id": "wpHtml",
  "name": "wordpress",
  "parent": "blkFooter",
  "settings": {
    "type": "html",
    "title": "About Us",
    "content": "<p>We are a hosting company...</p>"
  }
}
```
