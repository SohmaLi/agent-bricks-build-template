# Bricks Widget Reference — Kho Thông Tin Widget

> **Bricks Version:** 2.3.4 (verified)
> **PHP Source:** `bricks/includes/elements/[widget].php`
> **Cập nhật lần cuối:** 2026-05-07

Đây là kho tham chiếu chính xác cho tất cả Bricks widget settings — được verify trực tiếp từ PHP source code.

---

## Cách Sử Dụng

### Khi cần build JSON cho 1 widget:
1. Tìm widget trong bảng Index bên dưới → lấy đường dẫn file
2. Đọc file đó để biết các `settings` key cần dùng
3. Áp dụng [shared-styles.md](./shared-styles.md) cho các `_margin`, `_padding`, `_typography`...

### Quy tắc đọc file widget:
- **Keys không có `_`** → widget-specific settings (Content tab)
- **Keys có `_`** → shared base settings (Style tab) → xem [shared-styles.md](./shared-styles.md)
- **Separator keys** (type = `separator`) → không cần set trong JSON, bỏ qua
- **Info keys** (type = `info`) → không cần set trong JSON, bỏ qua

---

## Index Widget theo Danh Mục

### Layout (Khung chứa)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `section` | [layout/layout-section.md](./layout/layout-section.md) | Section ngoài cùng, wrap page |
| `container` | [layout/layout-container.md](./layout/layout-container.md) | Container flex/grid chính |
| `block` | [layout/layout-block.md](./layout/layout-block.md) | Block flex đơn giản |
| `div` | [layout/layout-div.md](./layout/layout-div.md) | Div thuần, không settings riêng |

### Basic (Elements cơ bản)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `heading` | [basic/basic-heading.md](./basic/basic-heading.md) | Tiêu đề H1-H6 |
| `text-basic` | [basic/basic-text-basic.md](./basic/basic-text-basic.md) | Đoạn văn đơn giản |
| `text` | [basic/basic-text.md](./basic/basic-text.md) | Rich text với dynamic data |
| `button` | [basic/basic-button.md](./basic/basic-button.md) | Button/CTA |
| `image` | [basic/basic-image.md](./basic/basic-image.md) | Ảnh đơn, lightbox, lazy load |
| `icon` | [basic/basic-icon.md](./basic/basic-icon.md) | Icon từ icon library |
| `video` | [basic/basic-video.md](./basic/basic-video.md) | Video YouTube/Vimeo/MP4 |
| `text-link` | [basic/basic-text-link.md](./basic/basic-text-link.md) | Link text inline |

### General (Widgets nâng cao)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `accordion` | [general/general-accordion.md](./general/general-accordion.md) | Accordion bình thường |
| `accordion-nested` | [general/general-accordion-nested.md](./general/general-accordion-nested.md) | Accordion nestable (recommended) |
| `tabs` | [general/general-tabs.md](./general/general-tabs.md) | Tabs bình thường |
| `tabs-nested` | [general/general-tabs-nested.md](./general/general-tabs-nested.md) | Tabs nestable (recommended) |
| `nav-nested` | [general/general-nav-nested.md](./general/general-nav-nested.md) | Navigation nestable |
| `dropdown` | [general/general-dropdown.md](./general/general-dropdown.md) | Dropdown menu |
| `offcanvas` | [general/general-offcanvas.md](./general/general-offcanvas.md) | Off-canvas panel |
| `toggle` | [general/general-toggle.md](./general/general-toggle.md) | Toggle show/hide |
| `form` | [general/general-form.md](./general/general-form.md) | Form builder đầy đủ |
| `alert` | [general/general-alert.md](./general/general-alert.md) | Alert/notice box |
| `countdown` | [general/general-countdown.md](./general/general-countdown.md) | Đếm ngược thời gian |
| `counter` | [general/general-counter.md](./general/general-counter.md) | Số đếm animated |
| `pricing-tables` | [general/general-pricing-tables.md](./general/general-pricing-tables.md) | Bảng giá |
| `progress-bar` | [general/general-progress-bar.md](./general/general-progress-bar.md) | Thanh tiến trình |
| `pie-chart` | [general/general-pie-chart.md](./general/general-pie-chart.md) | Biểu đồ tròn |
| `team-members` | [general/general-team-members.md](./general/general-team-members.md) | Team members grid |
| `testimonials` | [general/general-testimonials.md](./general/general-testimonials.md) | Testimonials slider |
| `social-icons` | [general/general-social-icons.md](./general/general-social-icons.md) | Social media icons |
| `icon-box` | [general/general-icon-box.md](./general/general-icon-box.md) | Icon + title + text |
| `list` | [general/general-list.md](./general/general-list.md) | Danh sách tùy chỉnh |
| `map` | [general/general-map.md](./general/general-map.md) | Google Maps |
| `code` | [general/general-code.md](./general/general-code.md) | Code block syntax highlight |
| `html` | [general/general-html.md](./general/general-html.md) | Raw HTML block |
| `logo` | [general/general-logo.md](./general/general-logo.md) | Site logo |
| `breadcrumbs` | [general/general-breadcrumbs.md](./general/general-breadcrumbs.md) | Đường dẫn breadcrumb |
| `back-to-top` | [general/general-back-to-top.md](./general/general-back-to-top.md) | Nút về đầu trang |
| `rating` | [general/general-rating.md](./general/general-rating.md) | Star rating |
| `animated-typing` | [general/general-animated-typing.md](./general/general-animated-typing.md) | Text typing animation |
| `divider` | [general/general-divider.md](./general/general-divider.md) | Đường phân cách |
| `template` | [general/general-template.md](./general/general-template.md) | Nhúng Bricks template khác |
| `facebook-page` | [general/general-facebook-page.md](./general/general-facebook-page.md) | Facebook Page plugin |
| `instagram-feed` | [general/general-instagram-feed.md](./general/general-instagram-feed.md) | Instagram feed |

### Media (Ảnh, video, slider)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `slider` | [media/media-slider.md](./media/media-slider.md) | Slider ảnh truyền thống |
| `slider-nested` | [media/media-slider-nested.md](./media/media-slider-nested.md) | Slider nestable — **dùng cho slider có content phức tạp** |
| `carousel` | [media/media-carousel.md](./media/media-carousel.md) | Carousel/thumbnail slider |
| `image-gallery` | [media/media-image-gallery.md](./media/media-image-gallery.md) | Gallery grid, lightbox |
| `audio` | [media/media-audio.md](./media/media-audio.md) | Audio player |
| `svg` | [media/media-svg.md](./media/media-svg.md) | SVG inline |

### Query (Lọc & phân trang — Yêu cầu Bricks ≥ 1.10)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `pagination` | [query/query-pagination.md](./query/query-pagination.md) | Phân trang AJAX/standard |
| `query-results-summary` | [query/query-results-summary.md](./query/query-results-summary.md) | Thống kê kết quả query |
| `filter-*` (system) | [query/query-filter-system.md](./query/query-filter-system.md) | **Xem file này trước** — hệ thống filter AJAX |
| `filter-active-filters` | [query/query-filter-active-filters.md](./query/query-filter-active-filters.md) | Hiển thị filters đang active |

> `filter-checkbox`, `filter-radio`, `filter-search`, `filter-select`, `filter-range`, `filter-datepicker`, `filter-submit` → đều documented trong [query-filter-system.md](./query/query-filter-system.md)

### Single Post (Widgets cho bài viết đơn)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `post-title` | [single/single-post-title.md](./single/single-post-title.md) | Tiêu đề bài viết (hỗ trợ prefix/suffix) |
| `post-content` | [single/single-post-content.md](./single/single-post-content.md) | Nội dung bài viết |
| `post-excerpt` | [single/single-post-excerpt.md](./single/single-post-excerpt.md) | Excerpt/tóm tắt |
| `post-meta` | [single/single-post-meta.md](./single/single-post-meta.md) | Meta (date, author, categories...) |
| `post-author` | [single/single-post-author.md](./single/single-post-author.md) | Author box |
| `post-taxonomy` | [single/single-post-taxonomy.md](./single/single-post-taxonomy.md) | Tags/categories display |
| `post-toc` | [single/single-post-toc.md](./single/single-post-toc.md) | Mục lục tự động (Tocbot) |
| `post-reading-time` | [single/single-post-reading-time.md](./single/single-post-reading-time.md) | Thời gian đọc ước tính |
| `post-reading-progress-bar` | [single/single-post-reading-progress-bar.md](./single/single-post-reading-progress-bar.md) | Progress bar khi scroll |
| `post-comments` | [single/single-post-comments.md](./single/single-post-comments.md) | Form comments đầy đủ |
| `post-sharing` | [single/single-post-sharing.md](./single/single-post-sharing.md) | Social sharing buttons |
| `post-navigation` | [single/single-post-navigation.md](./single/single-post-navigation.md) | Prev/Next bài viết |
| `related-posts` | [single/single-related-posts.md](./single/single-related-posts.md) | Bài viết liên quan |

### WordPress (Widgets tích hợp WP)
| Widget name | File | Mô tả ngắn |
|-------------|------|------------|
| `nav-menu` | [wordpress/wordpress-nav-menu.md](./wordpress/wordpress-nav-menu.md) | Navigation menu WP (có mega menu, mobile menu) |
| `posts` | [wordpress/wordpress-posts.md](./wordpress/wordpress-posts.md) | Posts list/grid với query, filter, pagination |
| `search` | [wordpress/wordpress-search.md](./wordpress/wordpress-search.md) | Search box (inline hoặc overlay) |
| `sidebar` | [wordpress/wordpress-sidebar.md](./wordpress/wordpress-sidebar.md) | WordPress sidebar area |
| `shortcode` | [wordpress/wordpress-shortcode.md](./wordpress/wordpress-shortcode.md) | Render shortcode |
| `wordpress` | [wordpress/wordpress-widget.md](./wordpress/wordpress-widget.md) | Legacy WP widgets (recent posts, categories...) |

---

## Files Quan Trọng

| File | Mục đích |
|------|---------|
| [shared-styles.md](./shared-styles.md) | **Đọc trước tiên** — tất cả `_margin`, `_padding`, `_typography`, `_background`, `_border`, `_cssCustom`... |
| README.md (file này) | Index và hướng dẫn sử dụng kho widget |

---

## Quy tắc JSON quan trọng

### ❌ Keys cần BỎ QUA khi build JSON
```
separator    → không có value, chỉ là UI divider
info         → thông báo hiển thị trong editor, không có effect
*Info        → pattern suffix Info (vd: filterQueryIdInfo, submenuStaticInfo)
*Sep         → pattern suffix Sep (vd: iconSep, buttonSep, formTitleSep)
*Separator   → pattern suffix Separator (vd: linksSeparator, iconSeparator)
```

### ✅ Repeater keys — pattern bắt buộc
```json
"items": [
  {"id": "abc123", "key1": "value1", "key2": "value2"},
  {"id": "def456", "key1": "value1"}
]
```
> `id` trong mỗi item phải là **6 ký tự `[a-z0-9]` duy nhất**.

### ✅ Responsive — Composite key format
```json
"_padding": {"top": "60px", "bottom": "60px"},
"_padding:tablet_portrait": {"top": "40px", "bottom": "40px"},
"_padding:mobile_portrait": {"top": "24px", "bottom": "24px"}
```

### ✅ `_cssCustom` — Luôn dùng `#brxe-[id]`
```json
"_cssCustom": "#brxe-abc123 { background: linear-gradient(135deg, #007CFC 0%, #1EAFFF 100%); }"
```
> ❌ KHÔNG dùng `%root%` khi push qua MCP API — chỉ hoạt động trong editor UI.
