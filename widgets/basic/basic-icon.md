# Widget: `icon`

> **Source:** `bricks/includes/elements/icon.php`
> **Category:** basic | **Tag:** `i` hoặc `svg` tuỳ library
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget hiển thị một icon đơn lẻ.

---

## Content Controls

| Key | Type | Ví dụ | Ghi chú |
|-----|------|-------|---------|
| `icon` | icon | `{"library": "themify", "icon": "ti-star"}` | **Bắt buộc** |
| `iconColor` | color | `{"hex": "#007cfc"}` | Màu icon |
| `iconSize` | number+unit | `"24px"` | Font-size cho icon font |
| `link` | link | `{"url": "#"}` | Bọc icon trong `<a>` |

---

## Object `icon`

```json
"icon": {
  "library": "themify",
  "icon": "ti-star"
}
```

Các library phổ biến:
- `"themify"` → prefix `ti-*`
- `"ionicons"` → prefix `ion-ios-*` / `ion-md-*`
- `"font-awesome-6-regular"` → Font Awesome 6
- `"font-awesome-6-solid"` → Font Awesome 6 Solid

---

## Ví dụ JSON

### Icon đơn
```json
{
  "id": "icoCheck",
  "name": "icon",
  "parent": "blkListItem",
  "settings": {
    "icon": {"library": "themify", "icon": "ti-check"},
    "iconColor": {"hex": "#007cfc"},
    "iconSize": "20px"
  }
}
```

### Icon có link
```json
{
  "id": "icoSocial",
  "name": "icon",
  "parent": "blkSocialBar",
  "settings": {
    "icon": {"library": "font-awesome-6-brands", "icon": "fa-facebook"},
    "iconColor": {"hex": "#1877F2"},
    "iconSize": "24px",
    "link": {"url": "https://facebook.com/...", "newTab": true}
  }
}
```

### Icon lớn header
```json
{
  "id": "icoHero",
  "name": "icon",
  "parent": "blkHeroIcon",
  "settings": {
    "icon": {"library": "themify", "icon": "ti-star"},
    "iconColor": {"hex": "#FFD700"},
    "iconSize": "48px",
    "_cssCustom": "#brxe-icoHero { filter: drop-shadow(0 4px 8px rgba(255,215,0,0.4)); }"
  }
}
```
