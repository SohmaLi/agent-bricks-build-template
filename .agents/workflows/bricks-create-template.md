---
description: Doc file plan tu figma-create-plan-template va tao Bricks templates cho tung section. Moi section = 1 template trong Bricks. Build tung section mot, bao user xem lai truoc khi tiep tuc.
---

# Workflow: Bricks Create Template

## Input
- Slug của plan file (ví dụ: `blog-author-hero`)
- Plan file: `.agents/plans/[slug].md`

## Output
- N Bricks templates trên site (mỗi section = 1 template)
- File note: `.agents/notes/[slug]-templates.md`

---

## ⚠️ Quy tắc TUYỆT ĐỐI

| Rule | ✅ Đúng | ❌ Sai |
|------|--------|--------|
| Layout engine | `section → container → block → [widgets]` | `html` cho layout |
| Settings keys | Đọc từ `/widgets/[widget].md` | Tự đặt key từ trí nhớ |
| CSS nâng cao | `_cssCustom` với `%root%` | `set_page_css` cho element-specific |
| Position | `_cssCustom: "%root% { position: relative; }"` | **`_position` setting — Bricks bỏ qua** |
| Slider / Tab | `slider-nestable` / `tabs-nestable` | Block giả slider |
| Image URL | `id: 0, url: "localhost:3845/..."` (Cách 1) | `src: ""` rỗng |
| Nội dung text | Copy y chang từ Figma, đủ số lượng | Tự ý dùng dynamic tag hoặc bớt số lượng |
| Build flow | Từng section → báo user → CHỜ xác nhận | Build song song |

---

## GIAI ĐOẠN 1: Đọc & Chuẩn bị

### Bước 1.1 — Đọc plan file

Đọc toàn bộ `.agents/plans/[slug].md`, ghi lại:
- Site URL, Bricks version
- Danh sách sections (bỏ nhãn `[SKIP]`) + mức độ `[SIMPLE/MEDIUM/COMPLEX]`
- **Danh sách widgets cần dùng** (Section 4 trong plan)
- Danh sách images + chiến lược (Cách 1 / Cách 2)

### Bước 1.2 — Đọc Widget Library

```
[1] /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md
[2] Mỗi widget trong danh sách plan → đọc file tương ứng:
    /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/[tên-file].md
```

Ghi nhận: settings keys chính xác, kiểu dữ liệu, `_cssCustom` selectors, JSON example.

> ⚠️ Không dùng settings key từ trí nhớ. Chỉ dùng keys từ widget library.

### Bước 1.3 — Sắp xếp thứ tự build

```
[SIMPLE] → [MEDIUM] → [COMPLEX]
```

| # | Section | Complexity | Template Slug | Status |
|---|---------|-----------|--------------|--------|
| 1 | Hero | SIMPLE | `[slug]-hero` | ⏳ |

---

## GIAI ĐOẠN 2: Chuẩn bị Images

### Cách 1 — Custom URL *(ưu tiên)*

```json
"image": { "id": 0, "url": "http://localhost:3845/assets/[hash].png" }
```
✅ Dùng thẳng — hoạt động khi Figma Desktop đang chạy.

### Cách 2 — Lưu file + user upload *(fallback)*

```bash
curl -o "bricks_mcp/images/[tên-file].png" "http://localhost:3845/assets/[hash].png"
```
→ Báo user upload lên WP Media Library → nhận WP URL → dùng trong `image` widget.

---

## GIAI ĐOẠN 3: Build từng Section (tuần tự)

> **Context Reinforcement:** Trước khi build MỖI section, đọc lại plan (phần section đó) và widget files sẽ dùng. Tránh sai sót do trôi context.

---

### Bước 3.A — Pre-build Checklist & Build JSON

**Bắt buộc check TRƯỚC khi viết JSON:**

| # | Kiểm tra | Hành động |
|---|---------|----------|
| 1 | Số card/box/item lặp trong Figma | Build đúng số đó — không bớt không thêm |
| 2 | Section có slider/tab? | → `slider-nestable` / `tabs-nestable` |
| 3 | Image có `position: absolute`? | → Parent cần `_cssCustom: "%root% { position: relative; }"` |
| 4 | Section có gradient/shadow phức tạp? | → CSS vào `_cssCustom` của chính widget |
| 5 | Kích thước image? | → Ghi `_width` + `_height` theo Figma (px hoặc %) |
| 6 | Block có border + box-shadow? | → `_border` native + `_cssCustom` cho box-shadow song song |
| 7 | Text content? | → Copy y chang từ Figma — KHÔNG tự dùng dynamic tag |

Build elements array theo nguyên tắc:
- Root element: `"parent": "0"`
- IDs: 6 ký tự alphanumeric (vd: `a1b2c3`)
- Thứ tự array = thứ tự render (parent trước, children sau)
- Settings keys lấy **chính xác** từ widget library vừa đọc
- `_cssCustom` syntax: `"%root% { ... }\n%root%:hover { ... }"`

```json
[
  {
    "id": "sec001", "name": "section", "parent": "0",
    "settings": {
      "_padding": {"top": "80px", "bottom": "80px", "left": "0px", "right": "0px"}
    }
  },
  {
    "id": "ctn001", "name": "container", "parent": "sec001",
    "settings": { "_maxWidth": "1200px", "_direction": "row", "_columnGap": "24px" }
  }
]
```

### Bước 3.B — Tạo template & Push elements

```
[1] mcp_bricks-mcp_template(action: "create", type: "section",
      title: "[slug]-[ten-section]", status: "publish")
    → Lưu template_id

[2] mcp_bricks-mcp_content(action: "update_content",
      post_id: [template_id], elements: [...])
```

### Bước 3.C — Restore Tree Structure

> 🚨 **GOTCHA — Parent Flatten:** `update_content` **luôn reset TẤT CẢ `parent` về `0`** sau mỗi lần push. BẮT BUỘC restore parent-child bằng `move`.

**3 bước bắt buộc:**

**D1 — Lấy IDs thực tế:**
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
```

**D2 — Lập move list (thứ tự ngoài → trong):**
```
1. [row-id]      → parent: [section-id],  position: 0
2. [col-left]    → parent: [row-id],       position: 0
3. [col-right]   → parent: [row-id],       position: 1
4. [heading]     → parent: [col-left],     position: 0
...
```

**D3 — Execute moves tuần tự:**
```
mcp_bricks-mcp_content(action: "move", post_id: [id],
  element_id: "[id]", target_parent_id: "[parent]", position: N)
```

**Verify:**
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
→ Chỉ 1 element ở depth:0 (section root) → ✅ Tree OK
→ Nhiều elements ở depth:0 → ❌ Còn flat, tiếp tục move
```

> `view: "summary"` → kiểm tra tree structure | `view: "detail"` → kiểm tra settings từng element

**Nếu settings bị mất sau move:**
```
mcp_bricks-mcp_content(action: "bulk_update", post_id: [template_id],
  updates: [{ "element_id": "[id]", "settings": { "stale_key": null, "_cssCustom": "..." } }])
```

### Bước 3.D — Báo cáo user & CHỜ XÁC NHẬN

```
✅ Section [N]: "[Tên section]" đã build xong!
🔗 Editor: [site_url]/wp-admin/post.php?post=[template_id]&action=bricks
📋 Template: [slug]-[ten-section] (ID: [template_id])

⚠️ Kiểm tra: Layout | Typography & spacing | Images | Hover/interaction

👉 "ok" → tiếp tục Section [N+1] | "fix [mô tả]" → chỉnh sửa trước khi tiếp
```

> **AI DỪNG và CHỜ.** Không tự động sang section tiếp theo.

---

## GIAI ĐOẠN 4: Hoàn thành — Ghi file Note

Sau khi **tất cả sections được user xác nhận**, ghi:

`.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Plan:** `.agents/plans/[slug].md`
**Site:** [site_url] | Bricks [version] | **Ngày:** [YYYY-MM-DD]

## Templates
| # | Section | Template ID | Edit URL | Status |
|---|---------|-------------|----------|--------|
| 1 | [slug]-hero | [id] | [url] | ✅ Approved |

## Images
| Tên | Cách | URL đang dùng |
|-----|------|--------------|
| hero-bg | Cách 1 | `localhost:3845/assets/[hash].png` |
```

Báo cáo cuối:
```
🎉 Hoàn thành! Đã build [N] sections cho "[Tên Page]"
Chạy /restore-bricks-template để review tổng thể.
```

---

## Tóm tắt flow

```
Đọc plan → Đọc widget library → Chuẩn bị images
    ↓
[Mỗi section]
  Pre-build checklist → Build JSON → Create template → Push → Restore tree → Verify → Báo user → CHỜ
    ↓ (user ok)
[Section tiếp theo...]
    ↓ (tất cả ok)
Ghi note → Done
```
