---
trigger: always_on
description: Quality gates cho Bricks Builder workflow — No CSS guessing, Element ID validation, Section-by-section build
---

# Rules: Workflow Quality Gates (RULE 7–9)

Áp dụng: Flow `/bricks-create-template` — tất cả giai đoạn.

---

## RULE 7 — Không tự đoán CSS — lấy exact từ Figma

**KHÔNG đoán:** gradient params, box-shadow values, border-radius phức tạp, hex colors.

**Thay thế:** `mcp_figma_get_design_context` → Figma DevMode > Code > CSS → copy chính xác 100%.

| ✅                                                                    | ❌                                 |
| --------------------------------------------------------------------- | ---------------------------------- |
| `radial-gradient(52.5% 40.5% at 52.5% 74%, #007CFC 0%, #1EAFFF 100%)` | `radial-gradient(blue, lightblue)` |
| `rgba(255,255,255,0.88)`                                              | `rgba(255,255,255,0.2)` tự đoán    |

---

## RULE 8 — Element ID: 6 ký tự `[a-z0-9]`, không trùng

Pattern gợi ý: `[s{n}][role2][idx2+]` → `s4hd10` hoặc random

Validate trước push: `id.length = 6`, `/^[a-z0-9]+$/.test(id)`, không trùng, parent↔children khớp 2 chiều.

---

## RULE 9 — Build từng section, dừng chờ user

**Mỗi section = 1 vòng:** Build → Push → Verify → Báo user → **CHỜ** → (ok) → Section tiếp.

**KHÔNG** build section N+1 khi chưa có confirm N.

| User nói                | AI làm                             |
| ----------------------- | ---------------------------------- |
| "ok tiếp tục" / "ok S3" | Build **1** section tiếp, dừng chờ |
| "ok all"                | Build **1** section tiếp, dừng chờ |

> ⛔ "ok tiếp tục" ≠ "build hết tất cả sections còn lại".

---

## RULE 10 — Widget Docs Strategy (Đọc docs trước khi build)

Áp dụng: Bước 1 của `/bricks-render-section` — BẮT BUỘC trước khi viết bất kỳ JSON nào.

1. **Đọc `widgets/README.md`** → tìm đường dẫn chính xác của mỗi widget cần dùng.
2. **Đọc song song** `widgets/shared-styles.md` + từng widget doc tương ứng.
3. **Tạo Key Validation Table** cho mỗi widget trước khi viết JSON:
   ```
   Widget     | Key cần dùng           | Source file         | ✅/❌
   -----------|------------------------|---------------------|------
   section    | _padding               | shared-styles.md    | ✅
   container  | _direction, _rowGap... | layout-container.md | ✅
   ```
4. **KHÔNG viết JSON** khi chưa có Key Validation Table — tự đoán key là nguồn gốc phần lớn lỗi.
5. **Key không có trong table** → tra lại widget doc, KHÔNG tự đoán.

> ⛔ Vi phạm RULE 10 → key sai → API push thành công nhưng render sai → phải rebuild.
