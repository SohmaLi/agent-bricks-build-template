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

## RULE 12 — Chiến lược Nghiên cứu & Tham chiếu (Research Strategy)

Áp dụng: Giai đoạn Phase 1 — Plan phân tích.

1. **Search giới hạn**: Tối đa 03 lệnh truy vấn qua API (Ưu tiên: `[Dự án] -> [Widget Key] -> [Tác giả Key Dev]`).
2. **Quy tắc dừng**: Nếu sau 03 lần tìm không thấy mẫu ưng ý, **DỪNG LẠI** và build thuần dựa trên Figma + Bricks Native. Không sa đà vào việc tìm kiếm làm chậm tiến độ.
3. **Tham chiếu Hybrid**: Có thể tách một mẫu để lấy "Khung xương" (Container, Typography) và một mẫu khác để lấy "Động cơ" (JSON cấu hình Slider/Tabs).
4. **Báo cáo mẫu trong Plan**: Phải ghi rõ:
   - Tham chiếu Layout: [ID/Tên mẫu]
   - Tham chiếu Widget: [ID/Tên mẫu]
     (Nếu không có mẫu, ghi rõ "Tự build thuần").
5. **Visual Evidence**: Mọi file Plan phải nhúng ảnh chụp màn hình chính xác của Section đó từ Figma (cả Desktop và Mobile) để người dùng đối soát trực quan các thông số đã phân tích.
