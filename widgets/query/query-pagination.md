# Widget: `pagination`

> **Source:** `bricks/includes/elements/pagination.php`
> **Category:** query
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Phân trang cho Query Loop hoặc main WordPress query. Hỗ trợ AJAX pagination.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `queryId` | query-list | ID của query element cần phân trang (default: `main`) |
| `justifyContent` | justify-content → `.bricks-pagination ul` | Căn chỉnh ngang |
| `navigationHeight` | number+unit → `.page-numbers` | Height item |
| `navigationWidth` | number+unit → `.page-numbers` | Width item |
| `gap` | number+unit → `.bricks-pagination ul` | Khoảng cách items |
| `navigationBackground` | color → `.page-numbers` | Background |
| `navigationBorder` | border → `.page-numbers` | Border |
| `navigationTypography` | typography → `.page-numbers` | Typography |

### Current Page
| Key | Selector | Mô tả |
|-----|----------|-------|
| `navigationBackgroundActive` | `.page-numbers.current` | BG active |
| `navigationBorderActive` | `.page-numbers.current` | Border active |
| `navigationTypographyActive` | `.page-numbers.current` | Typography active |

### Icons
| Key | Mô tả |
|-----|-------|
| `prevIcon` | Icon Prev |
| `nextIcon` | Icon Next |
| `iconSeparator` | Separator group icon options |

### Misc
| Key | Mô tả |
|-----|-------|
| `endSize` | Số pages ở đầu/cuối (default: 1) |
| `midSize` | Số pages quanh current (default: 2) |
| `ajax` | AJAX pagination (không reload trang) |
| `miscSeparator` | Separator group misc options |

### Style Separators
| Key | Mô tả |
|-----|-------|
| `navigationActiveSeparator` | Separator group active page styles |

---

## Lưu ý

- Khi dùng với **Query Loop** element: `queryId` = ID của container/posts element có query
- Khi dùng với **main query** (archive/search): không cần set `queryId`
- `ajax = true` chỉ hoạt động với Bricks custom queries, không phải main query

---

## Ví dụ JSON

### Pagination đơn giản cho main query
```json
{
  "id": "pgMain",
  "name": "pagination",
  "parent": "ctnArchive",
  "settings": {
    "queryId": "main",
    "justifyContent": "center",
    "navigationHeight": "40px",
    "navigationWidth": "40px",
    "gap": "8px",
    "navigationBackground": {"hex": "#F5F5F5"},
    "navigationBorder": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "navigationTypography": {
      "font-size": "15px",
      "font-weight": "500"
    },
    "navigationBackgroundActive": {"hex": "#007cfc"},
    "navigationTypographyActive": {
      "color": {"hex": "#ffffff"},
      "font-weight": "700"
    }
  }
}
```

### AJAX pagination cho Query Loop
```json
{
  "id": "pgAjax",
  "name": "pagination",
  "parent": "ctnBlogSection",
  "settings": {
    "queryId": "postsLoopElem",
    "ajax": true,
    "justifyContent": "center"
  }
}
```
