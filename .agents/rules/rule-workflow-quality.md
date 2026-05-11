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
4. **HARD GATE: PASTE TABLE VÀO CHAT** — không có table = không được bắt đầu viết JSON.
5. **Key không có trong table** → tra lại widget doc, KHÔNG tự đoán.

> ⛔ Vi phạm RULE 10 → key sai → API push thành công nhưng render sai → phải rebuild.

---

## RULE 11 — API Action Đúng & Đánh giá Visual Đúng

### 11A — `update` vs `update_content` — KHÔNG nhầm

| Khi nào dùng | Action | Hành vi trong DB |
|---|---|---|
| Fix 1-2 value đơn giản, cấu trúc không đổi | `update` | Merge-patch, settings cũ **vẫn còn** |
| Rebuild element / fix cấu trúc / fix checkbox | `update_content` | CLEAR toàn bộ, replace từ đầu |

> ⛔ **KHÔNG dùng `update` để tắt checkbox** (`arrows`, `pagination`, `autoplay`...).
> Giá trị cũ trong DB vẫn tồn tại dù bạn không set key mới.
> → Muốn tắt checkbox: `update_content` full rebuild + **bỏ hẳn key** khỏi settings.

### 11B — Checkbox Controls — Default Behavior

| Widget | Key | Default khi không set |
|---|---|---|
| `slider-nested` | `arrows` | **ON** — arrows hiện |
| `slider-nested` | `pagination` | **ON** — dots hiện |
| `slider-nested` | `autoplay` | OFF — không tự chạy |

> → Muốn **tắt** arrows/pagination: dùng CSS hide qua `_cssCustom` trên slider:
> `"_cssCustom": "#brxe-[id] .splide__arrows{display:none!important}"`.

### 11C — LAYOUT ≠ IMAGES — HARD STOP khi review

Images blank (localhost:3845 offline) là **EXPECTED** — được phép.
Layout sai là **LỖI** dù images blank.

| Tình huống | Kết quả |
|---|---|
| 3 cards hiện, images blank | Layout ✅, images expected → PASS layout |
| 1 card hiện thay vì 3 | Layout ❌ → FAIL dù images blank |
| Nav buttons nằm trong slider thay vì ngoài | Structural ❌ → FAIL |

> ⛔ KHÔNG báo PASS khi layout sai. Phải so sánh layout (đ ếm phần tử, hướng flex, vị trí khối) độc lập với việc images có hiện hay không.
