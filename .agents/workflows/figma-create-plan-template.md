---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input

- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên file output slug (ví dụ: `blog-author-profile`)

## Output

- File `[slug].md` lưu tại: `.agents/plans/[slug].md`
- Nội dung: page info, design variables, cấu trúc sections, widget mapping, behavior analysis, danh sách widget cần dùng

## Quy tắc cố định

> **Header và Footer luôn bỏ qua** — đánh dấu `[SKIP – Global Template]`, không phân tích chi tiết.
> **Images Figma** có URL dạng `localhost:3845/assets/[hash]` — WP không fetch được trực tiếp. Chiến lược: download về `.agents/images/[slug]/` rồi upload WP qua browser.
> **Native-first**: Luôn ưu tiên native Bricks widget. Dùng `_cssCustom` cho style phức tạp. Dùng `html` element chỉ khi markup không thể thực hiện bằng native widget.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu Figma

### Bước 1.1 — Đọc Figma (song song)

Gọi đồng thời:

```
mcp_figma_get_design_context(
  nodeId: "[node-id]",
  artifactType: "WEB_PAGE_OR_APP_SCREEN",
  clientFrameworks: "bricks-builder",
  clientLanguages: "html,css,javascript,php"
)
mcp_figma_get_screenshot(nodeId: "[node-id]")
```

**Nếu gặp lỗi hoặc không lấy được dữ liệu:**
- Thử lại tối đa 2 lần với cùng node-id
- Nếu vẫn lỗi: báo cáo lỗi cụ thể, yêu cầu user cung cấp node-id khác hoặc kiểm tra Figma MCP

**Verify screenshot:**
- Nếu screenshot trả về → ghi nhận ✅ có ảnh xem trước
- Nếu screenshot lỗi/null → ghi nhận ⚠️ không có ảnh, tiếp tục bằng design context

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

### Bước 1.2 — Kiểm tra độ phức tạp

Sau khi đọc Figma xong, đánh giá từng section theo tiêu chí:

| Tiêu chí | Đơn giản | Trung bình | Phức tạp |
|----------|----------|------------|----------|
| Layout | 1 col, linear | 2-3 cols, flex | Grid không đều, overlap, absolute |
| Animation/Interaction | Không | Hover state | Scroll animation, dynamic JS |
| Dynamic data | Không | WP fields cơ bản | Query Loop, Custom Fields, Filter |
| Custom markup | Không | `_cssCustom` | `html` element bắt buộc |
| Images phức tạp | Không | Background image | Mask, clip-path, blend-mode |

**Ghi mức độ cho từng section:**
- `[SIMPLE]` — Build trực tiếp bằng native widgets
- `[MEDIUM]` — Native + `_cssCustom` styling
- `[COMPLEX]` — Cần phân tích kỹ, có thể cần `html` element hoặc JS

### Bước 1.3 — Đọc thông tin site (song song với 1.1)

```
mcp_bricks-mcp_get_site_info(action: "info")
```

Ghi: site URL, Bricks version.

---

## GIAI ĐOẠN 2: Mapping Bricks Widgets

### Bước 2.1 — Đọc Widget Library

**BẮT BUỘC** đọc từ thư mục widget library trước khi mapping:

```
Đọc: /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md
```

Sau đó đọc file chi tiết của từng widget **cần dùng** trong thiết kế:

```
Đường dẫn: /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/[tên-file].md

Ví dụ:
- layout-container.md → thông tin container widget
- basic-heading.md → thông tin heading widget
- general-accordion-nested.md → thông tin accordion
- query-filter-system.md → thông tin toàn bộ filter widgets
```

> **Lý do:** Widget library chứa settings keys chính xác, CSS selectors, và JSON examples đã verified từ PHP source. Không dùng bảng tham khảo cũ.

### Bước 2.2 — Map widgets cho từng section

Với mỗi element trong design, đối chiếu widget library để chọn widget phù hợp:

**Nguyên tắc chọn:**
1. **Native-first** — Luôn kiểm tra widget library trước
2. Nếu widget có settings đáp ứng được → dùng settings đó, ghi rõ key và value
3. Nếu cần style nâng cao (gradient, pseudo, hover) → dùng `_cssCustom` trên chính widget đó
4. Chỉ dùng `html` element khi markup structure không thể thực hiện bằng native widget

**Ghi chú kỹ thuật cho mỗi widget:**
- Widget name (chính xác theo library)
- Settings keys sẽ dùng
- `_cssCustom` nếu cần (ghi rõ CSS)
- Lý do nếu phải dùng `html` element

---

## GIAI ĐOẠN 3: Phân tích Behavior

Dựa trên thông tin Figma + widget library đã đọc, phân tích từng section:

### Bước 3.1 — Behavior analysis

Với mỗi section [MEDIUM] và [COMPLEX]:

- **Hover states:** Element nào có hover? → Map sang `_cssCustom` `%root%:hover { ... }`
- **Animations:** Entrance animation? → Dùng Bricks interactions hoặc CSS animation
- **Dynamic data:** Có dynamic tags không? → Ghi rõ `{post_title}`, `{featured_image}`, etc.
- **Interactivity:** Toggle, accordion, slider, filter? → Chọn đúng widget nestable/interactive
- **Responsive:** Mobile break khác desktop không? → Ghi breakpoint rules

### Bước 3.2 — Xác định giải pháp kỹ thuật

Với mỗi vấn đề phức tạp, ghi rõ:

```
Vấn đề: [mô tả]
Giải pháp: [native widget / _cssCustom / html element]
Settings: [key: value pairs]
```

---

## GIAI ĐOẠN 4: Ghi file plan

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
**Screenshot:** ✅ / ⚠️ không lấy được
**Ngày tạo:** [YYYY-MM-DD]

---

## 1. Thông tin Page

- Loại trang: ...
- Viewport: Desktop | max-width: ...px
- Tổng số sections: N
- Độ phức tạp tổng thể: Simple / Medium / Complex

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

### Section N: [Tên] | Node: [ID] | [SIMPLE/MEDIUM/COMPLEX]

**Layout:** [2 cols / grid 3x2 / 1 col / ...]

**Complexity notes:** [lý do đánh giá mức độ phức tạp]

**Variables của section này:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | ... | ... |
| Border | ... | ... |

**Cấu trúc elements:**
```
Section wrapper
├── Row (flex, gap: Xpx)
│   ├── Col left
│   │   ├── Heading: "..."
│   │   └── Text: "..."
│   └── Col right
│       └── Image: [tên ảnh]
```

**Images trong section này:**
| Tên mô tả | URL Figma | Lấy được? |
|-----------|----------|----------|
| ... | localhost:3845/assets/[hash].png | ✅ |

**Bricks Widgets:**
| Element trong design | Bricks widget | Settings key | Ghi chú kỹ thuật |
|---------------------|--------------|-------------|-----------------|
| Section wrapper | `section` | `_padding: {top:40px...}` | — |
| Row 2 cột | `block` | `_direction: row`, `_gap: 24px` | — |
| Tiêu đề | `heading` | `tag: h2`, `text: "..."` | — |
| Text content | `text` | `text: "..."` | Rich Text |
| Button | `button` | `text`, `style: primary` | `_cssCustom`: border-radius nếu cần |
| Ảnh | `image` | `image.url`, `size: full` | — |

**Behavior analysis:**
| Behavior | Giải pháp |
|----------|-----------|
| Hover card | `_cssCustom`: `%root%:hover { transform: translateY(-4px); }` |
| Dynamic title | Dynamic tag: `{post_title}` trong `heading.text` |

**Styling phức tạp (`_cssCustom`):**
```css
/* Ví dụ _cssCustom trên section wrapper */
%root% {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
}
%root%::before {
  content: '';
  /* overlay */
}
```

---

## [Lặp lại block Section cho mỗi section]

---

## 4. Tổng hợp Widgets cần dùng

> Danh sách tất cả Bricks widgets sẽ được sử dụng trong template này.
> AI cần đọc file tương ứng trong `/widgets/` trước khi build.

| Widget | File tham khảo | Sections dùng | Ghi chú |
|--------|---------------|---------------|---------|
| `section` | `layout-section.md` | Tất cả | Root wrapper |
| `container` | `layout-container.md` | S1, S2, S3 | Max-width wrapper |
| `heading` | `basic-heading.md` | S1, S3, S5 | H1, H2, H3 |
| `text` | `basic-text.md` | S2, S4 | Rich text |
| `button` | `basic-button.md` | S1, S6 | CTA |
| `image` | `basic-image.md` | S2, S4 | Feature images |
| `icon-box` | `basic-icon-box.md` | S3 | Feature items |

---

## 5. Tổng hợp Images cần Download & Upload

| Tên mô tả | URL Figma (localhost:3845) | File local (.agents/images/[slug]/) | Dùng trong Section |
| --------- | -------------------------- | ----------------------------------- | ------------------ |

> **Chiến lược upload:** Download ảnh về `.agents/images/[slug]/` → Upload WP Media Library qua browser → Lấy `attachment_id`.

---

## 6. Câu hỏi còn lại

- [ ] Mobile layout có cần không?
- [ ] Danh sách bài: static hay dynamic Query Loop?
- [ ] ...

---

## 7. Pre-build Checklist (kiểm tra trước khi chạy `/bricks-create-template`)

- [ ] Đã đọc file widget library cho tất cả widgets trong Section 4 chưa?
- [ ] Đã tải tất cả images về `.agents/images/[slug]/` chưa?
- [ ] Đã upload images lên WP Media Library và có `attachment_id` chưa?
- [ ] Sections [COMPLEX] đã có giải pháp kỹ thuật rõ ràng chưa?
- [ ] `_cssCustom` đã được chuẩn bị cho các styling ngoài settings chưa?
```

---

## Ví dụ gọi workflow

```
User: "/figma-create-plan-template https://figma.com/design/ABC/Blog?node-id=3641-1142"

AI thực hiện:
[Giai đoạn 1 - song song]
  get_design_context + get_screenshot → verify ảnh → đánh giá complexity
  get_site_info
[Giai đoạn 2]
  Đọc /widgets/README.md
  Đọc file widget cụ thể theo nhu cầu design
  Map sections → Bricks widgets (từ library, không dùng bảng cũ)
[Giai đoạn 3]
  Phân tích behavior, hover, dynamic data
  Xác định _cssCustom cần thiết
[Giai đoạn 4]
  Ghi file .agents/plans/blog-author-profile.md

Kết quả: "Đã tạo plan: .agents/plans/blog-author-profile.md"
         "Widgets cần dùng: heading, text, button, image, icon-box, container"
         "Sections phức tạp: Section 3 [COMPLEX] — cần _cssCustom cho gradient overlay"
```
