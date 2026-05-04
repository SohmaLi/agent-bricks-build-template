---
description: Doc file plan tu figma-create-plan-template va tao Bricks templates cho tung section. Moi section = 1 template trong Bricks. Build tung section mot, bao user xem lai truoc khi tiep tuc.
---

# Workflow: Bricks Create Template

## Input
- Overview plan: `.agents/plans/[slug].md`
- Section files: `.agents/template/[prefix]-s[N]-[name].md`

## Output
- N Bricks templates trên site (mỗi section = 1 template)
- Note file: `.agents/notes/[slug]-templates.md`

---

## ⚠️ Quy tắc TUYỆT ĐỐI

| Rule | ✅ Đúng | ❌ Sai |
|------|--------|--------|
| Layout engine | `section → container → block → [widgets]` | `html` cho layout, hoặc bỏ `container` |
| Container rule | `container` là con trực tiếp duy nhất của `section` | `block` là con trực tiếp của `section` |
| Settings keys | Đọc từ `widgets/[widget].md` | Tự đặt key từ trí nhớ |
| CSS ưu tiên | Native key trước, `_cssCustom` khi không có native | `_cssCustom` cho mọi thứ |
| Slider / Tab | `slider-nestable` / `tabs-nestable` | Block giả slider |
| Image URL | `{"id":0,"url":"localhost:3845/..."}` | `src: ""` rỗng |
| Nội dung text | Copy y chang từ section file, đủ số lượng | Tự dùng dynamic tag |
| Push format | Native Flat Format (`id+parent+children`) → push 1 lần | Simplified → phải restore |
| `parent` root | `"parent": 0` (integer) | `"parent": "0"` hay `""` |
| `children` | Mảng IDs con trực tiếp, khớp 2 chiều | Bỏ trống / bỏ qua |

> CSS lookup: `rule-build-techniques.md` RULE 5 | Ví dụ JSON: `.agents/references/widget-map-examples.md`

---

## GIAI ĐOẠN 1: Đọc & Chuẩn bị

### Bước 1.1 — Đọc overview plan
Đọc `.agents/plans/[slug].md`, ghi lại:
- Danh sách sections + file tương ứng (bỏ `[SKIP]`)
- Thứ tự build: `[SIMPLE] → [MEDIUM] → [COMPLEX]`

### Bước 1.2 — Đọc Widget Library
```
[1] widgets/README.md
[2] Mỗi widget trong plan → widgets/[tên-file].md
```

---

## GIAI ĐOẠN 2: Chuẩn bị Images

**Cách 1 — Custom URL** *(ưu tiên)*
```json
{"image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"}}
```
**Cách 2 — Upload WP** *(fallback)*: Download → báo user upload → nhận WP URL.

---

## GIAI ĐOẠN 3: Build từng Section (tuần tự)

> Trước mỗi section: Đọc `.agents/template/[prefix]-s[N]-[name].md`

### Sub-bước A — Checklist & Element Tree

> **Đọc component:** `.agents/components/prebuild-checklist.md`

Vẽ Element Tree nếu section > 10 elements (hoặc dùng tree từ section file):
```
Section                               ← depth 0
└── Block inner (flex col, gap:40px)  ← depth 1
    ├── Block header (flex row)       ← depth 2
    └── Block grid (3 cols)           ← depth 2
```

### Sub-bước B — Build JSON (Native Flat Format)

> Settings JSON: Copy từ section file. Native keys trước, `_cssCustom` khi không có native.
> `_cssCustom` format: `"#brxe-[element-id]{"` — KHÔNG dùng `%root%` qua API.

**Responsive (RULE 10 — chỉ khi được yêu cầu):**

| Tình huống | Hành động |
|-----------|-----------|
| Không có lệnh responsive | Build desktop-only, không thêm breakpoint key |
| User yêu cầu rõ / plan có `[RESPONSIVE]` | Gọi `get_breakpoints` → dùng composite key `_prop:breakpoint` |
| `_cssCustom` cần responsive | Viết `@media (max-width: Xpx)` bên trong string |

**Quy tắc ID:**

| Rule | Chi tiết |
|------|---------|
| ID format | 6 ký tự `[a-z0-9]` |
| Root parent | `"parent": 0` (integer) |
| Children | Mảng IDs con — leaf: `"children": []` |
| Reciprocal | parent ↔ children khớp 2 chiều |

### Sub-bước C — Push & Verify

**C1 — Tạo template:**
```
mcp_bricks-mcp_template(action: "create", type: "section",
  title: "[slug]-[ten-section]", status: "publish")
→ Lưu template_id
```
**C2 — Push:**
```
mcp_bricks-mcp_content(action: "update_content",
  post_id: [template_id], elements: [...])
```
**C3 — Verify + Capture actual IDs:**
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
→ depth:0 = section → ✅
→ IDs khác với ta đặt → ghi lại actual IDs, dùng cho mọi bulk_update sau
```

**Debug khi tree sai:**
```
□ Root "parent": 0 (integer)?
□ Mỗi element có đủ id + parent + children?
□ children ↔ parent khớp 2 chiều?
□ ID đúng 6 ký tự [a-z0-9]?
```

### Bước 3.D — Báo user & CHỜ XÁC NHẬN

```
✅ Section [N]: "[Tên]" xong!
🔗 [site_url]/wp-admin/post.php?post=[id]&action=bricks
⚠️ Kiểm tra: Layout | Spacing | Images | Text content
👉 "ok [tên section]" → tiếp | "fix [mô tả]" → chỉnh trước
```

> **AI DỪNG và CHỜ.** Không tự động sang section tiếp theo.
> ⛔ "ok tiếp tục" = chỉ build section tiếp theo, KHÔNG build thêm.

---

## GIAI ĐOẠN 4: Ghi Note file

`.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Plan:** `.agents/plans/[slug].md` | **Ngày:** [YYYY-MM-DD]

| # | Section | File | Template ID | Edit URL | Status |
|---|---------|------|-------------|----------|--------|
| 1 | Hero | s1-hero.md | [id] | [url] | ✅ Approved |
```

---

## ⚠️ Cuối session có `_cssCustom`

```
Bricks cssLoading: "file" → _cssCustom KHÔNG tự render sau API update.
Bắt buộc: Mở template → Ctrl+S → đóng (KHÔNG click element trước khi Save).
```

---

## Tóm tắt flow

```
Đọc plan → Widget library
  ↓
[Mỗi section] Đọc section file
  A: Checklist (.agents/components/prebuild-checklist.md)
  B: Build JSON — Native Flat Format
  C: Push → Verify → Capture actual IDs
  Báo user → CHỜ confirm
  ↓ (ok)
Ghi note → Done
```
