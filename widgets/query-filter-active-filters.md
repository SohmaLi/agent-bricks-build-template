# Widget: `filter-active-filters`

> **Source:** `bricks/includes/elements/filter-active-filters.php`
> **Category:** query | **Name:** Filter - Active Filters

Hiển thị danh sách các filter đang được active — cho phép xóa từng filter bằng click.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `filterQueryId` | query-list | Query cần monitor |
| `prefix` | text | Text trước danh sách (vd: "Lọc theo:") |
| `removeAllText` | text | Text nút "Clear all" (mặc định: "Clear all") |
| `hideOnNoFilter` | checkbox | Ẩn element khi không có filter active |

### Styling
| Key | Selector | Mô tả |
|-----|----------|-------|
| `itemTypography` | `.brx-active-filter` | Typography mỗi item |
| `itemBackground` | `.brx-active-filter` | Background item |
| `itemBorder` | `.brx-active-filter` | Border item |
| `removeIconColor` | `.brx-remove-filter` | Màu icon xóa |

---

## HTML Structure

```html
<div class="brxe-filter-active-filters">
  <span class="prefix">Lọc theo:</span>
  <ul>
    <li class="brx-active-filter">
      Category: Technology
      <button class="brx-remove-filter" aria-label="Remove filter">×</button>
    </li>
  </ul>
  <button class="brx-remove-all-filters">Clear all</button>
</div>
```

---

## Ví dụ JSON

```json
{
  "id": "afFilters",
  "name": "filter-active-filters",
  "parent": "ctnFilterBar",
  "settings": {
    "filterQueryId": "postsLoop",
    "prefix": "Đang lọc:",
    "removeAllText": "Xóa tất cả",
    "hideOnNoFilter": true,
    "itemBackground": {"hex": "#EEF4FF"},
    "itemBorder": {
      "radius": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"}
    },
    "itemTypography": {
      "font-size": "13px",
      "color": {"hex": "#007cfc"}
    }
  }
}
```
