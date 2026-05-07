# Widget: `pricing-tables`

> **Source:** `bricks/includes/elements/pricing-tables.php`
> **Category:** general | **css_selector:** `.pricing-table`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget bảng giá đầy đủ với header, pricing, features list, footer, button, ribbon và tab monthly/yearly.

---

## Content Controls

### `pricingTables` (repeater)

Mỗi item là một bảng giá:

#### Header
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `showUnder` | select | `"tab-1"` hoặc `"tab-2"` |
| `tableBackground` | background | Background toàn bảng |
| `tableBorder` | border | Border toàn bảng |
| `tableBoxShadow` | box-shadow | Shadow toàn bảng |
| `title` | text | Tên gói |
| `subtitle` | text | Subtitle |
| `headerPadding` | spacing | Padding header |
| `headerBackgroundColor` | color | Background header |
| `headerBorder` | border | Border header |
| `headerTitleTypography` | typography → `.pricing-table-title` | Typography title |
| `headerSubtitleTypography` | typography → `.pricing-table-subtitle` | Typography subtitle |

#### Pricing
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `pricePrefix` | text | Ký hiệu tiền tệ: `"$"`, `"₫"` |
| `price` | text | Giá: `"99"`, `"Liên hệ"` |
| `priceSuffix` | text | Đuôi giá: `".99"` |
| `priceMeta` | text | Kỳ thanh toán: `"/tháng"` |
| `priceOriginal` | text | Giá gốc (hiện với strikethrough) |
| `priceTypography` | typography | Typography `.pricing-table-price-prefix`, `.pricing-table-price`, `.pricing-table-price-suffix` |
| `priceMetaTypography` | typography | Typography `.pricing-table-price-meta` |
| `priceOriginalTypography` | typography | Typography `.pricing-table-original-price` |
| `priceBackgroundColor` | color | Background pricing area |
| `priceBorder` | border | Border pricing area |
| `pricePadding` | spacing | Padding pricing area |

#### Features
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `features` | textarea | Mỗi dòng một feature |
| `featuresIcon` | icon | Icon trước mỗi feature |
| `featuresIconColor` | color | Màu icon |
| `featuresIconSize` | number+unit | Size icon |
| `featuresIconPosition` | select | `"left"` (default), `"right"` |
| `featuresAlignment` | justify-content | Align `.pricing-table-feature` |
| `featuresPadding` | spacing | Padding `.pricing-table-feature` |
| `featuresBackgroundColor` | color | Background feature |
| `featuresBorder` | border | Border feature |
| `featuresTypography` | typography | Typography feature |

#### Footer
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `footerPadding` | spacing | Padding footer |
| `footerBackgroundColor` | color | Background footer |
| `footerBorder` | border | Border footer |

#### Button
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `buttonText` | text | Text nút |
| `buttonLink` | link | Link nút |
| `buttonStyle` | select | `"primary"`, `"secondary"`, ... |
| `buttonSize` | select | `"sm"`, `"md"`, `"lg"`, `"xl"` |
| `buttonWidth` | number+unit | Width nút |
| `buttonBackgroundColor` | color | BG nút |
| `buttonBorder` | border | Border nút |
| `buttonTypography` | typography | Typography nút |

#### Additional Info & Ribbon
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `additionalInfo` | textarea | Text bổ sung dưới button |
| `additionalInfoTypography` | typography | Typography additional info |
| `ribbonText` | text | Text của ribbon badge |
| `ribbonPosition` | select | `"left"`, `"right"` |
| `ribbonBackgroundColor` | color | Background ribbon |
| `ribbonTypography` | typography | Typography ribbon |

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `columns` | number | Số cột `.pricing-tables` grid |
| `gutter` | number+unit | Gap giữa các bảng |
| `horizontalAlign` | align-items | Align `.pricing-tables` |

> ⚠️ **`_boxShadow` format đúng (từ data thực):**
> ```json
> "_boxShadow": {
>   "values": {"offsetX": 5, "offsetY": 10, "blur": 30, "spread": 0},
>   "color": {"hex": "#212121", "hsl": "hsla(0,0,13%,0.1)", "rgb": "rgba(33,33,33,0.1)"}
> }
> ```
> `values` là **object** với `offsetX`, `offsetY`, `blur`, `spread` (số hoặc string+unit) — KHÔNG phải CSS string.

### Tabs (Monthly/Yearly toggle)
| Key | Type | Mô tả |
|-----|------|-------|
| `tabs` | checkbox | Bật tabs toggle |
| `tab1Label` | text | Label tab 1 (vd: "Tháng") |
| `tab2Label` | text | Label tab 2 (vd: "Năm") |
| `defaultTab` | select | `"tab-1"` hoặc `"tab-2"` |
| `tabsJustifyContent` | justify-content | Align tabs bar |
| `tabsBackgroundColor` | color | BG của tabs wrapper |
| `tabsBorder` | border | Border của tabs wrapper |
| `tabsBoxShadow` | box-shadow | Shadow của tabs wrapper |
| `tabsMargin` | spacing | Margin của tabs wrapper |
| `tabWidth` | number+unit | Width mỗi tab button |
| `tabPadding` | spacing | Padding mỗi tab button |
| `tabMargin` | spacing | Margin mỗi tab button |
| `tabSeparator` | separator | Separator group tab style |
| `tabTitleTypography` | typography | Typography tab inactive |
| `tabBackgroundColor` | color | BG tab inactive |
| `tabBorder` | border | Border tab inactive |
| `tabBoxShadow` | box-shadow | Shadow tab inactive |
| `tabActiveTitleTypography` | typography | Typography tab active |
| `tabActiveBackgroundColor` | color | BG tab active |
| `tabActiveBorder` | border | Border tab active |
| `tabActiveBoxShadow` | box-shadow | Shadow tab active |

---

## Ví dụ JSON

### 3 bảng giá
```json
{
  "id": "ptPricing",
  "name": "pricing-tables",
  "parent": "ctnPricing",
  "settings": {
    "columns": 3,
    "gutter": "24px",
    "pricingTables": [
      {
        "title": "Starter",
        "subtitle": "Dành cho cá nhân",
        "pricePrefix": "$",
        "price": "9",
        "priceSuffix": ".99",
        "priceMeta": "/tháng",
        "features": "1 website\n10GB storage\nSSL miễn phí",
        "featuresIcon": {"library": "themify", "icon": "ti-check"},
        "featuresIconColor": {"hex": "#22c55e"},
        "buttonText": "Bắt đầu",
        "buttonLink": {"url": "/signup"},
        "buttonStyle": "secondary"
      },
      {
        "title": "Business",
        "subtitle": "Dành cho doanh nghiệp",
        "pricePrefix": "$",
        "price": "29",
        "priceSuffix": ".99",
        "priceMeta": "/tháng",
        "features": "10 websites\n100GB storage\nSSL miễn phí\nHỗ trợ 24/7",
        "featuresIcon": {"library": "themify", "icon": "ti-check"},
        "featuresIconColor": {"hex": "#22c55e"},
        "buttonText": "Đăng ký ngay",
        "buttonLink": {"url": "/signup"},
        "buttonStyle": "primary",
        "ribbonText": "PHỔ BIẾN",
        "ribbonPosition": "right",
        "ribbonBackgroundColor": {"hex": "#007cfc"},
        "tableBoxShadow": {
          "values": {
            "offsetX": "0",
            "offsetY": "8px",
            "blur": "30px",
            "spread": "0",
            "color": "rgba(0,124,252,0.2)"
          }
        }
      },
      {
        "title": "Enterprise",
        "subtitle": "Cho tổ chức lớn",
        "pricePrefix": "",
        "price": "Liên hệ",
        "priceMeta": "tuỳ chỉnh",
        "features": "Không giới hạn websites\nUnlimited storage\nSLA đảm bảo 99.9%",
        "featuresIcon": {"library": "themify", "icon": "ti-check"},
        "featuresIconColor": {"hex": "#22c55e"},
        "buttonText": "Liên hệ tư vấn",
        "buttonLink": {"url": "/contact"},
        "buttonStyle": "outline-dark"
      }
    ]
  }
}
```
