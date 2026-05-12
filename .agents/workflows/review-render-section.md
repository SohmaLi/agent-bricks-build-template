---
description: Khi tạo xong section sẽ thực thi kiểm tra template có giống với figma không nếu không giống sẽ tự restore build lại đến khi giống với figma thì báo cáo.
---

# Workflow: `/review-render-section`

> **Mục tiêu:** Tự động hóa việc kiểm tra: Chạy ARI script (Thực tế) + Lấy ảnh Figma (Thiết kế) → AI tự so sánh hình ảnh → Tự sửa nếu lệch layout → Báo cáo bằng hình ảnh.

---

## 🛠️ Chốt chặn (Gates) & Tư duy Review

| Gate | Mô tả |
|---|---|
| **[G1] Visual Match** | AI tự đặt 2 ảnh cạnh nhau. Layout, vị trí khối phải khớp Figma ≥95%. |
| **[G2] Layout Priority** | Kiểm tra bố cục (flex, gap, alignment) TRƯỚC khi xét nội dung/màu sắc. |
| **[G3] Tự soi - Tự sửa** | Nếu ảnh chưa khớp, AI tự động tìm nguyên nhân và rebuild (max 3 lần) trước khi báo bạn. |
| **[G4] Báo cáo thị giác** | Báo cáo PASS bắt buộc phải đính kèm cả ảnh Figma và ảnh Thực tế. |

---

## BƯỚC 1 — Thu thập dữ liệu đối soát

### 1A — Chạy ARI Script (Thực tế)
```bash
# Lấy ảnh thực tế và thông số render từ trình duyệt
node .agents/scripts/bricks-inspector.js "[URL]" "[root_id]" "[slug]"
```

### 1B — Lấy ảnh Figma (Thiết kế gốc)
```
mcp_figma_get_screenshot(desktop_node_id)
mcp_figma_get_screenshot(mobile_node_id)
```
*(Dùng để làm thước đo chuẩn cho Bước 2)*

---

## BƯỚC 2 — So sánh & Đánh giá (Audit)

### 2A — Layout & Structure (G2 Priority)
So sánh dựa trên PNG và `audit.json`:
- Đếm số lượng phần tử lặp lại (Card, Item).
- Hướng Flex (`_direction`) và khoảng cách (`gap`).
- Hierarchy (`section > container > block`).

### 2B — Kỹ thuật chi tiết (Checklist lỗi)
- **LỖI 9**: Kiểm tra typography render (`font-size` có bị `[object Object]` không?).
- **G2 (Quirk)**: Kiểm tra mobile wrap (có bị nhảy dòng không?).
- **LỖI 1**: Kiểm tra background image có bị tách block dư không?

### 2C — Bảng so sánh Audit
*(Giữ nguyên logic bảng so sánh, thêm cột "Mã lỗi (nếu có)")*

---

## BƯỚC 3 — Tự động sửa lỗi (RULE 13)
- Nếu FAIL: Liệt kê mã lỗi → Tra cứu `widgets/*.md` → **Viết lại JSON mới** (không copy mẫu).
- Max retry: 3 lần.

---

## BƯỚC 4 — Báo cáo Kết quả (Visual Report)

Khi đã khớp (hoặc hết lượt retry):
1. Cập nhật Status vào Plan là `done`.
2. Báo cáo bằng bằng chứng hình ảnh:

```markdown
✅ **Review PASS — Section [N]: "[Tên]"**

---
#### 🖼️ SO SÁNH TRỰC QUAN (Layout Fidelity)
![Figma Design]([đường_dẫn_ảnh_figma])
![Bricks Actual]([đường_dẫn_ảnh_bricks_ari])

> **Nhận xét của AI:** Layout đã khớp hoàn toàn về vị trí các khối, khoảng cách gap và font chữ. 
> Element count: [N] (Match).
---

📌 Sections còn lại: S[N+1] (pending) ...
⏸ AI DỪNG — Chờ xác nhận từ bạn để tiếp tục.
```
