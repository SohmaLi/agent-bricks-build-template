# Widget: `nav-menu`

> **Source:** `bricks/includes/elements/nav-menu.php`
> **Category:** wordpress | **Scripts:** bricksSubmenuListeners, bricksSubmenuPosition

Navigation menu từ WordPress menu, hỗ trợ dropdown, mega menu, mobile menu.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `menu` | select | ID WordPress menu |
| `menuAlignment` | direction | `row` / `column` → flex-direction `.bricks-nav-menu` |

---

## Control Groups

### Top Level (menu)
| Key | Selector | Mô tả |
|-----|----------|-------|
| `menuJustifyContent` | `.bricks-nav-menu > li > a` | Justify content |
| `menuGap` | `.bricks-nav-menu` | Gap giữa các items |
| `menuMargin` | `.bricks-nav-menu > li` | Margin items |
| `menuPadding` | `.bricks-nav-menu > li > a` | Padding links |
| `menuBackground` | `.bricks-nav-menu > li > a` | Background (hỗ trợ `:hover` pseudo) |
| `menuBorder` | `.bricks-nav-menu > li > a` | Border |
| `menuTypography` | `.bricks-nav-menu > li > a` | Typography |
| `menuActiveBackground` | `.current-menu-item > a` | Active background |
| `menuActiveBorder` | `.current-menu-item > a` | Active border |
| `menuActiveTypography` | `.current-menu-item > a` | Active typography |
| `menuIcon` | icon | Icon cho submenu toggle |
| `menuIconPosition` | select | `left`, `right` |

### Sub Menu (sub-menu)
| Key | Selector | Mô tả |
|-----|----------|-------|
| `submenuStatic` | — | Static position (không absolute) |
| `subMenuBackgroundList` | `.bricks-nav-menu .sub-menu` | Background dropdown |
| `subMenuBorder` | `.sub-menu` | Border dropdown |
| `subMenuBoxShadow` | `.sub-menu` | Shadow dropdown |
| `subMenuPadding` | `.sub-menu a` | Padding items |
| `subMenuBackground` | `.sub-menu .menu-item` | BG item |
| `subMenuTypography` | `.sub-menu li > a` | Typography |
| `caretSize` | → `.sub-menu.caret::before` | Kích thước caret tooltip |

### Mobile Menu (mobile-menu)
| Key | Mô tả |
|-----|-------|
| `mobileMenu` | Bật mobile menu toggle |
| `mobileMenuBreakpoint` | Breakpoint bật/tắt |
| `mobileMenuToggle` | Toggle icon custom |
| ... | (nhiều styling options) |

### Mega Menu (megamenu)
| Key | Mô tả |
|-----|-------|
| Cần bật trong WordPress menu item settings | — |

---

## Ví dụ JSON

### Nav menu ngang header
```json
{
  "id": "navMain",
  "name": "nav-menu",
  "parent": "blkHeader",
  "settings": {
    "menu": 3,
    "menuAlignment": "row",
    "menuGap": "8px",
    "menuPadding": {"top": "8px", "right": "16px", "bottom": "8px", "left": "16px"},
    "menuTypography": {
      "font-size": "15px",
      "font-weight": "500",
      "color": {"hex": "#282829"}
    },
    "menuBackground": {
      "color": {"hex": "transparent"},
      "_pseudo": ":hover",
      "colorHover": {"hex": "#f5f5f5"}
    },
    "menuBorder": {
      "radius": {"top": "6px", "right": "6px", "bottom": "6px", "left": "6px"}
    },
    "menuActiveTypography": {
      "color": {"hex": "#007cfc"},
      "font-weight": "600"
    },
    "subMenuBackgroundList": {"color": {"hex": "#ffffff"}},
    "subMenuBorder": {
      "style": "solid",
      "color": {"hex": "#E0E0E0"}
    },
    "subMenuBoxShadow": {
      "values": {"offsetX": 0, "offsetY": 8, "blur": 24, "spread": 0},
      "color": {"hex": "rgba(0,0,0,0.1)"}
    },
    "subMenuPadding": {"top": "10px", "right": "20px", "bottom": "10px", "left": "20px"},
    "subMenuTypography": {
      "font-size": "14px",
      "color": {"hex": "#444444"}
    }
  }
}
```
