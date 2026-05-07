# Component: Common Patterns

> **Dùng khi:** Build JSON trong `/bricks-create-template`.
> Đây là tập hợp các pattern **đã được verify** — copy và điều chỉnh ID, không tự suy luận lại.

---

## PATTERN 1 — Background Full-Cover Block

> ❌ SAI: Copy fixed pixel values từ Figma (e.g. `1361px × 577px`)
> ✅ ĐÚNG: Position absolute + 100% × 100% + top:0 left:0

```json
{
  "id": "bgwXXX",
  "name": "block",
  "parent": "[parent-with-position-relative]",
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "0",
    "_opacity": 0.5,
    "_cssCustom": "#brxe-bgwXXX { pointer-events: none; }"
  }
},
{
  "id": "bgiXXX",
  "name": "image",
  "parent": "bgwXXX",
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "cover"
  }
}
```

> Parent của `bgwXXX` **bắt buộc** có `_position: "relative"` và `_overflow: "hidden"`.

---

## PATTERN 2 — Centering Oversized Element (trên mobile)

> Dùng khi element lớn hơn container và cần căn giữa (ví dụ: mask group `width: 140%`).
> ❌ SAI: `transform: translateX(-20%)` — tính % của element width
> ✅ ĐÚNG: `left: 50% + transform: translateX(-50%)` — center chuẩn

```css
/* Trong _cssCustom */
#brxe-mskXXX {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 140.46%;   /* lớn hơn parent → overflow cả 2 bên */
  height: auto;
  aspect-ratio: 1/1;
}
```

> Parent phải có `overflow: visible` nếu muốn overflow hiển thị ra ngoài.
> Parent gần nhất có `overflow: hidden` (ví dụ: card) sẽ clip phần dư.

---

## PATTERN 3 — Fixed-size Image Wrapper (relative + absolute inset)

> Dùng cho badges, thumbnails, avatars có kích thước cố định.

```json
{
  "id": "wprXXX",
  "name": "block",
  "parent": "[flex-parent]",
  "settings": {
    "_position": "relative",
    "_width": "144px",
    "_height": "60px",
    "_flexShrink": "0"
  }
},
{
  "id": "imgXXX",
  "name": "image",
  "parent": "wprXXX",
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"},
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "cover"
  }
}
```

> `_flexShrink: "0"` — bắt buộc khi wrapper có fixed size trong flex row (RULE 6).

---

## PATTERN 4 — SVG Mask on Profile Image (Block Mask — KHÔNG dùng position:absolute)

> **Cách đúng (verified):** Mask wrapper flow tự nhiên trong flex, KHÔNG dùng position:absolute.
> Image bên trong KHÔNG cần CSS — Bricks default tự render đúng.
> Desktop/mobile dùng `_cssCustom:mobile_portrait` riêng — KHÔNG dùng `@media` trong CSS.

### Tại sao KHÔNG dùng `position:absolute` cho mask wrapper?

```
❌ SAI: position:absolute + left:calc(50%+Xpx) + transform:translateX(-50%)
   → Phức tạp, khó responsive, phụ thuộc vào kích thước parent

✅ ĐÚNG: mask wrapper flow tự nhiên trong flex parent (align-items: flex-end)
   → Đơn giản, responsive tự nhiên, dễ quản lý
```

**Mask wrapper** (`mskXXX`) — flow tự nhiên, KHÔNG position:absolute:
```json
{
  "id": "mskXXX",
  "name": "block",
  "parent": "picXXX",
  "settings": {
    "_width": "599px",
    "_height": "599px",
    "_width:mobile_portrait": "auto",
    "_height:mobile_portrait": "auto",
    "_cssCustom": "#brxe-mskXXX { -webkit-mask-image: url('[desktop-svg-url]'); mask-image: url('[desktop-svg-url]'); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: Wpx Hpx; mask-size: Wpx Hpx; -webkit-mask-position: Xpx Ypx; mask-position: Xpx Ypx; }",
    "_cssCustom:mobile_portrait": "#brxe-mskXXX { -webkit-mask-image: url('[mobile-svg-url]'); mask-image: url('[mobile-svg-url]'); -webkit-mask-size: Wpx Hpx; mask-size: Wpx Hpx; -webkit-mask-position: Xpx Ypx; mask-position: Xpx Ypx; }"
  }
}
```

**Portrait image bên trong mask** (`proXXX`) — KHÔNG cần CSS:
```json
{
  "id": "proXXX",
  "name": "image",
  "parent": "mskXXX",
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"}
  }
}
```

> **Bricks default sẽ tự render:** `img { width:100%; height:auto; }` → ảnh fill 599px width, tự responsive.
> **Parent (`picXXX`) cần:** `_height:mobile_portrait: "auto"` và `_overflow:mobile_portrait: "visible"` nếu cần.
> **Flex parent của `picXXX`:** `_alignItems: "flex-end"` → mask wrapper align bottom card tự động.

---

## PATTERN 5 — Mobile Gap Trace (trước khi set _rowGap)

> Trước khi set gap trên mobile, trace mental model layout:

```
Desktop:  section → container → [bgw(abs)] + row(flex-row) → left + right
Mobile:   section → container → [bgw(abs)] + row(flex-COL) → left(text) + right(img)

Gap giữa text và image trên mobile = _rowGap:mobile_portrait trên [row]
KHÔNG phải _rowGap trên [container] (vì bgw là absolute, không chiếm space)
```

**Checklist trước khi set gap:**
```
□ Element nào sẽ là flex-column trên mobile?
□ Gap cần nằm trên container đó (flex parent của các child cần gap)
□ Có element nào position:absolute trong container không? → Không chiếm flex space
□ _columnGap (desktop flex-row) ≠ _rowGap (mobile flex-column) — cần set riêng
```

---

## PATTERN 6 — Layout Engine Root (section → container)

> ❌ SAI: `section` → `block` (trực tiếp)
> ✅ ĐÚNG: `section` → `container` → `block` → widgets

```json
{"id": "secXXX", "name": "section", "parent": 0, "children": ["ctnXXX"]},
{"id": "ctnXXX", "name": "container", "parent": "secXXX", "children": ["blk1", "blk2"]},
{"id": "blk1",   "name": "block",     "parent": "ctnXXX", "children": [...]}
```

> `container` = visual card / inner wrapper. **Không phải** một extra empty div.
> Container có thể mang toàn bộ visual settings của card (bg, border-radius, overflow).

---

## PATTERN 7 — Right Column Self-Stretch trong Flex Row

> Khi row có `align-items: flex-end`, column muốn self-stretch phải override:

```json
{
  "id": "rgtXXX",
  "name": "block",
  "parent": "rowXXX",
  "settings": {
    "_display": "flex",
    "_flexGrow": "1",
    "_flexShrink": "1",
    "_alignSelf": "stretch",
    "_alignItems": "flex-end"
  }
}
```

> `_alignSelf: "stretch"` override parent's `_alignItems: "flex-end"` cho riêng element này.
> Nếu không set → column collapsed (height = 0) → nội dung absolute bên trong vô hình.

---

## PATTERN 8 — Dual Background (Desktop + Mobile khác nhau)

> Khi desktop và mobile dùng 2 BG khác nhau (ví dụ: xoay 90°, ảnh khác, layout khác).
> ✅ ĐÚNG: Dùng **2 block BG riêng** + toggle `_display: "none"` theo breakpoint.
> ❌ SAI: 1 block BG + CSS `transform: rotate(90deg)` trong `@media` → khó control, dễ sai size.

```json
{
  "id": "bgdXXX",
  "name": "block",
  "children": ["bgiXXX"],
  "parent": "[container-with-relative]",
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "0",
    "_opacity": 0.5,
    "_display:mobile_portrait": "none",
    "_cssCustom": "#brxe-bgdXXX { pointer-events: none; }"
  }
},
{
  "id": "bgiXXX",
  "name": "image",
  "parent": "bgdXXX",
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[desktop-hash].png"},
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "cover"
  }
},
{
  "id": "bgmXXX",
  "name": "block",
  "children": ["bgmiXXX"],
  "parent": "[container-with-relative]",
  "settings": {
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_zIndex": "0",
    "_opacity": 0.5,
    "_display": "none",
    "_display:mobile_portrait": "block",
    "_cssCustom": "#brxe-bgmXXX { pointer-events: none; }"
  }
},
{
  "id": "bgmiXXX",
  "name": "image",
  "parent": "bgmXXX",
  "settings": {
    "image": {"id": 0, "url": "http://localhost:3845/assets/[mobile-hash].png"},
    "_position": "absolute",
    "_top": "0px",
    "_left": "0px",
    "_width": "100%",
    "_height": "100%",
    "_objectFit": "cover"
  }
}
```

> **Thứ tự trong `children` của container:** `["bgdXXX", "bgmXXX", "rowXXX", ...]`
> Cả 2 block đều `position: absolute` → không chiếm flex space của container.
> `_display: "none"` (desktop default) trên `bgmXXX` ẩn hẳn element — không render.

### Khi nào dùng:
| Tình huống | Pattern |
|-----------|---------|
| Desktop ngang, mobile dọc (xoay 90°) | PATTERN 8 — 2 ảnh riêng |
| Desktop và mobile cùng 1 ảnh, chỉ khác position | PATTERN 1 + `_objectPosition:mobile_portrait` |
| BG là gradient CSS | PATTERN 1 + `_cssCustom:mobile_portrait` (KHÔNG dùng `@media` thủ công) |

---

## PATTERN 9 — Auto-Responsive Grid (Features Grid)

> Dùng cho danh sách các thẻ (cards) tự động xuống hàng mà không cần set breakpoint phức tạp.

```json
{
  "id": "grdXXX",
  "name": "container",
  "parent": "ctnXXX",
  "settings": {
    "_direction": "row",
    "_flexWrap": "wrap",
    "_gap": "24px",
    "_justifyContent": "center"
  }
},
{
  "id": "crdXXX",
  "name": "container",
  "parent": "grdXXX",
  "settings": {
    "_flexGrow": "1",
    "_flexShrink": "1",
    "_widthMin": "280px",
    "_widthMax": "400px"
  }
}
```

> `_widthMin: "280px"` đảm bảo card không bao giờ nhỏ hơn 280px, tự động wrap khi không đủ chỗ.
> `_flexGrow: "1"` giúp các card lấp đầy space còn trống trong row.

---

## PATTERN 10 — Aspect Ratio Container (Fixed Ratio)

> Dùng khi muốn container giữ tỉ lệ khung hình (ví dụ 16:9) bất kể nội dung bên trong.

```json
{
  "id": "ratXXX",
  "name": "block",
  "parent": "ctnXXX",
  "settings": {
    "_aspectRatio": "16/9",
    "_width": "100%",
    "_overflow": "hidden"
  }
}
```

> `_aspectRatio` là cách hiện đại nhất để giữ tỉ lệ mà không cần padding-top hack.

> ⚠️ **Note:** PATTERN 11 (Text Gradient / Clip-path) và PATTERN 12 (Sticky Header) đã được lược bỏ — ít dùng trong lấp landing page. Không có gap số.

---

## PATTERN 13 — Flex Equal Columns: Dùng CSS Shorthand, Tránh Nhiều Native Keys

**Vấn đề:** Dùng nhiều native keys rời (`_flexGrow`, `_flexShrink`, `_widthMin`) → verbose, khó debug, có thể xung đột.

**Giải pháp:** Dùng 1 dòng `flex` shorthand trong `_cssCustom`.

```json
// ❌ SAI - nhiều keys rời
{
  "_flexGrow": "1",
  "_flexShrink": "1",
  "_widthMin": "0px"
}

// ✅ ĐÚNG - 1 dòng CSS shorthand
{
  "_cssCustom": "#brxe-[id] { flex: 1 1 0; min-width: 0; }"
}
```

**Common flex values:**
| Layout | CSS | Ý nghĩa |
|--------|-----|---------|
| Equal col (shrinkable) | `flex: 1 1 0` | Grow + shrink equally, basis 0 |
| Fixed col (no shrink) | `flex: 1 0 0` | Grow nhưng không shrink |
| Auto col | `flex: 1` | shorthand = `1 1 auto` |

> **Rule:** Nếu cần set 2+ flex properties → ưu tiên `_cssCustom` shorthand.

---

## PATTERN 14 — Accordion Nestable: `openItemIndex` là 0-Based

**Verified:** `openItemIndex` trong `accordion-nested` dùng **0-based index**.

```json
// ❌ SAI - nghĩ là 1-based, thực ra mở item 2
{ "openItemIndex": 1 }

// ✅ ĐÚNG - mở item đầu tiên
{ "openItemIndex": 0 }
```

| Muốn mở item | Dùng giá trị |
|--------------|--------------|
| Item 1 (mặc định) | `0` |
| Item 2 | `1` |
| Item 3 | `2` |

> **Đã xác nhận (0-based):** Widget docs trong `general-accordion-nested.md` đã được cập nhật đúng. Dùng `openItemIndex: 0` để mở item đầu tiên.

---

## PATTERN 15 — Dual Layout: Desktop vs Mobile Hoàn Toàn Khác

**Khi nào dùng:** Layout desktop và mobile quá khác nhau (không thể responsive bằng flex-direction thôi).

**Chiến lược:** Tạo 2 block riêng, toggle visibility qua `_display`.

```json
// Desktop block (ẩn trên mobile)
{
  "id": "s6deskblk",
  "name": "block",
  "settings": {
    "_display": "flex",
    "_display:mobile_portrait": "none"
  }
}

// Mobile block (ẩn trên desktop, hiện trên mobile)
{
  "id": "s6mobblk",
  "name": "block",
  "settings": {
    "_display": "none",
    "_display:mobile_portrait": "flex"
  }
}
```

**Ưu điểm:**
- Không cần hacking CSS phức tạp
- Mỗi layout độc lập, dễ maintain
- Không có conflict giữa desktop/mobile styles

**Nhược điểm:**
- Content duplicate → cần sync thủ công nếu thay đổi text
- Tăng DOM size (không đáng kể với landing page)

> **Áp dụng khi:** Desktop = accordion list + right glow / Mobile = 3 full cards riêng biệt (verified trong S06 AI Model section)

---

## PATTERN 16 — Feature Card Slider (Image + Text per slide)

> **Source:** OpenClaw "Tại sao chọn" (ID: 463160) — Verified production pattern.
> Dùng khi: Slider mỗi slide = 1 feature card có icon/image + title + description.

```
⚠️ KEY RULE: Mỗi slide có 2 levels block wrapper:
   1. block (slide wrapper) — Bricks structural slide container
   2. block (card inner) — Visual card container, có thể có bg/padding riêng
   Thiếu "card inner" → không thể style card độc lập với slide wrapper.
```

**JSON pattern (6 slides):**
```json
{"id": "sldrXXX", "name": "slider-nested", "parent": "slwrXXX", "children": ["sl1bXXX", "sl2bXXX", "sl3bXXX", "sl4bXXX", "sl5bXXX", "sl6bXXX"]},

{"id": "sl1bXXX", "name": "block", "parent": "sldrXXX", "children": ["sl1iXXX"]},
{"id": "sl1iXXX", "name": "block", "parent": "sl1bXXX", "children": ["sl1imgXX", "sl1txtXX"],
 "settings": {"_display": "flex", "_direction": "column", "_rowGap": "16px"}},
{"id": "sl1imgXX", "name": "image", "parent": "sl1iXXX",
 "settings": {"image": {"id": 0, "url": "http://localhost:3845/assets/[hash].png"}, "_width": "48px", "_height": "48px", "_flexShrink": "0"}},
{"id": "sl1txtXX", "name": "block", "parent": "sl1iXXX", "children": ["sl1hdgXX", "sl1dscXX"],
 "settings": {"_display": "flex", "_direction": "column", "_rowGap": "8px"}},
{"id": "sl1hdgXX", "name": "heading", "parent": "sl1txtXX",
 "settings": {"tag": "h3", "text": "Feature Title", "_typography": {"font-weight": "700"}}},
{"id": "sl1dscXX", "name": "text-basic", "parent": "sl1txtXX",
 "settings": {"text": "Feature description text here."}}
```

> **Build tất cả N slides** — không bớt. Đếm chính xác từ Figma.
> **Depth** từ section: 0(section)→1(container)→2(block)→3(slider)→4(slide)→5(card-inner)→6(image/text-group)→7(heading/text-basic) = **depth 7**

---

## PATTERN 17 — Tabs-nested với Slider Navigation

> **Source:** OpenClaw "Mô hình hoạt động" (ID: 463174) — Verified production pattern.
> Dùng khi: Tab có nhiều tabs và nav cần scroll/swipe (mobile-friendly tab navigation).

```
⚠️ CRITICAL RULES:
   1. Tab nav items PHẢI là `div` (không phải `block`) để tabs-nested JS nhận click
   2. Tab labels dùng `text-basic` (không phải `heading`)
   3. tabs-nested có đúng 2 direct children:
      - slider-nested (tab nav)
      - block (panels container)
```

**Structure:**
```
tabs-nested
  ├─ slider-nested (tab nav)
  │    ├─ div → text-basic ("Tab 1")  ← MỖI TAB NAV = div > text-basic
  │    ├─ div → text-basic ("Tab 2")
  │    ├─ div → text-basic ("Tab 3")
  │    └─ div → text-basic ("Tab 4")
  └─ block (panels)
       ├─ block (panel 1)   ← MỖI PANEL = 1 block
       │    └─ [panel content]
       ├─ block (panel 2)
       ├─ block (panel 3)
       └─ block (panel 4)
```

**JSON pattern (4 tabs):**
```json
{"id": "tabsXXX", "name": "tabs-nested", "parent": "tbwrXXX", "children": ["tnvXXXX", "tpnXXXX"]},

{"id": "tnvXXXX", "name": "slider-nested", "parent": "tabsXXX", "children": ["tn1dXXX", "tn2dXXX", "tn3dXXX", "tn4dXXX"]},
{"id": "tn1dXXX", "name": "div", "parent": "tnvXXXX", "children": ["tn1tXXX"]},
{"id": "tn1tXXX", "name": "text-basic", "parent": "tn1dXXX", "settings": {"text": "Tab Label 1"}},
{"id": "tn2dXXX", "name": "div", "parent": "tnvXXXX", "children": ["tn2tXXX"]},
{"id": "tn2tXXX", "name": "text-basic", "parent": "tn2dXXX", "settings": {"text": "Tab Label 2"}},

{"id": "tpnXXXX", "name": "block", "parent": "tabsXXX", "children": ["tp1bXXX", "tp2bXXX", "tp3bXXX", "tp4bXXX"]},
{"id": "tp1bXXX", "name": "block", "parent": "tpnXXXX", "children": ["[panel-1-content]"]},
{"id": "tp2bXXX", "name": "block", "parent": "tpnXXXX", "children": ["[panel-2-content]"]}
```

> **Panel content** có thể phức tạp đến depth 9 — build từng panel một, verify sau mỗi panel.

---

## PATTERN 18 — Default Slider Arrow Settings (Splide — BẮT BUỘC áp dụng)

> **Áp dụng:** Mọi `slider-nested` có arrow/navigation trong dự án này.
> **Source:** Verified từ S1 VPS Landing 2026 (template 473482).

> ⚠️ Bricks Nestable Slider dùng **Splide.js** — KHÔNG phải Swiper.
> CSS class đúng: `.splide__slide`, `.splide__arrows`, `button.splide__arrow`
> CSS class SAI: `.swiper-slide`, `.swiper-pagination`, `.bricks-button-prev`

### Default Arrow JSON Settings
```json
{
  "arrows": true,
  "arrowHeight": "48px",
  "arrowWidth": "48px",
  "arrowSize": "28px",
  "prevArrow": {"library": "ionicons", "icon": "ion-ios-arrow-back"},
  "nextArrow": {"library": "ionicons", "icon": "ion-ios-arrow-forward"},
  "arrowBorder": {
    "width": {"top": "1.5px", "right": "1.5px", "bottom": "1.5px", "left": "1.5px"},
    "style": "solid",
    "color": {"hex": "#f2f3f5"},
    "radius": {"top": "999px", "right": "999px", "bottom": "999px", "left": "999px"}
  },
  "arrowDisabledOpacity": "0.24",
  "arrowColor": {"hex": "#f2f3f5"},
  "prevArrowTop": "auto",
  "nextArrowBottom": "0px",
  "prevArrowBottom": "0px"
}
```

### Arrows bên dưới slider (CSS bắt buộc đi kèm)
```css
/* Đặt trong _cssCustom của slider-nested */
#brxe-[ID] .splide__arrows.custom.splide__arrows--ltr {
  display: flex !important;
  justify-content: flex-end;
  height: 48px;
  align-items: flex-end;
  margin-top: 24px;
  gap: 32px;
  z-index: 10;
  position: relative;
}
#brxe-[ID] button.splide__arrow {
  position: static !important;
  transform: none;
}
```

### Slider 1.5 view (card peek) — CSS
```css
/* Desktop: width fit-content per slide */
#brxe-[ID] .splide__slide {
  width: fit-content !important;
}
/* Mobile: 80% width per slide */
/* → dùng _cssCustom:mobile_portrait */
```

### Slider 1.5 view — JSON Settings
```json
{
  "type": "slide",
  "autoHeight": true,
  "gap": "24px",
  "gap:mobile_portrait": "16px",
  "loop": true,
  "_cssCustom": "#brxe-[ID] .splide__slide { width: fit-content !important; } #brxe-[ID] .splide__arrows.custom.splide__arrows--ltr { display: flex !important; justify-content: flex-end; height: 48px; align-items: flex-end; margin-top: 24px; gap: 32px; z-index: 10; position: relative; } #brxe-[ID] button.splide__arrow { position: static !important; transform: none; }",
  "_cssCustom:mobile_portrait": "#brxe-[ID] .splide__slide { width: 80% !important; }"
}
```

### Gradient Mask (parent col — khi slider overflow sang col bên)
```css
/* Đặt trong _cssCustom của parent block chứa slider */
#brxe-[colID]::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  height: 100%;
  background: linear-gradient(to right, transparent, [section-bg-color]);
  z-index: 2;
  pointer-events: none;
}
```
> Parent block cần: `_position: "relative"`, `_overflow: "hidden"`

### Summary checklist khi build slider-nested
```
□ arrows: true + arrowBorder circle + arrowDisabledOpacity: 0.24
□ type: "slide" + autoHeight: true + gap: "24px"
□ CSS: .splide__arrows → display:flex + position:relative + margin-top:24px
□ CSS: button.splide__arrow → position:static + transform:none
□ Nếu 1.5 view: CSS .splide__slide { width: fit-content !important }
□ Nếu có mask: _cssCustom ::after gradient trên parent block
□ KHÔNG bao giờ dùng block giả để làm prev/next button
□ KHÔNG dùng class .swiper-* (Bricks dùng Splide, không phải Swiper)
```
