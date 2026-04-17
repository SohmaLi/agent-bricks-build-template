---
description: Doc file plan tu figma-create-plan-template va tao Bricks templates cho tung section. Moi section = 1 template trong Bricks. Build tung section mot, bao user xem lai truoc khi tiep tuc.
---

# Workflow: Bricks Create Template

## Input
- Tên slug của plan file (ví dụ: `blog-author-hero`)
- Plan file đọc từ: `.agents/plans/[slug].md`

## Output
- N Bricks templates được tạo trên site (mỗi section = 1 template)
- Images được download về: `.agents/images/[slug]/`
- File note: `.agents/notes/[slug]-templates.md`

---

## ⚠️ Quy tắc TUYỆT ĐỐI

| Rule | Đúng | SAI |
|------|------|-----|
| Layout engine | `section → container → block → [widgets]` | ❌ `html` cho layout |
| Settings keys | Đọc từ `/widgets/[widget].md` | ❌ Tự đặt key từ trí nhớ |
| CSS nâng cao | `_cssCustom` với `%root%` | ❌ `set_page_css` |
| HTML element | Chỉ khi markup không thể native | ❌ Dùng thay thế layout |
| Browser agent | KHÔNG dùng để build | ❌ Browser agent cho Bricks UI |
| Image (build) | Dùng `image.url` với Figma `localhost:3845` URL — `id: 0` | ❌ `src=""` rỗng |
| Image (production) | Upload WP → lấy `attachment_id` thật | ❌ Giữ localhost URL trên production |
| Build flow | Từng section → báo user → chờ xác nhận | ❌ Build song song |

---

## GIAI ĐOẠN 1: Đọc & Chuẩn bị

### Bước 1.1 — Đọc plan file

Đọc toàn bộ: `.agents/plans/[slug].md`

Ghi lại:
- Site URL, Bricks version
- Danh sách sections (bỏ nhãn `[SKIP]`)
- Mức độ phức tạp từng section (`[SIMPLE]` / `[MEDIUM]` / `[COMPLEX]`)
- **Danh sách widgets cần dùng** (Section 4 trong plan)
- Danh sách images cần upload

### Bước 1.2 — Đọc Widget Library

**BẮT BUỘC** đọc file widget tương ứng với từng widget trong danh sách Section 4 của plan:

```
Đọc README: /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/README.md

Với mỗi widget trong danh sách plan → đọc file tương ứng:
/Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/[tên-file].md
```

Mục đích — ghi nhận cho từng widget:
- **Settings keys chính xác** và kiểu dữ liệu (string / object / number)
- **`_cssCustom` selectors** nếu cần style nâng cao
- **JSON example** để tham khảo cấu trúc

> ⚠️ Không dùng settings key từ trí nhớ hay bảng hardcode. Chỉ dùng keys từ widget library.

### Bước 1.3 — Xác định thứ tự build

Sắp xếp sections theo thứ tự:
1. `[SIMPLE]` trước — build nhanh, ít rủi ro
2. `[MEDIUM]` tiếp theo
3. `[COMPLEX]` cuối — xem xét kỹ nhất

Tạo bảng kế hoạch:

| # | Section | Complexity | Template Slug | Status |
|---|---------|-----------|--------------|--------|
| 1 | Hero | SIMPLE | `[slug]-hero` | ⏳ |
| 2 | Features | MEDIUM | `[slug]-features` | ⏳ |
| 3 | Pricing | COMPLEX | `[slug]-pricing` | ⏳ |

---

## GIAI ĐOẠN 2: Chuẩn bị Images

> ✅ **Workflow khuyến nghị — Dùng Custom URL trong build phase:**
> Image widget hỗ trợ **Custom URL** (`id: 0, url: "..."`). Trong giai đoạn build/prototype, dùng thẳng URL `localhost:3845` từ Figma — **không cần download hay upload**.

### Bước 2.1 — Xác định nguồn ảnh

Với mỗi ảnh trong plan Section 5:

```json
// Build phase — dùng Figma URL trực tiếp
"image": {
  "id": 0,
  "url": "http://localhost:3845/assets/[hash].png"
}
```

> ⚠️ `localhost:3845` chỉ hoạt động khi **Figma Desktop đang chạy** trên máy người xem. Ổn cho môi trường dev/staging.

### Bước 2.2 — Upload WP (chỉ khi production)

Khi cần deploy production hoặc user yêu cầu ảnh thật:

**Cách A: Sideload qua MCP** (thử trước)
```
mcp_bricks-mcp_media(
  action: "sideload",
  url: "http://localhost:3845/assets/[hash].png",
  filename: "[name].png",
  alt_text: "[mô tả]"
)
→ Lấy attachment_id từ response
```

**Cách B: User upload thủ công** (nếu Cách A lỗi do localhost)
- Báo user upload lên WP Admin > Media
- Chờ user cung cấp `attachment_id`
- Thay `id: 0, url: localhost` → `id: [real_id], url: [wp_url]`

### Bước 2.3 — Ghi bảng images

| Tên | Figma URL | Build URL (id:0) | WP attachment_id (production) |
|-----|-----------|-----------------|-------------------------------|
| hero-bg | `localhost:3845/assets/[hash].png` | ✅ dùng ngay | ___ (điền sau) |

---

## GIAI ĐOẠN 3: Build từng Section (tuần tự)

> **Nguyên tắc vàng để đạt độ chính xác 100%:**
> 1. Build xong 1 section → báo user → chờ xác nhận → mới tiếp tục.
> 2. **Context Reinforcement:** Trước khi build MỖI section, AI phải dùng `view_file` đọc lại:
>    - `.agents/plans/[slug].md` (để lấy variables & layout của đúng section đó)
>    - `/Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/widgets/[widget].md` (cho các widget sẽ dùng trong section đó)
>    *Điều này đảm bảo không có sai sót do AI bị trôi context.*

---

### [Lặp lại cho mỗi section theo thứ tự]

---

#### Bước 3.A — Chuẩn bị JSON cho section hiện tại

**Bắt buộc thực hiện:** Đọc lại Plan và Widget Library của các widget trong section này ngay tại đây.

Dựa vào dữ liệu "tươi" vừa đọc, build elements array:

**Nguyên tắc build JSON:**
1. Root element phải `"parent": "0"`
2. IDs: 6 ký tự alphanumeric ngẫu nhiên (vd: `a1b2c3`)
3. Thứ tự trong array = thứ tự render (parent trước, children sau)
4. Thiết lập settings keys lấy **chính xác** từ tài liệu widget vừa đọc.
5. `_cssCustom` syntax: `"%root% { ... }\n%root%:hover { ... }"`

**Cấu trúc mẫu (adapting theo từng section):**
```json
[
  {
    "id": "sec[XX]",
    "name": "section",
    "parent": "0",
    "settings": {
      "_padding": {"top": "Xpx", "bottom": "Xpx", "left": "0px", "right": "0px"},
      "_background": {"color": {"hex": "#XXXXXX"}}
    }
  },
  {
    "id": "ctn[XX]",
    "name": "container",
    "parent": "sec[XX]",
    "settings": {
      "_maxWidth": "1200px",
      "_direction": "row",
      "_columnGap": "24px",
      "_alignItems": "center"
    }
  }
  // ... children theo plan
]
```

> **Với section [COMPLEX]:** Phân tích kỹ behavior analysis trong plan, xác định rõ `_cssCustom` cần thiết trước khi gọi API.

#### Bước 3.B — Tạo template rỗng

```
mcp_bricks-mcp_template(
  action: "create",
  type: "section",
  title: "[slug]-[ten-section]",
  status: "publish"
)
→ Lưu template_id
```

#### Bước 3.C — Push elements

```
mcp_bricks-mcp_content(
  action: "update_content",
  post_id: [template_id],
  elements: [... array đã build ...]
)
```

#### Bước 3.D — Verify structure

```
mcp_bricks-mcp_content(action: "get", post_id: [template_id])
```

Kiểm tra:
- Số elements đúng với array đã push
- Parent/children relationships khớp
- IDs không bị thay đổi

**Nếu có lỗi parent:**
```
mcp_bricks-mcp_content(
  action: "move",
  element_id: "[element-id]",
  post_id: [template_id],
  target_parent_id: "[parent-id-đúng]",
  position: 0
)
```

#### Bước 3.E — Báo cáo user & CHỜ XÁC NHẬN

Sau khi verify xong, báo cáo:

```
✅ Section [N]: "[Tên section]" đã build xong!

🔗 Xem trong Bricks editor:
   [site_url]/wp-admin/post.php?post=[template_id]&action=bricks

📋 Template: [slug]-[ten-section] (ID: [template_id])
📊 Elements: [số] elements | Complexity: [SIMPLE/MEDIUM/COMPLEX]

⚠️ Vui lòng kiểm tra:
   - Layout có đúng với Figma không?
   - Typography, spacing có khớp không?
   - Images hiển thị đúng không?
   - Hover/interaction (nếu có) hoạt động không?

👉 Gõ "ok" hoặc "tiếp tục" để build Section [N+1]: "[Tên section tiếp}"
   Gõ "fix [mô tả]" nếu cần chỉnh sửa trước khi tiếp tục.
```

> **AI DỪNG và CHỜ.** Không tự động sang section tiếp theo.

#### Bước 3.F — Xử lý phản hồi user

- **User gõ "ok" / "tiếp tục":** Chuyển sang section tiếp theo (Bước 3.A với section kế)
- **User gõ "fix [mô tả]":** Phân tích, fix elements của section vừa build, verify lại rồi báo lại (Bước 3.E)
- **User gõ nội dung khác:** Xử lý yêu cầu cụ thể

---

## GIAI ĐOẠN 4: Hoàn thành — Ghi file Note

Sau khi **tất cả sections đã được user xác nhận**, ghi file:

`.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Plan:** `.agents/plans/[slug].md`
**Images:** `.agents/images/[slug]/`
**Site:** [site_url] | Bricks [version]
**Ngày:** [YYYY-MM-DD]
**Trạng thái:** ✅ Hoàn thành / 🔄 Đang xử lý

## Templates

| # | Tên Section | Template ID | Edit URL | User Review |
|---|-------------|-------------|----------|-------------|
| 1 | [slug]-hero | [id] | [wp-admin url] | ✅ Approved |
| 2 | [slug]-features | [id] | [wp-admin url] | ✅ Approved |

## Images

| File | Attachment ID | Dùng trong |
|------|--------------|------------|
| hero-bg.png | [id] | imgBG (section 1) |

## Ghi chú

- [Các vấn đề gặp phải và cách xử lý]
```

Báo cáo cuối:
```
🎉 Hoàn thành! Đã build [N] sections cho "[Tên Page]"

Chạy /restore-bricks-template để review tổng thể và so sánh với Figma.
```

---

## Tóm tắt flow

```
Đọc plan → Đọc widget library → Chuẩn bị images
    ↓
[Section 1] Build → Verify → Báo user → CHỜ
    ↓ (user ok)
[Section 2] Build → Verify → Báo user → CHỜ
    ↓ (user ok)
[Section N] Build → Verify → Báo user → CHỜ
    ↓ (user ok)
Ghi note → Done
```
