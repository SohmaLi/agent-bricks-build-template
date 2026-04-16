---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input

- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên file output slug (ví dụ: `blog-author-profile`)

## Output

- File `[slug].md` lưu tại: `.agents/plans/[slug].md`
- Nội dung: page info, số sections, cấu trúc + variables từng section, trạng thái images, Bricks widget mapping

## Quy tắc cố định

> **Header và Footer luôn bỏ qua** — đánh dấu `[SKIP – Global Template]`, không phân tích chi tiết.
> **Images Figma** có URL dạng `localhost:3845/assets/[hash]` — WP không fetch được trực tiếp. Chiến lược: download về `.agents/images/[slug]/` rồi upload WP qua browser.
> **Không dùng Dangerous Actions** — mọi styling phải qua element settings hoặc `html` element với inline style.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu

### Bước 1.1 — Đọc Figma (song song)

```
mcp_figma_get_design_context(
  nodeId: "[node-id]",
  artifactType: "WEB_PAGE_OR_APP_SCREEN",
  clientFrameworks: "bricks-builder",
  clientLanguages: "html,css,javascript,php"
)
mcp_figma_get_screenshot(nodeId: "[node-id]")
```

Từ output ghi lại:

- Tên trang, loại trang (landing/profile/blog/archive/...)
- Viewport chính, max-width container
- Số sections, tên + Node ID từng section
- Mỗi section: layout (1col / 2cols / grid NxM), elements con chính
- **Design variables** từ dòng "These styles are contained in the design":
  - Colors: token → hex value
  - Typography: font, size, weight, line-height
  - Spacing: padding, gap, border-radius
- **Images**: mỗi `<img src="localhost:3845/assets/...">` → đánh dấu ✅ lấy được. Ghi URL + tên mô tả.

### Bước 1.2 — Đọc thông tin site

```
mcp_bricks-mcp_get_site_info(action: "info")
```

Ghi: site URL, Bricks version.

### Bước 1.3 — Lấy Bricks elements catalog

```
mcp_bricks-mcp_bricks(action: "get_element_schemas", catalog_only: true)
```

Dùng ở Giai đoạn 2.

---

## GIAI ĐOẠN 2: Mapping Bricks Widgets

Với mỗi section, đối chiếu catalog để chọn element phù hợp:

### Bảng mapping tham khảo

| Nhu cầu design         | Bricks element                                 |
| ---------------------- | ---------------------------------------------- |
| Wrapper/section chính  | `section` / `container` / `div`                |
| Row / flex columns     | `block` hoặc `div`                             |
| Tiêu đề H1–H6          | `heading`                                      |
| Rich text / paragraphs | `text`                                         |
| Text đơn giản          | `text-basic`                                   |
| Ảnh                    | `image`                                        |
| SVG                    | `svg`                                          |
| Icon (Font Awesome)    | `icon`                                         |
| Nút / CTA              | `button`                                       |
| Link text              | `text-link`                                    |
| Icon + title + desc    | `icon-box`                                     |
| Danh sách bài viết WP  | `vnx-custom-posts-list-v2` hoặc `vnx-posts`    |
| Bài viết có filter     | `vnx-posts-filter` hoặc `vnx-posts-fillter-v2` |
| Navigation menu        | `nav-menu` hoặc `nav-nested`                   |
| Slider / carousel      | `slider-nested` hoặc `carousel`                |
| HTML tùy chỉnh         | `html`                                         |

### Quy tắc chọn widget

1. Layout → chọn container element
2. Elements con → map từng cái theo bảng trên
3. Không có element phù hợp → dùng `div` + `html` + ghi chú Custom CSS
4. Danh sách bài thật từ WP → ưu tiên `vnx-custom-posts-list-v2`
5. Ghi rõ phần nào cần Custom CSS thêm (gradient bg, inset shadow, clip-path, absolute positioning...)

---

## GIAI ĐOẠN 3: Ghi file plan

Ghi file ra:

```
/Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/.agents/plans/[slug].md
```

### Cấu trúc file output

```markdown
# Plan: [Tên trang]

**Figma Node:** [node-id]
**Figma Link:** [URL]
**Site:** [URL] | Bricks [version]
**Ngày tạo:** [YYYY-MM-DD]

---

## 1. Thông tin Page

- Loại trang: ...
- Viewport: Desktop | max-width: ...px
- Tổng số sections: N

---

## 2. Design Variables (Global)

### Colors

| Token | Hex | Dùng trong |
| ----- | --- | ---------- |

### Typography

| Token | Font | Size | Weight | Line Height |
| ----- | ---- | ---- | ------ | ----------- |

### Spacing & Radius

| Giá trị | Dùng trong |
| ------- | ---------- |

---

## 3. Sections

### Section N: [Tên] | Node: [ID]

**Layout:** [2 cols / grid 3x2 / 1 col / ...]

**Variables của section này:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | ... | ... |
| Border | ... | ... |
| Shadow | ... | Cần Custom CSS |
| Gap | ... | ... |
| Border-radius | ... | ... |

**Cấu trúc elements:**
```

Section wrapper
├── Row (flex, gap: Xpx)
│ ├── Col left
│ │ ├── Heading: "..."
│ │ └── Text: "..."
│ └── Col right
│ └── Image: [tên ảnh]

````

**Images trong section này:**
| Tên mô tả | URL Figma | Lấy được? |
|-----------|----------|----------|
| ... | localhost:3845/assets/[hash].png | ✅ |

**Bricks Widgets:**
| Element trong design | Bricks widget | Ghi chú kỹ thuật |
|---------------------|--------------|-----------------|
| Section wrapper | `section` | padding: 40px |
| Row 2 cột | `block` | display: flex, gap: 24px |
| Tiêu đề | `heading` | H4, 36px/600 Inter |
| Text content | `text` | Rich Text, 18px/400 |
| Button | `button` | bg: #007cfc, border-radius: 12px |
| Ảnh | `image` | object-fit: cover |

**Styling phức tạp (không qua Bricks settings):**

> ❌ **Không dùng Custom CSS** (Dangerous Actions disabled)
> ✅ **Dùng `html` element với inline style** cho các layout cần: absolute positioning, gradient bg, inset shadow, clip-path

Ví dụ:
```html
<div style="position:relative; background:linear-gradient(...); border-radius:24px; overflow:hidden;">
  ...
</div>
````

---

## [Lặp lại block Section cho mỗi section]

## 4. Tổng hợp Images cần Download & Upload

| Tên mô tả | URL Figma (localhost:3845) | File local (.agents/images/[slug]/) | Dùng trong Section |
| --------- | -------------------------- | ----------------------------------- | ------------------ |

> **Chiến lược upload:** Download ảnh về `.agents/images/[slug]/` bằng curl → Upload thủ công lên WP Media Library qua browser → Lấy `attachment_id` → Dùng trong `image` element settings.

## 5. Câu hỏi còn lại

- [ ] Mobile layout có cần không?
- [ ] Danh sách bài: static hay dynamic Query Loop?
- [ ] ...

## 6. Pre-build Checklist (kiểm tra trước khi chạy `/bricks-create-template`)

- [ ] Đã tải tất cả images về `.agents/images/[slug]/` chưa?
- [ ] Đã upload images lên WP Media Library và có `attachment_id` chưa?
- [ ] Đã xác nhận `working_example` của từng Bricks element sẽ dùng chưa?
- [ ] Layout phức tạp đã chuẩn bị fallback bằng `html` element inline style chưa?

```

---

## Ví dụ gọi workflow

```

User: "/figma-create-plan-template https://figma.com/design/ABC/Blog?node-id=3641-1142"

AI thực hiện:
[Giai đoạn 1] get_design_context + get_screenshot (song song)
get_site_info + get_element_schemas (song song)
[Giai đoạn 2] Map sections → Bricks widgets
[Giai đoạn 3] Ghi file .agents/plans/blog-author-profile.md

Kết quả: "Đã tạo plan: .agents/plans/blog-author-profile.md"

```

```
