# Widget: `dropdown`

> **Source:** `bricks/includes/elements/dropdown.php`
> **Category:** general | **Tag:** `li` | **Nestable:** true

Dropdown menu nestable — chứa trigger (text/link + icon) và content panel (tự do). Dùng trong nav builder.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `text` | text | Label trigger (default: "Dropdown") |
| `link` | link | Optional: link trên text |
| `ariaLabel` | text | aria-label button toggle |

### Icon Group
| Key | Mô tả |
|-----|-------|
| `icon` | Custom icon toggle (mặc định: chevron SVG) |
| `iconPosition` | `left`, `right` |
| `iconSize` | Kích thước icon |
| `iconColor` | Màu icon |
| `iconTransform` | Transform icon khi đóng |
| `iconTransformOpen` | Transform icon khi mở |

### Content Group  
| Key | Mô tả |
|-----|-------|
| `static` | Vị trí static (cho offcanvas) |
| `toggleOn` | `"click"`, `"hover"`, `"both"` |
| `contentWidth` | min-width `.brx-dropdown-content` |
| `contentBackground/Border/BoxShadow/Typography` | Style panel |
| `contentItemPadding/Background/Border/Typography` | Style items |

### Mega Menu Group
| Key | Mô tả |
|-----|-------|
| `megaMenu` | Bật mega menu |
| `megaMenuSelector` | CSS selector để căn horizontal |

---

## HTML Structure

```html
<li class="brxe-dropdown">
  <div class="brx-submenu-toggle">
    <a href="#">Text</a>
    <button aria-expanded="false">▾</button>
  </div>
  <div class="brx-dropdown-content">
    <!-- Nestable content -->
  </div>
</li>
```

---

## Ví dụ JSON

```json
{
  "id": "ddServices",
  "name": "dropdown",
  "parent": "navMain",
  "settings": {
    "text": "Dịch vụ",
    "toggleOn": "hover",
    "contentBackground": {"color": {"hex": "#ffffff"}},
    "contentBorder": {
      "style": "solid",
      "color": {"hex": "#E5E5E5"},
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "contentBoxShadow": {"values": "0 8px 24px rgba(0,0,0,0.1)"},
    "contentItemPadding": {"top": "10px", "right": "20px", "bottom": "10px", "left": "20px"},
    "contentWidth": "200px",
    "caretSize": "6px",
    "iconColor": {"hex": "#999999"}
  }
}
```
