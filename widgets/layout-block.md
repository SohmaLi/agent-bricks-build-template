# Widget: `block` & `div`

> **Source:** `bricks/includes/elements/block.php` & `div.php` — đều extend `Element_Container`
> **Category:** layout | **Nestable:** ✅

`block` và `div` **hoàn toàn giống nhau về settings** — chỉ khác label trong editor.
Cả hai có đầy đủ settings của `container`.

---

## Khi nào dùng `block` vs `div`

| Widget | Dùng khi |
|--------|---------|
| `block` | Wrapper layout trong container (row, col, card wrapper, overlay...) |
| `div` | Muốn nhấn mạnh đây là `<div>` thuần, thường cho inner content wrapper nhỏ |

> Về mặt kỹ thuật, cả hai đều render `<div>` (hoặc tag nào bạn set trong `tag` setting).

---

## Settings

**Hoàn toàn giống `container`** — xem [layout-container.md](layout-container.md).

---

## Ví dụ JSON thường gặp

### Block làm row flex (2 cột)
```json
{
  "id": "blkRow",
  "name": "block",
  "parent": "ctnXXX",
  "settings": {
    "_display": "flex",
    "_direction": "row",
    "_columnGap": "24px",
    "_alignItems": "center"
  }
}
```

### Block làm column bên trái
```json
{
  "id": "blkLeft",
  "name": "block",
  "parent": "blkRow",
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_rowGap": "16px",
    "_width": "50%",
    "_flexShrink": "0"
  }
}
```

### Block card với border + shadow (dùng `_cssCustom`)
```json
{
  "id": "blkCard",
  "name": "block",
  "parent": "blkGrid",
  "settings": {
    "_padding": {"top": "24px", "bottom": "24px", "left": "24px", "right": "24px"},
    "_border": {
      "radius": {"top": "16px", "right": "16px", "bottom": "16px", "left": "16px"},
      "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"},
      "style": "solid",
      "color": {"hex": "rgba(0,124,252,0.5)"}
    },
    "_cssCustom": "%root% {\n  box-shadow: inset 0 0 24px rgba(0, 124, 252, 0.15);\n  transition: transform 0.2s ease;\n}\n%root%:hover {\n  transform: translateY(-4px);\n}"
  }
}
```

### Block absolute image background
```json
{
  "id": "blkBG",
  "name": "block",
  "parent": "secXXX",
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

### Div wrapper nhỏ (badge, chip, tag)
```json
{
  "id": "divBadge",
  "name": "div",
  "parent": "blkCard",
  "settings": {
    "_display": "flex",
    "_alignItems": "center",
    "_padding": {"top": "4px", "bottom": "4px", "left": "12px", "right": "12px"},
    "_border": {
      "radius": {"top": "100px", "right": "100px", "bottom": "100px", "left": "100px"}
    },
    "_background": {"color": {"hex": "#e8f0ff"}},
    "_position": "absolute",
    "_top": "0px",
    "_left": "22px"
  }
}
```
