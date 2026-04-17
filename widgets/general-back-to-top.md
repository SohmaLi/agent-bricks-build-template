# Widget: `back-to-top`

> **Source:** `bricks/includes/elements/back-to-top.php`
> **Category:** general | **Tag:** `button` | **Nestable:** true

Nút cuộn về đầu trang — fixed position, hiện/ẩn theo scroll.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `tag` | text | HTML tag override (default: `button`) |
| `ariaLabel` | text | aria-label accessibility |

### Position Group
| Key | CSS | Mô tả |
|-----|-----|-------|
| `position` | `position` | `fixed` (default), `absolute`, `sticky` |
| `positionTop` | `top` | Vị trí top |
| `positionRight` | `right` | Vị trí right (default: `20px`) |
| `positionBottom` | `bottom` | Vị trí bottom (default: `20px`) |
| `positionLeft` | `left` | Vị trí left |

### Misc
| Key | Mô tả |
|-----|-------|
| `_zIndex` | z-index (default: 9999) |
| `_gap` | Gap giữa children icon + text |
| `_cssTransition` | CSS transition |
| `visibleAfter` | Px scroll threshold để hiện (default: luôn hiện) |
| `visibleOnScrollUp` | Chỉ hiện khi scroll lên |
| `smoothScroll` | Smooth scroll về top |

---

## Nestable Children (mặc định)
1. `icon` — arrow up icon
2. `text` — "Back to Top" text

---

## Ví dụ JSON

```json
{
  "id": "bttBtn",
  "name": "back-to-top",
  "parent": "pageRoot",
  "settings": {
    "ariaLabel": "Về đầu trang",
    "position": "fixed",
    "positionRight": "24px",
    "positionBottom": "24px",
    "_zIndex": 9999,
    "visibleAfter": 400,
    "smoothScroll": true,
    "_background": {"color": {"hex": "#007cfc"}},
    "_border": {
      "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
    },
    "_padding": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"},
    "_cssTransition": "all 0.3s ease"
  }
}
```
