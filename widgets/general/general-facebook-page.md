# Widget: `facebook-page`

> **Source:** `bricks/includes/elements/facebook-page.php`
> **Category:** general | **Scripts:** Facebook SDK
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Nhúng Facebook Page Plugin — hiển thị timeline, events hoặc messages của Facebook Page.

---

## Yêu cầu

- Cần **Facebook App ID** trong Bricks Settings → API Keys để load SDK chính thức
- Nếu không có App ID → widget hiển thị placeholder trong builder, không load trên frontend

---

## Content Controls

| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `href` | text | `"https://facebook.com/facebook"` | URL Facebook Page (**bắt buộc**) |
| `tabs` | select | `"timeline"`, `"events"`, `"messages"` | Tab hiển thị (mặc định: `timeline`) |
| `width` | number | `340` | Width widget (px, min: 180, max: 500) |
| `height` | number | `500` | Height widget (px, min: 70) |
| `smallHeader` | checkbox | — | Dùng header nhỏ |
| `hideCover` | checkbox | — | Ẩn cover photo |
| `profilePhotos` | checkbox | — | Hiển thị profile photos |
| `showFacepile` | checkbox | — | Hiển thị ảnh bạn bè đã like |
| `hideCta` | checkbox | — | Ẩn CTA button |
| `adaptContainerWidth` | checkbox | — | Tự động adapt width theo container |
| `lazy` | checkbox | — | Lazy load Facebook SDK |

---

## HTML Output

```html
<div class="brxe-facebook-page">
  <div class="fb-page"
    data-href="https://facebook.com/facebook"
    data-tabs="timeline"
    data-width="340"
    data-height="500"
    data-small-header="false"
    data-adapt-container-width="true">
  </div>
</div>
```

---

## Ví dụ JSON

### Embed Facebook Page cơ bản
```json
{
  "id": "fbPage",
  "name": "facebook-page",
  "parent": "ctnSidebar",
  "settings": {
    "href": "https://facebook.com/yourpage",
    "tabs": "timeline",
    "width": 340,
    "height": 500,
    "adaptContainerWidth": true,
    "showFacepile": true
  }
}
```

### Chỉ có header nhỏ, ẩn cover
```json
{
  "id": "fbPageCompact",
  "name": "facebook-page",
  "parent": "blkFooter",
  "settings": {
    "href": "https://facebook.com/yourpage",
    "smallHeader": true,
    "hideCover": true,
    "adaptContainerWidth": true
  }
}
```

---

## Lưu ý

> ⚠️ **Template thực tế (ID 7557):** `{"href": "https://facebook.com/facebook"}`
> → `href` là key duy nhất bắt buộc. Các settings khác có giá trị default từ Facebook SDK.
