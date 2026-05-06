# Production Patterns — Extracted from [2026] LDP Templates

> **Source:** Live templates trên `stag.vietnix.dev`  
> **Groups analyzed:** LDP VPS AI, MaxSpeed Hosting, OpenClaw  
> **Purpose:** "Ground truth" từ production — dùng làm chuẩn khi build mới

---

## 1. LAYOUT ROOT (Bất biến)

Mọi template đều có cấu trúc gốc:

```
section (depth 0)
  └─ container (depth 1)        ← Direct child duy nhất của section
       └─ block / widget...
```

**Không bao giờ** có `block` trực tiếp là con của `section` (ngoại trừ image background).

> **Ngoại lệ đã quan sát (MaxSpeed Banner):** Có 2 `image` trực tiếp trong `section` (depth 1) nhưng **trước** `container`. Đây là ảnh background dạng absolute — vẫn hợp lệ.

---

## 2. ACCORDION-NESTED PATTERN

### 2A — FAQ Section (OpenClaw "Các câu hỏi")
Cấu trúc accordion thuần FAQ — phổ biến nhất:

```
section > container
  └─ heading                   ← Section title
  └─ block                     ← Subtitle wrapper (1 text-basic)
  └─ accordion-nested (depth 2)
       ├─ block (item 1)
       │    ├─ block (header)  ← heading + icon (toggle icon)
       │    └─ block (body)    ← text (answer)
       ├─ block (item 2)
       │    ├─ block (header)
       │    └─ block (body)
       └─ ... (19 items tổng — 19 accordion items)
```

**Key observations:**
- `accordion-nested` ở **depth 2** (con trực tiếp của container)
- Mỗi item = **1 `block`** chứa 2 con: header block + body block
- Header block = `heading` + `icon` (toggle icon)
- Body block = `text` (không phải `text-basic`)
- **19 items** — không rút gọn, build đủ

### 2B — Accordion trong 2-Column Layout (MaxSpeed "Giải pháp tốc độ")
Accordion lồng trong layout phức tạp hơn:

```
section > container
  └─ heading, text-basic, text-basic (section intro)
  └─ block (2-col wrapper)
       ├─ block (col left — tabs+accordion area)
       │    ├─ block (tab switcher — text-basic + button items)
       │    └─ block (accordion content area)
       │         └─ accordion-nested (depth 5!)
       │              ├─ block (item 1)
       │              │    ├─ block (heading + icon)
       │              │    └─ block (text-basic)
       │              ├─ block (item 2)
       │              └─ block (item 3)
       └─ block (col right — images + code)
            ├─ image, image, image
            └─ code
```

**Key observations:**
- `accordion-nested` có thể nằm ở depth rất sâu (depth 5+) — hoàn toàn hợp lệ
- 3 accordion items tương ứng 3 "giải pháp tốc độ"
- `code` widget dùng để embed dynamic content (e.g., benchmark chart)

---

## 3. SLIDER-NESTED PATTERN

### 3A — Review Slider (MaxSpeed "Đánh giá chất lượng")
Slider phức tạp với 2 loại slide cards:

```
section > container
  └─ block (title area)        ← heading + text
  └─ block (slider wrapper 1 — logo sliders)
       └─ slider-nested
            ├─ block (slide — logo row)
            │    └─ block
            │         ├─ block (quote icon wrapper) → svg
            │         ├─ block (logo row) → image × 5
            │         └─ text-basic (tagline)
            └─ block × 3 more logo rows
  └─ block (slider wrapper 2 — review cards với image)
       └─ slider-nested
            ├─ block (slide)
            │    ├─ image (avatar)
            │    └─ block (content)
            │         ├─ block (quote icon) → svg
            │         ├─ block (star rating) → div > icon × 5
            │         ├─ divider
            │         └─ block (name + title) → heading × 2
            └─ block × 3 more
  └─ block (slider wrapper 3 — thumbnail sliders)
       └─ slider-nested
            ├─ block (slide)
            │    ├─ block (header) → heading × 2 + image
            │    └─ block (thumbnail row) → image × 5
            └─ ... more slides
```

**Key observations:**
- **3 separate `slider-nested`** trong cùng 1 section để sync hoặc serve different breakpoints
- Review card anatomy: `image` (avatar) + `svg` (quote icon) + `div > icon × 5` (stars) + `divider` + `heading × 2` (name + company)
- **Star rating** = `div` wrapper chứa 5 `icon` → KHÔNG dùng `text` hay `svg`
- `divider` dùng phân cách name/content trong review card

### 3B — Feature Slider (VPS Banner S01, S05)
Slider đơn giản cho banner và feature cards:

```
slider-nested
  └─ block (slide)
       ├─ block (text content) → text-basic, heading, text-basic
       └─ block (image area) → image
```

### 3C — tabs-nested + slider-nested Combo (OpenClaw "Mô hình hoạt động")
Pattern kết hợp hiếm gặp nhưng có trong production:

```
block
  └─ tabs-nested (depth 4)
       ├─ slider-nested (depth 5) ← Tab nav dạng slider!
       │    ├─ div > text-basic (tab label 1)
       │    ├─ div > text-basic (tab label 2)
       │    ├─ div > text-basic (tab label 3)
       │    └─ div > text-basic (tab label 4)
       └─ block (tab panels)
            ├─ block (panel 1)
            │    └─ block > block > (heading + text) + block > image
            ├─ block (panel 2)
            ├─ block (panel 3)
            └─ block (panel 4)
```

**Key observations:**
- `slider-nested` dùng làm **tab navigation** thay vì content carousel
- Mỗi tab nav item = `div > text-basic`
- Tab panels là `block` bình thường
- Depth có thể lên đến 9 levels — Bricks không giới hạn depth

---

## 4. ICON-BOX PATTERN

### 4A — Feature Cards với Icon-Box (MaxSpeed "Tính năng nổi bật")
```
section > container
  └─ block (title wrapper) → heading
  └─ block (5-tab layout — horizontal scroll)
       ├─ block (tab 1 content)
       │    ├─ block (left col) → heading + text + block > icon-box × 3
       │    └─ block (right col) → image
       ├─ block (tab 2 content)
       │    ├─ block → heading + text + block > icon-box × 3
       │    └─ block → image
       └─ ... × 5 tabs total
```

**Key observations:**
- `icon-box` luôn nhóm với nhau (`block > icon-box × N`)
- Mỗi tab = 2-column: left (text + features) + right (image)
- `text` (không phải `text-basic`) dùng cho body paragraph trong section này
- Pattern lặp lại 5 lần (5 tabs) — build đủ, không rút gọn

---

## 5. WIDGET USAGE RULES (từ production)

### 5A — `text` vs `text-basic`

| Widget | Khi nào dùng |
|--------|-------------|
| `text` | Body paragraph trong section content (editable, styled) |
| `text-basic` | Short inline text, badge, tag, label, caption |

**Quan sát thực tế:**
- Accordion body → `text` (không phải `text-basic`)
- Review card tagline → `text-basic`
- Section description (paragraph) → `text` hoặc `text-basic` tùy context

### 5B — `heading` vs `text-basic` cho title

| Dùng `heading` | Dùng `text-basic` |
|---------------|------------------|
| H1, H2, H3 section titles | Eyebrow label ("VPS AI", "NEW") |
| Card titles | Short subtitle/caption |
| Accordion question title | Tab switcher label |
| Review name/company | Badge/tag |

### 5C — `div` wrapper pattern

`div` được dùng khi cần **nhóm inline elements** mà không phải flex column:
- Star rating: `div > icon × 5`
- Inline badge: `div > svg + text-basic`
- Tab indicator: `div > text-basic`

### 5D — `svg` vs `icon`

| Widget | Khi nào dùng |
|--------|-------------|
| `svg` | Custom SVG artwork, quote marks, decorative graphics |
| `icon` | UI icons (arrows, stars, checkmarks, social icons) |

---

## 6. BACKGROUND IMAGE PATTERN (MaxSpeed Banner)

```json
{
  "id": "uomuey",
  "name": "section",
  "children": [
    {"id": "iqgksu", "name": "image"},  ← background image 1 (absolute)
    {"id": "cpfdrv", "name": "image"},  ← background image 2 (absolute)
    {"id": "rigmen", "name": "container"}  ← main content
  ]
}
```

**Rules:**
- Background images là **siblings** của `container`, placed **TRƯỚC** container trong array
- Section phải có `_position: "relative"`
- Image có `_position: "absolute"`, `_top: "0"`, `_left: "0"`, `_width: "100%"`, `_height: "100%"`
- `_objectFit: "cover"` trên image

---

## 7. TRUST BADGES / LOGO ROW PATTERN

```
block (logos wrapper, flex row)
  ├─ block (badge/cert item)
  │    ├─ image (cert logo)
  │    └─ block → image × 5 (partner logos trong hàng)
  └─ text-basic (caption "Trusted by...")
```

Xuất hiện trong MaxSpeed Banner — section banner có trust badges bên dưới CTA.

---

## 8. SECTION HEADER PATTERNS

### Minimal (heading only):
```
section > container
  └─ heading (H2)
```

### Standard (heading + subtitle):
```
section > container
  └─ block (header wrapper, text-align center)
       ├─ text-basic (eyebrow label)  ← optional
       ├─ heading (H2)
       └─ text (subtitle paragraph)
```

### 2-line với styled text:
```
container
  └─ heading (line 1 — normal)
  └─ heading (line 2 — colored, gradient)  ← 2 heading widgets
  └─ text
```

---

## 9. DEPTH REFERENCE TABLE

| Pattern | Max depth observed |
|---------|-------------------|
| Banner (slider) | 6 |
| Feature tabs (icon-box) | 6 |
| Accordion FAQ | 5 |
| Review slider (nested cards) | 8 |
| tabs + slider combo | 9 |

> Bricks không giới hạn depth. Depth sâu = phức tạp nhưng hoàn toàn hợp lệ.

---

## 10. PRODUCTION WIDGET FREQUENCY

Từ 6 templates đã analyze:

| Widget | Tần suất | Ghi chú |
|--------|----------|---------|
| `block` | ★★★★★ | Ubiquitous layout container |
| `text-basic` | ★★★★★ | Short text everywhere |
| `heading` | ★★★★★ | Titles |
| `image` | ★★★★★ | Photos, logos, illustrations |
| `text` | ★★★★☆ | Body paragraphs |
| `slider-nested` | ★★★★☆ | Carousels, reviews |
| `accordion-nested` | ★★★☆☆ | FAQ, features |
| `icon` | ★★★☆☆ | Stars, arrows, UI icons |
| `icon-box` | ★★★☆☆ | Feature bullets |
| `tabs-nested` | ★★☆☆☆ | Multi-section content |
| `svg` | ★★☆☆☆ | Custom graphics |
| `div` | ★★☆☆☆ | Inline grouping |
| `button` | ★★☆☆☆ | CTA |
| `divider` | ★★☆☆☆ | Review card separator |
| `code` | ★☆☆☆☆ | Embed widgets, charts |

---

*Last updated: 2026-05-06 | Based on: [2026] LDP templates (VPS AI, MaxSpeed Hosting, OpenClaw)*
