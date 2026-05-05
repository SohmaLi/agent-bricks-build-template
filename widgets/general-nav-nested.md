# Widget: `nav-nested`

> **Source:** `bricks/includes/elements/nav-nested.php`
> **Category:** general | **Nestable:** true | **Scripts:** bricksNavNested

Nav nestable — navigation bar với dropdown support và mobile hamburger toggle.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `logo` | image | Logo image |
| `logoWidth` | text | Logo width |
| `logoHeight` | text | Logo height |
| `mobileBreakpoint` | text | Breakpoint mobile (px) |
| `mobileMenuBuilder` | boolean | Dùng Bricks builder cho mobile menu |

---

## Nestable Structure (Bắt buộc — Phức tạp nhất)

```
nav-nested [root]
├── block (.brx-nav-nested-items) [tag="ul"]   ← FIXED: cloneable:false, deletable:false
│   ├── text-link "Home" (Nav link)
│   ├── text-link "About" (Nav link)
│   ├── dropdown "Dropdown"                    ← widget type: dropdown
│   │   └── div (.brx-dropdown-content) [tag="ul"]  ← FIXED: cloneable:false, deletable:false
│   │       ├── text-link "Dropdown link 1"
│   │       └── text-link "Dropdown link 2"
│   └── toggle (.brx-toggle-div)              ← Close button: Mobile
└── toggle [label="Toggle (Open: Mobile)"]    ← Hamburger: Open mobile menu
```

---

## ⚠️ CRITICAL RULES

### 1. Hai element FIXED — KHÔNG được xóa hoặc clone

| Element | ID/class | `cloneable`/`deletable` |
|---------|-----------|------------------------|
| Nav items block | `.brx-nav-nested-items` | `cloneable: false`, `deletable: false` |
| Dropdown content | `.brx-dropdown-content` | `cloneable: false`, `deletable: false` |

> Khi push qua API, bắt buộc phải include `"cloneable": false, "deletable": false` trên 2 elements này.

### 2. Tag của Nav items block = `ul`

```json
"settings": {
  "tag": "ul",
  "_hidden": { "_cssClasses": "brx-nav-nested-items" }
}
```

### 3. Nav links = `text-link` widget (KHÔNG dùng `text-basic` hay `button`)

### 4. Dropdown element type = `dropdown`

```json
{
  "id": "...",
  "name": "dropdown",
  "settings": { "text": "Menu Label" }
}
```

### 5. Dropdown content div = `div` với class `brx-dropdown-content`, `tag: "ul"`

### 6. Toggle (Close) bên TRONG nav items block, Toggle (Open) ở ROOT level

---

## Classes Reference

| Element | Class/Config |
|---------|-------------|
| Nav items wrapper | `brx-nav-nested-items` + `tag: "ul"` |
| Dropdown content | `brx-dropdown-content` + `tag: "ul"` |
| Mobile close toggle | `brx-toggle-div` |

---

## Ví dụ JSON — Full Element Tree (dùng với `update_content`)

```json
[
  {
    "id": "navroot",
    "name": "nav-nested",
    "parent": "0",
    "children": ["navitms", "navtgl2"],
    "settings": {}
  },
  {
    "id": "navitms",
    "name": "block",
    "parent": "navroot",
    "children": ["navlnk1", "navlnk2", "navdrop", "navtgl1"],
    "settings": {
      "tag": "ul",
      "_hidden": { "_cssClasses": "brx-nav-nested-items" }
    },
    "label": "Nav items",
    "cloneable": false,
    "deletable": false
  },
  {
    "id": "navlnk1",
    "name": "text-link",
    "parent": "navitms",
    "children": [],
    "settings": {
      "text": "Home",
      "link": { "type": "external", "url": "/" }
    },
    "label": "Nav link"
  },
  {
    "id": "navlnk2",
    "name": "text-link",
    "parent": "navitms",
    "children": [],
    "settings": {
      "text": "About",
      "link": { "type": "external", "url": "/about" }
    },
    "label": "Nav link"
  },
  {
    "id": "navdrop",
    "name": "dropdown",
    "parent": "navitms",
    "children": ["navdrcn"],
    "settings": {
      "text": "Services"
    },
    "label": "Dropdown"
  },
  {
    "id": "navdrcn",
    "name": "div",
    "parent": "navdrop",
    "children": ["navdrl1", "navdrl2"],
    "settings": {
      "_hidden": { "_cssClasses": "brx-dropdown-content" },
      "tag": "ul"
    },
    "label": "Content",
    "cloneable": false,
    "deletable": false
  },
  {
    "id": "navdrl1",
    "name": "text-link",
    "parent": "navdrcn",
    "children": [],
    "settings": {
      "text": "Service 1",
      "link": { "type": "external", "url": "/service-1" }
    },
    "label": "Nav link"
  },
  {
    "id": "navdrl2",
    "name": "text-link",
    "parent": "navdrcn",
    "children": [],
    "settings": {
      "text": "Service 2",
      "link": { "type": "external", "url": "/service-2" }
    },
    "label": "Nav link"
  },
  {
    "id": "navtgl1",
    "name": "toggle",
    "parent": "navitms",
    "children": [],
    "settings": {
      "_hidden": { "_cssClasses": "brx-toggle-div" }
    },
    "label": "Toggle (Close: Mobile)"
  },
  {
    "id": "navtgl2",
    "name": "toggle",
    "parent": "navroot",
    "children": [],
    "settings": {},
    "label": "Toggle (Open: Mobile)"
  }
]
```
