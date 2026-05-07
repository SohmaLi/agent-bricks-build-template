# Widget System: Query Filters

> **Category:** query | **Requires:** Bricks Query Filter feature (Settings > Performance > Enable query filters)

Hệ thống filter AJAX cho Query Loop — lọc kết quả theo taxonomy, custom fields mà không reload trang.

---

## Tổng quan các Filter Widgets

| Widget | Name | Mô tả |
|--------|------|-------|
| `filter-search` | Filter - Search | Ô tìm kiếm text |
| `filter-checkbox` | Filter - Checkbox | Checkbox list (multi-select) |
| `filter-select` | Filter - Select | Dropdown select |
| `filter-radio` | Filter - Radio | Radio buttons |
| `filter-range` | Filter - Range | Slider hoặc number input min/max |
| `filter-datepicker` | Filter - Date | Date picker |
| `filter-submit` | Filter - Submit/Reset | Nút Apply/Reset |
| `filter-active-filters` | Active Filters | Hiển thị filters đang active |

---

## Common Filter Controls (tất cả filter widgets đều có)

| Key | Type | Mô tả |
|-----|------|-------|
| `filterQueryId` | query-list | **Bắt buộc** — ID của Query Loop cần filter |
| `filterSource` | select | Nguồn data: `taxonomy`, `wpField`, `customField` |
| `filterApplyOn` | select | `"change"` (auto) hoặc `"click"` (cần filter-submit) |
| `filterAction` | select | `"filter"` (lọc), `"sort"` (sắp xếp), `"per_page"` |

---

## 1. `filter-search`

> **css_selector:** `input`

**Chuyên biệt:**
| Key | Mô tả |
|-----|-------|
| `placeholder` | Placeholder text (default: "Search") |
| `filterInputDebounce` | Độ trễ (ms) trước khi apply (default: 500) |
| `filterMinChars` | Số ký tự tối thiểu để trigger (default: 3) |
| `icon` | Icon clear button |
| `iconColor`, `iconSize` | Style icon |

---

## 2. `filter-checkbox`

**Chuyên biệt:**
| Key | Mô tả |
|-----|-------|
| `displayMode` | `"default"` (checkbox) hoặc `"button"` (button toggle) |
| `filterHierarchical` | Hiển thị taxonomy theo hierarchy |
| `filterAutoCheckChildren` | Auto check children khi check parent |
| `buttonSize`, `buttonStyle`, `buttonOutline`, `buttonCircle` | Style khi `displayMode = "button"` |

**Active classes:** `.brx-option-active` trên `li`, `label`, `span`

---

## 3. `filter-select`

**Chuyên biệt:**
| Key | Mô tả |
|-----|-------|
| `placeholder` | Option "All" đầu tiên |
| `filterAction` | Có thể làm `"sort"` để sort query results |

---

## 4. `filter-range`

**Chuyên biệt:**
| Key | Mô tả |
|-----|-------|
| `displayMode` | `"range"` (slider) hoặc `"input"` (2 number inputs) |
| `step` | Bước nhảy |
| `labelMin`, `labelMax` | Label Min/Max |
| `filterSource` | Chỉ hỗ trợ `customField` |

**Slider styling:**
| Key | Selector | Mô tả |
|-----|----------|-------|
| `sliderBarHeight` | `.slider-base`, `.slider-track` | Chiều cao bar |
| `sliderBarColor` | `.slider-base` | Màu track nền |
| `sliderBarColorActive` | `.slider-track` | Màu track active |
| `sliderThumbColor`, `sliderThumbSize`, `sliderThumbBorder` | `input[type=range]::thumb` | Style thumb |

**Input styling (mode=input):**
| Key | Selector | Mô tả |
|-----|----------|-------|
| `inputBackgroundColor/Border/Typography` | `.min-max-wrap input` | Style inputs |
| `inputWidth` | `.min-max-wrap input` | Width |

---

## 5. `filter-submit` (Submit / Reset)

**Chuyên biệt:**
| Key | Mô tả |
|-----|-------|
| `filterButtonType` | `"apply"` (submit) hoặc `"reset"` |
| `text` | Button text (default: "Filter") |
| `size`, `style`, `circle`, `outline` | Button styling |
| `icon`, `iconColor`, `iconSize` | Icon |
| `redirectTo` | URL redirect sau khi apply |
| `hideOnNoFilter` | Ẩn Reset button khi không có filter active |

---

## Ví dụ JSON — Complete Filter Setup

### Filter Search
```json
{
  "id": "fsSearch",
  "name": "filter-search",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterApplyOn": "change",
    "filterInputDebounce": 500,
    "filterMinChars": 3,
    "placeholder": "Tìm kiếm...",
    "_cssCustom": "%root% input { padding: 10px 16px; border-radius: 8px; }"
  }
}
```

### Filter Checkbox (Taxonomy)
```json
{
  "id": "fcCat",
  "name": "filter-checkbox",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterSource": "taxonomy",
    "filterTaxonomy": "category",
    "filterApplyOn": "change",
    "displayMode": "button",
    "buttonStyle": "light"
  }
}
```

### Filter Select (Sort)
```json
{
  "id": "fsSort",
  "name": "filter-select",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterAction": "sort",
    "filterApplyOn": "change",
    "placeholder": "Sắp xếp theo..."
  }
}
```

### Filter Range (Price)
```json
{
  "id": "frPrice",
  "name": "filter-range",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterSource": "customField",
    "filterCustomField": "price",
    "filterApplyOn": "click",
    "displayMode": "range",
    "labelMin": "Từ",
    "labelMax": "Đến",
    "sliderBarColorActive": {"hex": "#007cfc"},
    "sliderThumbSize": "16px"
  }
}
```

### Filter Submit
```json
{
  "id": "fSubmit",
  "name": "filter-submit",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterButtonType": "apply",
    "text": "Lọc kết quả",
    "style": "primary",
    "_cssCustom": "%root% { width: 100%; justify-content: center; }"
  }
}
```
