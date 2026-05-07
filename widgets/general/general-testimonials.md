# Widget: `testimonials`

> **Source:** `bricks/includes/elements/testimonials.php`
> **Category:** general | **Scripts:** Swiper.js
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Slider testimonials với avatar, tên, chức danh và điều hướng.

---

## Content Controls

### Items (repeater) — key: `items`
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
| `slidesToScroll` | number | Số slide scroll mỗi lần |
| `gutter` | number | Space between slides (px) |
| `textAlign` | text-align | Text alignment |
| `alignItems` | select | Vertical align items trong slide |
| `effect` | select | `slide`, `fade`, `cube`, `coverflow`, `flip` |
| `infinite` | checkbox | Loop |
| `random` | checkbox | Thứ tự random |
| `centerMode` | checkbox | Center active slide |
| `initialSlide` | number | Slide mở sẵn (0-based) |
| `autoplay` | checkbox | Autoplay |
| `autoplaySpeed` | number | ms giữa mỗi slide |
| `pauseOnHover` | checkbox | Tạm dừng khi hover |
| `speed` | number | Transition speed (ms) |
| `disableLazyLoad` | checkbox | Tắt lazy load ảnh slides |

### Image Group
| Key | Mô tả |
|-----|-------|
| `imagePosition` | `"top"`, `"right"`, `"bottom"`, `"left"` (default) |
| `imageAlign` | Horizontal align của image trong meta wrapper |
| `imageSize` | Width và height `.image` wrapper (square) |
| `imageBorder` | Border của `.image` |
| `imageBoxShadow` | Shadow của `.image` |

### Arrows Group
| Key | Mô tả |
|-----|-------|
| `arrows` | show/hide arrows |
| `prevArrow` | Icon prev `{library, icon}` |
| `prevArrowTop` | Top position prev arrow |
| `prevArrowBottom` | Bottom position prev arrow |
| `prevArrowLeft` | Left position prev arrow |
| `prevArrowRight` | Right position prev arrow |
| `prevArrowSeparator` | Separator group prev |
| `nextArrow` | Icon next `{library, icon}` |
| `nextArrowTop` | Top position next arrow |
| `nextArrowBottom` | Bottom position next arrow |
| `nextArrowLeft` | Left position next arrow |
| `nextArrowRight` | Right position next arrow |
| `nextArrowSeparator` | Separator group next |
| `arrowTypography` | Màu arrow: `{color: {hex: "#616161"}}` |
| `arrowBackground` | BG arrow button |
| `arrowBorder` | Border arrow button |
| `arrowHeight` | Chiều cao arrow button |
| `arrowWidth` | Chiều rộng arrow button |

### Dots Group
| Key | Mô tả |
|-----|-------|
| `dots` | Hiện pagination dots |
| `dotsDynamic` | Dynamic dots (thu nhỏ dot xa) |
| `dotsColor` | Màu dot inactive |
| `dotsActiveColor` | Màu dot active |
| `dotsHeight` | Chiều cao dot |
| `dotsWidth` | Chiều rộng dot |
| `dotsSpacing` | Spacing giữa các dots |
| `dotsBorder` | Border dot |
| `dotsTop` | Top position dots container |
| `dotsBottom` | Bottom position dots container |
| `dotsLeft` | Left position dots container |
| `dotsRight` | Right position dots container |
| `dotsVertical` | Hiển thị dots theo cột dọc |

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
