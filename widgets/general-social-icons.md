# Widget: `social-icons`

> **Source:** `bricks/includes/elements/social-icons.php`
> **Category:** general | **Label:** "Icon List"
> **Tag:** `ul`

Widget danh sách các mạng xã hội / icon với link. Thực chất là một generic icon list hỗ trợ bất kỳ icon nào.

---

## Content Controls

### Icons (repeater)
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `icon` | icon | Icon mạng xã hội |
| `iconColor` | color | Màu icon của item này |
| `iconSize` | number+unit | Kích thước icon của item |
| `label` | text | Text label |
| `labelSize` | number+unit | Font-size label |
| `color` | color | Color override cho `.has-link a` và `.no-link` |
| `background` | color | Background riêng cho item |
| `link` | link | Link URL |

### Global Icon Style
| Key | Type | Mô tả |
|-----|------|-------|
| `iconColor` | color | Màu icon chung cho tất cả items |
| `iconSize` | number+unit | Size icon chung |

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | direction | `row` (default) hoặc `column` |
| `alignIcons` | align-items | Align items theo cross axis |
| `justifyIcons` | justify-content | Justify items theo main axis |
| `gap` | number+unit | Gap giữa các items |
| `gapItem` | number+unit | Gap giữa icon và label trong item |

---

## CSS Selectors

- `li.has-link a` — item có link
- `li.no-link` — item không có link
- `.icon` — wrapper icon
- `span` — label text

---

## Ví dụ JSON

### Social bar ngang
```json
{
  "id": "siSocial",
  "name": "social-icons",
  "parent": "blkHeader",
  "settings": {
    "icons": [
      {
        "icon": {"library": "font-awesome-6-brands", "icon": "fa-facebook"},
        "link": {"url": "https://facebook.com/...", "newTab": true},
        "background": {"hex": "#1877F2"}
      },
      {
        "icon": {"library": "font-awesome-6-brands", "icon": "fa-youtube"},
        "link": {"url": "https://youtube.com/...", "newTab": true},
        "background": {"hex": "#FF0000"}
      },
      {
        "icon": {"library": "font-awesome-6-brands", "icon": "fa-tiktok"},
        "link": {"url": "https://tiktok.com/...", "newTab": true},
        "background": {"hex": "#000000"}
      }
    ],
    "iconColor": {"hex": "#ffffff"},
    "iconSize": "18px",
    "direction": "row",
    "gap": "8px",
    "_padding": {"top": "10px", "right": "10px", "bottom": "10px", "left": "10px"},
    "_border": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    }
  }
}
```

### Social bar với màu riêng từng icon
```json
{
  "id": "siBar",
  "name": "social-icons",
  "parent": "blkFooter",
  "settings": {
    "icons": [
      {
        "icon": {"library": "font-awesome-6-brands", "icon": "fa-facebook"},
        "iconColor": {"hex": "#1877F2"},
        "link": {"url": "#"}
      },
      {
        "icon": {"library": "font-awesome-6-brands", "icon": "fa-instagram"},
        "iconColor": {"hex": "#E1306C"},
        "link": {"url": "#"}
      }
    ],
    "iconSize": "24px",
    "direction": "row",
    "gap": "16px",
    "_cssCustom": "%root% li { transition: transform 0.2s; } %root% li:hover { transform: translateY(-2px); }"
  }
}
```
