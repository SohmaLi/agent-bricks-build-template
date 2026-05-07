# Widget: `toggle`

> **Source:** `bricks/includes/elements/toggle.php`
> **Category:** general | **Scripts:** bricksToggle | **Tag:** `button`

Button toggle để mở/đóng offcanvas, popup, hoặc bất kỳ element nào qua CSS selector. Dạng hamburger mặc định hoặc custom icon.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `icon` | icon | Custom icon thay thế thanh hamburger |
| `iconColor` | color | Màu icon |
| `iconSize` | number+unit | Kích thước icon |
| `animation` | select | Animation hamburger (chỉ khi không có custom icon) |
| `ariaLabel` | text | aria-label button (default: "Open") |

### Animation Options (hamburger)
| Value | Mô tả |
|-------|-------|
| `boring` | Chuyển thành X |
| `arrow` | Chuyển thành mũi tên ← |
| `arrow-r` | Chuyển thành mũi tên → |
| `minus` | Chuyển thành dấu - |
| `spin` | Xoay |
| `spring` | Nảy |
| `squeeze` | Thu lại |

### Toggle Target
| Key | Mô tả |
|-----|-------|
| `toggleSelector` | CSS selector của target element (vd: `#brxe-abc123`) |
| `toggleAttribute` | Attribute để toggle (default: `class`) |
| `toggleValue` | Giá trị để toggle (default: `brx-open`) |

### Hamburger Bar Style
| Key | CSS var | Mô tả |
|-----|---------|-------|
| `barScale` | `--brxe-toggle-scale` | Tỉ lệ tổng thể |
| `barHeight` | `--brxe-toggle-bar-height` → `.brxa-inner` | Độ dày thanh |
| `barRadius` | `--brxe-toggle-bar-radius` → `.brxa-inner` | Border-radius |
| `barColor` | color → `.brxa-wrap` | Màu thanh |

---

## Ví dụ JSON

### Hamburger animate-X
```json
{
  "id": "btnHamb",
  "name": "toggle",
  "parent": "blkHeader",
  "settings": {
    "animation": "boring",
    "toggleSelector": "#brxe-offcanvasMain",
    "toggleValue": "brx-open",
    "ariaLabel": "Toggle menu",
    "barColor": {"hex": "#282829"},
    "barHeight": "2px",
    "barRadius": "2px"
  }
}
```

### Custom icon toggle
```json
{
  "id": "btnToggleSearch",
  "name": "toggle",
  "parent": "blkHeader",
  "settings": {
    "icon": {"library": "themify", "icon": "ti-search"},
    "iconColor": {"hex": "#282829"},
    "iconSize": "22px",
    "toggleSelector": ".search-overlay",
    "toggleValue": "active",
    "ariaLabel": "Mở tìm kiếm"
  }
}
```
