# THÔNG TIN THỰC THI (INFOR_TODO.MD)

_Người dùng điền các thông tin thiết kế và yêu cầu vào đây để AI đọc ở đầu mỗi quy trình._

---

## 📌 THÔNG TIN THIẾT KẾ & TRANG ĐÍCH

- **Chế độ thiết kế**: figma _(chọn: `figma` hoặc `prompt` — quyết định đọc mục nào bên dưới)_
- **Figma Desktop Node URL**:
- **Figma Mobile Node URL**:
- **Tên trang / Template (Title)**:
- **Loại nội dung**: page

---

## ✍️ THIẾT KẾ KHÔNG DÙNG FIGMA (Prompt-based)

_Chỉ điền mục này khi **Chế độ thiết kế = prompt** (không có file Figma, build trực tiếp từ mô tả bên dưới). Bỏ trống nếu dùng Figma. Dán nguyên văn prompt/mô tả thiết kế vào đây — không cần chia field, AI sẽ tự đọc và hỏi lại nếu thiếu thông tin quan trọng (trang cần tạo, section, nội dung...)._

```
```

> 📖 **Đọc `todo/rules/prompt_mode_rules.md` trước khi PLAN** — quy trình + mốc nghiệm thu đầy đủ cho chế độ này.
>
> 💡 Vì không có Figma làm mốc so khớp pixel, gate review cuối sẽ dựa trên: đúng yêu cầu mô tả ở trên + nhất quán giữa các trang + gate kỹ thuật (JSON hợp lệ, không lỗi cắt chữ/line-clamp, không tràn ngang mobile — chạy `validate_mobile_overflow.py --page-id <id> --viewport 390` trên từng page thật trước khi báo DONE, xem `bricks_rules.md` §21/§23) — không có bước "so khớp pixel" như quy trình Figma.

---

## ⚙️ TRẠNG THÁI & HÀNH ĐỘNG HỆ THỐNG

- **Quy trình yêu cầu thực thi**: Wait
- **Trạng thái công việc hiện tại**: Ready
- **Dọn dẹp phiên làm việc cũ (Cleanup)**: no

> 📖 **Giá trị hợp lệ** (AI chỉ nhận các giá trị này, không suy diễn):
>
> - Quy trình yêu cầu thực thi: `Wait` (chờ, không làm gì) | `Do` (bắt đầu thực thi — user đặt sau khi điền đủ thông tin)
> - Trạng thái công việc hiện tại: `Ready` (sẵn sàng nhận việc) | `Doing` (AI đang thực thi) | `Done` (đã xong, chờ user review) — AI cập nhật, user chỉ đọc
> - Cleanup: `yes` | `no`

> 💡 **Khi Cleanup = yes**: Đọc và thực hiện theo `skills/bricks-skills/CLEANUP.md`
> — Xóa các file output phiên cũ, giữ lại công cụ/kiến thức, sau đó reset file này.

> ⏱️ **Giữ phiên nhanh (user tự gõ — AI không chạy được 2 lệnh này)**:
>
> 1. **Trước khi đặt `Do`**: gõ `/clear` để bắt đầu với context sạch (hội thoại cũ không liên quan làm mọi lượt sau chậm hơn — phiên 2026-11-06 mang theo 88k token thừa).
> 2. **Khi AI xin xác nhận plan**: kiểm tra plan, gõ `/compact` rồi trả lời `Tiếp tục`. Số liệu Figma đã nằm trong file plan nên không mất gì.
>
> Ngoài 2 điểm này **không** `/compact` (nhất là giữa vòng sửa lỗi G4).

---

## 📝 GHI CHÚ THÊM CỦA NGƯỜI DÙNG

_(Nếu có các lưu ý đặc biệt về font chữ, màu sắc, hoặc các yêu cầu logic phức tạp, vui lòng ghi tại đây)
