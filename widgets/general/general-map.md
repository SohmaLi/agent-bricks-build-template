# Widget: `map`

> **Source:** `bricks/includes/elements/map.php`
> **Category:** general | **Scripts:** bricksMap, Google Maps JS API
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Google Maps với multi-marker, infobox và custom styles. Nếu không có API key → dùng Google Maps Embed iframe.

---

## Hai chế độ

| Mode | Điều kiện | Tính năng |
|------|-----------|-----------|
| **Embed** (iframe) | Không có Google Maps API key | Địa chỉ text, zoom, map type |
| **Full** | Có API key trong Bricks Settings | Multi-marker, infobox, custom style |

---

## Content Controls (không cần API key)

| Key | Type | Mô tả |
|-----|------|-------|
| `infoNoApiKey` | info | Thông báo khi chưa có API key |
| `height` | number+unit | Height map |
| `zoom` | number (0-20) | Zoom level (default: 12) |
| `type` | select | `roadmap`, `satellite`, `hybrid`, `terrain` |

## Content Controls (cần API key)

### Addresses (repeater) — key: `addresses`
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `latitude` | text | Vĩ độ |
| `longitude` | text | Kinh độ |
| `address` | text | Địa chỉ text (alternative) |
| `infoTitle` | text | Tiêu đề infobox |
| `infoSubtitle` | text | Subtitle infobox |
| `infoOpeningHours` | textarea | Nội dung infobox |
| `infoImages` | image-gallery | Hình trong infobox |
| `infoWidth` | number | Width infobox (px) |

> `infoLatLong` — info tip cho latitude/longitude format.

### Markers Group
| Key | Mô tả |
|-----|-------|
| `marker` | Custom marker image (inactive) |
| `markerHeight` | Chiều cao marker (px) |
| `markerWidth` | Chiều rộng marker (px) |
| `markerActive` | Image marker khi active |
| `markerActiveHeight` | Chiều cao marker active (px) |
| `markerActiveWidth` | Chiều rộng marker active (px) |
| `markerActiveSeparator` | Separator group marker active |

### Settings Group
| Key | Mô tả |
|-----|-------|
| `height` | Height map |
| `zoom` | Zoom level (0-20) |
| `minZoom` | Zoom tối thiểu |
| `maxZoom` | Zoom tối đa |
| `type` | Map type: `roadmap`, `satellite`, `hybrid`, `terrain` |
| `style` | Pre-defined style hoặc `"custom"` |
| `customStyle` | JSON từ snazzymaps.com |
| `scrollwheel` | Cho phép scroll zoom (default: true) |
| `draggable` | Cho phép kéo (default: true) |
| `fullscreenControl` | Nút fullscreen |
| `mapTypeControl` | Bảng type selector |
| `streetViewControl` | Nút street view |
| `zoomControl` | Nút zoom |
| `disableDefaultUI` | Tắt tất cả UI mặc định |

---

## Ví dụ JSON

### Map địa chỉ đơn (embed, không cần API)
```json
{
  "id": "mapContact",
  "name": "map",
  "parent": "ctnContact",
  "settings": {
    "address": "285 Cách Mạng Tháng Tám, Quận 10, TP.HCM",
    "height": "450px",
    "zoom": 15,
    "type": "roadmap"
  }
}
```

### Map với API key và multi-marker
```json
{
  "id": "mapOffices",
  "name": "map",
  "parent": "ctnMap",
  "settings": {
    "addresses": [
      {
        "latitude": "10.7769",
        "longitude": "106.6987",
        "infoTitle": "Văn phòng HCM",
        "infoSubtitle": "285 CMT8, Q.10",
        "infoOpeningHours": "T2-T6: 8:00 - 18:00\nT7: 8:00 - 12:00"
      },
      {
        "latitude": "21.0278",
        "longitude": "105.8342",
        "infoTitle": "Văn phòng Hà Nội",
        "infoSubtitle": "123 Nguyễn Chí Thanh, Ba Đình"
      }
    ],
    "height": "500px",
    "zoom": 12,
    "zoomControl": true,
    "scrollwheel": false,
    "style": "custom"
  }
}
```
