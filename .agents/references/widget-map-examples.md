# Widget Map — Settings JSON Examples

> Dùng làm tham khảo khi viết cột "Settings JSON" trong Widget Map (Flow 1)
> hoặc khi build JSON array trong Sub-bước B (Flow 2).
>
> **Quy tắc:** Valid JSON, dùng native keys trước. `_cssCustom` chỉ khi không có native.
> Tra cứu native keys đầy đủ: `rule-template-bricks.md` — Rule 5.

---

## Layout Elements

### `section` — Root wrapper
```json
{
  "_padding": {"top": "80px", "bottom": "80px", "left": "0px", "right": "0px"},
  "_background": {"color": {"hex": "#ffffff"}}
}
```

### `section` — Gradient background
```json
{
  "_padding": {"top": "80px", "bottom": "80px", "left": "0px", "right": "0px"},
  "_cssCustom": "%root% { background: linear-gradient(135deg, #007cfc 0%, #5b4fcf 100%); }"
}
```

### `block` — Flex row container
```json
{
  "_display": "flex",
  "_direction": "row",
  "_alignItems": "center",
  "_columnGap": "24px",
  "_widthMax": "1140px",
  "_margin": {"top": "0px", "bottom": "0px", "left": "auto", "right": "auto"}
}
```

### `block` — Flex column
```json
{
  "_display": "flex",
  "_direction": "column",
  "_rowGap": "16px"
}
```

### `block` — Grid 3 columns
```json
{
  "_display": "grid",
  "_columnGap": "24px",
  "_rowGap": "24px",
  "_cssCustom": "%root% { grid-template-columns: repeat(3, 1fr); }"
}
```

### `block` — Card với inset box-shadow (bắt buộc dùng `_cssCustom`)
```json
{
  "_border": {
    "radius": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"},
    "width": {"top": "2px", "right": "2px", "bottom": "2px", "left": "2px"},
    "style": "solid",
    "color": {"hex": "rgba(0,124,252,0.5)"}
  },
  "_cssCustom": "%root% { box-shadow: inset 0px 0px 24px 0px rgba(0,124,252,0.2); }"
}
```
> ⚠️ Native `_boxShadow` **không hỗ trợ `inset`** → bắt buộc dùng `_cssCustom`.
> Inset shadow không bị clip bởi `_overflow: hidden`. Outset shadow thì bị clip — tránh dùng `overflow:hidden` khi cần outset shadow.

### `block` — Absolute positioned (overlay)
```json
{
  "_position": "absolute",
  "_top": "0px",
  "_left": "0px",
  "_width": "100%",
  "_height": "100%",
  "_zIndex": 1
}
```

---

## Text Elements

### `heading`
```json
{
  "tag": "h2",
  "text": "Tiêu đề section"
}
```

### `text-basic`
```json
{
  "text": "Nội dung đoạn văn"
}
```

### `text` (rich text)
```json
{
  "text": "<p>Đoạn văn <strong>bold</strong></p>"
}
```

---

## Image Elements

### `image` — Standard (Cách 1: Figma localhost URL)
```json
{
  "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
  "_width": "100%",
  "_height": "auto",
  "_objectFit": "cover"
}
```

### `image` — Fixed size
```json
{
  "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
  "_width": "520px",
  "_height": "520px",
  "_objectFit": "cover",
  "_objectPosition": "50% 30%"
}
```

### `image` — Absolute positioned (background)
```json
{
  "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
  "_position": "absolute",
  "_top": "0px",
  "_left": "0px",
  "_width": "100%",
  "_height": "100%",
  "_objectFit": "cover",
  "_zIndex": 0
}
```

### `image` — Masked (SVG mask)
```json
{
  "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
  "_width": "599px",
  "_height": "599px",
  "_objectFit": "cover",
  "_cssCustom": "%root% img { -webkit-mask-image: url(http://localhost:3845/assets/[mask-hash].svg); mask-image: url(...); -webkit-mask-size: cover; mask-size: cover; }"
}
```

---

## Interactive Elements

### `button`
```json
{
  "text": "Xem bài chia sẻ",
  "style": "outline",
  "_background": {"color": {"hex": "#007cfc"}},
  "_border": {"radius": "12px"},
  "_cssCustom": "%root%:hover { background-color: #0056b3; }"
}
```

### `slider-nestable` — Bắt buộc dùng khi có slider/carousel
```json
{
  "autoplay": false,
  "speed": 500,
  "dots": true,
  "arrows": true
}
```

### `tabs-nestable` — Bắt buộc dùng khi có tabs
```json
{
  "direction": "horizontal"
}
```

---

## Native Flat Format — Khung JSON đầy đủ

> Mỗi element khi push qua API **bắt buộc** có đủ `id + parent + children`.

```json
[
  {
    "id": "secabc",
    "name": "section",
    "parent": 0,
    "children": ["blkinn"],
    "settings": {
      "_padding": {"top": "80px", "bottom": "80px", "left": "0px", "right": "0px"}
    }
  },
  {
    "id": "blkinn",
    "name": "block",
    "parent": "secabc",
    "children": ["hdgttl", "txtdsc"],
    "settings": {
      "_display": "flex",
      "_direction": "column",
      "_rowGap": "24px"
    }
  },
  {
    "id": "hdgttl",
    "name": "heading",
    "parent": "blkinn",
    "children": [],
    "settings": {"tag": "h2", "text": "Tiêu đề"}
  },
  {
    "id": "txtdsc",
    "name": "text-basic",
    "parent": "blkinn",
    "children": [],
    "settings": {"text": "Mô tả nội dung"}
  }
]
```

> **ID format:** 6 ký tự `[a-z0-9]`
> **Root parent:** integer `0` (không phải string `"0"`)
> **Children:** khớp 2 chiều với `parent` của từng con
