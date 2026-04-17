# Widget: `slider`

> **Source:** `bricks/includes/elements/slider.php`
> **Category:** media | **Scripts:** Swiper.js

Hero slider với background image/color, title, content, button. Hỗ trợ query loop.

---

## Content Controls

### Items (repeater)
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `title` | text | Tiêu đề slide |
| `titleTag` | select | `h1`-`h6` (default: `h3`) |
| `content` | editor | Nội dung HTML |
| `buttonText` | text | Text button |
| `buttonStyle` | select | `light`, `dark`, `primary`, `secondary`, ... |
| `buttonSize` | select | `sm`, `md`, `lg`, `xl` |
| `buttonLink` | link | Link button |
| `buttonBackground` | color → `.bricks-button` | BG button riêng slide |
| `buttonBorder` | border → `.bricks-button` | Border button |
| `background` | background (no video) | Background slide: image/color/gradient |
| `overlay` | color → `.image:after` | Overlay tối trên background |

### Settings Group (Swiper)
| Key | Mô tả |
|-----|-------|
| `slidesToShow` | Số slide hiển thị cùng lúc |
| `slidesToScroll` | Số slide scroll mỗi lần |
| `gutter` | Space between |
| `height` | Min-height slide (default: `50vh`) |
| `effect` | `slide`, `fade`, `cube`, `coverflow`, `flip` |
| `swiperLoop` | `"disable"` để tắt loop (mặc định: bật) |
| `autoplay` | Bật autoplay |
| `autoplaySpeed` | ms giữa các slide |
| `speed` | Transition speed (ms) |

### Content Layout
| Key | Selector | Mô tả |
|-----|----------|-------|
| `contentWidth` | `.slider-content` | Width content box |
| `contentBackgroundColor` | `.slider-content` | Background content box |
| `contentAlignHorizontal` | `.swiper-slide` justify-content | Align ngang |
| `contentAlignVertical` | `.swiper-slide` align-items | Align dọc |
| `contentTextAlign` | `.slider-content` | Text align |
| `contentMargin` | `.slider-content` | Margin |
| `contentPadding` | `.slider-content` | Padding |

### Arrows Group
| Key | Mô tả |
|-----|-------|
| `arrows` | Bật arrows |
| `arrowHeight/Width` | Kích thước arrow buttons |
| `arrowBackground/Border/Typography` | Styling arrow |
| `prevArrow/nextArrow` | Custom icons |
| `prevArrowTop/Right/Bottom/Left` | Vị trí prev arrow |

### Dots Group
| Key | Mô tả |
|-----|-------|
| `dots` | Bật pagination dots |
| `dotsColor` | Màu dot không active |
| `dotsActiveColor` | Màu dot active |
| `dotsHeight/Width` | Kích thước dots |

---

## Ví dụ JSON

### Hero slider cơ bản
```json
{
  "id": "slHero",
  "name": "slider",
  "parent": "pageRoot",
  "settings": {
    "items": [
      {
        "title": "Hosting Tốc Độ Cao",
        "titleTag": "h1",
        "content": "<p>Trải nghiệm tốc độ vượt trội với NVMe SSD và mạng lưới CDN toàn cầu.</p>",
        "buttonText": "Dùng thử miễn phí",
        "buttonStyle": "primary",
        "buttonLink": {"url": "/signup"},
        "background": {
          "image": {"id": 100, "url": "https://site.com/hero-1.jpg"},
          "size": "cover",
          "position": "center"
        },
        "overlay": {"hex": "rgba(0,0,0,0.5)"}
      },
      {
        "title": "Cloud VPS Mạnh Mẽ",
        "content": "<p>Toàn quyền kiểm soát server với SSD NVMe và uptime 99.9%.</p>",
        "buttonText": "Xem gói VPS",
        "buttonStyle": "light",
        "buttonLink": {"url": "/vps"},
        "background": {
          "image": {"id": 101, "url": "https://site.com/hero-2.jpg"},
          "size": "cover"
        },
        "overlay": {"hex": "rgba(0,0,0,0.4)"}
      }
    ],
    "height": "600px",
    "effect": "fade",
    "swiperLoop": "enable",
    "autoplay": true,
    "autoplaySpeed": 5000,
    "contentAlignHorizontal": "center",
    "contentAlignVertical": "center",
    "contentTextAlign": "center",
    "contentWidth": "700px",
    "arrows": true,
    "dots": true,
    "dotsActiveColor": {"hex": "#007cfc"},
    "titleTypography": {
      "font-size": "48px",
      "font-weight": "800",
      "color": {"hex": "#ffffff"}
    },
    "contentTypography": {
      "font-size": "18px",
      "color": {"hex": "rgba(255,255,255,0.9)"}
    },
    "contentPadding": {"top": "40px", "right": "40px", "bottom": "40px", "left": "40px"}
  }
}
```
