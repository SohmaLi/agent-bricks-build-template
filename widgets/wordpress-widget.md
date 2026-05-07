# Widget: `wordpress`

> **Source:** `bricks/includes/elements/wordpress.php`
> **Category:** wordpress | **Tag:** `div`

Render **WordPress Legacy Widgets** (widgets cũ từ WP widget system) trong Bricks. Khác với `sidebar` — widget này render từng widget riêng lẻ, không cần sidebar area.

---

## Content Controls

| Key | Type | Options | Mô tả |
|-----|------|---------|-------|
| `type` | select | `"posts"`, `"pages"`, `"categories"`, `"tags"`, `"custom-menu"`, `"calendar"`, `"meta"`, `"archives"`, `"search"`, `"text"`, `"html"`, `"rss"` | Loại WordPress widget |
| `icon` | icon | `{"library": "ionicons", "icon": "ion-ios-arrow-forward"}` | Icon cho list items (áp dụng với posts/pages/categories/tags) |

### Settings theo `type`

#### `type: "posts"` (Recent Posts)
| Key | Mô tả |
|-----|-------|
| `postsCount` | Số bài hiển thị (default: 5) |
| `showDate` | Hiện ngày đăng |

#### `type: "categories"`
| Key | Mô tả |
|-----|-------|
| `showCount` | Hiện số lượng bài |
| `hierarchical` | Hiện dạng cây phân cấp |
| `dropdown` | Render dạng select dropdown |

#### `type: "text"` / `type: "html"`
| Key | Mô tả |
|-----|-------|
| `title` | Tiêu đề widget |
| `content` | Nội dung text/HTML |
| `filter` | Cho phép shortcodes (text widget) |

#### `type: "rss"`
| Key | Mô tả |
|-----|-------|
| `url` | RSS feed URL |
| `title` | Tiêu đề widget |
| `count` | Số items (default: 5) |
| `show_summary` | Hiện summary |
| `show_author` | Hiện tác giả |
| `show_date` | Hiện ngày |

---

## HTML Structure

```html
<div class="brxe-wordpress widget widget_recent_entries">
  <ul>
    <li>
      <i class="ion-ios-arrow-forward"></i>
      <a href="#">Post Title 1</a>
      <span class="post-date">May 5, 2026</span>
    </li>
    <!-- ... -->
  </ul>
</div>
```

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
    "icon": {
      "library": "ionicons",
      "icon": "ion-ios-arrow-forward"
    },
    "postsCount": 5,
    "showDate": true
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
    "icon": {
      "library": "themify",
      "icon": "ti-angle-right"
    },
    "showCount": true,
    "hierarchical": true
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

---

## Lưu ý

> ⚠️ **Template thực tế (ID 7557):**
> ```json
> {
>   "type": "posts",
>   "icon": {"icon": "ion-ios-arrow-forward", "library": "ionicons"}
> }
> ```
> → `type` + `icon` là 2 keys chính. Widget này là **legacy** — với Bricks 1.5+ nên ưu tiên dùng `posts` widget hoặc `sidebar` widget thay thế.
