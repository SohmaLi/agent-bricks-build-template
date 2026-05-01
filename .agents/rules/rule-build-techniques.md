---
trigger: always_on
glob:
description: Kỹ thuật build nâng cao cho Bricks Builder — Image positioning, Slider/Tabs, CSS lookup, flex-shrink
---

# Rules: Build Techniques (RULE 4–6)

Áp dụng: Flow `/bricks-create-template` — tất cả giai đoạn.

---

## RULE 4 — Kỹ thuật Build Nâng Cao

### 4A — Image Positioning (Bắt buộc kiểm tra)

| Câu hỏi | Kiểm tra |
|---------|---------|
| Ảnh có `position: absolute` không? | Xem parent có `position: relative` không? → Parent dùng `_position: "relative"` (native key) |
| Ảnh có kích thước cố định không? | Dùng `_width` + `_height` (native — apply đúng vào `<img>` tag) |
| Image cần `object-fit` + `object-position` không? | Dùng `_objectFit` + `_objectPosition` (native) |
| Ảnh có `mask-image` hoặc `transform` không? | `_cssCustom: "%root% img { mask-image: ... }"` (cần target `<img>` tag, không phải wrapper) |

> ✔️ `_position` là **Shared CSS Key có trên mọi widget** (từ `base.php`). Dùng trực tiếp trong settings, không cần `_cssCustom`.

### 4B — Slider & Tabs → Luôn dùng Nestable Widget

Khi Figma thiết kế có **slider** hoặc **tabs**:

| Loại | Widget bắt buộc | KHÔNG dùng |
|------|----------------|-----------|
| Slider / Carousel | `slider-nestable` | `block` giả slider |
| Tabs | `tabs-nestable` | Nhiều block ẩn/hiện |
| Accordion | `accordion-nestable` | Block collapse CSS |
| Nav prev/next | Con của `slider-nestable` | HTML button tự build |

**Lý do:** Nếu dùng block thông thường → slider không có JS, click không hoạt động, không có prev/next functionality.

### 4C — Section CSS → Ghi vào `_cssCustom` của Widget

Với các section có CSS phức tạp (gradient background, pattern overlay, inset shadow):

```
✅ ĐÚNG: Ghi CSS vào _cssCustom của chính section/block widget đó
❌ SAI: Dùng mcp_bricks-mcp_code(set_page_css) cho element-specific CSS
```

Ví dụ section có gradient background:
```json
{
  "name": "section",
  "settings": {
    "_cssCustom": "%root% { background: linear-gradient(180deg, rgba(242,243,245,0) 0%, #f2f3f5 50%); }"
  }
}
```

Chỉ dùng `set_page_css` cho CSS **global** ảnh hưởng nhiều elements (reset, animation keyframes, utility classes chung).

---

## RULE 5 — CSS Property Lookup (tra cứu khi viết `_cssCustom`)

**Nguyên tắc:** Native key trước, `_cssCustom` chỉ khi không có native.

**Native keys phổ biến:** `_width/_height`, `_widthMin/_widthMax/_heightMin/_heightMax`, `_padding/_margin`, `_display/_direction`, `_alignItems/_justifyContent`, `_rowGap/_columnGap`, `_flexGrow/_flexShrink`, `_position/_top/_right/_bottom/_left`, `_zIndex/_overflow/_opacity`, `_border/_background`, `_objectFit/_objectPosition`, `_cssTransition/_aspectRatio`

**Chỉ dùng `_cssCustom` cho:** gradient bg, inset box-shadow, grid-template-columns, clip-path, filter, transform, :hover/:focus, ::before/::after, mask-image trên img

**Format MCP bắt buộc:** `"#brxe-[element-id]{ ... }"` — KHÔNG dùng `%root%` (API không replace, chỉ Bricks editor UI mới replace được)

**Image widget:** `%root%` = `<figure>` wrapper | `#brxe-[id] img` = target `<img>` tag

### 5A — Native Keys nhanh

| CSS Property | Native Key | Giá trị ví dụ |
|-------------|------------|---------------|
| `width` | `_width` | `"100%"`, `"480px"` |
| `height` | `_height` | `"400px"`, `"100vh"` |
| `min/max-width` | `_widthMin`, `_widthMax` | `"320px"`, `"1200px"` |
| `padding` | `_padding` | `{top,bottom,left,right}` |
| `margin` | `_margin` | `{top,bottom,left,right}` |
| `display` | `_display` | `"flex"`, `"grid"`, `"block"` |
| `flex-direction` | `_direction` | `"row"`, `"column"` |
| `align-items` | `_alignItems` | `"center"`, `"flex-start"` |
| `justify-content` | `_justifyContent` | `"space-between"`, `"center"` |
| `gap (row/col)` | `_rowGap`, `_columnGap` | `"24px"` |
| `flex-grow/shrink` | `_flexGrow`, `_flexShrink` | `"1"`, `"0"` |
| `position` | `_position` | `"relative"`, `"absolute"` |
| `top/right/bottom/left` | `_top`, `_right`, `_bottom`, `_left` | `"0px"`, `"24px"` |
| `z-index` | `_zIndex` | `1`, `10`, `-1` |
| `overflow` | `_overflow` | `"hidden"`, `"auto"` |
| `object-fit` | `_objectFit` | `"cover"`, `"contain"` |
| `object-position` | `_objectPosition` | `"50% 30%"`, `"center"` |
| `border` | `_border` | `{width, style, color, radius}` |
| `background-color` | `_background` | `{color: {hex: "#fff"}}` |
| `box-shadow` (normal) | `_boxShadow` | object settings |

### 5B — `_cssCustom` patterns

| CSS cần | Pattern |
|---------|---------|
| Gradient bg | `"#brxe-[id]{ background: linear-gradient(...) }"` |
| Inset shadow | `"#brxe-[id]{ box-shadow: inset 0 0 24px rgba(...) }"` |
| Grid columns | `"#brxe-[id]{ grid-template-columns: repeat(3,1fr); }"` |
| `:hover` | `"#brxe-[id]:hover{ transform: translateY(-4px) }"` |
| `::before` | `"#brxe-[id]::before{ content: ''; ... }"` |
| Mask on img | `"#brxe-[id] img{ -webkit-mask-image: url(...) }"` |

### 5C — Object-position Formula (Figma crop → CSS)

```
Figma: left: -X%, top: -Y%, width: W%, height: H%
→ object-position-x = X / (W - 100) * 100 %
→ object-position-y = Y / (H - 100) * 100 %
```

### 5D — Figma MCP Fallback khi `unknown_tool`

Khi `mcp_figma_get_design_context` lỗi `unknown_tool`:
1. Đọc plan file đã có → lấy design data từ đó
2. Dùng image URLs `localhost:3845` đã được ghi trong plan
3. Ghi rõ trong report: "Figma MCP không khả dụng — audit dựa 100% trên plan file"
4. **Không được** gọi browser agent thay thế Figma MCP

> Ví dụ JSON: `.agents/references/widget-map-examples.md`

---

## RULE 6 — `flex-shrink: 0` cho fixed-size elements trong flex row

**MỌI element** có `_width`+`_height` cố định trong flex row → **BẮT BUỘC `_flexShrink: "0"`**.
Thiếu → flex container co bóp → kích thước thực nhỏ hơn giá trị set.

Áp dụng: icon circles, avatar, badge container, logo, thumbnail fixed-size.
