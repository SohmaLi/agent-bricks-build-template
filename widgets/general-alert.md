# Widget: `alert`

> **Source:** `bricks/includes/elements/alert.php`
> **Category:** general

Hộp thông báo với 5 kiểu (info, success, warning, danger, muted), có thể dismiss.

---

## Content Controls

| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `content` | editor | `"<p>Thông báo quan trọng</p>"` | Nội dung HTML |
| `type` | select | `"info"`, `"success"`, `"warning"`, `"danger"`, `"muted"` | Style class |
| `dismissable` | checkbox | — | Thêm nút X để đóng |

---

## CSS Classes Output

- `.alert` — wrapper chính
- `.alert.info` / `.alert.success` / `.alert.warning` / `.alert.danger` / `.alert.muted`
- `.alert.dismissable` — có nút close
- `.content` — nội dung bên trong

---

## Ví dụ JSON

### Alert info
```json
{
  "id": "altInfo",
  "name": "alert",
  "parent": "ctnContent",
  "settings": {
    "type": "info",
    "content": "<p><strong>Lưu ý:</strong> Tài khoản của bạn sẽ hết hạn vào ngày 30/12.</p>"
  }
}
```

### Alert success dismissable
```json
{
  "id": "altSuccess",
  "name": "alert",
  "parent": "blkNotify",
  "settings": {
    "type": "success",
    "content": "<p>✅ Đăng ký thành công! Kiểm tra email của bạn.</p>",
    "dismissable": true,
    "_background": {"color": {"hex": "#f0fff4"}},
    "_border": {
      "color": {"hex": "#22c55e"},
      "width": {"top": 1, "right": 1, "bottom": 1, "left": 4},
      "style": "solid"
    }
  }
}
```

### Alert warning
```json
{
  "id": "altWarn",
  "name": "alert",
  "parent": "ctnWarning",
  "settings": {
    "type": "warning",
    "content": "<p>⚠️ Một số tính năng không khả dụng trong chế độ demo.</p>",
    "_cssCustom": "%root% { border-radius: 8px; padding: 16px 20px; }"
  }
}
```
