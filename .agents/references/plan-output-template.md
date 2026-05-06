# Plan Output Template

> Sao chép toàn bộ cấu trúc này khi ghi `.agents/plans/[slug].md`.
> Thay tất cả `[...]` bằng dữ liệu thực tế từ Figma.

---

```markdown
# Plan: [Tên trang]

**Figma Node:** [node-id]
**Figma Link:** [URL]
**Site:** [URL] | Bricks [version]
**Screenshot:** ✅ có / ⚠️ không lấy được
**Ngày tạo:** [YYYY-MM-DD]

---

## 1. Thông tin Page

- Loại trang: landing / profile / blog / archive / ...
- Viewport: Desktop | max-width: ...px
- Tổng số sections: N
- Độ phức tạp: Simple / Medium / Complex

---

## 2. Design Variables (Global)

### Colors
| Token | Hex | Dùng trong |
|-------|-----|-----------|

### Typography
| Token | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|

### Spacing & Radius
| Giá trị | Dùng trong |
|---------|-----------|

---

## 3. Sections

### Section N: [Tên] | Node: [ID] | [SIMPLE/MEDIUM/COMPLEX]

**Layout:** [2 cols / grid 3x2 / 1 col / ...]

**Complexity notes:** [lý do đánh giá]

**Design variables của section:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | ... | ... |

**Cấu trúc elements:**
```
Section wrapper
├── Block inner (flex col, gap: Xpx)
│   ├── Heading: "..."
│   └── Text: "..."
└── Image: [tên ảnh]
```

**Images trong section:**
| Tên mô tả | Figma URL | Chiến lược |
|-----------|----------|-----------|
| ... | localhost:3845/assets/[hash].png | Cách 1 / Cách 2 |

**Bricks Widget Map:**

> Settings JSON phải là valid JSON — Flow 2 copy thẳng vào `settings` object.
> Tham khảo ví dụ: `.agents/references/widget-map-examples.md`

| Element | Widget | Settings JSON | Ghi chú kỹ thuật |
|---------|--------|--------------|-----------------|
| Section wrapper | `section` | `{"_padding":{"top":"80px","bottom":"80px","left":"0px","right":"0px"}}` | — |
| Inner block | `block` | `{"_display":"flex","_direction":"column","_rowGap":"24px","_widthMax":"1140px"}` | — |
| Tiêu đề | `heading` | `{"tag":"h2","text":"..."}` | — |

**Behavior & Gotchas:**

> ⚠️ Giá trị `_cssCustom` dưới đây dùng `%root%` — đây là format của **Bricks Editor**. Khi push MCP API, thay bằng `#brxe-[element-id]`.

| Vấn đề | Giải pháp |
|--------|-----------|
| Hover effect | `_cssCustom: "#brxe-[id]:hover { transform: translateY(-4px); }"` |
| Gradient bg | `_cssCustom: "#brxe-[id] { background: linear-gradient(...); }"` |
| Image absolute | Parent: `_position: "relative"`. Image: `_position: "absolute"`, `_top`, `_left` |

**`_cssCustom` phức tạp (nếu có):**

> ⚠️ **CRITICAL:** Khi push qua MCP API, dùng `#brxe-[element-id]` thay vì `%root%`.
> `%root%` chỉ hoạt động trong Bricks Editor UI (sau Ctrl+S editor tự convert).

```css
/* ✔ Đúng khi push MCP API */
#brxe-[id] {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
}
#brxe-[id]::before {
  content: '';
  /* overlay */
}
```

---

*[Lặp lại block Section cho mỗi section]*

---

## 4. Tổng hợp Widgets cần dùng

> Flow 2 đọc file widget tương ứng trước khi build.

| Widget | File tham khảo | Sections dùng | Ghi chú |
|--------|---------------|---------------|---------|
| `section` | `layout-section.md` | Tất cả | Root wrapper |
| `block` | `layout-block.md` | S1, S2 | Flex/Grid container |
| `heading` | `basic-heading.md` | S1, S3 | H1, H2, H3 |
| `text-basic` | `basic-text-basic.md` | S2, S4 | Plain text |

---

## 5. Tổng hợp Images

| Tên mô tả | Figma URL | Chiến lược | WP URL (sau upload) |
|-----------|----------|-----------|---------------------|

> **Cách 1 — Custom URL** *(ưu tiên)*: `{"id": 0, "url": "http://localhost:3845/assets/[hash].png"}`
> **Cách 2 — Upload WP**: Download → user upload → dùng WP URL

---

## 6. Pre-build Checklist (Flow 2 bắt buộc check)

- [ ] Đã đọc widget library cho tất cả widgets trong Section 4?
- [ ] Mỗi CSS property đã dùng native key thay vì `_cssCustom`? (xem `rule-template-bricks.md` Rule 5)
- [ ] Image sizing → `_width`/`_height` (native)?
- [ ] `mask-image`/`transform` → `_cssCustom: "%root% img { ... }"`?
- [ ] Chiến lược ảnh (Cách 1 / Cách 2) đã xác định?
- [ ] Số card/box/item lặp đã đếm chính xác?
- [ ] Sections `[COMPLEX]` có giải pháp kỹ thuật rõ trong Behavior & Gotchas?

---

## 7. Câu hỏi cần user xác nhận trước Flow 2

- [ ] Mobile layout có cần không?
- [ ] Danh sách bài: static hay dynamic Query Loop?
- [ ] ...
```
