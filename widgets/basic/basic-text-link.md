# Widget: `text-link`

> **Source:** `bricks/includes/elements/text-link.php`
> **Category:** basic | **Tag mặc định:** `a` (khi có link) hoặc `span`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

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
| `iconPosition` | select | `"left"` (default), `"right"` — `right` = `flex-direction: row-reverse` |
| `iconSize` | number+unit | Font-size icon (`font-size` trên `.icon > i`, `width/height` trên SVG): `"16px"` |
| `iconWidth` | number+unit | `width` của `.icon` wrapper: `"32px"` |
| `iconHeight` | number+unit | `height` của `.icon` wrapper: `"32px"` |
| `iconColor` | color | `color` + `fill` của `.icon` |
| `iconBackground` | color | `background-color` của `.icon` wrapper |
| `iconBorder` | border | Border + radius của `.icon` wrapper (overflow: hidden tự động) |
| `gap` | number+unit | `gap` giữa icon và text: `"8px"` |

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
    "_cssCustom": "#brxe-lnkIcon:hover { text-decoration: underline; }"
  }
}
```
