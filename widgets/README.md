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

| Key            | CSS Property   | Giá trị ví dụ                                                 |
| -------------- | -------------- | ------------------------------------------------------------- |
| `_margin`      | `margin`       | `{"top":"0px","bottom":"0px","left":"auto","right":"auto"}`   |
| `_padding`     | `padding`      | `{"top":"40px","bottom":"40px","left":"24px","right":"24px"}` |
| `_width`       | `width`        | `"100%"`, `"684px"`                                           |
| `_widthMin`    | `min-width`    | `"320px"`                                                     |
| `_widthMax`    | `max-width`    | `"1200px"`                                                    |
| `_height`      | `height`       | `"400px"`, `"100vh"`                                          |
| `_heightMin`   | `min-height`   | `"200px"`                                                     |
| `_heightMax`   | `max-height`   | `"600px"`                                                     |
| `_aspectRatio` | `aspect-ratio` | `"16/9"`, `"1/1"`                                             |

### Positioning

| Key         | CSS Property | Giá trị ví dụ                                     |
| ----------- | ------------ | ------------------------------------------------- |
| `_position` | `position`   | `"relative"`, `"absolute"`, `"fixed"`, `"sticky"` |
| `_top`      | `top`        | `"0px"`, `"50%"`                                  |
| `_right`    | `right`      | `"0px"`                                           |
| `_bottom`   | `bottom`     | `"0px"`                                           |
| `_left`     | `left`       | `"24px"`                                          |
| `_zIndex`   | `z-index`    | `1`, `10`, `-1`                                   |
| `_order`    | `order`      | `0`, `1`, `-1`                                    |

### Misc

| Key           | CSS Property | Giá trị ví dụ                                             |
| ------------- | ------------ | --------------------------------------------------------- |
| `_display`    | `display`    | `"flex"`, `"grid"`, `"block"`, `"inline-block"`, `"none"` |
| `_visibility` | `visibility` | `"visible"`, `"hidden"`                                   |
| `_overflow`   | `overflow`   | `"hidden"`, `"visible"`, `"scroll"`, `"auto"`             |
| `_opacity`    | `opacity`    | `0.5`, `1`                                                |
| `_cursor`     | `cursor`     | `"pointer"`, `"default"`                                  |

### Typography (Style tab)

| Key           | Mô tả                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `_typography` | Object:`font-size`, `font-weight`, `font-family`, `color`, `line-height`, `text-align`, `text-transform`, `letter-spacing` |

### Background (Style tab)

| Key           | Mô tả                                                                        |
| ------------- | ---------------------------------------------------------------------------- |
| `_background` | Object:`color.hex`, `color.rgb`, `image.url`, `image.position`, `image.size` |

### Border (Style tab)

| Key          | Mô tả                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------ |
| `_border`    | Object:`width.top/right/bottom/left`, `style`, `color.hex`, `radius.top/right/bottom/left` |
| `_boxShadow` | Object: shadow settings                                                                    |

### Gradient (Style tab)

| Key         | Mô tả                             |
| ----------- | --------------------------------- |
| `_gradient` | Object: gradient overlay settings |

### CSS (Style tab) — **Dùng thay thế `html` element**

| Key              | Mô tả                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| `_cssCustom`     | String: raw CSS, dùng `%root%` target element. **Có trên MỌI widget**. |
| `_cssClasses`    | String: class names cách nhau bởi space                                |
| `_cssId`         | String: CSS ID (không có `#`)                                          |
| `_cssTransition` | String: transition value, ví dụ `"all 0.3s ease"`                      |

### CSS Custom — Cú pháp

> ⚠️ **CRITICAL khi push MCP API:** Thay `%root%` bằng `#brxe-[element-id]`.
> `%root%` chỉ hoạt động trong Bricks Editor UI. Sau Ctrl+S editor tự convert.

```css
/* Editor UI — sau Ctrl+S */
%root% {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
  box-shadow: inset 0 0 24px rgba(0, 124, 252, 0.2);
}

/* ✔ MCP API push — luôn dùng cách này */
#brxe-abc123 {
  background: linear-gradient(135deg, #007cfc 0%, #0056b3 100%);
}
#brxe-abc123:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}
```

## Responsive / Breakpoint Keys

> ⛔ **RULE — Chỉ dùng khi user yêu cầu rõ ràng.**
> Mặc định build desktop-only. **Không tự thêm** breakpoint keys vì nghĩ "nên có responsive".

### Composite Key Format

```
{property}:{breakpoint}
{property}:{breakpoint}:{pseudo}
```

### Breakpoints của site (lấy từ `mcp_bricks-mcp_bricks(action: "get_breakpoints")`)

| Key | Label | Max-width | Base? |
|-----|-------|-----------|-------|
| `desktop` | Desktop | 1279px | ✅ Base (không cần suffix) |
| `tablet_portrait` | Tablet portrait | 991px | — |
| `mobile_landscape` | Mobile landscape | 767px | — |
| `mobile_portrait` | Mobile portrait | 478px | — |
| `mobile` | Mobile | 350px | — |

> ⚠️ Site dùng **desktop-first** (max-width). Style không có suffix = áp dụng cho desktop.
> Breakpoint nhỏ hơn override breakpoint lớn hơn.

### Cách dùng composite key

```json
{
  "_padding": {"top": "60px", "bottom": "60px"},
  "_padding:tablet_portrait": {"top": "40px", "bottom": "40px"},
  "_padding:mobile_portrait": {"top": "24px", "bottom": "24px"},

  "_display": "flex",
  "_display:mobile_portrait": "block",

  "_background:hover": {"color": {"hex": "#0056b3"}},
  "_background:mobile_portrait:hover": {"color": {"hex": "#0056b3"}}
}
```

> ✅ Chỉ ghi breakpoint khi cần **override so với desktop** — không lặp lại giá trị giống desktop.

### `_cssCustom` với responsive

> ⚠️ **`_cssCustom` HỖ TRỢ composite key** — TUYỆT ĐỐI không viết `@media` thủ công bên trong string.
> Mỗi breakpoint = 1 key riêng → sạch hơn, đúng cách Bricks xử lý, tránh conflict.

**Ví dụ với native key `_gridTemplateColumns`** *(nên dùng để sạch hơn)*:
```json
{
  "_display": "grid",
  "_gridTemplateColumns": "repeat(3, 1fr)",
  "_gridTemplateColumns:tablet_portrait": "repeat(2, 1fr)",
  "_gridTemplateColumns:mobile_portrait": "1fr"
}
```

**Ví dụ với `_cssCustom`** *(dùng khi cần CSS không có native key)*:
```json
{
  "_cssCustom": "#brxe-abc123 { clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%); }",
  "_cssCustom:mobile_portrait": "#brxe-abc123 { clip-path: none; }"
}
```

> ✅ Breakpoint keys: `tablet_portrait` | `mobile_landscape` | `mobile_portrait` | `mobile`
> ❌ SAI: `"_cssCustom": "... @media (max-width: 767px) { ... }"` — không dùng cách này.

---

## Danh sách Widget Files

> ⚠️ **DANH SÁCH CHÍNH XÁC:** Xem trực tiếp các file trong thư mục `widgets/`.
> Bảng phía dưới chỉ liệt kê các nhóm chính — không phải toàn bộ.

| Nhóm | Files |
|------|-------|
| **Layout** | `layout-section.md`, `layout-container.md`, `layout-block.md`, `layout-div.md` |
| **Basic** | `basic-heading.md`, `basic-text-basic.md`, `basic-text.md`, `basic-button.md`, `basic-image.md`, `basic-icon.md`, `basic-video.md`, `basic-text-link.md` |
| **General** | `general-accordion.md`, `general-accordion-nested.md`, `general-tabs.md`, `general-tabs-nested.md`, `general-nav-nested.md`, `general-dropdown.md`, `general-toggle.md`, `general-offcanvas.md`, `general-form.md`, `general-alert.md`, `general-countdown.md`, `general-counter.md`, `general-pricing-tables.md`, `general-progress-bar.md`, `general-pie-chart.md`, `general-team-members.md`, `general-testimonials.md`, `general-social-icons.md`, `general-icon-box.md`, `general-list.md`, `general-map.md`, `general-code.md`, `general-logo.md`, `general-breadcrumbs.md`, `general-back-to-top.md`, `general-rating.md`, `general-animated-typing.md`, `general-divider.md`, `general-template.md`, `general-facebook-page.md`, `general-instagram-feed.md` |
| **Media** | `media-slider.md`, `media-slider-nested.md`, `media-carousel.md`, `media-image-gallery.md`, `media-audio.md`, `media-svg.md` |
| **Single Post** | `single-post-title.md`, `single-post-content.md`, `single-post-excerpt.md`, `single-post-meta.md`, `single-post-author.md`, `single-post-taxonomy.md`, `single-post-toc.md`, `single-post-reading-time.md`, `single-post-reading-progress-bar.md`, `single-post-comments.md`, `single-post-sharing.md`, `single-post-navigation.md`, `single-related-posts.md` |
| **WordPress** | `wordpress-nav-menu.md`, `wordpress-posts.md`, `wordpress-sidebar.md`, `wordpress-search.md`, `wordpress-shortcode.md`, `wordpress-widget.md` |
| **Query** | `query-pagination.md`, `query-results-summary.md`, `query-filter-system.md`, `query-filter-active-filters.md` |

## Khi nào dùng `_cssCustom` vs `html` element

| Tình huống                                                      | Giải pháp                                                |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| CSS phức tạp trên 1 element (gradient, inset shadow, clip-path) | `_cssCustom` trên chính element đó                       |
| Cần pseudo-element `:before`, `:after`                          | `_cssCustom` với `%root%::before { ... }`                |
| Hover effect                                                    | `_cssCustom` với `%root%:hover { ... }`                  |
| Layout không làm được bằng native settings                      | Vẫn dùng native, kết hợp `_cssCustom` cho phần còn thiếu |
| Phải inject HTML structure lạ (custom markup)                   | `html` element — trường hợp cuối cùng                    |
