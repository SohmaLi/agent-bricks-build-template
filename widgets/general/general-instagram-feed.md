# Widget: `instagram-feed`

> **Source:** `bricks/includes/elements/instagram-feed.php`
> **Category:** general | **Scripts:** bricksInstagramFeed
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị feed Instagram — yêu cầu kết nối OAuth qua Bricks Settings. Có nút "Follow us" link đến profile.

---

## Yêu cầu

- Cần **Instagram Basic Display API** token trong Bricks Settings → API Keys
- Nếu chưa kết nối → widget hiển thị placeholder

---

## Content Controls

### Auth
| Key | Type | Mô tả |
|-----|------|-------|
| `instagramAccessToken` | text | Instagram Basic Display API token (cấu hình trong Bricks Settings) |

### Feed Settings
| Key | Type | Mô tả |
|-----|------|-------|
| `numberOfPosts` | number | Số ảnh hiển thị (default: 9) |
| `columns` | number (1–6) | Số cột grid (default: 3) |
| `imageGap` | number+unit | Khoảng cách giữa ảnh |
| `imageWidth` | number+unit | Width từng ảnh |
| `imageHeight` | number+unit | Height từng ảnh |
| `imageAspectRatio` | select | Tỉ lệ ảnh: `"1:1"`, `"4:3"`, `"16:9"` |
| `imageObjectFit` | select | `cover`, `contain`... |
| `imageBorder` | border | Border mỗi ảnh |
| `imageLink` | checkbox | Link ảnh về bài đăng gốc trên Instagram |
| `skipVideo` | checkbox | Bỏ qua video trong feed |
| `skipCarousel` | checkbox | Bỏ qua carousel (album) trong feed |
| `layoutSep` | separator | Separator group layout |
| `imageSep` | separator | Separator group image styles |

### Caption Group
| Key | Mô tả |
|-----|-------|
| `caption` | Hiễn thị caption ảnh khi hover |
| `captionTypography` | Typography caption |
| `captionBackground` | BG caption overlay |
| `captionBorder` | Border caption |
| `captionSep` | Separator group caption |

### Video Icon Group
| Key | Mô tả |
|-----|-------|
| `videoIcon` | Icon hiển trên video trong feed |
| `videoIconPosition` | Vị trí icon: `topLeft`, `topRight`, `center`... |
| `videoIconColor` | Màu icon |
| `videoIconSize` | Kích thước icon |
| `videoSep` | Separator group video icon |

### Carousel Icon Group
| Key | Mô tả |
|-----|-------|
| `carouselIcon` | Icon hiển trên carousel trong feed |
| `carouselIconPosition` | Vị trí icon |
| `carouselIconColor` | Màu icon |
| `carouselIconSize` | Kích thước icon |
| `carouselSep` | Separator group carousel icon |

### Follow Button Group
| Key | Type | Mô tả |
|-----|------|-------|
| `followText` | text | Text nút follow |
| `followIcon` | icon | Icon kèm text |
| `followPosition` | select | Vị trí nút: `top`, `bottom` |
| `followTypography` | typography | Typography nút |
| `followSep` | separator | Separator group follow |

### Cache Group
| Key | Mô tả |
|-----|-------|
| `cacheDuration` | Thời gian cache feed (giây) |
| `cacheSep` | Separator group cache |

---

## HTML Structure

```html
<div class="brxe-instagram-feed">
  <ul class="instagram-feed columns-3">
    <li>
      <a href="https://instagram.com/p/..." target="_blank">
        <figure>
          <img src="..." alt="...">
          <figcaption>Caption text</figcaption>
        </figure>
      </a>
    </li>
    <!-- ... more items ... -->
  </ul>
  <a class="bricks-button follow-link" href="https://instagram.com/yourhandle">
    <i class="ion-logo-instagram"></i> Follow us @yourhandle
  </a>
</div>
```

---

## Ví dụ JSON

### Feed Instagram cơ bản
```json
{
  "id": "igFeed",
  "name": "instagram-feed",
  "parent": "ctnSocial",
  "settings": {
    "count": 9,
    "columns": 3,
    "gutter": "8px",
    "imageRatio": "1:1",
    "link": true,
    "followText": "Follow us @yourhandle",
    "followIcon": {
      "library": "ionicons",
      "icon": "ion-logo-instagram"
    },
    "followUrl": "https://instagram.com/yourhandle",
    "followStyle": "primary"
  }
}
```

### Feed 6 cột compact (footer)
```json
{
  "id": "igFooter",
  "name": "instagram-feed",
  "parent": "blkFooter",
  "settings": {
    "count": 6,
    "columns": 6,
    "gutter": "4px",
    "imageRatio": "1:1",
    "link": true
  }
}
```

---

## Lưu ý

> ⚠️ **Template thực tế (ID 7557):**
> ```json
> {
>   "followText": "Follow us @yourhandle",
>   "followIcon": {"library": "ionicons", "icon": "ion-logo-instagram"}
> }
> ```
> → `followText` + `followIcon` là 2 keys cấu hình phổ biến nhất thấy trong template thực.
