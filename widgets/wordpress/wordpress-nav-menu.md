# Widget: `nav-menu`

> **Source:** `bricks/includes/elements/nav-menu.php` (verified Bricks 2.3.4)
> **Category:** wordpress | **Scripts:** bricksSubmenuListeners, bricksSubmenuPosition
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Navigation menu từ WordPress menu, hỗ trợ dropdown, mega menu, mobile menu.

> ⚠️ **Lưu ý:** Widget này có 106 control keys. Dưới đây là tất cả keys theo nhóm.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `menu` | select | ID WordPress menu |
| `menuAlignment` | direction | `row` / `column` → flex-direction `.bricks-nav-menu` |

---

## Style Groups

### Top Level Menu
| Key | Selector | Mô tả |
|-----|----------|-------|
| `menuJustifyContent` | `.bricks-nav-menu > li > a` | Justify content |
| `menuGap` | `.bricks-nav-menu` | Gap giữa các items |
| `menuMargin` | `.bricks-nav-menu > li` | Margin items |
| `menuPadding` | `.bricks-nav-menu > li > a` | Padding links |
| `menuBackground` | `.bricks-nav-menu > li > a` | Background |
| `menuBorder` | `.bricks-nav-menu > li > a` | Border |
| `menuTypography` | `.bricks-nav-menu > li > a` | Typography |
| `menuActiveSep` | — | Separator group active state |
| `menuActiveBackground` | `.current-menu-item > a` | Active background |
| `menuActiveBorder` | `.current-menu-item > a` | Active border |
| `menuActiveTypography` | `.current-menu-item > a` | Active typography |
| `menuIcon` | icon | Icon cho submenu toggle caret |
| `menuIconPosition` | select | `left`, `right` |
| `menuIconMargin` | spacing | Margin icon |
| `menuIconPadding` | spacing | Padding icon |
| `menuIconSep` | separator | Separator group icon style |
| `menuIconTypography` | typography | Typography icon |
| `menuIconTransform` | text | CSS transform icon (closed) |
| `menuIconTransformOpen` | text | CSS transform icon (open) |

### Sub Menu
| Key | Selector | Mô tả |
|-----|----------|-------|
| `subMenuSep` | — | Separator group sub menu |
| `submenuStatic` | — | Static position (không absolute) |
| `submenuStaticInfo` | info | Info về submenu static |
| `subMenuBackground` | `.sub-menu .menu-item` | BG item |
| `subMenuBackgroundList` | `.bricks-nav-menu .sub-menu` | Background dropdown list |
| `subMenuBorder` | `.sub-menu` | Border dropdown |
| `subMenuBoxShadow` | `.sub-menu` | Shadow dropdown |
| `subMenuPadding` | `.sub-menu a` | Padding items |
| `subMenuTypography` | `.sub-menu li > a` | Typography |
| `subMenuJustifyContent` | `.sub-menu > li > a` | Justify content |
| `subMenuTransform` | text | CSS transform sub menu (closed) |
| `subMenuTransformOpen` | text | CSS transform sub menu (open) |
| `subMenuItemSep` | separator | Separator group sub item style |
| `subMenuItemBorder` | `.sub-menu > li` | Border mỗi sub item |
| `subMenuActiveSep` | separator | Separator group sub menu active |
| `subMenuActiveBackground` | `.sub-menu .current-menu-item > a` | Active background |
| `subMenuActiveBorder` | `.sub-menu .current-menu-item > a` | Active border |
| `subMenuActiveTypography` | `.sub-menu .current-menu-item > a` | Active typography |
| `subMenuIcon` | icon | Icon dropdown icon |
| `subMenuIconPosition` | select | `left`, `right` |
| `subMenuIconSize` | number+unit | Icon size |
| `subMenuIconMargin` | spacing | Margin icon |
| `subMenuIconPadding` | spacing | Padding icon |
| `subMenuIconSep` | separator | Separator group sub icon |
| `subMenuIconTypography` | typography | Typography icon |
| `subMenuIconTransform` | text | CSS transform sub icon (closed) |
| `subMenuIconTransformOpen` | text | CSS transform sub icon (open) |

### Caret (Tooltip Arrow)
| Key | Mô tả |
|-----|-------|
| `caretSep` | Separator group caret |
| `caretSize` | Kích thước caret triangle |
| `caretColor` | Màu caret |
| `caretPosition` | Vị trí caret |
| `caretTransform` | CSS transform caret |

### Multi-Level (Flyout)
| Key | Mô tả |
|-----|-------|
| `multiLevel` | Bật multi-level flyout menu |
| `multiLevelInfo` | Info về multi-level |
| `multiLevelBackground` | BG level panel |
| `multiLevelBackText` | Text nút "Back" |
| `multiLevelBackTypography` | Typography nút back |

### Mega Menu
| Key | Mô tả |
|-----|-------|
| `megaMenu` | Bật Mega Menu |
| `megaMenuInfo` | Info về Mega Menu setup |
| `megaMenuSelector` | CSS selector wrapper mega menu |
| `megaMenuToggleOn` | Breakpoint toggle mega menu |
| `megaMenuTransform` | CSS transform (closed) |
| `megaMenuTransformOpen` | CSS transform (open) |
| `megaMenuTransition` | Transition animation |

### Mobile Menu
| Key | Mô tả |
|-----|-------|
| `mobileMenu` | Bật mobile menu toggle |
| `mobileMenuCustomBreakpoint` | Breakpoint custom (px) bật toggle |
| `mobileMenuToggleSep` | Separator group toggle button |
| `mobileMenuIcon` | Icon toggle (hamburger) |
| `mobileMenuCloseIcon` | Icon close mobile menu |
| `mobileMenuIconPosition` | Position toggle icon |
| `mobileMenuIconMargin` | Margin icon toggle |
| `mobileMenuIconTypography` | Typography icon toggle |
| `mobileMenuToggleColor` | Màu toggle button |
| `mobileMenuToggleColorClose` | Màu toggle khi đang mở |
| `mobileMenuToggleWidth` | Width toggle button |
| `mobileMenuToggleClosePosition` | Vị trí nút close |
| `mobileMenuToggleAriaLabel` | aria-label nút toggle |
| `mobileMenuToggleHide` | Ẩn toggle khi menu open |
| `mobileMenuTopLevelSep` | Separator group top level mobile |
| `mobileMenuAlignment` | Text align |
| `mobileMenuAlignItems` | Align items |
| `mobileMenuTextAlign` | Text align items |
| `mobileMenuBackground` | BG mobile menu panel |
| `mobileMenuBackgroundFilters` | CSS backdrop-filter |
| `mobileMenuBorder` | Border panel |
| `mobileMenuBoxShadow` | Shadow panel |
| `mobileMenuPadding` | Padding panel |
| `mobileMenuPosition` | `absolute`, `fixed`, `relative` |
| `mobileMenuTop` | Top offset |
| `mobileMenuHeight` | Height panel |
| `mobileMenuWidth` | Width panel |
| `mobileMenuFadeIn` | Fade in animation |
| `mobileMenuOverlay` | BG overlay |
| `mobileMenuTypography` | Typography items |
| `mobileMenuItemBackground` | BG item inactive |
| `mobileMenuItemBackgroundActive` | BG item active |
| `mobileMenuActiveTypography` | Typography active item |
| `mobileMenuActiveBorder` | Border active item |

### Mobile Sub Menu
| Key | Mô tả |
|-----|-------|
| `mobileSubMenuBorder` | Border sub items |
| `mobileSubMenuBorderActive` | Border sub item active |
| `mobileSubMenuPadding` | Padding sub items |
| `mobileSubMenuTypography` | Typography sub items |
| `mobileSubMenuActiveTypography` | Typography sub item active |
| `mobileSubMenuItemBackground` | BG sub items |
| `mobileSubMenuItemBackgroundActive` | BG sub item active |

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
    "menuActiveTypography": {
      "color": {"hex": "#007cfc"},
      "font-weight": "600"
    },
    "subMenuBackgroundList": {"color": {"hex": "#ffffff"}},
    "subMenuBorder": {"style": "solid", "color": {"hex": "#E0E0E0"}},
    "subMenuBoxShadow": {
      "values": {"offsetX": 0, "offsetY": 8, "blur": 24, "spread": 0},
      "color": {"hex": "rgba(0,0,0,0.1)"}
    },
    "subMenuPadding": {"top": "10px", "right": "20px", "bottom": "10px", "left": "20px"},
    "subMenuTypography": {"font-size": "14px", "color": {"hex": "#444444"}},
    "mobileMenu": true,
    "mobileMenuIcon": {"library": "themify", "icon": "ti-menu"},
    "mobileMenuCloseIcon": {"library": "themify", "icon": "ti-close"},
    "mobileMenuBackground": {"color": {"hex": "#ffffff"}},
    "mobileMenuPosition": "absolute"
  }
}
```
