---
description: Review cac template tu bricks-create-template. So sanh voi plan file va Figma, bao loi va re-build neu khong tuong thich.
---

# Workflow: Restore Bricks Template (Review & Fix)

## Input
- Slug của plan file (ví dụ: `blog-author-profile`)
- Figma node-id (ví dụ: `3641-1142`) — để lấy screenshot so sánh

## Output
- **Trường hợp A (Đúng):** Thông báo "Hoàn tất việc tạo dựng template", cập nhật Note file
- **Trường hợp B (Sai):** Ghi `error.md` vào `.agents/error/`, rebuild các template lỗi, review lại

## Điều kiện chạy
> Workflow này chạy **sau khi `/bricks-create-template` hoàn tất**.
> Nguồn tham chiếu: `.agents/Notes/[slug]-templates.md` + `.agents/plans/[slug].md` + Figma screenshot.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu để review

### Bước 1.1 — Đọc các file tham chiếu (song song)
```
read: .agents/Notes/[slug]-templates.md       ← danh sách templates đã tạo
read: .agents/plans/[slug].md                  ← plan gốc (layout, widgets, variables)
mcp_figma_get_screenshot(nodeId: "[node-id]")  ← ảnh design gốc Figma
```

Từ Note file, lấy:
- Danh sách tất cả templates đã tạo: tên, Bricks ID, section tương ứng
- Danh sách images đã sideload (attachment_id)

Từ Plan file, lấy thông tin kỳ vọng cho mỗi section:
- Layout (số cột, grid)
- Widgets đã chỉ định
- Variables (bg color, spacing, border-radius...)
- Custom CSS

### Bước 1.2 — Lấy nội dung thực tế của từng template từ Bricks
Với mỗi template ID trong Note file:
```
mcp_bricks-mcp_template(
  action: "get",
  template_id: [id]
)
```
→ Lấy về `elements[]` thực tế đang có trong template.

---

## GIAI ĐOẠN 2: So sánh & Đánh giá từng template

Với mỗi template, so sánh **thực tế** (từ Bricks) với **kỳ vọng** (từ Plan + Figma):

### Tiêu chí đánh giá

| Tiêu chí | Kỳ vọng (từ plan) | Thực tế (từ Bricks) | Kết quả |
|----------|------------------|---------------------|---------|
| Số lượng elements | N elements | ? elements | ✅/❌ |
| Layout wrapper | section/block/div | ? | ✅/❌ |
| Widgets con đúng loại | heading, text, image... | ? | ✅/❌ |
| Background color | #f2f3f5 | ? | ✅/❌ |
| Padding/spacing | 40px | ? | ✅/❌ |
| Images có attachment_id | id: 101, 102... | ? | ✅/❌ |
| Custom CSS applied | có | có/không | ✅/❌ |

### Ngưỡng đánh giá
- **✅ Tương thích (PASS):** Đúng layout, đúng widgets chính, đúng màu sắc cơ bản. Sai nhỏ về spacing ±5px hoặc font-size ±2px → vẫn PASS.
- **❌ Không tương thích (FAIL):** Sai layout chính (số cột sai, thiếu block quan trọng), sai widget lớn (dùng text thay vì image), thiếu hình ảnh, sai hoàn toàn màu background section.

> **Lưu ý:** Chỉ FAIL khi **phần lớn giao diện không tương thích** với Figma. Không FAIL vì các chi tiết nhỏ (pixel sai nhỏ, font-weight lệch 1 bậc).

### Kết quả sau khi đánh giá
- Lập bảng kết quả:

| Template | Section | Trạng thái | Vấn đề (nếu FAIL) |
|----------|---------|-----------|-------------------|
| blog-author-hero | S2: Hero | ✅ PASS | — |
| blog-author-su-kien | S4: Sự kiện | ❌ FAIL | Thiếu 3 event cards, sai layout grid |
| ... | ... | ... | ... |

---

## GIAI ĐOẠN 3A: Tất cả templates PASS

Nếu **tất cả** templates đều ✅ PASS:

1. Cập nhật Note file — thêm dòng trạng thái review:
```markdown
## Review Result
**Review date:** [YYYY-MM-DD]
**Kết quả:** ✅ TẤT CẢ TEMPLATES TƯƠNG THÍCH

| Template | Status |
|----------|--------|
| blog-author-hero | ✅ PASS |
| ...              | ✅ PASS |
```

2. Thông báo kết quả:
```
✅ Hoàn tất việc tạo dựng template.
Tất cả [N] templates tương thích với plan và Figma design.
File note: .agents/Notes/[slug]-templates.md
```

---

## GIAI ĐOẠN 3B: Có template(s) FAIL

### Bước 3B.1 — Ghi file error
Ghi file: `.agents/error/[slug]-error-[YYYY-MM-DD].md`

```markdown
# Error Report: [Tên Page] Templates
**Date:** [YYYY-MM-DD HH:MM]
**Plan file:** `.agents/plans/[slug].md`
**Note file:** `.agents/Notes/[slug]-templates.md`

---

## Tổng kết
- Tổng templates review: N
- PASS: X
- FAIL: Y

---

## Templates cần fix

### ❌ [template-name] (ID: [id])
**Section:** [Section N: Tên]
**Vấn đề phát hiện:**
- Layout: [mô tả sai sót cụ thể]
- Widgets: [element nào sai/thiếu]
- Variables: [giá trị nào không đúng]
- Images: [ảnh nào thiếu/sai]

**Kỳ vọng (từ plan):**
```
[cấu trúc elements kỳ vọng]
```

**Thực tế (từ Bricks):**
```
[cấu trúc elements thực tế]
```

**Nguyên nhân suy đoán:**
- [ ] Plan file chưa đủ chi tiết
- [ ] Build elements bị thiếu bước
- [ ] Custom CSS chưa được apply
- [ ] Sideload image thất bại (attachment_id sai)
- [ ] Khác: ...

---
[Lặp lại cho mỗi template FAIL]
---

## Hành động tiếp theo
→ Chạy lại `/bricks-create-template` chỉ với các templates FAIL:
[Liệt kê slug + section cần rebuild]
```

### Bước 3B.2 — Phân tích nguyên nhân từ plan + Figma
Trước khi rebuild, xác định lại:

1. **Đọc lại plan file** — section bị FAIL có đủ thông tin không? Widgets, variables, custom CSS đã đầy đủ chưa?
2. **Lấy screenshot Figma** để đối chiếu trực quan
3. **Xác định điểm sai** cụ thể:
   - Nếu plan thiếu → bổ sung vào plan file trước khi rebuild
   - Nếu build sai → chỉ rebuild lại template đó

### Bước 3B.3 — Rebuild chỉ các templates FAIL
Gọi lại các bước trong `/bricks-create-template` **chỉ cho sections FAIL**:

```
// Xoá template cũ (nếu cần)
mcp_bricks-mcp_template(action: "delete", template_id: [id-fail])

// Tạo lại từ đầu
mcp_bricks-mcp_template(action: "create", type: "section", title: "[slug]-[section]")
→ new_template_id

// Build lại elements (dựa vào plan đã cập nhật + error report)
mcp_bricks-mcp_content(action: "update_content", post_id: new_template_id, elements=[...])

// Apply custom CSS
mcp_bricks-mcp_code(action: "set_page_css", post_id: new_template_id, css="...")
```

### Bước 3B.4 — Cập nhật Note file sau rebuild
Cập nhật `.agents/Notes/[slug]-templates.md` với template ID mới:
- Thay thế dòng template cũ bằng ID mới
- Thêm ghi chú "Rebuilt on [date]"

### Bước 3B.5 — Review lại lần 2
Sau khi rebuild xong, **quay lại Giai đoạn 2** để review lại các templates vừa rebuild.

> **Giới hạn:** Nếu sau 2 lần rebuild vẫn FAIL → ghi nhận vào error file với nhãn `NEEDS_MANUAL_REVIEW` và dừng tự động. Báo cáo user để xử lý thủ công.

---

## Ví dụ gọi workflow

```
User: "/restore-bricks-template blog-author-profile 3641-1142"

AI thực hiện:
  [Giai đoạn 1] Đọc Note + Plan + Figma screenshot
                template.get(id) cho từng template
  [Giai đoạn 2] So sánh từng template → bảng PASS/FAIL
  
  [Trường hợp A - Tất cả PASS]
  → Cập nhật Note file
  → "✅ Hoàn tất việc tạo dựng template."

  [Trường hợp B - Có FAIL]
  → Ghi .agents/error/blog-author-profile-error-2026-04-10.md
  → Phân tích nguyên nhân
  → Rebuild chỉ templates FAIL
  → Review lại lần 2
  → Nếu OK: "✅ Hoàn tất sau khi fix [N] templates."
  → Nếu vẫn FAIL: "⚠️ [N] templates cần xử lý thủ công. Xem: .agents/error/..."
```

---

## Cấu trúc thư mục liên quan

```
.agents/
├── plans/
│   └── [slug].md                          ← plan gốc (flow 1)
├── Notes/
│   └── [slug]-templates.md                ← danh sách templates (flow 2)
├── error/
│   └── [slug]-error-[YYYY-MM-DD].md       ← error report (flow 3, nếu có FAIL)
└── workflows/
    ├── figma-create-plan-template.md       ← flow 1
    ├── bricks-create-template.md           ← flow 2
    └── restore-bricks-template.md          ← flow 3 (file này)
```
