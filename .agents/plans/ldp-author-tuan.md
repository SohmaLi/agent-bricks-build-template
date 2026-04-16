# Plan: [2026] – LDP Author Tuấn – Đặng Tuấn
**Figma Node:** 3641-1142
**Figma Link:** https://www.figma.com/design/AhEDYcvo9EJdheU6b4fBI8/Blog?node-id=3641-1142&m=dev
**Site:** https://stag.vietnix.dev | Bricks (WP 6.9.4)
**Ngày tạo:** 2026-04-13
**Template prefix:** `[2026] – LDP Author Tuấn -`

---

## 1. Thông tin Page
- Loại trang: Landing Page – Author Profile (Đặng Tuấn)
- Viewport: Desktop | max-width container: 1140px (padding ngoài 40px → tổng 1220px)
- Tổng sections: **6 sections** (bỏ qua Header/Footer)

---

## 2. Design Variables (Global)

### Colors
| Token | Hex | Dùng trong |
|-------|-----|-----------|
| `--color/grey/50` | `#f2f3f5` | Section bg, card bg |
| `--background/brand` | `#007cfc` | Button, icon badge |
| `--text/primary` | `#282829` | Mọi text chính |
| `--text/reverse` | `#fcfcfc` | Text trên nền tối |
| `--border/primary` | `#0f0f0f` | Carousel arrows |
| Border card | `rgba(0,124,252,0.5)` | Card Sự kiện, Bằng cấp |
| Shadow card | `rgba(0,124,252,0.2)` | inset shadow card |

### Typography
| Token | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `heading/h3` | Inter Bold | 44px | 700 | 56px |
| `heading/h4` | Inter SemiBold | 36px | 600 | 48px |
| `title/lg` | Inter Medium | 24px | 500 | 36px |
| `body/xl` | Inter Regular | 18px | 400 | 30px |
| `body/lg` | Inter Regular | 16px | 400 | 24px |
| Card cert text | Roboto Medium | 18px | 500 | 28px |
| Card cert badge | Inter Bold | 20px | 700 | 32px |

### Spacing & Radius
| Giá trị | Dùng trong |
|---------|-----------|
| `40px` | Section padding (outer) |
| `64px` | Hero col top/bottom padding |
| `24px` | Container border-radius, gap items |
| `20px` | Card border-radius, card padding |
| `12px` | Button border-radius, button px |
| `8px` | Small card border-radius (event img) |
| `32px` | Grid column gap (Chuyên môn, Bằng cấp) |

---

## 3. Sections

### [SKIP – Global Template] Header (Menu)
> Bỏ qua – đây là global header template

---

### Section 1: Hero – Author Profile | Node: 3638-10337
**Template name:** `[2026] – LDP Author Tuấn - Hero`

**Layout:** 2 cols (trái: text 684px | phải: profile image flex-1)

**Variables:**
| Loại | Value | Ghi chú |
|------|-------|---------|
| Section padding | `40px` all sides | |
| Container bg | `#f2f3f5` | border-radius: 24px, overflow: hidden |
| Background image | 1361×577px, opacity 50% | absolute, centered |
| Col left width | `684px` | flex-shrink: 0 |
| Col left py | `64px` | top & bottom |
| Col gap | `24px` | row gap trong col |
| Button bg | `#007cfc` | border-radius: 12px, px: 32px, py: 12px |

**Cấu trúc elements (chuẩn):**
```
section [padding: 40px]
└── container [bg: #f2f3f5, radius: 24px, overflow: hidden, position: relative, padding: 0]
    ├── image [bg, absolute, stretch:true, objectFit: cover, zIndex: 0, opacity: 0.5]
    └── block [row, alignItems: flex-end, gap: 24px, zIndex: 1, w: 100%]
        ├── block [col-left, col, gap: 24px, py: 64px, w: 684px, shrink: 0]
        │   ├── block [text-group, col, gap: 16px]
        │   │   ├── text-basic [tag: div] — "Chuyên viên R&D" (18px/500)
        │   │   └── heading [h1] — "ĐẶNG TUẤN" (44px/700)
        │   ├── text-basic [tag: div] — Bio 2 đoạn (18px/400)
        │   ├── div [w: 144px, h: 60px] ← cert placeholder
        │   │   └── image [cert badges, 468146]
        │   └── button — "Xem bài chia sẻ" [bg: #007cfc]
        └── block [col-right, alignSelf: stretch, overflow: hidden]
            └── div [w: 599px, h: 577px] ← profile placeholder
                └── image [profile photo, 468144, objectFit: cover]
```

**Images:**
| Tên | URL Figma | WP ID | Kích thước |
|-----|----------|-------|-----------|
| Background Image | `localhost:3845/assets/151608e2...png` | 468145 | 1361×577px |
| Certification Badges | `localhost:3845/assets/a1566720...png` | 468146 | 144×60px |
| Profile Photo (sdasda 2) | `localhost:3845/assets/35be8947...png` | 468144 | 599×599px |
| Profile Mask SVG | `localhost:3845/assets/8e0faf96...svg` | 468147 | clip-path mask |

**Bricks Widgets:**
| Element | Widget | Settings key |
|---------|--------|-------------|
| Outer wrapper | `section` | `_padding: 40px` |
| Card wrapper | `container` | `_background`, `_border.radius: 24px`, `_overflow: hidden`, `_position: relative` |
| BG image | `image` | `_position: absolute`, `stretch: true`, `_objectFit: cover` |
| Row layout | `block` | `_direction: row`, `_alignItems: flex-end`, `_columnGap: 24px` |
| Left col | `block` | `_direction: column`, `_rowGap: 24px` |
| Text group | `block` | `_direction: column`, `_rowGap: 16px` |
| Subtitle | `text-basic` | `tag: div`, `_typography: 18px/500` |
| Name | `heading` | `tag: h1`, `_typography: 44px/700` |
| Bio | `text-basic` | `tag: div`, `_typography: 18px/400` |
| Cert wrapper | `div` | `_width: 144px`, `_height: 60px` |
| Cert image | `image` | `id: 468146` |
| CTA button | `button` | `_background: #007cfc`, `_border.radius: 12px` |
| Profile wrapper | `div` | `_width: 599px`, `_height: 577px`, `_overflow: hidden` |
| Profile image | `image` | `id: 468144`, `_objectFit: cover` |

---

### Section 2: Cơ duyên đến với Vietnix | Node: 3639-1689
**Template name:** `[2026] – LDP Author Tuấn - Cor Duyen`

**Layout:** 2 cols (trái: text | phải: collage 5 ảnh nổi)

**Variables:**
| Loại | Value |
|------|-------|
| Section padding | `40px` all |
| Section bg | `#ffffff` |
| Max-width container | `1140px` |
| Col gap | `24px` |
| Right col height | `396px` |

**Cấu trúc elements:**
```
section [bg: white, padding: 40px]
└── container [w: 1140px, gap: 24px, alignItems: center]
    ├── block [col-left, col, gap: 24px, flex: 1]
    │   ├── heading [h2] — "Cơ duyên đến với Vietnix" (36px/600)
    │   └── text-basic [tag: div] — Bio text (18px/400)
    └── block [col-right, flex: 1, h: 396px, overflow: hidden, position: relative]
        ├── div [w: 385px, h: 256px, right: 28px, top: 23px, absolute] ← image 27
        │   └── image [border: 4px white 50%, border-radius: 24px]
        ├── div [w: 191px, h: 191px, left: 29px, top: 183px, absolute] ← image 28
        │   └── image [border: 4px white 50%, border-radius: 20px]
        ├── div [w: 77px, h: 81px, left: 179px, top: 252px, absolute, rotate: 20deg] ← image 29 (emoji)
        │   └── image
        ├── div [w: 78px, h: 64px, left: 101px, top: 87px, absolute] ← image 30 (emoji)
        │   └── image
        └── div [w: 90px, h: 85px, left: 399px, top: 238px, absolute] ← image 31 (emoji)
            └── image
```

> ⚠️ **Lưu ý:** Ảnh collage bên phải dùng `position: absolute` với tọa độ cụ thể. Các `div` wrapper cần `_position: absolute` + `_top`/`_left`/`_right` values.

**Images cần download:**
| Tên | URL Figma | Kích thước |
|-----|----------|-----------|
| image 27 (photo team lớn) | `localhost:3845/assets/047e80d3...png` | 385×256px |
| image 28 (photo nhỏ) | `localhost:3845/assets/fe8ae570...png` | 191×191px |
| image 29 (emoji) | `localhost:3845/assets/5e28d9cc...png` | 77×81px |
| image 30 (emoji) | `localhost:3845/assets/42ddf113...png` | 78×64px |
| image 31 (emoji) | `localhost:3845/assets/e1aa11e6...png` | 90×85px |

---

### Section 3: Sự kiện đã tham gia | Node: 3735-3914
**Template name:** `[2026] – LDP Author Tuấn - Su Kien`

**Layout:** Header row + Grid 3 cards

**Variables:**
| Loại | Value |
|------|-------|
| Section padding | `40px` (không có top, chỉ bottom) |
| Card border | `2px solid rgba(0,124,252,0.5)` |
| Card shadow | `inset 0px 0px 24px 0px rgba(0,124,252,0.2)` |
| Card radius | `20px` |
| Card gap | `24px` |
| Card image radius | `12px` |

**Cấu trúc elements:**
```
section [bg: white, pb: 40px, px: 40px]
└── container [col, gap: 20px, alignItems: center]
    ├── block [header-row, row, gap: 10px, alignItems: center, w: 1140px]
    │   ├── div [18×18px] ← indicator SVG placeholder
    │   └── heading [h2] — "Sự kiện đã tham gia" (24px/600, tag: title)
    ├── block [cards-row, row, gap: 24px, w: 1140px]
    │   ├── block [card, col, flex: 1, bg: white, border: 2px rgba(0,124,252,0.5), radius: 20px, p: 8px, overflow: hidden, position: relative]
    │   │   ├── div [w: 100%, aspect: 2000/1414] ← event image 1
    │   │   │   └── image [border-radius: 12px, objectFit: cover]
    │   │   └── block [event-info, row, pb: 12px, px: 12px]
    │   │       └── text-basic — "<b>Khách mời</b> - Webinar Vận hành ODOO..."
    │   ├── block [card × 2 (Speaker, Khách mời)] ← same structure
    └── block [carousel-nav, row, gap: 32px, alignItems: center]
        ├── button [prev, circle 48px, border: 1.5px #0f0f0f, opacity: 20%]
        └── button [next, circle 48px, border: 1.5px #0f0f0f]
```

**Images:**
| Tên | URL Figma | Ghi chú |
|-----|----------|---------|
| Event image 1 | `localhost:3845/assets/c62644c9...png` | aspect 2000/1414 |
| Event image 2 | `localhost:3845/assets/e71eb170...png` | aspect 1528/1080 |
| Event image 3 | `localhost:3845/assets/d592388a...png` | aspect 348/246 |
| Indicator SVG | `localhost:3845/assets/e0c011cb...svg` | 18×18px |

---

### Section 4: Chuyên môn | Node: 3641-1128
**Template name:** `[2026] – LDP Author Tuấn - Chuyen Mon`

**Layout:** Header + Icon + Grid 2×2 cards

**Variables:**
| Loại | Value |
|------|-------|
| Section bg | gradient: `rgba(242,243,245,0)` top → `#f2f3f5` bottom 50% |
| Card bg | `#ffffff` |
| Card radius | `20px` |
| Card padding | `20px` |
| Grid gap | `32px` |
| Icon circle | `100px`, gradient brand |

**Cấu trúc elements:**
```
section [gradient bg top-to-bottom, padding: 40px]
└── container [col, gap: 40px, alignItems: center]
    ├── block [header-row, row, gap: 24px, alignItems: center, w: 1140px]
    │   ├── block [col, gap: 24px, flex: 1]
    │   │   ├── heading [h2] — "Chuyên môn" (36px/600)
    │   │   └── text-basic — "Với hơn 4 năm..." (18px/400)
    │   └── div [100×100px, radius: 999px, bg: gradient brand] ← icon wrapper
    │       └── image [briefcase icon, 52×52px]
    └── block [grid-2col, 2-col grid, gap: 32px, w: 1140px]
        ├── block [card, col, gap: 24px, bg: white, radius: 20px, p: 20px, overflow: hidden]
        │   ├── div [32×32px] ← RadioButton icon placeholder
        │   ├── heading [h3] — "Phát triển hệ thống phòng thủ" (24px/500)
        │   └── text-basic — Description (18px/400)
        └── block [card × 3] ← same structure
            Titles:
            - "Kiến trúc sư giải pháp Cloud/SaaS"
            - "Đánh giá khả thi (Feasibility Study)"
            - "Tư vấn giải pháp nội bộ"
```

> ⚠️ Grid 2×2 trong Bricks dùng `block` với CSS grid custom qua `_cssClasses` hoặc dùng 2 `block` rows lồng nhau.

**Images:**
| Tên | URL Figma | Ghi chú |
|-----|----------|---------|
| Briefcase icon | `localhost:3845/assets/f28c485e...svg` | 52×52px trong circle |
| RadioButton icon | `localhost:3845/assets/7a08accd...svg` | 32×32px mỗi card |

---

### Section 5: Bằng cấp và chứng chỉ | Node: 3641-1204
**Template name:** `[2026] – LDP Author Tuấn - Bang Cap`

**Layout:** Header + Icon + Grid 3×2 cert cards

**Variables:**
| Loại | Value |
|------|-------|
| Section bg | gradient: `#f2f3f5` top 50% → `rgba(242,243,245,0)` bottom |
| Card border | `2px solid rgba(0,124,252,0.5)` |
| Card shadow | `inset 0px 0px 24px 0px rgba(0,124,252,0.2)` |
| Card radius | `20px` |
| Card padding | `pt: 48px, pb: 24px, px: 24px` |
| Grid w | `1140px`, `h: 432px`, 3 cols × 2 rows, gap: 32px |
| Badge label | "CDMP" — Inter Bold 20px/32px white |

**Cấu trúc mỗi cert card:**
```
block [card, col, gap: 45px, bg: white, border: 2px rgba(0,124,252,0.5), radius: 20px,
       pt: 48px, pb: 24px, px: 24px, position: relative, overflow: hidden]
├── block [badge-label, absolute, top: -2px, left: 22px]
│   ├── div [Union SVG background, w: 81px, h: 52px]
│   └── text-basic — "CDMP" (20px/700/white)
├── text-basic — "Certified Digital Marketing Professional (Graduate No. VN-PIM85116)" (18px/500)
└── div [inset shadow overlay, absolute, inset: 0, pointer-events: none]
```

**Images:**
| Tên | URL Figma | Ghi chú |
|-----|----------|---------|
| Union badge shape | `localhost:3845/assets/1958c19f...svg` | absolute trong badge |
| Medal-star icon | `localhost:3845/assets/...svg` | section header icon |

---

### Section 6: Góc nhìn và chia sẻ | Node: 3641-1253
**Template name:** `[2026] – LDP Author Tuấn - Goc Nhin`

**Layout:** Header + Blog post grid (5 cards per row × 2 rows)

**Variables:**
| Loại | Value |
|------|-------|
| Section bg | `#ffffff` |
| Card bg | `#ecf7ff` |
| Card radius | `8px` |
| Thumbnail aspect | full width × ~138px |
| Card text color | `#525666` |

**Cấu trúc elements:**
```
section [bg: white, padding: 40px]
└── container [col, gap: 40px, alignItems: center]
    ├── block [header-row, row, gap: 24px, w: 1140px]
    │   ├── block [col, flex: 1]
    │   │   ├── heading [h2] — "Góc nhìn và chia sẻ" (36px/600)
    │   │   └── text-basic — "Với hơn 4 năm..." (18px/400)
    │   └── div [100×100px, radius: 999px, bg: gradient brand] ← icon
    │       └── image [save-add icon]
    └── block [post-list, w: 1140px]
        └── block [row, gap: 24px]
            └── block [card, col, flex: 1, bg: #ecf7ff, radius: 8px, overflow: hidden]
                ├── div [thumbnail, w: 100%, h: 138px] ← image placeholder
                │   └── image [objectFit: cover]
                └── block [card-body, col, px: 8px, py: 12px]
                    ├── text-basic — Category (14px, link style)
                    ├── heading [h3] — Title (16px/700, 2 lines)
                    ├── text-basic — Excerpt (14px, 2 lines)
                    └── block [meta, row, gap: 8px]
                        ├── text-basic — Date
                        ├── text-basic — "•"
                        └── text-basic — Read time
```

> 💡 Section này nên dùng **dynamic posts** (`vnx-custom-posts-list-v2` hoặc `vnx-posts`) nếu cần load bài thật. Template tĩnh dùng data mẫu.

**Images (thumbnails mẫu):**
| Tên | URL Figma |
|-----|----------|
| Thumbnail 1 | `localhost:3845/assets/d6330a85...png` |
| Thumbnail 2 | `localhost:3845/assets/ef526e7d...png` |
| Thumbnail 3 | `localhost:3845/assets/a6f07b7e...png` |
| Thumbnail 4 | `localhost:3845/assets/f2b28ca7...png` |
| Thumbnail 5 | `localhost:3845/assets/9e3d5e7d...png` |

---

### [SKIP – Global Template] Footer
> Bỏ qua – đây là global footer template

---

## 4. Tổng hợp Images cần Download & Upload

| Tên | URL Figma (localhost:3845) | File local | Section | WP ID |
|-----|--------------------------|-----------|---------|-------|
| Background hero | `.../151608e2...png` | `images/ldp-author-tuan/hero-bg.png` | S1 | 468145 ✅ |
| Cert badges | `.../a1566720...png` | `images/ldp-author-tuan/cert-badges.png` | S1 | 468146 ✅ |
| Profile photo | `.../35be8947...png` | `images/ldp-author-tuan/profile-photo.png` | S1 | 468144 ✅ |
| Profile mask SVG | `.../8e0faf96...svg` | `images/ldp-author-tuan/profile-mask.svg` | S1 | 468147 ✅ |
| Team photo lớn | `.../047e80d3...png` | `images/ldp-author-tuan/cor-duyen-team.png` | S2 | ⬜ |
| Team photo nhỏ | `.../fe8ae570...png` | `images/ldp-author-tuan/cor-duyen-team2.png` | S2 | ⬜ |
| Emoji 1 | `.../5e28d9cc...png` | `images/ldp-author-tuan/emoji-1.png` | S2 | ⬜ |
| Emoji 2 | `.../42ddf113...png` | `images/ldp-author-tuan/emoji-2.png` | S2 | ⬜ |
| Emoji 3 | `.../e1aa11e6...png` | `images/ldp-author-tuan/emoji-3.png` | S2 | ⬜ |
| Event img 1 | `.../c62644c9...png` | `images/ldp-author-tuan/event-1.png` | S3 | ⬜ |
| Event img 2 | `.../e71eb170...png` | `images/ldp-author-tuan/event-2.png` | S3 | ⬜ |
| Event img 3 | `.../d592388a...png` | `images/ldp-author-tuan/event-3.png` | S3 | ⬜ |
| Thumbnails 1-5 | `.../d6330a85...png` etc | `images/ldp-author-tuan/thumb-1~5.png` | S6 | ⬜ |

> **Ảnh S1 đã upload** (từ session trước). Cần download & upload các ảnh S2–S6.

---

## 5. Câu hỏi còn lại
- [ ] Section "Góc nhìn và chia sẻ" dùng posts động hay tĩnh?
- [ ] Carousel "Sự kiện" có cần JS behavior không, hay chỉ layout tĩnh?
- [ ] Grid 2×2 "Chuyên môn" — dùng 2 row blocks lồng nhau hay CSS grid?
- [ ] Badge "CDMP" trong cert cards: dùng SVG hay text-basic với custom border?

---

## 6. Pre-build Checklist

- [x] Đã tạo plan file
- [x] Ảnh Section 1 đã upload (IDs: 468144–468147)
- [ ] Download ảnh Section 2–6 về `images/ldp-author-tuan/`
- [ ] Upload ảnh Section 2–6 lên WP và lấy attachment_id
- [x] Đã xác nhận settings keys qua `bricks-mcp-reference.md`
- [x] Template naming convention: `[2026] – LDP Author Tuấn - [Tên]`
- [ ] Tạo thư mục images cho project mới:
  `images/ldp-author-tuan/` (symlink hoặc copy từ `images/blog-author-hero/` cho S1)
