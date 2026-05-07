# Widget: `pie-chart`

> **Source:** `bricks/includes/elements/pie-chart.php`
> **Category:** general | **Scripts:** bricksPieChart (EasyPie)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Biểu đồ tròn dạng donut, animated khi scroll vào viewport.

---

## Content Controls

| Key | Type | Default | Mô tả |
|-----|------|---------|-------|
| `percent` | number (0-100) | 60 | Phần trăm hiển thị |
| `size` | number+unit (px) | 160 → CSS `height` | Kích thước vòng tròn |
| `lineWidth` | number (px) | 8 | Độ dày đường vòng |
| `lineCap` | select | `"square"` | Kiểu đầu đường: `butt`, `round`, `square` |
| `content` | select | `"percent"` | Nội dung giữa: `percent`, `icon`, `text`, (none) |
| `icon` | icon | — | Icon giữa (khi `content = "icon"`) |
| `text` | text | — | Text giữa (khi `content = "text"`) |
| `barColor` | color | primary | Màu thanh tiến trình |
| `trackColor` | color | background-light | Màu track (phần còn lại) |
| `scaleLength` | number (px) | — | Độ dài vạch chia |
| `scaleColor` | color | — | Màu vạch chia |

---

## Ví dụ JSON

### Pie chart với %
```json
{
  "id": "chartPerf",
  "name": "pie-chart",
  "parent": "ctnStats",
  "settings": {
    "percent": 92,
    "size": "120px",
    "lineWidth": 10,
    "lineCap": "round",
    "content": "percent",
    "barColor": {"hex": "#007cfc"},
    "trackColor": {"hex": "#E8F0FE"},
    "_typography": {
      "font-size": "20px",
      "font-weight": "700",
      "color": {"hex": "#007cfc"}
    }
  }
}
```

### Pie chart với icon
```json
{
  "id": "chartIcon",
  "name": "pie-chart",
  "parent": "ctnSkill",
  "settings": {
    "percent": 75,
    "size": "100px",
    "lineWidth": 8,
    "content": "icon",
    "icon": {"library": "themify", "icon": "ti-star"},
    "barColor": {"hex": "#FFB800"},
    "trackColor": {"hex": "#EEDDA8"}
  }
}
```
