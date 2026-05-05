# Widget: `slider-nested`

> **Source:** `bricks/includes/elements/slider-nested.php`
> **Category:** media | **Nestable:** true | **Scripts:** bricksSlider

Slider nestable — mỗi slide là một nestable block, có thể chứa bất kỳ element nào.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `initialSlide` | number | Slide bắt đầu (0-based) |
| `effect` | select | Hiệu ứng chuyển slide: `slide` (default), `fade`, `coverflow` |
| `speed` | number | Tốc độ animation (ms, default: 300) |
| `autoplay` | boolean | Tự chạy |
| `autoplayDelay` | number | Delay autoplay (ms, default: 3000) |
| `loop` | boolean | Loop vô hạn |
| `navigation` | boolean | Mũi tên prev/next |
| `pagination` | boolean | Dots pagination |
| `paginationType` | select | `bullets`, `fraction`, `progressbar` |
| `slidesPerView` | number | Số slides hiện mỗi lần (default: 1) |
| `spaceBetween` | number | Khoảng cách giữa slides (px) |
| `centeredSlides` | boolean | Center slide active |
| `slideHeight` | text | Chiều cao slider (e.g. `400px`, `100vh`) |

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

## Lưu ý

- Bricks JS tự xử lý Swiper initialization
- Dùng `label` trên slide block để dễ nhận biết trong editor
- Responsive: dùng `slidesPerView:mobile_portrait` để set số slides trên mobile
- Navigation arrows có thể style qua `.bricks-button-prev/next` trong `_cssCustom`

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
      "pagination": true,
      "navigation": true,
      "autoplay": true,
      "autoplayDelay": 4000,
      "speed": 600,
      "loop": true,
      "slideHeight": "400px",
      "_background": {
        "color": { "hex": "#000000" }
      }
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
settings: {"pagination": true, "navigation": true}
parent_id: "containerID"
post_id: 1234
```

Sau đó `add` từng slide block vào trong slider-nested.
