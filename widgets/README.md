# Bricks Widget Reference

Thư mục này chứa tài liệu chi tiết cho từng Bricks widget được trích xuất trực tiếp từ source code.

> **Nguồn:** `/bricks/includes/elements/[widget].php` + `base.php`

## Cách đọc

Mỗi file widget ghi rõ:
- **Settings keys** chính xác để dùng khi gọi `update_content`
- **Shared keys** từ `base.php` có sẵn trên **tất cả widgets**
- **`_cssCustom`** — key để inject raw CSS vào element, dùng `%root%` để target chính element
- Ví dụ JSON đã verified

## Shared CSS Keys (có trên MỌI widget)

Những key này đến từ `base.php` → `set_controls_before()` và `set_controls_after()`:

### Layout
| Key | CSS Property | Giá trị ví dụ |
|-----|-------------|--------------|
| `_margin` | `margin` | `{"top":"0px","bottom":"0px","left":"auto","right":"auto"}` |
| `_padding` | `padding` | `{"top":"40px","bottom":"40px","left":"24px","right":"24px"}` |
| `_width` | `width` | `"100%"`, `"684px"` |
| `_widthMin` | `min-width` | `"320px"` |
| `_widthMax` | `max-width` | `"1200px"` |
| `_height` | `height` | `"400px"`, `"100vh"` |
| `_heightMin` | `min-height` | `"200px"` |
| `_heightMax` | `max-height` | `"600px"` |
| `_aspectRatio` | `aspect-ratio` | `"16/9"`, `"1/1"` |

### Positioning
| Key | CSS Property | Giá trị ví dụ |
|-----|-------------|--------------|
| `_position` | `position` | `"relative"`, `"absolute"`, `"fixed"`, `"sticky"` |
| `_top` | `top` | `"0px"`, `"50%"` |
| `_right` | `right` | `"0px"` |
| `_bottom` | `bottom` | `"0px"` |
| `_left` | `left` | `"24px"` |
| `_zIndex` | `z-index` | `1`, `10`, `-1` |
| `_order` | `order` | `0`, `1`, `-1` |

### Misc
| Key | CSS Property | Giá trị ví dụ |
|-----|-------------|--------------|
| `_display` | `display` | `"flex"`, `"grid"`, `"block"`, `"inline-block"`, `"none"` |
| `_visibility` | `visibility` | `"visible"`, `"hidden"` |
| `_overflow` | `overflow` | `"hidden"`, `"visible"`, `"scroll"`, `"auto"` |
| `_opacity` | `opacity` | `0.5`, `1` |
| `_cursor` | `cursor` | `"pointer"`, `"default"` |

### Typography (Style tab)
| Key | Mô tả |
|-----|-------|
| `_typography` | Object: `font-size`, `font-weight`, `font-family`, `color`, `line-height`, `text-align`, `text-transform`, `letter-spacing` |

### Background (Style tab)
| Key | Mô tả |
|-----|-------|
| `_background` | Object: `color.hex`, `color.rgb`, `image.url`, `image.position`, `image.size` |

### Border (Style tab)
| Key | Mô tả |
|-----|-------|
| `_border` | Object: `width.top/right/bottom/left`, `style`, `color.hex`, `radius.top/right/bottom/left` |
| `_boxShadow` | Object: shadow settings |

### Gradient (Style tab)
| Key | Mô tả |
|-----|-------|
| `_gradient` | Object: gradient overlay settings |

### CSS (Style tab) — **Dùng thay thế `html` element**
| Key | Mô tả |
|-----|-------|
| `_cssCustom` | String: raw CSS, dùng `%root%` target element. **Có trên MỌI widget**. |
| `_cssClasses` | String: class names cách nhau bởi space |
| `_cssId` | String: CSS ID (không có `#`) |
| `_cssTransition` | String: transition value, ví dụ `"all 0.3s ease"` |

### CSS Custom — Cú pháp
```css
%root% {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
  box-shadow: inset 0 0 24px rgba(0, 124, 252, 0.2);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

%root%:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
```

## Danh sách Widget Files

| File | Widget | Category |
|------|--------|----------|
| File | Widget | Category |
|------|--------|----------|
| **LAYOUT** | | |
| [layout-section.md](layout-section.md) | `section` | Layout |
| [layout-container.md](layout-container.md) | `container` | Layout |
| [layout-block.md](layout-block.md) | `block` | Layout |
| [layout-div.md](layout-div.md) | `div` | Layout |
| **BASIC** | | |
| [basic-heading.md](basic-heading.md) | `heading` | Basic |
| [basic-text-basic.md](basic-text-basic.md) | `text-basic` | Basic |
| [basic-text.md](basic-text.md) | `text` (Rich Text) | Basic |
| [basic-button.md](basic-button.md) | `button` | Basic |
| [basic-image.md](basic-image.md) | `image` | Basic |
| [basic-icon.md](basic-icon.md) | `icon` | Basic |
| [basic-icon-box.md](basic-icon-box.md) | `icon-box` | Basic |
| [basic-animated-heading.md](basic-animated-heading.md) | `animated-heading` | Basic |
| **GENERAL** | | |
| [general-accordion-nested.md](general-accordion-nested.md) | `accordion-nested` | General |
| [general-tabs-nested.md](general-tabs-nested.md) | `tabs-nested` | General |
| [general-nav-nested.md](general-nav-nested.md) | `nav-nested` | General |
| [general-slider.md](general-slider.md) | `slider` | General |
| [general-back-to-top.md](general-back-to-top.md) | `back-to-top` | General |
| [general-breadcrumbs.md](general-breadcrumbs.md) | `breadcrumbs` | General |
| [general-search.md](general-search.md) | `search` | General |
| [general-social-icons.md](general-social-icons.md) | `social-icons` | General |
| [general-dropdown.md](general-dropdown.md) | `dropdown` | General |
| [general-offcanvas.md](general-offcanvas.md) | `offcanvas` | General |
| [general-template.md](general-template.md) | `template` | General |
| **MEDIA** | | |
| [media-slider-nested.md](media-slider-nested.md) | `slider-nested` | Media |
| [media-gallery.md](media-gallery.md) | `gallery` | Media |
| [media-video.md](media-video.md) | `video` | Media |
| [media-audio.md](media-audio.md) | `audio` | Media |
| **SINGLE POST** | | |
| [single-post-title.md](single-post-title.md) | `post-title` | Single |
| [single-post-content.md](single-post-content.md) | `post-content` | Single |
| [single-post-excerpt.md](single-post-excerpt.md) | `post-excerpt` | Single |
| [single-post-meta.md](single-post-meta.md) | `post-meta` | Single |
| [single-post-author.md](single-post-author.md) | `post-author` | Single |
| [single-post-taxonomy.md](single-post-taxonomy.md) | `post-taxonomy` | Single |
| [single-post-toc.md](single-post-toc.md) | `post-toc` | Single |
| [single-post-reading-time.md](single-post-reading-time.md) | `post-reading-time` | Single |
| [single-post-reading-progress-bar.md](single-post-reading-progress-bar.md) | `post-reading-progress-bar` | Single |
| [single-post-comments.md](single-post-comments.md) | `post-comments` | Single |
| [single-post-sharing.md](single-post-sharing.md) | `post-sharing` | Single |
| [single-post-navigation.md](single-post-navigation.md) | `post-navigation` | Single |
| [single-related-posts.md](single-related-posts.md) | `related-posts` | Single |
| **QUERY / LOOP** | | |
| [query-pagination.md](query-pagination.md) | `pagination` | Query |
| [query-results-summary.md](query-results-summary.md) | `query-results-summary` | Query |
| [query-filter-system.md](query-filter-system.md) | `filter-*` (system) | Query |
| [query-filter-active-filters.md](query-filter-active-filters.md) | `filter-active-filters` | Query |
| **WORDPRESS** | | |
| [wordpress-sidebar.md](wordpress-sidebar.md) | `sidebar` | WordPress |
| [wordpress-posts.md](wordpress-posts.md) | `posts` | WordPress |
| [wordpress-shortcode.md](wordpress-shortcode.md) | `shortcode` | WordPress |

## Khi nào dùng `_cssCustom` vs `html` element

| Tình huống | Giải pháp |
|-----------|-----------|
| CSS phức tạp trên 1 element (gradient, inset shadow, clip-path) | `_cssCustom` trên chính element đó |
| Cần pseudo-element `:before`, `:after` | `_cssCustom` với `%root%::before { ... }` |
| Hover effect | `_cssCustom` với `%root%:hover { ... }` |
| Layout không làm được bằng native settings | Vẫn dùng native, kết hợp `_cssCustom` cho phần còn thiếu |
| Phải inject HTML structure lạ (custom markup) | `html` element — trường hợp cuối cùng |
