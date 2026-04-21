---
description: Audit và đồng bộ dữ liệu của các Bricks templates. So sánh JSON thực tế với Plan và Figma để đảm bảo tính nhất quán của Design System.
---

# Workflow: Restore Bricks Template (Design Audit)

## Input
- Slug của plan: `.agents/plans/[slug].md`
- Note file từ Flow 2: `.agents/notes/[slug]-templates.md`

## Output
- Báo cáo: `.agents/audit/[slug]-result.md`
- Kết quả: Đồng bộ lỗi hoặc thông báo "Design Verified"

## Skip khi
> Section toàn `[SIMPLE]`, không có `_cssCustom`, user đã xác nhận visual 100% khớp Figma.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu

### Bước 1.1 — Đọc đồng thời 3 nguồn

```
[1] .agents/plans/[slug].md          → Design Variables, danh sách sections
[2] .agents/notes/[slug]-templates.md → Template IDs
[3] mcp_figma_get_design_context      → Tổng quan visual để detect missing elements
```

### Bước 1.2 — Lấy JSON thực tế

Với mỗi template ID từ Note file:
```
mcp_bricks-mcp_content(action: "get", post_id: [id], view: "summary")
```
→ Hợp nhất tất cả `elements[]` thành **Global JSON Map** để audit xuyên suốt.

---

## GIAI ĐOẠN 2: Audit (Design Linter)

Chạy 4 kiểm tra trên Global JSON Map:

### 2.1 — Design System

| Kiểm tra | Tiêu chuẩn |
|---------|-----------|
| **Colors** | Mọi hex trong `settings` phải khớp Color Palette của Plan → lệch tone → "Invalid Color" |
| **Typography** | font-family, font-size, line-height khớp Typography Tokens |
| **Spacing** | padding/margin tuân theo hệ thống (chia hết cho 4 hoặc 8) |

### 2.2 — Media & Dynamic Data

| Trạng thái | Kết quả |
|-----------|--------|
| `id:0 + url: localhost:3845/...` | ✅ Hợp lệ (build phase) |
| `id:0 + url: localhost:3845/...` trên production | ⚠️ Cần thay WP URL |
| `id>0 + WP URL` | ✅ Hợp lệ (production) |
| `id:0 + url rỗng/sai` | ❌ Lỗi — cần fix |
| Dynamic `{...}` trong Plan `[DYNAMIC]` nhưng build dùng static | ❌ Lỗi ngược |

### 2.3 — Cấu trúc & CSS

- **Missing Elements:** So Figma context — block/element nào có trong design nhưng không có trong template?
- **CSS Isolation:** Class CSS trùng tên nhưng thuộc tính khác nhau giữa các sections?
- **`%root%` Verify:** 100% `_cssCustom` phải dùng `%root%` để target đúng element

### 2.4 — Parent-Child Tree *(lỗi phổ biến nhất)*

> 🚨 Xảy ra **100%** sau mỗi `update_content`. Bắt buộc audit.

```
mcp_bricks-mcp_content(action: "get", post_id: [id], view: "summary")
```

Kiểm tra:
- Chỉ `section` ở `depth: 0` — element khác ở `depth: 0` → parent bị flat
- `container` ở `depth: 1`, các blocks/widgets ở đúng depth theo plan
- Số `children` của từng node khớp plan

**Fix nếu flat:**
```
mcp_bricks-mcp_content(action: "move", post_id: [id],
  element_id: "[id]", target_parent_id: "[parent]", position: N)
```
→ Move từ ngoài vào trong (level 1 → 2 → ... → leaf)

---

## GIAI ĐOẠN 3: Báo cáo & Sync

### Bước 3.1 — Ghi báo cáo

`.agents/audit/[slug]-result.md`

```markdown
# Audit Report: [Tên Page]

## 📊 Tổng quan
- Templates: [N] | Elements: [M]
- Môi trường: Build (localhost) / Production
- Trạng thái: ⚠️ Cần đồng bộ / ✅ Design Verified

## 🔍 Lỗi phát hiện

### [#1] [Tên lỗi] — [Loại: Color / Typography / Tree / Missing / CSS]
- **Phát hiện:** [mô tả + Element ID + Section]
- **Kỳ vọng:** [giá trị đúng]
- **Hành động:** Auto-fix / Cần rebuild section / Bỏ qua
```

### Bước 3.2 — Sync Protocol

1. **Phân loại:**
   - `Typo/Thông số` (sai màu, sai font, thiếu `%root%`) → Auto-fix
   - `Logic/Thiếu hụt` (missing element, sai parent-child) → Đề xuất rebuild tại Flow 2
2. **Hỏi user:** *"Tôi phát hiện [N] lỗi thông số. Đồng ý để tôi auto-fix?"*
3. **Chỉ execute** `bulk_update` / `move` sau khi user gõ "ok"
4. **Cập nhật** dòng "Design Audit: ✅ PASS" vào Note file sau khi fix xong

---

## GIAI ĐOẠN 4: Page Assembly

### Bước 4.1 — Xác định thứ tự sections
Từ `.agents/plans/[slug].md` → list sections từ trên xuống.

### Bước 4.2 — Insert templates vào Page

**Cách A (khuyến nghị):** Thêm element `template` trong Bricks editor, chọn đúng Template ID cho mỗi section.

**Cách B (reference):**
```
Section 1: [tên] — ID: [id] — [edit URL]
Section 2: [tên] — ID: [id] — [edit URL]
```

### Bước 4.3 — Checklist frontend

- [ ] Thứ tự sections đúng với Figma
- [ ] Không có khoảng trắng thừa giữa sections
- [ ] Images hiển thị (localhost nếu build, WP URL nếu production)
- [ ] Hover effects hoạt động
- [ ] Responsive mobile đúng (nếu có breakpoints)

```
🎉 Audit hoàn thành!
Trang: [URL] | [N] sections | Ảnh: Build / Production
```

---

## Tóm tắt flow

```
Đọc plan + notes + Figma → Lấy JSON thực tế → Hợp nhất Global JSON Map
    ↓
Audit: Design System → Media → CSS → Parent-Child Tree
    ↓
Ghi báo cáo → Hỏi user → Fix (bulk_update / move)
    ↓
Page Assembly → Checklist frontend → Done
```
