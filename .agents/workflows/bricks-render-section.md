---
description: Thực thi tạo section theo nodeid được ghi vào plan, tạo section sau đó gán vào template tương ứng đã tạo trước đó.
---

# Workflow: `/bricks-render-section`

> **Mục tiêu:** Đọc plan → extract Figma → build JSON → push Bricks template → review tự động.

---

## ⚠️ Rules cốt lõi

| Rule | ✅ | ❌ |
|---|---|---|
| Nội dung | Copy y chang từ Figma | Tự paraphrase |
| Widget key | Đọc docs TRƯỚC | Tự nhớ key |
| Section order | DỪNG sau mỗi section | Build hết 1 lúc |
| Widget hierarchy | `section→container→block→[...]` | `section→block→[...]` |
| Browser | KHÔNG dùng `browser_subagent` | Không ngoại lệ |

> 📚 Tham chiếu chi tiết: `.agents/references/build-errors.md` · `.agents/components/common-patterns.md`

---

## BƯỚC 0 — Đọc Plan & Kiểm tra Status

```
view_file(".agents/plans/[slug].md")
```

| Status | Hành động |
|---|---|
| `ok` | ✅ Tiếp tục |
| `pending` | ⛔ Báo user đổi → `ok` rồi mới build |
| `done` | ⚠️ Hỏi confirm rebuild |
| `skip` | ⛔ Dừng |

> ⚠️ Detail `pending` + table `ok` → mâu thuẫn → dừng hỏi user.
> Chưa có Template ID → báo chạy `/figma-render-page` trước.

---

## BƯỚC 1 — Đọc Docs [HARD GATE — RULE 12]

> ⛔ **Action bắt buộc. Bước sau KHÔNG chạy nếu bước này chưa xong.**

### ACTION 1.1 — Gọi view_file song song [TẤT CẢ cùng lúc]

```
[Bắt buộc — luôn đọc]
view_file("widgets/README.md")
view_file("widgets/shared-styles.md")
view_file(".agents/references/build-errors.md")
view_file(".agents/components/common-patterns.md")
view_file("widgets/layout/layout-section.md")
view_file("widgets/layout/layout-container.md")
view_file("widgets/layout/layout-block.md")

[Theo widget tree trong plan — mỗi widget đặc biệt]
view_file("widgets/[category]/[widget].md")   ← 1 call/widget
```

### ACTION 1.2 — Paste KEY VALIDATION TABLE [BLOCKING OUTPUT]

```
WIDGET KEY TABLE — Section [SN]: [Tên]
================================================================
Widget      | Keys cần dùng                  | Source          | ✅
------------|--------------------------------|-----------------|---
section     | _padding, _background          | shared-styles   | ✅
container   | _direction, _rowGap, _widthMax | layout-container| ✅
block       | _display, _alignItems, _gap    | layout-block    | ✅
heading     | tag, text, _typography         | basic-heading   | ✅
[widget N]  | [keys từ doc]                  | [source]        | ✅
```

> ⛔ **DỪNG tại đây — paste table vào chat.**
> Chưa có table = BƯỚC 2 không được chạy.
> Thiếu widget nào → tra thêm doc → bổ sung → paste lại.

---

## BƯỚC 2 — Extract Figma

> ⛔ **DEPENDENCY:** Chỉ chạy sau khi KEY VALIDATION TABLE đã paste vào chat.

```
[Song song]
mcp_figma_get_design_context(desktop_node_id)
mcp_figma_get_design_context(mobile_node_id)
```

**Flags phát hiện khi đọc Figma:**

| Flag | Điều kiện | Action |
|---|---|---|
| `[G2-RISK]` | flex-row cần giữ hàng mobile | `_cssCustom: flex-wrap:nowrap` |
| `[DIRECTION-CHANGE]` | flex-direction khác desktop/mobile | `_direction:mobile_portrait` |
| `[ABSENT-MOBILE]` | Ẩn trên mobile | `_display:mobile_portrait: "none"` |
| `[SIZE-CHANGE]` | Size khác mobile | key`:mobile_portrait` |
| `[MASK-IMAGE]` | Có mask | `_cssCustom` trên wrapper block |
| `[BG-IMAGE]` | Background image | `_background.image` — không tạo block riêng |
| `[PLACEHOLDER]` | ≥3 items cùng nội dung | **DỪNG** hỏi user A/B |

---

## BƯỚC 3 — Build JSON & Push

### 3A — Nguyên tắc viết JSON

1. Mỗi key **phải có trong KEY VALIDATION TABLE**
2. Key không có trong table → tra widget doc, **KHÔNG tự đoán**
3. `_cssCustom`: format `"#brxe-[id] { ... }"` — KHÔNG dùng `%root%`
4. `"parent": 0` là **integer**, KHÔNG phải string `"0"`
5. Responsive: `"_prop:mobile_portrait": "value"` — không viết `@media` thủ công

### 3B — Push

```
mcp_bricks-mcp_content(action: "update_content", post_id: [template_id], elements: [...])
```

> ⚠️ `update_content` = CLEAR toàn bộ rồi replace. Dùng khi rebuild/fix cấu trúc/fix checkbox.
> `update` = merge-patch, settings cũ vẫn còn. Chỉ dùng khi fix 1-2 key đơn giản.

### 3C — Pre-push Checklist (tra `build-errors.md` nếu cần detail)

```
STRUCTURE    □ ID 6 ký tự [a-z0-9] không trùng?
             □ parent: 0 là integer?
             □ container chỉ depth 1 dưới section?
             □ children ↔ parent khớp 2 chiều?

TYPOGRAPHY   □ font-size là string "24px" (không phải {value,unit})?
             □ color nằm trong _typography.color.hex?

LAYOUT       □ gap → _rowGap/_columnGap đúng?
             □ container: _width:"100%" + _widthMax?

CSS          □ _cssCustom dùng #brxe-[id]?
             □ Có _cssCustom → nhắc user Ctrl+S?

MOBILE       □ Tất cả flags [DC][AM][SC] đã set?

SLIDER       □ Slide block = direct card (không extra wrapper)?
             □ Muốn tắt arrows/pagination → CSS hide, không update partial?
```

### 3D — Verify

```
mcp_bricks-mcp_content(action: "get", post_id: [template_id], view: "summary")
→ Kiểm tra: tree[0].name = "section", total đúng, không orphan
```

---

## BƯỚC 4 — Cập nhật Plan & Kích hoạt Review

```
.agents/plans/[slug].md → Section [SN] → Status: done
→ Tự động chạy /review-render-section
```

---

## BƯỚC 5 — Sau Review Pass: Báo cáo & DỪNG

```
✅ S[N] "[Tên]" — PASS!
📋 Template ID: [id]
🔗 Edit: [site_url]/wp-admin/post.php?post=[id]&action=bricks

📌 Sections còn lại: S[X] (ok), S[Y] (pending)...
⏸ AI DỪNG — Gọi /bricks-render-section S[X] khi sẵn sàng.
```

---

## Quick Reference — Keys hay sai

| ❌ Sai | ✅ Đúng |
|---|---|
| `_borderRadius: "24px"` | `_border: {radius: {top/right/bottom/left: "24px"}}` |
| `_gap: "24px"` | `_columnGap` + `_rowGap` tách riêng |
| `_flexDirection: "column"` | `_direction: "column"` |
| `image: {url: "..."}` | `image: {id: 0, url: "..."}` |
| `"parent": "0"` (string) | `"parent": 0` (integer) |
| `%root%` trong `_cssCustom` | `#brxe-[id]` |
| `_flexGrow:"1"` + `_flexShrink:"0"` | `_cssCustom: "flex:1;min-width:0"` |
| `"font-size": {value:24, unit:"px"}` | `"font-size": "24px"` |
