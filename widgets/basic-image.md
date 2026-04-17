# Widget: `image`

> **Source:** `bricks/includes/elements/image.php`
> **Category:** basic | **Tag mặc định:** `figure`

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `image` | image | `{"id": 101, "url": "https://...", "size": "full"}` | **Bắt buộc có `id`** |
| `tag` | select | `figure`, `div`, `custom` | Outer wrapper tag |
| `customTag` | text | `"article"` | Khi `tag = "custom"` |
| `altText` | text | `"Mô tả ảnh"` | Custom alt text |
| `caption` | select | `none`, `attachment`, `custom` | Caption type |
| `captionCustom` | text | `"Caption text"` | Khi `caption = "custom"` |
| `loading` | select | `lazy` (default), `eager` | Lazy load |
| `stretch` | checkbox | `true` / không có | `width: 100%` |
| `link` | select | `lightbox`, `attachment`, `media`, `url` | Link to |

### Object Fit / Position
| Key | CSS | Options |
|-----|-----|---------|
| `_objectFit` | `object-fit` | `cover`, `contain`, `fill`, `none`, `scale-down` |
| `_objectPosition` | `object-position` | `"center"`, `"top"`, `"50% 20%"` |
| `_aspectRatio` | `aspect-ratio` | `"16/9"`, `"1/1"`, `"4/3"` |

### Image Overlay
| Key | Mô tả |
|-----|-------|
| `popupOverlay` | Color overlay: `{"hex": "rgba(0,0,0,0.4)"}` |

---

## Style Controls (Style tab)

| Key | Giá trị ví dụ |
|-----|--------------|
| `_width` | `"520px"`, `"100%"` |
| `_height` | `"400px"`, `"100%"` |
| `_widthMax` | `"100%"` |
| `_position` | `"absolute"` (dùng cho background image) |
| `_top`, `_left` | `"0px"` |
| `_border` | Border + border-radius: `{"radius": {"top":"16px",...}}` |
| `_cssCustom` | Custom CSS |

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

### Icon nhỏ (32x32)
```json
{
  "id": "imgIcon",
  "name": "image",
  "parent": "blkIconRow",
  "settings": {
    "image": {"id": 104, "url": "https://...", "size": "thumbnail"},
    "_width": "32px",
    "_height": "32px",
    "_objectFit": "contain"
  }
}
```

### div Placeholder (khi chưa có ảnh)
Khi chưa có attachment_id, thay thế bằng `block` hoặc `div` với màu placeholder:
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
