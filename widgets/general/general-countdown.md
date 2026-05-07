# Widget: `countdown`

> **Source:** `bricks/includes/elements/countdown.php`
> **Category:** general | **Scripts:** bricksCountdown
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị đếm ngược đến một thời điểm xác định.

---

## Content Controls

| Key | Type | Ví dụ | Mô tả |
|-----|------|-------|-------|
| `date` | datepicker | `"2027-01-01 00:00"` | Ngày mục tiêu |
| `timezone` | select | `"UTC+07:00"` | Múi giờ |
| `action` | select | `"countdown"` (default), `"hide"`, `"text"` | Hành động khi đến hạn |
| `actionText` | text | `"Đã kết thúc!"` | Text custom khi `action = "text"` |

### Fields (repeater) — key: `fields`
Mỗi field là một đơn vị thời gian:
| Sub-key | Type | Ví dụ | Mô tả |
|---------|------|-------|-------|
| `prefix` | text | `""` | Text trước số |
| `format` | text | `"%D"`, `"%H"`, `"%M"`, `"%S"` | Format code |
| `suffix` | text | `" ngày"` | Text sau số |

> `fieldSeparator` — Separator giữa tô `prefix`, number, `suffix` trong một field.
> `fieldsSeparator` — Separator giữa các fields với nhau.

**Format codes:**
- `%D` — Days (có leading zero)
- `%d` — Days (không leading zero)
- `%H` — Hours (có leading zero)
- `%h` — Hours (không leading zero)
- `%M` — Minutes (có leading zero)
- `%m` — Minutes (không leading zero)
- `%S` — Seconds (có leading zero)
- `%s` — Seconds (không leading zero)

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `flexDirectionFields` | direction | Hướng các fields (row/column) |
| `justifyContent` | justify-content | Align ngang |
| `alignItems` | align-items | Align dọc |
| `gutter` | spacing | Margin mỗi field |
| `flexDirection` | direction | Hướng prefix+number+suffix trong field |

### Typography
| Key | Selector | Mô tả |
|-----|----------|-------|
| `typography` | element root | Typography số đếm |
| `typographyPrefix` | `.prefix` | Typography prefix |
| `typographySuffix` | `.suffix` | Typography suffix |

---

## Ví dụ JSON

### Countdown cơ bản
```json
{
  "id": "cdtEvent",
  "name": "countdown",
  "parent": "blkTimer",
  "settings": {
    "date": "2027-12-31 23:59",
    "timezone": "UTC+07:00",
    "action": "hide",
    "fields": [
      {"format": "%D", "suffix": " ngày"},
      {"format": "%H", "suffix": " giờ"},
      {"format": "%M", "suffix": " phút"},
      {"format": "%S", "suffix": " giây"}
    ],
    "flexDirectionFields": "row",
    "justifyContent": "center",
    "gutter": {"top": 0, "right": 20, "bottom": 0, "left": 0},
    "typography": {
      "font-size": "48px",
      "font-weight": "700",
      "color": {"hex": "#007cfc"}
    },
    "typographySuffix": {
      "font-size": "14px",
      "color": {"hex": "#888888"}
    }
  }
}
```
