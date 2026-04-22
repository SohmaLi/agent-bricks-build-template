# Bricks Builder — Workflow Overview

> Tài liệu này mô tả cách 4 flows hoạt động và kết nối với nhau.
> Chạy flows **theo thứ tự**: Flow 1 → Flow 2 → Flow 3 → Assemble.

---

## Toàn cảnh hệ thống

```
Figma Design
     │
     ▼
┌─────────────────────────────┐
│  Flow 1: /figma-create-plan │  Phân tích Figma → Ghi plan file
└─────────────────────────────┘
     │ .agents/plans/[slug].md
     ▼
┌─────────────────────────────┐
│  Flow 2: /bricks-create-    │  Đọc plan → Build Bricks templates
│          template           │  (mỗi section = 1 template)
└─────────────────────────────┘
     │ .agents/notes/[slug]-templates.md
     ▼
┌─────────────────────────────┐
│  Flow 3: /restore-bricks-   │  Audit templates → Fix lỗi
│          template           │
└─────────────────────────────┘
     │ (nếu cần gắn vào page)
     ▼
┌─────────────────────────────┐
│  [OPTIONAL] /bricks-assemble│  Gắn templates vào page theo thứ tự
│  -template                  │  Bỏ qua nếu chỉ build section template
└─────────────────────────────┘
     │
     ▼
  🎉 Templates hoàn chỉnh / Page hoàn chỉnh trên site
```


---

## Flow 1 — Phân tích Figma & Tạo Plan

**Lệnh:** `/figma-create-plan-template`
**Input:** Figma URL / node-id + tên slug
**Output:** `.agents/plans/[slug].md`

### Làm gì:
1. Gọi Figma MCP lấy design context + screenshot + site info (song song)
2. Đọc Widget Library để biết settings keys chính xác
3. Với mỗi section: đánh giá complexity, validate CSS (native trước), tổng hợp Settings JSON
4. Ghi plan file theo template chuẩn

### File plan chứa gì:
```
Section 1: Layout description + Bricks Widget Map
  └── Widget Map: Element | Widget | Settings JSON (valid JSON)
Section 2: ...
Design Variables: Colors, Typography, Spacing
Widget list: Tổng hợp widgets cần dùng
Image list: URLs + chiến lược
Pre-build Checklist: Flow 2 check trước khi build
```

### Tài liệu tham khảo khi chạy:
| Cần | Đọc |
|-----|-----|
| CSS native keys | `rule-template-bricks.md` Rule 5 |
| Cấu trúc plan output | `.agents/references/plan-output-template.md` |
| Ví dụ Settings JSON | `.agents/references/widget-map-examples.md` |

---

## Flow 2 — Build Bricks Templates

**Lệnh:** `/bricks-create-template`
**Input:** `.agents/plans/[slug].md`
**Output:** N Bricks templates trên site + `.agents/notes/[slug]-templates.md`

### Làm gì:
Với mỗi section trong plan (thứ tự SIMPLE → COMPLEX):

**Sub-bước A — Vẽ cây text**
> Chỉ với section > 10 elements. Xác định depth, count, số lặp trước khi code.

**Sub-bước B — Build JSON (Native Flat Format)**
> Đọc Settings JSON từ Widget Map trong plan → tổ chức thành array với đủ `id + parent + children`
> Plugin nhận format đúng sẽ giữ nguyên cây — không cần restore.

```json
[
  {"id":"secabc","name":"section","parent":0,"children":["blkinn"],"settings":{...}},
  {"id":"blkinn","name":"block","parent":"secabc","children":["hdgttl"],"settings":{...}},
  {"id":"hdgttl","name":"heading","parent":"blkinn","children":[],"settings":{...}}
]
```

**Sub-bước C — Push & Verify**
```
Create template → Push 1 lần → get summary → depth:0 chỉ có section → ✅
```

### Tài liệu tham khảo khi chạy:
| Cần | Đọc |
|-----|-----|
| CSS native keys | `rule-template-bricks.md` Rule 5 |
| Ví dụ JSON đầy đủ | `.agents/references/widget-map-examples.md` |
| Settings keys từng widget | `widgets/[tên].md` |

---

## Flow 3 — Audit Templates

**Lệnh:** `/restore-bricks-template`
**Input:** `.agents/plans/[slug].md` + `.agents/notes/[slug]-templates.md`
**Output:** `.agents/audit/[slug]-result.md`

### Làm gì:

**Tầng 1 — Quick Audit** *(luôn chạy)*
- Tree structure: Chỉ section ở depth:0?
- Element count: Đủ số so plan?
- Image URL: Không rỗng / sai?

**Tầng 2 — Deep Audit** *(theo yêu cầu user)*
- CSS Pattern: `_cssCustom` dùng đúng chỗ?
- Design Tokens: Màu/font khớp plan?

**Fix Priority Matrix:**
| Loại | Ưu tiên | Fix |
|------|---------|-----|
| Tree flat | 🔴 Critical | `move` ngay |
| Image URL rỗng | 🔴 Critical | Báo user |
| Missing element | 🔴 Critical | Rebuild (Flow 2) |
| `_cssCustom` sai native | 🟡 Medium | `bulk_update` |
| Sai màu/font token | 🟡 Medium | `bulk_update` |

---

## Micro-flow — Page Assembly

**Lệnh:** `/bricks-assemble-template`
**Input:** `.agents/plans/[slug].md` + `.agents/notes/[slug]-templates.md`

### Điều kiện chạy:
- Tất cả sections `✅ Approved` trong Note file
- Flow 3 audit `✅ PASS` hoặc user xác nhận bỏ qua

### Làm gì:
1. Xác định thứ tự sections từ plan
2. Tạo / xác định page trên site
3. Enable Bricks editor
4. Cung cấp danh sách template IDs theo thứ tự → user insert thủ công trong editor
5. Checklist frontend

> ⚠️ Bricks không hỗ trợ insert template qua API — user thực hiện bước 4 thủ công.

---

## Cấu trúc thư mục

```
.agents/
├── WORKFLOWS.md                    ← File này — tổng quan
├── workflows/                      ← Process steps (ngắn, AI đọc khi chạy)
│   ├── figma-create-plan-template.md
│   ├── bricks-create-template.md
│   ├── restore-bricks-template.md
│   └── bricks-assemble-template.md
├── references/                     ← Data/template (đọc khi cần tra cứu)
│   ├── plan-output-template.md     ← Cấu trúc đầy đủ file plan
│   └── widget-map-examples.md      ← Ví dụ Settings JSON theo widget
├── plans/                          ← Output Flow 1
│   └── [slug].md
├── notes/                          ← Output Flow 2
│   └── [slug]-templates.md
├── audit/                          ← Output Flow 3
│   └── [slug]-result.md
└── rules/
    └── rule-template-bricks.md     ← Rules cứng (luôn active qua user rules)
```

---

## Khi nào bỏ qua flow nào

| Tình huống | Bỏ qua |
|-----------|--------|
| Design đã phân tích, plan đã có | Flow 1 |
| Muốn audit ngay sau build | Bỏ qua Flow 3 nếu section SIMPLE + user đã xác nhận |
| Không cần assemble vào page (chỉ build template đơn) | Bỏ qua Assemble |
| Section toàn SIMPLE, không `_cssCustom` | Flow 3 Tầng 2 |
