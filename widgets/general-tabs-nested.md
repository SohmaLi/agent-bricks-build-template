# Widget: `tabs-nested`

> **Source:** `bricks/includes/elements/tabs-nested.php`
> **Category:** general | **Nestable:** true | **Scripts:** bricksTabs

Tabs nestable — tab menu và content area là các nestable blocks tùy chỉnh hoàn toàn.

---

## ⚠️ CRITICAL RULES (học từ thực tế — bắt buộc đọc trước khi build)

### 1. Element type bắt buộc cho từng sub-element

| Sub-element | Widget type | Lý do |
|------------|-------------|-------|
| Tab menu wrapper | `block` + class `tab-menu` | Bricks JS tìm `.tab-menu` |
| Tab title (từng tab) | **`div`** + class `tab-title` | Phải là `div`, KHÔNG dùng `block` |
| Tab content wrapper | `block` + class `tab-content` | Bricks JS tìm `.tab-content` |
| Tab pane (từng panel) | `block` + class `tab-pane` | Bricks JS control visibility |

### 2. KHÔNG bao giờ đặt CSS display lên `tab-pane`

```
❌ SAI: tab-pane._cssCustom = "#brxe-xxx { display: grid; }"
❌ SAI: tab-pane._display = "grid"
✅ ĐÚNG: Thêm inner wrapper BÊN TRONG tab-pane, đặt display lên inner wrapper
```

Lý do: Bricks JS tự control `display` của `tab-pane` (show/hide). Override sẽ break JS.

### 3. Dùng `.brx-open` selector cho styling khi pane active

```css
/* Nếu inner wrapper cần display:grid khi active */
#brxe-innerWrp.brx-open { display: grid; }  /* ❌ SAI — brx-open ở pane, không phải wrapper */

/* ĐÚNG: Dùng selector từ parent pane */
#brxe-paneId.brx-open #brxe-innerWrp { display: grid; }
/* hoặc đơn giản hơn: inner wrapper luôn display:grid, tab-pane ẩn/hiện nó */
```

### 4. Active state CSS đặt trên `tabs-nested` root (centralize)

```css
/* Trong _cssCustom của tabs-nested root */
#brxe-rootId .tab-title { padding: 8px 16px; border-radius: 12px 12px 0 0; }
#brxe-rootId .tab-title.brx-open { background: #242424; border-radius: 16px 16px 0 0; }
#brxe-rootId .tab-menu { display: flex; flex-direction: row; flex-wrap: nowrap; }
```

### 5. `flex-wrap: nowrap` bắt buộc cho tab-menu

Tab menu phải có `flex-wrap: nowrap` để tránh wrap thành nhiều dòng (especially mobile).

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `direction` | direction | Layout tabs: `row` (horizontal) hoặc `column` (vertical) |
| `openTabOn` | select | Trigger: `"click"` (default) hoặc `"mouseenter"` (hover) |
| `openTab` | text | Index tab mở sẵn (0-based, default: `0`) |

### Title Group (selector: `> .tab-menu .tab-title`)
| Key | Mô tả |
|-----|-------|
| `titleWidth` | Width tab button (default: `auto`) |
| `titleMargin/Padding` | Spacing (default padding: 20px) |
| `titleBackgroundColor` | Background |
| `titleBorder` | Border |
| `titleTypography` | Typography |
| `titleActiveBackgroundColor` | BG active tab (`.tab-title.brx-open`) — default: `#dddedf` |
| `titleActiveBorder` | Border active |
| `titleActiveTypography` | Typography active |

### Content Group (selector: `> .tab-content`)
| Key | Mô tả |
|-----|-------|
| `contentMargin/Padding` | Spacing (default padding: 20px) |
| `contentColor` | Text color |
| `contentBackgroundColor` | Background |
| `contentBorder` | Border (default: 1px solid) |

---

## Nestable Structure (Bắt buộc)

```
tabs-nested [root]
├── block (.tab-menu)          — flex row, nowrap
│   ├── div (.tab-title)       — Tab 1 content
│   ├── div (.tab-title)       — Tab 2 content
│   └── div (.tab-title)       — Tab 3 content
└── block (.tab-content)       — KHÔNG style ở đây
    ├── block (.tab-pane)      — Bricks JS control: ĐỂ TRỐNG settings
    │   └── block (inner-wrap) — Layout thực sự ở đây: display, grid, padding...
    ├── block (.tab-pane)      — same pattern
    │   └── block (inner-wrap)
    └── block (.tab-pane)
        └── block (inner-wrap)
```

> **Pattern "Inner Wrapper"**: `tab-pane` để trống hoàn toàn (không settings). Mọi layout (display:grid, padding, background, border-radius) đặt trên block inner-wrap bên trong.

---

## Lưu ý

- Số `.tab-title` PHẢI bằng số `.tab-pane` (Bricks match theo index)
- Classes `tab-menu`, `tab-title`, `tab-content`, `tab-pane` set qua `_hidden._cssClasses`
- Bricks JS tự add `brx-open` class vào active tab-title và active tab-pane
- `tab-title` là `div` widget, KHÔNG phải `block` — rất quan trọng
- Mặc định tab đầu tiên (index 0) active — đừng thêm class thủ công
- **Ctrl+S bắt buộc** sau khi push API để CSS generator chạy

---

## Ví dụ JSON — Full Element Tree (dùng với `update_content`)

```json
[
  {
    "id": "tabroot",
    "name": "tabs-nested",
    "parent": "0",
    "children": ["tabmenu", "tabcont"],
    "settings": {
      "_width": "100%",
      "_cssCustom": "#brxe-tabroot .tab-menu { display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%; } #brxe-tabroot .tab-title { padding: 8px 16px; border-radius: 12px 12px 0 0; cursor: pointer; white-space: nowrap; transition: background 0.2s ease; } #brxe-tabroot .tab-title.brx-open { background: #242424; border-radius: 16px 16px 0 0; }",
      "_cssCustom:mobile_portrait": "#brxe-tabroot .tab-menu { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; } #brxe-tabroot .tab-menu::-webkit-scrollbar { display: none; } #brxe-tabroot .tab-title { padding: 8px 10px; }"
    }
  },
  {
    "id": "tabmenu",
    "name": "block",
    "parent": "tabroot",
    "children": ["tabt01", "tabt02", "tabt03"],
    "settings": {
      "_direction": "row",
      "_hidden": { "_cssClasses": "tab-menu" }
    }
  },
  {
    "id": "tabt01",
    "name": "div",
    "parent": "tabmenu",
    "children": [],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" },
      "text": "Tab 1"
    }
  },
  {
    "id": "tabt02",
    "name": "div",
    "parent": "tabmenu",
    "children": [],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" },
      "text": "Tab 2"
    }
  },
  {
    "id": "tabt03",
    "name": "div",
    "parent": "tabmenu",
    "children": [],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" },
      "text": "Tab 3"
    }
  },
  {
    "id": "tabcont",
    "name": "block",
    "parent": "tabroot",
    "children": ["tabp01", "tabp02", "tabp03"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-content" }
    }
  },
  {
    "id": "tabp01",
    "name": "block",
    "parent": "tabcont",
    "children": ["tabw01"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-pane" }
    }
  },
  {
    "id": "tabw01",
    "name": "block",
    "parent": "tabp01",
    "children": [],
    "settings": {
      "_cssCustom": "#brxe-tabw01 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 20px; border-radius: 0 0 16px 16px; }",
      "_cssCustom:mobile_portrait": "#brxe-tabw01 { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 8px; border-radius: 16px; }"
    }
  },
  {
    "id": "tabp02",
    "name": "block",
    "parent": "tabcont",
    "children": ["tabw02"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-pane" }
    }
  },
  {
    "id": "tabw02",
    "name": "block",
    "parent": "tabp02",
    "children": [],
    "settings": {
      "_padding": { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" }
    }
  },
  {
    "id": "tabp03",
    "name": "block",
    "parent": "tabcont",
    "children": ["tabw03"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-pane" }
    }
  },
  {
    "id": "tabw03",
    "name": "block",
    "parent": "tabp03",
    "children": [],
    "settings": {
      "_padding": { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" }
    }
  }
]
```

---

## API Usage — `add` Action

Khi dùng `mcp_bricks-mcp_content` với action `add`, dùng top-level params:
```
action: "add"
name: "tabs-nested"          ← top-level, KHÔNG nested trong element object
settings: {...}              ← top-level
parent_id: "parentId"
position: 0
post_id: 1234
```

⚠️ **KHÔNG dùng nested `element` object** — API sẽ báo lỗi `missing_name`.
