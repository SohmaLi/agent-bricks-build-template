# Widget System: Query Filters

> **Category:** `filter` | **Requires:** Bricks ≥ 1.10 + Settings → Performance → Enable query filters
> **Source:** `bricks/includes/elements/filter-*.php` (verified Bricks 2.3.4)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hệ thống filter AJAX cho Query Loop — lọc kết quả theo taxonomy, custom fields mà không reload trang.

---

## Tổng quan các Filter Widgets

| Widget name | PHP File | Mô tả |
|-------------|----------|-------|
| `filter-search` | `filter-search.php` | Ô tìm kiếm text |
| `filter-checkbox` | `filter-checkbox.php` | Checkbox list (multi-select) |
| `filter-radio` | `filter-radio.php` | Radio buttons |
| `filter-select` | `filter-select.php` | Dropdown select (Choices.js) |
| `filter-range` | `filter-range.php` | Slider hoặc number input min/max |
| `filter-datepicker` | `filter-datepicker.php` | Date picker |
| `filter-submit` | `filter-submit.php` | Nút Apply/Reset |
| `filter-active-filters` | `filter-active-filters.php` | Hiển thị filters đang active |

> `filter-checkbox` và `filter-radio` kế thừa toàn bộ controls từ `filter-base.php` (không có keys riêng).

---

## Shared Controls (tất cả filter widgets đều có từ `filter-base.php`)

### Content — Target Query
| Key | Type | Mô tả |
|-----|------|-------|
| `filterQueryId` | query-list | **Bắt buộc** — ID của Query Loop cần filter |
| `filterQueryIdInfo` | info | Thông báo khi `filterQueryId` chưa được set |
| `filterNiceName` | text | URL parameter custom (vd: `_color`). Phải unique |
| `filterNiceNameInfo` | info | Gợi ý dùng prefix để tránh conflict |
| `filterApplyOn` | select | `"change"` (auto) hoặc `"click"` (cần filter-submit) |
| `filterAction` | select | `"filter"` (lọc), `"sort"` (sắp xếp) — chỉ select/radio |

### Content — Data Source
| Key | Type | Mô tả |
|-----|------|-------|
| `filterSource` | select | Nguồn data: `"taxonomy"`, `"wpField"`, `"customField"` |
| `filterTaxonomy` | select | Taxonomy slug (khi `filterSource = "taxonomy"`) |
| `filterTaxonomyOrder` | select | `ASC`, `DESC` |
| `filterTaxonomyOrderBy` | select | `name`, `count`, `term_id`, `slug`, `meta_value` |
| `filterTaxonomyOrderMetaKey` | text | Meta key khi `orderBy = "meta_value"` |
| `filterTermInclude` | text | Term IDs cần include (comma-separated) |
| `filterTermExclude` | text | Term IDs cần exclude |
| `filterTermTopLevel` | checkbox | Chỉ hiện top-level terms |
| `filterHierarchical` | checkbox | Hiện cấu trúc hierarchical (parent/child) |
| `filterAutoCheckChildren` | checkbox | Tự check children khi check parent |
| `filterChildIndentation` | checkbox | Thụt đầu dòng children |
| `filterChildIndentationGap` | number+unit | Giá trị thụt đầu dòng |
| `wpPostField` | select | WP post field (khi `filterSource = "wpField"`) |
| `wpTermField` | select | WP term field |
| `wpUserField` | select | WP user field |
| `sourceFieldType` | select | Field type: `string`, `number`, `date` |
| `customFieldKey` | text | Custom field key (khi `filterSource = "customField"`) |
| `fieldCompareOperator` | select | `IN`, `NOT IN`, `BETWEEN`, `NOT BETWEEN`, `=`, `!=`, `>`, `<` |
| `fieldProvider` | select | ACF, Meta Box, JetEngine, etc. |
| `fieldProviderCustomKeyInfo` | info | Info về custom key format |
| `labelMapping` | text | Custom label mapping (term → label) |
| `customLabelMapping` | text | Manually map term values đến labels |
| `sortOptions` | repeater | Custom sort options |
| `perPageOptions` | text | Per-page options (comma: `12,24,48`) |

### Content — Options Display
| Key | Type | Mô tả |
|-----|------|-------|
| `displayMode` | select | `"default"` (checkbox/radio) hoặc `"button"` |
| `filterHideCount` | checkbox | Ẩn số lượng kết quả bên cạnh option |
| `filterCountNoBracket` | checkbox | Hiện count không có dấu ngoặc |
| `filterHideEmpty` | checkbox | Ẩn options không có kết quả |
| `filterHideAllOption` | checkbox | Ẩn option "Tất cả" |
| `filterLabelAll` | text | Label cho option "Tất cả" |
| `filterMultiLogic` | select | `"AND"` hoặc `"OR"` (multi-value logic) |
| `limitOptions` | number | Giới hạn số options hiện |
| `populatedOptionsOrder` | select | Thứ tự options |
| `populatedOptionsOrderBy` | select | Sort by |
| `populatedOptionsInfo` | info | Info về populatedOptions |
| `modeSep` | separator | Separator display mode |

### Content — Show More / Less (checkbox & radio)
| Key | Type | Mô tả |
|-----|------|-------|
| `showMoreText` | text | Text nút "Xem thêm" |
| `showLessText` | text | Text nút "Thu gọn" |
| `showMoreButtonStyle` | select | Button style |
| `showMoreButtonSize` | select | Button size |
| `showMoreButtonCircle` | checkbox | Border-radius full |
| `showMoreButtonOutline` | checkbox | Outline style |
| `showMoreButtonBackgroundColor` | color | BG button |
| `showMoreButtonBorder` | border | Border button |
| `showMoreButtonTypography` | typography | Typography button |
| `showMoreButtonSep` | separator | Separator group show more |

### Style — Options List
| Key | Type | Mô tả |
|-----|------|-------|
| `optionSep` | separator | Separator group option style |
| `optionsGap` | number+unit | Gap giữa các options |
| `optionsTypography` | typography | Typography options text |
| `countTypography` | typography | Typography count badge |
| `countAlignEnd` | checkbox | Count align cuối hàng |

### Style — Indicator (checkbox/radio indicator)
| Key | Type | Mô tả |
|-----|------|-------|
| `indicatorSep` | separator | Separator group indicator |
| `indicatorSize` | number+unit | Kích thước indicator |
| `indicatorGap` | number+unit | Gap giữa indicator và label |
| `indicatorBackgroundColor` | color | BG indicator |
| `indicatorBorderStyle` | select | Border style |
| `indicatorBorderWidth` | number | Border width |
| `indicatorBorderColor` | color | Border color |
| `indicatorBorderRadius` | number | Border radius |
| `indicatorCheckedSep` | separator | Separator group checked state |
| `indicatorFocusColor` | color | Focus outline color |
| `indicatorCheckedBackgroundColor` | color | BG khi checked |
| `indicatorCheckedBorderColor` | color | Border khi checked |
| `indicatorCheckedColor` | color | Checkmark color |

### Style — Button Mode Options
| Key | Type | Mô tả |
|-----|------|-------|
| `buttonSep` | separator | Separator group button style |
| `buttonStyle` | select | `primary`, `secondary`, `light`, `dark`... |
| `buttonSize` | select | `sm`, `md`, `lg`, `xl` |
| `buttonCircle` | checkbox | Border-radius full |
| `buttonOutline` | checkbox | Outline style |
| `buttonOptionsGap` | number+unit | Gap giữa các buttons |
| `buttonBackgroundColor` | color | BG button inactive |
| `buttonBorder` | border | Border button inactive |
| `buttonTypography` | typography | Typography button inactive |
| `buttonActiveSep` | separator | Separator group active button |
| `buttonActiveBackgroundColor` | color | BG button active |
| `buttonActiveBorder` | border | Border button active |
| `buttonActiveTypography` | typography | Typography button active |

### Content — Active Filter Label
| Key | Type | Mô tả |
|-----|------|-------|
| `filterActiveTitle` | text | Label tiêu đề filter trong active-filters widget |
| `filterActivePrefix` | text | Prefix trước giá trị active |
| `filterActiveSuffix` | text | Suffix sau giá trị active |
| `filterApply` | info | Info về apply behavior |

---

## 1. `filter-search`

> **css_selector:** `input` | **PHP:** `filter-search.php`

| Key | Type | Mô tả |
|-----|------|-------|
| `label` | text | Label trên input |
| `labelTypography` | typography | Typography label |
| `placeholder` | text | Placeholder text (default: "Search") |
| `placeholderTypography` | typography | Typography placeholder |
| `icon` | icon | Icon trong input |
| `iconColor` | color | Màu icon |
| `iconSize` | number+unit | Kích thước icon |
| `iconSep` | separator | Separator group icon |
| `inputSep` | separator | Separator group input style |

> **Inherited shared:** `filterQueryId`, `filterNiceName`, `filterApplyOn`, `filterInputDebounce`, `filterMinChars`

---

## 2. `filter-checkbox` & `filter-radio`

> **PHP:** `filter-checkbox.php`, `filter-radio.php` — Không có control riêng, dùng hoàn toàn từ `filter-base.php` (shared controls above).

**Keys quan trọng từ shared:**
- `filterSource`, `filterTaxonomy`, `displayMode` → `"button"` để dùng button mode
- `filterHierarchical`, `filterAutoCheckChildren` → cho category trees
- `filterMultiLogic` → `"AND"` / `"OR"`
- `optionsGap`, `optionsTypography`, `indicatorSize`...

---

## 3. `filter-select`

> **PHP:** `filter-select.php` | **Library:** Choices.js

| Key | Type | Mô tả |
|-----|------|-------|
| `placeholder` | text | Placeholder text |
| `enableMultiple` | checkbox | Multi-select |
| `inputSep` | separator | Separator input style |
| `choicesJs` | checkbox | Bật Choices.js UI (default: true) |
| `choicesInfo` | info | Info về Choices.js |
| `choicesPosition` | select | `"auto"`, `"top"`, `"bottom"` |
| `choicesSearch` | checkbox | Bật search trong dropdown |
| `choicesSearchPlaceholder` | text | Placeholder ô search |
| `choicesNoResultsText` | text | Text khi không có kết quả |
| `choicesNoChoicesText` | text | Text khi không có lựa chọn |
| `choicesSep` | separator | Separator Choices style |
| `choicesPadding` | spacing | Padding select box |
| `choicesBorderBase` | border | Border select box |
| `choicesBorderColor` | color | Border color |
| `choicesBorderRadius` | number | Border radius |
| `choicesFontSize` | number | Font size |
| `choicesTextColor` | color | Text color |
| `choicesBackgroundColor` | color | BG select box |
| `choicesArrowColor` | color | Màu mũi tên dropdown |
| `choicesDropdownBackground` | color | BG dropdown list |
| `choicesItemPadding` | spacing | Padding mỗi item |
| `choicesHighlightBackground` | color | BG item khi hover/selected |
| `choicesHighlightTextColor` | color | Color item khi hover |
| `choicesDisabledBackground` | color | BG disabled item |
| `choicesDisabledTextColor` | color | Color disabled item |
| `choicesPillBackground` | color | BG tag/pill (multi) |
| `choicesPillBorder` | border | Border tag/pill |
| `choicesPillGap` | number+unit | Gap giữa tags |
| `choicesPillTypography` | typography | Typography tags |
| `choicesSearchBackground` | color | BG ô search |
| `choicesSearchInputPadding` | spacing | Padding ô search |
| `choicesSearchInputTypography` | typography | Typography ô search |
| `choicesSearchTypography` | typography | Typography items trong search |

---

## 4. `filter-range`

> **PHP:** `filter-range.php` | **css_selector:** `.noUi-slider`

| Key | Type | Mô tả |
|-----|------|-------|
| `displayMode` | select | `"slider"` hoặc `"input"` |
| `modeSep` | separator | Separator mode |
| `placeholderMin` | text | Placeholder min input |
| `placeholderMax` | text | Placeholder max input |
| `step` | number | Bước nhảy giá trị |
| `decimalPlaces` | number | Số thập phân |
| `labelMin` | text | Label hiển thị min value |
| `labelMax` | text | Label hiển thị max value |
| `labelSeparatorText` | text | Text phân cách min-max (vd: "–") |
| `labelThousandSeparator` | text | Dấu phân cách hàng nghìn (vd: ".") |
| `labelDirection` | select | `"row"`, `"column"` |
| `labelGap` | number+unit | Gap giữa label và input |
| `labelTypography` | typography | Typography labels |
| `disableAutoMinMax` | checkbox | Tắt tự động min/max từ query |
| `sliderBarColor` | color | Màu track bar inactive |
| `sliderBarColorActive` | color | Màu track bar active (range) |
| `sliderBarHeight` | number+unit | Chiều cao track bar |
| `sliderSpacing` | number+unit | Spacing giữa slider và inputs |
| `sliderThumbColor` | color | Màu handle |
| `sliderThumbSize` | number+unit | Kích thước handle |
| `sliderThumbBackgroundColor` | color | BG handle |
| `sliderThumbBorder` | border | Border handle |
| `sliderThumbBorderFull` | checkbox | Border full circle handle |
| `sliderThumbBoxShadow` | box-shadow | Shadow handle |
| `inputWidth` | number+unit | Width mỗi input |
| `inputTypography` | typography | Typography inputs |
| `inputBackgroundColor` | color | BG inputs |
| `inputBorder` | border | Border inputs |
| `inputUseCustomStepper` | checkbox | Dùng custom stepper buttons |
| `inputCustomStepperSep` | separator | Separator custom stepper |
| `inputCustomStepperButtonGap` | number+unit | Gap stepper buttons |
| `inputCustomStepperInputGap` | number+unit | Gap input-stepper |
| `inputCustomStepperButtonBackgroundColor` | color | BG stepper buttons |
| `inputCustomStepperButtonBorder` | border | Border stepper buttons |
| `inputCustomStepperButtonTypography` | typography | Typography stepper buttons |
| `optionSep` | separator | Separator chung |

---

## 5. `filter-datepicker`

> **PHP:** `filter-datepicker.php` | **Library:** flatpickr

| Key | Type | Mô tả |
|-----|------|-------|
| `placeholder` | text | Placeholder text |
| `placeholderTypography` | typography | Typography placeholder |
| `dateFormat` | text | Format ngày (default: `"Y-m-d"`). Xem flatpickr docs |
| `l10n` | select | Locale ngôn ngữ |
| `icon` | icon | Icon calendar |
| `iconColor` | color | Màu icon |
| `iconSize` | number+unit | Kích thước icon |
| `iconSep` | separator | Separator group icon |

---

## 6. `filter-submit`

> **PHP:** `filter-submit.php`

| Key | Type | Mô tả |
|-----|------|-------|
| `text` | text | Text button Apply (default: "Apply") |
| `icon` | icon | Icon button |
| `iconColor` | color | Màu icon |
| `iconSize` | number+unit | Kích thước icon |
| `style` | select | `primary`, `secondary`, `light`, `dark`, `white`... |
| `size` | select | `sm`, `md`, `lg`, `xl` |
| `circle` | checkbox | Border-radius full |
| `outline` | checkbox | Outline style |
| `direction` | select | `"row"` (icon trước text) hoặc `"row-reverse"` |
| `gap` | number+unit | Gap icon-text |
| `buttonSep` | separator | Separator group button style |

---

## Ví dụ JSON — Filter Setup

### Filter Taxonomy + Checkbox
```json
{
  "id": "flChk",
  "name": "filter-checkbox",
  "parent": "ctnFilters",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterSource": "taxonomy",
    "filterTaxonomy": "category",
    "filterNiceName": "_cat",
    "filterMultiLogic": "OR",
    "filterHideEmpty": true,
    "optionsGap": "8px",
    "optionsTypography": {"font-size": "14px"}
  }
}
```

### Filter Range (Price)
```json
{
  "id": "flRange",
  "name": "filter-range",
  "parent": "ctnFilters",
  "settings": {
    "filterQueryId": "postsLoop",
    "filterSource": "customField",
    "customFieldKey": "price",
    "displayMode": "slider",
    "step": 10,
    "labelSeparatorText": "–",
    "labelThousandSeparator": ".",
    "sliderBarColorActive": {"hex": "#007cfc"}
  }
}
```

### Submit Button
```json
{
  "id": "flSubmit",
  "name": "filter-submit",
  "parent": "ctnFilters",
  "settings": {
    "text": "Apply Filters",
    "style": "primary",
    "size": "md",
    "icon": {"library": "themify", "icon": "ti-search"},
    "filterApplyOn": "click"
  }
}
```
