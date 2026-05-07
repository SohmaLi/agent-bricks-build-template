# Widget: `container`

> **Source:** `bricks/includes/elements/container.php`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `div`

`block` và `div` đều extend `Element_Container` — có chung toàn bộ settings này.

---

## Content Controls

### HTML Tag
| Key | Type | Options |
|-----|------|---------|
| `tag` | select | `div`, `section`, `a`, `article`, `nav`, `ol`, `ul`, `li`, `aside`, `address`, `figure`, `custom` |
| `customTag` | text | Bất kỳ tag HTML (khi `tag = "custom"`) |

### Link (khi tag = "a")
| Key | Type | Mô tả |
|-----|------|-------|
| `link` | link | URL + target cho container link |

---

## Layout Controls (Content tab — chỉ layout elements)

### Display
| Key | CSS | Options |
|-----|-----|---------|
| `_display` | `display` | `flex` (default), `grid`, `block`, `inline-block`, `inline`, `none` |

### Flex Controls (khi `_display = "flex"`)
| Key | CSS Property | Options / Ví dụ |
|-----|-------------|----------------|
| `_direction` | `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` |
| `_flexWrap` | `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `_justifyContent` | `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` |
| `_alignItems` | `align-items` | `flex-start`, `flex-end`, `center`, `stretch`, `baseline` |
| `_alignSelf` | `align-self` | `flex-start`, `flex-end`, `center`, `stretch` |
| `_columnGap` | `column-gap` | `"24px"`, `"1rem"` |
| `_rowGap` | `row-gap` | `"16px"` |
| `_flexGrow` | `flex-grow` | `0`, `1` |
| `_flexShrink` | `flex-shrink` | `0`, `1` |
| `_flexBasis` | `flex-basis` | `"auto"`, `"50%"`, `"300px"` |
| `_order` | `order` | `-1`, `0`, `1`, `2` |

### Grid Controls (khi `_display = "grid"`)
| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridGap` | `grid-gap` | `"24px"` |
| `_gridTemplateColumns` | `grid-template-columns` | `"repeat(3, 1fr)"`, `"1fr 2fr 1fr"` |
| `_gridTemplateRows` | `grid-template-rows` | `"auto 1fr auto"` |
| `_gridAutoColumns` | `grid-auto-columns` | `"minmax(200px, 1fr)"` |
| `_gridAutoRows` | `grid-auto-rows` | `"200px"` |
| `_gridAutoFlow` | `grid-auto-flow` | `row`, `column`, `dense` |
| `_justifyItemsGrid` | `justify-items` | `start`, `end`, `center`, `stretch` |
| `_alignItemsGrid` | `align-items` | `start`, `end`, `center`, `stretch` |
| `_justifyContentGrid` | `justify-content` | standard values |
| `_alignContentGrid` | `align-content` | standard values |

### Grid Item (khi parent dùng `display: grid`)
| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridItemColumnSpan` | `grid-column` | `"1 / 3"`, `"span 2"` |
| `_gridItemRowSpan` | `grid-row` | `"1 / 3"`, `"span 2"` |

---

## Shared Style Keys

Kế thừa từ `base.php` — xem [README.md](README.md) để biết đầy đủ. Các key quan trọng nhất:

| Key | CSS | Ví dụ |
|-----|-----|-------|
| `_padding` | `padding` | `{"top":"40px","bottom":"40px","left":"24px","right":"24px"}` |
| `_margin` | `margin` | `{"top":"0","bottom":"0","left":"auto","right":"auto"}` |
| `_width` | `width` | `"100%"`, `"1200px"` |
| `_height` | `height` | `"400px"` |
| `_position` | `position` | `"relative"`, `"absolute"` |
| `_top`, `_right`, `_bottom`, `_left` | top/right/bottom/left | `"0px"` |
| `_zIndex` | `z-index` | `1` |
| `_overflow` | `overflow` | `"hidden"` |
| `_background` | background | `{"color":{"hex":"#f2f3f5"}}` |
| `_border` | border + border-radius | `{"radius":{"top":"24px","right":"24px","bottom":"24px","left":"24px"}}` |
| `_cssCustom` | raw CSS | `"%root% { box-shadow: inset 0 0 24px rgba(0,124,252,0.2); }"` |

---

## Sự khác biệt giữa `container`, `block`, `div`

| Widget | Khác biệt thực tế | Khi nào dùng |
|--------|------------------|-------------|
| `container` | Bricks tự thêm `max-width` và `margin: auto` theo site settings → có inner wrapper | Level 1 trong section, layout chính |
| `block` | Không có auto max-width → full-width theo parent | Level 2+ layout wrapper trong container |
| `div` | Giống `block`, tag mặc định cũng `div`, nhưng khác về label trong editor | Dùng khi muốn element thuần `div` không nhầm với `block` |

> **Quy tắc project:** `container` chỉ là con trực tiếp của `section`. `block`/`div` cho tất cả level sâu hơn.

---

## Ví dụ JSON

### Container 2-col flex
```json
{
  "id": "ctnRow",
  "name": "container",
  "parent": "secXXX",
  "settings": {
    "_display": "flex",
    "_direction": "row",
    "_alignItems": "flex-start",
    "_columnGap": "24px",
    "_padding": {"top": "40px", "bottom": "40px"}
  }
}
```

### Block absolute overlay
```json
{
  "id": "blkOverlay",
  "name": "block",
  "parent": "ctnRow",
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "1",
    "_cssCustom": "/* Editor: %root% / API: #brxe-blkOverlay */ #brxe-blkOverlay {\n  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%);\n}"
  }
}
```

### Block grid 3x2
```json
{
  "id": "blkGrid",
  "name": "block",
  "parent": "ctnInner",
  "settings": {
    "_display": "grid",
    "_gridTemplateColumns": "repeat(3, 1fr)",
    "_gridGap": "24px"
  }
}
```

### Container inset shadow + border-radius
```json
{
  "id": "ctnCard",
  "name": "container",
  "parent": "blkGrid",
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_rowGap": "16px",
    "_padding": {"top": "24px", "bottom": "24px", "left": "24px", "right": "24px"},
    "_border": {
      "radius": {"top": "16px", "right": "16px", "bottom": "16px", "left": "16px"},
      "width": {"top": "1px", "right": "1px", "bottom": "1px", "left": "1px"},
      "style": "solid",
      "color": {"hex": "rgba(0,124,252,0.5)"}
    },
    "_cssCustom": "/* API push: dùng #brxe-ctnCard thay %root% */ #brxe-ctnCard {\n  box-shadow: inset 0 0 24px rgba(0, 124, 252, 0.2);\n}"
  }
}
```
