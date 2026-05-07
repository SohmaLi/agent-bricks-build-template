# Widget: `counter`

> **Source:** `bricks/includes/elements/counter.php`
> **Category:** general | **Scripts:** bricksCounter
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Số đếm animated từ giá trị X đến Y khi element xuất hiện trong viewport.

---

## Content Controls

| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `countFrom` | number|text | `0` | Giá trị bắt đầu (default: 0) |
| `countTo` | number|text | `1000` | Giá trị kết thúc — có thể là number hoặc string số |
| `duration` | number | `2000` | Thời gian animation (ms, default: 1000) |
| `prefix` | text | `"+"`, `"$"` | Text trước số |
| `suffix` | text | `"%"`, `" users"` | Text sau số |
| `thousandSeparator` | checkbox | — | Bật thousand separator |
| `separatorText` | text | `","` | Ký tự separator (default: `,`) |

### Typography
| Key | Selector | Mô tả |
|-----|----------|-------|
| `countTypography` | `.count` | Typography số chính |
| `prefixTypography` | `.prefix` | Typography prefix |
| `suffixTypography` | `.suffix` | Typography suffix |

---

## HTML Structure

```html
<div class="brxe-counter">
  <span class="prefix">+</span>
  <span class="count">0</span>
  <span class="suffix">K</span>
</div>
```

---

## Ví dụ JSON

### Stat counter
```json
{
  "id": "ctrUsers",
  "name": "counter",
  "parent": "blkStat",
  "settings": {
    "countFrom": "0",
    "countTo": "50000",
    "duration": 2000,
    "suffix": "+",
    "thousandSeparator": true,
    "separatorText": ",",
    "countTypography": {
      "font-size": "56px",
      "font-weight": "700",
      "color": {"hex": "#007cfc"}
    },
    "suffixTypography": {
      "font-size": "36px",
      "font-weight": "700",
      "color": {"hex": "#007cfc"}
    }
  }
}
```

### Percentage với prefix
```json
{
  "id": "ctrSatisfied",
  "name": "counter",
  "parent": "blkResults",
  "settings": {
    "countFrom": "80",
    "countTo": "98",
    "duration": 1500,
    "suffix": "%",
    "countTypography": {
      "font-size": "64px",
      "font-weight": "800",
      "color": {"hex": "#282829"}
    }
  }
}
```
