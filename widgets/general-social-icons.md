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
| `background` | color | Background riêng cho item — dạng `{"hex": "#4cc2ff"}` |
| `link` | link | Link URL |

### Global Icon Style
| Key | Type | Mô tả |
|-----|------|-------|
| `iconColor` | color | Màu icon chung cho tất cả items |
| `iconSize` | number+unit | Size icon chung |
| `brandColors` | boolean | Dùng màu thương hiệu chính thức (true = bỏ qua `iconColor` và `background` per-item) |

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | direction | `row` (default) hoặc `column` |
| `alignIcons` | align-items | Align items theo cross axis |
| `justifyIcons` | justify-content | Justify items theo main axis |
| `gap` | number+unit | Gap giữa các items |
| `gapItem` | number+unit | Gap giữa icon và label trong item |

---

## Icon Library Names (Tên Thực Tế)

> ⚠️ **Tên library trong JSON khác với UI** — dùng đúng tên JSON kũ hoặc API báo lỗi im lặng.

| Library UI | Tên JSON (dùng trong API) |
|------------|----------------------------|
| Font Awesome Brands | `fontawesomeBrands` |
| Font Awesome Free | `fontawesome` |
| Ionicons | `ionicons` |
| Themify | `themify` |
| Font Awesome 6 Brands | `font-awesome-6-brands` |

> **Ví dụ thực tế từ template:** `{"library": "fontawesomeBrands", "icon": "fab fa-twitter"}`

---

## CSS Selectors

- `li.has-link a` — item có link
- `li.no-link` — item không có link
- `.icon` — wrapper icon
- `span` — label text

---

## Ví dụ JSON

### Social bar ngang (với brand colors)
```json
{
  "id": "siSocial",
  "name": "social-icons",
  "parent": "blkHeader",
  "settings": {
    "brandColors": true,
    "icons": [
      {
        "label": "Twitter",
        "icon": {"library": "fontawesomeBrands", "icon": "fab fa-twitter"},
        "background": {"hex": "#4cc2ff"}
      },
      {
        "label": "Facebook",
        "icon": {"library": "fontawesomeBrands", "icon": "fab fa-facebook-square"},
        "background": {"hex": "#3b5998"}
      },
      {
        "label": "Instagram",
        "icon": {"library": "fontawesomeBrands", "icon": "fab fa-instagram"},
        "background": {"hex": "#4E433C"}
      }
    ],
    "_padding": {"top": 15, "right": 15, "bottom": 15, "left": 15},
    "_typography": {"color": {"hex": "#ffffff"}}
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
