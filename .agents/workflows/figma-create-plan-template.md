---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input
- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên plan slug (ví dụ: `plan-author-template`)

## Output
- **Overview file:** `.agents/plans/[slug].md`
- **Section files:** `.agents/template/[slug-prefix]-s[N]-[section-name].md`

---

## ⚠️ FRESH START — Bắt buộc đầu mỗi lần chạy

Mỗi lần gọi `/figma-create-plan-template` là phiên phân tích HOÀN TOÀN MỚI.
1. Không dùng lại context, plan file, hay dữ liệu Figma từ session trước
2. Ghi đè file plan cũ nếu cùng slug — không append

```
🆕 Bắt đầu phân tích MỚI cho: [Figma URL / node-id]
📄 Output: .agents/plans/[slug].md
```

---

## ⚡ TOKEN LIMIT GUARD — 3 Phase bắt buộc

- **Phase A**: Thu thập + Phân tích → Báo cáo chat + Ghi plan file
- **[User action]**: Review sections, điền Status
- **Phase B**: Đọc plan đã confirm → Ghi từng section template file

---

## PHASE A — Thu thập & Phân tích

### A1 — Gọi đồng thời
```
[1a] mcp_figma_get_design_context(nodeId, artifactType: "WEB_PAGE_OR_APP_SCREEN",
       clientFrameworks: "bricks-builder", clientLanguages: "html,css,javascript,php")
[1b] mcp_figma_get_screenshot(nodeId)
[1c] mcp_bricks-mcp_get_site_info(action: "info")
```
Nếu `get_design_context` lỗi → thử lại tối đa 2 lần → báo user, dừng.

### A2 — Trích xuất tổng quan

| Thông tin | Ghi nhận |
|-----------|---------|
| Tên trang, loại trang | landing / profile / blog / ... |
| Viewport chính, max-width | px |
| Số sections, tên + Node ID | List |
| Design variables | Colors (token → hex), Typography, Spacing |
| Images `localhost:3845/assets/...` | URL + tên mô tả |

### A3 — Đọc Widget Library
```
[1] widgets/README.md
[2] Widget files cần dùng: widgets/[tên-file].md
```

### A4 — Đánh giá từng section

> **Đọc component:** `.agents/components/figma-section-analysis.md`
> Dùng hướng dẫn trong đó để: đánh giá độ phức tạp, detect Slider/Tab, validate CSS properties.

### A5 — Báo cáo & DỪNG

```
✅ PHASE A hoàn thành:
📄 Trang: [tên] | Loại: [loại] | Viewport: [px] | Max-width: [px]
📦 Widgets: [list] | 🖼 Images: [N]

[SKIP] Header/Menu — bỏ qua

[S1] Tên Section — SIMPLE/MEDIUM/COMPLEX
  Layout  : [mô tả ngắn]
  Widgets : section > block > [widgets]
  Elements: [N] | depth: [D]
  Images  : [N] ảnh
  Gotchas : [nếu có]
  ❓ Thắc mắc: [câu hỏi kỹ thuật nếu có]
  → Status : ___

... (lặp cho tất cả sections)

👉 Điền "ok" hoặc note vào ô Status, gửi lại để tôi ghi file.
```

> **DỪNG.** Không ghi file cho đến khi user xác nhận. "ok all" → xác nhận nhanh toàn bộ.

### A6 — Ghi plan file ngay (không chờ user)

Ghi `.agents/plans/[slug].md` ngay sau báo cáo.
> **Template:** `.agents/components/output-file-templates.md` → mục "Overview Plan File"

---

## [USER ACTION] — Confirm trong file plan

User mở `.agents/plans/[slug].md`, điền Status cho từng section:
- `ok` — build theo plan
- note / câu trả lời — điều chỉnh hoặc trả lời thắc mắc kỹ thuật

---

## PHASE B — Ghi section template files

> Trigger: User báo "đã confirm" / "xong".

### B0 — Đọc plan file đã confirm
```
view_file: .agents/plans/[slug].md
→ Thu thập Status từng section + Q&A từ note của user
```

### B1 — Ghi từng section file (mỗi section = 1 response)

> **Template:** `.agents/components/output-file-templates.md` → mục "Section File"
> **BẮT BUỘC:** Đọc lại `→ Status:` trong plan trước mỗi section. Nếu Status có A/B → copy y chang quyết định.
> **CSS phức tạp:** `mcp_figma_get_design_context` trên node đó → lấy exact values.

Thứ tự: S1 → S2 → ... → SN. Section `[SKIP]` → bỏ qua.

### B2 — Báo cáo hoàn thành

```
✅ Đã tạo plan:
  📄 .agents/plans/[slug].md
  📁 .agents/template/[prefix]-s1-*.md → ... → SN
📊 [N] sections | [M] widgets | [K] images
▶️ Sẵn sàng cho /bricks-create-template
```

---

## Tóm tắt flow

```
A1: [Song song] get_design_context + get_screenshot + get_site_info
A2-A4: Phân tích (tham khảo .agents/components/figma-section-analysis.md)
A5: Báo cáo chat → DỪNG chờ user
A6: Ghi plan file (không chờ)
    ↓ (user confirm)
B0: Đọc plan → thu thập Status
B1: Ghi section files (dùng .agents/components/output-file-templates.md)
B2: Báo cáo hoàn thành → /bricks-create-template
```
