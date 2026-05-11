---
description: Khi tạo xong section sẽ thực thi kiểm tra template có giống với figma không nếu không giống sẽ tự restore build lại đến khi giống với figma thì báo cáo.
---

# Workflow: `/review-render-section`

> **Mục tiêu:** Chạy ARI script → chụp ảnh thực tế → so sánh Figma → tự rebuild nếu sai → báo cáo khi pass.

---

## Gates bắt buộc

| Gate | Quy tắc |
|---|---|
| **[G1]** Element count | Figma vs Bricks PHẢI khớp — không khớp → FAIL |
| **[G3]** Sau retry | PHẢI chạy lại ARI → lấy PNG mới → mới được chấm |
| **[G6]** ARI mandatory | KHÔNG chấm Visual nếu chưa có PNG từ ARI script |
| **[G7]** Layout ≠ Images | Images blank = expected. Layout sai = FAIL dù images blank |

**Pass threshold:** Cấu trúc 100% · Text 100% · Layout ≥95% · Visual ≥90% · Mobile ≥90%

**Max retries:** 3 lần rebuild trước khi leo thang báo user.

---

## BƯỚC 1 — Chạy ARI Script

### 1A — Chuẩn bị (từ plan file)

- `page_id` → URL: `http://localhost:8000/?page_id=[page_id]`
- `root_element_id` → ID section root (vd: `s2sc01`)
- `section_slug` → tên file output (vd: `S2-Coduyen`)

> ⚠️ Dùng `?page_id=` KHÔNG phải `?bricks_preview=` — template preview không giữ custom element IDs.
> ⚠️ Nếu section có `_cssCustom` → nhắc user **Ctrl+S trong Bricks Editor** trước khi chạy ARI.

### 1B — Chạy song song

```bash
# Terminal (cwd: bricks_mcp/)
node .agents/scripts/bricks-inspector.js \
  "http://localhost:8000/?page_id=[page_id]" \
  "[root_element_id]" \
  "[section_slug]"
```

```
# Figma reference (song song khi script đang chạy)
mcp_figma_get_screenshot(desktop_node_id)
mcp_figma_get_screenshot(mobile_node_id)
```

### 1C — Output cần có

```
.agents/images/[slug]-desktop.png   ← so sánh với Figma desktop
.agents/images/[slug]-mobile.png    ← so sánh với Figma mobile
.agents/logs/[slug]-desktop-audit.json
.agents/logs/[slug]-mobile-audit.json
```

> Nếu script lỗi: kiểm tra WP site chạy · `.env` có đủ keys · `playwright install chromium`.

---

## BƯỚC 2 — So sánh & Chấm điểm

### 2A — Visual (PNG so sánh)

**[G7]** So layout TRƯỚC — đếm elements, hướng flex, vị trí khối — rồi mới xét màu/images.

```
Desktop checklist:
□ Số elements/cột đúng?
□ Spacing (padding, gap) gần đúng?
□ Typography (size, weight) đúng?
□ Colors, border-radius, shadows?

Mobile checklist:
□ Stack order đúng?
□ Images nằm trong card (không rơi ra)?
□ Font size responsive đúng?
□ Padding mobile?
```

### 2B — Deep Audit (audit.json)

```
□ padding, border khớp Figma?
□ Flex: tổng width children + gap ≤ parent width?
□ Typography: font-size là số (không phải [object Object])?
□ Colors: hex/rgb đúng?
□ Mobile: đọc file mobile-audit.json riêng
```

### 2C — Bảng so sánh [OUTPUT BẮT BUỘC]

```
SO SÁNH FIGMA vs BRICKS — Section [N]: [Tên]
================================================
Hạng mục           | Figma      | Bricks(ARI) | Match?
-------------------|------------|-------------|-------
[G1] Element count | [N]        | [M]         | ✅/❌
Layout tổng thể    | [mô tả]    | [từ PNG]    | ✅/❌
Padding section    | [px]       | [audit]     | ✅/❌
Gap/spacing        | [px]       | [audit]     | ✅/❌
Typography heading | [px]/[w]   | [audit]     | ✅/❌
Background color   | #[hex]     | [audit]     | ✅/❌
Mobile stack order | text→img   | [mobile PNG]| ✅/❌
[G5] Mobile diff   | [plan key] | [audit mob] | ✅/❌
```

---

## BƯỚC 3 — Quyết định

### PASS → BƯỚC 4

### FAIL → Auto-rebuild (max 3 lần)

```
Retry #[N]/3:
1. Liệt kê TẤT CẢ sai lệch từ bảng + audit.json
2. Lấy exact values từ mcp_figma_get_design_context nếu cần
3. LUÔN dùng update_content (KHÔNG dùng update partial)
4. [G3] Chạy lại ARI ngay → lấy PNG mới
5. Quay BƯỚC 2 chấm lại
```

**Sau 3 lần vẫn FAIL:**

```
⚠️ Sau 3 lần rebuild vẫn còn sai lệch:
  [1] ...  [2] ...

Bạn muốn:
  [A] Chấp nhận và tiếp tục
  [B] Chỉnh thủ công trong Bricks Editor
  [C] Gửi screenshot để phân tích thêm
```

> DỪNG — chờ user. KHÔNG tự pass khi chưa đạt threshold.

---

## BƯỚC 4 — Cập nhật Plan & Báo cáo

```
.agents/plans/[slug].md → Section [SN] → Status: done
```

```
✅ Review PASS — Section [N]: "[Tên]"
📊 Cấu trúc [Z]% | Text [Z]% | Layout [Z]% | Visual [Z]% | Mobile [Z]%
🖼️  Desktop: .agents/images/[slug]-desktop.png
📱 Mobile:  .agents/images/[slug]-mobile.png

📌 Sections còn lại: S[N+1] (pending) ...
⏸ AI DỪNG — Gọi /bricks-render-section S[N+1] khi sẵn sàng.
```
