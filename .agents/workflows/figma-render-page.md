---
description: Phân tích link figma tạo file plan, tạo page và template theo số lượng phân tích từ figma sau đó gắn template vào page.
---

# Workflow: `/figma-render-page`

> **Mục tiêu:** Từ một Figma URL/node-id → phân tích trang → tạo file plan → tạo WordPress Page (draft) → tạo N Bricks Templates trống → gắn templates vào page → báo cáo sẵn sàng render.

---

## Input

- Figma URL hoặc node-id (ví dụ: `3641-1142`)
- Tên page slug (ví dụ: `author-profile`)
- Tên page hiển thị (ví dụ: `Author Profile`)

---

## Output

- **Plan file:** `.agents/plans/[slug].md`
- **WordPress Page** (draft) với N template widgets đã gắn
- **N Bricks Templates trống** (1 template/section, bỏ qua header/footer)

---

## ⚠️ FRESH START — Bắt buộc đầu mỗi lần chạy

- Không dùng lại context, plan file, hay dữ liệu Figma từ session trước
- Ghi đè file plan cũ nếu cùng slug — không append

---

## PHASE 0 — Kiểm tra MCP Connection

> Gọi **song song** — 2 check độc lập, không có dependency, tiết kiệm thời gian.

```
[song song]
[0a] mcp_bricks-mcp_get_site_info(action: "info")          → Bricks MCP
[0b] mcp_figma_get_design_context(node-id: [node_id])      → Figma MCP
```

| Bricks MCP | Figma MCP |                              Quyết định                              |
| :--------: | :-------: | :------------------------------------------------------------------: |
|     ✅     |    ✅     |                         ▶️ Tiếp tục Phase 1                          |
|     ❌     |  bất kỳ   |     ⛔ Dừng — báo user kiểm tra plugin `mcp-adapter` và WP site      |
|     ✅     |    ❌     | ⛔ Dừng — báo user kiểm tra Figma Desktop đang mở + `localhost:3845` |

---

## PHASE 1 — Phân tích Figma & Tạo File Plan

### 1A — Thu thập dữ liệu Figma [SONG SONG]

```
[song song — tất cả cùng lúc]
mcp_figma_get_design_context(desktop_node_id,
  artifactType: "WEB_PAGE_OR_APP_SCREEN",
  clientFrameworks: "bricks-builder",
  clientLanguages: "html,css,javascript,php")

mcp_figma_get_metadata(mobile_node_id)       → lấy section-level child node IDs của mobile

mcp_figma_get_screenshot(desktop_node_id)    → visual reference desktop
mcp_figma_get_screenshot(mobile_node_id)     → visual reference mobile (nếu có)
```

Sau khi `get_metadata(mobile_node_id)` trả về → parse XML để **map mobile node ID** cho từng section:

- Đọc các `<frame>` con trực tiếp của mobile root node (bỏ qua frame đầu là menu/header)
- Match với section desktop theo thứ tự (S1, S2, ... SN)
- Điền vào plan: `Node Mobile: [node-id]` cho từng section

Nếu `get_design_context` lỗi → thử lại tối đa 2 lần → báo user, dừng.

### 1B — Trích xuất Global Design Variables

Từ kết quả `get_design_context`, trích xuất **Design Variables dùng chung toàn trang**:

| Nhóm                 | Thông tin cần lấy                                                 |
| -------------------- | ----------------------------------------------------------------- |
| **Colors**           | Token name → Hex (ví dụ: `primary-700: #007CFC`)                  |
| **Typography**       | Token → Font / Size / Weight / Line-height                        |
| **Spacing & Radius** | Giá trị → Mô tả dùng (ví dụ: `80px → Section padding top/bottom`) |
| **Images**           | URL `localhost:3845/assets/...` + tên mô tả                       |

> Đây là Global — áp dụng nhất quán cho toàn bộ sections.

### 1C — Phân tích từng section

Chỉ phân tích các section **nội dung** (bỏ qua Header, Footer → đánh dấu [SKIP]).

Với mỗi section:

**A. Widget tree (desktop)** — BẮT buộc đầy đủ:
- Tên widget: `section`, `container`, `block`, `heading`, `text-basic`, `image`, `button`, `slider-nested`...
- Ghi kèm settings quan trọng trong ngoặc đơn (flex-direction, gap, width, bg color, border-radius)
- ⚠️ **Hierarchy bắt buộc:** Con trực tiếp của `section` luôn là `container`. KHÔNG bao giờ là `block`.
- ⚠️ **`container` chỉ ở depth 1** ngay dưới `section`. Bên trong `block` hoặc slide → chỉ dùng `block` và leaf widgets.
- **Inline mobile flags** — đánh dấu ngay trong tree với:
  - `[DC]` = DIRECTION-CHANGE (flex-direction khác)
  - `[AM]` = ABSENT-MOBILE (không xuất hiện trên mobile)
  - `[SC]` = SIZE-CHANGE (width/height/font khác)

**B. Element count** — Phải có công thức rõ ràng:
```
• SIMPLE/MEDIUM  : đếm tổng elements trực tiếp
• COMPLEX có card: (elements/card × số card) + structure + pagination = TỔNG
• Nếu TOTAL > 60  : đánh dấu ⚠️ TOKEN-RISK
```

**C. Image URLs** — Liệt kê TẤT CẢ, không "… (+ N more)":
- Format: `[Mô tả]: http://localhost:3845/assets/[hash].ext`
- Với card grid: map cụ thể `Card [N] ([category]): [url]`
- Bắt buộc lấy từ Figma code `const img... = "[hash]"` → reconstruct URL

**D. Build Flags** — Phát hiện và ghi rõ (có thể nhiều flag cùng lúc):
| Flag | Điều kiện |
|------|----------|
| `[G2-RISK]` | Có block `flex-row` cần giữ hàng trên mobile |
| `[MASK-IMAGE]` | Có element dùng mask-image CSS |
| `[PLACEHOLDER]` | ≥3 items có cùng nội dung (title/excerpt giống nhau) |
| `[TOKEN-RISK]` | Element count > 60 → cần compact response khi build |
| `[DYNAMIC]` | Section nên dùng Query Loop (user đã yêu cầu) |
| `[SLIDER]` | Cần `slider-nested` |

**E. Mobile Diff Table** — Bắt buộc có bảng (KHÔNG để trống, KHÔNG viết “1-2 cột”):
- So sánh desktop vs mobile node làm 1 row/element
- Ghi cụ thể Bricks key cần set

**F. Gotchas** — CSS phức tạp, quirks Bricks, biết tất cả và ghi rõ

### 1D — Ghi File Plan (ngay, không cần chờ confirm)

> Ghi đè nếu file cũ đã tồn tại. User sẽ tự xem qua file sau.

**File:** `.agents/plans/[slug].md`

```markdown
# Plan: [Tên Page]

**Slug:** [slug]
**Figma Node Desktop:** [node-id]
**Figma Node Mobile:** [node-id hoặc "none"]
**Ngày tạo:** [YYYY-MM-DD]

---

## 1. Tổng quan

- Viewport: [px] | Max-width: [px]
- Tổng sections (không tính Header/Footer): [N]
- WordPress Page ID: (Phase 2)

---

## 2. Design Variables (Global)

### Colors

| Token       | Hex     | Dùng trong            |
| ----------- | ------- | --------------------- |
| primary-700 | #007CFC | Button, icon gradient |
| ...         | ...     | ...                   |

### Typography

| Token | Font  | Size | Weight | Line Height |
| ----- | ----- | ---- | ------ | ----------- |
| h1    | Inter | 56px | 800    | 72px        |
| ...   | ...   | ...  | ...    | ...         |

### Spacing & Radius

| Giá trị | Dùng trong                 |
| ------- | -------------------------- |
| 80px    | Section padding top/bottom |
| ...     | ...                        |

---

## 3. Sections

### [S1] [Tên Section]

- **Node Desktop:** [node-id]
- **Node Mobile:** [node-id]
- **Complexity:** SIMPLE / MEDIUM / COMPLEX
- **Build flags:** `[G2-RISK]` `[MASK-IMAGE]` `[TOKEN-RISK]` `[PLACEHOLDER]` *(chỉ liệt kê các flag áp dụng)*
- **Widget tree:** *(inline mobile flags: `[DC]`=direction-change, `[AM]`=absent-mobile, `[SC]`=size-change)*
```
section ([key settings])
└─ container ([width, flex-direction, gap]) [DC]
   ├─ block ([settings]) ← mô tả vai trò
   │  ├─ heading "[text]" [SC: 36px→24px mobile]
   │  └─ text-basic "[text]"
   └─ block ([settings]) [AM] ← ẩn trên mobile
      └─ image ([src])
```
- **Element count:** [N structure] + [M cards × K elem/card] = **[TOTAL]** `(TOKEN-RISK nếu >60)`
- **Images:** *(liệt kê TẤT CẢ URL — không "… (+ N more)")*
  - Background: `http://localhost:3845/assets/[hash].ext`
  - Card 1 ([category]): `http://localhost:3845/assets/[hash].ext`
  - Card 2 ([category]): `http://localhost:3845/assets/[hash].ext`
  - Icon: `http://localhost:3845/assets/[hash].svg`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---------|---------|--------|------------|
  | section | padding: 40px | py-32 px-16 | `_padding:mobile_portrait` |
  | [block] | flex-row | column-reverse | `_direction:mobile_portrait` |
  | [text]  | 36px | 24px | `_typography:mobile_portrait` |
  | [elem]  | visible | hidden | `_display:mobile_portrait: "none"` |

  > ⚠️ Mọi element có diff phải có 1 row. KHÔNG để trống.

- **Gotchas:** [nếu có]
- **Template ID:** (Phase 2)
- **Status:** pending

### [S2] ...

### [S3] ...
```

---

## PHASE 2 — Tạo Page (draft) + Templates trống + Gắn vào Page

### 2A — Tạo WordPress Page (draft)

```
mcp_bricks-mcp_content(action: "create",
  post_type: "page",
  title: "[Tên Page]",
  slug: "[slug]",
  status: "draft")
→ Lưu page_id
```

Cập nhật plan file: `WordPress Page ID: [page_id]`

### 2B — Tạo Bricks Templates trống [SONG SONG]

Gọi **song song** cho tất cả sections (bỏ qua [SKIP]):

```
[song song — tất cả cùng lúc]
mcp_bricks-mcp_template(action: "create", type: "section",
  title: "[Slug] - S1 - [Tên]", status: "publish")  → template_id_S1
mcp_bricks-mcp_template(action: "create", type: "section",
  title: "[Slug] - S2 - [Tên]", status: "publish")  → template_id_S2
...
```

> ⚠️ Template trống — chưa có content. Content sẽ được build bởi `/bricks-render-section`.

**Verify sau khi tạo xong — BẮT BUỘC:**

```
Kiểm tra:
  □ Số templates tạo được = số sections trong plan (không tính [SKIP])
  □ Mỗi template_id trả về hợp lệ (không null, không lỗi)
  □ Title đúng format: "[Slug] - S[N] - [Tên Section]"
```

Nếu bất kỳ template nào fail → tạo lại riêng lẻ cho template đó → verify lại.
Chỉ tiếp tục 2C khi **100% templates đã tạo thành công**.

Cập nhật plan file với tất cả template_ids:

```
→ .agents/plans/[slug].md: Template ID từng section
→ WordPress Page ID đã có từ 2A
```

### 2C — Gắn Templates vào Page [1 LẦN]

Sau khi đủ N template_ids, gắn tất cả vào page **cùng 1 lần call** theo đúng thứ tự section:

```
mcp_bricks-mcp_content(action: "update_content",
  post_id: [page_id],
  elements: [
    { "id": "[6-char-id]", "name": "template", "parent": 0, "children": [],
      "settings": { "template": [template_id_S1] } },
    { "id": "[6-char-id]", "name": "template", "parent": 0, "children": [],
      "settings": { "template": [template_id_S2] } },
    ...
  ])
```

Verify — BẮT BUỘC sau khi gắn:

```
mcp_bricks-mcp_content(action: "get",
  post_id: [page_id],
  view: "summary")
→ Kiểm tra:
  □ Tổng số elements = N (đúng số sections)
  □ Đúng thứ tự: S1 → S2 → ... → SN
  □ Không có template nào bị thiếu
```

Nếu verify fail → debug: so sánh IDs trong elements với template_ids đã tạo → gọi lại `update_content` với list đầy đủ → verify lại.

---

## PHASE 3 — Báo cáo & Chuyển giao

> ⛔ **KHÔNG tự động bắt đầu flow tiếp theo trong mọi trường hợp.** Chỉ báo cáo và dừng.

```
✅ figma-render-page hoàn thành!

📄 File plan   : .agents/plans/[slug].md
📋 WordPress Page (draft):
   ID   : [page_id]
   URL  : [site_url]/[slug]/
   Edit : [site_url]/wp-admin/post.php?post=[page_id]&action=bricks

📦 Templates đã tạo và gắn vào page ([N] sections):
   S1: "[Tên]" — Template ID: [id] — Status: pending
   S2: "[Tên]" — Template ID: [id] — Status: pending
   ...

📌 Bước tiếp theo (khi bạn sẵn sàng):
   Gọi /bricks-render-section để build từng section.
```

**AI dừng hoàn toàn tại đây.** Không tự gọi `/bricks-render-section`, không hỏi "bắt đầu section nào?", không làm thêm bất kỳ hành động nào.

---

## Tóm tắt flow

```
PHASE 0 ── [song song] Bricks MCP check + Figma MCP check
              ↓ (cả 2 ✅)
PHASE 1A ── [song song] get_design_context + get_metadata(mobile) + screenshot desktop + screenshot mobile
              └─ parse get_metadata XML → map mobile node ID cho từng section
PHASE 1B ── Trích xuất Global Design Variables (Colors, Typography, Spacing/Radius, Images)
PHASE 1C ── Phân tích từng section: [SKIP] Header/Footer, widget tree + inline mobile flags [DC/AM/SC],
            element count (công thức), image URLs (TẤT CẢ), build flags, Mobile Diff Table, gotchas
PHASE 1D ── Ghi .agents/plans/[slug].md ngay (không chờ confirm) — user tự xem
              ↓ (tự động)
PHASE 2A ── Tạo WordPress Page (draft) → lưu page_id vào plan
PHASE 2B ── [song song] Tạo N Bricks Templates trống (1/section) → verify 100% → lưu template_ids vào plan
PHASE 2C ── Gắn N template widgets vào page (đúng thứ tự) → verify
PHASE 3 ─── Báo cáo hoàn thành → chỉ dẫn /bricks-render-section
```
