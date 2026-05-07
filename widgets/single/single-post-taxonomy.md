# Widget: `post-taxonomy`

> **Source:** `bricks/includes/elements/post-taxonomy.php`
> **Category:** single | **css_selector:** `.bricks-button`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị taxonomy terms của bài viết dưới dạng tags/buttons. Hỗ trợ cả mode list và separator.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `taxonomy` | select | Taxonomy slug: `post_tag` (default), `category`, custom taxonomies |
| `linkDisable` | checkbox | Hiển thị text thuần, không link |
| `separator` | text | Dùng separator thay vì list button (vd: `, `, ` · `) |
| `orderby` | select | Thứ tự: `name` (default), `slug`, `count`, ... |
| `order` | select | `ASC` (default), `DESC` |
| `size` | select | Button size: `sm`, `md`, `lg`, `xl` |
| `style` | select | Button style: `dark` (default), `primary`, `light`, ... |
| `gap` | number+unit → `gap` | Khoảng cách giữa items |
| `icon` | icon | Icon trước mỗi term |

---

## Hai chế độ render

### Mode 1: List (không có separator) — default
```html
<ul class="brxe-post-taxonomy post_tag">
  <li><a class="bricks-button bricks-background-dark">Tag 1</a></li>
  <li><a class="bricks-button bricks-background-dark">Tag 2</a></li>
</ul>
```

### Mode 2: Separator
```html
<div class="brxe-post-taxonomy separator category">
  <a>Category 1</a><span>, </span><a>Category 2</a>
</div>
```

---

## Ví dụ JSON

### Tags dạng badge
```json
{
  "id": "ptTags",
  "name": "post-taxonomy",
  "parent": "ctnPostMeta",
  "settings": {
    "taxonomy": "post_tag",
    "style": "light",
    "size": "sm",
    "gap": "8px",
    "_cssCustom": "#brxe-ptTags .bricks-button { border-radius: 20px; font-size: 12px; padding: 4px 12px; }"
  }
}
```

### Categories với separator
```json
{
  "id": "ptCat",
  "name": "post-taxonomy",
  "parent": "ctnPostMeta",
  "settings": {
    "taxonomy": "category",
    "separator": " · ",
    "linkDisable": false,
    "_typography": {
      "font-size": "14px",
      "color": {"hex": "#007cfc"}
    }
  }
}
```
