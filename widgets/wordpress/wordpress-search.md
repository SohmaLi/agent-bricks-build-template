# Widget: `search`

> **Source:** `bricks/includes/elements/search.php`
> **Category:** wordpress | **css_selector:** `form`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Ô tìm kiếm WordPress — 2 mode: inline input hoặc icon + overlay fullscreen.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `searchType` | select | `"input"` (default) hoặc `"overlay"` (icon + popup) |
| `actionURL` | text | Custom search URL (default: home_url) |
| `additionalParams` | repeater | Hidden params bổ sung vào form |

### Input Group
| Key | Type | Mô tả |
|-----|------|-------|
| `inputHeight` | number+unit → `input[type=search]` | Chiều cao input |
| `inputWidth` | number+unit | Width input (overlay: max-width form) |
| `placeholder` | text | Placeholder text |
| `placeholderColor` | color → `input::placeholder` | Màu placeholder |
| `inputBackgroundColor` | color → `input` | Background input |
| `inputBorder` | border → `input` | Border input |
| `inputBoxShadow` | box-shadow → `input` | Shadow input |
| `inputTypography` | typography → `input` | Typography input |
| `showLabel` | checkbox | Hiện label |
| `labelText` | text | Label text |
| `labelTypography` | typography → `label` | Typography label |

### Button/Icon Group
| Key | Type | Mô tả |
|-----|------|-------|
| `buttonText` | text | Text nút submit |
| `icon` | icon | Icon thay thế text |
| `ariaLabel` | text | aria-label icon trigger (overlay mode) |
| `buttonAriaLabel` | text | aria-label button submit |
| `buttonAriaLabelInfo` | info | Thông tin về aria-label |
| `buttonPadding` | spacing → `button` | Padding |
| `iconHeight` | number+unit → `button` | Height button |
| `iconWidth` | number+unit → `button` | Width button |
| `iconBackgroundColor` | color → `button` | BG button |
| `iconBorder` | border → `button` | Border button |
| `iconBoxShadow` | box-shadow → `button` | Shadow button |
| `iconTypography` | typography → `button` | Typography |

### Overlay Group (khi `searchType = "overlay"`)
| Key | Type | Mô tả |
|-----|------|-------|
| `searchOverlayTitle` | text | Title trong overlay |
| `searchOverlayTitleTag` | text | HTML tag title (default: `h4`) |
| `searchOverlayTitleTypography` | typography → `.title` | Typography title |
| `searchOverlayBackground` | background → `.bricks-search-overlay` | Background overlay |
| `searchOverlayBackgroundOverlay` | color → `.bricks-search-overlay:after` | Overlay dim |
| `overlayFormDirection` | direction | Hướng form trong overlay (`row`/`column`) |
| `overlayFormGap` | number+unit | Gap giữa input và button trong overlay |
| `overlayIconWidth` | number+unit | Width icon trigger overlay |
| `overlayButtonBackground` | color | BG button submit trong overlay |
| `overlayButtonBorder` | border | Border button submit |
| `overlayButtonPadding` | spacing | Padding button submit |
| `overlayButtonTypography` | typography | Typography button submit |

---

## Ví dụ JSON

### Search input đơn giản
```json
{
  "id": "searchBar",
  "name": "search",
  "parent": "blkHeader",
  "settings": {
    "searchType": "input",
    "placeholder": "Tìm kiếm...",
    "icon": {"library": "themify", "icon": "ti-search"},
    "inputHeight": "44px",
    "inputBorder": {
      "style": "solid",
      "color": {"hex": "#E0E0E0"},
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    }
  }
}
```

### Search overlay với icon
```json
{
  "id": "searchOverlay",
  "name": "search",
  "parent": "blkHeader",
  "settings": {
    "searchType": "overlay",
    "icon": {"library": "themify", "icon": "ti-search"},
    "ariaLabel": "Mở tìm kiếm",
    "searchOverlayTitle": "Bạn đang tìm gì?",
    "searchOverlayBackground": {"color": {"hex": "#ffffff"}},
    "placeholder": "Nhập từ khoá...",
    "inputWidth": "600px"
  }
}
```
