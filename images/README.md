# Thư mục: images/

Thư mục này dùng để lưu trữ **ảnh download thủ công** từ Figma khi Cách 1 (localhost:3845) không khả dụng.

## Khi nào dùng

| Tình huống | Hành động |
|-----------|-----------|
| Figma MCP trả về `localhost:3845/assets/[hash]` URL | ✅ Dùng Cách 1 — không cần download |
| URL không load được / image private | ⬇️ Download → lưu vào thư mục này → nhờ user upload lên WP |
| Image cần chỉnh sửa trước khi upload | Lưu vào đây để xử lý |

## Quy trình Cách 2 (Upload WP)

```
1. Download image từ Figma
2. Lưu vào images/[tên-mô-tả].[ext]
3. Báo user: "Cần upload file images/[tên] lên WordPress Media Library"
4. User upload → lấy WP URL → cập nhật vào section file
5. Build JSON dùng WP URL thay vì localhost URL
```

## Đặt tên file

Dùng tên mô tả nội dung, kebab-case:
```
hero-bg-desktop.png
author-avatar.jpg
cert-badge-cdmp.svg
```

> **Lưu ý:** Thư mục này KHÔNG được commit vào git nếu chứa ảnh có bản quyền.
> Thêm `images/*.png`, `images/*.jpg` vào `.gitignore` nếu cần.
