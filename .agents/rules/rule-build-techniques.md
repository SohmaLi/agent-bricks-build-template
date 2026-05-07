---
trigger: always_on
glob:
description: Kỹ thuật build nâng cao cho Bricks Builder — Image positioning, Slider/Tabs, CSS lookup, flex-shrink
---

# Rules: Build Techniques (RULE 4–6, 10)

Áp dụng: Flow `/bricks-create-template` — tất cả giai đoạn.

---

## RULE 4 — Kỹ thuật Build Nâng Cao

### 4A — Image Positioning (Bắt buộc kiểm tra)

| Câu hỏi                                           | Kiểm tra                                                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Ảnh có `position: absolute` không?                | Xem parent có `position: relative` không? → Parent dùng `_position: "relative"` (native key) |
| Ảnh có kích thước cố định không?                  | Dùng `_width` + `_height` (native — apply đúng vào `<img>` tag)                              |
| Image cần `object-fit` + `object-position` không? | Dùng `_objectFit` + `_objectPosition` (native)                                               |
| Ảnh có `mask-image` trên block wrapper?           | `_cssCustom` trên **block wrapper** (không phải `<img>` tag). Xem PATTERN 4                  |

### 4D — Illustration Placeholder (Quy chuẩn gộp ảnh phức tạp)

Khi gặp Frame có nhiều layer/vector lồng nhau, tôi sẽ không tách nhỏ mà build placeholder để user upload ảnh composite:

| Cấu trúc | Cài đặt Desktop | Cài đặt Mobile |
| :--- | :--- | :--- |
| **Block (Wrapper)** | Set cứng `_width` + `_height` (px). Flex center. | `_width: "100%"`, `_height: "auto"`. |
| **Image (Widget)** | `_width: "100%"`, `_height: "100%"`. | `_objectFit: "contain"`. |

> **Mục tiêu**: Đảm bảo tốc độ build và khả năng tùy biến cao cho người dùng sau này.

> ✔️ `_position` là **Shared CSS Key có trên mọi widget** (từ `base.php`). Dùng trực tiếp trong settings, không cần `_cssCustom`.

### 4B — Slider & Tabs → Luôn dùng Nestable Widget

Khi Figma thiết kế có **slider** hoặc **tabs**:

| Loại              | Widget bắt buộc         | KHÔNG dùng           |
| ----------------- | ----------------------- | -------------------- |
| Slider / Carousel | `slider-nested`         | `block` giả slider   |
| Tabs              | `tabs-nested`           | Nhiều block ẩn/hiện  |
| Accordion         | `accordion-nested`      | Block collapse CSS   |
| Nav prev/next     | Con của `slider-nested` | HTML button tự build |

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

### 4E — Multi-Column Layout → LUÔN set explicit `_width` ❌

> **Verified từ IMP-04:** `flex-grow + flex-basis` không đảm bảo width chính xác trong Bricks panel.

| Layout | ✅ ĐÚNG | ❌ SAI |
|--------|--------|-------|
| 2 cột bằng nhau | `_width: "50%"` | `_flexGrow: "1"` + `_flexBasis: "0%"` |
| 2 cột không đều | `_width: "60%"` / `_width: "40%"` | `_flexGrow: "3"` / `_flexGrow: "2"` |
| Cột cố định + cột mở rộng | `_width: "300px"` + `_cssCustom: "flex:1"` | Chỉ flex keys |

```json
// ✅ ĐÚNG — 2 cột 50/50
{ "_width": "50%", "_flexGrow": "0", "_flexShrink": "0", "_flexBasis": "auto" }

// Responsive mobile:
{ "_width:mobile_portrait": "100%" }
```

> `_flexShrink: "0"` tránh cột bị squish khi parent hẹp.
> `_flexBasis: "auto"` để `_width` là nguồn truth duy nhất.

### 4F — Grid > 5 items → Dùng `display:grid`, không dùng `flex-wrap`

> **Verified từ IMP-05:** `flex-wrap` phụ thuộc vào available width của parent → dễ bị single-column nếu parent bị constrain.

| Trường hợp | ✅ Dùng | ❌ Tránh |
|-----------|--------|---------|
| Logo grid (≥6 items, N cột cố định) | `display:grid` + `repeat(N, 1fr)` | `flex-wrap` |
| Card grid tự responsive | `flex-wrap` + `min-width` per card | `grid` cứng |
| Icon row < 6 items | `flex-wrap` OK | - |

```json
// ✅ Grid 5 cột desktop, 3 cột mobile
{
  "_display": "grid",
  "_gridTemplateColumns": "repeat(5, 1fr)",
  "_columnGap": "20px",
  "_rowGap": "20px",
  "_gridTemplateColumns:mobile_portrait": "repeat(3, 1fr)",
  "_columnGap:mobile_portrait": "12px",
  "_rowGap:mobile_portrait": "12px"
}
```

---

## RULE 5 — CSS Property Lookup (Native vs Custom)

**Nguyên tắc:** Native key trước, `_cssCustom` chỉ khi không có native.

> 📚 **Tra cứu chi tiết tại**: `rule-css-lookup.md`

### 5A — Phân bổ CSS Custom theo Breakpoint
`_cssCustom:mobile_portrait`, `_cssCustom:tablet` ... là các key hợp lệ. KHÔNG cần viết `@media` thủ công bên trong nếu chỉ đổi cho 1 breakpoint.

---

## RULE 6 — `flex-shrink: 0` cho fixed-size elements

**BẮT BUỘC** cho icon circles, avatar, logo trong flex row.

---

## RULE 10 — Common Patterns (Quy trình kiểm tra nhanh)

> 📚 **Xem chi tiết các mẫu layout tại**: `.agents/components/common-patterns.md`

### 10A — Tóm tắt các lỗi thường gặp:
- **Background**: Tránh fixed px, dùng absolute 100%. (Xem 10A)
- **Centering**: Dùng `left:50% + translateX(-50%)`. (Xem 10C)
- **Responsive Stacking**: Ưu tiên 991px. (Xem 10E)
- **Padding 1180px**: Luôn có CSS Custom lề 16px. (Xem 10E)
