# Widget: `slider-nested`

> **Source:** `bricks/includes/elements/slider-nested.php`
> **Category:** media | **Nestable:** true | **Scripts:** bricksSplide (Splide.js v4)

Slider/carousel nestable — mỗi slide là một block nestable chứa bất kỳ element nào. Powered by Splide.js.

---

## Control Groups

| Group | Mô tả |
|-------|-------|
| `options` | Cấu hình Splide |
| `slide` | Style từng slide |
| `arrows` | Arrows prev/next |
| `pagination` | Dots/bullets |

---

## Options Group

| Key | Type | Default | Mô tả |
|-----|------|---------|-------|
| `optionsType` | select | `"default"` | `"custom"` để dùng JSON options tùy chỉnh |
| `options` | code (JSON) | — | Custom Splide options khi `optionsType = "custom"` |
| `type` | select | `"loop"` | `"loop"`, `"slide"`, `"fade"` |
| `direction` | select | `"ltr"` | `"ltr"`, `"rtl"`, `"ttb"` (vertical) |
| `height` | number+unit | `50vh` | Chiều cao slider |
| `autoHeight` | checkbox | — | Auto height theo slide active |
| `gap` | number+unit | `0` | Khoảng cách giữa slides |
| `perPage` | number | `1` | Số slides hiển thị cùng lúc |
| `perMove` | number | `1` | Số slides scroll mỗi lần |
| `speed` | number (ms) | `400` | Animation speed |
| `start` | number | `0` | Index bắt đầu |
| `focus` | number/`"center"` | — | Slide nào là active khi perPage > 1 |
| `autoplay` | checkbox | — | Autoplay |
| `interval` | number (ms) | `3000` | Interval khi autoplay |
| `pauseOnHover`, `pauseOnFocus` | checkbox | — | Pause khi hover/focus |
| `rewind` | checkbox | — | Rewind (chỉ khi type != loop) |
| `keyboard` | select | `"global"` | Keyboard nav |

---

## Slide Group (selector: `.splide__slide`)

| Key | Mô tả |
|-----|-------|
| `slidePadding` | Padding bên trong slide |
| `slideAlignHorizontal` | align-items |
| `slideAlignVertical` | justify-content |
| `slideBackground` | Background (image/color) |
| `slideBorder` | Border |

---

## Arrows Group (selector: `.splide__arrow`)

| Key | Mô tả |
|-----|-------|
| `arrows` | Hiện arrows |
| `arrowHeight`, `arrowWidth` | Kích thước (default: 50px) |
| `arrowBackground`, `arrowBorder`, `arrowColor`, `arrowSize` | Style |
| `prevArrow`, `nextArrow` | Custom icon |
| `prevArrowTop/Right/Bottom/Left` | Vị trí prev |
| `nextArrowTop/Right/Bottom/Left` | Vị trí next |
| `arrowDisabledBackground`, `arrowDisabledColor`, `arrowDisabledOpacity` | Style disabled |

> ✅ **Best practice — phân tách rõ:**
> - **Widget settings** → shape (size, border, color, disabled opacity)
> - **`_cssCustom`** → position only (top/bottom/left/right + overflow fix)
>
> ```json
> "_cssCustom": "%root% { overflow: visible; }\n%root% .splide__track { overflow: hidden; }\n%root% .splide__arrow { top: auto !important; bottom: -68px !important; transform: none !important; }\n%root% .splide__arrow--prev { left: calc(50% - 52px) !important; right: auto !important; }\n%root% .splide__arrow--next { right: auto !important; left: calc(50% + 4px) !important; }"
> ```

---

## Pagination Group (selector: `.splide__pagination`)

| Key | Mô tả |
|-----|-------|
| `pagination` | Hiện pagination dots |
| `paginationSize` | Kích thước dots |
| `paginationBackground`, `paginationBorder` | Style dot |
| `paginationBackgroundActive`, `paginationBorderActive` | Style active dot |

> ⚠️ **Gotcha:** `"pagination": false` **không đủ** để ẩn pagination dots trong một số trường hợp.
> Bắt buộc kết hợp thêm `_cssCustom`:
> ```json
> "_cssCustom": "%root% .splide__pagination { display: none !important; }"
> ```
---

## Ví dụ JSON

### Hero Slider
```json
{
  "id": "sliderHero",
  "name": "slider-nested",
  "settings": {
    "type": "fade",
    "height": "80vh",
    "autoplay": true,
    "interval": 5000,
    "pauseOnHover": true,
    "arrows": true,
    "pagination": true,
    "paginationBackground": {"hex": "#ffffff80"},
    "paginationBackgroundActive": {"hex": "#ffffff"},
    "arrowColor": {"hex": "#ffffff"},
    "arrowBackground": {"hex": "#00000040"}
  }
}
```

### Testimonials Carousel
```json
{
  "id": "sliderTestimonials",
  "name": "slider-nested",
  "settings": {
    "type": "loop",
    "perPage": 3,
    "perMove": 1,
    "gap": "24px",
    "height": "auto",
    "autoHeight": true,
    "autoplay": true,
    "interval": 4000,
    "arrows": false,
    "pagination": true
  }
}
```

---

## Pattern thực tế — Multi-card Carousel (3→1 col, arrows bên dưới)

> **Nguồn:** `template-blog-author-s3-su-kien` — verified hoạt động.

### Kết quả: 3 cards hiện thị desktop, 1 card mobile, arrows nằm dưới track.

```json
{
  "id": "s3bsld",
  "name": "slider-nested",
  "parent": "s3bctn",
  "children": ["s3bcd1", "s3bcd2", "s3bcd3"],
  "settings": {
    "_width": "1140px",
    "type": "loop",
    "perPage": 3,
    "perMove": 1,
    "gap": "24px",
    "arrows": true,
    "pagination": false,
    "autoHeight": false,

    "perPage:mobile_portrait": "1",
    "gap:mobile_portrait": "16px",

    "arrowBackground": {"color": {"hex": "transparent"}},
    "arrowBorder": {
      "color": {"hex": "#0f0f0f"},
      "radius": {"top": "999px", "right": "999px", "bottom": "999px", "left": "999px"},
      "style": "solid",
      "width": {"top": "1.5px", "right": "1.5px", "bottom": "1.5px", "left": "1.5px"}
    },
    "arrowColor": {"hex": "#0f0f0f"},
    "arrowDisabledOpacity": "0.2",
    "arrowHeight": "48",
    "arrowWidth": "48",
    "arrowSize": "16px",

    "_cssCustom": "#brxe-s3bsld { display: flex; flex-direction: column; overflow: visible; } #brxe-s3bsld .splide__track { overflow: hidden; order: 1; } #brxe-s3bsld .splide__arrows { order: 2; display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 20px; position: relative; } #brxe-s3bsld .splide__arrow { position: relative !important; top: auto !important; left: auto !important; right: auto !important; bottom: auto !important; } #brxe-s3bsld .splide__arrow--prev { transform: rotate(180deg) !important; } #brxe-s3bsld .splide__arrow--next { transform: none !important; } #brxe-s3bsld .splide__list { align-items: stretch; } #brxe-s3bsld .splide__slide { display: flex; } #brxe-s3bsld .splide__slide > div { flex: 1; } #brxe-s3bsld .splide__pagination { display: none !important; }"
  }
}
```

### ⚠️ Giải thích các key quan trọng

| Key | Giá trị | Lý do |
|-----|---------|-------|
| `perPage:mobile_portrait` | `"1"` | **Composite key** responsive — 3→1 col trên mobile ≤478px |
| `gap:mobile_portrait` | `"16px"` | **Composite key** — giảm gap trên mobile |
| `.splide__list { align-items: stretch }` | — | Cards bằng chiều cao nhau (equal-height) |
| `.splide__slide { display: flex }` | — | Bắt buộc để `flex: 1` trên con hoạt động |
| `.splide__slide > div { flex: 1 }` | — | Card block điền hết chiều cao slide |
| `pagination: false` + CSS `display: none !important` | — | Tắt chắc chắn — chỉ `false` chưa đủ |
| `overflow: visible` trên root, `hidden` trên `.splide__track` | — | Arrows có thể overflow ra ngoài track |

### Card slide (equal-height pattern)

```json
{
  "id": "s3bcd1",
  "name": "block",
  "parent": "s3bsld",
  "children": ["s3bim1", "s3btx1"],
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_background": {"color": {"hex": "#ffffff"}},
    "_border": {"radius": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"}},
    "_overflow": "hidden",
    "_padding": {"top": "8px", "bottom": "8px", "left": "8px", "right": "8px"},
    "_rowGap": "16px",
    "_cssCustom": "#brxe-s3bcd1{ border: 2px solid rgba(0,124,252,0.5); box-shadow: inset 0px 0px 24px 0px rgba(0,124,252,0.2); }"
  }
}
```

> ✅ Card dùng `_display: flex` + `_direction: column` → khi slide bằng chiều cao, card tự kéo dài.
> ✅ `_overflow: hidden` → border-radius clip ảnh bên trong.

