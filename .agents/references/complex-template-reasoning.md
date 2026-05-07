# Complex Template Reasoning Guide

> **Mục đích:** Giúp AI tự tư duy đúng khi gặp templates phức tạp (depth > 5, slider lồng tabs, multi-slider sections).  
> **Nguồn:** Extracted từ OpenClaw LDP templates đã verify trên production (`stag.vietnix.dev`).  
> **Đọc file này TRƯỚC khi build bất kỳ section nào có slider, tabs, hoặc depth > 4.**

---

## PHẦN 1 — MENTAL MODEL: ĐỌC FIGMA → NHẬN DIỆN PATTERN

### Bước 1: Đếm "vùng lặp lại"

Khi nhìn vào một section trong Figma, câu hỏi đầu tiên:

```
❓ Có vùng nào lặp lại không?
   → Nếu có scroll ngang: đây là SLIDER → dùng slider-nested
   → Nếu có tabs chuyển nội dung: đây là TABS → dùng tabs-nested  
   → Nếu có FAQ expand/collapse: đây là ACCORDION → dùng accordion-nested
   → Nếu chỉ là grid tĩnh: block > [item × N]
```

**KHÔNG BAO GIỜ** dùng `block` để fake slider/tabs/accordion bằng CSS.

### Bước 2: Xác định "slide item" anatomy

Khi đã xác định là slider, hỏi tiếp:

```
❓ Mỗi slide item gồm gì?
   → Chỉ 1 image: block > image  (đơn giản nhất)
   → Image + text: block > (image + block(text group))
   → Card full: block > image + block(stars) + block(text) + block(name)
   → Feature card: block > block(icon+title) + block(content)
```

Pattern anatomy này quyết định depth của slide từ đó suy ra depth tổng.

### Bước 3: Tính depth từ root

```
section (depth 0)
└─ container (depth 1)       ← LUÔN CÓ
   └─ block (section wrapper, depth 2)
      └─ slider-nested (depth 3)
         └─ block/slide (depth 4)
            └─ [anatomy] (depth 5+)
```

Nếu slider nằm trong tabs:
```
section (depth 0)
└─ container (depth 1)
   └─ block (depth 2)
      └─ block (depth 3)
         └─ tabs-nested (depth 4)
            ├─ slider-nested (depth 5)   ← tab nav
            └─ block (panels, depth 5)
               └─ block/panel (depth 6)
                  └─ [content] (depth 7+)
```

> **Rule:** Depth 9 là maximum đã quan sát trong production. Không có giới hạn kỹ thuật nào từ phía Bricks.

---

## PHẦN 2 — VERIFIED PATTERNS (Copy và điều chỉnh ID)

### PATTERN A — Slider Logo (1 image per slide)

**Source:** OpenClaw Banner (ID: 463152) — `slider-nested` trong block "logo area"

```
section > container
  └─ block (main layout — 2 col)
       ├─ block (left col — text content, depth 3)
       └─ block (right col — slider wrapper, depth 3)
            └─ slider-nested (depth 4)
                 ├─ block (slide 1, depth 5) → image (depth 6)
                 ├─ block (slide 2, depth 5) → image (depth 6)
                 ├─ block (slide 3, depth 5) → image (depth 6)
                 └─ ... (8 slides tổng)
```

**JSON structure (compact):**
```json
{"id": "slwrXXX", "name": "block", "parent": "ctnXXX", "settings": {"_width": "100%"}},
{"id": "sldrXXX", "name": "slider-nested", "parent": "slwrXXX"},
{"id": "sl1sXXX", "name": "block", "parent": "sldrXXX"},
{"id": "sl1iXXX", "name": "image", "parent": "sl1sXXX", "settings": {"image": {"url": "..."}, "_width": "100%", "_height": "auto"}}
```

**Key:** Slider wrapper block nhận full width, slider-nested tự xử lý overflow.

---

### PATTERN B — Feature Card Slider (image + text per slide)

**Source:** OpenClaw "Tại sao chọn" (ID: 463160) — 6 slides, mỗi slide = 1 feature card

```
section > container
  ├─ block (section header, depth 2)
  │    ├─ heading (depth 3)
  │    └─ text-basic (depth 3)
  └─ block (slider wrapper, depth 2)
       └─ slider-nested (depth 3)
            ├─ block (slide 1, depth 4)          ← 1 slide = 1 feature card
            │    └─ block (card inner, depth 5)  ← WRAPPPER EKSTRA trong slide
            │         ├─ image (feature icon, depth 6)
            │         └─ block (text group, depth 6)
            │              ├─ heading (feature title, depth 7)
            │              └─ text-basic (feature desc, depth 7)
            ├─ block (slide 2, depth 4)
            │    └─ block (card inner, depth 5)
            │         ├─ image (depth 6)
            │         └─ block (text group, depth 6)
            │              ├─ heading (depth 7)
            │              └─ text-basic (depth 7)
            └─ ... × 6 slides total
```

**⚠️ Gotcha:** Mỗi slide có 1 block wrapper bên trong (card inner) trước content thực sự.  
→ Đây là level trung gian để control card padding/background riêng biệt với slide wrapper.

**Pattern lặp lại có thể template hóa:**
```
[slide-N]:
  block (slide wrapper) → parent: slider-nested
    block (card inner) → parent: slide wrapper  
      image → parent: card inner
      block (text group) → parent: card inner
        heading → parent: text group
        text-basic → parent: text group
```

---

### PATTERN C — tabs-nested + slider-nested Combo (đã verify depth=9)

**Source:** OpenClaw "Mô hình hoạt động" (ID: 463174) — 3 `tabs-nested` + 3 `slider-nested`

```
section > container
  └─ block (section wrapper, depth 2)
       ├─ block (section header, depth 3)
       │    ├─ heading (depth 4)
       │    └─ text (depth 4)
       └─ block (tabs area, depth 3)
            └─ tabs-nested (depth 4)
                 ├─ slider-nested (tab nav, depth 5)   ← slider LÀM NAVIGATION
                 │    ├─ div (tab item 1, depth 6)
                 │    │    └─ text-basic (label, depth 7)
                 │    ├─ div (tab item 2, depth 6)
                 │    │    └─ text-basic (label, depth 7)
                 │    ├─ div (tab item 3, depth 6) → text-basic
                 │    └─ div (tab item 4, depth 6) → text-basic
                 └─ block (panels container, depth 5)
                      ├─ block (panel 1, depth 6)
                      │    └─ block (panel inner, depth 7)
                      │         └─ block (content row, depth 8)
                      │              ├─ block (left — text, depth 9→ heading + text)
                      │              └─ block (right — image, depth 9→ image)
                      ├─ block (panel 2, depth 6) ← same structure
                      ├─ block (panel 3, depth 6) ← same structure
                      └─ block (panel 4, depth 6) ← same structure
```

**⚠️ Critical insights:**
1. `div` (KHÔNG phải `block`) là tab navigation items trong slider
2. `text-basic` (không phải `heading`) cho tab labels
3. `tabs-nested` có 2 children: `slider-nested` (nav) + `block` (panels)
4. Panel content depth có thể đến 9 — hoàn toàn valid trong Bricks
5. Template này có **128 elements total** — build tuần tự, không cố gắng batch

---

### PATTERN D — Banner 2-col với Background Images

**Source:** OpenClaw Banner (ID: 463152) — 2 ảnh background + container

```
section
  ├─ image (bg-1, depth 1, position absolute)
  ├─ image (bg-2, depth 1, position absolute)  ← TRƯỚC container
  └─ container (depth 1)
       └─ block (2-col row, depth 2)
            ├─ block (left col — all text & CTA, depth 3)
            │    └─ block (content stack, depth 4)
            │         ├─ block (hero text area, depth 5)
            │         │    ├─ text (eyebrow, depth 6)  ← `text` ko phải `text-basic`
            │         │    └─ block (heading wrapper, depth 6)
            │         │         ├─ heading (line1, depth 7)
            │         │         └─ heading (line2 — colored, depth 7)
            │         ├─ block (subtitle, depth 5)
            │         │    └─ text-basic (depth 6)
            │         ├─ block (features row, depth 5)
            │         │    ├─ icon-box (feature 1, depth 6)
            │         │    ├─ icon-box (feature 2, depth 6)
            │         │    └─ icon-box (feature 3, depth 6)
            │         └─ block (CTA row, depth 5)
            │              ├─ block (button wrapper, depth 6)
            │              │    └─ button (depth 7)
            │              └─ icon-box (secondary CTA, depth 6)
            └─ block (right col — image/slider, depth 3)
                 └─ image (hero image, depth 4)  ← Single image hoặc slider tùy design
```

**⚠️ Key rules cho Banner pattern:**
- Background images ở depth 1 (siblings của container), TRƯỚC container trong children array
- Hero heading thường dùng **2 heading widgets** (line 1 + line 2 colored) — không dùng 1 heading với styled text
- `text` (không phải `text-basic`) cho eyebrow/tagline dài trong banner
- `icon-box` × 3 nhóm trong 1 block là pattern phổ biến cho "3 features bullet trong banner"

---

## PHẦN 3 — DECISION TREE: CHỌN WIDGET ĐÚNG

### 3A — Khi nào dùng slider-nested?

```
Người dùng có thể scroll/swipe ngang? → slider-nested
Figma có nút prev/next? → slider-nested
Figma có dots pagination? → slider-nested
Chỉ là logo row tĩnh không tương tác? → block (flex row) với overflow-x: scroll (hiếm)
```

### 3B — Khi nào dùng tabs-nested?

```
Có nội dung chuyển đổi khi click tab? → tabs-nested
Tab navigation là một hàng các text items click được? → tabs-nested
   └─ Tab nav là slider có thể scroll? → tabs-nested + slider-nested bên trong
```

### 3C — `div` vs `block`?

| Tình huống | Widget |
|-----------|--------|
| Tab nav item (trong tabs-nested > slider-nested) | `div` |
| Star rating wrapper (icon × 5) | `div` |
| Badge inline (svg + text) | `div` |
| Bất kỳ container layout nào khác | `block` |

> **Rule:** `div` = inline-level semantic. `block` = block-level container. Trong Bricks production:  
> tabs item = `div`, general purpose container = `block`.

### 3D — `text` vs `text-basic`?

| Tình huống | Widget |
|-----------|--------|
| Paragraph dài trong body section | `text` |
| Body text trong tabs/accordion panels | `text` |
| Short label, eyebrow, badge, caption | `text-basic` |
| Tab navigation label | `text-basic` |
| Feature description trong card | `text-basic` (nếu ngắn) hoặc `text` (nếu nhiều dòng) |
| Sub-heading/tagline 1 dòng | `text-basic` |

---

## PHẦN 4 — ANTI-PATTERNS (Đã sai trong OpenClaw build)

### ❌ Anti-Pattern 1: Quên wrapper block giữa slider và slide content

```
❌ SAI:
slider-nested
  └─ image (trực tiếp)   ← image không có block wrapper

✅ ĐÚNG:
slider-nested
  └─ block (slide wrapper)
       └─ image
```

**Lý do:** Bricks dùng slide wrapper block để apply slide-specific styling (padding, bg của từng slide). Thiếu wrapper → item không thể style độc lập.

### ❌ Anti-Pattern 2: Dùng block cho tab nav items

```
❌ SAI:
tabs-nested
  └─ slider-nested (nav)
       └─ block (tab item)
            └─ text-basic

✅ ĐÚNG:
tabs-nested
  └─ slider-nested (nav)
       └─ div (tab item)     ← PHẢI là div
            └─ text-basic
```

**Lý do:** `tabs-nested` lắng nghe click trên `.brxe-div` elements trong slider-nav để trigger tab switch. Dùng `block` → click không trigger tab change.

### ❌ Anti-Pattern 3: Thiếu inner card block trong feature card slider

```
❌ SAI:
block (slide)
  ├─ image
  └─ heading

✅ ĐÚNG:
block (slide)
  └─ block (card inner)   ← LUÔN CÓ khi slide phức tạp hơn 1 element
       ├─ image
       └─ block (text group)
            ├─ heading
            └─ text-basic
```

**Lý do:** Card inner block = visual container cho card. Slide wrapper = Bricks-structural wrapper. Tách 2 concerns ra.

### ❌ Anti-Pattern 4: Build slider với count sai

```
❌ SAI: Build 4 slides khi Figma có 6 (vì "tiết kiệm")

✅ ĐÚNG: Đếm chính xác số items trong Figma, build đủ
```

**Rule:** Đếm số items bằng cách zoom vào Figma, count từng card/slide. Template "Tại sao chọn" = 6 slides, "Logo banner" = 8 slides.

### ❌ Anti-Pattern 5: Đặt slider-nested trực tiếp trong container

```
❌ SAI:
section > container
  └─ slider-nested   ← trực tiếp dưới container

✅ ĐÚNG:
section > container
  └─ block (slider wrapper)   ← luôn có 1 block wrapper trước slider
       └─ slider-nested
```

**Lý do:** Slider wrapper block kiểm soát padding, max-width, và responsive behavior của slider container. Đặt slider-nested trực tiếp dưới container → mất control styling.

---

## PHẦN 5 — DEPTH CALCULATION WORKSHEET

Khi cần tính depth trước khi build, dùng worksheet này:

```
Bước 1: Từ root đến slider/tabs:
  section (0) → container (1) → [wrapper blocks] (+n) → slider/tabs (+1) = X

Bước 2: Bên trong slider/tabs:
  slider → block/slide (+1) → [inner blocks] (+n) → leaf widget (+1) = Y

Bước 3: Max depth = X + Y

Kiểm tra: Max depth > 9? → Đây là dấu hiệu structure sai (tách nhỏ hơn)
           Max depth 6-9? → Normal cho complex section
           Max depth <= 5? → Simple section
```

**Ví dụ thực tế:**
| Template | Root→Slider | Slide anatomy | Max depth |
|----------|------------|---------------|-----------|
| OpenClaw Banner (logo slider) | 0→1→2→3→4 | block→image | 6 |
| OpenClaw Tại sao chọn | 0→1→2→3 | block→block→image+block(text) | 7 |
| OpenClaw Mô hình hoạt động | 0→1→2→3→4→5 | block×3→heading/text | 9 |

---

## PHẦN 6 — MENTAL MODEL: BUILD ORDER CHO COMPLEX SECTIONS

Khi section có > 80 elements (như "Mô hình hoạt động" = 128 elements):

### Build order tốt:
1. **Root structure trước:** `section` → `container` → block wrappers (depth 0-3)
2. **Section header:** heading + text intro (đơn giản)
3. **Nested widget:** `tabs-nested` hoặc `slider-nested` wrapper
4. **Navigation layer:** Tab nav items hoặc slider nav
5. **Content panels:** từng panel (1 tab/1 time)
6. **Leaf widgets:** heading, text, image trong mỗi panel

### Validate sau mỗi layer:
```
□ Sau khi push: mcp_bricks-mcp_content(action: "get", view: "summary") → kiểm tra tree
□ Section ở depth 0 → ✅
□ Container là direct child duy nhất của section → ✅ 
□ slider-nested có đúng N slide items không? → count children
□ tabs-nested có đúng: slider (nav) + block (panels)? → verify 2 direct children
```

---

## PHẦN 7 — REFERENCE: OpenClaw Template ID Map

| Template | ID | Tổng elements | Pattern chính | Max depth |
|----------|----|--------------|--------------|-----------|
| Banner | 463152 | 44 | 2bg + 2col + slider(logos) | 6 |
| Tại sao chọn | 463160 | 61 | section-header + feature-slider | 7 |
| Mô hình hoạt động | 463174 | 128 | tabs(slider-nav) + multi-panel | 9 |
| Review (post-comments) | 463190 | 4 | post-comments + code embed | 2 |

> **Dùng**: `mcp_bricks-mcp_content(action: "get", post_id: [ID], view: "summary")` để re-read bất kỳ template nào khi cần.

---

*Last updated: 2026-05-06 | Source: OpenClaw LDP templates analysis, stag.vietnix.dev*
