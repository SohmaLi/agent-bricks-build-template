---
description: Thực thi tạo section theo nodeid được ghi vào plan, tạo section sau đó gán vào template tương ứng đã tạo trước đó.
---

# Workflow: `/bricks-render-section`

> **Mục tiêu:** Đọc plan → Đọc docs điều hướng → Build JSON (Tailored) → Push Bricks template → Review tự động.

---

## ⚠️ Rules cốt lõi

| Rule | ✅ | ❌ |
|---|---|---|
| Nội dung | Copy y chang từ Figma | Tự paraphrase |
| Widget key | Đọc docs TRƯỚC | Tự nhớ key |
| Section order | DỪNG sau mỗi section | Build hết 1 lúc |
| Code Logic | **Viết lại, không Sao chép** | Copy-paste nguyên khối |
| Browser | KHÔNG dùng `browser_subagent` | Không ngoại lệ |

> 📚 Tham chiếu Master Router: [miss-refe.md](file:///.agents/references/miss-refe.md)

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

---

## BƯỚC 1 — Đọc Docs [HARD GATE — RULE 12]

### ACTION 1.1 — Đọc Master Router & Docs cụ thể
AI bắt buộc đọc các file sau theo thứ tự:
1. **Bắt buộc**: `view_file(".agents/references/miss-refe.md")` để biết các docs cần đọc.
2. **Theo điều hướng**: Đọc `widgets/shared-styles.md`, `build-errors.md`, `building-logic.md`.
3. **Widget chi tiết**: Đọc từng file trong `widgets/[category]/[widget].md` có trong tree.

### ACTION 1.2 — Paste KEY VALIDATION TABLE [BLOCKING OUTPUT]
*(Như hiện tại, dùng để xác nhận các Keys đã tra cứu từ Widget Docs)*

---

## BƯỚC 2 — Extract Figma
*(Giữ nguyên logic extract desktop/mobile và detect flags)*

---

## BƯỚC 3 — Build JSON (Tailored Code) & Push

### 3A — Nguyên tắc RULE 13
1. **KHÔNG copy-paste** nguyên khối JSON từ common-patterns.
2. **Tự tay viết mới**: Xây dựng JSON dựa trên keys từ tài liệu gốc.
3. ID 6 ký tự, parent 0 (integer), `_cssCustom` dùng `#brxe-[id]`.

### 3B — Push & Checklist
*(Sử dụng update_content cho structure/fix, checklist tra cứu build-errors.md)*

---

## BƯỚC 4 — Review & Update Plan
Sau khi push, tự động kích hoạt `/review-render-section` và cập nhật status vào plan file.

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
