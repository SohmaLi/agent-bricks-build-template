# Widget: `post-toc`

> **Source:** `bricks/includes/elements/post-toc.php`
> **Category:** single | **css_selector:** `.toc-list` | **Scripts:** bricksTableOfContents (Tocbot.js)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Mục lục tự động từ headings — tự động scan H2/H3 trong bài viết và tạo anchor links.

---

## Giới hạn

⚠️ Chỉ có thể đặt **1 TOC visible** trên trang tại một thời điểm.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `contentSelector` | text | CSS selector của content area (default: `.brxe-post-content`, fallback: `#brx-content`) |
| `headingSelectors` | text | Headings cần scan (default: `h2, h3`) |
| `ignoreSelector` | text | Bỏ qua headings với class này (default: `.toc-ignore`) |
| `collapseInactive` | checkbox | Thu gọn các sections không active |
| `noWrap` | checkbox | Không wrap text dài |
| `sticky` | checkbox | Sticky TOC khi scroll |
| `stickyTop` | number+unit → `&[data-sticky]` top | Khoảng cách top khi sticky |
| `headingsOffset` | number (px) | Scroll offset cho anchors |
| `singleTocNotice` | info | Thông báo chỉ dùng được 1 TOC trên trang |

### Item Styling
| Key | Selector | Mô tả |
|-----|----------|-------|
| `itemSep` | — | Separator group item style |
| `itemPadding` | `.toc-list-item` | Padding |
| `itemBorder` | `.toc-link::before` | Border (thường dùng left indicator) |
| `itemTypography` | `.toc-link` | Typography |

### Active Item Styling
| Key | Selector | Mô tả |
|-----|----------|-------|
| `activeSep` | — | Separator group active style |
| `itemBackgroundActive` | `.toc-link.is-active-link` | Background active |
| `itemBorderActive` | `.toc-link.is-active-link::before` | Border active |
| `itemTypographyActive` | `.toc-link.is-active-link` | Typography active |

---

## Ví dụ JSON

```json
{
  "id": "tocMain",
  "name": "post-toc",
  "parent": "ctnSidebar",
  "settings": {
    "contentSelector": ".brxe-post-content",
    "headingSelectors": "h2, h3",
    "sticky": true,
    "stickyTop": "100px",
    "headingsOffset": 80,
    "collapseInactive": true,
    "itemPadding": {"top": "6px", "right": "0", "bottom": "6px", "left": "16px"},
    "itemTypography": {
      "font-size": "14px",
      "color": {"hex": "#666666"}
    },
    "itemBorderActive": {
      "style": "solid",
      "color": {"hex": "#007cfc"},
      "width": {"left": "3px"}
    },
    "itemTypographyActive": {
      "color": {"hex": "#007cfc"},
      "font-weight": "600"
    }
  }
}
```
