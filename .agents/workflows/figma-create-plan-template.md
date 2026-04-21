---
description: Phan tich thiet ke Figma va tao plan trien khai vao Bricks Builder. Su dung khi nhan duoc Figma link/node-id va can lap ke hoach implement.
---

# Workflow: Figma → Bricks Builder Plan Template

## Input

- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên file output slug (ví dụ: `blog-author-profile`)

## Output

- File `.agents/plans/[slug].md` — plan đầy đủ cho Flow 2 đọc và build

---

## ⚠️ FRESH START — Bắt buộc đầu mỗi lần chạy

> **Mỗi lần gọi `/figma-create-plan-template` là một phiên phân tích HOÀN TOÀN MỚI.**

1. **Không dùng lại** context, plan file, hay dữ liệu Figma từ session trước
2. **Ghi đè** file plan cũ nếu cùng slug — không append
3. **Lấy dữ liệu Figma tươi** với node-id được cung cấp trong lần gọi này
4. **Xác nhận với user** ngay khi bắt đầu:

```
🆕 Bắt đầu phân tích MỚI cho: [Figma URL / node-id]
📄 Output: .agents/plans/[slug].md (sẽ ghi đè nếu đã tồn tại)
```

---

## Quy tắc cố định

> **Header và Footer luôn bỏ qua** — đánh dấu `[SKIP – Global Template]`, không phân tích chi tiết.
> **Images Figma** có URL dạng `localhost:3845/assets/[hash]` — xem chiến lược 2 cách bên dưới (Section 5).
> **Native-first**: Luôn ưu tiên native Bricks widget. Dùng `_cssCustom` cho style phức tạp. Dùng `html` element chỉ khi markup không thể thực hiện bằng native widget.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu (song song)

### Bước 1.1 — Gọi đồng thời 3 tools

```
[1a] mcp_figma_get_design_context(
  nodeId: "[node-id]",
  artifactType: "WEB_PAGE_OR_APP_SCREEN",
  clientFrameworks: "bricks-builder",
  clientLanguages: "html,css,javascript,php"
)
[1b] mcp_figma_get_screenshot(nodeId: "[node-id]")
[1c] mcp_bricks-mcp_get_site_info(action: "info")
```

**Xử lý lỗi:**
- Nếu `get_design_context` lỗi → thử lại tối đa 2 lần → nếu vẫn lỗi: báo user, dừng flow
- Nếu `get_screenshot` lỗi → ghi nhận ⚠️ không có ảnh, tiếp tục bằng design context

### Bước 1.2 — Trích xuất từ design context

Ghi lại từ output:

| Thông tin | Ghi nhận |
|-----------|---------|
| Tên trang, loại trang | landing / profile / blog / archive / ... |
| Viewport chính, max-width container | px |
| Số sections, tên + Node ID từng section | List |
| **Design variables** (dòng "These styles are contained...") | Colors (token → hex), Typography (font/size/weight/line-height), Spacing |
| **Images** `localhost:3845/assets/...` | URL + tên mô tả ngắn |

---

## GIAI ĐOẠN 2: Phân tích từng Section

> Giai đoạn này được thực hiện cho **mọi section** (trừ Header/Footer đánh SKIP).
> Kết quả sẽ trở thành nội dung Section 3 trong file plan output.

### Bước 2.1 — Đọc Widget Library

**BẮT BUỘC** đọc trước khi mapping bất kỳ section nào:

```
[1] Đọc: /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md
[2] Đọc file chi tiết của từng widget sẽ dùng:
    /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/[tên-file].md
```

> ⚠️ Widget library chứa settings keys chính xác từ PHP source. Không tự đặt key từ trí nhớ hay bảng cũ.

### Bước 2.2 — Phân tích mỗi section (lặp lại)

Với **mỗi section**, thực hiện tuần tự:

#### A. Đánh giá độ phức tạp

| Tiêu chí | Đơn giản | Trung bình | Phức tạp |
|----------|----------|------------|----------|
| Layout | 1 col, linear | 2-3 cols, flex | Grid không đều, overlap, absolute |
| Animation / Interaction | Không | Hover state | Scroll animation, dynamic JS |
| Dynamic data | Không | WP fields cơ bản | Query Loop, Custom Fields, Filter |
| Custom markup | Không | `_cssCustom` | `html` element bắt buộc |
| Images | Standard | Background image | Mask, clip-path, blend-mode |

Gắn nhãn: `[SIMPLE]` / `[MEDIUM]` / `[COMPLEX]`

#### B. Map Bricks Widgets

Với mỗi element trong section, đối chiếu widget library:

1. **Native-first** — kiểm tra widget library trước
2. Nếu widget có settings đáp ứng → dùng settings đó, ghi rõ key + value
3. Nếu cần style nâng cao (gradient, pseudo, hover) → `_cssCustom` trên chính widget đó
4. Chỉ dùng `html` element khi markup structure không thể native

#### C. Phân tích Behavior & Gotchas

Với section `[MEDIUM]` và `[COMPLEX]`, xác định rõ:

| Loại | Câu hỏi kiểm tra | Giải pháp |
|------|-----------------|-----------|
| Hover states | Element nào có hover? | `_cssCustom: %root%:hover { ... }` |
| Slider / Tab | Có component interactive? | `slider-nestable` / `tabs-nestable` — KHÔNG dùng block giả |
| Image positioning | Image có `position: absolute`? | Parent cần `_cssCustom: position:relative` |
| Gradient / Overlay | Section có gradient background? | `_cssCustom` trên chính element đó — KHÔNG dùng `set_page_css` |
| `_position` setting | Cần set position? | **KHÔNG dùng `_position`** — dùng `_cssCustom` thay thế (gotcha Bricks) |
| Dynamic data | Có text cần dynamic tag? | Chỉ khi plan yêu cầu `[DYNAMIC]` — mặc định static từ Figma |
| Số lượng items | Đếm số card/box/item lặp | Build đúng số đó — KHÔNG bớt |

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
**Screenshot:** ✅ có / ⚠️ không lấy được
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

**Complexity notes:** [lý do đánh giá]

**Design variables của section:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | ... | ... |

**Cấu trúc elements:**
```
Section wrapper
├── Container (max-width: Xpx)
│   ├── Block (flex, gap: Xpx)
│   │   ├── Heading: "..."
│   │   └── Text: "..."
│   └── Image: [tên ảnh]
```

**Images trong section:**
| Tên mô tả | Figma URL | Chiến lược |
|-----------|----------|-----------|
| ... | localhost:3845/assets/[hash].png | Cách 1 / Cách 2 |

**Bricks Widget Map:**
| Element | Widget | Settings key cần dùng | Ghi chú kỹ thuật |
|---------|--------|----------------------|-----------------|
| Section wrapper | `section` | `_padding: {top: "Xpx"...}` | — |
| Max-width wrapper | `container` | `_maxWidth: "1200px"`, `_direction: "row"` | — |
| Tiêu đề | `heading` | `tag: "h2"`, `text: "..."` | — |
| Ảnh | `image` | `image: {id:0, url:"localhost:..."}` | Cách 1 |

**Behavior & Gotchas:**
| Vấn đề | Giải pháp |
|--------|-----------|
| Hover card effect | `_cssCustom: "%root%:hover { transform: translateY(-4px); }"` |
| Gradient background | `_cssCustom: "%root% { background: linear-gradient(...); }"` |
| Image absolute positioning | Parent: `_cssCustom: "%root% { position: relative; }"` |

**`_cssCustom` phức tạp (nếu có):**
```css
%root% {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
}
%root%::before {
  content: '';
  /* overlay */
}
```

---

*[Lặp lại block Section cho mỗi section]*

---

## 4. Tổng hợp Widgets cần dùng

> Flow 2 sẽ đọc các file widget tương ứng trước khi build.

| Widget | File tham khảo | Sections dùng | Ghi chú |
|--------|---------------|---------------|---------|
| `section` | `layout-section.md` | Tất cả | Root wrapper |
| `container` | `layout-container.md` | S1, S2, S3 | Max-width wrapper |
| `heading` | `basic-heading.md` | S1, S3, S5 | H1, H2, H3 |
| `text` | `basic-text.md` | S2, S4 | Rich text |

---

## 5. Tổng hợp Images

| Tên mô tả | Figma URL | Chiến lược | WP URL (sau upload) |
| --------- | --------- | ---------- | ------------------- |

> ### Chiến lược ảnh — 2 cách
>
> **Cách 1 — Custom URL trực tiếp** *(ưu tiên)*
> ```json
> "image": { "id": 0, "url": "http://localhost:3845/assets/[hash].png" }
> ```
> ✅ Không cần download/upload. Hoạt động khi Figma Desktop đang chạy.
>
> **Cách 2 — Lưu file + yêu cầu user upload** *(fallback)*
> 1. AI download về: `bricks_mcp/images/[tên-file].png`
> 2. Báo user upload lên WP Media Library, gửi lại URL
> 3. AI dùng WP URL trong `image` widget

---

## 6. Pre-build Checklist (Flow 2 bắt buộc check trước khi build)

- [ ] Đã đọc widget library cho tất cả widgets trong Section 4?
- [ ] Đã xác định chiến lược ảnh (Cách 1 / Cách 2) cho từng image?
- [ ] Sections `[COMPLEX]` đã có giải pháp kỹ thuật rõ ràng trong Behavior & Gotchas?
- [ ] `_cssCustom` đã chuẩn bị cho các styling ngoài native settings?
- [ ] (Cách 2) Ảnh đã lưu về `images/` và user đã upload + cung cấp WP URL?
- [ ] Đã đếm chính xác số card/box/item lặp trong từng section?

---

## 7. Câu hỏi còn lại (cần user xác nhận trước Flow 2)

- [ ] Mobile layout có cần không?
- [ ] Danh sách bài: static hay dynamic Query Loop?
- [ ] ...
```

---

## Tóm tắt execution flow

```
[Song song] get_design_context + get_screenshot + get_site_info
     ↓
Đọc Widget Library (README → từng file cần dùng)
     ↓
Với mỗi section:
  → Đánh giá complexity [SIMPLE/MEDIUM/COMPLEX]
  → Map Bricks widgets (từ library)
  → Phân tích Behavior & Gotchas
     ↓
Ghi file .agents/plans/[slug].md
     ↓
Báo cáo user:
  "✅ Đã tạo plan: .agents/plans/[slug].md"
  "Widgets cần dùng: [list]"
  "Sections phức tạp: [list + lý do]"
  "Câu hỏi cần xác nhận: [list]"
```
