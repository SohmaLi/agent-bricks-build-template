---
trigger: always_on
description: Quality gates cho Bricks Builder workflow
---

# Rules: Workflow Quality Gates (RULE 7–9)

Áp dụng: Flow `/bricks-create-template` — tất cả giai đoạn.

---

## RULE 7 — Không tự đoán CSS — lấy exact từ Figma
**KHÔNG đoán:** gradient, box-shadow, border-radius, colors.
- Dùng `mcp_figma_get_design_context` → Figma DevMode > Code > CSS → copy chính xác 100%.

---

## RULE 8 — Element ID: 6 ký tự `[a-z0-9]`, không trùng
- Validate trước push: `id.length = 6`, `/^[a-z0-9]+$/.test(id)`, không trùng, parent↔children khớp.

---

## RULE 9 — Build từng section, dừng chờ user
**MỖI SECTION = 1 VÒNG:** Build → Push → Verify → Báo user → **CHỜ**.
- **KHÔNG** build section tiếp theo khi chưa có confirm từ user.

---

## RULE 10 — Widget Docs Strategy (Đọc docs trước khi build)
- BẮT BUỘC đọc `widgets/README.md` + `shared-styles.md` + widget doc tương ứng.
- **HARD GATE:** Tạo và PASTE **Key Validation Table** vào chat trước khi viết JSON.

---

## RULE 11 — API Action Đúng & Đánh giá Visual Đúng
1. **Action**: Dùng `update_content` để rebuild structure hoặc tắt checkbox. Dùng `update` cho fix nhỏ.
2. **Checkbox**: `arrows` và `pagination` mặc định là ON. Ẩn qua CSS nếu cần tắt.
3. **Review**: Layout sai là **LỖI (FAIL)** ngay cả khi ảnh chưa hiện.
- Chi tiết tra cứu tại: `.agents/references/miss-refe.md` (mục 4).

---

## RULE 13 — Nguyên tắc "Viết lại, không Sao chép" (Tailored Code)
**KHÔNG copy-paste** nguyên khối JSON từ `common-patterns.md` hay `widget-map-examples.md`.
1. **Tham khảo**: Chỉ dùng các tài liệu References/Components để hiểu logic giải quyết vấn đề.
2. **Đối soát**: Luôn quay lại đọc file tài liệu gốc của widget (`widgets/*.md`) để lấy chính xác các Keys và Settings mới nhất.
3. **Thực thi**: Tự tay viết mới (programmatic construction) từng khối JSON để đảm bảo code sạch, ID khớp và đúng ngữ cảnh thiết kế.
