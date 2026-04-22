---
description: Gắn các Bricks section templates vào một page theo đúng thứ tự Figma. Chạy sau khi Flow 2 build xong và Flow 3 audit pass.
---

# Workflow: Bricks Assemble Template

## Input
- Plan file: `.agents/plans/[slug].md`
- Note file: `.agents/notes/[slug]-templates.md` (có đủ Template IDs)

## Điều kiện chạy
> Tất cả sections đã `✅ Approved` trong Note file.
> Audit (Flow 3) đã `✅ PASS` hoặc user xác nhận bỏ qua.

---

## Bước 1 — Xác định thứ tự sections

Đọc `.agents/plans/[slug].md` → list sections theo thứ tự từ trên xuống (bỏ `[SKIP]`).

```
Section 1: [tên] — Template ID: [id]
Section 2: [tên] — Template ID: [id]
...
```

## Bước 2 — Tạo / xác định Page

```
mcp_bricks-mcp_content(action: "get_posts", post_type: "page")
```
→ Xác định `post_id` của page cần gắn, hoặc tạo mới nếu chưa có.

## Bước 3 — Enable Bricks editor

```
mcp_bricks-mcp_bricks(action: "enable", post_id: [page_id])
```

## Bước 4 — Cung cấp danh sách cho user

Bricks không hỗ trợ insert template bằng API — user thực hiện thủ công trong editor:

```
📋 Thứ tự sections cần gắn vào page [tên]:

1. [slug]-hero          → Template ID: [id] | [edit URL]
2. [slug]-about         → Template ID: [id] | [edit URL]
3. [slug]-certs         → Template ID: [id] | [edit URL]
...

Hướng dẫn: Mở Bricks editor → Add Element → Template → chọn đúng ID từng section.
```

## Bước 5 — Checklist frontend (user xác nhận)

- [ ] Thứ tự sections đúng với Figma
- [ ] Không có khoảng trắng thừa giữa sections
- [ ] Images hiển thị đúng (localhost build / WP URL production)
- [ ] Hover effects hoạt động
- [ ] Responsive mobile đúng (nếu có)

```
🎉 Assembly hoàn thành! [N] sections | Page: [URL]
```
