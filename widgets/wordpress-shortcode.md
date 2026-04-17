# Widget: `shortcode`

> **Source:** `bricks/includes/elements/shortcode.php`
> **Category:** wordpress

Execute WordPress shortcode và render output.

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `shortcode` | textarea | `"[contact-form-7 id=\"123\"]"` | Shortcode string |
| `showPlaceholder` | checkbox | — | Không render trong builder (chỉ frontend) |
| `placeholderWidth` | number+unit | `"800px"` | Width placeholder trong builder |
| `placeholderHeight` | number+unit | `"400px"` | Height placeholder trong builder |

---

## Lưu ý

- Render trong `<div>` wrapper với root attributes
- Hỗ trợ dynamic data trong shortcode string
- Nếu shortcode là Bricks template → render không có wrapper

---

## Ví dụ JSON

### Contact form shortcode
```json
{
  "id": "scContactForm",
  "name": "shortcode",
  "parent": "blkForm",
  "settings": {
    "shortcode": "[contact-form-7 id=\"123\" title=\"Contact form\"]",
    "showPlaceholder": true,
    "placeholderHeight": "300px"
  }
}
```

### WooCommerce product shortcode
```json
{
  "id": "scProducts",
  "name": "shortcode",
  "parent": "ctnProducts",
  "settings": {
    "shortcode": "[products limit=\"4\" columns=\"4\" orderby=\"popularity\"]"
  }
}
```
