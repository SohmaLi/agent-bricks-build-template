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
# S[N]: [Tên Section] | Node: `[id]` | [SIMPLE/MEDIUM/COMPLEX]

## Layout
[Mô tả ngắn: 2 cols flex, image trái / text phải, gap 40px]

## Element Tree
Section
└── Block inner (flex col, gap:40px)
    ├── Block header (flex row)
    │   ├── Heading h2 "Tiêu đề"
    │   └── Text-basic sub
    └── Block grid (3 cols)
        └── [×N] Block card

## Images
| Tên | URL |
|-----|-----|
| hero-bg | http://localhost:3845/assets/[hash].png |

## Bricks Widget Map
| Element | Widget | Settings JSON |
|---------|--------|---------------|
| Section | section | `{"_padding":{"top":"80px"...}}` |
| Container | block | `{"_display":"flex","_direction":"column"}` |

## Behavior & Gotchas
| Vấn đề | Giải pháp |
|--------|----------|
| Image hero bị crop | `_objectFit: "cover"`, `_objectPosition: "50% 0%"` |

## ❓ Ghi chú (chỉ có nếu cần)
<!-- Quyết định đã xác nhận với user, ghi chú cho Flow 2 -->
- Widget: slider-nestable (đã xác nhận, không phải static)
```

---

## Quy tắc ghi file

- **Mỗi section = 1 tool call** `write_to_file`, không gộp
- **Thứ tự:** overview plan → S1 → S2 → ... → SN
- **Section `[SKIP]`** → bỏ qua
- **`## ❓ Ghi chú`** → chỉ ghi nếu có điểm đặc biệt
- **BẮT BUỘC trước mỗi section file:** đọc lại `→ Status:` trong plan file cho section đó
  - Status có Q&A (A/B/C) → copy y chang quyết định, không tự suy luận
