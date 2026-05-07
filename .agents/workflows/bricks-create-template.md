---
description: Doc file plan tu figma-create-plan-template va tao Bricks templates cho tung section. Moi section = 1 template trong Bricks. Build tung section mot, bao user xem lai truoc khi tiep tuc.
---

# Workflow: Bricks Create Template

## Input
- Section file: `.agents/template/[prefix]-s[N]-[name].md`

## Output
- 1 Bricks template trên site (1 section = 1 template)
- Note file: `.agents/notes/[slug]-templates.md`

---

## ⚠️ Quy tắc TUYỆT ĐỐI

| Rule | ✅ Đúng | ❌ Sai |
|------|--------|--------|
| Layout engine | `section → block → [widgets]` | `container` cấp 2+, `html` cho layout |
| Direct child của section | `block` (bg-card wrapper) hoặc `container` | Không có gì, hoặc nhét widget thẳng vào section |
| Settings keys | **Đọc từ `widgets/[widget].md` TRƯỚC** | Tự đặt key từ trí nhớ |
| `_borderRadius` | ❌ KHÔNG TỒN TẠI | Phải dùng `_border: {radius: {top, right, bottom, left}}` |
| `_gap` | ❌ KHÔNG TỒN TẠI | Phải dùng `_columnGap` và/hoặc `_rowGap` |
| `_flexDirection` | ❌ (block/container dùng `_direction`) | Chỉ dùng cho `_cssCustom` raw |
| `_flexWrap` | ✅ native key tồn tại | Không cần `_cssCustom` cho wrap |
| CSS ưu tiên | Native key trước, `_cssCustom` khi không có native | `_cssCustom` cho mọi thứ |
| Slider / Tab | `slider-nested` / `tabs-nested` | Block giả slider |
| Image URL | `{"id":0,"url":"localhost:3845/..."}` | `src: ""` rỗng |
| `parent` root | `"parent": 0` (integer) | `"parent": "0"` hay `""` |
| `children` | Mảng IDs con trực tiếp, khớp 2 chiều | Bỏ trống / bỏ qua |

---

## GIAI ĐOẠN 1: Đọc Widget Docs (BẮT BUỘC — TRƯỚC KHI VIẾT JSON)

> ❌ **Lỗi phổ biến nhất:** Bỏ qua bước này → dùng key sai → section build ra sai 100%.

### Bước 1.1 — Đọc section file
```
view_file: .agents/template/[prefix]-s[N]-[name].md
→ Liệt kê TỪNG widget type sẽ dùng
```

### Bước 1.2 — Đọc widget docs [SONG SONG] cho tất cả widget trong section

```
[Song song]
view_file: widgets/layout-block.md       ← nếu section dùng block
view_file: widgets/layout-container.md   ← nếu section dùng container
view_file: widgets/basic-text-basic.md   ← nếu section dùng text-basic
view_file: widgets/basic-image.md        ← nếu section dùng image
view_file: widgets/basic-button.md       ← nếu section dùng button
view_file: widgets/basic-heading.md      ← nếu section dùng heading
... (các widget khác tương tự)
```

> ✅ Đọc README.md nếu chưa rõ tên file widget nào cần đọc.

### Bước 1.3 — Tạo KEY VALIDATION TABLE (BẮT BUỘC trước khi viết JSON)

Sau khi đọc widget docs, tạo bảng này trong chat:

```
WIDGET KEY TABLE — Verified từ widget docs
===========================================
Widget    | Key cần dùng          | Source file            | ✅/❌
----------|----------------------|------------------------|------
block     | _direction: "column" | layout-container.md    | ✅
block     | _rowGap: "24px"      | layout-container.md    | ✅
block     | _border: {radius:{}} | layout-container.md    | ✅ (KHÔNG phải _borderRadius)
block     | _flexWrap: "nowrap"  | layout-container.md    | ✅ (KHÔNG cần _cssCustom)
button    | _border: {radius:{}} | basic-button.md        | ✅
image     | image: {id:0, url:}  | basic-image.md         | ✅
text-basic| text: "..."          | basic-text-basic.md    | ✅
```

> ⚠️ Bảng này là **checkpoint bắt buộc** — KHÔNG được viết JSON nếu chưa có bảng này.

### Bước 1.4 — Slider/Tab phức tạp

Với mỗi section có `slider-nested` / `tabs-nested`:
```
view_file: .agents/references/complex-template-reasoning.md
```

---

## GIAI ĐOẠN 2: Build từng Section

> Đọc section file → Tạo Key Validation Table → MỚI viết JSON

### Sub-bước A — Build JSON (Native Flat Format)

**Nguyên tắc viết JSON:**
1. **Mỗi key** → kiểm tra trong Key Validation Table trước khi dùng
2. **Không có trong table** → tra lại widget doc, KHÔNG tự đoán
3. `_cssCustom` chỉ dùng khi **thực sự không có native key** (mask-image, clip-path, transform phức tạp)
4. `_cssCustom` format khi push API: `"#brxe-[id] { ... }"` (KHÔNG dùng `%root%`)
5. `_cssCustom:mobile_portrait` là key riêng — KHÔNG viết `@media` trong string

**Responsive:**
| Tình huống | Hành động |
|-----------|-----------|
| Section file có responsive values | Thêm breakpoint keys: `_prop:mobile_portrait` |
| Section file KHÔNG đề cập mobile | Build desktop-only |

**Quy tắc ID:**
| Rule | Chi tiết |
|------|---------|
| Format | 6 ký tự `[a-z0-9]` |
| Root parent | `"parent": 0` (integer, KHÔNG phải string) |
| Children leaf | `"children": []` |
| Reciprocal | parent.children ↔ child.parent khớp 2 chiều |

### Sub-bước B — Push & Verify

**B1 — Tạo template:**
```
mcp_bricks-mcp_template(action: "create", type: "section",
  title: "[Test] Template V4 - [Tên Section]", status: "publish")
→ Lưu template_id
```

**B2 — Push:**
```
mcp_bricks-mcp_content(action: "update_content",
  post_id: [template_id], elements: [...])
```

**B3 — Verify tree:**
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
→ Kiểm tra: depth 0 = section, total = đúng số element
→ Nếu sai → debug trước khi báo user
```

**Debug checklist khi tree sai:**
```
□ Root "parent": 0 (integer)?
□ Mỗi element có đủ id + parent + children?
□ children ↔ parent khớp 2 chiều?
□ ID đúng 6 ký tự [a-z0-9]?
□ Key dùng có trong widget doc không?
```

### Sub-bước C — Báo user & CHỜ

```
✅ Section [N]: "[Tên]" xong!
🔗 Edit: [site_url]/wp-admin/post.php?post=[id]&action=bricks

⚠️ Ctrl+S trong Bricks Editor trước khi xem kết quả (có _cssCustom).
👉 "ok" → tiếp | "fix [mô tả]" → chỉnh trước
```

> **AI DỪNG và CHỜ.** ⛔ "ok" ≠ "build hết sections còn lại".

---

## GIAI ĐOẠN 3: Ghi Note file

`.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Ngày:** [YYYY-MM-DD]

| # | Section | File | Template ID | Edit URL | Status |
|---|---------|------|-------------|----------|--------|
| 1 | Hero | s1-hero.md | [id] | [url] | ✅ Approved |
```

---

## ⚠️ Về `_cssCustom` và Ctrl+S

```
Bricks cssLoading: "file" → _cssCustom KHÔNG render sau API update.
Bắt buộc: Mở template → Ctrl+S → đóng.
```

---

## Tóm tắt flow (3 bước thực tế)

```
BƯỚC 1 — Đọc widget docs [SONG SONG]
  view_file: section file
  view_file: widget docs (block, image, button...) — TẤT CẢ cùng lúc
  → Tạo Key Validation Table

BƯỚC 2 — Build & Push
  Viết JSON từ Key Validation Table (không assumption)
  create template → update_content → verify summary

BƯỚC 3 — Báo user
  Link editor + hướng dẫn Ctrl+S → CHỜ confirm
```

---

## Key Reference nhanh (tra cứu offline)

### Các key HAY BỊ SAI nhất:

| ❌ Key sai (từ trí nhớ) | ✅ Key đúng (từ widget doc) | Widget |
|------------------------|---------------------------|--------|
| `_borderRadius: "24px"` | `_border: {radius: {top:"24px", right:"24px", bottom:"24px", left:"24px"}}` | tất cả |
| `_gap: "24px"` | `_columnGap: "24px"` + `_rowGap: "24px"` | container/block |
| `_flexDirection: "column"` | `_direction: "column"` | container/block |
| `_paddingTop: "40px"` | `_padding: {top: "40px"}` | tất cả |
| `_flexWrap` trong `_cssCustom` | `_flexWrap: "nowrap"` (native key) | container/block |
| `image: {url: "..."}` (thiếu id) | `image: {id: 0, url: "..."}` | image |
| `"parent": "0"` (string) | `"parent": 0` (integer) | section root |
