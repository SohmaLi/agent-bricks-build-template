# Widget: `accordion-nested`

> **Source:** `bricks/includes/elements/accordion-nested.php`
> **Category:** general | **Nestable:** true | **Scripts:** bricksAccordion
> **css_selector:** `.accordion-title-wrapper` (title), `.accordion-content-wrapper` (content)

Accordion nestable — mỗi item là một nestable block với title và content tùy chỉnh hoàn toàn. Hỗ trợ FAQ Schema.

---

## Khác với `accordion` (non-nestable)

| | `accordion` | `accordion-nested` |
|---|---|---|
| Content | Text + dynamic data | **Bất kỳ Bricks elements** |
| Linh hoạt | Giới hạn | **Tuyệt đối** |
| Schema | Không | FAQ Schema tự động |

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `_children` | repeater (nestable) | Danh sách accordion items |
| `expandItem` | text | Index (0-based) của items mở sẵn, phân cách bằng dấu phẩy vd: `"0,2"` |
| `independentToggle` | checkbox | Mở/đóng độc lập (không tự đóng items khác) |
| `transition` | number (ms) | Animation speed (default: 200ms) |
| `faqSchema` | checkbox | Xuất FAQ Schema JSON-LD |

### Title Group (selector: `.accordion-title-wrapper`)
| Key | Mô tả |
|-----|-------|
| `titleHeight` | Min-height (default: `50px`) |
| `titleMargin/Padding` | Spacing |
| `titleBackgroundColor` | Background |
| `titleBorder` | Border |
| `titleTypography` | Typography |
| `titleActiveBackgroundColor` | Background khi open (``.brx-open .accordion-title-wrapper`) |
| `titleActiveBorder` | Border khi open |
| `titleActiveTypography` | Typography khi open |

### Content Group (selector: `.accordion-content-wrapper`)
| Key | Mô tả |
|-----|-------|
| `contentMargin/Padding` | Spacing (default padding: 15px 0) |
| `contentBackgroundColor` | Background |
| `contentBorder` | Border |
| `contentTypography` | Typography |

---

## Nestable Structure

Mỗi accordion item:
```
Block (accordion item)
├── Block (.accordion-title-wrapper) ← click để mở
│   ├── Heading (tiêu đề)
│   └── Icon (arrow)
└── Block (.accordion-content-wrapper) ← nội dung ẩn/hiện
    └── Text / Image / bất kỳ element
```

---

## Ví dụ JSON

```json
{
  "id": "accFaq",
  "name": "accordion-nested",
  "settings": {
    "expandItem": "0",
    "independentToggle": true,
    "transition": 300,
    "faqSchema": true,
    "titleHeight": "56px",
    "titlePadding": {"top": "0", "right": "20px", "bottom": "0", "left": "20px"},
    "titleTypography": {
      "font-size": "16px",
      "font-weight": "600"
    },
    "titleActiveBackgroundColor": {"hex": "#F0F7FF"},
    "contentPadding": {"top": "16px", "right": "20px", "bottom": "20px", "left": "20px"}
  }
}
```
