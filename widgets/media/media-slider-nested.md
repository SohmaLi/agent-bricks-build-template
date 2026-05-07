# Widget: `slider-nested`

> **Source:** `bricks/includes/elements/slider-nested.php`
> **Category:** media | **Nestable:** true | **Scripts:** bricksSlider (Splide.js)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Slider nestable dùng Splide.js — mỗi slide là một nestable block, có thể chứa bất kỳ element nào.

> ⚠️ **KHÔNG nhầm với `slider`** (Swiper.js, có repeater items cố định). `slider-nested` = Splide.js + nestable content.

---

## Content Controls

### Slide Behavior
| Key | Type | Mô tả |
|-----|------|-------|
| `type` | select | `loop` (infinite), `slide` (rewind), `fade` |
| `perPage` | number | Số slides hiển thị cùng lúc (default: 1) |
| `perMove` | number | Số slides di chuyển mỗi lần |
| `start` | number | Index slide đầu (0-based) |
| `gap` | number+unit | Khoảng cách giữa slides |
| `height` | number+unit | Chiều cao slider |
| `direction` | select | `ltr` (default), `rtl`, `ttb` (vertical) |
| `focus` | select | `center`, `false` — focus slide active |
| `options` | text | Splide options JSON raw (override tất cả) |
| `optionsType` | select | Type của options |

### Autoplay
| Key | Type | Mô tả |
|-----|------|-------|
| `autoplay` | checkbox | Tự chạy |
| `interval` | number | Thời gian giữa các slide (ms, default: 3000) |
| `pauseOnHover` | checkbox | Dừng khi hover |
| `pauseOnFocus` | checkbox | Dừng khi focus |
| `autoplaySeparator` | separator | Separator group autoplay |

### Interaction
| Key | Type | Mô tả |
|-----|------|-------|
| `rewind` | checkbox | Quay lại slide đầu sau slide cuối |
| `rewindByDrag` | checkbox | Rewind khi kéo qua slide cuối |
| `rewindSpeed` | number | Tốc độ rewind animation (ms) |
| `rewindSeparator` | separator | Separator group rewind |
| `keyboard` | checkbox | Cho phép điều hướng bằng bàn phím |
| `speed` | number | Tốc độ transition (ms, default: 400) |
| `autoHeight` | checkbox | Chiều cao tự động theo nội dung slide |
| `autoHeightInfo` | info | Thông tin về autoHeight |

### Arrows (Navigation)
| Key | Type | Mô tả |
|-----|------|-------|
| `arrows` | checkbox | Hiện arrows |
| `prevArrow` | icon | Custom icon prev |
| `prevArrowTop` | text | Top position prev arrow |
| `prevArrowBottom` | text | Bottom position prev arrow |
| `prevArrowLeft` | text | Left position prev arrow |
| `prevArrowRight` | text | Right position prev arrow |
| `prevArrowTransform` | text | CSS transform prev arrow |
| `prevArrowSeparator` | separator | Separator group prev |
| `nextArrow` | icon | Custom icon next |
| `nextArrowTop` | text | Top position next arrow |
| `nextArrowBottom` | text | Bottom position next arrow |
| `nextArrowLeft` | text | Left position next arrow |
| `nextArrowRight` | text | Right position next arrow |
| `nextArrowTransform` | text | CSS transform next arrow |
| `nextArrowSeparator` | separator | Separator group next |
| `prevArrowTransformInfo` | info | Thông tin transform arrow |

### Arrow Style
| Key | Type | Mô tả |
|-----|------|-------|
| `arrowTypography` | typography | Typography/color arrow icon |
| `arrowColor` | color | Màu arrow |
| `arrowBackground` | color | BG arrow button |
| `arrowBorder` | border | Border arrow button |
| `arrowHeight` | number+unit | Chiều cao arrow button |
| `arrowWidth` | number+unit | Chiều rộng arrow button |
| `arrowSize` | number+unit | Font-size icon arrow |
| `arrowTextShadow` | shadow | Shadow trên arrow icon |
| `arrowDisabledColor` | color | Màu arrow khi disabled |
| `arrowDisabledBackground` | color | BG arrow khi disabled |
| `arrowDisabledBorder` | border | Border arrow khi disabled |
| `arrowDisabledOpacity` | number | Opacity arrow khi disabled (0-1) |
| `disabledArrowSep` | separator | Separator group disabled arrow |

### Pagination (Dots)
| Key | Type | Mô tả |
|-----|------|-------|
| `pagination` | checkbox | Hiện dots pagination |
| `paginationColor` | color | Màu dot inactive |
| `paginationColorActive` | color | Màu dot active |
| `paginationHeight` | number+unit | Chiều cao dot |
| `paginationWidth` | number+unit | Chiều rộng dot |
| `paginationHeightActive` | number+unit | Chiều cao dot active |
| `paginationWidthActive` | number+unit | Chiều rộng dot active |
| `paginationBorder` | border | Border dot |
| `paginationBorderActive` | border | Border dot active |
| `paginationSpacing` | number+unit | Spacing giữa các dots |
| `paginationTop` | text | Top position dots |
| `paginationBottom` | text | Bottom position dots |
| `paginationLeft` | text | Left position dots |
| `paginationRight` | text | Right position dots |
| `paginationPositionSeparator` | separator | Separator group pagination position |
| `paginationActiveSeparator` | separator | Separator group active dot style |

### Slide Styling
| Key | Type | Mô tả |
|-----|------|-------|
| `slidePadding` | spacing | Padding mỗi slide |
| `slideBackground` | background | Background mỗi slide |
| `slideBorder` | border | Border mỗi slide |
| `slideBoxShadow` | box-shadow | Shadow mỗi slide |
| `slideAlignHorizontal` | justify-content | Align ngang content trong slide |
| `slideAlignVertical` | align-items | Align dọc content trong slide |

---

## Nestable Structure

**Đơn giản nhất trong các nestable widget** — slide là direct `block` children, không cần class đặc biệt:

```
slider-nested [root]
├── block "Slide 1"     ← trực tiếp là slide
│   ├── heading
│   └── button
├── block "Slide 2"
│   ├── image
│   └── text-basic
└── block "Slide 3"
    └── [any content]
```

> **Không cần** thêm class hay wrapper đặc biệt. Mỗi direct `block` child của `slider-nested` = 1 slide.

---

## Ví dụ JSON — Full Element Tree (dùng với `update_content`)

```json
[
  {
    "id": "slroot",
    "name": "slider-nested",
    "parent": "0",
    "children": ["slid01", "slid02", "slid03"],
    "settings": {
      "type": "loop",
      "perPage": 1,
      "arrows": true,
      "pagination": true,
      "autoplay": true,
      "interval": 4000,
      "speed": 600,
      "height": "400px",
      "prevArrowLeft": "20px",
      "nextArrowRight": "20px",
      "paginationBottom": "20px",
      "paginationColor": {"hex": "rgba(255,255,255,0.5)"},
      "paginationColorActive": {"hex": "#ffffff"}
    }
  },
  {
    "id": "slid01",
    "name": "block",
    "parent": "slroot",
    "children": ["slh01", "slb01"],
    "settings": {
      "_padding": {"top": "40px", "right": "40px", "bottom": "40px", "left": "40px"},
      "_display": "flex",
      "_direction": "column",
      "_alignItems": "center",
      "_justifyContent": "center"
    },
    "label": "Slide 1"
  },
  {
    "id": "slh01",
    "name": "heading",
    "parent": "slid01",
    "children": [],
    "settings": {
      "text": "Slide 1 Title",
      "tag": "h2"
    }
  },
  {
    "id": "slb01",
    "name": "button",
    "parent": "slid01",
    "children": [],
    "settings": {
      "text": "Learn More",
      "style": "primary"
    }
  },
  {
    "id": "slid02",
    "name": "block",
    "parent": "slroot",
    "children": [],
    "settings": {},
    "label": "Slide 2"
  },
  {
    "id": "slid03",
    "name": "block",
    "parent": "slroot",
    "children": [],
    "settings": {},
    "label": "Slide 3"
  }
]
```

---

## API Usage — `add` Action

```
action: "add"
name: "slider-nested"     ← top-level param
settings: {"type": "loop", "perPage": 1, "arrows": true, "pagination": true}
parent_id: "containerID"
post_id: 1234
```

Sau đó `add` từng slide block vào trong slider-nested.

---

## So sánh slider-nested vs slider

| | `slider-nested` | `slider` |
|--|----------------|---------|
| JS engine | Splide.js | Swiper.js |
| Content | Nestable blocks (tự do) | Repeater items cố định |
| Keys | `perPage`, `interval`, `pagination`, `type: loop/slide/fade` | `slidesToShow`, `autoplaySpeed`, `swiperLoop` |
| Use case | Hero banner tùy biến cao | Hero slider với BG image + CTA cố định |
