---
description: Khi tạo xong section sẽ thực thi kiểm tra template có giống với figma không nếu không giống sẽ tự restore build lại đến khi giống với figma thì báo cáo.
---

# Workflow: `/review-render-section`

> **Mục tiêu:** Sau khi `/bricks-render-section` push xong → so sánh template với Figma → nếu sai thì tự restore & rebuild → khi đạt fidelity thì cập nhật plan và báo cáo.

> ⚠️ **Template đã được gắn vào page từ Phase 2 của `/figma-render-page`** — flow này KHÔNG gắn lại.

---

## Input

- Plan file: `.agents/plans/[slug].md` (có Template ID + Node IDs)
- Section vừa build: S[N]
- Screenshot từ user (nếu cần visual check)

---

## Output

- Template đã đạt fidelity với Figma
- Plan file được cập nhật Status = `done`

---

## ⚠️ Quy tắc Review

```
MAX_RETRIES = 3   — tối đa 3 lần rebuild trước khi leo thang báo user
PASS_THRESHOLD:
  - Cấu trúc element tree: 100% khớp
  - Text content: 100% khớp
  - Layout (gap/padding/direction): ≥ 95%
  - Visual (color/font-size): ≥ 90%

GÉT BẮT BUỘC (không được bỏ qua):
  [G1] Element count Figma vs Bricks PHẢI khớp — nếu không khớp → tự động FAIL
  [G2] RULE 4D KHÔNG phải auto-pass — mọi discrepancy về count đều phải rebuild
  [G3] Sau mỗi retry → BẮT BUỘC nhờ user Ctrl+S + chụp screenshot → DỪNG chờ
       KHÔNG tự chấm pass sau retry khi chưa có visual confirm từ user
```

---

## BƯỚC 1 — Thu thập thông tin kiểm tra

```
[Song song]
[1a] mcp_bricks-mcp_content(action: "get",
       post_id: [template_id],
       view: "summary")        → element tree hiện tại

[1b] mcp_figma_get_design_context([desktop_node_id])  → Figma ground truth desktop
[1c] mcp_figma_get_screenshot([desktop_node_id])       → Visual reference desktop
[1d] mcp_figma_get_design_context([mobile_node_id])   → Figma ground truth mobile (nếu có)
```

---

## BƯỚC 2 — So sánh & Chấm điểm

Tạo bảng so sánh:

```
SO SÁNH FIGMA vs BRICKS — Section [N]: [Tên]
=============================================
Hạng mục              | Figma              | Bricks hiện tại    | Match?
----------------------|--------------------|---------------------|--------
[G1] Element count    | [N]                | [M]                 | ✅/❌ ← NẾU ❌ → FAIL NGAY
Root element type     | section            | [type]              | ✅/❌
Children structure    | [mô tả]            | [mô tả]             | ✅/❌
Text [heading]        | "[text]"           | "[text]"            | ✅/❌
Text [subtext]        | "[text]"           | "[text]"            | ✅/❌
Padding section       | top:[px] bot:[px]  | top:[px] bot:[px]   | ✅/❌
Gap main row          | [px]               | [px]                | ✅/❌
Font-size heading     | [px]               | [px]                | ✅/❌
Color heading         | #[hex]             | #[hex]              | ✅/❌
Image src             | [url]              | [url]               | ✅/❌
Mobile: direction     | column             | [value]             | ✅/❌
Mobile: padding       | [px]               | [px]                | ✅/❌
...
```

> ⛔ **[G1] Element Count Gate:** Nếu count Figma ≠ count Bricks → **FAIL ngay, không cần chấm tiếp.**
> Không có ngoại lệ RULE 4D tại bước này — RULE 4D chỉ được áp dụng khi user đã confirm trước.

### Tính điểm tổng hợp

```
Cấu trúc  : [X]/[Y] items khớp → [Z]%
Text       : [X]/[Y] items khớp → [Z]%
Layout     : [X]/[Y] items khớp → [Z]%
Visual     : [X]/[Y] items khớp → [Z]%
```

---

## BƯỚC 3 — Quyết định

### Trường hợp A — PASS (≥ threshold)

```
✅ PASS: Section [N] đạt fidelity!
  Cấu trúc: [Z]% | Text: [Z]% | Layout: [Z]% | Visual: [Z]%
→ Cập nhật plan & báo cáo (BƯỚC 4)
```

### Trường hợp B — FAIL (< threshold)

```
❌ FAIL: Phát hiện [N] sai lệch:
  [1] Text "[field]": Figma = "[A]", Bricks = "[B]"
  [2] Padding section: Figma = [X]px, Bricks = [Y]px
  [3] Missing element: "[tên element]" không có trong Bricks
  ...

→ Auto-rebuild (BƯỚC 3B)
```

### BƯỚC 3B — Auto-Rebuild (tối đa 3 lần)

```
Retry #[N]/3:
1. Liệt kê TẤT CẢ sai lệch từ bảng so sánh
2. Lấy lại exact values từ Figma (nếu cần)
3. Cập nhật JSON — chỉ sửa các fields sai, giữ nguyên fields đúng
4. Push lại:
   mcp_bricks-mcp_content(action: "update_content",
     post_id: [template_id],
     elements: [...])
5. Verify tree:
   mcp_bricks-mcp_content(action: "get",
     post_id: [template_id], view: "summary")
6. [G3] BẮT BUỘC: Nhắc user Ctrl+S + chụp screenshot → DỪNG chờ
   → "Bạn vui lòng: Mở Bricks Editor → Ctrl+S → chụp screenshot section [N] gửi vào chat"
   → AI DỪNG — KHÔNG tự chấm điểm lại khi chưa có screenshot
7. Sau khi có screenshot từ user → quay lại BƯỚC 2 — chấm điểm lại
```

**Sau 3 lần vẫn FAIL:**
```
⚠️ Sau 3 lần rebuild vẫn còn sai lệch:
Sai lệch còn lại:
  [1] ...
  [2] ...

Gợi ý:
  - [A] Chấp nhận mức hiện tại và tiếp tục
  - [B] Cung cấp screenshot để tôi phân tích thêm
  - [C] Điều chỉnh thủ công trong Bricks Editor

👉 Bạn muốn làm gì?
```

> **DỪNG.** Chờ user quyết định. KHÔNG tự ý báo pass khi chưa đạt threshold.

---

## BƯỚC 4 — Cập nhật Plan file & Báo cáo

### 4A — Cập nhật plan file

```
.agents/plans/[slug].md → Section [S[N]] → Status: done
```

### 4B — Báo cáo hoàn thành & DỪNG

```
✅ Review PASS — Section [N]: "[Tên]"
📊 Fidelity: Cấu trúc [Z]% | Text [Z]% | Layout [Z]% | Visual [Z]%
🔗 Template: [site_url]/wp-admin/post.php?post=[template_id]&action=bricks

📌 Sections còn lại:
  ⏳ S[N+1]: [Tên] — status: ok  ← chưa build
  ✅ S[N-1]: [Tên] — status: done

⏸ AI DỪNG — Gọi /bricks-render-section S[N+1] khi sẵn sàng.
```

---

## Tóm tắt flow

```
BƯỚC 1: get template summary + get_design_context + get_screenshot [SONG SONG]
BƯỚC 2: Tạo bảng so sánh Figma vs Bricks → chấm điểm
BƯỚC 3: PASS → BƯỚC 4 | FAIL → auto-rebuild (max 3 lần)
         → Sau 3 lần fail: DỪNG, hỏi user
BƯỚC 4: Cập nhật plan file status → "done" + báo cáo → AI DỪNG
```

---

## Ghi chú quan trọng

- **Template đã gắn sẵn vào page** từ `/figma-render-page` Phase 2 — KHÔNG gắn lại
- **KHÔNG publish page** cho đến khi TẤT CẢ sections đều `done`
- **KHÔNG dùng browser_subagent** — nếu cần visual check: nhờ user chụp screenshot gửi vào chat
- **`_cssCustom` cần Ctrl+S:** Nhắc user mở Bricks Editor → Ctrl+S để render CSS custom
