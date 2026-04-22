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
