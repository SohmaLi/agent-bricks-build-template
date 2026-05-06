# Widget: `instagram-feed`

> **Source:** `bricks/includes/elements/instagram-feed.php`
> **Category:** general | **Scripts:** bricksInstagramFeed

Hiển thị feed Instagram — yêu cầu kết nối OAuth qua Bricks Settings. Có nút "Follow us" link đến profile.

---

## Yêu cầu

- Cần **Instagram Basic Display API** token trong Bricks Settings → API Keys
- Nếu chưa kết nối → widget hiển thị placeholder

---

## Content Controls

### Feed Group
| Key | Type | Mô tả |
|-----|------|-------|
| `count` | number | Số ảnh hiển thị (default: 9) |
| `columns` | number (1–6) | Số cột grid (default: 3) |
| `gutter` | number+unit | Khoảng cách giữa ảnh (default: `10px`) |
| `caption` | checkbox | Hiển thị caption ảnh khi hover |
| `imageRatio` | select | `"1:1"`, `"4:3"`, `"16:9"` — tỉ lệ ảnh |
| `link` | checkbox | Link ảnh về bài đăng gốc trên Instagram |

### Follow Button Group
| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `followText` | text | `"Follow us @yourhandle"` | Text nút follow |
| `followIcon` | icon | `{"library": "ionicons", "icon": "ion-logo-instagram"}` | Icon kèm text |
| `followUrl` | text | `"https://instagram.com/yourhandle"` | URL profile Instagram |
| `followSize` | select | `sm`, `md`, `lg`, `xl` | Size nút |
| `followStyle` | select | `primary`, `light`, `dark`, ... | Style nút |

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
