# Widget: `posts`

> **Source:** `bricks/includes/elements/posts.php`
> **Category:** wordpress
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget hiển thị danh sách posts theo query, hỗ trợ nhiều layout và pagination.

---

## Content Controls

### Query
| Key | Type | Mô tả |
|-----|------|-------|
| `query` | query (popup) | WP_Query settings — post type, taxonomy, order, offset, ... |
| `linkPost` | checkbox | Bọc toàn bộ post item trong `<a>` |

### Layout Group
| Key | Options | Mô tả |
|-----|---------|-------|
| `layout` | `"list"`, `"grid"` (default), `"masonry"`, `"metro"` | Layout posts |
| `columns` | number | Số cột (grid/masonry) — default 2 |
| `columnsMetro` | text | Metro layout columns config (vd: `"2:1"`) |
| `gutter` | number+unit | Spacing giữa các item — default `30px` |
| `firstPostFullWidth` | checkbox | Item đầu chiếm full width (grid) |
| `direction` | direction | Hướng item trong list layout |

### Image Group
| Key | Mô tả |
|-----|-------|
| `imageDisable` | Ẩn thumbnail |
| `imageSize` | Kích thước ảnh WordPress: `"full"`, `"large"`, `"medium"` |
| `imageRatio` | `"1:1"`, `"4:3"`, `"16:9"`, `"custom"` (grid only) |
| `_aspectRatio` | Custom ratio khi `imageRatio = "custom"` |
| `imageLink` | Link ảnh đến post |
| `imageLinkAlt` | Alt text cho link ảnh (accessibility) |
| `alternate` | Xen kẽ ảnh trái/phải (list layout) |
| `imagePosition` | `"left"`, `"right"` (list + no alternate) |
| `width` | Image width (list/grid) |
| `height` | Image height |

### Filter Group (taxonomy filter)
| Key | Mô tả |
|-----|-------|
| `filter` | Taxonomy slug để hiển thị filter bar |
| `filterTextAlign` | Text align filter bar |
| `filterBackground` | BG color filter item |
| `filterBackgroundActive` | BG color filter active |
| `filterBorder` | Border filter item |
| `filterTypography` | Typography filter item |
| `filterTypographyActive` | Typography filter active |
| `filterMargin` | Margin filter item |
| `filterPadding` | Padding filter item |

### Pagination Group
| Key | Mô tả |
|-----|-------|
| `postsNavigation` | Bật pagination |
| `postsNavigationJustifyContent` | Căn chỉnh pagination |
| `postsNavigationHeight` | Height nút trang |
| `postsNavigationWidth` | Width nút trang |
| `postsNavigationGap` | Spacing giữa các nút |
| `postsNavigationMargin` | Margin pagination wrapper |
| `postsNavigationTextAlign` | Text align pagination items |
| `postsNavigationBackground` | BG color nút |
| `postsNavigationBorder` | Border nút |
| `postsNavigationTypography` | Typography nút |
| `postsNavigationActiveSeparator` | Separator group active state |
| `postsNavigationBackgroundActive` | BG color nút active |
| `postsNavigationBorderActive` | Border nút active |
| `postsNavigationTypographyActive` | Typography nút active |

---

## Query Object Structure

```json
"query": {
  "post_type": ["post"],
  "posts_per_page": 6,
  "orderby": "date",
  "order": "DESC",
  "tax_query": [],
  "meta_query": []
}
```

---

## Ví dụ JSON

### Grid 3 cột, 6 bài mới nhất
```json
{
  "id": "postsGrid",
  "name": "posts",
  "parent": "ctnBlog",
  "settings": {
    "query": {
      "post_type": ["post"],
      "posts_per_page": 6,
      "orderby": "date",
      "order": "DESC"
    },
    "layout": "grid",
    "columns": 3,
    "gutter": "24px",
    "imageSize": "large",
    "imageRatio": "16:9",
    "postsNavigation": true
  }
}
```

### List layout với filter category
```json
{
  "id": "postsFiltered",
  "name": "posts",
  "parent": "ctnBlog",
  "settings": {
    "query": {
      "post_type": ["post"],
      "posts_per_page": 9
    },
    "layout": "grid",
    "columns": 3,
    "filter": "category",
    "filterTextAlign": "center",
    "filterPadding": {"top": 8, "right": 20, "bottom": 8, "left": 20}
  }
}
```
