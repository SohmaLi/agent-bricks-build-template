# Widget: `accordion`

> **Source:** `bricks/includes/elements/accordion.php`
> **Category:** general | **Tag:** `ul` | **Scripts:** bricksAccordion

Accordion có thể expand/collapse, hỗ trợ FAQ schema và query loop.

---

## Content Controls

### Repeater: `accordions`
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `title` | text | Tiêu đề accordion item |
| `anchorId` | text | ID để mở bằng anchor link (không có `#`) |
| `subtitle` | text | Subtitle dưới title |
| `content` | editor | Nội dung khi expand (HTML editor) |

### Behavior
| Key | Type | Mô tả |
|-----|------|-------|
| `expandItem` | text | Index(es) mở sẵn, phân cách bởi comma, bắt đầu từ 0. Ví dụ: `"0,2"` |
| `independentToggle` | checkbox | Cho phép mở nhiều item cùng lúc |
| `transition` | number | Thời gian animation (ms) — default 200 |
| `faqSchema` | checkbox | Generate FAQPage JSON-LD schema |

### Title Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `titleTag` | — | HTML tag: `h3` (default), `h1`-`h6`, `div` |
| `icon` | — | Icon khi collapsed (default: arrow) |
| `iconExpanded` | — | Icon khi expanded (default: arrow down) |
| `iconPosition` | `.accordion-title` | `"left"`, `"right"` (default) |
| `iconRotate` | `.brx-open .title + .icon` | Góc xoay icon khi open (deg) |
| `iconTypography` | `.accordion-title .icon` | Typography icon |
| `iconExpandedTypography` | `.accordion-title .icon.expanded` | Typography icon expanded |
| `titleMargin` | `.accordion-title-wrapper` | Margin |
| `titlePadding` | `.accordion-title-wrapper` | Padding |
| `titleTypography` | `.accordion-title .title` | Typography tiêu đề |
| `subtitleTypography` | `.accordion-subtitle` | Typography subtitle |
| `titleBackgroundColor` | `.accordion-title-wrapper` | Background |
| `titleBorder` | `.accordion-title-wrapper` | Border |
| `titleActiveTypography` | `.brx-open .title` | Typography khi active |
| `titleActiveBackgroundColor` | `.brx-open .accordion-title-wrapper` | Background khi active |
| `titleActiveBorder` | `.brx-open .accordion-title-wrapper` | Border khi active |

### Content Group
| Key | Selector | Mô tả |
|-----|----------|-------|
| `contentMargin` | `.accordion-content-wrapper` | Margin |
| `contentPadding` | `.accordion-content-wrapper` | Padding |
| `contentTypography` | `.accordion-content-wrapper` | Typography content |
| `contentBackgroundColor` | `.accordion-content-wrapper` | Background |
| `contentBorder` | `.accordion-content-wrapper` | Border |

---

## HTML Structure

```html
<ul class="brxe-accordion">
  <li class="accordion-item [brx-open]">
    <div class="accordion-title-wrapper" role="button">
      <div class="accordion-title">
        <h3 class="title">Câu hỏi</h3>
        <i class="icon">...</i>
      </div>
      <div class="accordion-subtitle">Phụ đề</div>
    </div>
    <div class="accordion-content-wrapper">
      <p>Nội dung câu trả lời</p>
    </div>
  </li>
</ul>
```

---

## Ví dụ JSON

### FAQ Accordion
```json
{
  "id": "accFAQ",
  "name": "accordion",
  "parent": "ctnFAQ",
  "settings": {
    "accordions": [
      {
        "title": "Làm thế nào để đăng ký?",
        "content": "<p>Bạn có thể đăng ký bằng cách điền form bên dưới và nhấn Gửi.</p>"
      },
      {
        "title": "Chính sách hoàn tiền như thế nào?",
        "content": "<p>Chúng tôi hoàn tiền 100% trong vòng 30 ngày nếu không hài lòng.</p>"
      }
    ],
    "faqSchema": true,
    "expandItem": "0",
    "titleTag": "h3",
    "titlePadding": {"top": "16px", "right": "20px", "bottom": "16px", "left": "20px"},
    "titleTypography": {
      "font-size": "16px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    },
    "titleActiveBackgroundColor": {"hex": "#f0f7ff"},
    "contentPadding": {"top": "16px", "right": "20px", "bottom": "16px", "left": "20px"},
    "contentTypography": {
      "font-size": "15px",
      "line-height": "1.7",
      "color": {"hex": "#555555"}
    },
    "icon": {"library": "ionicons", "icon": "ion-ios-arrow-forward"},
    "iconExpanded": {"library": "ionicons", "icon": "ion-ios-arrow-down"}
  }
}
```
