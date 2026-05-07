# Widget: `section`

> **Source:** `bricks/includes/elements/section.php` — extends `Element_Container`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `section`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

`section` là **subclass của `container`** — kế thừa **toàn bộ** settings của container.

Điểm khác biệt:

- HTML tag mặc định là `<section>` (không phải `<div>`)
- Khi thêm mới trong editor, Bricks **tự tạo 1 `container` con** bên trong
- `"parent": 0` (integer) — bắt buộc cho root element, API báo lỗi nếu dùng string `"0"`

---

## Root Element Rule

```json
{
  "id": "secABC",
  "name": "section",
  "parent": 0,
  "children": ["ctnInner"],
  "settings": { ... }
}
```

> ⚠️ `"parent": 0` — integer, **KHÔNG phải** string `"0"`.

---

## CONTENT Controls

### 1. HTML Tag & Link

| Key | Type | Options / Mô tả |
|-----|------|-----------------|
| `tag` | select | `div`, `section`, `a`, `article`, `nav`, `ol`, `ul`, `li`, `aside`, `address`, `figure`, `custom` |
| `customTag` | text | Bất kỳ HTML tag (chỉ khi `tag = "custom"`) |
| `link` | link | URL + target (chỉ khi `tag = "a"`) |

### 2. Display

| Key | CSS | Options |
|-----|-----|---------|
| `_display` | `display` | `flex` (default), `grid`, `block`, `inline-block`, `inline`, `none` |

### 3. Flex Controls (khi `_display = "flex"`)

| Key | CSS Property | Options / Ví dụ |
|-----|-------------|----------------|
| `_direction` | `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` |
| `_flexWrap` | `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `_justifyContent` | `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` |
| `_alignItems` | `align-items` | `flex-start`, `flex-end`, `center`, `stretch`, `baseline` |
| `_columnGap` | `column-gap` | `"24px"`, `"1rem"` |
| `_rowGap` | `row-gap` | `"16px"` |

### 4. Grid Controls (khi `_display = "grid"`)

| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridGap` | `grid-gap` | `"24px"` |
| `_gridTemplateColumns` | `grid-template-columns` | `"repeat(3, 1fr)"`, `"1fr 2fr 1fr"` |
| `_gridTemplateRows` | `grid-template-rows` | `"auto 1fr auto"` |
| `_gridAutoColumns` | `grid-auto-columns` | `"minmax(200px, 1fr)"` |
| `_gridAutoRows` | `grid-auto-rows` | `"200px"` |
| `_gridAutoFlow` | `grid-auto-flow` | `row`, `column`, `dense` |
| `_justifyItemsGrid` | `justify-items` | `start`, `end`, `center`, `stretch` |
| `_alignItemsGrid` | `align-items` | `start`, `end`, `center`, `stretch` |
| `_justifyContentGrid` | `justify-content` | standard values |
| `_alignContentGrid` | `align-content` | standard values |

### 5. Grid Item (khi parent dùng `display: grid`)

| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridItemColumnSpan` | `grid-column` | `"1 / 3"`, `"span 2"` |
| `_gridItemRowSpan` | `grid-row` | `"1 / 3"`, `"span 2"` |

### 6. Inner Container (chỉ layout elements)

> Áp dụng margin/padding lên **direct children** `.brxe-container`, `.brxe-block`, `.brxe-div`

| Key | CSS selector target | Ghi chú |
|-----|--------------------|----|
| `_innerContainerMargin` | `> .brxe-container, > .brxe-block, > .brxe-div` | Spacing bên ngoài container con |
| `_innerContainerPadding` | `> .brxe-container, > .brxe-block, > .brxe-div` | Padding bên trong container con |

```json
"_innerContainerPadding": {"top": "0px", "bottom": "0px", "left": "24px", "right": "24px"}
```

### 7. Shape Dividers (`_shapeDividers`)

> Chi tiết cấu trúc: [../shared-styles.md](../shared-styles.md#6-shape-dividers-group)

```json
"_shapeDividers": [
  {
    "shape": "wave",
    "fill": {"hex": "#ffffff"},
    "flipVertical": true,
    "height": 80,
    "width": 100
  }
]
```

> ⚠️ Cần `_position: "relative"` trên section khi dùng shape dividers.

### 8. Loop Builder

| Key | Type | Mô tả |
|-----|------|-------|
| `hasLoop` | boolean | Bật Query Loop cho element này |

---

## Ví dụ JSON

### Section hero full-height + gradient

```json
{
  "id": "secHero",
  "name": "section",
  "parent": 0,
  "children": ["ctnInner"],
  "settings": {
    "_heightMin": "100vh",
    "_position": "relative",
    "_overflow": "hidden",
    "_background": {"color": {"hex": "#00070e"}},
    "_cssCustom": "#brxe-secHero { background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%); }"
  }
}
```

### Section padding chuẩn + nền nhạt

```json
{
  "id": "secFeat",
  "name": "section",
  "parent": 0,
  "children": ["ctnInner"],
  "settings": {
    "_padding": {"top": "80px", "bottom": "80px", "left": "0px", "right": "0px"},
    "_padding:tablet_portrait": {"top": "48px", "bottom": "48px"},
    "_padding:mobile_portrait": {"top": "32px", "bottom": "32px"},
    "_background": {"color": {"hex": "#F8F9FA"}}
  }
}
```

### Section có shape divider phía dưới

```json
{
  "id": "secWave",
  "name": "section",
  "parent": 0,
  "children": ["ctnInner"],
  "settings": {
    "_position": "relative",
    "_background": {"color": {"hex": "#007CFC"}},
    "_padding": {"top": "80px", "bottom": "120px"},
    "_shapeDividers": [
      {
        "shape": "wave",
        "fill": {"hex": "#ffffff"},
        "flipVertical": true,
        "height": 80,
        "width": 100
      }
    ]
  }
}
```

### Section inner container padding responsive

```json
{
  "id": "secPad",
  "name": "section",
  "parent": 0,
  "children": ["ctnInner"],
  "settings": {
    "_innerContainerPadding": {"top": "0px", "bottom": "0px", "left": "24px", "right": "24px"},
    "_innerContainerPadding:mobile_portrait": {"left": "16px", "right": "16px"}
  }
}
```

---

## ⚠️ Gotchas

| Vấn đề | Fix |
|--------|-----|
| `"parent": "0"` (string) | Bắt buộc phải là `0` (integer) |
| `_cssCustom` không render | CSS loading = "External files" → Mở editor + **Ctrl+S** |
| Shape divider không show | Cần `_position: "relative"` trên section |
| Background video không play | Chrome không play mp4 inject JS → dùng URL trực tiếp |
| Section tag vẫn là `<div>` | `tag: "section"` không cần set vì default là `<section>` cho widget `section` |
