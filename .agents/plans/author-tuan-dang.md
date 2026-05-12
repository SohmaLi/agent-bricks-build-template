# Plan: [Test-Local] Author Tuấn Đặng

**Slug:** author-tuan-dang
**Figma Node Desktop:** 3641-1142
**Figma Node Mobile:** 3745-430
**Ngày tạo:** 2026-05-12

---

## 1. Tổng quan

- Viewport: 1440px | Max-width: 1140px
- Tổng sections (không tính Header/Footer): 6
- WordPress Page ID: 7619

---

## 2. Design Variables (Global)

### Colors

| Token | Hex | Dùng trong |
|---|---|---|
| primary-700 / brand | #007CFC | Button, icon gradient, border accent |
| primary-50 | #ECF7FF | Card blog background |
| grey-50 | #F2F3F5 | Section background, container bg |
| text-primary | #282829 | Body text, headings |
| gray-cold-500 | #525666 | Card text, meta info |
| white | #FFFFFF | Card bg, general bg |

### Typography

| Token | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| h3 | Inter Bold | 44px | 700 | 56px |
| h4 | Inter SemiBold | 36px | 600 | 48px |
| title-lg | Inter SemiBold/Medium | 24px | 600/500 | 36px |
| body-xl | Inter Regular/Medium | 18px | 400/500 | 30px |
| body-lg | Inter Regular | 16px | 400 | 24px |
| body-md | Roboto Regular/Bold | 16px | 400/700 | 24px |
| body-sm | Roboto Regular | 14px | 400 | 20px |

### Spacing & Radius

| Giá trị | Dùng trong |
|---|---|
| 40px | Section padding all sides |
| 64px | Hero container padding top/bottom |
| 24px | Gap between main containers |
| 32px | Gap between skill cards |
| 20px | Card internal padding |
| 24px | Border radius container inner |
| 20px | Border radius card |
| 12px | Border radius image, small card |
| 8px | Border radius blog card, button |
| 999px | Border radius pill (icon circle, nav button) |

### Spacing Section Header Pattern
- Section header row: icon circle (100px) + heading block gap 24px
- Section grid gap: 32px

### Images (All URLs)

| Mô tả | URL |
|---|---|
| Hero background | `http://localhost:3845/assets/151608e27d00f1b2b9728c1fb31c5ab7e539c75b.png` |
| Hero profile image | `http://localhost:3845/assets/35be894726e87b3b1a61352510dc20a9a3c3b4a6.png` |
| Hero mask SVG | `http://localhost:3845/assets/8e0faf96fcf522dea1993bce572ce6ebe738807e.svg` |
| Hero certification badges | `http://localhost:3845/assets/a15667205b4732135b7105f77ad81cba2592e2ff.png` |
| Cơ duyên image 27 | `http://localhost:3845/assets/047e80d390e59a0e5a83098df2ed83550ad2ce14.png` |
| Cơ duyên image 28 | `http://localhost:3845/assets/fe8ae57044641cc94fcb285a1c1a8c56cc0c69fc.png` |
| Cơ duyên image 29 (sticker) | `http://localhost:3845/assets/5e28d9cc713d86d6d8c8c8d81f565c1e5728075c.png` |
| Cơ duyên image 30 (sticker) | `http://localhost:3845/assets/42ddf1131c9a9d3e931547b277c5c417ff6d7d26.png` |
| Cơ duyên image 31 (sticker) | `http://localhost:3845/assets/e1aa11e66c9f76b9ee38abad1b8ad794be43b352.png` |
| Sự kiện card 1 image | `http://localhost:3845/assets/c62644c9a62b450e0c7c4be28ffb501f31ecca9d.png` |
| Sự kiện card 2 image | `http://localhost:3845/assets/e71eb17020bd8ba96b975577450341975996cf8e.png` |
| Sự kiện card 3 image | `http://localhost:3845/assets/d592388a8df21a5537033c815b74ab47f5a08bc3.png` |
| Section icon mask SVG | `http://localhost:3845/assets/f41eca59656e9faebe934ec1894e2351d02e9730.svg` |
| Chuyên môn icon gradient bg (briefcase) | `http://localhost:3845/assets/f28c485e6e7618f11e603a16488dec315d9fdde4.svg` |
| Skill icon SVG | `http://localhost:3845/assets/7a08accddc1dbcede08dc05ae30fda04ddb4f08a.svg` |
| Bằng cấp icon gradient bg (medal) | `http://localhost:3845/assets/8a32e3694870adc9ff22f4c560e9b768daedb0fc.svg` |
| CDMP badge SVG | `http://localhost:3845/assets/1958c19fdffc7b43bb259e4c7d57e6e1facc2ed7.svg` |
| Góc nhìn icon gradient bg (save-add) | `http://localhost:3845/assets/79ebd428dce057ccf5c19007b5da3652c87c4504.svg` |
| Blog thumbnail 0 | `http://localhost:3845/assets/d6330a85afd7683315dc64c93b8d6e34fa303197.png` |
| Blog thumbnail 1 | `http://localhost:3845/assets/ef526e7d258992a1f878a61f955860516ffe1857.png` |
| Blog thumbnail 2 | `http://localhost:3845/assets/a6f07b7e07b1c48ff47ed9e97de4e189acc12771.png` |
| Blog thumbnail 3 | `http://localhost:3845/assets/f2b28ca76ad4010346f0133d0d55b418995240c9.png` |
| Blog thumbnail 4 | `http://localhost:3845/assets/9e3d5e7d175ac9583ec70face510620b65e797fb.png` |

---

## 3. Sections

### [S1] Hero Profile

- **Node Desktop:** 3638-10337
- **Node Mobile:** 3746-605
- **Complexity:** COMPLEX
- **Build flags:** `[MASK-IMAGE]`
- **Widget tree:**
```
section (bg: #F2F3F5, padding: 40px, border-radius: 24px inner)
└─ container (flex-row, align: end, gap: 24px, w: 1140px) [DC: column mobile]
   ├─ block (flex-col, gap: 24px, w: 684px, py: 64px) [SC: w 100% mobile]
   │  ├─ block (flex-col, gap: 16px)
   │  │  ├─ text-basic "Chuyên viên R&D" (Inter Medium, 18px, color: #282829)
   │  │  └─ heading "ĐẶNG TUẤN" (Inter Bold, 44px, h3)
   │  ├─ text-basic (body desc, 18px, 2 lines) [SC: smaller mobile]
   │  ├─ image (certification badges, w: 144px, h: 60px)
   │  └─ block (button "Xem bài chia sẻ", bg: #007CFC, radius: 12px, w: 216px)
   └─ block (flex: 1, relative, overflow: hidden) [AM: hidden on small mobile]
      └─ image (profile photo, mask-image: sdasda1.svg)
    [ABSOLUTE elements: background image opacity-50]
```
- **Element count:** 1 section + 2 containers + ~12 sub-elements = **~15 total**
- **Images:**
  - Background: `http://localhost:3845/assets/151608e27d00f1b2b9728c1fb31c5ab7e539c75b.png`
  - Profile: `http://localhost:3845/assets/35be894726e87b3b1a61352510dc20a9a3c3b4a6.png`
  - Mask SVG: `http://localhost:3845/assets/8e0faf96fcf522dea1993bce572ce6ebe738807e.svg`
  - Badges: `http://localhost:3845/assets/a15667205b4732135b7105f77ad81cba2592e2ff.png`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | section | padding: 40px | padding: 16px | `_padding:mobile_portrait` |
  | main container | flex-row, align-end | flex-col | `_direction:mobile_portrait` |
  | text column | w: 684px, py: 64px | w: 100%, py: 24px | `_width:mobile_portrait`, `_padding:mobile_portrait` |
  | heading NAME | 44px | 28px | `_typography:mobile_portrait` |
  | profile image block | visible, flex:1 | w: 334px, centered | size adjust |

- **Gotchas:** mask-image trên profile → dùng `_cssCustom` với `mask-image: url(...)`. Background image dùng `position: absolute` trong section.
- **Template ID:** 7620
- **Status:** done

---

### [S2] Cơ duyên đến với Vietnix

- **Node Desktop:** 3639-1689
- **Node Mobile:** 3746-558
- **Complexity:** MEDIUM
- **Build flags:** `[G2-RISK]`
- **Widget tree:**
```
section (bg: white, padding: 40px)
└─ container (flex-row, gap: 24px, align: center, w: 1140px) [DC]
   ├─ block (flex-col, gap: 24px, flex: 1) [SC]
   │  ├─ heading "Cơ duyên đến với Vietnix" (Inter SemiBold, 36px)
   │  └─ text-basic (body description, 18px Regular, 2 lines)
   └─ block (flex: 1, h: 396px, relative, overflow: hidden) [AM: reflow mobile]
      [ABSOLUTE images stacked: image27, image28, image29, image30, image31]
```
- **Element count:** ~10 elements structure + 5 absolute images = **15 total**
- **Images:**
  - Card main (image 27): `http://localhost:3845/assets/047e80d390e59a0e5a83098df2ed83550ad2ce14.png`
  - Card small (image 28): `http://localhost:3845/assets/fe8ae57044641cc94fcb285a1c1a8c56cc0c69fc.png`
  - Sticker 29: `http://localhost:3845/assets/5e28d9cc713d86d6d8c8c8d81f565c1e5728075c.png`
  - Sticker 30: `http://localhost:3845/assets/42ddf1131c9a9d3e931547b277c5c417ff6d7d26.png`
  - Sticker 31: `http://localhost:3845/assets/e1aa11e66c9f76b9ee38abad1b8ad794be43b352.png`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | main container | flex-row | flex-col | `_direction:mobile_portrait` |
  | text block | flex: 1 | w: 100% | `_width:mobile_portrait` |
  | image collage block | flex:1, h:396px | w: 358px, h: 254px | size adjust mobile |
  | heading | 36px | 24px | `_typography:mobile_portrait` |

- **Gotchas:** 5 ảnh absolute-positioned trong container relative — mỗi ảnh có `_position: "absolute"` + left/top chính xác.
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S3] Sự kiện đã tham gia

- **Node Desktop:** 3735-3914
- **Node Mobile:** 3746-578
- **Complexity:** MEDIUM
- **Build flags:** `[SLIDER]`
- **Widget tree:**
```
section (bg: white, pb: 40px, px: 40px)
└─ container (flex-col, gap: 20px, align: center, w: 1140px)
   ├─ block (flex-row, gap: 10px, align: center — section header with indicator icon + title)
   │  ├─ image (indicator icon 18px)
   │  └─ text-basic "Sự kiện đã tham gia" (Inter SemiBold, 24px)
   ├─ container (flex-row, gap: 24px, align: center, w: 1140px)
   │  ├─ block (event card 1 — border 2px rgba(0,124,252,0.5), radius: 20px, flex:1)
   │  │  ├─ image (card img, radius: 12px)
   │  │  └─ text-basic (bold "Khách mời" + desc)
   │  ├─ block (event card 2 — same style)
   │  │  ├─ image (card img speaker)
   │  │  └─ text-basic (bold "Speaker" + desc)
   │  └─ block (event card 3 — same style)
   │     ├─ image (card img job fair)
   │     └─ text-basic (bold "Khách mời" + desc)
   └─ block (nav arrows: prev/next circle buttons, gap: 32px)
```
- **Element count:** 3 structure blocks + (3 cards × 3 elements) = **12 total**
- **Images:**
  - Card 1 (Webinar ODOO): `http://localhost:3845/assets/c62644c9a62b450e0c7c4be28ffb501f31ecca9d.png`
  - Card 2 (Workshop DDoS): `http://localhost:3845/assets/e71eb17020bd8ba96b975577450341975996cf8e.png`
  - Card 3 (Job Fair): `http://localhost:3845/assets/d592388a8df21a5537033c815b74ab47f5a08bc3.png`
  - Indicator: `http://localhost:3845/assets/e0c011cb2ab9add83023cbd2eb3f9b18b4ab4abe.svg`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | event cards row | flex-row, 3 cols | overflow-x scroll (slider) | use slider-nested or horizontal scroll |
  | each card | flex:1 | w: 286px shrink-0 | `_width:mobile_portrait` |
  | section | px: 40px | px: 16px | `_padding:mobile_portrait` |

- **Gotchas:** Mobile hiển thị horizontal scroll cho 3 cards. Desktop: 3 col flex-row equal width.
- **Template ID:** 7622
- **Status:** done

---

### [S4] Chuyên môn

- **Node Desktop:** 3641-1128
- **Node Mobile:** 3746-606
- **Complexity:** MEDIUM
- **Build flags:** (none)
- **Widget tree:**
```
section (bg: gradient from rgba(242,243,245,0) to #F2F3F5 bottom-half, padding: 40px)
└─ container (flex-col, gap: 40px, align: center)
   ├─ block (flex-row, gap: 24px, align: center, w: 1140px — section header)
   │  ├─ block (flex-col, gap: 24px, flex: 1)
   │  │  ├─ heading "Chuyên môn" (Inter SemiBold, 36px)
   │  │  └─ text-basic (desc, 18px)
   │  └─ block (icon circle, 100px×100px, radius: 999px, gradient bg blue, briefcase icon)
   └─ container (display: grid, 2 cols, gap: 32px, w: 1140px)
      ├─ block (skill card 1 — bg white, radius: 20px, p: 20px, flex-col, gap: 24px)
      │  ├─ image (skill SVG icon, 32px)
      │  ├─ heading "Phát triển hệ thống phòng thủ" (Inter Medium, 24px)
      │  └─ text-basic (description, 18px)
      ├─ block (skill card 2 — same)
      │  ├─ image (skill SVG icon)
      │  ├─ heading "Kiến trúc sư giải pháp Cloud/SaaS"
      │  └─ text-basic
      ├─ block (skill card 3 — same)
      │  ├─ image (skill SVG icon)
      │  ├─ heading "Đánh giá khả thi (Feasibility Study)"
      │  └─ text-basic
      └─ block (skill card 4 — same)
         ├─ image (skill SVG icon)
         ├─ heading "Tư vấn giải pháp nội bộ"
         └─ text-basic
```
- **Element count:** 2 main blocks + (4 cards × 3 elements) = **14 total**
- **Images:**
  - Skill SVG icon: `http://localhost:3845/assets/7a08accddc1dbcede08dc05ae30fda04ddb4f08a.svg`
  - Briefcase icon (for circle): `http://localhost:3845/assets/f28c485e6e7618f11e603a16488dec315d9fdde4.svg`
  - Mask icon circle: `http://localhost:3845/assets/f41eca59656e9faebe934ec1894e2351d02e9730.svg`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | section | padding: 40px | padding: 16px | `_padding:mobile_portrait` |
  | header row | flex-row | flex-col | `_direction:mobile_portrait` |
  | skill grid | 2 cols grid | 1 col stack | `_cssCustom:mobile_portrait: grid-template-columns:1fr` |
  | heading h4 | 36px | 24px | `_typography:mobile_portrait` |

- **Gotchas:** 4 skill texts từ Figma code: (1) Phát triển hệ thống phòng thủ — Nghiên cứu và cấu hình các lớp Firewall; (2) Kiến trúc sư giải pháp Cloud/SaaS; (3) Đánh giá khả thi (Feasibility Study); (4) Tư vấn giải pháp nội bộ.
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S5] Bằng cấp và chứng chỉ

- **Node Desktop:** 3641-1204
- **Node Mobile:** 3746-656
- **Complexity:** MEDIUM
- **Build flags:** `[TOKEN-RISK]`
- **Widget tree:**
```
section (bg: gradient from #F2F3F5 top-half to transparent, padding: 40px)
└─ container (flex-col, gap: 40px, align: center)
   ├─ block (flex-row, gap: 24px, align: center, w: 1140px — section header)
   │  ├─ block (flex-col, gap: 24px, flex: 1)
   │  │  ├─ heading "Bằng cấp và chứng chỉ" (Inter SemiBold, 36px)
   │  │  └─ text-basic (desc, 18px)
   │  └─ block (icon circle 100px, medal-star icon, gradient blue)
   └─ container (display: grid, 3 cols, gap: 32px, h: 432px, w: 1140px)
      [6x cert cards — CDMP badge + text]
      Each card: border: 2px rgba(0,124,252,0.5), bg: white, radius: 20px
      ├─ block (cert card 1)
      │  ├─ block (CDMP badge absolute top, CDMP text)
      │  └─ text-basic "Certified Digital Marketing Professional..."
      ├─ block (cert card 2...6 — same structure same text)
```
- **Element count:** 2 header blocks + (6 cards × 3 elements) = **20 total**
- **Images:**
  - CDMP badge SVG: `http://localhost:3845/assets/1958c19fdffc7b43bb259e4c7d57e6e1facc2ed7.svg`
  - Medal icon: `http://localhost:3845/assets/8a32e3694870adc9ff22f4c560e9b768daedb0fc.svg`
  - Mask icon circle: `http://localhost:3845/assets/f41eca59656e9faebe934ec1894e2351d02e9730.svg`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | section | padding: 40px | padding: 16px | `_padding:mobile_portrait` |
  | cert grid | 3 cols | horizontal scroll (4 cards visible, scroll) | slider-nested or scroll mobile |
  | each cert card | flex:1 | w: ~286px | `_width:mobile_portrait` |
  | heading | 36px | 24px | `_typography:mobile_portrait` |

- **Gotchas:** 6 cert cards same text (PLACEHOLDER). Mobile có 4 cards trong scroll container. `CDMP` badge label absolute positioned trên card.
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S6] Góc nhìn và chia sẻ

- **Node Desktop:** 3641-1253
- **Node Mobile:** 3746-729
- **Complexity:** COMPLEX
- **Build flags:** `[TOKEN-RISK]` `[PLACEHOLDER]`
- **Widget tree:**
```
section (bg: white, padding: 40px)
└─ container (flex-col, gap: 40px, align: center)
   ├─ block (flex-row, gap: 24px, align: center, w: 1140px — section header)
   │  ├─ block (flex-col, gap: 24px, flex: 1)
   │  │  ├─ heading "Góc nhìn và chia sẻ" (Inter SemiBold, 36px)
   │  │  └─ text-basic (desc, 18px)
   │  └─ block (icon circle 100px, save-add icon, gradient blue)
   └─ block (w: 1140px, flex-col)
      ├─ block (grid row 1 — flex-row, gap: 24px, pb: 32px, pt: 8px, px: 8px)
      │  [3x blog cards: thumbnail + cat + title + excerpt + date/read-time]
      ├─ block (grid row 2 — flex-row, gap: 24px, pb: 32px, pt: 8px, px: 8px)
      │  [3x blog cards]
      └─ block (grid row 3 — flex-row, gap: 24px, p: 8px)
         [3x blog cards]
      + block (pagination "Xem thêm" button)
      Each blog card: bg: #ECF7FF, radius: 8px, flex-col
        ├─ image (thumbnail, h: 138px, object-cover)
        └─ block (flex-col, px: 8px, py: 12px)
           ├─ text-basic (category, underline, 14px, color #525666)
           ├─ heading (title, Roboto Bold, 16px)
           ├─ text-basic (excerpt, 14px regular)
           └─ block (date + separator + read-time, flex-row, gap: 8px)
```
- **Element count:** 2 header + (9 cards × 6 elements) + 1 pagination = **57 total** ⚠️ TOKEN-RISK
- **Images:**
  - Thumbnail 1 (WordPress): `http://localhost:3845/assets/d6330a85afd7683315dc64c93b8d6e34fa303197.png`
  - Thumbnail 2 (Tên miền): `http://localhost:3845/assets/ef526e7d258992a1f878a61f955860516ffe1857.png`
  - Thumbnail 3 (SSL): `http://localhost:3845/assets/ef526e7d258992a1f878a61f955860516ffe1857.png`
  - Thumbnail 4 (Firewall): `http://localhost:3845/assets/a6f07b7e07b1c48ff47ed9e97de4e189acc12771.png`
  - Thumbnail 5 (VPS): `http://localhost:3845/assets/f2b28ca76ad4010346f0133d0d55b418995240c9.png`
  - Thumbnail 6 (WP): `http://localhost:3845/assets/9e3d5e7d175ac9583ec70face510620b65e797fb.png`
  - Thumbnail 7-9: same as above (repeated)
  - Save-add icon: `http://localhost:3845/assets/79ebd428dce057ccf5c19007b5da3652c87c4504.svg`
  - Mask icon circle: `http://localhost:3845/assets/f41eca59656e9faebe934ec1894e2351d02e9730.svg`
- **Mobile diff table:**

  | Element | Desktop | Mobile | Bricks key |
  |---|---|---|---|
  | section | padding: 40px | padding: 16px | `_padding:mobile_portrait` |
  | header row | flex-row | flex-col | `_direction:mobile_portrait` |
  | blog grid rows | flex-row (3 cols) | flex-col (1 col, 12 cards stack) | `_direction:mobile_portrait`, `_wrap` |
  | heading | 36px | 24px | `_typography:mobile_portrait` |
  | each card | flex:1 | w: 343px (full) | `_width:mobile_portrait` |

- **Gotchas:** 9 blog cards = 3 rows × 3 cards desktop. Mobile: stacked as 12 cards single column (từ mobile metadata). Dùng compact response khi build vì TOKEN-RISK.
- **Template ID:** (Phase 2)
- **Status:** pending

---

## 4. Blog Card Data (Góc nhìn S6)

| Card | Category | Title | Date | Read |
|---|---|---|---|---|
| 1 | WordPress | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 2 | Tên miền | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 3 | Chứng chỉ SSL | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 4 | Chứng chỉ SSL | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 5 | Firewall Anti DDoS | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 6 | VPS | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 7 | WordPress | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 8 | Firewall Anti DDoS | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |
| 9 | VPS | Cách đăng bài bán hàng trên Facebook đơn giản, hiệu quả nhất | 26/08/2021 | 3 phút đọc |

