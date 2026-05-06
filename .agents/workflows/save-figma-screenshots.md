---
description: Tải và lưu ảnh sử dụng trong template (từ localhost:3845/assets/ hoặc Figma) về thư mục images/ trong project. Dùng khi cần lưu ảnh template để tham chiếu hoặc tái sử dụng.
---

# Workflow: Save Template Images

## Mục đích
Tải các ảnh được liệt kê trong section `## Images` của file template về local `images/` folder.

## Input
- File template: `.agents/template/[prefix]-s[N]-[name].md`
- Hoặc URL trực tiếp từ section `## Images` trong template

## Output
- File ảnh trong `.../bricks_mcp/images/[tên-file]`

---

## Bước 1 — Đọc danh sách ảnh từ template

Mở file template, tìm section `## Images`:
```markdown
## Images
| Tên | URL |
|-----|-----|
| hero-bg | http://localhost:3845/assets/abc123hash.png |
| tab-image | http://localhost:3845/assets/def456hash.png |
```

## Bước 2 — Tải ảnh về `images/`

// turbo
```bash
mkdir -p /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/images/
curl -o /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/images/[tên-file].png \
     "http://localhost:3845/assets/[hash].png"
```

**Ví dụ tải nhiều ảnh cùng lúc:**
```bash
cd /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/images/

curl -o vps-landing-s10-tab-bg.png  "http://localhost:3845/assets/0a45e17ae0a85a9d33c603b8f80eb71bace8b4a4.png"
curl -o vps-landing-s10-hero.png    "http://localhost:3845/assets/[hash2].png"
```

**Convention tên file:**
```
[slug]-s[N]-[tên-ảnh].png
→ ví dụ: vps-landing-s10-tab-bg.png
→ ví dụ: vps-landing-s1-hero.png
```

## Bước 3 — Xác nhận

```bash
ls -lh /Users/truongduylinh/Documents/Web/project_mcp/bricks_mcp/images/
```

---

## Ghi chú

- **Source URL:** `http://localhost:3845/assets/[hash]` — server Figma MCP local, cần Figma Desktop đang chạy
- **Không dùng** `mcp_bricks-mcp_media(sideload)` — không upload lên WP
- Ảnh trong `images/` là **permanent** trong project
- Sau khi lưu, cập nhật lại URL trong template file nếu muốn dùng local path thay vì `localhost:3845`
