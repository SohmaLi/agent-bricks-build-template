---
description: Audit và đồng bộ dữ liệu của các Bricks templates. So sánh JSON thực tế với Plan và Figma để đảm bảo tính nhất quán của Design System.
---

# Workflow: Restore Bricks Template (Design Data Audit)

## Input
- Slug của plan file (ví dụ: `blog-author-profile`)
- Note file từ Flow 2: `.agents/notes/[slug]-templates.md`

## Output
- **Báo cáo Audit:** `.agents/audit/[slug]-result.md`
- **Kết quả:** Đồng bộ hóa các thông số sai lệch hoặc thông báo "Design Verified".

## Điều kiện chạy
> Chạy sau khi tất cả các section trong `/bricks-create-template` đã được build và user xác nhận "ok" sơ bộ.

---

## GIAI ĐOẠN 1: Thu thập dữ liệu tổng hợp

### Bước 1.1 — Đọc dữ liệu nguồn
Đọc đồng thời 3 nguồn:
1.  `.agents/plans/[slug].md`: Lấy Design Variables (Color Palette, Font sizes, Spacing rules).
2.  `.agents/notes/[slug]-templates.md`: Lấy danh sách Template IDs.
3.  `mcp_figma_get_design_context`: Để có cái nhìn tổng quan (Macro) về toàn bộ thiết kế, tránh rơi rớt element.

### Bước 1.2 — Lấy JSON thực tế từ site
Với mỗi template ID trong Note file, gọi:
```
mcp_bricks-mcp_content(action: "get", post_id: [id])
```
Hợp nhất tất cả các `elements[]` từ các section vào một "Global JSON Map" để phân tích xuyên suốt trang.

---

## GIAI ĐOẠN 2: Chạy Audit (Design Linter)

AI tiến hành "soi" Global JSON Map theo các tiêu chuẩn sau:

### 2.1 — Audit Design System (Độ chính xác thông số)
- **Colors:** Tìm các hex code trong `settings`. Nếu phát hiện màu nào không nằm trong Color Palette của Plan nhưng lại có độ tương đồng cao (ví dụ lệch vài tone) → Đánh dấu là "Invalid Color".
- **Typography:** Kiểm tra font-family, font-size, line-height. So sánh với các Typography Token ở Flow 1.
- **Spacing:** Kiểm tra padding/margin. Các giá trị nên tuân theo hệ thống (ví dụ: chia hết cho 4 hoặc 8).

### 2.2 — Audit Tài nguyên & Dữ liệu
- **Media Check:** Đảm bảo tất cả widget `image` đều có `attachment_id` thực tế và ID đó tồn tại trong hệ thống.
- **Dynamic Data Check:** Rà soát các cú pháp `{...}`. Nếu plan yêu cầu dynamic nhưng build đang dùng static text hoặc ngược lại → Ghi chú lỗi.

### 2.3 — Audit Cấu trúc & Logic
- **Missing Elements:** Dựa trên Figma Context, kiểm tra xem có block/element nào trong thiết kế nhưng chưa xuất hiện trong bất kỳ template nào không?
- **CSS Isolation:** Kiểm tra xem có class CSS nào bị trùng tên ở các section khác nhau nhưng mang thuộc tính khác nhau không (tránh xung đột hiển thị).
- **%root% Verify:** Đảm bảo 100% `_cssCustom` sử dụng đúng biến `%root%` để target element.

---

## GIAI ĐOẠN 3: Xử lý & Đồng bộ

### 3.1 — Tạo báo cáo Audit
Ghi file: `.agents/audit/[slug]-result.md`

```markdown
# Audit Report: [Tên Page]

## 📊 Thống kê tổng quan
- Tổng số templates: [N]
- Tổng số elements: [M]
- Trạng thái: ⚠️ Cần đồng bộ / ✅ Design Verified

## 🔍 Kết quả chi tiết

### Item 1: Màu sắc không đồng nhất
- **Phát hiện:** `color: #0875e1` tại [Element ID] thuộc Section 2.
- **Kỳ vọng:** `#007cfc` (Brand Color).
- **Hành động:** Propose Auto-fix

### Item 2: Thiếu Element thiết kế
- **Phát hiện:** Dải "Copyright text" ở Footer Figma chưa được build trong bất kỳ section nào.

### Item 3: Lỗi cú pháp CSS
- **Phát hiện:** `_cssCustom` tại [Element ID] thiếu `%root%`.
```

### 3.2 — Quy trình Khắc phục (Sync Protocol)
Thay vì tự động sửa ngay lập tức, AI tuân thủ:

1.  **Phân loại lỗi:**
    - `Lỗi Typo/Thông số`: Sai mã màu, sai font size, thiếu `%root%`.
    - `Lỗi logic/thiếu hụt`: Thiếu element, sai parent-child.
2.  **Đề xuất:** AI liệt kê danh sách các thay đổi sẽ thực hiện vào báo cáo Audit.
3.  **Xác nhận:** AI hỏi: *"Tôi phát hiện [N] lỗi thông số có thể tự động đồng bộ. Bạn có đồng ý để tôi fix chúng không?"*
4.  **Hành động:** Chỉ gọi `update_content` sau khi user gõ "ok". Với lỗi logic (thiếu element), AI đề xuất hướng rebuild section đó ở Flow 2.

### 3.3 — Báo cáo kết quả cuối cùng
- Cập nhật dòng "Design Audit: ✅ PASS" vào Note file sau khi đã fix.
- Thông báo cho user link các template đã được đồng bộ chuẩn thiết kế.

---

## GIAI ĐOẠN 4: Page Assembly (Lắp ghép)
AI gợi ý thứ tự shortcode hoặc ID template để user dán vào Page chính trong WordPress để tạo thành trang hoàn chỉnh.
