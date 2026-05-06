# Plan: Example Landing Page — Ví dụ tham khảo
> ⚠️ **File này là VÍ DỤ** — không dùng để build thật. Xem cách ghi plan file đúng chuẩn.

**Figma Node:** `1234-5678`
**Figma Link:** `https://figma.com/design/xxx/Example?node-id=1234-5678`
**Site:** `https://example.local` | Bricks 1.11.x
**Screenshot:** ✅ có
**Ngày tạo:** 2026-05-06

---

## 1. Thông tin Page

- Loại trang: landing
- Viewport: Desktop 1440px | max-width: 1200px
- Tổng số sections: 3
- Độ phức tạp: Simple → Medium

---

## 2. Design Variables (Global)

### Colors
| Token | Hex | Dùng trong |
|-------|-----|-----------|
| primary-700 | #007CFC | Button, icon gradient |
| primary-500 | #1EAFFF | Icon gradient end |
| neutral-900 | #0D0D0D | Body text |
| neutral-600 | #666666 | Subtext |
| white | #FFFFFF | Background, text on dark |

### Typography
| Token | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| h1 | Inter | 56px | 800 | 72px |
| h2 | Inter | 40px | 700 | 52px |
| body | Inter | 16px | 400 | 28px |
| tag | Inter | 14px | 600 | 20px |

### Spacing & Radius
| Giá trị | Dùng trong |
|---------|-----------|
| 80px | Section padding top/bottom |
| 40px | Card gap |
| 24px | Element gap |
| 12px | Border radius card |
| 999px | Border radius button/badge |

---

## 3. Sections

### Section 1: Hero | Node: `1234-5679` | SIMPLE

**Layout:** 1 col, text center, background gradient + image overlay

**Complexity notes:** Gradient background cần `_cssCustom`, image absolute cover

**Design variables của section:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | `linear-gradient(180deg, #001433 0%, #002966 100%)` | Exact từ Figma DevMode |
| Text color | `#FFFFFF` | All text |

**Cấu trúc elements:**
```
Section (gradient bg)
└── Container inner (flex col, align-items: center, gap: 32px, padding: 120px 24px)
    ├── Tag text "⚡ Landing Page"
    ├── Heading h1 "Tiêu đề chính của Landing Page"
    ├── Text-basic description
    └── Block buttons (flex row, gap: 16px)
        ├── Button primary "Dùng thử miễn phí"
        └── Button outline "Xem demo"
```

**Images trong section:**
| Tên mô tả | Figma URL | Chiến lược |
|-----------|----------|-----------|
| hero-bg | http://localhost:3845/assets/abc123def456.png | Cách 1 |

**Bricks Widget Map:**
| Element | Widget | Settings JSON |
|---------|--------|---------------|
| Section | `section` | `{"_padding":{"top":"0px","bottom":"0px","left":"0px","right":"0px"},"_cssCustom":"#brxe-s1sec01{background:linear-gradient(180deg,#001433 0%,#002966 100%);position:relative;overflow:hidden;}"}` |
| Container | `container` | `{"_display":"flex","_direction":"column","_alignItems":"center","_rowGap":"32px","_widthMax":"1200px","_margin":{"top":"0px","bottom":"0px","left":"auto","right":"auto"},"_padding":{"top":"120px","bottom":"120px","left":"24px","right":"24px"}}` |
| Tag text | `text-basic` | `{"text":"⚡ Landing Page","_typography":{"color":{"hex":"#1EAFFF"},"font-size":"14px","font-weight":"600"}}` |
| Heading H1 | `heading` | `{"tag":"h1","text":"Tiêu đề chính của Landing Page","_typography":{"color":{"hex":"#FFFFFF"},"font-size":"56px","font-weight":"800","line-height":"72px"}}` |
| Description | `text-basic` | `{"text":"Mô tả ngắn về sản phẩm/dịch vụ của bạn trong 1-2 câu.","_typography":{"color":{"hex":"rgba(255,255,255,0.8)"},"font-size":"18px"}}` |
| Buttons row | `block` | `{"_display":"flex","_direction":"row","_columnGap":"16px"}` |
| Button primary | `button` | `{"text":"Dùng thử miễn phí","_background":{"color":{"hex":"#007CFC"}},"_border":{"radius":{"top":"999px","right":"999px","bottom":"999px","left":"999px"}}}` |
| Button outline | `button` | `{"text":"Xem demo","style":"outline"}` |

**Behavior & Gotchas:**
| Vấn đề | Giải pháp |
|--------|-----------|
| Gradient background | `_cssCustom` với `#brxe-[id]` — KHÔNG dùng `_background` |
| Section padding = 0 | Padding nằm trên Container, không phải Section |

→ **Status:** ok

---

### Section 2: Features Grid | Node: `1234-5680` | MEDIUM

**Layout:** Header 1 col + grid 3 cards, mỗi card có icon circle + title + desc

**Complexity notes:** Icon circle có gradient radial + box-shadow inset → phải dùng `_cssCustom` với exact values từ Figma

**Design variables của section:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Background | `#FFFFFF` | |
| Card border | `1px solid rgba(0,124,252,0.12)` | |
| Card radius | `16px` | |
| Icon gradient | `radial-gradient(52.5% 40.5% at 52.5% 74%, #007CFC 0%, #1EAFFF 100%)` | Exact từ Figma DevMode |

**Cấu trúc elements:**
```
Section (white bg)
└── Container inner (flex col, gap: 60px)
    ├── Block header (flex col, align-items: center, gap: 16px)
    │   ├── Heading h2 "Tính năng nổi bật"
    │   └── Text-basic "Mô tả ngắn section"
    └── Block grid (grid 3 cols, gap: 24px)
        └── [×3] Block card (flex col, gap: 20px, border, radius: 16px, padding: 32px)
            ├── Block icon circle (100×100px, gradient)
            │   └── Image icon svg
            ├── Heading h3 "Tên tính năng"
            └── Text-basic "Mô tả tính năng..."
```

**Images trong section:**
| Tên mô tả | Figma URL | Chiến lược |
|-----------|----------|-----------|
| icon-feature-1 | http://localhost:3845/assets/icon1hash.svg | Cách 1 |
| icon-feature-2 | http://localhost:3845/assets/icon2hash.svg | Cách 1 |
| icon-feature-3 | http://localhost:3845/assets/icon3hash.svg | Cách 1 |

**Bricks Widget Map:** _(xem section file chi tiết)_

**Behavior & Gotchas:**
| Vấn đề | Giải pháp |
|--------|-----------|
| Icon circle gradient | `_cssCustom` dùng exact radial-gradient từ Figma |
| `_flexShrink` trên icon circle | RULE 6 — bắt buộc `_flexShrink: "0"` |
| Grid 3 cols | `_display: "grid"` + `_cssCustom: "grid-template-columns: repeat(3,1fr)"` |
| G2-RISK: card row bên trong | `_cssCustom: "flex-wrap: nowrap"` cho mọi horizontal flex row trong card |

→ **Status:** ok

---

### Section 3: CTA | Node: `1234-5681` | SIMPLE

**Layout:** 1 col, text center, background gradient, 1 button

**Complexity notes:** Tương tự S1 nhưng đơn giản hơn, không có overlay image

→ **Status:** ok

---

## 4. Tổng hợp Widgets cần dùng

| Widget | File tham khảo | Sections dùng | Ghi chú |
|--------|---------------|---------------|---------|
| `section` | `layout-section.md` | S1, S2, S3 | Root wrapper |
| `container` | `layout-container.md` | S1, S2, S3 | Inner wrapper bắt buộc |
| `block` | `layout-block.md` | S1, S2, S3 | Flex/Grid container |
| `heading` | `basic-heading.md` | S1, S2, S3 | H1, H2, H3 |
| `text-basic` | `basic-text-basic.md` | S1, S2, S3 | Plain text |
| `button` | `basic-button.md` | S1, S3 | CTA buttons |
| `image` | `basic-image.md` | S1, S2 | Hero bg + icons |

---

## 5. Tổng hợp Images

| Tên mô tả | Figma URL | Chiến lược | WP URL (sau upload) |
|-----------|----------|-----------|---------------------|
| hero-bg | http://localhost:3845/assets/abc123def456.png | Cách 1 | — |
| icon-feature-1 | http://localhost:3845/assets/icon1hash.svg | Cách 1 | — |
| icon-feature-2 | http://localhost:3845/assets/icon2hash.svg | Cách 1 | — |
| icon-feature-3 | http://localhost:3845/assets/icon3hash.svg | Cách 1 | — |

---

## 6. Pre-build Checklist (Flow 2 bắt buộc check)

- [x] Đã đọc widget library cho tất cả widgets trong Section 4?
- [x] Mỗi CSS property đã dùng native key thay vì `_cssCustom`?
- [x] Image sizing → `_width`/`_height` (native)?
- [x] Chiến lược ảnh (Cách 1 / Cách 2) đã xác định?
- [x] Số card/box/item lặp đã đếm chính xác? (3 cards S2)
- [x] Sections `[COMPLEX]` có giải pháp kỹ thuật rõ? (không có Complex)

---

## 7. Câu hỏi cần user xác nhận trước Flow 2

- [x] Mobile layout: không cần (desktop only)
- [x] 3 feature cards: static (không dùng Query Loop)
