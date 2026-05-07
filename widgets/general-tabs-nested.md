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

### 2. `div` widget KHÔNG có `text` property — BẮT BUỘC dùng `text-basic` con

```
❌ SAI (div không render text):
  div.tab-title { "text": "Chat" }   ← bị bỏ qua hoàn toàn, không hiển thị

✅ ĐÚNG:
  div.tab-title (children: ["lbl01"])
    text-basic [lbl01] { "tag": "span", "text": "Chat" }
```

> **Lý do:** `div` = container widget, KHÔNG phải text widget.
> Mistake này khó phát hiện vì push API không báo lỗi dù property bị bỏ qua.

### 3. KHÔNG bao giờ đặt CSS `display` lên `tab-pane`

```
❌ SAI: tab-pane._cssCustom = "#brxe-xxx { display: grid; }"
❌ SAI: tab-pane._display = "grid"
❌ SAI: _cssCustom root: ".tab-pane { display: flex; justify-content: center; }"
✅ ĐÚNG: Thêm inner wrapper BÊN TRONG tab-pane, đặt display lên inner wrapper
```

Lý do: Bricks JS tự control `display` của `tab-pane` (show/hide). Override sẽ break JS.
**⚠️ Kể cả đặt trong `_cssCustom` của tabs-nested root nhắm vào `.tab-pane` — vẫn SAI.**
Kết quả khi vi phạm: tất cả tab-pane hiển thị đồng thời.

### 4. Active state CSS và tab-menu layout đặt trên `tabs-nested` root

```css
/* Trong _cssCustom của tabs-nested root — tập trung toàn bộ tab styling ở đây */
#brxe-rootId .tab-menu { display: flex; flex-direction: row; flex-wrap: nowrap; }
#brxe-rootId .tab-title { padding: 8px 16px; cursor: pointer; }
#brxe-rootId .tab-title.brx-open { background: #242424; }

/* Dùng selector từ parent pane để target inner wrapper khi active */
#brxe-paneId.brx-open #brxe-innerWrp { display: grid; }
```

### 5. `flex-wrap: nowrap` bắt buộc cho tab-menu

Tab menu phải có `flex-wrap: nowrap` để tránh wrap thành nhiều dòng.
Mobile: thêm `overflow-x: auto` + `scrollbar-width: none` để scroll ngang.

### 6. Bricks auto-inject block wrapper bên trong `tab-pane` — PHẢI verify sau push

Khi push JSON, Bricks có thể tự thêm 1 block wrapper trung gian (ID ngẫu nhiên) giữa `tab-pane` và inner-wrap.

**Hệ quả:** Block này không có `_width: 100%` → inner-wrap bị lệch trái dù đã set `_alignItems: center`.

**Quy trình bắt buộc sau push:**
```
1. mcp_bricks-mcp_content(action: "get", view: "detail") → kiểm tra parent của inner-wrap
2. Nếu có block trung gian auto-inject → bulk_update với _width:100%, _direction:column, _alignItems:center
3. Dùng actual IDs (không phải IDs ta đặt ban đầu) cho mọi update tiếp theo
```

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
├── block (.tab-menu)              — flex row, nowrap
│   ├── div (.tab-title)           — KHÔNG set text trực tiếp ở đây
│   │   └── text-basic (label)     ← ✅ Text phải là text-basic con của div
│   ├── div (.tab-title)
│   │   └── text-basic (label)
│   └── div (.tab-title)
│       └── text-basic (label)
└── block (.tab-content)          — KHÔNG style display ở đây
    ├── block (.tab-pane)         — Bricks JS control: ĐỂ TRỐNG settings (chỉ có class)
    │   └── block (inner-wrap)    — Layout thực sự ở đây: display, grid, padding...
    ├── block (.tab-pane)
    │   └── block (inner-wrap)
    └── block (.tab-pane)
        └── block (inner-wrap)
```

> **Quy tắc:** Số `.tab-title` PHẢI bằng số `.tab-pane` (Bricks match theo index).
> Classes set qua `_hidden._cssClasses`.

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
      "openTab": "0",
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
    "children": ["tabl01"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" }
    }
  },
  {
    "id": "tabl01",
    "name": "text-basic",
    "parent": "tabt01",
    "children": [],
    "settings": {
      "tag": "span",
      "text": "Tab 1"
    }
  },
  {
    "id": "tabt02",
    "name": "div",
    "parent": "tabmenu",
    "children": ["tabl02"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" }
    }
  },
  {
    "id": "tabl02",
    "name": "text-basic",
    "parent": "tabt02",
    "children": [],
    "settings": {
      "tag": "span",
      "text": "Tab 2"
    }
  },
  {
    "id": "tabt03",
    "name": "div",
    "parent": "tabmenu",
    "children": ["tabl03"],
    "settings": {
      "_hidden": { "_cssClasses": "tab-title" }
    }
  },
  {
    "id": "tabl03",
    "name": "text-basic",
    "parent": "tabt03",
    "children": [],
    "settings": {
      "tag": "span",
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
      "_cssCustom": "#brxe-tabw01 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 20px; }",
      "_cssCustom:mobile_portrait": "#brxe-tabw01 { grid-template-columns: repeat(2, 1fr); gap: 8px; }"
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
