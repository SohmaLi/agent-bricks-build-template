# Widget: `testimonials`

> **Source:** `bricks/includes/elements/testimonials.php`
> **Category:** general | **Scripts:** Swiper.js

Slider testimonials với avatar, tên, chức danh và điều hướng.

---

## Content Controls

### Items (repeater)
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `content` | textarea | Nội dung review/testimonial |
| `name` | text | Tên người review |
| `title` | text | Chức danh |
| `image` | image | Avatar/photo |

### Settings Group (Swiper)
| Key | Type | Mô tả |
|-----|------|-------|
| `slidesToShow` | number | Số slide hiển thị (default 1) |
| `slidesToScroll` | number | Số slide scroll |
| `gutter` | number | Space between slides |
| `textAlign` | text-align | Text alignment |
| `effect` | select | `slide`, `fade`, `cube`, `coverflow`, `flip` |
| `infinite` | checkbox | Loop |
| `random` | checkbox | Thứ tự random |
| `centerMode` | checkbox | Center active slide |
| `autoplay` | checkbox | Autoplay |
| `autoplaySpeed` | number | ms giữa mỗi slide |
| `speed` | number | Transition speed (ms) |

### Image Group
| Key | Mô tả |
|-----|-------|
| `imagePosition` | `"top"`, `"right"`, `"bottom"`, `"left"` (default) |
| `imageSize` | Width và height `.image` wrapper (square) |
| `imageBorder` | Border của `.image` |
| `imageBoxShadow` | Shadow của `.image` |

### Arrows Group
| Key | Mô tả |
|-----|-------|
| `prevArrow` | Icon prev `{library, icon}` |
| `prevArrowLeft` | Vị trí left của prev arrow (e.g. `"50px"`) |
| `nextArrow` | Icon next `{library, icon}` |
| `nextArrowRight` | Vị trí right của next arrow (e.g. `"50px"`) |
| `arrowTypography` | Màu arrow: `{color: {hex: "#616161"}}` |

### Typography (Style tab)
| Key | Selector | Mô tả |
|-----|----------|-------|
| `typographyContent` | `.testimonial-content-wrapper` | Typography nội dung |
| `typographyName` | `.testimonial-name` | Typography tên |
| `typographyTitle` | `.testimonial-title` | Typography chức danh |

---

## HTML Structure

```html
<div class="brxe-testimonials">
  <div class="bricks-swiper-container">
    <div class="swiper-wrapper">
      <div class="repeater-item swiper-slide">
        <blockquote class="testimonial-content-wrapper">Nội dung...</blockquote>
        <div class="testimonial-meta-wrapper image-position-left">
          <div class="image css-filter" style="background-image: url(...)"></div>
          <div class="testimonial-meta-data">
            <div class="testimonial-name">Tên</div>
            <div class="testimonial-title">Chức danh</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Ví dụ JSON

### Testimonials slider cơ bản
```json
{
  "id": "testSlider",
  "name": "testimonials",
  "parent": "ctnTestimonials",
  "settings": {
    "items": [
      {
        "content": "Dịch vụ xuất sắc, đội ngũ hỗ trợ nhiệt tình và chuyên nghiệp. Tôi rất hài lòng với kết quả đạt được.",
        "name": "Nguyễn Văn An",
        "title": "CEO, TechViet",
        "image": {"id": 401, "url": "https://site.com/avatar1.jpg"}
      },
      {
        "content": "Sản phẩm chất lượng cao, đúng như mô tả. Sẽ tiếp tục hợp tác lâu dài.",
        "name": "Trần Thị Bình",
        "title": "Marketing Manager",
        "image": {"id": 402, "url": "https://site.com/avatar2.jpg"}
      }
    ],
    "slidesToShow": 1,
    "textAlign": "center",
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "dots": true,
    "imagePosition": "top",
    "imageSize": "80px",
    "imageBorder": {
      "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
    },
    "typographyContent": {
      "font-size": "18px",
      "font-style": "italic",
      "line-height": "1.8",
      "color": {"hex": "#444444"}
    },
    "typographyName": {
      "font-size": "16px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    },
    "typographyTitle": {
      "font-size": "14px",
      "color": {"hex": "#888888"}
    }
  }
}
```
