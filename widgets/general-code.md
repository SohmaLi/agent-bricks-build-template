# Widget: `code`

> **Source:** `bricks/includes/elements/code.php`
> **Category:** general

Widget để chạy PHP/HTML code, CSS, JavaScript. Nếu không enable "Execute code" sẽ hiển thị code snippet có syntax highlighting.

---

## Content Controls

### Execute Mode (khi `executeCode = true`)

| Key | Type | Mô tả |
|-----|------|-------|
| `executeCode` | checkbox | Bật chế độ execute code (cần quyền trong Bricks Settings) |
| `parseDynamicData` | checkbox | Parse dynamic data trong code trước khi execute |
| `supressPhpErrors` | checkbox | Suppress PHP errors (dùng `?brx_code_errors` để xem lỗi) |
| `noRoot` | checkbox | Render không có div wrapper (style tab không áp dụng) |
| `code` | code (PHP+HTML) | PHP & HTML code |
| `cssCode` | code (CSS) | CSS tự động wrap trong `<style>` |
| `javascriptCode` | code (JavaScript) | JS tự động wrap trong `<script>` |

### Display Mode (khi `executeCode = false`)

| Key | Type | Mô tả |
|-----|------|-------|
| `code` | code | Code để hiển thị như snippet |
| `cssCode` | code | CSS snippet |
| `javascriptCode` | code | JS snippet |
| `prettify` | select | Theme syntax highlighting: `github`, `tomorrow`, `tomorrow-night`, `tranquil-heart` |

---

## Lưu ý bảo mật

- `executeCode` yêu cầu quyền **Code Execution** trong Bricks Settings → Builder Access
- PHP code cần được ký bằng `signature` (Bricks tự tạo khi save)
- Code SVG trong `svg` widget cũng dùng `Element_Code` để execute

---

## Ví dụ JSON

### Execute PHP code
```json
{
  "id": "codeCustom",
  "name": "code",
  "parent": "blkContent",
  "settings": {
    "executeCode": true,
    "code": "<?php\n  $date = date('Y');\n  echo '<p>Copyright © ' . $date . '</p>';\n?>",
    "cssCode": ".copyright { color: #888; font-size: 14px; }"
  }
}
```

### Code snippet display
```json
{
  "id": "codeSnippet",
  "name": "code",
  "parent": "blkTutorial",
  "settings": {
    "code": "npm install -g bricks-cli",
    "prettify": "tomorrow-night"
  }
}
```
