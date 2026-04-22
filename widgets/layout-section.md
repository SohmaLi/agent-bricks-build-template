# Widget: `section`

> **Source:** `bricks/includes/elements/section.php` — extends `Element_Container`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `section`

`section` mở rộng từ `container`, có đầy đủ settings của container nhưng:
- Tag HTML mặc định là `section` (không phải `div`)
- Khi thêm mới, Bricks tự tạo 1 `container` con bên trong
- Dùng làm **root element** của mọi Bricks template section

---

## Settings Keys

**Hoàn toàn giống `container`** — xem [layout-container.md](layout-container.md).

Chỉ khác về hành vi mặc định:

| Đặc điểm | section | container |
|-----------|---------|-----------|
| Default HTML tag | `section` | `div` |
| Child mặc định khi thêm | `container` | (không có) |
| Dùng làm `parent: "0"` | ✅ Root level | ❌ Phải có parent |

---

## Quy tắc parent

```json
{
  "id": "secXXX",
  "name": "section",
  "parent": 0,
  "settings": { ... }
}
```

> `"parent": 0` (integer, **không phải** string `"0"`) — bắt buộc cho root element. API sẽ báo lỗi nếu dùng string.

---

## Ví dụ JSON

### Section cơ bản với padding
```json
{
  "id": "secABC",
  "name": "section",
  "parent": 0,
  "settings": {
    "_padding": {"top": "40px", "bottom": "40px"},
    "_background": {"color": {"hex": "#ffffff"}}
  }
}
```

### Section có background gradient
```json
{
  "id": "secGrad",
  "name": "section",
  "parent": 0,
  "settings": {
    "_padding": {"top": "80px", "bottom": "80px"},
    "_cssCustom": "%root% {\n  background: linear-gradient(135deg, #f2f3f5 0%, #e8edf5 100%);\n}"
  }
}
```

### Section full-height hero
```json
{
  "id": "secHero",
  "name": "section",
  "parent": 0,
  "settings": {
    "_heightMin": "100vh",
    "_position": "relative",
    "_overflow": "hidden",
    "_background": {"color": {"hex": "#0a0a1a"}}
  }
}
```
