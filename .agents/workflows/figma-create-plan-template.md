---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input
- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên plan slug (ví dụ: `plan-author-template`)

## Output
- **Overview file:** `.agents/plans/[slug].md`
- **Section files:** `.agents/template/[slug-prefix]-s[N]-[section-name].md` (1 file/section)

---

## ⚠️ FRESH START — Bắt buộc đầu mỗi lần chạy

> Mỗi lần gọi `/figma-create-plan-template` là một phiên phân tích HOÀN TOÀN MỚI.

1. Không dùng lại context, plan file, hay dữ liệu Figma từ session trước
2. Ghi đè file plan cũ nếu cùng slug — không append
3. Xác nhận với user ngay khi bắt đầu:

```
🆕 Bắt đầu phân tích MỚI cho: [Figma URL / node-id]
📄 Output: .agents/plans/[slug].md
📁 Sections: .agents/template/[prefix]-s[N]-*.md
```

---

## ⚡ TOKEN LIMIT GUARD — 2 Phase bắt buộc

> **Quy tắc cứng:** Workflow LUÔN chạy **2 phase riêng biệt**:
> - **Phase A** (response 1): Thu thập + Phân tích → Báo cáo tóm tắt → **DỪNG, chờ user**
> - **Phase B** (response 2+): Ghi từng file một — **overview trước, rồi mỗi section 1 response**


---

## PHASE A — Thu thập & Phân tích

### Bước A1 — Gọi đồng thời

```
[1a] mcp_figma_get_design_context(nodeId, artifactType: "WEB_PAGE_OR_APP_SCREEN",
       clientFrameworks: "bricks-builder", clientLanguages: "html,css,javascript,php")
[1b] mcp_figma_get_screenshot(nodeId)
[1c] mcp_bricks-mcp_get_site_info(action: "info")
```

Nếu `get_design_context` lỗi → thử lại tối đa 2 lần → báo user, dừng.

### Bước A2 — Trích xuất tổng quan

| Thông tin | Ghi nhận |
|-----------|---------|
| Tên trang, loại trang | landing / profile / blog / ... |
| Viewport chính, max-width | px |
| Số sections, tên + Node ID | List |
| Design variables | Colors (token → hex), Typography, Spacing |
| Images `localhost:3845/assets/...` | URL + tên mô tả |

### Bước A3 — Đọc Widget Library

```
[1] /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md
[2] Widget files cần dùng: widgets/[tên-file].md
```

### Bước A4 — Đánh giá từng section

**A. Độ phức tạp:**

| Tiêu chí | SIMPLE | MEDIUM | COMPLEX |
|----------|--------|--------|---------|
| Layout | 1 col | 2-3 cols, flex | Grid không đều, overlap, absolute |
| Animation | Không | Hover | Scroll, JS |
| Custom CSS | Không | `_cssCustom` | `html` element |
| Images | Standard | Background | Mask, clip-path |

**B. ⚠️ Slider / Tab / Accordion Detection — Bắt buộc xác nhận trước khi phân loại:**

**Bước 1 — Gọi `get_metadata` trên node section đó:**
```
mcp_figma_get_metadata(nodeId: "[section_node_id]")
→ Đọc tên FRAME và COMPONENT trong XML output
```

**Bước 2 — Đọc tên layers (parent + children):**

| Tên layer chứa | Widget xác nhận |
|---------------|----------------|
| `Slider`, `Carousel`, `Swiper`, `Gallery`, `Slide N` | `slider-nested` |
| `Tab`, `Tabs`, `TabPanel`, `Tab N`, `Tab Item` | `tabs-nested` |
| `Accordion`, `FAQ`, `Collapse`, `Expand` | `accordion-nested` |

**Bước 3 — Nếu tên layer KHÔNG rõ ràng:**

> ❌ Không được đoán. Không được dùng safe default. Không được tự quyết định.

→ Đưa vào danh sách câu hỏi trong **Bước A5**, bắt buộc user xác nhận trước khi ghi section file.

```
❓ Section [Tên]: Có [N] item lặp + nav buttons. Đây là:
   A) Slider (dùng slider-nested với JS)
   B) Static layout (dùng block thông thường)
```

**C. CSS Property Validation:**
```
→ Có native key? (xem rule-template-bricks.md Rule 5) → Dùng native
→ Không có? → _cssCustom: "%root% { ... }"
→ Cần target <img>? → _cssCustom: "%root% img { ... }"
```

**D. Tổng hợp Settings JSON** cho mỗi element — phải là valid JSON.

### Bước A5 — ✅ Báo cáo & DỪNG

```
✅ PHASE A hoàn thành:

📄 Trang: [tên] | Loại: [loại]
🗂 Sections ([N] sections, [M] được build):
  - [SKIP] Menu
  - [S1] [Tên] — [SIMPLE/MEDIUM/COMPLEX]
  ...

📦 Widgets: [list]
🖼 Images: [N] assets

⚠️ Sections phức tạp:
  - [S1]: [lý do]

❓ Câu hỏi cần xác nhận:
  - [ ] ...

👉 Gõ "ok" hoặc "tiếp tục" để tôi ghi file plan.
```

> **DỪNG tại đây.** Không ghi file nào cho đến khi user xác nhận.

---

## PHASE B — Ghi files (sau khi user xác nhận)

> Trigger: User gõ "ok", "tiếp tục", hoặc tương đương.

### B1 — Ghi overview plan (1 response)

File: `.agents/plans/[slug].md`

**Nội dung overview** (ngắn gọn, không chứa widget JSON):
- Page info (loại, viewport, ngày)
- Design Variables (colors, typography, spacing)
- Bảng sections với link → section files
- Bảng widgets cần dùng
- Pre-build checklist
- Câu hỏi đã xác nhận

> Cấu trúc đầy đủ: `.agents/references/plan-output-template.md`

### B2 — Ghi từng section file (mỗi section = 1 response)

**Thư mục:** `.agents/template/`
**Naming:** `[slug-prefix]-s[N]-[section-name].md`

> Ví dụ: `author-s1-hero.md`, `author-s2-co-duyen.md`

**Nội dung mỗi section file:**
```markdown
# S[N]: [Tên Section] | Node: `[id]` | [SIMPLE/MEDIUM/COMPLEX]

## Layout
[Mô tả layout ngắn]

## Element Tree
[Cây text thể hiện cấu trúc]

## Images
[Bảng: ID | Mô tả | URL]

## Bricks Widget Map
[Bảng: Element | Widget | Settings JSON]

## Behavior & Gotchas
[Bảng: Vấn đề | Giải pháp]
```

> **Ghi lần lượt:** overview → S1 → S2 → ... → SN
> Mỗi section = 1 tool call `write_to_file`, không gộp.

### B3 — Báo cáo hoàn thành

```
✅ Đã tạo plan:
  📄 .agents/plans/[slug].md
  📁 .agents/template/[prefix]-s1-*.md
  📁 .agents/template/[prefix]-s2-*.md
  ...

📊 [N] sections | [M] widgets | [K] images
▶️ Sẵn sàng cho /bricks-create-template
```

---

## Tóm tắt flow

```
[Song song] get_design_context + get_screenshot + get_site_info
     ↓
Đọc Widget Library → Phân tích từng section
     ↓
✅ Báo cáo tóm tắt → DỪNG chờ user
     ↓ (user: "ok")
Ghi overview plan (B1)
     ↓
Ghi section file S1 (B2) → ... → Ghi section file SN (B2)
     ↓
✅ Báo cáo hoàn thành
```
