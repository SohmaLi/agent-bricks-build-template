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
| Layout engine | `section → block → [widgets]` | `html` cho layout |
| Settings keys | Đọc từ `widgets/[widget].md` | Tự đặt key từ trí nhớ |
| CSS ưu tiên | Native key trước, `_cssCustom` khi không có native | `_cssCustom` cho mọi thứ |
| Slider / Tab | `slider-nestable` / `tabs-nestable` | Block giả slider |
| Image URL | `{"id":0,"url":"localhost:3845/..."}` | `src: ""` rỗng |
| Nội dung text | Copy y chang từ section file, đủ số lượng | Tự dùng dynamic tag |
| Push format | Native Flat Format (`id+parent+children`) → push 1 lần | Simplified → phải restore |
| `parent` root | `"parent": 0` (integer) | `"parent": "0"` hay `""` |
| `children` | Mảng IDs con trực tiếp, khớp 2 chiều | Bỏ trống / bỏ qua |

> CSS lookup đầy đủ: `rule-template-bricks.md` Rule 5
> Ví dụ Settings JSON: `.agents/references/widget-map-examples.md`

---

## GIAI ĐOẠN 1: Đọc & Chuẩn bị

### Bước 1.1 — Đọc overview plan

Đọc `.agents/plans/[slug].md`, ghi lại:
- Danh sách sections + file tương ứng (bỏ `[SKIP]`)
- Thứ tự build: `[SIMPLE] → [MEDIUM] → [COMPLEX]`
- Bảng widgets cần dùng → đọc widget files

### Bước 1.2 — Đọc Widget Library

```
[1] widgets/README.md
[2] Mỗi widget trong plan → widgets/[tên-file].md
```

> Ghi nhận: settings keys chính xác, kiểu dữ liệu, `_cssCustom` selectors.

---

## GIAI ĐOẠN 2: Chuẩn bị Images

**Cách 1 — Custom URL** *(ưu tiên)*
```json
{"image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"}}
```

**Cách 2 — Upload WP** *(fallback)*: Download về → báo user upload → nhận WP URL.

---

## GIAI ĐOẠN 3: Build từng Section (tuần tự)

> **Trước mỗi section:** Đọc file `.agents/template/[prefix]-s[N]-[name].md` tương ứng.
> Không đọc toàn bộ plan — chỉ đọc section file cần build.

### Sub-bước A — Element Tree Design

> Bắt buộc với section > 10 elements. Dùng Element Tree từ section file nếu đã có.
> Nếu chưa đủ chi tiết, vẽ lại từ section file:

```
Section                               ← depth 0
└── Block inner (flex col, gap:40px)  ← depth 1
    ├── Block header (flex row)       ← depth 2
    │   ├── Heading h2 "Tiêu đề"      ← depth 3
    │   └── Text sub                  ← depth 3
    └── Block grid (3 cols)           ← depth 2
        └── [×6] Block card           ← depth 3
```

Output: Tổng elements N | Depth max D | Số elements lặp

**Pre-build Checklist (đọc từ section file → Behavior & Gotchas):**

| # | Kiểm tra | Hành động |
|---|---------|----------|
| 1 | Số item lặp từ section file | Build đúng số — không bớt |
| 2 | Slider / Tab? | `slider-nestable` / `tabs-nestable` |
| 3 | Image absolute? | Parent: `_position: "relative"` (native) |
| 4 | Gradient / inset shadow? | `_cssCustom` trên chính widget |
| 5 | Image sizing? | `_width` + `_height` (native) |
| 6 | Text content? | Copy y chang từ section file |
| 7 | Gotchas trong section file? | Áp dụng giải pháp đã ghi |

---

### Sub-bước B — Build JSON (Native Flat Format)

> Plugin nhận `id + parent + children` đầy đủ → giữ nguyên cây, không cần restore.
> **Settings JSON:** Copy từ cột `Settings JSON` trong section file — đã là valid JSON.

**Quy tắc ID/parent/children:**

| Rule | Chi tiết |
|------|---------|
| ID format | 6 ký tự `[a-z0-9]` |
| Root parent | `"parent": 0` (integer, không phải `"0"`) |
| Children | Mảng IDs con — leaf: `"children": []` |
| Reciprocal | `parent` của con ↔ `children` của cha phải khớp 2 chiều |

Ví dụ đầy đủ: `.agents/references/widget-map-examples.md` → mục "Native Flat Format"

**CSS inline validation khi viết mỗi element:**
```
□ Có native key? → Dùng native (Rule 5)
□ Không có? → _cssCustom: "%root% { ... }"
□ Target <img>? → _cssCustom: "%root% img { ... }"
```

---

### Sub-bước C — Push & Verify

**C1 — Tạo template:**
```
mcp_bricks-mcp_template(action: "create", type: "section",
  title: "[slug]-[ten-section]", status: "publish")
→ Lưu template_id
```

**C2 — Push 1 lần:**
```
mcp_bricks-mcp_content(action: "update_content",
  post_id: [template_id], elements: [...Native Flat Format...])
```

**C3 — Verify tree:**
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
→ Section ở depth:0 → ✅ Done
→ Còn flat → Debug checklist bên dưới
```

**Debug khi tree sai:**
```
□ Root "parent": 0 (integer)?
□ Mỗi element có đủ id + parent + children?
□ children ↔ parent khớp 2 chiều?
□ ID đúng 6 ký tự [a-z0-9]?
```

---

### Bước 3.D — Báo user & CHỜ XÁC NHẬN

```
✅ Section [N]: "[Tên]" xong!
🔗 [site_url]/wp-admin/post.php?post=[id]&action=bricks
⚠️ Kiểm tra: Layout | Spacing | Images | Text content
👉 "ok" → tiếp tục | "fix [mô tả]" → chỉnh trước
```

> **AI DỪNG và CHỜ.** Không tự động sang section tiếp theo.

---

## GIAI ĐOẠN 4: Ghi Note file

`.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Plan:** `.agents/plans/[slug].md` | **Ngày:** [YYYY-MM-DD]

| # | Section | File | Template ID | Edit URL | Status |
|---|---------|------|-------------|----------|--------|
| 1 | Hero | author-s1-hero.md | [id] | [url] | ✅ Approved |

| Tên ảnh | Cách | URL |
|---------|------|-----|
| hero-bg | Cách 1 | localhost:3845/assets/[hash].png |
```

---

## Tóm tắt flow

```
Đọc overview plan → Đọc widget library → Sắp xếp [SIMPLE→COMPLEX]
     ↓
[Mỗi section]
  Đọc .agents/template/[prefix]-s[N]-[name].md
  A: Xác nhận cây (từ section file, hoặc vẽ lại nếu cần)
  B: Build JSON — Native Flat Format
     (Settings JSON copy từ section file, native keys trước)
  C: Push 1 lần → Verify tree
     → depth:0 chỉ có section → ✅ Done
     → Còn flat → Debug → Fix → Push lại
  Báo user → CHỜ xác nhận
     ↓ (all ok)
Ghi note → Done
```

> 🎯 Mỗi section = đọc 1 file nhỏ + 1 push = done. Không load toàn bộ plan.
