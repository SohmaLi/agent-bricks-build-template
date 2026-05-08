# Plan: Blog Author Profile — Đặng Tuấn

**Slug:** dang-tuan
**Figma Node Desktop:** 3641-1142
**Figma Node Mobile:** 3745-430
**Ngày tạo:** 2026-05-08

---

## 1. Tổng quan

- Viewport: 1400px | Max-width: 1140px (content) / 1400px (section)
- Padding section: 40px inset
- Tổng sections (không tính Header/Footer): 6
- WordPress Page ID: 7561

---

## 2. Design Variables (Global)

### Colors

| Token          | Hex                 | Dùng trong                              |
| -------------- | ------------------- | --------------------------------------- |
| primary        | #007CFC             | Button bg, gradient icon, border accent |
| grey/50        | #F2F3F5             | Section background                      |
| text/primary   | #282829             | Heading, body text                      |
| text/secondary | #525666             | Blog card meta text                     |
| white          | #FFFFFF / #FCFCFC   | Background, reverse text                |
| border/accent  | rgba(0,124,252,0.5) | Card border                             |
| shadow/card    | rgba(0,124,252,0.2) | Card inset shadow                       |

### Typography

| Token          | Font   | Size | Weight         | Line Height |
| -------------- | ------ | ---- | -------------- | ----------- |
| heading/h3     | Inter  | 44px | 700 (Bold)     | 56px        |
| heading/h4     | Inter  | 36px | 600 (SemiBold) | 48px        |
| title/lg       | Inter  | 24px | 500 (Medium)   | 36px        |
| body/xl        | Inter  | 18px | 400 (Regular)  | 30px        |
| body/xl-medium | Inter  | 18px | 500 (Medium)   | 30px        |
| body/lg        | Inter  | 16px | 400 (Regular)  | 28px        |
| body/md        | Roboto | 14px | 400 (Regular)  | 20px        |
| cert/title     | Roboto | 18px | 500 (Medium)   | 28px        |

### Spacing & Radius

| Giá trị | Dùng trong                                   |
| ------- | -------------------------------------------- |
| 40px    | Section padding inset                        |
| 64px    | Hero content padding top/bottom              |
| 32px    | Card grid gap (horizontal)                   |
| 24px    | General gap (card, col)                      |
| 16px    | Inner element gap                            |
| 20px    | Card border-radius                           |
| 24px    | Section border-radius (hero container)       |
| 12px    | Button border-radius                         |
| 999px   | Pill border-radius (nav button, icon circle) |

---

## 3. Sections

### [S1] Hero — Author Profile

- **Node Desktop:** 3638-10337
- **Node Mobile:** 3746-605
- **Complexity:** MEDIUM
- **Widget tree:**
  ```
  section (bg: #F2F3F5, border-radius: 24px, padding: 40px)
  └─ container (width: 1140px, flex-row, gap: 24px, align-items: end)
     ├─ block (flex-col, gap: 24px, padding-top: 64px, padding-bottom: 64px, width: 50%)
     │  ├─ block (flex-col, gap: 16px)  ← title group
     │  │  ├─ text-basic "Chuyên viên R&D"
     │  │  └─ heading "ĐẶNG TUẤN"
     │  ├─ text-basic "Với hơn 4 năm..."
     │  ├─ image (cert badges)
     │  └─ button "Xem bài chia sẻ"
     └─ block (flex-col, width: 50%, position: relative)  ← image side
        └─ image (author photo, mask-image via _cssCustom)
  ```
- **Elements:** ~8 | **Depth:** 4
- **Images:**
  - Background: `http://localhost:3845/assets/151608e27d00f1b2b9728c1fb31c5ab7e539c75b.png`
  - Cert badges: `http://localhost:3845/assets/a15667205b4732135b7105f77ad81cba2592e2ff.png`
  - Author photo: `http://localhost:3845/assets/35be894726e87b3b1a61352510dc20a9a3c3b4a6.png` (với mask-image)
  - Mask SVG: `http://localhost:3845/assets/8e0faf96fcf522dea1993bce572ce6ebe738807e.svg`
- **Mobile diff:** Stack vertical (image trên, text dưới)
- **Gotchas:** Author image dùng `mask-image` CSS → cần `_cssCustom`. Background image có `opacity: 0.5`
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S2] Cơ duyên đến với Vietnix

- **Node Desktop:** 3639-1689
- **Node Mobile:** 3746-558
- **Complexity:** MEDIUM
- **Widget tree:**
  ```
  section (bg: white, padding: 40px)
  └─ container (width: 1140px, flex-row, gap: 24px, align-items: center)
     ├─ block (flex-col, gap: 24px, width: 50%)  ← text side
     │  ├─ heading "Cơ duyên đến với Vietnix"
     │  └─ text-basic "Với hơn 4 năm..."
     └─ block (width: 50%, height: 396px, position: relative)  ← photo collage
        └─ image (placeholder composite — 5 ảnh: image27–31)
  ```
- **Elements:** ~10 | **Depth:** 4
- **Images:**
  - image27: `http://localhost:3845/assets/047e80d390e59a0e5a83098df2ed83550ad2ce14.png`
  - image28: `http://localhost:3845/assets/fe8ae57044641cc94fcb285a1c1a8c56cc0c69fc.png`
  - image29: `http://localhost:3845/assets/5e28d9cc713d86d6d8c8c8d81f565c1e5728075c.png`
  - image30: `http://localhost:3845/assets/42ddf1131c9a9d3e931547b277c5c417ff6d7d26.png`
  - image31: `http://localhost:3845/assets/e1aa11e66c9f76b9ee38abad1b8ad794be43b352.png`
- **Mobile diff:** Stack vertical
- **Gotchas:** Photo collage có 5 ảnh với position absolute → dùng Illustration Placeholder (RULE 4D)
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S3] Sự kiện đã tham gia

- **Node Desktop:** 3735-3914
- **Node Mobile:** 3746-578
- **Complexity:** MEDIUM
- **Widget tree:**
  ```
  section (bg: white, padding: 40px)
  └─ container (flex-col, gap: 20px, align-items: center)
     ├─ block (width: 1140px, flex-row, gap: 10px, align-items: center)  ← heading row
     │  ├─ image (indicator icon SVG)
     │  └─ text-basic "Sự kiện đã tham gia"
     ├─ block (width: 1140px, flex-row, gap: 24px)  ← 3 cards
     │  ├─ block (flex-col, gap: 16px, border, border-radius: 20px)  ← card 1
     │  │  ├─ image (event photo)
     │  │  └─ text-basic "Khách mời - Webinar..."
     │  ├─ block (flex-col, gap: 16px, border, border-radius: 20px)  ← card 2
     │  │  ├─ image (event photo)
     │  │  └─ text-basic "Speaker - Workshop..."
     │  └─ block (flex-col, gap: 16px, border, border-radius: 20px)  ← card 3
     │     ├─ image (event photo)
     │     └─ text-basic "Khách mời - Ngày hội..."
     └─ block (flex-row, gap: 32px, align-items: center)  ← prev/next
        ├─ button (icon, outline, pill)
        └─ button (icon, outline, pill)
  ```
- **Elements:** ~15 | **Depth:** 5
- **Images:**
  - Event image 1: `http://localhost:3845/assets/c62644c9a62b450e0c7c4be28ffb501f31ecca9d.png`
  - Event image 2: `http://localhost:3845/assets/e71eb17020bd8ba96b975577450341975996cf8e.png`
  - Event image 3: `http://localhost:3845/assets/d592388a8df21a5537033c815b74ab47f5a08bc3.png`
  - Indicator icon: `http://localhost:3845/assets/e0c011cb2ab9add83023cbd2eb3f9b18b4ab4abe.svg`
- **Mobile diff:** 1 cột, scroll horizontal
- **Gotchas:** 3 cards có border `rgba(0,124,252,0.5)` + inset shadow `rgba(0,124,252,0.2)`. Prev/next buttons là decorative (không cần JS)
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S4] Chuyên môn

- **Node Desktop:** 3641-1128
- **Node Mobile:** 3746-606
- **Complexity:** MEDIUM
- **Widget tree:**
  ```
  section (gradient bg: #F2F3F5→transparent, padding: 40px)
  └─ container (flex-col, gap: 40px, align-items: center)
     ├─ block (width: 1140px, flex-row, gap: 24px, align-items: center)  ← heading row
     │  ├─ block (flex-col, gap: 24px, flex: 1)  ← text
     │  │  ├─ heading "Chuyên môn"
     │  │  └─ text-basic "Với hơn 4 năm..."
     │  └─ block (size: 100px, border-radius: 999px, position: relative)  ← icon circle
     │     └─ image (briefcase icon — radial gradient bg via _cssCustom)
     └─ block (width: 1140px, display: grid, grid-template-columns: repeat(2,1fr), gap: 32px)  ← 2x2 grid
        ├─ block (flex-col, gap: 24px, bg: white, border-radius: 20px, padding: 20px)  ← card 1
        │  ├─ image (radio icon)
        │  └─ text-basic title + description
        ├─ block (flex-col, gap: 24px, bg: white, border-radius: 20px, padding: 20px)  ← card 2
        ├─ block (flex-col, gap: 24px, bg: white, border-radius: 20px, padding: 20px)  ← card 3
        └─ block (flex-col, gap: 24px, bg: white, border-radius: 20px, padding: 20px)  ← card 4
  ```
- **Elements:** ~12 | **Depth:** 4
- **Images:** Icon SVG (briefcase) trong radial gradient circle
- **Mobile diff:** 1 cột
- **Gotchas:** Background gradient `from rgba(242,243,245,0) to #F2F3F5` — 2 sections (S4 + S5) có gradient ngược nhau (from-bottom, from-top). Icon circle dùng radial gradient CSS phức tạp → `_cssCustom`
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S5] Bằng cấp và chứng chỉ

- **Node Desktop:** 3641-1204
- **Node Mobile:** 3746-656
- **Complexity:** MEDIUM
- **Widget tree:**
  ```
  section (gradient bg: transparent→#F2F3F5, padding: 40px)
  └─ container (flex-col, gap: 40px, align-items: center)
     ├─ block (width: 1140px, flex-row, gap: 24px, align-items: center)  ← heading row
     │  ├─ block (flex-col, gap: 24px, flex: 1)
     │  │  ├─ heading "Bằng cấp và chứng chỉ"
     │  │  └─ text-basic "Với hơn 4 năm..."
     │  └─ block (size: 100px, border-radius: 999px)  ← icon circle
     │     └─ image (medal-star icon)
     └─ block (width: 1140px, display: grid, grid-template-columns: repeat(3,1fr), gap: 32px, height: 432px)  ← 3x2 grid
        ├─ block (border, border-radius: 20px, padding: 24px)  ← cert card 1
        │  ├─ text-basic "Certified Digital Marketing..."
        │  └─ block (position: absolute, top: -2px, left: 22px)  ← CDMP badge
        │     └─ image (badge SVG + text "CDMP")
        ├─ block (...)  ← cert card 2
        ├─ block (...)  ← cert card 3
        ├─ block (...)  ← cert card 4
        ├─ block (...)  ← cert card 5
        └─ block (...)  ← cert card 6
  ```
- **Elements:** ~15 | **Depth:** 5
- **Images:**
  - CDMP badge SVG: `http://localhost:3845/assets/1958c19fdffc7b43bb259e4c7d57e6e1facc2ed7.svg`
- **Mobile diff:** 2 cột → 1 cột
- **Gotchas:** 6 cert cards (đếm chính xác: 2 rows × 3 cols). Card có CDMP badge là positioned element. Background gradient ngược với S4
- **Template ID:** (Phase 2)
- **Status:** pending

---

### [S6] Góc nhìn và chia sẻ (Blog Grid)

- **Node Desktop:** 3641-1253
- **Node Mobile:** 3746-729
- **Complexity:** COMPLEX
- **Widget tree:**
  ```
  section (bg: white, padding: 40px)
  └─ container (flex-col, gap: 40px, align-items: center)
     ├─ block (width: 1140px, flex-row, gap: 24px, align-items: center)  ← heading row
     │  ├─ block (flex-col, gap: 24px, flex: 1)
     │  │  ├─ heading "Góc nhìn và chia sẻ"
     │  │  └─ text-basic "Với hơn 4 năm..."
     │  └─ block (size: 100px, border-radius: 999px)  ← icon circle
     │     └─ image (save-add icon)
     └─ block (width: 1140px, flex-col)  ← blog list
        └─ block (flex-row, gap: 24px)  ← row (4 cards/row)
           ├─ block (flex-col, bg: #ECF7FF, border-radius: 8px, overflow: clip)  ← blog card
           │  ├─ image (thumbnail)
           │  └─ block (flex-col, padding: 8px 12px)
           │     ├─ text-basic "WordPress" (category, underline)
           │     ├─ text-basic title (bold, 16px)
           │     ├─ text-basic excerpt (14px)
           │     └─ block (flex-row, gap: 8px)  ← meta
           │        ├─ text-basic date
           │        ├─ text-basic "•"
           │        └─ text-basic read-time
           └─ ... (repeat cho đủ số cards từ Figma)
  ```
- **Elements:** ~30+ | **Depth:** 6
- **Images:**
  - Thumbnails: `http://localhost:3845/assets/d6330a85afd7683315dc64c93b8d6e34fa303197.png` (+ 4 more)
- **Mobile diff:** 1-2 cột
- **Gotchas:** Blog cards có nhiều elements (thumbnail, cat, title, excerpt, date, read-time). Cần đếm chính xác số card từ Figma
- **Template ID:** (Phase 2)
- **Status:** pending

---

## 4. Template IDs (Phase 2)

| Section | Template Title                            | Template ID | Status |
| ------- | ----------------------------------------- | ----------- | ------ |
| S1      | dang-tuan - S1 - Hero Author Profile      | **7562**    | done   |
| S2      | dang-tuan - S2 - Co Duyen Den Voi Vietnix | **7563**    | done   |
| S3      | dang-tuan - S3 - Su Kien Da Tham Gia      | **7564**    | done   |
| S4      | dang-tuan - S4 - Chuyen Mon               | **7565**    | done   |
| S5      | dang-tuan - S5 - Bang Cap Va Chung Chi    | **7566**    | done   |
| S6      | dang-tuan - S6 - Goc Nhin Va Chia Se      | **7567**    | done   |
