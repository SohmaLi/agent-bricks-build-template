---
trigger: always_on
glob:
description: Kỹ thuật build nâng cao cho Bricks Builder — Image positioning, Slider/Tabs, CSS lookup
---

# Rules: Build Techniques (RULE 4–6)

Áp dụng: Flow `/bricks-render-section` — tất cả giai đoạn build.

---

## RULE 4 — Kỹ thuật Build Nâng Cao

### 4A — Image Positioning (Bắt buộc kiểm tra)
- Kiểm tra `position: relative` cho parent nếu ảnh là `absolute`.
- Dùng native keys `_width`, `_height`, `_objectFit`, `_objectPosition`. (Xem bảng tra cứu tại `miss-refe.md`).
- Dùng `_cssCustom` trên **block wrapper** cho `mask-image`.

### 4D — Illustration Placeholder
- Chỉ áp dụng cho vector/illustration phức tạp.
- Photo collage bắt buộc build đủ từng `image` widget với `_position: "absolute"`.

### 4B — Slider & Tabs → Luôn dùng Nestable Widget
- Bắt buộc dùng: `slider-nested`, `tabs-nested`, `accordion-nested`.
- KHÔNG dùng block giả hoặc HTML button tự build cho slider/tabs.

### Widget Hierarchy — BẮT BUỘC
- `container` CHỈ xuất hiện ở depth 1 ngay dưới `section`.
- Để nhóm content bên trong block/slide: dùng `block` (không phải `container`).

### 4C — Section CSS → Ghi vào `_cssCustom` của Widget
- Ghi CSS vào `_cssCustom` của chính widget (dùng `#brxe-[id]`).
- KHÔNG dùng `set_page_css` cho element-specific CSS.

### 4E — Multi-Column Layout → LUÔN set explicit `_width`
- LUÔN set `_width` (ví dụ: "50%", "300px").
- Thêm `_flexShrink: "0"` và `_flexBasis: "auto"` để width là nguồn truth duy nhất.

### 4F — Grid > 5 items → Dùng `display:grid`
- Dùng `display:grid` + `repeat(N, 1fr)` cho logo grid hoặc grid items cố định.

---

## RULE 5 — CSS Property Lookup
- Ưu tiên Native keys trước, `_cssCustom` chỉ khi không có native.
- Tra cứu chi tiết tại: `.agents/references/miss-refe.md`

### 5A — Phân bổ CSS Custom theo Breakpoint
- Dùng composite keys như `_cssCustom:mobile_portrait`. KHÔNG viết `@media` thủ công.

---

## RULE 6 — Common Patterns
- Tra cứu mẫu tại: `.agents/components/common-patterns.md` và `.agents/references/miss-refe.md`.

