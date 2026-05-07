# Widget: `progress-bar`

> **Source:** `bricks/includes/elements/progress-bar.php`
> **Category:** general | **Scripts:** bricksProgressBar
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)
> **css_selector:** `.bar`

Thanh tiến trình animated, có thể nhiều bar cùng lúc.

---

## Content Controls

### Bars (repeater) — key: `bars`
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `title` | text | Label của thanh |
| `percentage` | number (0-100) | Phần trăm tiến trình |
| `color` | color | Override màu thanh này (áp lên `.bar span`) |

### Settings
| Key | Type | Mô tả |
|-----|------|-------|
| `height` | number+unit | Chiều cao `.bar` — default 8px |
| `barSpacing` | number+unit | Khoảng cách giữa các bars — default 20px |
| `showPercentage` | checkbox | Hiện số % bên cạnh label (default: true) |
| `barColor` | color | Màu fill `.bar span` (cho tất cả bars) |
| `barBackgroundColor` | color | Màu track `.bar` |
| `barBorder` | border | Border `.bar` |
| `labelTypography` | typography | Typography `.label` |
| `percentageTypography` | typography | Typography `.percentage` |

---

## HTML Structure

```html
<div class="brxe-progress-bar">
  <div class="bar-wrapper">
    <label>
      <span class="label">Web design</span>
      <span class="percentage">80%</span>
    </label>
    <div class="bar">
      <span data-width="80%"></span>
    </div>
  </div>
</div>
```

---

## Ví dụ JSON

### Skill bars
```json
{
  "id": "prbSkills",
  "name": "progress-bar",
  "parent": "blkSkills",
  "settings": {
    "bars": [
      {"title": "WordPress", "percentage": 95, "color": {"hex": "#007cfc"}},
      {"title": "JavaScript", "percentage": 85, "color": {"hex": "#f59e0b"}},
      {"title": "PHP", "percentage": 80, "color": {"hex": "#22c55e"}}
    ],
    "height": "10px",
    "barSpacing": "24px",
    "showPercentage": true,
    "barBackgroundColor": {"hex": "#f0f4f8"},
    "barBorder": {
      "radius": {"top": "5px", "right": "5px", "bottom": "5px", "left": "5px"}
    },
    "labelTypography": {
      "font-size": "15px",
      "font-weight": "500",
      "color": {"hex": "#444444"}
    },
    "percentageTypography": {
      "font-size": "14px",
      "color": {"hex": "#666666"}
    }
  }
}
```
