# Widget Map — Settings JSON Examples

> Dùng làm tham khảo khi viết cột "Settings JSON" trong Widget Map (Flow 1)
> hoặc khi build JSON array trong Sub-bước B (Flow 2).
>
> **Quy tắc:** Valid JSON, dùng native keys trước. `_cssCustom` chỉ khi không có native.
> Tra cứu native keys đầy đủ: `rule-template-bricks.md` — Rule 5.

---

## ⚠️ CRITICAL — `%root%` vs `#brxe-[id]` trong `_cssCustom`

| Ngữ cảnh | Format đúng | Lý do |
|----------|-------------|-------|
| **Bricks Editor UI** (lưu tay) | `%root% { ... }` | Bricks replace `%root%` thành selector thật khi compile |
| **MCP API** (`update_content`, `bulk_update`) | `#brxe-[element-id] { ... }` | API KHÔNG replace `%root%` → CSS bị invalid, không render |

> **Khi dùng MCP luôn dùng `#brxe-[element-id]`** thay vì `%root%`.
> Các ví dụ bên dưới dùng `%root%` để dễ đọc — **phải thay thế bằng `#brxe-[id]` khi push qua MCP**.

---

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
  "_cssCustom": "/* ⚠️ API: đổi %root% → #brxe-[id] */ %root% { background: linear-gradient(135deg, #007cfc 0%, #5b4fcf 100%); }"
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
  "_gridTemplateColumns": "repeat(3, 1fr)"
}
```
> ✅ `_gridTemplateColumns` là **native key** của `container`/`block`/`div` (cùng extend `Element_Container`).
> ✔ Dùng native key thay vì `_cssCustom` — sạch hơn, không cần `#brxe-[id]`.

### `block` — Card với inset box-shadow (bắt buộc dùng `_cssCustom`)
```json
{
  "_border": {
    "radius": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"},
    "width": {"top": "2px", "right": "2px", "bottom": "2px", "left": "2px"},
    "style": "solid",
    "color": {"hex": "rgba(0,124,252,0.5)"}
  },
  "_cssCustom": "/* ⚠️ API: đổi %root% → #brxe-[id] */ %root% { box-shadow: inset 0px 0px 24px 0px rgba(0,124,252,0.2); }"
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
  "_cssCustom": "/* ⚠️ API: đổi %root% → #brxe-[id] */ %root%:hover { background-color: #0056b3; }"
}
```

### `slider-nested` — Bắt buộc dùng khi có slider/carousel
> ⚠️ Tên đúng: `slider-nested` (KHÔNG phải `slider-nestable`)
> Xem full structure: `widgets/media-slider-nested.md`

```json
{
  "autoplay": false,
  "navigation": true,
  "pagination": true,
  "speed": 500,
  "loop": true
}
```

### `tabs-nested` — Bắt buộc dùng khi có tabs
> ⚠️ Tên đúng: `tabs-nested` (KHÔNG phải `tabs-nestable`)
> Xem full structure + Critical Rules: `widgets/general-tabs-nested.md`

```json
{
  "direction": "row",
  "openTabOn": "click",
  "openTab": "0"
}
```

---

## Patterns nâng cao (từ Session lessons)

### ⚠️ `justify-content: center` — cần container có width

`justify-content: center` chỉ có tác dụng khi container **rộng hơn** tổng width của children.

| Vấn đề | Container auto-width (= text width) → `justify-content` không có space để center |
|--------|---|
| **Fix A** | Thêm `_width: "1140px"` (hoặc `_widthMax: "1140px"` + `_margin: auto`) |
| **Fix B** | Đổi sang `_direction: "column"` + `_alignItems: "center"` (cross axis = horizontal khi column) |

> ✅ **Centering đơn giản nhất:** flex-direction column + align-items center — không cần set width.

---

### 🔵 Icon circle với gradient + flex-shrink

> **Dùng khi:** Section header có icon circle fixed-size nằm trong flex row
>
> ⚠️ **BẮT BUỘC** `_flexShrink: "0"` — thiếu → circle bị squish trong flex row

```json
{
  "id": "ico000",
  "name": "block",
  "settings": {
    "_width": "100px",
    "_height": "100px",
    "_flexShrink": "0",
    "_display": "flex",
    "_alignItems": "center",
    "_justifyContent": "center",
    "_border": {"radius": {"top": "999px", "right": "999px", "bottom": "999px", "left": "999px"}},
    "_cssCustom": "#brxe-ico000{ background: radial-gradient(52.5% 40.5% at 52.5% 74%, #007CFC 0%, #1EAFFF 100%); box-shadow: 0 4px 24px 0 rgba(255,255,255,0.88) inset; }"
  }
},
{
  "id": "svg000",
  "name": "image",
  "settings": {
    "_width": "52px",
    "_height": "52px",
    "_flexShrink": "0",
    "_objectFit": "contain",
    "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].svg"}
  }
}
```

> ⚠️ Màu gradient lấy **exact từ Figma DevMode > Code > CSS** — KHÔNG đoán. Thường là `radial-gradient(52.5% 40.5% at 52.5% 74%, [color-primary-700] 0%, [color-primary-500] 100%)`.

---

### 🏷️ Badge với SVG background + text overlay

> **Dùng khi:** Badge/label có hình nền SVG (shield, ribbon) với text chồng lên

```
badge-container (position: absolute — để float trên card)
  ├── SVG image (position: absolute, full-fill container)
  └── text label (position: relative, z-index: 1)
```

```json
{
  "id": "bgc000",
  "name": "block",
  "settings": {
    "_position": "absolute",
    "_left": "22px",
    "_top": "-2px",
    "_width": "81px",
    "_height": "52px",
    "_display": "flex",
    "_alignItems": "center",
    "_justifyContent": "center"
  }
},
{
  "id": "svb000",
  "name": "image",
  "settings": {
    "_position": "absolute",
    "_top": "0",
    "_left": "0",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "contain",
    "image": {"id": 0, "url": "http://localhost:3845/assets/[badge-hash].svg"}
  }
},
{
  "id": "lbl000",
  "name": "text-basic",
  "settings": {
    "_position": "relative",
    "_zIndex": 1,
    "text": "CDMP"
  }
}
```

> ⚠️ Card cha phải có `_position: "relative"` để badge `position: absolute` hoạt động.
> ⚠️ Thiếu `_top`/`_left` trên SVG → SVG nằm ngoài flow → badge container không có intrinsic width → render sai.

---

### 🎠 Splide slider — Arrows dưới track (CSS order)

> **Dùng khi:** Arrows cần nằm BÊN DƯỚI slides thay vì overlay/top

```json
{
  "_cssCustom": "#brxe-sld000 .splide__track { order: 1; } #brxe-sld000 .splide__arrows { order: 2; margin-top: 24px; display: flex; justify-content: center; gap: 12px; position: static; } #brxe-sld000 .splide__arrow { position: static; transform: none !important; } #brxe-sld000 .splide__arrow--prev { transform: rotate(180deg) !important; } #brxe-sld000 .splide__arrow--next { transform: none !important; }"
}
```

> ⚠️ `transform: none !important` dùng CHUNG sẽ xóa cả rotate 180deg của prev arrow → cả 2 arrow cùng chiều.
> ✅ Luôn tách riêng `--prev { rotate(180deg) }` và `--next { none }`.

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

---

## Responsive — Composite Key Examples

> ⛔ **RULE — Chỉ dùng khi user yêu cầu rõ ràng trong lệnh.**
> Mặc định build desktop-only. Không tự thêm breakpoint keys.

### Composite key format: `{property}:{breakpoint}` hoặc `{property}:{breakpoint}:{pseudo}`

### Block — Responsive padding + flex → block

```json
{
  "id": "blkres",
  "name": "block",
  "parent": "secabc",
  "children": [],
  "settings": {
    "_display": "flex",
    "_direction": "row",
    "_columnGap": "32px",
    "_padding": {"top": "60px", "bottom": "60px", "left": "24px", "right": "24px"},

    "_direction:tablet_portrait": "column",
    "_rowGap:tablet_portrait": "24px",

    "_padding:mobile_portrait": {"top": "32px", "bottom": "32px", "left": "16px", "right": "16px"}
  }
}
```

### Block — Grid responsive (dùng native key `_gridTemplateColumns` + composite key)

> ✅ `_gridTemplateColumns` là native key — hỗ trợ composite key cho responsive, KHÔNG cần `_cssCustom`.

```json
{
  "id": "grdblk",
  "name": "block",
  "parent": "secabc",
  "children": [],
  "settings": {
    "_display": "grid",
    "_columnGap": "24px",
    "_rowGap": "24px",
    "_gridTemplateColumns": "repeat(3, 1fr)",
    "_gridTemplateColumns:tablet_portrait": "repeat(2, 1fr)",
    "_gridTemplateColumns:mobile_portrait": "1fr"
  }
}
```

### Heading — Font size responsive

```json
{
  "id": "hdgttl",
  "name": "heading",
  "parent": "blkres",
  "children": [],
  "settings": {
    "tag": "h2",
    "text": "Tiêu đề section",
    "_typography": {"font-size": "48px", "font-weight": "700"},
    "_typography:tablet_portrait": {"font-size": "36px"},
    "_typography:mobile_portrait": {"font-size": "28px"}
  }
}
```

### Image — Ẩn trên mobile

```json
{
  "id": "imgdsk",
  "name": "image",
  "parent": "blkres",
  "children": [],
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
    "_width": "480px",
    "_objectFit": "cover",
    "_flexShrink": "0",
    "_display:mobile_portrait": "none"
  }
}
```

> ✅ Chỉ ghi breakpoint khi cần override so với desktop.
> ✅ Không lặp lại giá trị giống desktop ở breakpoint nhỏ hơn.

---

## Slider-nested — Responsive perPage & gap (verified)

> ⛔ **RULE 9** — Responsive chỉ thêm khi user yêu cầu rõ ràng.
> **Nguồn:** `template-blog-author-s3-su-kien` — verified hoạt động.

Slider-nested hỗ trợ composite key trực tiếp trên các option của Splide:

```json
{
  "perPage": 3,
  "gap": "24px",
  "perPage:mobile_portrait": "1",
  "gap:mobile_portrait": "16px"
}
```

> ✅ `perPage:tablet_portrait`, `gap:tablet_portrait`... hoạt động tương tự.
> ✅ Composite key trên slider = dùng cùng breakpoint keys của site.
> ✅ Không cần viết media query trong `_cssCustom` cho các Splide options này.
>
> Xem full pattern (arrows + equal-height cards): `widgets/media-slider-nested.md` → mục "Pattern thực tế".
