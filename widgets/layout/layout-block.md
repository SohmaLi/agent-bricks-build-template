# Widget: `block`

> **Source:** `bricks/includes/elements/block.php` — extends `Element_Container`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `div`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)
> **Content controls:** Giống hệt `container` — xem [layout-container.md](layout-container.md)

---

## Điểm khác biệt so với `container`

| | `container` | `block` |
|--|-------------|---------|
| Auto max-width từ site settings | ✅ Có | ❌ Không |
| Auto `margin: auto` | ✅ Có | ❌ Không |
| Dùng ở đâu | Direct child của `section` | Level 2+ trong container |
| Label trong editor | "Container" | "Block" |

> ⚠️ **G2 — Bricks inject `flex-wrap: wrap`** cho `.brxe-block` tại max-width 767px.
> Bất kỳ `block` nào có `_direction: "row"` mà cần giữ hàng trên mobile → **BẮT BUỘC** thêm `_flexWrap: "nowrap"`.

---

## Khi nào dùng `block`

| Use case | Layout |
|----------|--------|
| Row chứa icon + text | `_direction: "row"`, `_alignItems: "center"`, `_columnGap: "12px"` |
| 2-col layout (left/right col) | `_width: "50%"`, `_flexShrink: "0"` |
| Card wrapper | `_direction: "column"`, `_rowGap: "16px"`, `_border`, `_padding` |
| Grid container | `_display: "grid"`, `_gridTemplateColumns` |
| Absolute background overlay | `_position: "absolute"`, `_top/left: "0"`, `_width/height: "100%"` |
| Badge / tag / chip | Dùng `div` thay vì `block` — xem [layout-div.md](layout-div.md) |

---

## Ví dụ JSON

### Block flex-row — icon + text (cần `_flexWrap: nowrap`)

```json
{
  "id": "blkRow",
  "name": "block",
  "parent": "ctn001",
  "children": ["imgIcon", "txtLabel"],
  "settings": {
    "_display": "flex",
    "_direction": "row",
    "_alignItems": "center",
    "_columnGap": "12px",
    "_flexWrap": "nowrap"
  }
}
```

### Block — cột trái 50% (trong flex-row parent)

```json
{
  "id": "blkLeft",
  "name": "block",
  "parent": "ctn002",
  "children": ["hdg001", "txt001", "blkBtn"],
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_rowGap": "24px",
    "_width": "50%",
    "_flexShrink": "0",
    "_width:mobile_portrait": "100%"
  }
}
```

### Block card — border + hover effect

```json
{
  "id": "blkCard",
  "name": "block",
  "parent": "ctn003",
  "children": ["imgCard", "hdgCard", "txtCard"],
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_rowGap": "16px",
    "_padding": {"top": "24px", "bottom": "24px", "left": "24px", "right": "24px"},
    "_border": {
      "radius": {"top": "16px", "right": "16px", "bottom": "16px", "left": "16px"},
      "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"},
      "style": "solid",
      "color": {"hex": "#E5E7EB"}
    },
    "_background": {"color": {"hex": "#FFFFFF"}},
    "_cssCustom": "#brxe-blkCard { transition: transform 0.2s ease, box-shadow 0.2s ease; } #brxe-blkCard:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }"
  }
}
```

### Block — absolute background/overlay

```json
{
  "id": "blkBG",
  "name": "block",
  "parent": "sec001",
  "children": ["imgBG"],
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "0",
    "_overflow": "hidden"
  }
}
```

### Block — gradient overlay

```json
{
  "id": "blkOverlay",
  "name": "block",
  "parent": "sec001",
  "children": [],
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "1",
    "_cssCustom": "#brxe-blkOverlay { background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%); }"
  }
}
```

### Block grid 3×N — card grid

```json
{
  "id": "blkGrid",
  "name": "block",
  "parent": "ctn001",
  "children": ["blkCard1", "blkCard2", "blkCard3"],
  "settings": {
    "_display": "grid",
    "_gridTemplateColumns": "repeat(3, 1fr)",
    "_gridGap": "24px",
    "_gridTemplateColumns:tablet_portrait": "repeat(2, 1fr)",
    "_gridTemplateColumns:mobile_portrait": "1fr"
  }
}
```

---

## ⚠️ Keys hay bị nhầm

| ❌ Sai | ✅ Đúng |
|--------|--------|
| `_gap: "24px"` | `_columnGap: "24px"` + `_rowGap: "24px"` |
| `_borderRadius: "16px"` | `_border: {radius: {top:"16px", right:"16px", bottom:"16px", left:"16px"}}` |
| `_flexDirection: "row"` | `_direction: "row"` |
| `_paddingTop: "40px"` | `_padding: {top: "40px"}` |
| `flex-wrap trong _cssCustom` | `_flexWrap: "nowrap"` (native key có sẵn) |
