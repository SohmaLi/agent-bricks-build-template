# Widget: `text-link`

> **Source:** `bricks/includes/elements/text-link.php`
> **Category:** basic | **Tag mặc định:** `a` (khi có link) hoặc `span`

Widget text có link và icon đi kèm. Nhẹ hơn button, phù hợp cho inline links.

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `text` | text | `"Xem thêm"` | Label text |
| `link` | link | `{"url": "#", "newTab": false}` | Khi có link → tag `<a>`, không có → `<span>` |

### Icon Group
| Key | Type | Mô tả |
|-----|------|-------|
| `icon` | icon | Icon (Font Awesome / Themify) |
| `iconPosition` | select | `"left"` (default), `"right"` |
| `iconSize` | number+unit | Size của icon: `"16px"` |
| `iconWidth` | number+unit | Width của icon wrapper |
| `iconHeight` | number+unit | Height của icon wrapper |
| `iconColor` | color | Color của icon |
| `iconBackground` | color | Background của icon wrapper |
| `iconBorder` | border | Border của icon wrapper |
| `gap` | number+unit | Gap giữa icon và text: `"8px"` |

---

## Style Controls

Kế thừa từ `base.php`. Hay dùng:
- `_typography` → style cho text
- `_cssCustom` → hover effect

---

## Ví dụ JSON

### Link đơn
```json
{
  "id": "lnkReadMore",
  "name": "text-link",
  "parent": "blkCardBody",
  "settings": {
    "text": "Xem bài viết",
    "link": {"url": "#"},
    "_typography": {
      "color": {"hex": "#007cfc"},
      "font-weight": "500"
    }
  }
}
```

### Link với icon phải
```json
{
  "id": "lnkIcon",
  "name": "text-link",
  "parent": "blkCTA",
  "settings": {
    "text": "Tìm hiểu thêm",
    "link": {"url": "/about"},
    "icon": {"library": "themify", "icon": "ti-arrow-right"},
    "iconPosition": "right",
    "iconSize": "14px",
    "gap": "8px",
    "_typography": {
      "font-size": "16px",
      "font-weight": "600",
      "color": {"hex": "#007cfc"}
    },
    "_cssCustom": "%root%:hover { text-decoration: underline; }"
  }
}
```
