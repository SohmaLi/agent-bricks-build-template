---
description: Doc file plan tu figma-create-plan-template va tao Bricks templates cho tung section. Moi section = 1 template trong Bricks. Ghi ket qua vao Notes.
---

# Workflow: Bricks Create Template

> **Reference bắt buộc:** Đọc `.agents/notes/bricks-mcp-reference.md` trước khi build bất kỳ template nào.

## Input
- Tên slug của plan file (ví dụ: `blog-author-hero`)
- Plan file đọc từ: `.agents/plans/[slug].md`

## Output
- N Bricks templates được tạo trên site (mỗi section = 1 template)
- Images được download về: `.agents/images/[slug]/`
- File note: `.agents/notes/[slug]-templates.md`

---

## ⚠️ Quy tắc TUYỆT ĐỐI – Vi phạm sẽ sinh ra template lỗi

| Rule | Đúng | SAI |
|------|------|-----|
| Layout engine | Dùng `section`, `container`, `block`, `div` native | ❌ Dùng `html` element cho layout |
| CSS injection | Dùng settings keys đã verified | ❌ Dùng `_cssCustom`, `set_page_css` |
| Element nesting | `section → container → block → [widgets]` | ❌ `html` bao hết |
| Settings keys | Chỉ dùng keys từ reference doc hoặc real templates | ❌ Tự đặt key không verified |
| Browser agent | KHÔNG dùng browser agent để build template | ❌ Browser agent cho Bricks UI |
| Image placeholder | Luôn có attachment_id trước khi build image element | ❌ src="" rỗng |

---

## GIAI ĐOẠN 1: Đọc & Phân tích Plan

### Bước 1.1 — Đọc plan file
Đọc: `.agents/plans/[slug].md`

Ghi lại:
- Site URL, Bricks version
- Danh sách sections cần build (bỏ nhãn `[SKIP]`)
- Variables từng section (bg, spacing, colors, radius)
- Danh sách images từ mục "Images trong section này"

### Bước 1.2 — Load Reference Settings
Đọc file: `.agents/notes/bricks-mcp-reference.md`

Xác nhận settings keys cho mỗi widget sẽ dùng:
- `section`: `_padding`, `_background`, `_border`, `_position`, `_overflow`
- `container`: `_direction`, `_alignItems`, `_columnGap`, `_padding`, `_rowGap`
- `block`: `_direction`, `_alignItems`, `_justifyContent`, `_width`, `_background`, `_border`, `_rowGap`, `_columnGap`, `_padding`, `_overflow`, `_position`, `_alignSelf`, `_flexShrink`
- `heading`: `text`, `tag`, `_typography`, `_margin`, `_alignSelf`
- `text-basic`: `text`, `tag`, `_typography`, `_padding`, `_alignSelf`
- `image`: `image.id`, `image.url`, `image.size`, `_position`, `stretch`, `_objectFit`, `_width`, `_height`, `_border`
- `button`: `text`, `link.url`, `_typography`, `_background`, `_border`, `_padding`

### Bước 1.3 — Mapping Figma → Bricks

Với mỗi section trong plan, tạo bảng mapping:
| Figma element | Bricks widget | Settings keys cần dùng |
|--------------|--------------|------------------------|
| Outer section | `section` | `_padding`, `_background.color` |
| Inner container (bg#f2f3f5, radius 24px) | `block` | `_background.color`, `_border.radius`, `_overflow` |
| Background overlay image (absolute, opacity) | `image` | `_position: "absolute"`, `stretch: true`, `_objectFit: "cover"` |
| 2-col row | `container` hoặc `block` | `_direction: "row"`, `_columnGap` |
| Col left (flex-col) | `block` | `_direction: "column"`, `_rowGap`, `_width`, `_padding` |
| Title "ĐẶNG TUẤN" | `heading` | `tag: "h1"`, `text`, `_typography` |
| Subtitle text | `heading` hoặc `text-basic` | `tag: "custom"`, `customTag: "p"`, `_typography` |
| Bio text | `text-basic` | `text`, `_typography` |
| Cert image | `image` | `image.id`, `_width`, `_height` |
| CTA button | `button` | `text`, `link`, `_background`, `_border`, `_padding` |
| Profile photo | `image` | `image.id`, `_width`, `_height`, `_objectFit` |

### Bước 1.4 — Bảng kế hoạch build

| # | Section | Template Slug | Status |
|---|---------|--------------|--------|
| 1 | Hero | `[slug]-hero` | ⏳ |

---

## GIAI ĐOẠN 2: Chuẩn bị Images

> **Quan trọng:** `image` element trong Bricks PHẢI có `attachment_id` hợp lệ. Không dùng placeholder src rỗng.

### Bước 2.1 — Download images từ Figma local server
Với mỗi image trong plan:
```bash
curl -o ".agents/images/[slug]/[name].png" "http://localhost:3845/assets/[hash].png"
```

### Bước 2.2 — Upload lên WP Media Library
Có 2 cách:

**Cách A: Dùng `mcp_bricks-mcp_media(action: "sideload")`**
```
mcp_bricks-mcp_media(
  action: "sideload",
  url: "http://localhost:3845/assets/[hash].png",
  filename: "[name].png",
  alt_text: "[mô tả]"
)
→ Lấy attachment_id từ response
```
> Thử cách này trước — nếu site có thể fetch localhost:3845 thì sẽ work.

**Cách B: User upload thủ công**
- User upload 4 files lên WP Admin > Media
- User cung cấp attachment_id cho AI
- AI mới tiến hành build template

### Bước 2.3 — Ghi attachment_ids vào bảng
| Tên | File local | Attachment ID | WP URL |
|-----|-----------|--------------|--------|
| hero-bg | `.agents/images/[slug]/hero-bg.png` | ??? | ??? |
| profile-photo | `.agents/images/[slug]/profile-photo.png` | ??? | ??? |

---

## GIAI ĐOẠN 3: Build Templates

### Bước 3.1 — Tạo template rỗng
```
mcp_bricks-mcp_template(
  action: "create",
  type: "section",
  title: "[slug]-[ten-section]",
  status: "publish"
)
```
→ Lưu `template_id`.

### Bước 3.2 — Build elements array

**Quy tắc elements array:**
1. Mỗi element: `{"id": "abc123", "name": "widget", "parent": "parentId", "settings": {...}}`
2. Root section: `"parent": "0"` (string, không phải integer)
3. IDs: 6 ký tự alphanumeric (ví dụ: `"a1b2c3"`)
4. Không cần set `children` array — Bricks tự tính
5. Thứ tự trong array = thứ tự render

**Template pattern cho section có 2-col layout:**
```json
[
  {
    "id": "secAAA",
    "name": "section",
    "parent": "0",
    "settings": {
      "_padding": {"top": "40px", "bottom": "40px", "left": "40px", "right": "40px"}
    }
  },
  {
    "id": "blkBG",
    "name": "block",
    "parent": "secAAA",
    "settings": {
      "_background": {"color": {"hex": "#f2f3f5"}},
      "_border": {"radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"}},
      "_overflow": "hidden",
      "_position": "relative"
    }
  },
  {
    "id": "imgBG",
    "name": "image",
    "parent": "blkBG",
    "settings": {
      "image": {"id": ATTACHMENT_ID, "url": "WP_URL", "size": "full"},
      "_position": "absolute",
      "stretch": true,
      "_objectFit": "cover"
    }
  },
  {
    "id": "ctnRow",
    "name": "container",
    "parent": "blkBG",
    "settings": {
      "_direction": "row",
      "_alignItems": "flex-end",
      "_columnGap": "24px",
      "_zIndex": "1"
    }
  },
  {
    "id": "blkL",
    "name": "block",
    "parent": "ctnRow",
    "settings": {
      "_direction": "column",
      "_rowGap": "24px",
      "_padding": {"top": "64px", "bottom": "64px"},
      "_width": "684px",
      "_flexShrink": "0"
    }
  },
  {
    "id": "txtSub",
    "name": "text-basic",
    "parent": "blkL",
    "settings": {
      "text": "<p>Chuyên viên R&D</p>",
      "tag": "p",
      "_typography": {
        "font-size": "18px",
        "font-weight": "500",
        "line-height": "30px",
        "font-family": "Inter",
        "color": {"hex": "#282829"}
      }
    }
  },
  {
    "id": "hdgName",
    "name": "heading",
    "parent": "blkL",
    "settings": {
      "text": "ĐẶNG TUẤN",
      "tag": "h1",
      "_typography": {
        "font-size": "44px",
        "font-weight": "700",
        "line-height": "56px",
        "font-family": "Inter",
        "color": {"hex": "#282829"}
      }
    }
  },
  {
    "id": "txtBio",
    "name": "text-basic",
    "parent": "blkL",
    "settings": {
      "text": "<p>Bio paragraph 1</p><p>Bio paragraph 2</p>",
      "_typography": {
        "font-size": "18px",
        "font-weight": "400",
        "line-height": "30px",
        "color": {"hex": "#282829"}
      }
    }
  },
  {
    "id": "imgCert",
    "name": "image",
    "parent": "blkL",
    "settings": {
      "image": {"id": CERT_ID, "url": "CERT_URL", "size": "full"},
      "_width": "144px",
      "_height": "60px"
    }
  },
  {
    "id": "btnCTA",
    "name": "button",
    "parent": "blkL",
    "settings": {
      "text": "Xem bài chia sẻ",
      "link": {"url": "#"},
      "_background": {"color": {"hex": "#007cfc"}},
      "_border": {
        "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
      },
      "_padding": {"top": "12px", "bottom": "12px", "left": "32px", "right": "32px"},
      "_typography": {"color": {"hex": "#fcfcfc"}, "font-size": "18px", "font-weight": "500"}
    }
  },
  {
    "id": "blkR",
    "name": "block",
    "parent": "ctnRow",
    "settings": {
      "_alignSelf": "stretch",
      "_alignItems": "center",
      "_justifyContent": "flex-end",
      "_overflow": "hidden",
      "_position": "relative"
    }
  },
  {
    "id": "imgProfile",
    "name": "image",
    "parent": "blkR",
    "settings": {
      "image": {"id": PROFILE_ID, "url": "PROFILE_URL", "size": "full"},
      "_width": "520px",
      "_height": "520px",
      "_objectFit": "cover",
      "_position": "absolute",
      "_bottom": "0"
    }
  }
]
```

### Bước 3.3 — Gọi update_content
```
mcp_bricks-mcp_content(
  action: "update_content",
  post_id: [template_id],
  elements: [... array trên ...]
)
```

### Bước 3.4 — Verify
```
mcp_bricks-mcp_content(action: "get", post_id: [template_id])
```
Kiểm tra:
- Số elements đúng không
- parent/children relationships đúng không
- IDs trong children array khớp với elements

### Bước 3.5 — Fix nếu parent sai
```
mcp_bricks-mcp_content(
  action: "move",
  element_id: "[element-id-thực-tế]",
  post_id: [template_id],
  target_parent_id: "[parent-id-thực-tế]",
  position: 0
)
```

---

## GIAI ĐOẠN 4: Ghi file Note

File: `.agents/notes/[slug]-templates.md`

```markdown
# Note: Templates – [Tên Page]
**Plan:** `.agents/plans/[slug].md`
**Images:** `.agents/images/[slug]/`
**Site:** [site_url] | Bricks [version]
**Ngày:** [YYYY-MM-DD]

## Templates

| # | Template | ID | Edit URL | Status |
|---|----------|----|----------|--------|
| 1 | [slug]-hero | [id] | [url] | ✅/❌ |

## Images

| File | Attachment ID | Dùng trong element |
|------|--------------|-------------------|
| hero-bg.png | [id] | imgBG |
| profile-photo.png | [id] | imgProfile |

## Lỗi
- [ ] Chưa fix...
```

---

## Thứ tự xử lý khi có nhiều sections

1. Build **tất cả sections song song** nếu không phụ thuộc nhau
2. Mỗi section là 1 template độc lập
3. Ghi note sau khi build xong tất cả
4. Chạy `/restore-bricks-template` để review tổng thể
