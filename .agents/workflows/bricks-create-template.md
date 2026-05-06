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
| Slider / Tab | `slider-nested` / `tabs-nested` | Block giả slider |
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

### Bước 1.3 — Nhận diện section phức tạp (BẮT BUỘC)

Sau khi đọc section files, với **MỖI section** có bất kỳ dấu hiệu nào dưới đây:

| Dấu hiệu | Hành động |
|----------|----------|
| Section chứa `slider-nested` | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 2 (PATTERN A/B) |
| Section chứa `tabs-nested` | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 2 (PATTERN C) |
| Section dự kiến depth > 5 | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 5 (Depth Worksheet) |
| Section có tabs + slider lồng nhau | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 2 (PATTERN C) + PHẦN 3 |
| Section có > 50 elements | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 6 (Build Order) |
| Banner với background images | Đọc `.agents/references/complex-template-reasoning.md` — PHẦN 2 (PATTERN D) |

> **Nếu không có dấu hiệu nào:** Bỏ qua bước này, tiếp tục bình thường.

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

### Sub-bước A.0 — Figma Spot-Check + Screenshot (BẮT BUỘC trước khi viết JSON)

> **Mục đích:** Verify exact values và lưu visual reference trước khi viết bất kỳ JSON nào.
> **Không được bỏ qua** — nếu Figma MCP không available, dừng và báo user.

```
[0] mcp_figma_get_screenshot(desktop_node_id)  → Xem visual reference trong session (không cần lưu)

[1] mcp_figma_get_design_context(desktop_node_id) → Verify:
    □ Exact px values: padding, gap, font-size, icon size, border-radius
    □ align-items, flex-direction per element (copy exact, không tự đổi)
    □ Colors: hex code exact (không estimate)
    □ Image URLs từ localhost:3845/assets/

[2] mcp_figma_get_design_context(mobile_node_id) → Verify:
    □ Values thay đổi so desktop: padding, gap, font-size
    □ Element absent trên mobile? → flag _display:mobile_portrait: none
    □ Block flex-row có bị wrap? → flag [G2-RISK] → _cssCustom: flex-wrap: nowrap
```

**Output bắt buộc:** Tạo bảng quick-reference trước khi build:
```
Element    | Desktop           | Mobile
s1tg08     | 18px/600/30px     | 16px
s1h110     | 44px/700/56px     | 28px/800/40px
s1f114     | center/8px [G2]   | same [G2 apply]
s1ic15     | 24×24px            | 20×20px
s1mq30     | visible           | [ABSENT]
```

### Sub-bước A.1 — Checklist & Element Tree

> **Đọc component:** `.agents/components/prebuild-checklist.md` (bao gồm Gotchas G1–G4)

Vẽ Element Tree **BẮT BUỘC** trước khi build (mọi section, kể cả section nhỏ):
```
Section                               ← depth 0
└── Block inner (flex col, gap:40px)  ← depth 1
    ├── Block header (flex row)       ← depth 2
    └── Block grid (3 cols)           ← depth 2
```

**Khi vẽ tree cho section có slider/tabs, áp dụng quy tắc từ complex-template-reasoning.md:**
- Slide item LUÔN có block wrapper trước content
- Tab nav item trong slider dùng `div` (không phải `block`)
- Tính depth bằng worksheet (PHẦN 5) trước khi build
- Anti-patterns (PHẦN 4): kiểm tra 5 lỗi phổ biến trước khi push

### Sub-bước B — Build JSON (Native Flat Format)

> Settings JSON: Copy từ **quick-reference table (Sub-bước A.0)**. Native keys trước, `_cssCustom` khi không có native.
> ❗ **Nếu value không có trong quick-reference → DừNG → gọi `mcp_figma_get_design_context`, KHÔNG tự điền.**
> `_cssCustom` format: `"#brxe-[element-id]{"` khi push API. Sau Ctrl+S, Bricks tự convert về `%root%`.
> Với mask/phức tạp: xem `.agents/components/common-patterns.md`.

**Responsive (RULE 10 — chỉ khi được yêu cầu):**

| Tình huống | Hành động |
|-----------|-----------|
| Không có lệnh responsive | Build desktop-only, không thêm breakpoint key |
| User yêu cầu rõ / plan có `[RESPONSIVE]` | Gọi `get_breakpoints` → dùng composite key `_prop:breakpoint` |
| `_cssCustom` cần responsive | Dùng **`_cssCustom:mobile_portrait`** làm key riêng — KHÔNG viết `@media` thủ công trong string |

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

⚠️ Nếu có `_cssCustom`: nhớ Ctrl+S trong Bricks editor trước khi so sánh.
✔️ So sánh với Figma: mở link Figma — Layout | Spacing | Colors | Images | Text content
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
Nhận diện section phức tạp? → Đọc complex-template-reasoning.md (Bước 1.3)
  ↓
[Mỗi section]
  A.0: Figma Spot-Check (desktop + mobile node) → Quick-reference table
  A.1: Checklist + Gotchas G1–G4
       ↳ slider/tabs? → Verify anti-patterns (PHẦN 4 trong complex-template-reasoning.md)
       ↳ Tính depth bằng Worksheet (PHẦN 5) trước khi code
  B:   Build JSON (từ quick-reference, không assumption)
  C:   Push → Verify → Capture actual IDs
  Báo user → CHỜ confirm
  ↓ (ok)
Ghi note → Done
```
