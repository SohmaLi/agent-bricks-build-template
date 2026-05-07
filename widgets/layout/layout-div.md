# Widget: `div`

> **Source:** `bricks/includes/elements/div.php` — extends `Element_Container`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `div`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)
> **Content controls:** Giống hệt `block` — xem [layout-block.md](layout-block.md)

---

## Khác biệt với `block`

| | `block` | `div` |
|--|---------|-------|
| Settings keys | Giống hệt nhau | Giống hệt nhau |
| HTML output | `<div>` | `<div>` |
| Label trong editor | "Block" | "Div" |
| Convention dùng ở đâu | Layout wrapper (row, col, card) | Element nhỏ: badge, chip, icon wrapper, meta |

> `block` và `div` render **cùng HTML** — chọn cái nào là tùy convention và semantic trong editor.

> ⚠️ **G2 Risk áp dụng cho cả `div`:** Bricks inject `flex-wrap: wrap` cho `.brxe-div` tại max-width 767px, giống `.brxe-block`. Fix bằng `_flexWrap: "nowrap"`.

---

## Khi nào dùng `div` thay `block`

| Use case | Lý do dùng `div` |
|----------|-----------------|
| Badge / chip / tag | Nhỏ, semantic rõ "đây là div thuần" |
| Icon wrapper (wraps `<img>` icon) | Phân biệt với layout block phía trên |
| Meta row (date, author, reading-time) | Small inline wrapper |
| Tooltip target | Wrapper nhỏ cho JS hook |
| Decorative element (dot, line, divider shape) | Không nhầm với layout node |

---

## Ví dụ JSON

### Div badge / chip

```json
{
  "id": "divBadge",
  "name": "div",
  "parent": "blkCard",
  "children": ["txtBadge"],
  "settings": {
    "_display": "flex",
    "_alignItems": "center",
    "_padding": {"top": "4px", "bottom": "4px", "left": "12px", "right": "12px"},
    "_border": {
      "radius": {"top": "100px", "right": "100px", "bottom": "100px", "left": "100px"}
    },
    "_background": {"color": {"hex": "#EFF6FF"}},
    "_cssCustom": "#brxe-divBadge { display: inline-flex; }"
  }
}
```

### Div icon wrapper (flex-shrink: 0 — bắt buộc trong flex row)

```json
{
  "id": "divIcon",
  "name": "div",
  "parent": "blkFeature",
  "children": ["imgIcon"],
  "settings": {
    "_display": "flex",
    "_alignItems": "center",
    "_justifyContent": "center",
    "_width": "48px",
    "_height": "48px",
    "_flexShrink": "0",
    "_border": {
      "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
    },
    "_background": {"color": {"hex": "#EFF6FF"}}
  }
}
```

### Div absolute badge trên card

```json
{
  "id": "divTag",
  "name": "div",
  "parent": "blkCard",
  "children": ["txtTag"],
  "settings": {
    "_position": "absolute",
    "_top": "16px",
    "_left": "16px",
    "_display": "flex",
    "_alignItems": "center",
    "_padding": {"top": "4px", "bottom": "4px", "left": "10px", "right": "10px"},
    "_border": {
      "radius": {"top": "6px", "right": "6px", "bottom": "6px", "left": "6px"}
    },
    "_background": {"color": {"hex": "#007CFC"}},
    "_zIndex": "2"
  }
}
```

### Div decorative dot / shape

```json
{
  "id": "divDot",
  "name": "div",
  "parent": "blkRow",
  "children": [],
  "settings": {
    "_width": "8px",
    "_height": "8px",
    "_flexShrink": "0",
    "_border": {
      "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
    },
    "_background": {"color": {"hex": "#007CFC"}}
  }
}
```

---

## ⚠️ Keys hay bị nhầm

Xem [layout-block.md](layout-block.md) — áp dụng như nhau cho `div`.
