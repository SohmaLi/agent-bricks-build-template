# Widget: `image-gallery`

> **Source:** `bricks/includes/elements/image-gallery.php`
> **Category:** media | **Tag:** `ul`

Gallery hình ảnh với nhiều layout (grid, masonry, metro) và lightbox support.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `items` | image-gallery | Chọn hình từ media library |

### Settings
| Key | Type | Mô tả |
|-----|------|-------|
| `layout` | select | `"grid"` (default), `"masonry"`, `"metro"` |
| `columns` | number | Số cột — CSS var `--columns` (default 3) |
| `gutter` | number+unit | Khoảng cách — CSS var `--gutter` |
| `imageHeight` | number+unit | Chiều cao cố định `.image` (grid only) |
| `imageRatio` | select | `"1:1"`, `"4:3"`, `"16:9"`, `"3:4"`, `"custom"` |
| `_aspectRatio` | text | Custom ratio khi `imageRatio = "custom"`, vd: `"16/9"` |
| `caption` | checkbox | Hiện caption ảnh |
| `link` | select | `"lightbox"`, `"attachment"`, `"media"`, `"custom"` |

### Lightbox (khi `link = "lightbox"`)
| Key | Mô tả |
|-----|-------|
| `lightboxImageSize` | Size ảnh trong lightbox |
| `lightboxImageClick` | Action khi click: zoom, zoom-or-close, next, close |
| `lightboxAnimationType` | Animation: zoom, fade, none |
| `lightboxCaption` | Hiện caption |
| `lightboxThumbnails` | Thumbnail nav |
| `lightboxId` | Group galleries cùng lightbox ID |

---

## Items Object Structure

```json
"items": {
  "images": [
    {"id": 101, "url": "https://..."},
    {"id": 102, "url": "https://..."}
  ],
  "size": "large"
}
```

---

## Ví dụ JSON

### Gallery grid với lightbox
```json
{
  "id": "galGrid",
  "name": "image-gallery",
  "parent": "ctnGallery",
  "settings": {
    "items": {
      "images": [
        {"id": 201, "url": "https://site.com/photo1.jpg"},
        {"id": 202, "url": "https://site.com/photo2.jpg"},
        {"id": 203, "url": "https://site.com/photo3.jpg"},
        {"id": 204, "url": "https://site.com/photo4.jpg"},
        {"id": 205, "url": "https://site.com/photo5.jpg"},
        {"id": 206, "url": "https://site.com/photo6.jpg"}
      ],
      "size": "large"
    },
    "layout": "grid",
    "columns": 3,
    "gutter": "12px",
    "imageRatio": "4:3",
    "link": "lightbox",
    "lightboxImageSize": "full",
    "lightboxAnimationType": "zoom"
  }
}
```

### Masonry gallery
```json
{
  "id": "galMasonry",
  "name": "image-gallery",
  "parent": "ctnPortfolio",
  "settings": {
    "items": {
      "images": [
        {"id": 301, "url": "https://..."},
        {"id": 302, "url": "https://..."}
      ],
      "size": "medium"
    },
    "layout": "masonry",
    "columns": 3,
    "gutter": "16px",
    "link": "lightbox"
  }
}
```
