# Widget: `heading`

> **Source:** `bricks/includes/elements/heading.php`
> **Category:** basic | **Tag mặc định:** `h3`

---

## Content Controls

| Key | Type | Options / Ví dụ | Ghi chú |
|-----|------|----------------|---------|
| `text` | text | `"Tiêu đề của bạn"` | Hỗ trợ dynamic data |
| `tag` | select | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `custom` | Default: `h3` |
| `customTag` | text | Any HTML tag | Chỉ hiện khi `tag = "custom"` |
| `type` | select | `hero`, `lead` | Optional style type |
| `style` | select | theme styles | Optional color style |
| `link` | link | `{"url": "#", "newTab": false}` | Wrap heading trong `<a>` |

### Separator Group (ít dùng)
| Key | Mô tả |
|-----|-------|
| `separator` | `right`, `left`, `both`, `none` |
| `separatorWidth` | Width của separator line |
| `separatorHeight` | Height của separator line |
| `separatorSpacing` | Gap giữa text và separator |
| `separatorStyle` | `solid`, `dashed`, `dotted` |
| `separatorColor` | Color object |
| `separatorAlignItems` | Align tổng thể |

---

## Style Controls (Style tab)

Kế thừa từ `base.php`. Các key hay dùng nhất:

| Key | Giá trị ví dụ |
|-----|--------------|
| `_typography` | Xem bên dưới |
| `_margin` | `{"top": "0px", "bottom": "16px"}` |
| `_padding` | ít dùng cho heading |
| `_cssCustom` | `"%root% { text-shadow: 0 2px 8px rgba(0,0,0,0.2); }"` |

### `_typography` object
```json
{
  "_typography": {
    "font-family": "Inter",
    "font-size": "44px",
    "font-weight": "700",
    "line-height": "1.2",
    "letter-spacing": "-0.02em",
    "color": {"hex": "#282829"},
    "text-align": "left",
    "text-transform": "none"
  }
}
```

Các sub-keys của `_typography`:
| Sub-key | Ví dụ |
|---------|-------|
| `font-family` | `"Inter"`, `"Be Vietnam Pro"` |
| `font-size` | `"44px"`, `"2rem"` |
| `font-weight` | `"400"`, `"600"`, `"700"` |
| `line-height` | `"1.2"`, `"56px"` |
| `letter-spacing` | `"-0.02em"`, `"0.05em"` |
| `color` | `{"hex": "#282829"}` hoặc `{"rgb": "rgba(40,40,41,1)"}` |
| `text-align` | `"left"`, `"center"`, `"right"` |
| `text-transform` | `"none"`, `"uppercase"`, `"capitalize"` |
| `text-decoration` | `"none"`, `"underline"` |
| `font-style` | `"normal"`, `"italic"` |

---

## Ví dụ JSON

### H1 tiêu đề chính
```json
{
  "id": "hdgTitle",
  "name": "heading",
  "parent": "blkLeft",
  "settings": {
    "text": "ĐẶNG TUẤN",
    "tag": "h1",
    "_typography": {
      "font-family": "Inter",
      "font-size": "44px",
      "font-weight": "700",
      "line-height": "1.27",
      "color": {"hex": "#282829"}
    }
  }
}
```

### H2 section title với màu brand
```json
{
  "id": "hdgSection",
  "name": "heading",
  "parent": "blkHeader",
  "settings": {
    "text": "Chuyên Môn",
    "tag": "h2",
    "_typography": {
      "font-family": "Inter",
      "font-size": "32px",
      "font-weight": "700",
      "color": {"hex": "#007cfc"},
      "text-align": "center"
    },
    "_margin": {"bottom": "8px"}
  }
}
```

### H4 card title
```json
{
  "id": "hdgCard",
  "name": "heading",
  "parent": "blkCardBody",
  "settings": {
    "text": "Tên Dịch Vụ",
    "tag": "h4",
    "_typography": {
      "font-size": "20px",
      "font-weight": "600",
      "color": {"hex": "#282829"},
      "line-height": "1.4"
    }
  }
}
```
