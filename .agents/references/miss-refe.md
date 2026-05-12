# Master Router & Missing References (miss-refe.md)

> File này đóng vai trò là **Bản đồ điều hướng (Navigator)**. Khi gặp một tình huống cụ thể, AI sẽ tra cứu bảng dưới đây để biết cần đọc file nào để có thông tin chi tiết nhất.

---

## 🗺️ MASTER NAVIGATION MAP

| Khi bạn cần (Nhu cầu/Tình huống) | Tài liệu chi tiết | Nội dung chính |
| :--- | :--- | :--- |
| **Mapping Tailwind sang Bricks Keys** | [tailwind-bricks-map.md](file:///.agents/references/tailwind-bricks-map.md) | Chuyển đổi class từ Figma code sang JSON keys. |
| **Logic xây dựng (4A, 4B, 4D, 4E, 4F)** | [building-logic.md](file:///.agents/references/building-logic.md) | Tiêu chuẩn Image, Widget Selection, Hierarchy, Width logic. |
| **Lấy code mẫu (Code Snippets)** | [widget-map-examples.md](file:///.agents/references/widget-map-examples.md) | Mẫu Grid, Flex, Absolute Badges, Circle Icon. |
| **Kiểm tra lỗi trước khi Push (Checklist)** | [build-errors.md](file:///.agents/references/build-errors.md) | G2 (wrap mobile), Lỗi 9 (Typography), Checklist 15 bước. |
| **Cấu trúc layout phức tạp / Depth sâu** | [complex-template-reasoning.md](file:///.agents/references/complex-template-reasoning.md) | Logic chia block, tính toán cấp bậc (depth > 5). |
| **Xem mẫu chuẩn từ Production** | [production-patterns.md](file:///.agents/references/production-patterns.md) | Cấu trúc chuẩn của FAQ, Reviews, Hero từ site thật. |
| **Tìm hiểu quy tắc tự sửa lỗi (ARI)** | [strategy-closed-loop.md](file:///.agents/references/strategy-closed-loop.md) | Quy trình Inspect -> Compare -> Correct tự động. |
| **Tra cứu Settings của từng Widget** | [widgets/README.md](file:///widgets/README.md) | Index trỏ đến file docs riêng của mỗi Widget. |

---

## ⚡ QUICK WIDGET ROUTER (Truy cập nhanh)

| Nhóm Widget | Widget đặc biệt | Đường dẫn tài liệu chi tiết |
| :--- | :--- | :--- |
| **Layout** | section, container, block, div | `widgets/layout/layout-[name].md` |
| **Media Slider** | slider-nested (Bắt buộc) | [widgets/media/slider-nested.md](file:///widgets/media/layout-slider-nested.md) |
| **General Items** | tabs-nested, accordion-nested | `widgets/general/[name].md` |
| **Typography** | heading, text-basic, text | `widgets/basic/[name].md` |
| **Styles chung** | Padding, Background, Border... | [widgets/shared-styles.md](file:///widgets/shared-styles.md) |

---

## 📋 QUICK REFERENCE SUMMARY (Tóm tắt nhanh)

### 1. Kỹ thuật Build (Tra cứu: [rule-build-techniques.md](file:///.agents/rules/rule-build-techniques.md))
*   **Image**: `absolute` ảnh -> `relative` parent. Dùng native keys `_objectFit`.
*   **Hierarchy**: `section` (d0) -> `container` (d1) -> `block` (d2+).
*   **Width**: Multi-column luôn set explicit `_width` + `_flexShrink: "0"`.

### 2. Các điểm mù Bricks (G-Series) (Tra cứu: [build-errors.md](file:///.agents/references/build-errors.md))
*   **G2 (Crucial)**: Bricks tự wrap ở 767px. Mọi flex-row cần `_cssCustom: flex-wrap: nowrap`.
*   **G4**: Cần Ctrl+S trong Editor sau push để render `_cssCustom`.
*   **Lỗi 9**: Typography `font-size` là plain string `"24px"`, KHÔNG dùng object.

### 3. API & Rendering (Tra cứu: [rule-workflow-quality.md](file:///.agents/rules/rule-workflow-quality.md))
*   **Action**: `update_content` để rebuild/clear. `update` chỉ để fix nhẹ.
*   **Review**: Layout sai (số lượng phần tử, vị trí) là **FAIL** ngay cả khi ảnh chưa hiện.
*   **ID**: Đúng 6 ký tự `[a-z0-9]`, không trùng.

### 4. Typography Mapping (Tra cứu: [miss-refe.md](file:///.agents/references/miss-refe.md) - Mục 2)
*   **Color**: Phải nằm trong `_typography.color.hex`.
*   **Align**: Dùng `_typography.text-align` thay vì `_textAlign` đơn lẻ.

---

*Lưu ý: Mọi ví dụ code JSON phức tạp, vui lòng tra cứu trực tiếp tại [widget-map-examples.md](file:///.agents/references/widget-map-examples.md).*
