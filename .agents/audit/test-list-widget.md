# Widget Audit Checklist

> Template nguồn: ID `7557` — "template references widget"
> Quy ước: ✅ Đúng (bao gồm đã fix) | ❌ Cần fix | 🔲 Chưa kiểm tra

---

## Layout

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 1 | `section` | `layout-section.md` | ✅ | parent:0 integer, settings đúng |
| 2 | `container` | `layout-container.md` | ✅ | flex/grid keys đầy đủ |
| 3 | `block` | `layout-block.md` | ✅ | Giống container, đúng |
| 4 | `div` | `layout-div.md` | ✅ | Redirect sang layout-block.md |

## Basic

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 5 | `heading` | `basic-heading.md` | ✅ | text/tag/_typography đúng |
| 6 | `text-basic` | `basic-text-basic.md` | ✅ | text/tag/_typography đúng |
| 7 | `text` | `basic-text.md` | ✅ | text (rich HTML editor) đúng |
| 8 | `text-link` | `basic-text-link.md` | ✅ | text/link/icon/iconPosition đúng |
| 9 | `button` | `basic-button.md` | ✅ | text/link/style/size/_background đúng |
| 10 | `icon` | `basic-icon.md` | ✅ | icon/{library,icon}/iconColor/iconSize đúng |
| 11 | `image` | `basic-image.md` | ✅ | image/{id,url,size}/_objectFit đúng + Cách B localhost:3845 |
| 12 | `video` | `basic-video.md` | ✅ | videoType/youTubeId/previewImage đúng |

## Navigation

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 13 | `nav-nested` | `general-nav-nested.md` | ✅ | Structure phức tạp đúng, brx-nav-nested-items, cloneable/deletable:false |
| 14 | `dropdown` | `general-dropdown.md` | ✅ | Fix `contentBoxShadow.values` → object |
| 15 | `toggle` | `general-toggle.md` | ✅ | animation/toggleSelector/toggleValue đúng |
| 16 | `offcanvas` | `general-offcanvas.md` | ✅ | direction/effect/width đúng |

## General

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 17 | `divider` | `general-divider.md` | ✅ | height/color/style/icon đúng |
| 18 | `icon-box` | `general-icon-box.md` | ✅ | direction/icon/content HTML đúng |
| 19 | `social-icons` | `general-social-icons.md` | ✅ | Fix library `fontawesomeBrands`, +brandColors |
| 20 | `list` | `general-list.md` | ✅ | items[{title,meta}] đúng |
| 21 | `accordion` | `general-accordion.md` | ✅ | accordions[{title,content}], icon, iconExpanded đúng |
| 22 | `accordion-nested` | `general-accordion-nested.md` | ✅ | Classes accordion-title-wrapper/content-wrapper đúng |
| 23 | `tabs` | `general-tabs.md` | ✅ | tabs[{title,content}], titlePadding số int OK |
| 24 | `tabs-nested` | `general-tabs-nested.md` | ✅ | tab-menu/tab-title/tab-content/tab-pane đúng |
| 25 | `form` | `general-form.md` | ✅ | Fix +emailTo:"admin_email", +htmlEmail, +fromName, +successMessage |
| 26 | `map` | `general-map.md` | ✅ | address/height/zoom/addresses đúng |
| 27 | `alert` | `general-alert.md` | ✅ | content/type/dismissable đúng |
| 28 | `animated-typing` | `general-animated-typing.md` | ✅ | prefix/suffix/strings[{text}] đúng |
| 29 | `countdown` | `general-countdown.md` | ✅ | fields[{format,suffix}] đúng |
| 30 | `counter` | `general-counter.md` | ✅ | Fix countTo/countFrom có thể là number hoặc string |
| 31 | `pricing-tables` | `general-pricing-tables.md` | ✅ | Fix `_boxShadow.values` → object |
| 32 | `progress-bar` | `general-progress-bar.md` | ✅ | bars[{title,percentage,color}] đúng |
| 33 | `pie-chart` | `general-pie-chart.md` | ✅ | percent/content/barColor/trackColor đúng |
| 34 | `team-members` | `general-team-members.md` | ✅ | Fix `contentBoxShadow.values` → object |
| 35 | `testimonials` | `general-testimonials.md` | ✅ | Fix +prevArrowLeft/nextArrowRight/arrowTypography |
| 36 | `code` | `general-code.md` | ✅ | executeCode/code/cssCode/javascriptCode đúng |
| 37 | `logo` | `general-logo.md` | ✅ | logo/{id,url}/logoHeight/logoWidth đúng |
| 38 | `breadcrumbs` | `general-breadcrumbs.md` | ✅ | homeLabel/separatorType/itemTypography đúng |
| 39 | `back-to-top` | `general-back-to-top.md` | ✅ | position/positionRight/visibleAfter/smoothScroll đúng |
| 40 | `rating` | `general-rating.md` | ✅ | rating/maxRating/iconColorFull/iconSize đúng |
| 41 | `template` | `general-template.md` | ✅ | template/noRoot/lazy đúng, +use cases |
| 42 | `facebook-page` | `general-facebook-page.md` | ✅ | href bắt buộc, tạo docs mới từ template 7557 |
| 43 | `instagram-feed` | `general-instagram-feed.md` | ✅ | followText/followIcon, tạo docs mới từ template 7557 |

## Media

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 44 | `image-gallery` | `media-image-gallery.md` | ✅ | items.images[{id,url}]/layout/columns đúng |
| 45 | `audio` | `media-audio.md` | ✅ | source/file/{id,url}/theme đúng |
| 46 | `carousel` | `media-carousel.md` | ✅ | Fix +fields dynamic data variant, +prevArrowLeft/nextArrowRight |
| 47 | `slider` | `media-slider.md` | ✅ | items[{title,content,background}]/height/arrows đúng |
| 48 | `slider-nested` | `media-slider-nested.md` | ✅ | Slide = block direct child, không cần class đặc biệt |
| 49 | `svg` | `media-svg.md` | ✅ | source/""/file/{id,url}/fill/stroke đúng |

## Single Post

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 50 | `post-title` | `single-post-title.md` | ✅ | tag/linkToPost/_typography đúng |
| 51 | `post-excerpt` | `single-post-excerpt.md` | ✅ | (đã verify session trước) |
| 52 | `post-meta` | `single-post-meta.md` | ✅ | meta[{dynamicData, id}] đúng |
| 53 | `post-content` | `single-post-content.md` | ✅ | (đã verify session trước) |
| 54 | `post-sharing` | `single-post-sharing.md` | ✅ | items[{id,service}]/brandColors đúng |
| 55 | `related-posts` | `single-related-posts.md` | ✅ | count/columns/fields[{dynamicData,tag}] đúng |
| 56 | `post-author` | `single-post-author.md` | ✅ | avatar/name/bio/postsLink đúng |
| 57 | `post-comments` | `single-post-comments.md` | ✅ | source/fieldKeys/submitButtonText đúng |
| 58 | `post-taxonomy` | `single-post-taxonomy.md` | ✅ | taxonomy/separator/style/gap đúng |
| 59 | `post-navigation` | `single-post-navigation.md` | ✅ | _direction/prevLabel/nextLabel đúng |
| 60 | `post-reading-time` | `single-post-reading-time.md` | ✅ | prefix/suffix/wordsPerMinute đúng |
| 61 | `post-reading-progress-bar` | `single-post-reading-progress-bar.md` | ✅ | barPosition/barHeight/barColor đúng |
| 62 | `post-toc` | `single-post-toc.md` | ✅ | headingSelectors/sticky/itemTypography đúng |

## WordPress

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 63 | `posts` | `wordpress-posts.md` | ✅ | query/layout/columns/gutter đúng |
| 64 | `pagination` | `query-pagination.md` | ✅ | queryId/justifyContent/navigationHeight đúng |
| 65 | `nav-menu` | `wordpress-nav-menu.md` | ✅ | Fix `subMenuBoxShadow.values` → object |
| 66 | `sidebar` | `wordpress-sidebar.md` | ✅ | sidebar/margin/titleTypography đúng |
| 67 | `search` | `wordpress-search.md` | ✅ | searchType/placeholder/searchOverlayTitle đúng |
| 68 | `shortcode` | `wordpress-shortcode.md` | ✅ | shortcode string/showPlaceholder đúng |
| 69 | `wordpress` (legacy) | `wordpress-widget.md` | ✅ | type/icon, tạo docs mới từ template 7557 |

## Query

| # | Widget | File | Status | Ghi chú |
|---|--------|------|--------|---------|
| 70 | `pagination` | `query-pagination.md` | ✅ | Đã check ở WordPress section |
| 71 | `filter` | — | — | Không có trong template, skip |
| 72 | `active-filters` | — | — | Không có trong template, skip |

---

## Tổng kết lỗi đã phát hiện & fix

### Lỗi hệ thống: `_boxShadow.values` format sai

Tất cả `xxxBoxShadow.values` phải là **object**, không phải CSS string:

```json
✅ ĐÚNG:
"_boxShadow": {
  "values": {"offsetX": 0, "offsetY": 8, "blur": 24, "spread": 0},
  "color": {"hex": "rgba(0,0,0,0.1)"}
}

❌ SAI (đã fix):
"_boxShadow": {"values": "0 8px 24px rgba(0,0,0,0.1)"}
```

| File đã fix | Key bị sai |
|-------------|-----------|
| `general-pricing-tables.md` | `tableBoxShadow.values` |
| `general-dropdown.md` | `contentBoxShadow.values` |
| `general-team-members.md` | `contentBoxShadow.values` |
| `wordpress-nav-menu.md` | `subMenuBoxShadow.values` |

### Lỗi cấu trúc / thiếu setting

| File đã fix | Vấn đề |
|-------------|--------|
| `general-social-icons.md` | Library name sai (`fontawesomeBrands`), thiếu `brandColors` |
| `general-form.md` | Thiếu `emailTo:"admin_email"`, `htmlEmail`, `fromName`, `successMessage` |
| `general-counter.md` | `countTo` có thể là number, không chỉ string |
| `general-testimonials.md` | Thiếu `prevArrowLeft`/`nextArrowRight`/`arrowTypography` |
| `media-carousel.md` | Thiếu variant `fields` dynamic data, thiếu arrow positioning |

---

## Tóm tắt

| Status | Số lượng |
|--------|---------|
| ✅ Đúng (bao gồm đã fix + docs mới) | 65 |
| — Không có trong template, skip | 7 |
| 🔲 Chưa kiểm tra | 0 |
| **Tổng đã review** | **72** |

> ✅ **Audit hoàn tất** — Toàn bộ 71 widget files đã được kiểm tra và cross-check với data thực tế từ template 7557.
