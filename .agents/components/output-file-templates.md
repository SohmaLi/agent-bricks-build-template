# Component: Section File & Plan File Templates

> **Dùng khi:** Ghi file kết quả trong `/figma-create-plan-template` Phase B.

---

## Template: Overview Plan File

**Path:** `.agents/plans/[slug].md`

```markdown
# Plan: [Tên Trang] | [YYYY-MM-DD]

## Page Info
- Loại: [landing / profile / blog / ...]
- Viewport: [px] | Max-width: [px]
- Figma node: [node-id]

## Design Variables
| Token | Hex | Dùng cho |
|-------|-----|---------|
| primary | #007CFC | Button, icon |

## Sections
| # | Tên | File | Complexity | Status |
|---|-----|------|------------|--------|
| S1 | [Tên] | [slug]-s1-[name].md | SIMPLE | ok |

## Widgets cần dùng
[list widget files đã đọc]

## ❓ Ghi chú & Thắc mắc

### Đã xác nhận với user
| Section | Thắc mắc | Trả lời | Quyết định |
|---------|----------|---------|------------|
| S2 | Slider hay static? | Dùng slider | `slider-nestable` |

### Ghi chú nhắc nhở (cho /bricks-create-template)
- [S1] Hero image: object-fit cover, _objectPosition "50% 0%"
- [S3] Card hover: _cssCustom :hover trên block card
```

---

## Template: Section File

**Path:** `.agents/template/[slug]-s[N]-[section-name].md`

```markdown
# S[N]: [Tên Section] | Node: `[id]` | Desktop: `[node-id]` | Mobile: `[node-id]` | [SIMPLE/MEDIUM/COMPLEX]

## Layout
[Mô tả ngắn: 2 cols flex, image trái / text phải, gap 40px]

## Element Tree
Section
└── **container** inner (flex col, gap:40px)   ← **BẮT BUỘC là `container`, không phải `block` (RULE 10B)**
    ├── Block header (flex row)
    │   ├── Heading h2 "Tiêu đề"
    │   └── Text-basic sub
    └── Block grid (3 cols)
        └── [×N] Block card

## Images
| Tên | URL |
|-----|-----|
| hero-bg | http://localhost:3845/assets/[hash].png |

## ⚠️ Flags & Gotchas (BẮT BUỘC — ghi "none" nếu không có)
| Flag | Elements |
|------|----------|
| [G2-RISK] flex-row block cần `flex-wrap: nowrap` | [list IDs — vd: s1f1xx, s1f2xx, s1grxx] |
| [ABSENT-MOBILE] Element absent trên mobile → `_display:mobile_portrait: none` | [list IDs] |
| [CTRL-S-REQUIRED] Element dùng `_cssCustom` gradient/mask → cần Ctrl+S | [list IDs] |

## Exact Values (từ Figma DevMode — KHÔNG assumption)
> Ghi pixel-exact mọi giá trị. Để trống = chưa verify = KHÔNG được dùng trong build.

| Element ID | Widget | Property | Desktop | Mobile |
|------------|--------|----------|---------|--------|
| s1cn02 | container | padding | top:64px right:24px bottom:64px left:24px | top:48px right:16px bottom:32px left:16px |
| s1tg08 | text-basic | font-size / weight / line-height / color | 18px / 600 / 30px / #40d3ff | 16px / same |
| s1h110 | text-basic | font-size / weight / line-height / color | 44px / 700 / 56px / #ffffff | 28px / 800 / 40px |
| s1h111 | text-basic | font-size / weight / line-height | 44px / 800 / 56px / gradient | 28px / same |
| s1ft13 | block | row-gap | 16px | 12px |
| s1f1xx | block | align-items / column-gap | center / 8px | same |
| s1ic1x | image | width × height | 24×24px | 20×20px |
| ... | ... | ... | ... | ... |

## Bricks Widget Map
| Element | Widget | Settings JSON |
|---------|--------|---------------|
| Section | section | `{"_padding":{"top":"0px","left":"0px","right":"0px","bottom":"0px"}}` |
| Container (**RULE 10B** — `container`, KHÔNG phải `block`) | **container** | `{"_display":"flex","_direction":"column","_padding":{"top":"64px"...}}` |

## ❓ Quyết định đã xác nhận với user
<!-- Chỉ ghi nếu có Q&A với user trong Phase A5 -->
- [Q1] Widget: slider-nestable (đã xác nhận, không phải static)
```

---

## Quy tắc ghi file

- **Mỗi section = 1 tool call** `write_to_file`, không gộp
- **Thứ tự:** overview plan → S1 → S2 → ... → SN
- **Section `[SKIP]`** → bỏ qua
- **`## ❓ Ghi chú`** → chỉ ghi nếu có điểm đặc biệt
- **BẮT BUỘC trước mỗi section file:** đọc lại `→ Status:` trong plan file cho section đó
  - Status có Q&A (A/B/C) → copy y chang quyết định, không tự suy luận
