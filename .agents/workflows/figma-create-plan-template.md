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

## ⚡ TOKEN LIMIT GUARD — 3 Phase bắt buộc

> **Quy tắc cứng:** Workflow chạy **3 phase riêng biệt**:
> - **Phase A**: Thu thập + Phân tích → **Ghi plan file ngay** (có Status fields cho user điền)
> - **[User action]**: Mở file plan, review từng section, điền Status → báo AI khi xong
> - **Phase B**: Đọc plan file đã confirm → **Ghi từng section template file** (1 section = 1 response)

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

AI xuất báo cáo theo format sau — **liệt kê đầy đủ TẤT CẢ sections** (không bỏ sót):

```
✅ PHASE A hoàn thành:

📄 Trang: [tên] | Loại: [loại] | Viewport: [px] | Max-width: [px]
📦 Widgets dự kiến: [list]
🖼 Images: [N] assets

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DANH SÁCH SECTIONS (review từng section):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[SKIP] Header / Menu — bỏ qua (template riêng)

──────────────────────────────────────
[S1] Tên Section — SIMPLE / MEDIUM / COMPLEX
  Layout   : [mô tả ngắn, ví dụ: 2 cols flex, image trái / text phải]
  Widgets  : section > block > heading, text, image
  Elements : [N] elements | depth max: [D]
  Images   : [N] ảnh — [mô tả]
  Gotchas  : [nếu có, ví dụ: image absolute, gradient bg, hover effect]
  ❓ Thắc mắc: [nếu có câu hỏi kỹ thuật chưa rõ]
  → Status : ___  ← user điền "ok" hoặc ghi note

──────────────────────────────────────
[S2] Tên Section — SIMPLE / MEDIUM / COMPLEX
  Layout   : ...
  Widgets  : ...
  Elements : ...
  Images   : ...
  Gotchas  : ...
  ❓ Thắc mắc: [ví dụ: Layer "Gallery" — slider-nestable hay static block?]
  → Status : ___

... (lặp cho tất cả sections)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Ghi chú nhắc nhở chung (Flow 2 tham khảo):
  - [S1] Hero image: object-fit cover, crop top-center
  - [S3] Card hover: cần _cssCustom :hover trên block card

👉 Review từng section ở trên:
   - Nếu ổn → điền "ok" vào ô Status
   - Nếu có điều chỉnh / câu trả lời → ghi note vào ô Status
   Khi xong tất cả → gửi lại để tôi ghi file plan.
```

> **DỪNG tại đây.** Không ghi file nào cho đến khi user xác nhận tất cả sections.
> Nếu tất cả đều ổn → user có thể gõ "ok all" để xác nhận nhanh toàn bộ.

---

## PHASE A — Kết thúc: Ghi plan file ngay

> Sau Phase A5: **Không chờ user** — ghi plan file ngay với đầy đủ thông tin report + Status fields trống.

### A6 — Ghi `.agents/plans/[slug].md`

File plan ghi ngay sau báo cáo, gồm:
- Page info (loại, viewport, ngày phân tích)
- Design Variables (colors, typography, spacing)
- **Bảng sections với Status fields** — copy y chang từ báo cáo A5 vào file
- Bảng widgets cần dùng
- Section template files sẽ tạo ở Phase B
- `## ❓ Ghi chú & Thắc mắc` (thắc mắc kỹ thuật chờ user điền)

> Sau khi ghi xong, báo user:
> ```
> ✅ Đã ghi plan file: .agents/plans/[slug].md
> 👉 Mở file, review từng section, điền "ok" hoặc note vào ô Status.
> Khi xong → báo tôi để tôi ghi section template files.
> ```

---

## [USER ACTION] — Confirm trong file plan

> User mở `.agents/plans/[slug].md`, điền Status cho từng section:
> - `ok` — section đã hiểu, build theo plan
> - note / câu trả lời — điều chỉnh hoặc trả lời thắc mắc kỹ thuật

---

## PHASE B — Ghi section template files (sau khi user báo xong)

> Trigger: User báo "đã confirm" / "xong" / tương đương.

### B0 — Đọc plan file đã confirm

```
mcp_bricks-mcp_content (hoặc view_file): Đọc .agents/plans/[slug].md
→ Thu thập Status từng section
→ Cập nhật Q&A từ note của user vào quyết định kỹ thuật
```

| Section | Status user điền | Quyết định kỹ thuật |
|---------|-----------------|--------------------|
| S1 | ok | Build theo plan |
| S3 | slider-nestable | → dùng `slider-nestable` |

### B1 — Ghi từng section template file (mỗi section = 1 response)

**Thư mục:** `.agents/template/`
**Naming:** `[slug]-s[N]-[section-name].md`

> Ví dụ: `blog-s1-hero.md`, `blog-s2-co-duyen.md`

**Nội dung mỗi section file:**
```markdown
# S[N]: [Tên Section] | Node: `[id]` | [SIMPLE/MEDIUM/COMPLEX]

## Layout
[Mô tả layout ngắn]

## Element Tree
[Cây text thể hiện cấu trúc]

## Images
[Bảng: Tên | URL]

## Bricks Widget Map
[Bảng: Element | Widget | Settings JSON]

## Behavior & Gotchas
[Bảng: Vấn đề | Giải pháp]

## ❓ Ghi chú & Thắc mắc
<!-- Chỉ có section này nếu section đó có điểm cần lưu ý -->
[Quyết định đã xác nhận với user]
[Ghi chú nhắc nhở cho Flow 2 khi build]
```

> **Ghi lần lượt:** S1 → S2 → ... → SN
> Mỗi section = 1 tool call `write_to_file`, không gộp.
> Section nào user điền `[SKIP]` → bỏ qua.

### B2 — Báo cáo hoàn thành

```
✅ Đã tạo plan + section template files:
  📄 .agents/plans/[slug].md
  📁 .agents/template/[slug]-s1-*.md
  📁 .agents/template/[slug]-s2-*.md
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
✅ Báo cáo A5 (trong chat) + Ghi .agents/plans/[slug].md (ngay)
     ↓
[User mở file plan → điền Status → báo AI]
     ↓
B0: Đọc plan đã confirm → Thu thập Q&A
B1: Ghi .agents/template/[slug]-s1-*.md → ... → SN
     ↓
✅ Báo cáo hoàn thành → Sẵn sàng /bricks-create-template
```

### B0 — Tổng hợp Q&A (trước khi ghi file)

Sau khi user trả lời, AI cập nhật nội bộ:

| Section | Thắc mắc | Câu trả lời của user | Quyết định kỹ thuật |
|---------|----------|----------------------|--------------------|
| [S2] | Slider hay static? | "Dùng slider" | → `slider-nestable` |
| [S4] | Tab hay Accordion? | "Tab bình thường" | → `tabs-nestable` |

> Bảng này sẽ được ghi vào section `## ❓ Ghi chú & Thắc mắc` trong overview plan file.

---

### B1 — Ghi overview plan (1 response)

File: `.agents/plans/[slug].md`

**Nội dung overview** (ngắn gọn, không chứa widget JSON):
- Page info (loại, viewport, ngày)
- Design Variables (colors, typography, spacing)
- Bảng sections với link → section files
- Bảng widgets cần dùng
- Pre-build checklist
- **`## ❓ Ghi chú & Thắc mắc`** — bắt buộc có section này:

```markdown
## ❓ Ghi chú & Thắc mắc

### Đã xác nhận với user
| Section | Thắc mắc | Trả lời | Quyết định |
|---------|----------|---------|------------|
| S2 Gallery | Slider hay static grid? | Dùng slider có nav | `slider-nestable` |

### Ghi chú nhắc nhở (cho Flow 2)
- [S1] Hero image: object-fit cover, crop top-center → dùng `_objectPosition: "50% 0%"`
- [S3] Card hover: cần `_cssCustom: "%root%:hover { box-shadow: ... }"` trên block card
```

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

## ❓ Ghi chú & Thắc mắc
<!-- Chỉ có section này nếu section đó có điểm cần lưu ý -->
[Nếu có thắc mắc kỹ thuật đã được user giải đáp → ghi lại quyết định]
[Nếu có ghi chú nhắc nhở → ghi để Flow 2 tham khảo khi build]
<!-- Ví dụ:
- Widget: Đã xác nhận với user → dùng `slider-nestable` (không phải static block)
- CSS: Image hero cần object-position top-center do crop Figma
-->
```

> **Ghi lần lượt:** overview → S1 → S2 → ... → SN
> Mỗi section = 1 tool call `write_to_file`, không gộp.
> Section file nào **không có thắc mắc** → bỏ qua block `## ❓ Ghi chú & Thắc mắc`.

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
