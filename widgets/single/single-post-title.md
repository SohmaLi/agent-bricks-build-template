# Widget: `post-title`

> **Source:** `bricks/includes/elements/post-title.php`
> **Category:** single | **Tag:** `h3` (default: `h1`)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị tiêu đề bài/trang hiện tại — dùng trong template single, archive.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `tag` | select | HTML tag: `h1` (default), `h2`-`h6` |
| `type` | select | `"hero"` → class `.bricks-type-hero`, `"lead"` → class `.bricks-type-lead` |
| `style` | select | Style preset: `primary`, `secondary`, ... |
| `linkToPost` | checkbox | Wrap title trong `<a>` link đến post |
| `context` | checkbox | Thêm context trên archive/search template |
| `prefix` | text | Text trước title → `<span class="post-prefix">` |
| `prefixSpacing` | number+unit → `.post-prefix` margin-inline-end | Khoảng cách prefix |
| `prefixBlock` | checkbox | Display prefix as block |
| `prefixSep` | separator | Separator group prefix style |
| `prefixTypography` | typography → `.post-prefix` | Typography prefix |
| `suffix` | text | Text sau title → `<span class="post-suffix">` |
| `suffixSpacing` | number+unit → `.post-suffix` margin-inline-start | Khoảng cách suffix |
| `suffixBlock` | checkbox | Display suffix as block |
| `suffixSep` | separator | Separator group suffix style |
| `suffixTypography` | typography → `.post-suffix` | Typography suffix |
| `titleInfo` | info | Thông báo khi title là placeholder |

---

## Ví dụ JSON

### Title trong single post template
```json
{
  "id": "ptSingle",
  "name": "post-title",
  "parent": "ctnPostHeader",
  "settings": {
    "tag": "h1",
    "linkToPost": false,
    "_typography": {
      "font-size": "40px",
      "font-weight": "800",
      "line-height": "1.2",
      "color": {"hex": "#282829"}
    },
    "_margin": {"bottom": "16px"}
  }
}
```

### Title trong posts loop (có link)
```json
{
  "id": "ptLoop",
  "name": "post-title",
  "parent": "ctnCard",
  "settings": {
    "tag": "h3",
    "linkToPost": true,
    "_typography": {
      "font-size": "20px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    }
  }
}
```
