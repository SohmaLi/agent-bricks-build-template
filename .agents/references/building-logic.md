# Building Logic & Standards Reference

> Tài liệu này lưu trữ các tiêu chuẩn kỹ thuật chi tiết về Layout, Image Positioning và Widget Hierarchy (chuyển từ bộ quy tắc cũ RULE 4).

---

## 1. Image Positioning Standards (4A)

| Tình huống | Hành động kiểm tra | Giải pháp native |
| :--- | :--- | :--- |
| **Ảnh Absolute** | Parent có `relative` không? | `_position: "relative"` trên parent |
| **Kích thước cố định** | Kích thước có đúng Figma? | Dùng `_width` + `_height` (native) |
| **Căn chỉnh nội dung** | Cần fit hay position? | Dùng `_objectFit` + `_objectPosition` |
| **Mask Image** | Mask nằm ở đâu? | `_cssCustom` trên **block wrapper** |

---

## 2. Illustration Placeholder (4D)

> Chỉ áp dụng khi frame chứa vector phức tạp không thể tách widget.

| ✅ Áp dụng RULE 4D | ❌ KHÔNG áp dụng RULE 4D |
| :--- | :--- |
| SVG illustration phức tạp (multi-path vector) | Photo collage (real photos có URL) |
| Animation / Lottie frame | Group 5-10 ảnh có thể build bằng absolute |
| Decorative patterns vô số layer | Emoji PNG có URL trực tiếp |

---

## 3. Widget Selection (4B)

| Nhu cầu | Widget bắt buộc | KHÔNG được dùng |
| :--- | :--- | :--- |
| **Slider / Carousel** | `slider-nested` | block giả slider bằng CSS |
| **Tabs Layout** | `tabs-nested` | Nhiều block ẩn/hiện bằng JS thủ công |
| **Accordion / FAQ** | `accordion-nested` | Block toggle CSS linh tinh |
| **Navigation arrows** | Thuộc `slider-nested` | HTML button tự build |

---

## 4. Widget Hierarchy (Chuẩn Bricks)

```
section (depth 0, parent: 0)
└── container (depth 1, parent: sec_id)    <-- Luôn là Direct Child của Section
    └── block (depth 2+)                    <-- Dùng để styling/grouping
        ├── block (depth 3)
        ├── heading (leaf)
        ├── text-basic (leaf)
        └── ...
```

---

## 5. Multi-Column Width Logic (4E)

| Mục tiêu | ✅ Cách làm ĐÚNG | ❌ Cách làm SAI |
| :--- | :--- | :--- |
| **Cột 50/50** | `_width: "50%"` + `_flexShrink: "0"` | `_flexGrow: "1"` (không ổn định) |
| **Cột không đều** | `_width: "60%"` / `_width: "40%"` | Dùng flex-grow lẻ |
| **Cột cố định** | `_width: "300px"` | Dùng mỗi flex-basis |

---

## 6. Grid vs Flex Decision (4F)

| Trường hợp | ✅ Dùng Grid | ❌ Dùng Flex + Wrap |
| :--- | :--- | :--- |
| **Logo Grid (≥6 items)** | `display:grid` + `repeat(N, 1fr)` | Dễ bị lệch hàng khi parent hẹp |
| **Card List lớn** | Grid giúp control gap tốt hơn | Khó căn chỉnh border/shadow |
| **Icon Row trên 1 hàng** | Grid cố định cột | — |
