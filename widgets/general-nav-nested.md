# Widget: `nav-nested`

> **Source:** `bricks/includes/elements/nav-nested.php`
> **Category:** general | **Tag:** `nav` | **Nestable:** true | **Scripts:** bricksNavNested, bricksSubmenuListeners

Navigation menu nestable — build menu hoàn toàn tự do với dropdown, mega menu, và mobile toggle.

---

## Control Groups

| Group | Mô tả |
|-------|-------|
| `item` | Top-level menu items |
| `dropdown` | Dropdown/submenu styling |
| `mobile-menu` | Mobile breakpoint & toggle |

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `tag` | text | HTML tag (default: `nav`) |
| `ariaLabel` | text | aria-label (default: "Menu") |

### Top Level Item Group (selector: `.brx-nav-nested-items > li`)

| Key | Selector | Mô tả |
|-----|----------|-------|
| `gap` | `.brx-nav-nested-items` | Gap giữa items |
| `itemPadding` | `> li > a`, `> li > .brx-submenu-toggle > *` | Padding |
| `itemBackgroundColor` | `> li > a`, `> li > .brx-submenu-toggle` | BG |
| `itemBorder` | Idem | Border |
| `itemTypography` | Idem | Typography |
| `itemTransition` | Idem | Transition |
| `itemBackgroundColorActive` | `[aria-current="page"]` | BG active |
| `itemBorderActive` | `[aria-current="page"]` | Border active |
| `itemTypographyActive` | `[aria-current="page"]` | Typography active |

### Dropdown Group (selector: `.brx-dropdown-content`)

| Key | Mô tả |
|-----|-------|
| `iconPadding`, `iconGap`, `iconSize`, `iconColor` | Style toggle icon |
| `iconPosition` | `left` hoặc `right` (default) |
| `iconTransform`, `iconTransformOpen` | Transform khi đóng/mở |
| `iconTransition` | Transition icon |
| `dropdownContentWidth` | Min-width dropdown |
| `dropdownBackgroundColor`, `dropdownBorder`, `dropdownBoxShadow` | Style container |
| `dropdownTypography` | Typography container |
| `dropdownTransition` | Transition open/close |
| `dropdownZindex` | z-index (default: 1001) |
| `dropdownPadding`, `dropdownItemBackground`, `dropdownItemBorder`, `dropdownItemTypography` | Style items trong dropdown |
| `multiLevel` | Bật multilevel mode |
| `multiLevelBackText` | Text nút back |

### Mobile Menu Group

| Key | Mô tả |
|-----|-------|
| `mobileMenu` | Breakpoint hiển thị mobile menu |
| `mobileMenuWidth`, `mobileMenuHeight` | Kích thước `.brx-nav-nested-items` khi open |
| `mobileMenuAlignItems`, `mobileMenuJustifyContent` | Alignment khi open |
| `mobileMenuPosition` | Position khi open |
| `mobileMenuBackgroundColor` | BG khi open |

---

## Nestable Structure

```
Nav Nested (nav.brxe-nav-nested)
├── Block (.brx-nav-nested-items) ← ul thực sự
│   ├── Li item 1 → link
│   ├── Li dropdown → .brx-submenu-toggle → link + button
│   │   └── .brx-dropdown-content (div)
│   │       ├── Li sub-item
│   │       └── Li sub-item
│   └── Toggle (hamburger button)
```

---

## Ví dụ JSON

```json
{
  "id": "navMain",
  "name": "nav-nested",
  "parent": "ctnHeader",
  "settings": {
    "ariaLabel": "Main navigation",
    "mobileMenu": "mobile_landscape",
    "gap": "8px",
    "itemPadding": {"top": "8px", "right": "16px", "bottom": "8px", "left": "16px"},
    "itemTypography": {
      "font-size": "15px",
      "font-weight": "500",
      "color": {"hex": "#282829"}
    },
    "itemTypographyActive": {
      "color": {"hex": "#007cfc"}
    },
    "dropdownBackgroundColor": {"hex": "#ffffff"},
    "dropdownBorder": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "dropdownBoxShadow": {
      "values": {"offsetX": "0", "offsetY": "8px", "blur": "24px", "spread": "0"},
      "color": {"hex": "#00000026"}
    },
    "dropdownContentWidth": "200px",
    "dropdownPadding": {"top": "8px", "right": "0", "bottom": "8px", "left": "0"},
    "dropdownItemTypography": {
      "font-size": "14px",
      "color": {"hex": "#282829"}
    }
  }
}
```
