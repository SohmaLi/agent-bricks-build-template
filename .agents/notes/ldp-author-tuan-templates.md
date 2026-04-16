# Note: Templates – [2026] LDP Author Tuấn – Đặng Tuấn
**Plan:** `.agents/plans/ldp-author-tuan.md`
**Site:** https://stag.vietnix.dev | Bricks (WP 6.9.4)
**Ngày build:** 2026-04-13
**Reference:** `.agents/notes/bricks-mcp-reference.md`

---

## Templates

| # | Template | ID | Edit URL | Status |
|---|----------|----|----------|--------|
| S1 | Hero | (từ session trước) | — | ✅ Đã build session trước |
| S2 | Cor Duyen | 468166 | https://stag.vietnix.dev/wp-admin/post.php?post=468166&action=edit | ✅ Build xong |
| S3 | Su Kien | 468167 | https://stag.vietnix.dev/wp-admin/post.php?post=468167&action=edit | ✅ Build xong |
| S4 | Chuyen Mon | 468168 | https://stag.vietnix.dev/wp-admin/post.php?post=468168&action=edit | ✅ Build xong |
| S5 | Bang Cap | 468169 | https://stag.vietnix.dev/wp-admin/post.php?post=468169&action=edit | ✅ Build xong |
| S6 | Goc Nhin | 468170 | https://stag.vietnix.dev/wp-admin/post.php?post=468170&action=edit | ✅ Build xong |

---

## Element Count
| Template | Elements |
|----------|----------|
| S2 Cor Duyen (468166) | 11 |
| S3 Su Kien (468167) | 21 |
| S4 Chuyen Mon (468168) | 26 |
| S5 Bang Cap (468169) | 40 |
| S6 Goc Nhin (468170) | 65 |

---

## Hierarchy Summary (tất cả đúng)
```
section (depth 0)
└── container (depth 1)
    ├── block [header] (depth 2)
    │   └── ... (depth 3+)
    └── block/grid (depth 2)
        └── ... (depth 3+)
```
- Tất cả root đúng: `section → container`
- Không có element nào còn ở depth 0 sai

---

## Images – Status

### S1 (468144–468147) – ĐÃ UPLOAD ✅
| File | WP ID |
|------|-------|
| hero-bg.png | 468145 |
| cert-badges.png | 468146 |
| profile-photo.png | 468144 |
| profile-mask.svg | 468147 |

### S2 Cor Duyen – CHƯA UPLOAD ⬜
| Mô tả | Kích thước | WP ID |
|--------|-----------|-------|
| Team photo lớn | 385×256px | ⬜ |
| Team photo nhỏ | 191×191px | ⬜ |
| Emoji 1 | 77×81px | ⬜ |
| Emoji 2 | 78×64px | ⬜ |
| Emoji 3 | 90×85px | ⬜ |

> Các div placeholder trong S2 đã có kích thước cố định theo Figma (màu `#e8e8e8`).
> Khi có ảnh: thêm `image` widget bên trong mỗi div tương ứng.

### S3 Su Kien – CHƯA UPLOAD ⬜
| Mô tả | WP ID |
|--------|-------|
| Event image 1 | ⬜ |
| Event image 2 | ⬜ |
| Event image 3 | ⬜ |

> Các div placeholder trong cards đã có height 200px, radius 12px.

### S4 Chuyen Mon – Icon placeholders ⬜
- Div icons (32×32px, màu `#e8e8e8`) trong mỗi card → thay bằng SVG icon sau.
- Circle icon header (100×100px, bg brand blue) → thêm image briefcase icon.

### S5 Bang Cap – Badge SVG ⬜
- Badge label "CDMP" đã có (text-basic trên nền div blue).
- Nếu cần Union SVG shape → thay div badge bằng image SVG.

### S6 Goc Nhin – Thumbnail placeholders ⬜
- Tất cả 10 post thumbnails là div `#e8e8e8`, height 138px.
- Thay bằng image widget khi có ảnh thực.

---

## Element ID Map

### S2 Cor Duyen (468166)
| ID | Widget | Mô tả |
|----|--------|--------|
| usgdur | section | Root |
| qqupcc | container | Wrapper chính |
| rchrgq | block | Col left (text) |
| ggfrgt | heading | H2 "Cơ duyên đến với Vietnix" |
| rllqpq | text-basic | Bio text |
| tdktdi | block | Col right (collage, position:relative) |
| gddite | div | Placeholder ảnh lớn (385×256, absolute top:23 right:0) |
| pqhceh | div | Placeholder ảnh nhỏ (191×191, absolute top:183 left:29) |
| deutrl | div | Placeholder emoji 1 (77×81, absolute top:252 left:179) |
| ileuii | div | Placeholder emoji 2 (78×64, absolute top:87 left:101) |
| rctgci | div | Placeholder emoji 3 (90×85, absolute top:238 left:399) |

### S3 Su Kien (468167)
| ID | Widget | Mô tả |
|----|--------|--------|
| srpirt | section | Root |
| rrdlrj | container | Col direction, rowGap:20px |
| dcifgk | block | Header row |
| iiphcg | div | Indicator dot (18×18, brand blue) |
| ruphfd | heading | H2 "Sự kiện đã tham gia" |
| sdtjer | block | Cards row |
| pjkdpd | block | Card 1 |
| ppqcrc | div | Card 1 image placeholder |
| jpssss | block | Card 1 info |
| cgtttr | text-basic | Card 1 text |
| iujctu | block | Card 2 |
| fesicu | div | Card 2 image placeholder |
| stilrq | block | Card 2 info |
| dugcqt | text-basic | Card 2 text |
| drttqi | block | Card 3 |
| tttuqg | div | Card 3 image placeholder |
| lrpthu | block | Card 3 info |
| tggceq | text-basic | Card 3 text |
| kjteic | block | Carousel nav |
| gtisql | button | Prev button ← |
| ictets | button | Next button → |

### S4 Chuyen Mon (468168)
| ID | Widget | Mô tả |
|----|--------|--------|
| tlcedp | section | Root |
| ptdfdp | container | Col, rowGap:40px |
| gprcpr | block | Header row |
| srdrjt | block | Header left (col, gap:24) |
| ufcsch | heading | H2 "Chuyên môn" |
| quuikh | text-basic | Subtitle text |
| kpqffq | div | Icon circle (100×100, brand blue) |
| rugtgh | block | Grid col |
| uegecc | block | Row 1 |
| elfghu | block | Card 1 |
| kqqqkh | div | Card 1 icon (32×32) |
| gtlcis | heading | Card 1 title |
| itfjik | text-basic | Card 1 text |
| egkkhq | block | Card 2 |
| dqdjdu | div | Card 2 icon |
| tuuhfq | heading | Card 2 title |
| djqdkq | text-basic | Card 2 text |
| kcgfrs | block | Row 2 |
| cddcql | block | Card 3 |
| uillld | div | Card 3 icon |
| tiqddq | heading | Card 3 title |
| sshksi | text-basic | Card 3 text |
| cqculq | block | Card 4 |
| irhduh | div | Card 4 icon |
| fhsjet | heading | Card 4 title |
| iqflhd | text-basic | Card 4 text |

### S5 Bang Cap (468169)
| ID | Widget | Mô tả |
|----|--------|--------|
| cceudf | section | Root |
| rjkhse | container | Col, rowGap:40px |
| sgtclf | block | Header row |
| cehcll | block | Header left |
| hpgust | heading | H2 "Bằng cấp và chứng chỉ" |
| plrhdk | text-basic | Subtitle |
| itlrfe | div | Header icon (100×100) |
| tpthif | block | Grid col |
| fqtfhq | block | Row 1 |
| glduij | block | Card 1 (pt:48, pb:24, px:24) |
| eklkjs | block | Card 1 badge wrapper (absolute) |
| jehqlr | div | Card 1 badge div (81×52, blue) |
| qkuhej | text-basic | Card 1 badge text "CDMP" |
| rppjjr | text-basic | Card 1 cert text |
| rdclul | block | Card 2 |
| cigsgl | block | Card 2 badge wrapper |
| dsjccg | div | Card 2 badge div |
| ktgjdk | text-basic | Card 2 badge text |
| uctslk | text-basic | Card 2 cert text |
| grethh | block | Card 3 |
| kduukg | block | Card 3 badge wrapper |
| litldl | div | Card 3 badge div |
| uuqtek | text-basic | Card 3 badge text |
| epcgfc | text-basic | Card 3 cert text |
| giputj | block | Row 2 |
| hkhsdc | block | Card 4 |
| ruflhg | block | Card 4 badge wrapper |
| qthfru | div | Card 4 badge div |
| qpillq | text-basic | Card 4 badge text |
| qdpejl | text-basic | Card 4 cert text |
| irejhj | block | Card 5 |
| tdgdhc | block | Card 5 badge wrapper |
| ututcr | div | Card 5 badge div |
| uuculr | text-basic | Card 5 badge text |
| qjsigt | text-basic | Card 5 cert text |
| gqkles | block | Card 6 |
| qiiujh | block | Card 6 badge wrapper |
| ssegje | div | Card 6 badge div |
| gftlfi | text-basic | Card 6 badge text |
| lpjekp | text-basic | Card 6 cert text |

---

## Trạng thái
- [x] Tất cả 5 templates đã build xong hierarchy đúng
- [ ] Upload ảnh S2 collage (5 ảnh) → thêm image vào div placeholders
- [ ] Upload ảnh S3 events (3 ảnh) → thay div placeholder
- [ ] Upload icon S4 → thêm image vào div 100×100 + 32×32
- [ ] Upload icon S5 → thêm image vào div header
- [ ] Upload thumbnails S6 (10 ảnh) → thêm image vào div placeholder
- [x] Chạy `/restore-bricks-template` ✅ hoàn tất

---

## Review Result
**Review date:** 2026-04-13
**Reviewer:** Antigravity AI
**Kết quả:** ✅ TẤT CẢ TEMPLATES ĐÃ TƯƠNG THÍCH (sau khi fix 1 lỗi nhỏ)

| Template | Section | Elements | Kết quả | Ghi chú |
|----------|---------|----------|---------|---------|
| [2026] – LDP Author Tuấn - Cor Duyen | S2 | 11 | ✅ PASS | Layout 2-col + 5 absolute divs đúng |
| [2026] – LDP Author Tuấn - Su Kien | S3 | 21 | ✅ PASS | Header + 3 cards + carousel nav đúng |
| [2026] – LDP Author Tuấn - Chuyen Mon | S4 | 26 | ✅ PASS | Header + 2×2 grid cards đúng |
| [2026] – LDP Author Tuấn - Bang Cap | S5 | 40 | ✅ PASS | Header + 3×2 cert cards + badge absolute đúng |
| [2026] – LDP Author Tuấn - Goc Nhin | S6 | 65 | ✅ PASS (fixed) | 2 orphan elements (card2 body) đã được fix |

### Chi tiết fix S6
- **Vấn đề:** `leredd` (category VPS) và `kqchph` (title heading) có `parent: 0` — orphan
- **Nguyên nhân:** bước move vào `ijqfje` (card2 info block) bị thiếu trong session build
- **Đã fix:** Move cả 2 vào `ijqfje` tại position 0 và 1 ✅

### Tiêu chí đánh giá đạt
| Tiêu chí | Kết quả |
|----------|---------|
| Hierarchy `section → container → block/div` | ✅ Tất cả đúng |
| Widget types đúng theo plan | ✅ |
| Background colors đúng | ✅ S2 `#fff`, S3 `#fff`, S4 gradient `#f2f3f5`, S5 gradient, S6 `#fff` |
| Padding/spacing đúng | ✅ `40px` section, card gaps đúng |
| Text content có nội dung mẫu | ✅ |
| Image placeholders có kích thước cố định | ✅ `#e8e8e8` divs |
| Cards S3/S5 có border `rgba(0,124,252,0.5)` | ✅ |
| Badge absolute position S5 | ✅ `position: absolute`, `top: 0`, `left: 22px` |

### Còn cần bổ sung (không FAIL)
- **Ảnh:** Tất cả div placeholder cần thay bằng image widget thực khi có file
- **Card S5 shadow:** `inset 0px 0px 24px rgba(0,124,252,0.2)` chưa có → thêm sau
- **Card S3 shadow:** tương tự
- **S6 card2 body:** chỉ có category+title, thiếu excerpt và meta row → có thể bổ sung

---

## Lưu ý khi bổ sung ảnh
Để thêm ảnh vào một div placeholder:
```
mcp_bricks-mcp_content(
  action: "add",
  post_id: [template_id],
  element: {
    "name": "image",
    "parent": "[div-placeholder-id]",
    "settings": {
      "image": {"id": ATTACHMENT_ID, "url": "WP_URL", "size": "full"},
      "_objectFit": "cover",
      "_width": "100%",
      "_height": "100%"
    }
  }
)
```
