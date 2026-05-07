# Widget: `icon-box`

> **Source:** `bricks/includes/elements/icon-box.php`
> **Category:** general | **Tag:** `div`

Widget kết hợp Icon + Content (heading + paragraph). Phổ biến để hiển thị feature card, service item.

---

## HTML Structure

```html
<div class="brxe-icon-box">
  <div class="icon">
    <i class="ti-star"></i>
  </div>
  <div class="content">
    <h4>Tiêu đề</h4>
    <p>Mô tả chi tiết...</p>
  </div>
</div>
```

---

## Content Controls

### Layout
| Key | Type | Options | Mô tả |
|-----|------|---------|-------|
| `direction` | direction | `row`, `column`, `row-reverse`, `column-reverse` | Hướng của icon + content |
| `gap` | number+unit | `"16px"` | Gap giữa icon và content |

### Icon Group
| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `icon` | icon | `{"library": "themify", "icon": "ti-wordpress"}` | Icon object |
| `verticalAlign` | align-items | `"flex-start"`, `"center"` | Align icon theo trục chéo |
| `link` | link | `{"url": "#"}` | Link trên icon |
| `iconMargin` | spacing | `{"right": "16px"}` | Margin của `.icon` wrapper |
| `iconPadding` | spacing | `{"top": "12px",...}` | Padding của `.icon` wrapper |
| `iconSize` | number+unit | `"32px"` | Font-size icon |
| `iconWidth` | number+unit | `"56px"` | min-width của `.icon` |
| `iconHeight` | number+unit | `"56px"` | height + line-height của `.icon` |
| `iconColor` | color | `{"hex": "#007cfc"}` | Màu icon |
| `iconBackgroundColor` | color | `{"hex": "#e8f0ff"}` | Background `.icon` |
| `iconBorder` | border | border object | Border `.icon` |
| `iconBoxShadow` | box-shadow | shadow object | Shadow `.icon` |

### Content Group
| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `content` | editor | `"<h4>Tiêu đề</h4><p>Mô tả</p>"` | HTML content |
| `contentAlign` | align-items | `"center"` | Align `.content` |

### Content Style (Style tab)
| Key | Selector | Mô tả |
|-----|----------|-------|
| `typographyHeading` | `h1, h2, h3, h4, h5, h6` | Typography tiêu đề |
| `typographyBody` | `.content` | Typography body text |
| `contentBackgroundColor` | `.content` | Background |
| `contentBorder` | `.content` | Border |
| `contentBoxShadow` | `.content` | Box shadow |
| `contentMargin` | `.content` | Margin |
| `contentPadding` | `.content` | Padding |

---

## Ví dụ JSON

### Feature card (icon trên, content dưới)
```json
{
  "id": "ibxFeature",
  "name": "icon-box",
  "parent": "blkGrid",
  "settings": {
    "direction": "column",
    "gap": "16px",
    "icon": {"library": "themify", "icon": "ti-shield"},
    "iconSize": "28px",
    "iconColor": {"hex": "#007cfc"},
    "iconBackgroundColor": {"hex": "#e8f0ff"},
    "iconWidth": "60px",
    "iconHeight": "60px",
    "iconBorder": {
      "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
    },
    "content": "<h4>Bảo mật cao</h4><p>Dữ liệu được mã hóa đầu cuối, đảm bảo an toàn tuyệt đối.</p>",
    "typographyHeading": {
      "font-size": "18px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    },
    "typographyBody": {
      "font-size": "15px",
      "color": {"hex": "#666666"},
      "line-height": "1.6"
    }
  }
}
```

### Service item (icon trái, content phải)
```json
{
  "id": "ibxService",
  "name": "icon-box",
  "parent": "blkServices",
  "settings": {
    "direction": "row",
    "gap": "20px",
    "icon": {"library": "themify", "icon": "ti-rocket"},
    "iconSize": "24px",
    "iconColor": {"hex": "#ffffff"},
    "iconBackgroundColor": {"hex": "#007cfc"},
    "iconWidth": "48px",
    "iconHeight": "48px",
    "iconBorder": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}
    },
    "content": "<h4>Hướng dẫn chi tiết</h4><p>Hỗ trợ từng bước từ cơ bản đến nâng cao.</p>",
    "verticalAlign": "flex-start"
  }
}
```
