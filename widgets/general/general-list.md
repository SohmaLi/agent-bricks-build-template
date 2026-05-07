# Widget: `list`

> **Source:** `bricks/includes/elements/list.php`
> **Category:** general | **Tag:** `ul`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Danh sách có cấu trúc với icon, title, meta, description, separator. Rất linh hoạt cho pricing list, feature list, menu items.

---

## Content Controls

### Items (repeater)
| Key | Type | Mô tả |
|-----|------|-------|
| `items` | repeater | Mảng các item |

**Mỗi item trong `items`:**
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `icon` | icon | Icon riêng cho item này (override icon chung) |
| `title` | text | Tiêu đề item |
| `link` | link | Link trên title |
| `meta` | text | Text meta bên phải |
| `description` | textarea | Mô tả phụ phía dưới |
| `highlight` | checkbox | Đánh dấu highlight |
| `highlightLabel` | text | Text label highlight (dùng với `::before`) |

### Item Style
| Key | Selector | Mô tả |
|-----|----------|-------|
| `itemJustifyContent` | `.content` | `justify-content` |
| `itemAlignItems` | `.content` | `align-items` |
| `itemMargin` | `li` | Margin mỗi item |
| `itemPadding` | `li` | Padding mỗi item |
| `itemOddBackground` | `li:nth-child(odd)` | Background hàng lẻ |
| `itemEvenBackground` | `li:nth-child(even)` | Background hàng chẵn |
| `itemBorder` | `li` | Border mỗi item |
| `itemAutoWidth` | checkbox | `justify-content: initial` |

### Icon (chung cho tất cả items)
| Key | Selector | Mô tả |
|-----|----------|-------|
| `icon` | — | Icon mặc định cho tất cả items |
| `iconAfterTitle` | checkbox | Icon hiện sau title |
| `iconWidth` | `.icon` | Width |
| `iconHeight` | `.icon` | Height |
| `iconSize` | `.icon` | Font-size icon |
| `iconColor` | `.icon` | Color |
| `iconBackgroundColor` | `.icon` | Background |
| `iconBorder` | `.icon` | Border |
| `iconBoxShadow` | `.icon` | Box shadow |

### Title
| Key | Mô tả |
|-----|-------|
| `titleMargin` | `.title` margin |
| `titleTag` | HTML tag của title (`span`, `h3`, ...) |
| `titleTypography` | Typography `.title` |

### Meta
| Key | Mô tả |
|-----|-------|
| `metaMargin` | `.meta` margin |
| `metaTypography` | Typography `.meta` |

### Description
| Key | Mô tả |
|-----|-------|
| `descriptionTypography` | Typography `.description` |

### Separator (đường kẻ giữa icon và meta)
| Key | Mô tả |
|-----|-------|
| `separatorDisable` | Tắt separator (mặc định bật) |
| `separatorStyle` | `solid`, `dashed`, `dotted` |
| `separatorWidth` | Chiều dài separator |
| `separatorHeight` | Độ dày separator |
| `separatorColor` | Màu separator |
| `separatorHighlightContent` | Separator riêng cho highlight content |

### Highlight Group (khi item có `highlight: true`)
| Key | Mô tả |
|-----|-------|
| `highlightBlock` | Hiển thị highlight content block bên dưới item |
| `highlightContentBackground` | BG của highlight content block |
| `highlightContentBorder` | Border highlight content block |
| `highlightContentColor` | Màu text highlight content |
| `highlightContentPadding` | Padding highlight content block |
| `highlightLabelBackground` | BG của label badge |
| `highlightLabelBorder` | Border label badge |
| `highlightLabelPadding` | Padding label badge |
| `highlightLabelTypography` | Typography label badge |

---

## HTML Structure của mỗi item

```html
<li>
  <div class="content">
    <span class="icon"><i class="ti-check"></i></span>
    <span class="title">Tên feature</span>
    <span class="separator"></span>
    <span class="meta">Included</span>
  </div>
  <div class="description">Mô tả chi tiết</div>
</li>
```

---

## Ví dụ JSON

### Feature checklist
```json
{
  "id": "lstFeatures",
  "name": "list",
  "parent": "blkLeft",
  "settings": {
    "items": [
      {"icon": {"library": "themify", "icon": "ti-check"}, "title": "Bảo mật SSL"},
      {"icon": {"library": "themify", "icon": "ti-check"}, "title": "Uptime 99.9%"},
      {"icon": {"library": "themify", "icon": "ti-check"}, "title": "Hỗ trợ 24/7"}
    ],
    "iconColor": {"hex": "#22c55e"},
    "iconSize": "16px",
    "separatorDisable": true,
    "titleTypography": {
      "font-size": "16px",
      "color": {"hex": "#282829"}
    },
    "itemPadding": {"top": "8px", "bottom": "8px"}
  }
}
```

### Pricing list (icon + title + meta)
```json
{
  "id": "lstPricing",
  "name": "list",
  "parent": "blkCard",
  "settings": {
    "items": [
      {"title": "Bandwidth", "meta": "Unlimited"},
      {"title": "Storage", "meta": "100GB"},
      {"title": "CPU", "meta": "4 vCPU"},
      {"title": "RAM", "meta": "8GB"}
    ],
    "separatorStyle": "dashed",
    "separatorColor": {"hex": "#dddddd"},
    "itemPadding": {"top": "12px", "bottom": "12px"},
    "titleTypography": {"font-size": "15px", "color": {"hex": "#555555"}},
    "metaTypography": {"font-size": "15px", "font-weight": "600", "color": {"hex": "#282829"}}
  }
}
```
