# S1: Hero | Node: `1234-5679` | Desktop: `1234-5679` | Mobile: `1234-5682` | SIMPLE
> ⚠️ **File này là VÍ DỤ** — tham khảo cho `.agents/plans/example-landing-page.md`

## Layout
1 col, text center, gradient background + hero image overlay absolute. Container max-width 1200px căn giữa. Gap 32px giữa các elements.

## Element Tree
```
Section [s1sec01]                             ← depth 0, gradient bg + position:relative
└── Container inner [s1ctn02]                 ← depth 1, flex col, center, padding 120px 24px
    ├── Text-basic tag [s1tag03]              ← depth 2, "⚡ Landing Page"
    ├── Heading H1 [s1hd104]                 ← depth 2, "Tiêu đề chính..."
    ├── Text-basic desc [s1dsc05]            ← depth 2, description
    └── Block buttons row [s1btn06]          ← depth 2, flex row, gap 16px
        ├── Button primary [s1bp107]         ← depth 3, "Dùng thử miễn phí"
        └── Button outline [s1bo208]         ← depth 3, "Xem demo"
```

## Images
| Tên | URL |
|-----|-----|
| hero-bg | http://localhost:3845/assets/abc123def456.png |

## ⚠️ Flags & Gotchas
| Flag | Elements |
|------|----------|
| [G2-RISK] flex-row block cần `flex-wrap: nowrap` | s1btn06 (buttons row) |
| [CTRL-S-REQUIRED] Element dùng `_cssCustom` gradient | s1sec01 |

## Exact Values (từ Figma DevMode — KHÔNG assumption)
| Element ID | Widget | Property | Desktop | Mobile |
|------------|--------|----------|---------|--------|
| s1sec01 | section | background | `linear-gradient(180deg, #001433 0%, #002966 100%)` | same |
| s1ctn02 | container | padding | top:120px right:24px bottom:120px left:24px | top:80px right:16px bottom:80px left:16px |
| s1ctn02 | container | gap | 32px | 24px |
| s1ctn02 | container | max-width | 1200px | same |
| s1tag03 | text-basic | font-size/weight/color | 14px / 600 / #1EAFFF | same |
| s1hd104 | heading | font-size/weight/line-height/color | 56px / 800 / 72px / #FFFFFF | 32px / 800 / 44px / #FFFFFF |
| s1dsc05 | text-basic | font-size/color | 18px / rgba(255,255,255,0.8) | 16px / same |
| s1btn06 | block | gap | 16px (column-gap) | 12px |
| s1bp107 | button | bg/radius | #007CFC / 999px | same |
| s1bo208 | button | style | outline / #FFFFFF text | same |

## Bricks Widget Map
| Element | Widget | Settings JSON |
|---------|--------|---------------|
| Section | `section` | `{"_padding":{"top":"0px","bottom":"0px","left":"0px","right":"0px"},"_position":"relative","_overflow":"hidden","_cssCustom":"#brxe-s1sec01{background:linear-gradient(180deg,#001433 0%,#002966 100%);}"}` |
| Container | `container` | `{"_display":"flex","_direction":"column","_alignItems":"center","_rowGap":"32px","_widthMax":"1200px","_margin":{"top":"0px","bottom":"0px","left":"auto","right":"auto"},"_padding":{"top":"120px","bottom":"120px","left":"24px","right":"24px"}}` |
| Tag | `text-basic` | `{"text":"⚡ Landing Page","_typography":{"color":{"hex":"#1EAFFF"},"font-size":"14px","font-weight":"600","line-height":"20px"}}` |
| Heading H1 | `heading` | `{"tag":"h1","text":"Tiêu đề chính của Landing Page","_typography":{"color":{"hex":"#FFFFFF"},"font-size":"56px","font-weight":"800","line-height":"72px"}}` |
| Description | `text-basic` | `{"text":"Mô tả ngắn về sản phẩm/dịch vụ của bạn trong 1-2 câu.","_typography":{"color":{"hex":"rgba(255,255,255,0.8)"},"font-size":"18px","line-height":"30px"}}` |
| Buttons row | `block` | `{"_display":"flex","_direction":"row","_columnGap":"16px","_cssCustom":"#brxe-s1btn06{flex-wrap:nowrap;}"}` |
| Button primary | `button` | `{"text":"Dùng thử miễn phí","_background":{"color":{"hex":"#007CFC"}},"_border":{"radius":{"top":"999px","right":"999px","bottom":"999px","left":"999px"}},"_padding":{"top":"14px","bottom":"14px","left":"28px","right":"28px"}}` |
| Button outline | `button` | `{"text":"Xem demo","style":"outline","_border":{"radius":{"top":"999px","right":"999px","bottom":"999px","left":"999px"}},"_padding":{"top":"14px","bottom":"14px","left":"28px","right":"28px"}}` |

## ❓ Quyết định đã xác nhận với user
- [Q1] Mobile: không cần responsive (desktop only)
- [Q2] Gradient: lấy exact từ Figma DevMode — `linear-gradient(180deg, #001433 0%, #002966 100%)`
