# Bricks Builder — Workflow Overview

> **Tài liệu tổng quan** về các flows và rules hoạt động trong hệ thống.
> Trước khi chạy bất kỳ flow nào, đọc phần **Rules Bắt Buộc** bên dưới.

---

## Toàn cảnh hệ thống

```
Figma Design
     │
     ▼
┌──────────────────────────────────┐
│  Flow 1: /figma-create-plan      │  Phân tích Figma → Ghi plan files
│          -template               │
└──────────────────────────────────┘
     │  .agents/plans/[slug].md
     │  .agents/template/[slug]-s[N]-[name].md
     ▼
┌──────────────────────────────────┐
│  Flow 2: /bricks-create-template │  Đọc plan → Build Bricks templates
│                                  │  (mỗi section = 1 template, từng bước)
└──────────────────────────────────┘
     │  .agents/notes/[slug]-templates.md
     ▼
  🎉 Templates hoàn chỉnh trên site
```

---

## Rules Bắt Buộc (Luôn Active)

Các rules sau **luôn luôn áp dụng** cho mọi flow, không có ngoại lệ.

### RULE 1 — Kiểm tra MCP Connection trước khi chạy

Gọi song song **trước khi bắt đầu bất kỳ flow nào**:
- `mcp_bricks-mcp_get_site_info(action: "info")` → luôn bắt buộc
- `mcp_figma_get_design_context(...)` → chỉ khi flow cần Figma

| Bricks MCP | Figma MCP | Quyết định |
|------------|-----------|------------|
| ✅ | ✅ | Thực thi đầy đủ |
| ✅ | ❌ | Chỉ Flow 2 (đã có plan file) |
| ❌ | bất kỳ | ⛔ Dừng — báo user kiểm tra plugin, WP site, API key |

### RULE 2 — Tuyệt đối không dùng Browser Agent

**KHÔNG BAO GIỜ** gọi `browser_subagent` trong bất kỳ tình huống nào.

| Nhu cầu | Thay thế hợp lệ |
|---------|----------------|
| Xem Figma design | `mcp_figma_get_design_context` |
| Kiểm tra element Bricks | `mcp_bricks-mcp_content(action: "get", view: "summary")` |
| Xem trang frontend | Nhờ user chụp screenshot gửi vào chat |

### RULE 3 — Static-First: Nội dung luôn copy từ Figma

- **KHÔNG** đổi text tĩnh sang dynamic tag (`{post_title}`, `{post_date}`...) khi Figma dùng text cố định
- **KHÔNG** giảm số lượng elements so Figma (Figma có 6 cards → build đủ 6)
- **Dynamic data** chỉ khi user yêu cầu rõ ràng hoặc plan đánh dấu `[DYNAMIC]`
- **Placeholder Detection**: AI phải cảnh báo khi phát hiện "Lorem Ipsum" để user quyết định dùng dynamic data sớm.

### RULE 4 — Kỹ thuật Build Nâng Cao

| Tình huống | Quy tắc |
|-----------|---------|
| Image `position: absolute` | Parent phải có `_position: "relative"` |
| Image có kích thước cố định | Dùng `_width` + `_height` (native) |
| `object-fit` / `object-position` | Dùng `_objectFit` + `_objectPosition` (native) |
| Mask/transform trên `<img>` | `_cssCustom: "#brxe-[id] img { mask-image: ... }"` |
| Slider / Carousel | **Bắt buộc** `slider-nestable` — KHÔNG dùng block giả |
| Tabs | **Bắt buộc** `tabs-nestable` — KHÔNG dùng block ẩn/hiện |
| CSS phức tạp (gradient, inset shadow) | Ghi vào `_cssCustom` của chính element đó |

### RULE 5 — CSS Native Keys trước, `_cssCustom` sau

**Native keys phổ biến:**

| CSS Property | Native Key | Ví dụ |
|-------------|------------|-------|
| `width / height` | `_width`, `_height` | `"480px"`, `"100%"` |
| `min/max-width` | `_widthMin`, `_widthMax` | `"1200px"` |
| `padding / margin` | `_padding`, `_margin` | `{top, bottom, left, right}` |
| `display` | `_display` | `"flex"`, `"grid"`, `"block"` |
| `flex-direction` | `_direction` | `"row"`, `"column"` |
| `align-items` | `_alignItems` | `"center"`, `"flex-start"` |
| `justify-content` | `_justifyContent` | `"space-between"`, `"center"` |
| `gap` | `_rowGap`, `_columnGap` | `"24px"` |
| `flex-grow / shrink` | `_flexGrow`, `_flexShrink` | `"1"`, `"0"` |
| `position` | `_position` | `"relative"`, `"absolute"` |
| `top/right/bottom/left` | `_top`, `_right`, `_bottom`, `_left` | `"0px"` |
| `z-index` | `_zIndex` | `1`, `10`, `-1` |
| `overflow` | `_overflow` | `"hidden"`, `"auto"` |
| `object-fit` | `_objectFit` | `"cover"`, `"contain"` |
| `background-color` | `_background` | `{color: {hex: "#fff"}}` |
| `border` | `_border` | `{width, style, color, radius}` |

**`_cssCustom` — chỉ khi native không có:**

| CSS cần | Pattern (BẮT BUỘC dùng `#brxe-[id]`, KHÔNG dùng `%root%` qua API) |
|---------|-------------------------------------------------------------------|
| Gradient background | `"#brxe-[id]{ background: linear-gradient(...) }"` |
| Inset shadow | `"#brxe-[id]{ box-shadow: inset 0 0 24px rgba(...) }"` |
| Grid columns | `"#brxe-[id]{ grid-template-columns: repeat(3,1fr) }"` |
| `:hover` | `"#brxe-[id]:hover{ transform: translateY(-4px) }"` |
| `::before/::after` | `"#brxe-[id]::before{ content: ''; ... }"` |
| Mask trên `<img>` | `"#brxe-[id] img{ -webkit-mask-image: url(...) }"` |

> ⚠️ `%root%` chỉ hoạt động trong Bricks editor UI, **không hoạt động qua API**. Luôn dùng `#brxe-[id]`.

### RULE 6 — `flex-shrink: 0` cho fixed-size elements trong flex row

Mọi element có `_width` + `_height` cố định nằm trong flex row → **BẮT BUỘC bổ sung `_flexShrink: "0"`**.
Thiếu → flex container co bóp → kích thước thực nhỏ hơn giá trị set.

Áp dụng với: icon, avatar, badge, logo, thumbnail cố định kích thước.

### RULE 7 — Không tự đoán CSS — lấy exact từ Figma

Với gradient, box-shadow, border-radius phức tạp, hex color → **BẮT BUỘC** tra cứu từ `mcp_figma_get_design_context`, không tự đoán.

### RULE 8 — Element ID: 6-8 ký tự `[a-z0-9]`, không trùng

- Format: 6-8 ký tự `[a-z0-9]` — ví dụ: `s4hd10`, `s15bg20`, `s6cd345`
- Root element: `"parent": 0` (integer, không phải string)
- Children: mảng IDs con trực tiếp — khớp 2 chiều với `parent`
- Validate: `id.length >= 6 && id.length <= 8` và `/^[a-z0-9]+$/.test(id)`

### RULE 9 — Build TỪNG section, DỪNG chờ user

**Mỗi section = 1 vòng:** Build → Push → Verify → Báo user → **CHỜ xác nhận** → Tiếp theo.

> ⛔ `"ok tiếp tục"` = chỉ build **1** section tiếp theo, KHÔNG build hết các sections còn lại.

### RULE 10 — Responsive là ON-DEMAND, không tự thêm

**Mặc định:** Build desktop-only — không thêm bất kỳ breakpoint key nào vào settings.

**Khi nào dùng composite key (`_padding:tablet_portrait`...):**
- User yêu cầu rõ trong lệnh: *"build responsive cho mobile"*, *"thêm breakpoint tablet"*
- Plan file đánh dấu section `[RESPONSIVE]`

**Khi được yêu cầu:**
1. Gọi `mcp_bricks-mcp_bricks(action: "get_breakpoints")` để lấy breakpoint keys chính xác của site
2. Chỉ ghi breakpoint key khi giá trị **khác với desktop** — không lặp lại giá trị giống
3. `_cssCustom` responsive → Dùng composite key (ví dụ: `_cssCustom:mobile_portrait`), **TUYỆT ĐỐI KHÔNG** viết `@media` thủ công bên trong string.

✅ User: "build responsive, thu nhỏ padding trên mobile portrait"
   → Thêm "_padding:mobile_portrait": {...}

❌ Tự thêm "_padding:tablet_portrait" khi không được yêu cầu

---

## Flow 1 — Phân tích Figma & Tạo Plan

**Lệnh:** `/figma-create-plan-template`
**Workflow file:** `.agents/workflows/figma-create-plan-template.md`
**Input:** Figma URL / node-id + tên slug
**Output:** `.agents/plans/[slug].md` + `.agents/template/[prefix]-s[N]-[name].md`

### Tóm tắt các bước:

```
PHASE A:
  A1: [Song song] get_design_context + get_screenshot + get_site_info
  A2: Trích xuất tổng quan (tên trang, viewport, sections, design variables, images)
  A3: Đọc Widget Library (widgets/README.md + các widget cần dùng)
  A4: Đánh giá từng section (complexity, slider/tab, placeholder discovery, SHIFT-LEFT Responsive evaluation)
       → Luôn đánh giá mobile node trước khi chốt HTML structure cho desktop.
       → Tham khảo: .agents/components/figma-section-analysis.md
  A5: Báo cáo chat → DỪNG chờ user review
  A6: Ghi .agents/plans/[slug].md (không chờ user)
       → Template: .agents/components/output-file-templates.md

[USER ACTION]: Review plan file, điền Status từng section (ok / note)

PHASE B:
  B0: Đọc plan đã confirm → thu thập Status + Q&A
  B1: Ghi từng section file theo thứ tự S1→SN
       → Template: .agents/components/output-file-templates.md
       → Bỏ qua section [SKIP]
  B2: Báo cáo hoàn thành → sẵn sàng cho /bricks-create-template
```

### Tài liệu tham khảo:
| Cần | Đọc |
|-----|-----|
| Đánh giá section | `.agents/components/figma-section-analysis.md` |
| Template plan file + section file | `.agents/components/output-file-templates.md` |
| Ví dụ Settings JSON | `.agents/references/widget-map-examples.md` |

---

## Flow 2 — Build Bricks Templates

**Lệnh:** `/bricks-create-template`
**Workflow file:** `.agents/workflows/bricks-create-template.md`
**Input:** `.agents/plans/[slug].md` + các section files trong `.agents/template/`
**Output:** N Bricks templates trên site + `.agents/notes/[slug]-templates.md`

### Quy tắc cứng của Layout Engine:

```
section → container → block → [widgets]
```

- `container` là con trực tiếp duy nhất của `section`
- `block` **KHÔNG** là con trực tiếp của `section`
- Không dùng `html` widget cho layout

### Tóm tắt các bước:

```
GĐOẠN 1 — Đọc & Chuẩn bị:
  1.1: Đọc plan → danh sách sections, thứ tự build [SIMPLE→MEDIUM→COMPLEX]
  1.2: Đọc Widget Library (widgets/README.md + widget cần dùng)

GĐOẠN 2 — Chuẩn bị Images:
  Cách 1 (ưu tiên): {"id": 0, "url": "http://localhost:3845/assets/[hash].png"}
  Cách 2 (fallback): Download → báo user upload → nhận WP URL

GĐOẠN 3 — Build từng Section (tuần tự, RULE 9):
  [Mỗi section] Đọc .agents/template/[prefix]-s[N]-[name].md
    A: Checklist + vẽ Element Tree (nếu >10 elements)
         → Tham khảo: .agents/components/prebuild-checklist.md
    B: Build JSON (Native Flat Format)
         → settings: copy từ section file
         → _cssCustom: dùng "#brxe-[id]{...}" KHÔNG dùng %root%
    C: Push & Verify
         create template → update_content → get summary (depth:0 = section)
         → Ghi lại actual IDs sau verify
    D: Báo user → CHỜ xác nhận ("ok [section]" hoặc "fix [mô tả]")

GĐOẠN 4 — Ghi Note file:
  .agents/notes/[slug]-templates.md
  (bảng: #, Section, File, Template ID, Edit URL, Status)
```

### Native Flat Format bắt buộc:

```json
[
  {"id":"secabc", "name":"section", "parent":0, "children":["blkinn"], "settings":{...}},
  {"id":"blkinn", "name":"block",   "parent":"secabc", "children":["hdgttl"], "settings":{...}},
  {"id":"hdgttl", "name":"heading", "parent":"blkinn", "children":[], "settings":{...}}
]
```

### Debug khi tree sai:
```
□ Root "parent": 0 (integer)?
□ Mỗi element có đủ id + parent + children?
□ children ↔ parent khớp 2 chiều?
□ ID đúng 6 ký tự [a-z0-9]?
```

### Lưu ý cuối session có `_cssCustom`:
> Bricks `cssLoading: "file"` → `_cssCustom` **KHÔNG** tự render sau API update.
> Bắt buộc: Mở template trong Bricks editor → **Ctrl+S** → đóng (không click element trước khi Save).

### Tài liệu tham khảo:
| Cần | Đọc |
|-----|-----|
| Checklist trước mỗi section | `.agents/components/prebuild-checklist.md` |
| Ví dụ JSON đầy đủ | `.agents/references/widget-map-examples.md` |
| Settings keys từng widget | `widgets/[tên].md` |

---

## Cấu trúc thư mục

```
.agents/
├── WORKFLOWS.md                    ← File này — tổng quan + rules
├── workflows/                      ← Workflow steps chi tiết (AI đọc khi chạy)
│   ├── figma-create-plan-template.md
│   └── bricks-create-template.md
├── components/                     ← Tái sử dụng trong workflows
│   ├── figma-section-analysis.md   ← Hướng dẫn đánh giá complexity section
│   ├── output-file-templates.md    ← Template cho plan file + section file
│   └── prebuild-checklist.md       ← Checklist trước khi build section
├── references/                     ← Data tra cứu (tĩnh)
│   ├── plan-output-template.md     ← Cấu trúc đầy đủ plan file
│   └── widget-map-examples.md      ← Ví dụ Settings JSON theo widget
├── plans/                          ← Output Flow 1 (overview)
│   └── [slug].md
├── template/                       ← Output Flow 1 (section files)
│   └── [slug]-s[N]-[name].md
├── notes/                          ← Output Flow 2
│   └── [slug]-templates.md
└── audit/                          ← Output kiểm tra thủ công
    └── [slug]-result.md
```

---

## Khi nào bỏ qua flow nào

| Tình huống | Bỏ qua |
|-----------|--------|
| Design đã phân tích, plan file đã có | Flow 1 |
| Section `[SKIP]` trong plan | Section đó trong Flow 2 |
| Figma MCP không khả dụng | Flow 1 (không thể chạy) |
| Chỉ build template đơn, không cần assemble vào page | Tạo template là xong — không cần thêm bước |

---

## Nhanh — Checklist đầu session

```
□ Bricks MCP: mcp_bricks-mcp_get_site_info(action: "info") → ✅?
□ Figma MCP (nếu Flow 1): mcp_figma_get_design_context(...) → ✅?
□ Đọc workflow file tương ứng trước khi bắt đầu
□ Đọc Widget Library: widgets/README.md
□ Rule 9: Build 1 section → dừng → chờ user
```
