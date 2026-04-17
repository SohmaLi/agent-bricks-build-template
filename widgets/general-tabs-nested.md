# Widget: `tabs-nested`

> **Source:** `bricks/includes/elements/tabs-nested.php`
> **Category:** general | **Nestable:** true | **Scripts:** bricksTabs

Tabs nestable — tab menu và content area là các nestable blocks tùy chỉnh hoàn toàn.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | direction | Layout tabs: `row` (horizontal) hoặc `column` (vertical) |
| `openTabOn` | select | Trigger: `"click"` (default) hoặc `"mouseenter"` (hover) |
| `openTab` | text | Index tab mở sẵn (0-based, default: `0`) |

### Title Group (selector: `> .tab-menu .tab-title`)
| Key | Mô tả |
|-----|-------|
| `titleWidth` | Width tab button (default: `auto`) |
| `titleMargin/Padding` | Spacing (default padding: 20px) |
| `titleBackgroundColor` | Background |
| `titleBorder` | Border |
| `titleTypography` | Typography |
| `titleActiveBackgroundColor` | BG active tab (`.tab-title.brx-open`) — default: `#dddedf` |
| `titleActiveBorder` | Border active |
| `titleActiveTypography` | Typography active |

### Content Group (selector: `> .tab-content`)
| Key | Mô tả |
|-----|-------|
| `contentMargin/Padding` | Spacing (default padding: 20px) |
| `contentColor` | Text color |
| `contentBackgroundColor` | Background |
| `contentBorder` | Border (default: 1px solid) |

---

## Nestable Structure

```
Tabs Nestable (root)
├── Block (.tab-menu) ← chứa tất cả tab titles
│   ├── Div (.tab-title) "Title 1"
│   └── Div (.tab-title) "Title 2"
└── Block (.tab-content) ← chứa tất cả panes
    ├── Block (.tab-pane) ← content tab 1
    └── Block (.tab-pane) ← content tab 2
```

---

## Lưu ý

- Số `.tab-title` phải bằng số `.tab-pane`
- Classes `tab-menu`, `tab-title`, `tab-content`, `tab-pane` là bắt buộc (set qua `_hidden._cssClasses`)
- Dùng `ID` trên `.tab-title` div để mở qua anchor link

---

## Ví dụ JSON

```json
{
  "id": "tabsInfo",
  "name": "tabs-nested",
  "settings": {
    "direction": "row",
    "openTabOn": "click",
    "openTab": "0",
    "titlePadding": {"top": "14px", "right": "24px", "bottom": "14px", "left": "24px"},
    "titleTypography": {
      "font-size": "14px",
      "font-weight": "600",
      "color": {"hex": "#666666"}
    },
    "titleActiveBackgroundColor": {"hex": "#ffffff"},
    "titleActiveBorder": {
      "style": "solid",
      "color": {"hex": "#007cfc"},
      "width": {"bottom": "2px"}
    },
    "titleActiveTypography": {
      "color": {"hex": "#007cfc"}
    },
    "contentPadding": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"},
    "contentBorder": {
      "style": "solid",
      "color": {"hex": "#E5E5E5"},
      "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"}
    }
  }
}
```
