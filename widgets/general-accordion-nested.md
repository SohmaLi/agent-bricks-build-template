# Widget: `accordion-nested`

> **Source:** `bricks/includes/elements/accordion-nested.php`
> **Category:** general | **Nestable:** true | **Scripts:** bricksAccordion

Accordion nestable — mỗi item accordion là một nestable block với title và content tùy chỉnh hoàn toàn.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `openItemIndex` | number | Index item mở sẵn **(0-based: 0=item1, 1=item2...)** ⚠️ |
| `titleHeight` | text | Chiều cao title row (e.g. `50px`) |
| `titlePadding` | spacing | Padding title |
| `titleBackgroundColor` | color | BG title inactive |
| `titleActiveBackgroundColor` | color | BG title khi active |
| `titleTypography` | typography | Typography title |
| `titleActiveTypography` | typography | Typography title khi active |
| `contentPadding` | spacing | Padding content area |
| `contentColor` | color | Màu text content |
| `contentBackgroundColor` | color | BG content area |
| `contentBorder` | border | Border giữa items |
| `transition` | text | CSS transition (e.g. `height 0.3s ease`) |

---

## Nestable Structure

```
accordion-nested [root]
├── block "Item" (accordion item 1)
│   ├── block (.accordion-title-wrapper)  ← flex row, space-between, align-center
│   │   ├── heading (title text)
│   │   └── icon (arrow icon — dùng ionicons)
│   └── block (.accordion-content-wrapper)  ← content area
│       └── text / [any content]
└── block "Item" (accordion item 2)
    ├── block (.accordion-title-wrapper)
    │   ├── heading
    │   └── icon
    └── block (.accordion-content-wrapper)
        └── text / [any content]
```

---

## ⚠️ CRITICAL RULES

### 1. Hai class bắt buộc

| Block | Class |
|-------|-------|
| Title block | `accordion-title-wrapper` |
| Content block | `accordion-content-wrapper` |

Set qua `_hidden._cssClasses`.

### 2. Title wrapper settings bắt buộc

```json
"settings": {
  "_direction": "row",
  "_alignItems": "center",
  "_justifyContent": "space-between",
  "_hidden": { "_cssClasses": "accordion-title-wrapper" }
}
```

### 3. Icon arrow trong title = `icon` widget với ionicons

```json
{
  "name": "icon",
  "settings": {
    "icon": {
      "icon": "ion-ios-arrow-forward",
      "library": "ionicons"
    },
    "iconSize": "1em"
  }
}
```

### 4. Item wrapper = `block` với `label: "Item"` (không cần class)

### 5. Bricks JS tự handle open/close — KHÔNG dùng CSS ẩn content thủ công

---

## Ví dụ JSON — Full Element Tree (dùng với `update_content`)

```json
[
  {
    "id": "acroot",
    "name": "accordion-nested",
    "parent": "0",
    "children": ["acitm1", "acitm2"],
    "settings": {
      "titleHeight": "56px",
      "titlePadding": {"top": "16px", "right": "24px", "bottom": "16px", "left": "24px"},
      "contentPadding": {"top": "16px", "right": "24px", "bottom": "16px", "left": "24px"},
      "openItemIndex": 1,
      "titleTypography": {
        "font-size": "16px",
        "font-weight": "600",
        "color": {"hex": "#1a1a1a"}
      },
      "contentColor": {"hex": "#666666"}
    }
  },
  {
    "id": "acitm1",
    "name": "block",
    "parent": "acroot",
    "children": ["actit1", "accnt1"],
    "settings": {},
    "label": "Item"
  },
  {
    "id": "actit1",
    "name": "block",
    "parent": "acitm1",
    "children": ["achdg1", "acicn1"],
    "settings": {
      "_direction": "row",
      "_alignItems": "center",
      "_justifyContent": "space-between",
      "_hidden": { "_cssClasses": "accordion-title-wrapper" }
    },
    "label": "Title"
  },
  {
    "id": "achdg1",
    "name": "heading",
    "parent": "actit1",
    "children": [],
    "settings": {
      "text": "Câu hỏi thứ nhất?",
      "tag": "h5"
    }
  },
  {
    "id": "acicn1",
    "name": "icon",
    "parent": "actit1",
    "children": [],
    "settings": {
      "icon": {
        "icon": "ion-ios-arrow-forward",
        "library": "ionicons"
      },
      "iconSize": "1em"
    }
  },
  {
    "id": "accnt1",
    "name": "block",
    "parent": "acitm1",
    "children": ["actxt1"],
    "settings": {
      "_hidden": { "_cssClasses": "accordion-content-wrapper" }
    },
    "label": "Content"
  },
  {
    "id": "actxt1",
    "name": "text",
    "parent": "accnt1",
    "children": [],
    "settings": {
      "text": "Nội dung câu trả lời cho câu hỏi thứ nhất."
    }
  },
  {
    "id": "acitm2",
    "name": "block",
    "parent": "acroot",
    "children": ["actit2", "accnt2"],
    "settings": {},
    "label": "Item"
  },
  {
    "id": "actit2",
    "name": "block",
    "parent": "acitm2",
    "children": ["achdg2", "acicn2"],
    "settings": {
      "_direction": "row",
      "_alignItems": "center",
      "_justifyContent": "space-between",
      "_hidden": { "_cssClasses": "accordion-title-wrapper" }
    },
    "label": "Title"
  },
  {
    "id": "achdg2",
    "name": "heading",
    "parent": "actit2",
    "children": [],
    "settings": {
      "text": "Câu hỏi thứ hai?",
      "tag": "h5"
    }
  },
  {
    "id": "acicn2",
    "name": "icon",
    "parent": "actit2",
    "children": [],
    "settings": {
      "icon": {
        "icon": "ion-ios-arrow-forward",
        "library": "ionicons"
      },
      "iconSize": "1em"
    }
  },
  {
    "id": "accnt2",
    "name": "block",
    "parent": "acitm2",
    "children": ["actxt2"],
    "settings": {
      "_hidden": { "_cssClasses": "accordion-content-wrapper" }
    },
    "label": "Content"
  },
  {
    "id": "actxt2",
    "name": "text",
    "parent": "accnt2",
    "children": [],
    "settings": {
      "text": "Nội dung câu trả lời cho câu hỏi thứ hai."
    }
  }
]
```
