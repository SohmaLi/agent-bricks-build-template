# Widget: `dropdown`

> **Source:** `bricks/includes/elements/dropdown.php`
> **Category:** general | **Tag:** `li` | **Nestable:** true
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Dropdown menu nestable — chứa trigger (text/link + icon) và content panel (tự do). Dùng trong nav builder.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `text` | text | Label trigger (default: "Dropdown") |
| `link` | link | Optional: link trên text |
| `tag` | select | HTML tag wrapper: `li` (default), `div` |
| `ariaLabel` | text | aria-label button toggle |
| `toggleOn` | select | `"click"`, `"hover"`, `"both"` |
| `static` | checkbox | Vị trí static (không absolute — dùng trong offcanvas) |
| `staticInfo` | info | Thông báo khi `static = true` |

### Icon Group
| Key | Mô tả |
|-----|-------|
| `icon` | Custom icon toggle (mặc định: chevron SVG) |
| `iconPosition` | `left`, `right` |
| `iconSize` | Kích thước icon |
| `iconColor` | Màu icon |
| `iconPadding` | Padding icon |
| `iconTransform` | Transform icon khi đóng |
| `iconTransformOpen` | Transform icon khi mở |
| `iconTransition` | Transition animation icon |

### Caret Group (tooltip arrow)
| Key | Mô tả |
|-----|-------|
| `caretColor` | Màu của caret/arrow indicator |
| `caretSize` | Kích thước caret |
| `caretPosition` | Vị trí caret: `top`, `bottom`... |
| `caretTransform` | CSS transform caret |

### Content Panel Group
| Key | Mô tả |
|-----|-------|
| `contentWidth` | min-width `.brx-dropdown-content` |
| `contentTypography` | Typography trong panel |
| `contentBackground` | BG panel |
| `contentBorder` | Border panel |
| `contentBoxShadow` | Shadow panel |
| `contentTransform` | CSS transform khi đóng |
| `contentTransformOpen` | CSS transform khi mở |
| `contentTransition` | Transition animation panel |

### Content Items Group
| Key | Mô tả |
|-----|-------|
| `contentItemPadding` | Padding mỗi item trong panel |
| `contentItemBackground` | BG item bình thường |
| `contentItemBackgroundActive` | BG item active |
| `contentItemTypography` | Typography item |
| `contentItemTypographyActive` | Typography item active |
| `contentItemBorder` | Border item |
| `contentItemBorderActive` | Border item active |
| `contentItemJustifyContent` | Justify content item |
| `contentItemTransition` | Transition item hover |
| `contentItemSep` | Separator group items |
| `contentItemActiveSep` | Separator group items active |

### Mega Menu Group
| Key | Mô tả |
|-----|-------|
| `megaMenu` | Bật mega menu (mở full-width panel) |
| `megaMenuSelector` | CSS selector để căn horizontal width |
| `megaMenuSelectorVertical` | CSS selector căn vertical |

### Multi-level Group
| Key | Mô tả |
|-----|-------|
| `multiLevel` | Enable multi-level sub-dropdown |
| `multiLevelBackText` | Text nút "Back" |
| `multiLevelBackBackground` | BG nút Back |
| `multiLevelBackTypography` | Typography nút Back |

| `gap` | Gap giữa dropdown items |

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
    "contentBoxShadow": {
      "values": {"offsetX": 0, "offsetY": 8, "blur": 24, "spread": 0},
      "color": {"hex": "rgba(0,0,0,0.1)"}
    },
    "contentItemPadding": {"top": "10px", "right": "20px", "bottom": "10px", "left": "20px"},
    "contentWidth": "200px",
    "caretSize": "6px",
    "iconColor": {"hex": "#999999"}
  }
}
```
