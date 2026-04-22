---
description: Audit các Bricks templates sau khi build. So sánh JSON thực tế với Plan để phát hiện lỗi tree, CSS, media. Phân tầng Quick/Deep theo mức độ cần thiết.
---

# Workflow: Restore Bricks Template (Audit)

## Input
- Plan file: `.agents/plans/[slug].md`
- Note file: `.agents/notes/[slug]-templates.md`

## Output
- Báo cáo: `.agents/audit/[slug]-result.md`

## Skip khi
> Section toàn `[SIMPLE]`, không có `_cssCustom`, user đã xác nhận visual khớp Figma.

---

## Fix Priority Matrix

> Xác định mức độ trước khi fix — **Critical trước, Medium sau.**

| Loại lỗi | Ưu tiên | Fix method |
|----------|---------|-----------|
| Tree flat (element ở depth:0 sai) | 🔴 Critical | `move` ngay |
| Image URL rỗng / sai | 🔴 Critical | Báo user cung cấp URL |
| Missing element (có trong Figma, không có trong template) | 🔴 Critical | Rebuild section (Flow 2) |
| `_cssCustom` dùng cho property CÓ native key | 🟡 Medium | `bulk_update` settings |
| `_cssCustom` thiếu `%root%` | 🟡 Medium | `bulk_update` `_cssCustom` |
| `_cssCustom` mask/transform dùng `%root%` thay vì `%root% img` | 🟡 Medium | `bulk_update` `_cssCustom` |
| Sai màu / font không khớp Design Token | 🟡 Medium | `bulk_update` settings |

---

## GIAI ĐOẠN 1: Thu thập dữ liệu

```
[Song song]
[1] Đọc .agents/plans/[slug].md          → Design Variables, danh sách sections
[2] Đọc .agents/notes/[slug]-templates.md → Template IDs
```

Với mỗi template ID, lấy JSON thực tế:
```
mcp_bricks-mcp_content(action: "get", post_id: [id], view: "summary")
```

---

## GIAI ĐOẠN 2: Audit

### Tầng 1 — Quick Audit *(Luôn chạy, ~5 phút)*

**2.1 — Tree Structure** *(lỗi phổ biến nhất)*

Với mỗi template, kiểm tra:
- Chỉ `section` ở `depth: 0` → các element khác ở đúng depth theo plan
- Số `children` của từng node khớp plan

**2.2 — Element Count**

Đếm elements thực tế vs plan:
- Thiếu element → `[MISSING]`
- Thừa element không có trong plan → `[EXTRA]`

**2.3 — Image URL**

| Trạng thái | Kết quả |
|-----------|--------|
| `id:0, url: localhost:3845/...` | ✅ Build phase |
| `id>0, WP URL` | ✅ Production |
| `id:0, url: ""` hoặc sai | ❌ Lỗi — báo user |

---

### Tầng 2 — Deep Audit *(Theo yêu cầu user)*

**2.4 — CSS Pattern**

Tiêu chí lỗi cụ thể:
```
❌ _cssCustom: "%root% { width: 100%; }"       → Có native _width:"100%"
❌ _cssCustom: "{ background: #fff; }"          → Thiếu %root%
❌ _cssCustom: "%root% { mask-image: url() }"   → Phải là %root% img
✅ _cssCustom: "%root% { background: linear-gradient(...) }"   → Không có native
✅ _cssCustom: "%root% img { mask-image: url() }"              → Đúng target
```

**2.5 — Design Tokens**

| Kiểm tra | Tiêu chuẩn |
|---------|-----------|
| Colors | Hex phải khớp Color Palette trong Plan |
| Typography | font-family, font-size, font-weight khớp Typography Tokens |
| Spacing | padding/margin theo hệ thống (bội số 4 hoặc 8) |

---

## GIAI ĐOẠN 3: Báo cáo & Fix

### Bước 3.1 — Ghi báo cáo

`.agents/audit/[slug]-result.md`

```markdown
# Audit: [Tên Page] — [YYYY-MM-DD]
Templates: [N] | Elements: [M] | Môi trường: Build / Production

## 🔴 Critical
| # | Lỗi | Element ID | Section | Hành động |
|---|-----|-----------|---------|-----------|

## 🟡 Medium
| # | Lỗi | Element ID | Section | Hành động |
|---|-----|-----------|---------|-----------|
```

### Bước 3.2 — Fix Protocol

1. Phân loại lỗi theo Fix Priority Matrix
2. **Critical trước:** Hỏi user → execute `move` / báo rebuild
3. **Medium sau:** *"Tôi phát hiện [N] lỗi CSS/token. Đồng ý auto-fix?"* → `bulk_update`
4. Cập nhật `Design Audit: ✅ PASS` vào Note file sau khi xong

---

## Tóm tắt flow

```
Đọc plan + notes → Lấy JSON thực tế
    ↓
Tầng 1 Quick: Tree → Element Count → Image URL
    ↓ (user yêu cầu)
Tầng 2 Deep: CSS Pattern → Design Tokens
    ↓
Fix Priority Matrix → Critical first → Medium
    ↓
Ghi audit report → Cập nhật note file
```

> Page Assembly → dùng `/bricks-assemble-template`
