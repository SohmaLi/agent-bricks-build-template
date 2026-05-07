# Widget: `breadcrumbs`

> **Source:** `bricks/includes/elements/breadcrumbs.php`
> **Category:** general | **Tag:** `nav`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Điều hướng breadcrumb tự động theo cấu trúc site. Hỗ trợ custom structure theo post type.

---

## Content Controls

### Structure Group
| Key | Type | Mô tả |
|-----|------|-------|
| `singularStructure` | repeater | Tùy chỉnh cấu trúc breadcrumb theo post type |
| → `postType` | multi-select | Post types áp dụng |
| → `hideCurrentPost` | checkbox | Ẩn post hiện tại |
| → `showParentPosts` | checkbox | Hiện parent posts |
| → `showPostTypeArchive` | checkbox | Hiện archive link |
| → `showTaxonomy` | checkbox | Hiện taxonomy |
| → `taxonomy` | text | Taxonomy slug (vd: `category`) |
| `showDateContext` | checkbox | Thêm context vào date archives |

### Home Group
| Key | Type | Mô tả |
|-----|------|-------|
| `homeLabel` | text | Label "Home" (default: "Home") |
| `homeURL` | text | URL trang chủ |
| `homeIcon` | icon | Icon trang chủ |
| `hideHomeLabel` | checkbox | Ẩn label khi có icon |
| `homeIconPosition` | select | `before`, `after` |

### Separator Group
| Key | Type | Mô tả |
|-----|------|-------|
| `separatorType` | select | `text`, `icon`, `none` |
| `separatorText` | text | Text (default: `/`) |
| `separatorIcon` | icon | Icon separator |
| `separatorColor` | color → `.separator` | Màu separator |
| `separatorSize` | number+unit → `.separator` | Kích thước |

### Item Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `gap` | `.breadcrumbs-wrapper` | Gap giữa các items |
| `itemSep` | — | Separator group item styles |
| `itemPadding` | `.item` | Padding |
| `itemBackgroundColor` | `.item` | Background |
| `itemBorder` | `.item` | Border |
| `itemTypography` | `.item` | Typography |

### Current Item Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `currentItemPadding` | `.item[aria-current="page"]` | Padding |
| `currentItemBackgroundColor` | ... | Background |
| `currentItemBorder` | ... | Border |
| `currentItemTypography` | ... | Typography |

---

## Ví dụ JSON

```json
{
  "id": "breadMain",
  "name": "breadcrumbs",
  "parent": "ctnBread",
  "settings": {
    "homeLabel": "Trang chủ",
    "homeIcon": {"library": "themify", "icon": "ti-home"},
    "hideHomeLabel": true,
    "separatorType": "text",
    "separatorText": "/",
    "separatorColor": {"hex": "#AAAAAA"},
    "gap": "8px",
    "itemTypography": {
      "font-size": "14px",
      "color": {"hex": "#666666"}
    },
    "currentItemTypography": {
      "font-size": "14px",
      "color": {"hex": "#282829"},
      "font-weight": "600"
    }
  }
}
```
