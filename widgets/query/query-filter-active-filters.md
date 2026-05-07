# Widget: `filter-active-filters`

> **Source:** `bricks/includes/elements/filter-active-filters.php` (Bricks ≥ 1.10, verified 2.3.4)
> **Category:** filter | **Name:** Filter - Active Filters
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị danh sách các filter đang được active — cho phép xóa từng filter bằng click.

---

## Content Controls

### Target Query
| Key | Type | Mô tả |
|-----|------|-------|
| `filterQueryId` | query-list | **Bắt buộc** — Query Loop cần monitor |
| `excludeIds` | text | Comma-separated filter IDs cần exclude khỏi hiển thị |

### Remove All Button
| Key | Type | Mô tả |
|-----|------|-------|
| `buttonStyle` | select | Style nút "Remove All": `primary`, `light`, `dark`... |
| `buttonSize` | select | Size: `sm`, `md`, `lg`, `xl` |
| `buttonCircle` | checkbox | Border-radius full |
| `buttonOutline` | checkbox | Outline style |
| `buttonPadding` | spacing | Padding nút |
| `buttonGap` | number+unit | Gap giữa icon và text |
| `buttonSep` | separator | Separator group button style |
| `buttonBackgroundColor` | color | BG nút "Remove All" |
| `buttonBorder` | border | Border nút |
| `buttonTypography` | typography | Typography nút |

### Remove Icon (per filter tag)
| Key | Type | Mô tả |
|-----|------|-------|
| `icon` | icon | Icon xóa từng filter (default: ×) |
| `iconColor` | color | Màu icon |
| `iconSize` | number+unit | Kích thước icon |
| `iconGap` | number+unit | Gap giữa icon và filter label |
| `iconPosition` | select | `"before"` hoặc `"after"` label |
| `iconSeparator` | separator | Separator group icon |

---

## HTML Structure

```html
<div class="brxe-filter-active-filters">
  <ul>
    <li class="brx-active-filter">
      Category: Technology
      <button class="brx-remove-filter" aria-label="Remove filter">×</button>
    </li>
    <li class="brx-active-filter">
      Price: 100 – 500
      <button class="brx-remove-filter">×</button>
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
    "icon": {"library": "themify", "icon": "ti-close"},
    "iconPosition": "after",
    "iconSize": "10px",
    "iconGap": "6px",
    "buttonStyle": "light",
    "buttonSize": "sm",
    "buttonCircle": true,
    "buttonTypography": {
      "font-size": "13px",
      "color": {"hex": "#007cfc"}
    },
    "buttonBackgroundColor": {"hex": "#EEF4FF"},
    "buttonBorder": {
      "radius": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"}
    }
  }
}
```
