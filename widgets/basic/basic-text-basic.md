# Widget: `text-basic`

> **Source:** `bricks/includes/elements/text-basic.php`
> **Category:** basic | **Tag mặc định:** `div`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget text đơn giản, render nội dung plain text / HTML bên trong tag.
Khác `text` (Rich Text) ở chỗ: không có toolbar phức tạp, nhẹ hơn, dùng cho paragraph, label, caption ngắn.

---

## Content Controls

| Key | Type | Options / Ví dụ | Ghi chú |
|-----|------|----------------|---------|
| `text` | textarea | `"<p>Nội dung văn bản</p>"` | Hỗ trợ basic HTML inline (b, i, a...) + dynamic data. Toolbar: style/align/link |
| `tag` | select | `div` (default), `p`, `span`, `figcaption`, `address`, `figure`, `custom` | HTML tag |
| `customTag` | text | Bất kỳ HTML tag | Chỉ khi `tag = "custom"` |
| `link` | link | `{"url": "#"}` | Chuyển element thành `<a>` |

> ⚠️ KHÔNG có `wordsLimit` / `readMore` — đây là sự nhầm lẫn. `text-basic` không hỗ trợ truncate.
> Dùng `text` (Rich Text) nếu cần truncate.

> **Lưu ý:** Khi `tag = "p"`, KHÔNG nên chứa HTML block-level (div, p khác, heading). Dùng `tag = "div"` nếu content có thể chứa HTML phức tạp.

---

## ⚠️ CRITICAL — `text-align` 

`text-align` phải nằm bên trong `_typography`, **không dùng standalone:**
```json
// ❌ SAI
{ "_textAlign": "center" }
// ✅ ĐÚNG
{ "_typography": { "text-align": "center", "font-size": "16px", "color": {"hex": "#fff"} } }
```

## Ví dụ JSON

### Paragraph đơn giản
```json
{
  "id": "txtDesc",
  "name": "text-basic",
  "parent": "blkContent",
  "settings": {
    "text": "<p>Chuyên viên nghiên cứu và phát triển với hơn 10 năm kinh nghiệm.</p>",
    "tag": "div",
    "_typography": {
      "font-size": "16px",
      "font-weight": "400",
      "line-height": "1.6",
      "color": {"hex": "#555555"}
    }
  }
}
```

### Label / Badge text
```json
{
  "id": "txtLabel",
  "name": "text-basic",
  "parent": "divBadge",
  "settings": {
    "text": "VPS",
    "tag": "span",
    "_typography": {
      "font-size": "12px",
      "font-weight": "600",
      "color": {"hex": "#007cfc"},
      "text-transform": "uppercase",
      "letter-spacing": "0.05em"
    }
  }
}
```

### Card subtitle/meta
```json
{
  "id": "txtMeta",
  "name": "text-basic",
  "parent": "blkCardMeta",
  "settings": {
    "text": "<p>12 Tháng 4, 2026 · 5 phút đọc</p>",
    "tag": "p",
    "_typography": {
      "font-size": "13px",
      "font-weight": "400",
      "color": {"hex": "#888888"}
    }
  }
}
```

### Text dùng dynamic data
```json
{
  "id": "txtPostTitle",
  "name": "text-basic",
  "parent": "blkCard",
  "settings": {
    "text": "{post_title}",
    "tag": "div",
    "_typography": {
      "font-size": "18px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    }
  }
}
```
