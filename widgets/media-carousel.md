# Widget: `carousel`

> **Source:** `bricks/includes/elements/carousel.php`
> **Category:** media | **Scripts:** Swiper.js

Widget carousel/slider hình ảnh hoặc posts, dùng Swiper.js.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `type` | select | `"media"` (default) hoặc `"posts"` |
| `items` | image-gallery | Chọn hình ảnh từ media library (type=media) |
| `query` | query (popup) | Query posts (type=posts) |

### Settings Group (Swiper)
| Key | Type | Mô tả |
|-----|------|-------|
| `slidesToShow` | number | Số slide hiển thị cùng lúc — default 2 |
| `slidesToScroll` | number | Số slide scroll mỗi lần — default 1 |
| `gutter` | number | Khoảng cách giữa slides (px) — default 0 |
| `height` | number+unit | Chiều cao slide (khi không adaptive) — default `300px` |
| `adaptiveHeight` | checkbox | Chiều cao tự động theo nội dung |
| `initialSlide` | number | Index slide đầu — default 0 |
| `effect` | select | `"slide"`, `"fade"`, `"cube"`, `"coverflow"`, `"flip"` |
| `infinite` | checkbox | Loop vô tận |
| `centerMode` | checkbox | Center active slide |
| `autoplay` | checkbox | Tự chạy |
| `autoplaySpeed` | number | Tốc độ autoplay (ms) — default 3000 |
| `pauseOnHover` | checkbox | Dừng khi hover |
| `speed` | number | Tốc độ transition (ms) — default 300 |

### Image Group
| Key | Mô tả |
|-----|-------|
| `imageSize` | Kích thước ảnh WP (full, large, medium) |
| `imageLightbox` | Link đến lightbox (media type only) |

### Arrows Group
| Key | Mô tả |
|-----|-------|
| `arrows` | Bật navigation arrows |
| `arrowHeight` | Chiều cao arrow button |
| `arrowWidth` | Chiều rộng arrow button |
| `arrowBackground` | Background arrow |
| `arrowBorder` | Border arrow |
| `arrowTypography` | Typography cho icon arrow |
| `prevArrow` | Icon prev arrow |
| `nextArrow` | Icon next arrow |

### Dots Group
| Key | Mô tả |
|-----|-------|
| `dots` | Bật dots navigation |
| `dotsDynamic` | Dynamic (rút gọn) bullets |
| `dotsHeight` | Chiều cao dot |
| `dotsWidth` | Chiều rộng dot |
| `dotsColor` | Màu dots |
| `dotsActiveColor` | Màu dot active |

---

## Ví dụ JSON

### Carousel hình ảnh cơ bản
```json
{
  "id": "carMedia",
  "name": "carousel",
  "parent": "ctnGallery",
  "settings": {
    "type": "media",
    "items": [
      {"id": 101, "url": "https://..."},
      {"id": 102, "url": "https://..."},
      {"id": 103, "url": "https://..."}
    ],
    "slidesToShow": 3,
    "gutter": 20,
    "height": "280px",
    "arrows": true,
    "dots": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 4000
  }
}
```

### Carousel posts
```json
{
  "id": "carPosts",
  "name": "carousel",
  "parent": "ctnPosts",
  "settings": {
    "type": "posts",
    "query": {
      "post_type": ["post"],
      "posts_per_page": 6,
      "orderby": "date",
      "order": "DESC"
    },
    "slidesToShow": 3,
    "gutter": 24,
    "height": "320px",
    "arrows": true,
    "infinite": true
  }
}
```
