# Widget: `rating`

> **Source:** `bricks/includes/elements/rating.php`
> **Category:** general
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị số sao đánh giá, hỗ trợ số lẻ, custom icon và schema.org Review markup.

---

## Content Controls

| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `rating` | number (0-max, step 0.1) | `4.5` | Số sao hiện tại |
| `maxRating` | number (min 1) | `5` | Tổng số sao tối đa |
| `gap` | number+unit | `"4px"` | Khoảng cách giữa các sao |

### Icon
| Key | Type | Mô tả |
|-----|------|-------|
| `icon` | icon | Custom icon (mặc định: SVG star tích hợp) |
| `iconColorFull` | color → `.icon.full-color` | Màu sao đầy |
| `iconColorEmpty` | color → `.icon.empty-color` | Màu sao rỗng |
| `iconSize` | number+unit → `.icon` | Kích thước sao |

### Schema (optional)
| Key | Mô tả |
|-----|-------|
| `schema` | Bật schema.org Review |
| `schemaType` | Loại item (Product, Service, Restaurant...) |
| `schemaName` | Tên item được review |
| `reviewAuthor` | Tên tác giả review |
| `schemaProperties` | Repeater các property bổ sung |

---

## Ví dụ JSON

### Simple rating stars
```json
{
  "id": "ratingProduct",
  "name": "rating",
  "parent": "blkProductCard",
  "settings": {
    "rating": 4.5,
    "maxRating": 5,
    "iconColorFull": {"hex": "#FFB800"},
    "iconColorEmpty": {"hex": "#DDDDDD"},
    "iconSize": "20px",
    "gap": "4px"
  }
}
```

### Rating với custom icon và schema
```json
{
  "id": "ratingService",
  "name": "rating",
  "parent": "blkReview",
  "settings": {
    "rating": 5,
    "maxRating": 5,
    "icon": {"library": "themify", "icon": "ti-star"},
    "iconColorFull": {"hex": "#FFB800"},
    "iconColorEmpty": {"hex": "#E5E5E5"},
    "iconSize": "24px",
    "gap": "6px",
    "schema": true,
    "schemaType": "Product",
    "schemaName": "Bricks Builder",
    "reviewAuthor": "Admin"
  }
}
```
