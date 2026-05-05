---
trigger: always_on
glob:
description: Quality gates cho Bricks Builder workflow — No CSS guessing, Element ID validation, Section-by-section build
---

# Rules: Workflow Quality Gates (RULE 7–9)

Áp dụng: Flow `/bricks-create-template` — tất cả giai đoạn.

---

## RULE 7 — Không tự đoán CSS — lấy exact từ Figma

**KHÔNG đoán:** gradient params, box-shadow values, border-radius phức tạp, hex colors.

**Thay thế:** `mcp_figma_get_design_context` → Figma DevMode > Code > CSS → copy chính xác 100%.

| ✅ | ❌ |
|---|---|
| `radial-gradient(52.5% 40.5% at 52.5% 74%, #007CFC 0%, #1EAFFF 100%)` | `radial-gradient(blue, lightblue)` |
| `rgba(255,255,255,0.88)` | `rgba(255,255,255,0.2)` tự đoán |

---

## RULE 8 — Element ID: 6-8 ký tự `[a-z0-9]`, không trùng

Pattern gợi ý: `[s{n}][role2][idx2+]` → `s4hd10`, `s15bg20`, `s6cd345`

Validate trước push: `id.length >= 6 && id.length <= 8`, `/^[a-z0-9]+$/.test(id)`, không trùng, parent↔children khớp 2 chiều.

---

## RULE 9 — Build từng section, dừng chờ user

**Mỗi section = 1 vòng:** Build → Push → Verify → Báo user → **CHỜ** → (ok) → Section tiếp.

**KHÔNG** build section N+1 khi chưa có confirm N.

| User nói | AI làm |
|----------|--------|
| "ok tiếp tục" / "ok S3" | Build **1** section tiếp, dừng chờ |
| "ok all" | Build **1** section tiếp, dừng chờ |

> ⛔ "ok tiếp tục" ≠ "build hết tất cả sections còn lại".
