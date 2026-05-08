---
description: Thực thi tạo section theo nodeid được ghi vào plan, tạo section sau đó gán vào template tương ứng đã tạo trước đó.
---

# Workflow: `/bricks-render-section`

> **Mục tiêu:** Đọc node-id từ plan file → extract exact values từ Figma → build JSON → push vào Bricks template đã tạo sẵn (từ `/figma-render-page`) → tự động kích hoạt `/review-render-section`.

---

## Input

- Plan file: `.agents/plans/[slug].md` (đã có Template IDs)
- Section cần build: do user chỉ định (ví dụ: **"build S1"**, **"build S3"**)

---

## Output

- Bricks template `[slug] - S[N] - [Tên]` được populated đầy đủ elements
- Tự động kích hoạt `/review-render-section` sau khi push thành công

---

## ⚠️ Quy tắc TUYỆT ĐỐI

| Rule             | ✅ Đúng                               | ❌ Sai                         |
| ---------------- | ------------------------------------- | ------------------------------ |
| Nội dung         | Copy y chang từ Figma                 | Tự paraphrase, tự đặt text     |
| Số lượng         | Figma có N cards → build đúng N       | Build ít hơn                   |
| Dynamic data     | Chỉ khi plan ghi `[DYNAMIC]`          | Tự convert sang `{post_title}` |
| Widget key       | Đọc từ widget docs TRƯỚC              | Tự nhớ key                     |
| Section order    | DỪNG sau mỗi section, chờ user        | Build hết tất cả 1 lúc         |
| Browser          | KHÔNG dùng `browser_subagent`         | Không ngoại lệ                 |
| Widget hierarchy | `section → container → block → [...]` | `section → block → [...]`      |

> 📚 **Lỗi đã gặp + Pre-push Checklist:** `.agents/references/build-errors.md`

---

## BƯỚC 0 — Đọc Plan File & Kiểm tra Status

```
view_file: .agents/plans/[slug].md
```

Lấy thông tin section [SN]: Desktop Node ID, Mobile Node ID, Template ID, Widget tree, Status.

| Status    | Hành động |
| --------- | --------- |
| `ok`      | ✅ Tiếp tục build |
| `skip`    | ⛔ Báo user → DỪNG |
| `pending` | ⛔ Báo user đổi sang `ok` → DỪNG |
| `done`    | ⚠️ Hỏi confirm rebuild → chờ |

Nếu **Template ID chưa có** → báo user chạy `/figma-render-page` trước. DỪNG.

---

## BƯỚC 1 — Đọc Widget Docs [BẮT BUỘC TRƯỚC KHI VIẾT JSON]

### 1A — Liệt kê widgets từ Widget tree trong plan

### 1B — Tra cứu đường dẫn từ README

```
view_file: widgets/README.md → tìm widget → lấy path chính xác
```

### 1C — Đọc widget docs [SONG SONG]

```
[Song song]
view_file: widgets/shared-styles.md          ← LUÔN đọc
view_file: widgets/[category]/[widget].md    ← mỗi widget trong tree
```

### 1D — Tạo KEY VALIDATION TABLE

```
WIDGET KEY TABLE — Verified từ widget docs
===========================================
Widget     | Key cần dùng           | Source file         | ✅/❌
-----------|------------------------|---------------------|------
section    | _padding               | shared-styles.md    | ✅
container  | _direction, _rowGap... | layout-container.md | ✅
...        | ...                    | ...                 | ...
```

> ⚠️ **KHÔNG viết JSON nếu chưa có bảng này.**

---

## BƯỚC 2 — Extract Exact Values từ Figma [SONG SONG]

```
[Song song]
mcp_figma_get_design_context(desktop_node_id)
mcp_figma_get_design_context(mobile_node_id)
```

### 2A — Flags bắt buộc khi phát hiện

| Flag              | Điều kiện |
| ----------------- | --------- |
| `[G2-RISK]`       | flex-row → kiểm tra `_flexWrap: "nowrap"` |
| `[ABSENT-MOBILE]` | Element không có trên mobile → `_display:mobile_portrait: "none"` |
| `[MASK-IMAGE]`    | Ảnh có mask → dùng `_cssCustom` trên wrapper block |
| `[BG-IMAGE]`      | Background image → dùng `_background.image`, KHÔNG tạo block riêng |
| `[PLACEHOLDER]`   | Lorem Ipsum → hỏi user Dynamic Data? |

### 2B — Mapping Table [BẮT BUỘC cho mỗi element]

Với **mỗi element** trong Figma output, tạo bảng đối chiếu từng class:

```
MAPPING — [Element Name]
Tailwind class    | Bricks key       | Value
------------------|------------------|-------
flex-col          | _direction       | "column"
gap-[24px]        | _rowGap          | "24px"
justify-center    | _justifyContent  | "center"
...               | ...              | ...
```

> 📚 Bảng đầy đủ: `.agents/references/tailwind-bricks-map.md`
> ⚠️ **KHÔNG skip class nào** — `gap`, `justify`, `items`, `self` hay bị bỏ qua nhất.

---

## BƯỚC 3 — Build JSON & Push vào Template

### 3A — Viết JSON (Native Flat Format)

**Nguyên tắc:**
1. Mỗi key **phải có** trong Key Validation Table (Bước 1D)
2. Không có trong table → tra lại widget doc, **KHÔNG tự đoán**
3. `_cssCustom` chỉ dùng khi **thực sự không có native key**
4. `_cssCustom` format: `"#brxe-[id] { ... }"` — **KHÔNG dùng `%root%`**
5. Responsive: `"_prop:mobile_portrait": "value"` — KHÔNG viết `@media` thủ công (trừ `_cssCustom`)

**Quy tắc ID:**
- Format: **6 ký tự `[a-z0-9]`**, duy nhất trong toàn template
- Root: `"parent": 0` (integer) | Leaf: `"children": []`

**Widget hierarchy:**
```
section  (parent: 0)
└─ container  (parent: section_id)
   ├─ block
   └─ block
      └─ heading / text-basic / image / button
```

### 3B — Push content vào Template

```
mcp_bricks-mcp_content(action: "update_content", post_id: [template_id], elements: [...])
```

### 3C — Verify tree structure

```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
```

Kiểm tra: `tree[0].name = "section"`, `total` đúng, không có orphan element.

### 3D — ✅ PRE-PUSH CHECKLIST

> 📚 Chi tiết từng lỗi: `.agents/references/build-errors.md`

```
STRUCTURE
□ ID đúng 6 ký tự [a-z0-9], không trùng?
□ Root "parent": 0 (integer)?
□ Hierarchy: section → container → block đúng?
□ children ↔ parent khớp 2 chiều?

LAYOUT
□ Đã chạy Mapping Table (Bước 2B) cho TỪNG element?
□ gap → _rowGap / _columnGap đã map?
□ justify, items, self-stretch đã map?
□ Container: _width: "100%" + _widthMax (không dùng width px cứng)?

BACKGROUND
□ KHÔNG có block riêng làm background image?
□ Background image → _background.image với external: true?

RESPONSIVE
□ Mobile padding: chỉ trên 1 element, không duplicate?

FLEX
□ KHÔNG có "_flexGrow":"1" + "_flexShrink":"0" cùng lúc?
□ Flex chiếm phần còn lại → _cssCustom: "flex: 1"?
```

> ⛔ **KHÔNG PUSH** nếu còn bất kỳ ô chưa tick.

---

## BƯỚC 4 — Cập nhật Plan & Kích hoạt Review

```
.agents/plans/[slug].md → Section [SN] → Status: done
→ Tự động kích hoạt /review-render-section
```

> **Không hỏi user — tự động chạy review ngay sau khi push thành công.**

---

## BƯỚC 5 — Sau khi Review Pass: Báo cáo & DỪNG

```
✅ S[N] "[Tên]" — Build & Review PASS!
📋 Template ID : [template_id]
🔗 Edit        : [site_url]/wp-admin/post.php?post=[template_id]&action=bricks

📌 Sections còn lại:
   S[X]: [Tên] — status: ok   ← chưa build

⏸ AI DỪNG — Gọi /bricks-render-section S[X] khi sẵn sàng tiếp tục.
```

---

## Tóm tắt flow

```
B0: Đọc plan → status check
B1: Liệt kê widgets → đọc docs [song song] → Key Validation Table
B2: get_design_context [song song] → Flags → Mapping Table từng element
B3: Viết JSON → Pre-push Checklist → Push → Verify
B4: Cập nhật plan → /review-render-section tự động
B5: Review pass → Báo cáo → AI DỪNG
```

---

## Key Reference

| ❌ Key sai | ✅ Key đúng | Nguồn |
| --------- | ---------- | ----- |
| `_borderRadius: "24px"` | `_border: {radius: {top/right/bottom/left: "24px"}}` | shared-styles.md |
| `_gap: "24px"` | `_columnGap` + `_rowGap` | shared-styles.md |
| `_flexDirection: "column"` | `_direction: "column"` | layout-container.md |
| `_paddingTop: "40px"` | `_padding: {top: "40px"}` | shared-styles.md |
| `image: {url: "..."}` | `image: {id: 0, url: "..."}` | basic-image.md |
| `"parent": "0"` (string) | `"parent": 0` (integer) | quy tắc chung |
| `%root%` trong `_cssCustom` | `#brxe-[id]` | shared-styles.md |
| `_flexGrow:"1"` + `_flexShrink:"0"` | `_cssCustom: "flex: 1"` | build-errors.md |
