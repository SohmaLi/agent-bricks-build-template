# Shared Style Keys — Tất Cả Widget

> **Source:** `bricks/includes/elements/base.php` — `set_controls_before()` + `set_controls()`
> Áp dụng cho **mọi widget** trong Bricks Builder (trừ các ngoại lệ ghi rõ bên dưới).

---

## Cách dùng file này

**Trong widget file** (ví dụ: `basic-heading.md`), chỉ ghi **content-specific settings**.
Các style keys dưới đây **không cần lặp lại** trong từng widget file — AI đọc file này 1 lần/session là đủ.

```
Layout Tab (CONTENT):    → Xem file widget cụ thể
Style Tab (STYLE):       → File này
```

---

## ⚠️ Phân biệt Layout Element vs Non-Layout Element

| Widget | Loại | Ảnh hưởng |
|--------|------|-----------|
| `section`, `container`, `block`, `div` | **Layout Element** | Có thêm: shape dividers, background video. KHÔNG có `_flexDirection`, `_gap`, `_order` (chúng define riêng trong container.php) |
| `heading`, `button`, `image`, `text`, v.v. | **Non-Layout Element** | Có: `_flexDirection`, `_gap`, `_order`. KHÔNG có: shape dividers, background video |

---

## 1. LAYOUT Group — Box Model

### 1.1 Spacing

| Key | CSS | Value format |
|-----|-----|-------------|
| `_margin` | `margin` | `{"top":"0px","bottom":"0px","left":"auto","right":"auto"}` |
| `_padding` | `padding` | `{"top":"40px","bottom":"40px","left":"24px","right":"24px"}` |

### 1.2 Sizing

| Key | CSS | Ví dụ |
|-----|-----|-------|
| `_width` | `width` | `"100%"`, `"480px"`, `"50%"` |
| `_widthMin` | `min-width` | `"320px"` |
| `_widthMax` | `max-width` | `"1180px"` |
| `_height` | `height` | `"400px"`, `"100vh"`, `"100%"` |
| `_heightMin` | `min-height` | `"200px"`, `"100vh"` |
| `_heightMax` | `max-height` | `"600px"` |
| `_aspectRatio` | `aspect-ratio` | `"16/9"`, `"1/1"`, `"4/3"` |

### 1.3 Positioning

| Key | CSS | Options |
|-----|-----|---------|
| `_position` | `position` | `"static"`, `"relative"`, `"absolute"`, `"fixed"`, `"sticky"` |
| `_top` | `top` | `"0px"`, `"50%"`, `"-20px"` |
| `_right` | `right` | `"0px"`, `"24px"` |
| `_bottom` | `bottom` | `"0px"` |
| `_left` | `left` | `"0px"`, `"50%"` |
| `_zIndex` | `z-index` | `-1`, `0`, `1`, `10`, `999` |

> 💡 `_position: "sticky"` cần thêm `_top: "0px"` để hoạt động.

### 1.4 Misc (tất cả elements)

| Key | CSS | Options / Ví dụ |
|-----|-----|----------------|
| `_visibility` | `visibility` | `"visible"`, `"hidden"`, `"collapse"` |
| `_overflow` | `overflow` | `"visible"`, `"hidden"`, `"scroll"`, `"auto"`, `"hidden auto"` |
| `_opacity` | `opacity` | `0` → `1` (số thập phân) |
| `_cursor` | `cursor` | `"pointer"`, `"default"`, `"none"`, `"grab"`, `"zoom-in"`, ... |
| `_isolation` | `isolation` | `"auto"`, `"isolate"` |
| `_mixBlendMode` | `mix-blend-mode` | `"normal"`, `"multiply"`, `"screen"`, `"overlay"`, `"darken"`, `"lighten"`, ... |
| `_pointerEvents` | `pointer-events` | `"auto"`, `"none"` |

### 1.5 Display & Flex (chỉ Non-Layout Elements)

> Các keys này chỉ áp dụng cho widget NON-layout (heading, button, image, text...).
> Layout elements (section, container, block, div) define display/flex trong content tab của chính chúng.

| Key | CSS | Options |
|-----|-----|---------|
| `_display` | `display` | `"flex"`, `"block"`, `"inline-block"`, `"inline"`, `"none"` |
| `_flexDirection` | `flex-direction` | `"row"`, `"column"`, `"row-reverse"`, `"column-reverse"` |
| `_alignSelf` | `align-self` | `"flex-start"`, `"flex-end"`, `"center"`, `"stretch"` |
| `_justifyContent` | `justify-content` | `"flex-start"`, `"flex-end"`, `"center"`, `"space-between"` |
| `_alignItems` | `align-items` | `"flex-start"`, `"flex-end"`, `"center"`, `"stretch"` |
| `_gap` | `gap` | `"16px"`, `"1rem"` — Combined (không tách column/row) |
| `_flexGrow` | `flex-grow` | `0`, `1` |
| `_flexShrink` | `flex-shrink` | `0`, `1` |
| `_flexBasis` | `flex-basis` | `"auto"`, `"50%"`, `"200px"` |
| `_order` | `order` | `-1`, `0`, `1` |

### 1.6 Grid Native Keys

> Dùng khi `_display: "grid"` — tránh dùng `flex-wrap` cho grid nhiều cột (≥ 5 items).

| Key | CSS | Ví dụ |
|-----|-----|-------|
| `_gridTemplateColumns` | `grid-template-columns` | `"repeat(3, 1fr)"`, `"200px 1fr"` |
| `_gridTemplateRows` | `grid-template-rows` | `"auto"`, `"200px auto"` |
| `_columnGap` | `column-gap` | `"24px"` |
| `_rowGap` | `row-gap` | `"24px"` |
| `_gridColumn` | `grid-column` | `"span 2"`, `"1 / 3"` |
| `_gridRow` | `grid-row` | `"span 2"` |
| `_gridAutoFlow` | `grid-auto-flow` | `"row"`, `"column"`, `"dense"` |

```json
// Grid 3 cột desktop → 2 cột tablet → 1 cột mobile
{
  "_display": "grid",
  "_gridTemplateColumns": "repeat(3, 1fr)",
  "_columnGap": "24px",
  "_rowGap": "24px",
  "_gridTemplateColumns:tablet_portrait": "repeat(2, 1fr)",
  "_gridTemplateColumns:mobile_portrait": "1fr"
}
```

---

## ⚠️ Keys Cần BỎ QUA khi Build JSON

Các key sau **không có effect** trong settings JSON — chỉ là UI helpers trong editor:

| Pattern | Ví dụ | Bỏ qua vì |
|---------|-------|----------|
| `type: separator` | `iconSep`, `buttonSep`, `formTitleSep` | UI divider — không render |
| `type: info` | `filterQueryIdInfo`, `submenuStaticInfo`, `titleInfo` | Help text trong editor |
| Key kết thúc bằng `Sep` | `cookiesSep`, `fieldsSep`, `menuActiveSep` | Separator group |
| Key kết thúc bằng `Info` | `megaMenuInfo`, `multiLevelInfo` | Info notice |
| Key kết thúc bằng `Separator` | `linksSeparator`, `iconSeparator` | UI separator |

```json
// ❌ KHÔNG set separator/info keys:
{ "iconSep": true, "filterQueryIdInfo": "...", "buttonSep": null }

// ✅ CHỈ set actual value keys:
{ "icon": {"library": "themify", "icon": "ti-search"}, "iconColor": {"hex": "#007cfc"} }
```

---

## 2. TYPOGRAPHY Group

| Key | CSS | Mô tả |
|-----|-----|-------|
| `_typography` | `font` (shorthand) | Object compound — xem cấu trúc bên dưới |

### Cấu trúc `_typography` object

```json
"_typography": {
  "font-family": "Inter",
  "font-weight": "600",
  "font-size": {"value": 24, "unit": "px"},
  "line-height": {"value": 1.4, "unit": "em"},
  "letter-spacing": {"value": -0.02, "unit": "em"},
  "text-align": "left",
  "color": {"hex": "#1a1a2e"},
  "text-transform": "none",
  "font-style": "normal",
  "text-decoration": "none"
}
```

> Chỉ set các key cần thay đổi — key nào không set sẽ inherit từ cha.

---

## 3. BACKGROUND Group

| Key | CSS | Mô tả |
|-----|-----|-------|
| `_background` | `background` | Object compound — xem cấu trúc bên dưới |

### 3A. Background Color

```json
"_background": {
  "color": {"hex": "#F8F9FA"}
}
```

### 3B. Background Image

```json
"_background": {
  "image": {
    "url": "http://...",
    "id": 123,
    "size": "cover",
    "position": "center center",
    "repeat": "no-repeat",
    "attachment": "scroll"
  }
}
```

### 3C. Background Video (⚠️ Layout Elements only)

```json
"_background": {
  "videoUrl": "http://.../video.mp4",
  "videoScale": "100%",
  "videoAspectRatio": "16/9",
  "videoStartTime": 0,
  "videoEndTime": 0,
  "videoPlayOnce": false,
  "videoShowAtBreakpoint": "mobile_portrait"
}
```

> `videoPlayOnce: true` = play 1 lần rồi dừng (default: loop).

---

## 4. BORDER / BOX SHADOW Group

### 4A. Border (`_border`)

```json
"_border": {
  "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"},
  "style": "solid",
  "color": {"hex": "#E5E7EB"},
  "radius": {"top": "16px", "right": "16px", "bottom": "16px", "left": "16px"}
}
```

**Shorthand khi 4 cạnh giống nhau:**
```json
"_border": {
  "radius": {"top": "100px", "right": "100px", "bottom": "100px", "left": "100px"}
}
```

### 4B. Box Shadow (`_boxShadow`)

```json
"_boxShadow": {
  "values": [
    {
      "color": {"hex": "rgba(0,0,0,0.1)"},
      "offsetX": 0,
      "offsetY": 8,
      "blur": 24,
      "spread": 0,
      "inset": false
    }
  ]
}
```

**Inset shadow:**
```json
"_boxShadow": {
  "values": [
    {
      "color": {"hex": "rgba(0,124,252,0.2)"},
      "offsetX": 0,
      "offsetY": 0,
      "blur": 24,
      "spread": 0,
      "inset": true
    }
  ]
}
```

---

## 5. GRADIENT / OVERLAY Group

| Key | CSS | Mô tả |
|-----|-----|-------|
| `_gradient` | `background-image` | Object gradient — hoặc dùng `_cssCustom` cho complex gradient |

> Thực tế: Phần lớn gradient phức tạp nên dùng `_cssCustom` để copy exact từ Figma:
```json
"_cssCustom": "#brxe-[id] { background: linear-gradient(135deg, #007CFC 0%, #1EAFFF 100%); }"
```

---

## 6. SHAPE DIVIDERS Group (⚠️ Layout Elements only)

Key: `_shapeDividers` — Array of shape objects.

| Property | Type | Options |
|----------|------|---------|
| `shape` | string | `custom`, `cloud`, `drops`, `grid-round`, `grid-square`, `round`, `square`, `stroke`, `stroke-2`, `tilt`, `triangle`, `triangle-concave`, `triangle-convex`, `triangle-double`, `wave`, `waves`, `wave-brush`, `zigzag`, + `vertical-*` variants |
| `shapeCustom` | object | `{id: attachmentId}` — khi shape = "custom" |
| `fill` | object | `{"hex": "#ffffff"}` |
| `front` | boolean | Shape render phía trước content |
| `flipHorizontal` | boolean | Lật theo trục X |
| `flipVertical` | boolean | Lật theo trục Y |
| `overflow` | boolean | Cho phép overflow element boundary |
| `height` | number | Chiều cao (px) |
| `width` | number | Chiều rộng (px) |
| `rotate` | number | Góc xoay (degrees) |
| `top/right/bottom/left` | number | Position offset (px) |
| `horizontalAlign` | string | align-items value |
| `verticalAlign` | string | justify-content value |

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

> ⚠️ Element phải có `_position: "relative"` để shape dividers hiển thị đúng.

---

## 7. TRANSFORM Group

| Key | CSS | Ví dụ |
|-----|-----|-------|
| `_transform` | `transform` | `"translateX(-50%) translateY(-50%)"`, `"rotate(45deg)"`, `"scale(1.05)"` |
| `_transformOrigin` | `transform-origin` | `"center"`, `"top left"`, `"50% 100%"` |

```json
"_transform": "translateX(-50%) translateY(-50%)",
"_transformOrigin": "center center"
```

---

## 8. CSS Group

| Key | CSS | Mô tả |
|-----|-----|-------|
| `_cssFilters` | `filter` | Array of filter objects: `blur`, `brightness`, `contrast`, `grayscale`, `hue-rotate`, `invert`, `saturate`, `sepia` |
| `_cssTransition` | `transition` | String: `"all 0.3s ease"`, `"transform 0.2s ease, opacity 0.2s ease"` |
| `_cssCustom` | raw CSS | **⚠️ API push: dùng `#brxe-[id]`** thay vì `%root%` |
| `_cssClasses` | — | Global class names, cách nhau bằng space (không có dấu `.`) |
| `_cssId` | — | Custom CSS ID (không có dấu `#`). Hỗ trợ dynamic data |
| `_cssGlobalClasses` | — | Array of global class IDs (thường set qua UI, không set thủ công) |

### `_cssCustom` — API Pattern bắt buộc

```json
"_cssCustom": "#brxe-elemId { background: linear-gradient(135deg, #007CFC 0%, #1EAFFF 100%); } #brxe-elemId:hover { transform: translateY(-4px); }"
```

> ❌ **Sai:** `"%root% { color: red; }"` — chỉ hoạt động trong editor, không qua API
> ✅ **Đúng:** `"#brxe-[id] { color: red; }"` — hoạt động cả editor lẫn API

### `_cssFilters` cấu trúc

```json
"_cssFilters": [
  {"type": "blur", "value": 4, "unit": "px"},
  {"type": "brightness", "value": 1.2}
]
```

---

## 9. ATTRIBUTES Group

| Key | Mô tả |
|-----|-------|
| `_attributes` | Array of custom HTML attributes thêm vào element root |

```json
"_attributes": [
  {"name": "data-aos", "value": "fade-up"},
  {"name": "aria-label", "value": "Feature card"},
  {"name": "role", "value": "region"}
]
```

---

## Responsive Keys — Tất cả keys trên đều hỗ trợ

Thêm `:{breakpoint}` vào bất kỳ key nào:

```json
{
  "_padding": {"top": "80px", "bottom": "80px"},
  "_padding:tablet_portrait": {"top": "48px", "bottom": "48px"},
  "_padding:mobile_portrait": {"top": "32px", "bottom": "32px"},
  "_direction:mobile_portrait": "column",
  "_width:mobile_portrait": "100%",
  "_display:mobile_portrait": "none",
  "_cssCustom:mobile_portrait": "#brxe-id { font-size: 14px; }"
}
```

| Breakpoint Key | Kích thước | Ghi chú |
|---------------|-----------|---------|
| `tablet_portrait` | ≤ 991px | Breakpoint phổ biến nhất cho responsive |
| `mobile_landscape` | ≤ 767px | |
| `mobile_portrait` | ≤ 478px | |
| `mobile` | ≤ 350px | |

> ⚠️ **KHÔNG viết `@media` thủ công** trong `_cssCustom` string.
> Dùng composite key `_cssCustom:mobile_portrait` thay thế.

---

## Quick Reference — Keys hay dùng nhất

```json
{
  "_padding": {"top": "40px", "bottom": "40px", "left": "24px", "right": "24px"},
  "_margin": {"left": "auto", "right": "auto"},
  "_width": "100%",
  "_heightMin": "100vh",
  "_position": "relative",
  "_overflow": "hidden",
  "_background": {"color": {"hex": "#FFFFFF"}},
  "_border": {"radius": {"top": "16px", "right": "16px", "bottom": "16px", "left": "16px"}},
  "_cssTransition": "all 0.3s ease",
  "_cssCustom": "#brxe-[id] { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }",
  "_cssClasses": "my-global-class another-class",
  "_transform": "translateX(-50%)",
  "_opacity": 0.9,
  "_zIndex": 10,
  "_cursor": "pointer"
}
```
