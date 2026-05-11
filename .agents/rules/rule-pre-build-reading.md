---
trigger: always_on
glob:
description: Bắt buộc đọc widget docs và tài liệu bổ trợ TRƯỚC KHI thực thi bricks-render-section — không ngoại lệ.
---

# RULE 12 — Pre-Build Reading Gate (BẮT BUỘC TRƯỚC KHI BUILD)

> **Áp dụng:** Mọi lần bắt đầu flow `/bricks-render-section` — kể cả khi đã quen.

---

## Lý do tồn tại rule này

Trong thực tế, AI đã **bỏ qua** bước đọc widget docs và viết key từ trí nhớ → dẫn đến:
- Key sai → API push thành công nhưng render sai
- `container` dùng sai hierarchy → cấu trúc lỗi
- `arrows` checkbox behavior không hiểu → slider sai
- Phải rebuild nhiều lần → mất thời gian

**Rule này tồn tại để tránh lặp lại.**

---

## Chuỗi đọc BẮT BUỘC — theo thứ tự

### BƯỚC A — Đọc Plan File [TRƯỚC TIÊN]

```
view_file: .agents/plans/[slug].md
```

Mục tiêu: Lấy widget tree của section → biết cần đọc docs nào.

---

### BƯỚC B — Đọc Widgets Docs [SONG SONG, TRƯỚC KHI VIẾT JSON]

Đọc tất cả các file sau **cùng lúc** (song song):

```
[LUÔN đọc — bắt buộc]
view_file: widgets/README.md
view_file: widgets/shared-styles.md

[Đọc theo widget tree trong plan — mỗi widget 1 file]
view_file: widgets/layout/layout-section.md
view_file: widgets/layout/layout-container.md
view_file: widgets/layout/layout-block.md
view_file: widgets/[category]/[widget].md       ← mỗi widget đặc biệt trong section
```

> ⛔ **KHÔNG được bắt đầu viết JSON trước khi đọc xong.**

---

### BƯỚC C — Đọc Tài Liệu Bổ Trợ [SONG SONG với BƯỚC B]

```
[LUÔN đọc — bắt buộc]
view_file: .agents/references/build-errors.md
view_file: .agents/components/common-patterns.md
```

> Hai file này chứa lỗi đã xác nhận qua thực tế và patterns đã verify.
> Bỏ qua → có thể lặp lại lỗi đã gặp.

---

### BƯỚC D — Tạo KEY VALIDATION TABLE [OUTPUT BẮT BUỘC]

Sau khi đọc xong, tạo bảng xác nhận **trước khi viết bất kỳ dòng JSON nào**:

```
WIDGET KEY TABLE — Section [SN]: [Tên]
===========================================
Widget       | Key cần dùng                  | Source file              | ✅/❌
-------------|-------------------------------|--------------------------|------
section      | _padding, _background         | shared-styles.md         | ✅
container    | _direction, _rowGap, _width   | layout-container.md      | ✅
block        | _display, _alignItems, _gap   | layout-block.md          | ✅
heading      | tag, text, _typography        | basic-heading.md         | ✅
slider-nested| type, perPage, arrows         | media-slider-nested.md   | ✅
...          | ...                           | ...                      | ...
```

> ⛔ **HARD GATE: PASTE TABLE VÀO CHAT.**
> - Chưa có table = chưa đọc docs = KHÔNG được viết JSON
> - User có thể dừng AI tại đây nếu không thấy table
> - Table phải bao gồm ĐỦ mọi widget trong section, không bỏ sót

---

## Tóm tắt chuỗi — bắt buộc theo đúng thứ tự

```
1. Đọc Plan File → lấy widget tree
        ↓
2. [SONG SONG]
   - Đọc widgets/README.md
   - Đọc widgets/shared-styles.md
   - Đọc từng widget doc trong tree
   - Đọc build-errors.md
   - Đọc common-patterns.md
        ↓
3. Tạo KEY VALIDATION TABLE → PASTE VÀO CHAT
        ↓
4. [Chỉ sau khi có table] Bắt đầu extract Figma + viết JSON
```

---

## Enforcement

| Ai kiểm tra | Cách kiểm tra |
|---|---|
| **Bản thân AI** | Không bắt đầu viết JSON nếu chưa có table |
| **User** | Nếu không thấy table trong chat → yêu cầu AI dừng và đọc lại |

> ⚠️ "Tôi đã biết key này rồi" KHÔNG phải lý do hợp lệ để bỏ qua rule này.
> Widget docs có thể update — key từ trí nhớ có thể sai hoặc thiếu.
