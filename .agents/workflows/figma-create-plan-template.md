---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input
- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên file output slug (ví dụ: `blog-author-profile`)

## Output
- File `.agents/plans/[slug].md` — plan đầy đủ cho Flow 2 đọc và build

---

## ⚠️ FRESH START — Bắt buộc đầu mỗi lần chạy

> Mỗi lần gọi `/figma-create-plan-template` là một phiên phân tích HOÀN TOÀN MỚI.

1. Không dùng lại context, plan file, hay dữ liệu Figma từ session trước
2. Ghi đè file plan cũ nếu cùng slug — không append
3. Xác nhận với user ngay khi bắt đầu:

```
🆕 Bắt đầu phân tích MỚI cho: [Figma URL / node-id]
📄 Output: .agents/plans/[slug].md
```

---

## ⚡ TOKEN LIMIT GUARD — Bắt buộc tách 2 phase

> **Vấn đề:** Figma context thường 100-150KB. Nếu phân tích + ghi file trong 1 response → vượt token limit.
>
> **Quy tắc cứng:** Workflow NÀY luôn chạy **2 phase riêng biệt**:
> - **Phase A** (response 1): Thu thập + Phân tích + Báo cáo tóm tắt → **DỪNG, chờ user**
> - **Phase B** (response 2): User gõ "ok" hoặc "tiếp tục" → Ghi file plan

---

## PHASE A — Thu thập & Phân tích

### Bước A1 — Gọi đồng thời 3 tools

```
[1a] mcp_figma_get_design_context(nodeId, artifactType: "WEB_PAGE_OR_APP_SCREEN",
       clientFrameworks: "bricks-builder", clientLanguages: "html,css,javascript,php")
[1b] mcp_figma_get_screenshot(nodeId)
[1c] mcp_bricks-mcp_get_site_info(action: "info")
```

Nếu `get_design_context` lỗi → thử lại tối đa 2 lần → báo user, dừng.
Nếu `get_screenshot` lỗi → ghi ⚠️ không có ảnh, tiếp tục.

### Bước A2 — Trích xuất tổng quan

| Thông tin | Ghi nhận |
|-----------|---------|
| Tên trang, loại trang | landing / profile / blog / ... |
| Viewport chính, max-width | px |
| Số sections, tên + Node ID | List |
| Design variables | Colors (token → hex), Typography, Spacing |
| Images `localhost:3845/assets/...` | URL + tên mô tả |

### Bước A3 — Đọc Widget Library (BẮT BUỘC)

```
[1] /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md
[2] Widget files cần dùng: widgets/[tên-file].md
```

> Không dùng settings key từ trí nhớ. Chỉ dùng keys từ widget library.

### Bước A4 — Đánh giá từng section

**A. Độ phức tạp** → Gắn nhãn `[SIMPLE]` / `[MEDIUM]` / `[COMPLEX]`

| Tiêu chí | SIMPLE | MEDIUM | COMPLEX |
|----------|--------|--------|---------|
| Layout | 1 col | 2-3 cols, flex | Grid không đều, overlap, absolute |
| Animation | Không | Hover | Scroll, JS |
| Custom CSS | Không | `_cssCustom` | `html` element |
| Images | Standard | Background | Mask, clip-path |

**B. CSS Property Validation** — với mỗi CSS property:
```
→ Có native key? (xem rule-template-bricks.md Rule 5) → Dùng native
→ Không có? → _cssCustom: "%root% { ... }"
→ Cần target <img>? → _cssCustom: "%root% img { ... }"
```

**C. Tổng hợp Settings JSON** — sau validation, ghi 1 JSON object cho mỗi element:
```json
{
  "_display": "flex",
  "_direction": "column",
  "_rowGap": "24px",
  "_cssCustom": "%root% { background: linear-gradient(...); }"
}
```
> Phải là **valid JSON**. Flow 2 copy thẳng vào `settings` — không interpret thêm.
> Ví dụ đầy đủ: `.agents/references/widget-map-examples.md`

### Bước A5 — ✅ Báo cáo tóm tắt & DỪNG

Sau khi phân tích xong TẤT CẢ sections, báo cáo cho user:

```
✅ PHASE A hoàn thành — Tóm tắt phân tích:

📄 Trang: [tên trang] | Loại: [loại]
🗂 Sections ([N] sections, [M] được build):
  - [SKIP] Menu → Global Template
  - [S1] [Tên] — [SIMPLE/MEDIUM/COMPLEX]
  - [S2] [Tên] — [SIMPLE/MEDIUM/COMPLEX]
  ...

📦 Widgets cần dùng: [list]
🖼 Images: [số lượng] images

⚠️ Sections phức tạp cần lưu ý:
  - [S1]: [lý do]

❓ Câu hỏi cần xác nhận (nếu có):
  - [ ] Q1: ...

👉 Gõ "ok" hoặc "tiếp tục" để tôi ghi file plan.
```

> **DỪNG tại đây.** Không ghi file plan cho đến khi user xác nhận.

---

## PHASE B — Ghi file plan (chỉ chạy sau khi user xác nhận)

> Trigger: User gõ "ok", "tiếp tục", "ghi file", hoặc tương đương.

Ghi toàn bộ file plan theo cấu trúc: `.agents/references/plan-output-template.md`

```
/Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/.agents/plans/[slug].md
```

**Section 3 (Bricks Widget Map):** Cột `Settings JSON` = valid JSON object từ Bước A4C.

Sau khi ghi xong:
```
✅ Đã tạo: .agents/plans/[slug].md
📊 [N] sections | [M] widgets | [K] images
▶️ Sẵn sàng cho /bricks-create-template
```

---

## Tóm tắt flow

```
[Song song] get_design_context + get_screenshot + get_site_info
     ↓
Đọc Widget Library (README → từng file cần dùng)
     ↓
Mỗi section:
  → Complexity [SIMPLE/MEDIUM/COMPLEX]
  → CSS Validation → Settings JSON (valid JSON)
  → Behavior & Gotchas
     ↓
✅ Báo cáo tóm tắt → DỪNG, chờ user confirm
     ↓ (user: "ok")
Ghi file plan (theo plan-output-template.md)
     ↓
✅ Báo cáo hoàn thành
```
