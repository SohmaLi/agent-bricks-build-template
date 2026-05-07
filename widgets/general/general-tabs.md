# Widget: `tabs`

> **Source:** `bricks/includes/elements/tabs.php`
> **Category:** general | **Tag:** `div` | **Scripts:** bricksTabs
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget tabs ngang hoặc dọc với icon và content HTML.

---

## Content Controls

### Repeater: `tabs`
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `icon` | icon | Icon tab |
| `iconPosition` | select | `"left"` (default), `"right"` |
| `title` | text | Label tab |
| `anchorId` | text | ID để activate bằng anchor link |
| `content` | editor | Nội dung panel (HTML editor) |

### Behavior
| Key | Type | Mô tả |
|-----|------|-------|
| `layout` | select | `"horizontal"` (default), `"vertical"` |
| `openTabOn` | select | `"click"` (default), `"mouseenter"` (hover) |
| `openTab` | text | Index mở sẵn, bắt đầu từ 0 (default: `"0"`) |

### Title Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `titleGrow` | `.tab-title` | `flex-grow: 1` — stretch tabs |
| `titleHorizontal` | `.tab-menu` | `justify-content` căn tab menu |
| `titlePadding` | `.tab-title` | Padding từng tab |
| `titleBackgroundColor` | `.tab-title` | Background |
| `titleBorder` | `.tab-title` | Border |
| `titleTypography` | `.tab-title` | Typography |
| `titleActiveBackgroundColor` | `.tab-title.brx-open` | Background active |
| `titleActiveBorder` | `.tab-title.brx-open` | Border active |
| `titleActiveTypography` | `.tab-title.brx-open` | Typography active |

### Content Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `contentPadding` | `.tab-content` | Padding |
| `contentTextAlign` | `.tab-content` | Text align |
| `contentColor` | `.tab-content` | Text color |
| `contentBackgroundColor` | `.tab-content` | Background |
| `contentBorder` | `.tab-content` | Border |

---

## HTML Structure

```html
<div class="brxe-tabs horizontal">
  <ul class="tab-menu" role="tablist">
    <li class="tab-title [brx-open]">Tab 1</li>
    <li class="tab-title">Tab 2</li>
  </ul>
  <ul class="tab-content">
    <li class="tab-pane [brx-open]">Content 1</li>
    <li class="tab-pane">Content 2</li>
  </ul>
</div>
```

---

## Ví dụ JSON

### Tabs ngang cơ bản
```json
{
  "id": "tabsMain",
  "name": "tabs",
  "parent": "ctnContent",
  "settings": {
    "tabs": [
      {"title": "Giới thiệu", "content": "<p>Nội dung tab 1</p>"},
      {"title": "Kinh nghiệm", "content": "<p>Nội dung tab 2</p>"},
      {"title": "Liên hệ", "content": "<p>Nội dung tab 3</p>"}
    ],
    "layout": "horizontal",
    "openTab": "0",
    "titlePadding": {"top": 12, "right": 24, "bottom": 12, "left": 24},
    "titleTypography": {"font-size": "15px", "font-weight": "500"},
    "titleActiveBackgroundColor": {"hex": "#007cfc"},
    "titleActiveTypography": {"color": {"hex": "#ffffff"}, "font-weight": "600"},
    "titleBorder": {
      "radius": {"top": "8px", "right": "8px", "bottom": "0px", "left": "0px"}
    },
    "contentPadding": {"top": 24, "right": 24, "bottom": 24, "left": 24},
    "contentBorder": {
      "width": {"top": 1, "right": 1, "bottom": 1, "left": 1},
      "style": "solid",
      "color": {"hex": "#e5e5e5"}
    }
  }
}
```

### Tabs với icon
```json
{
  "id": "tabsIcon",
  "name": "tabs",
  "parent": "ctnFeatures",
  "settings": {
    "tabs": [
      {
        "icon": {"library": "themify", "icon": "ti-shield"},
        "title": "Bảo mật",
        "content": "<p>Chi tiết về bảo mật...</p>"
      },
      {
        "icon": {"library": "themify", "icon": "ti-rocket"},
        "title": "Hiệu năng",
        "content": "<p>Chi tiết về hiệu năng...</p>"
      }
    ],
    "layout": "vertical"
  }
}
```
