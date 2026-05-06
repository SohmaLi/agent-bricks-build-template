# Widget: `offcanvas`

> **Source:** `bricks/includes/elements/offcanvas.php`
> **Category:** general | **Scripts:** bricksOffcanvas | **Nestable:** true

Panel trượt từ cạnh màn hình — dùng cho mobile menu, sidebar, mega panel. Cần `toggle` element để kích hoạt.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | select | `"left"` (default), `"top"`, `"right"`, `"bottom"` |
| `effect` | select | `"slide"` (default), `"offset"` |
| `width` | number+unit → `.brx-offcanvas-inner` | Width (dùng cho `left`/`right`) |
| `height` | number+unit | Height (dùng cho `top`/`bottom`) |
| `closeOn` | select | `"backdrop"`, `"esc"`, `"none"` (default: backdrop & ESC) |
| `noScrollBody` | checkbox | Ngăn scroll body khi offcanvas mở |
| `noAutoFocus` | checkbox | Tắt tự động focus phần tử đầu tiên |
| `scrollToTop` | checkbox | Scroll về top khi mở |
| `ariaLabel` | text | aria-label (default: "Offcanvas") |

---

## Nestable Structure

Mặc định Bricks tạo 2 children cố định:
1. **Content** (`block` / class `brx-offcanvas-inner`) — `cloneable: false`, `deletable: false`
2. **Backdrop** (`block` / class `brx-offcanvas-backdrop`) — có thể xóa

```json
[
  {
    "id": "ocMain",
    "name": "offcanvas",
    "parent": 0,
    "children": ["ocInner", "ocBackdrop"],
    "settings": {"direction": "right", "width": "320px"}
  },
  {
    "id": "ocInner",
    "name": "block",
    "parent": "ocMain",
    "children": ["ocText", "ocClose"],
    "settings": {
      "_hidden": {"_cssClasses": "brx-offcanvas-inner"}
    },
    "label": "Content",
    "cloneable": false,
    "deletable": false
  },
  {
    "id": "ocText",
    "name": "text-basic",
    "parent": "ocInner",
    "children": [],
    "settings": {"text": "Add your offcanvas content in here"}
  },
  {
    "id": "ocClose",
    "name": "toggle",
    "parent": "ocInner",
    "children": [],
    "settings": {},
    "label": "Toggle (Close)"
  },
  {
    "id": "ocBackdrop",
    "name": "block",
    "parent": "ocMain",
    "children": [],
    "settings": {
      "_hidden": {"_cssClasses": "brx-offcanvas-backdrop"}
    },
    "label": "Backdrop"
  }
]
```

---

## Cách kết hợp với Toggle

1. Đặt `offcanvas` widget ở root page (hoặc header template)
2. Đặt `toggle` widget ở header
3. `toggle.toggleSelector` = CSS ID của `offcanvas` (vd: `#brxe-abc123`)
4. `toggle.toggleValue` = `brx-open`

---

## Ví dụ JSON

```json
{
  "id": "ocMobile",
  "name": "offcanvas",
  "parent": "pageRoot",
  "settings": {
    "direction": "right",
    "effect": "slide",
    "width": "320px",
    "closeOn": "backdrop",
    "noScrollBody": true,
    "ariaLabel": "Mobile Menu"
  }
}
```

Toggle button:
```json
{
  "id": "btnHamburger",
  "name": "toggle",
  "parent": "blkHeader",
  "settings": {
    "animation": "boring",
    "toggleSelector": "#brxe-ocMobile",
    "toggleValue": "brx-open",
    "ariaLabel": "Mở menu",
    "barColor": {"hex": "#282829"}
  }
}
```
