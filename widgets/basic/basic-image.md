# Widget: `image`

> **Source:** `bricks/includes/elements/image.php`
> **Category:** basic | **Tag mặc định:** `figure`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

---

## Content Controls

### Image Source
| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `image` | image | `{"id": 101, "url": "https://...", "size": "full"}` | **Bắt buộc có `id`** |
| `tag` | select | `figure`, `picture`, `div`, `custom` | Outer wrapper tag. Không có khi `sources` được set |
| `customTag` | text | `"article"` | Khi `tag = "custom"` |
| `altText` | text | `"Mô tả ảnh"` | Custom alt text |
| `showTitle` | checkbox | `true` | Thêm `title` attribute vào `<img>` từ WP attachment title |
| `loading` | select | `lazy` (default), `eager` | Lazy load |
| `stretch` | checkbox | `true` | `width: 100%` |

### Object Fit / Position (image-specific keys)
| Key | CSS | Options |
|-----|-----|---------|
| `_objectFit` | `object-fit` | `cover`, `contain`, `fill`, `none`, `scale-down` |
| `_objectPosition` | `object-position` | `"center"`, `"top"`, `"50% 20%"` |
| `_aspectRatio` | `aspect-ratio` | `"16/9"`, `"1/1"`, `"4/3"` |

### Sources — Responsive (khác ảnh theo breakpoint)
> `tag` sẽ tự chuyển thành `<picture>` khi `sources` được set.

| Sub-key | Type | Mô tả |
|---------|------|-------|
| `sources[].breakpoint` | select | Breakpoint key (`desktop`, `tablet_portrait`, `mobile_portrait`, `_custom`) |
| `sources[].media` | text | Custom media query — chỉ khi `breakpoint = "_custom"`: `"(max-width: 600px)"` |
| `sources[].image` | image | Ảnh hiển thị tại breakpoint đó |

### Caption Group
| Key | Type | Mô tả |
|-----|------|-------|
| `caption` | select | `none`, `attachment` (default), `custom` |
| `captionCustom` | text | Caption text — khi `caption = "custom"` |

### Image Overlay
| Key | Mô tả |
|-----|-------|
| `popupOverlay` | Color overlay: `{"hex": "rgba(0,0,0,0.4)"}` — adds `.overlay::before` pseudo-element |

### Link To Group
| Key | Type | Options / Mô tả |
|-----|------|----------------|
| `link` | select | `lightbox`, `attachment`, `media`, `url` |
| `lightboxImageSize` | select | WordPress image size cho lightbox (`full`, `large`...) — khi `link=lightbox` |
| `lightboxAnimationType` | select | Lightbox animation (`zoom`, `fade`...) — khi `link=lightbox` |
| `lightboxId` | text | Group ID cho gallery lightbox — images cùng ID được group lại |
| `newTab` | checkbox | Mở tab mới — khi `link = attachment / media` |
| `url` | link | Custom URL — khi `link = url` |

### Icon Group (hover icon trên ảnh)
| Key | Type | Mô tả |
|-----|------|-------|
| `popupIconDisable` | checkbox | Tắt icon từ theme styles |
| `popupIcon` | icon | Icon hiển thị trên ảnh khi hover |
| `popupIconBackgroundColor` | color | BG của `.icon` wrapper |
| `popupIconBorder` | border | Border của `.icon` wrapper |
| `popupIconBoxShadow` | box-shadow | Shadow của `.icon` wrapper |
| `popupIconTypography` | typography | Font size, color icon |
| `popupIconHeight` | number+unit | `line-height` của `.icon` |
| `popupIconWidth` | number+unit | `width` của `.icon` |
| `popupIconTransition` | text | CSS transition của `.icon` |

### Mask Group (image masking)
| Key | Type | Options / Mô tả |
|-----|------|----------------|
| `mask` | select | Preset mask shape: `circle`, `hexagon`, `drop`, `heart`, `fire`... hoặc `custom` |
| `maskCustom` | image | Custom SVG/PNG mask image — khi `mask = "custom"` |
| `maskSize` | select | `auto`, `cover`, `contain`, `custom` (default: `contain`) |
| `maskSizeCustom` | number+unit | Custom size — khi `maskSize = "custom"` |
| `maskPosition` | select | `center center`, `top left`... (default: `center center`) |
| `maskRepeat` | select | `no-repeat` (default), `repeat`, `repeat-x`, `repeat-y` |

---

## `image` object — 2 cách dùng

### Cách A: WP Media Library (production)

```json
"image": {
  "id": 101,
  "url": "https://site.com/wp-content/uploads/image.jpg",
  "size": "full"
}
```

- `id`: WordPress attachment ID (integer)
- `url`: URL của ảnh — nên có để preview
- `size`: `"full"`, `"large"`, `"medium"`, `"thumbnail"`

### Cách B: Custom URL — dùng trong build nhanh từ Figma ✅

```json
"image": {
  "id": 0,
  "url": "http://localhost:3845/assets/[hash].png"
}
```

- `id: 0` — bỏ qua WP Media Library
- `url`: bất kỳ URL nào, kể cả `localhost:3845` từ Figma Desktop
- **Không cần upload lên WP** trong giai đoạn build/prototype

> ✅ **Workflow khuyến nghị:**
> 1. **Build phase:** Dùng Cách B với URL Figma `localhost:3845` → không cần download/upload
> 2. **Production phase:** Thay bằng Cách A với `attachment_id` thật sau khi upload WP
>
> ⚠️ `localhost:3845` chỉ hoạt động khi Figma Desktop đang chạy trên máy local của người xem preview.

---

## Ví dụ JSON

### Ảnh thông thường
```json
{
  "id": "imgProfile",
  "name": "image",
  "parent": "blkRight",
  "settings": {
    "image": {"id": 101, "url": "https://...", "size": "full"},
    "_width": "480px",
    "_height": "480px",
    "_objectFit": "cover",
    "_border": {
      "radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"}
    }
  }
}
```

### Ảnh background (absolute)
```json
{
  "id": "imgBG",
  "name": "image",
  "parent": "blkBGWrapper",
  "settings": {
    "image": {"id": 102, "url": "https://...", "size": "full"},
    "stretch": true,
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "cover",
    "_zIndex": "0"
  }
}
```

### Ảnh thumbnail card
```json
{
  "id": "imgThumb",
  "name": "image",
  "parent": "blkCard",
  "settings": {
    "image": {"id": 103, "url": "https://...", "size": "large"},
    "_width": "100%",
    "_height": "200px",
    "_objectFit": "cover",
    "_aspectRatio": "16/9",
    "_border": {
      "radius": {"top": "12px", "right": "12px", "bottom": "0px", "left": "0px"}
    }
  }
}
```

### Ảnh có mask circle
```json
{
  "id": "imgAvatar",
  "name": "image",
  "parent": "blkAuthor",
  "settings": {
    "image": {"id": 104, "url": "https://...", "size": "full"},
    "_width": "80px",
    "_height": "80px",
    "_objectFit": "cover",
    "mask": "mask-circle"
  }
}
```

### Ảnh responsive (khác ảnh theo breakpoint)
```json
{
  "id": "imgResponsive",
  "name": "image",
  "parent": "ctnHero",
  "settings": {
    "image": {"id": 105, "url": "https://.../desktop.jpg", "size": "full"},
    "sources": [
      {
        "breakpoint": "mobile_portrait",
        "image": {"id": 106, "url": "https://.../mobile.jpg", "size": "large"}
      }
    ],
    "_width": "100%",
    "_objectFit": "cover"
  }
}
```

### div Placeholder (khi chưa có ảnh)
```json
{
  "id": "divImgPH",
  "name": "div",
  "parent": "blkRight",
  "settings": {
    "_width": "480px",
    "_height": "480px",
    "_background": {"color": {"hex": "#e8e8e8"}},
    "_border": {
      "radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"}
    }
  }
}
```
