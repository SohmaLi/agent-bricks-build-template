# Bricks MCP – Reference Settings Keys
> Trích từ templates thực tế trên site (461189, 463154)
> Dùng làm reference THAY THẾ cho `working_example` trong schema

---

## ⚠️ Quy tắc bắt buộc khi build

1. **KHÔNG dùng `html` element** cho layout – chỉ dùng native widgets
2. **KHÔNG dùng `_cssCustom`** – Dangerous Actions bị disable
3. **KHÔNG dùng `set_page_css`** – bị block bởi security
4. Với layout phức tạp (absolute, bg overlay): dùng native properties đã được xác nhận dưới đây
5. **`update_content` tạo ID mới** – không dùng ID tự đặt, chỉ dùng `move` sau khi tạo
6. **`image` widget LUÔN phải có `div` bọc bên ngoài** – xem mục "Image Wrapper Pattern" bên dưới
7. **`container` chỉ dùng 1 cấp** – xem quy tắc phân cấp bên dưới

---

## Phân cấp Widget (Bắc buộc nắm rõ)

Figma gọi tất cả là "Container" — nhưng trong Bricks, têng cấp có widget riêng:

```
Level 0  →  section          ← mỗi page section = 1 section widget
Level 1  →  container        ← CON TRỰC TIẼP của section (tối đa 2–3 nếu layout nẹ)
Level 2+ →  block | div      ← tất cả các wrapper lồng bên trong
```

**Quy tắc cụ thể:**

| Trường hợp | Widget dùng | Đặt con của |
|------------|------------|-------------|
| Root của page section | `section` | `0` (root) |
| Wrapper chính trong section (1 cái) | `container` | `section` |
| Row layout 2 cột, 3 cột trong section | `container` (mỗi row) | `section` |
| Cột trái / cột phải bên trong row | `block` | `container` |
| Nhóm nhỏ bên trong cột | `block` | `block` |
| Wrapper đơn giản (1 child, styling) | `div` | bất kỳ |
| Wrapper ảnh | `div` (cố định khoảng Figma) | `block` |

**Sai phổ biến cần tránh:**
```
❌ section → container → container → container (lồng nhiều container)
✅ section → container → block → block → div

❌ section có nhiều container và block lộn xộn
✅ section có 1 container chính (hoặc vài container nếu layout cần)
```

**Ví dụ đúng — Hero 2 cột (từ Figma layer tree):**
```
Section
└── Container            ← cấp 1: container chính (outer wrapper)
    ├── image [bg-abs]     ← background absolute, không cần div
    └── block [row]        ← cấp 2: dùng block (không dùng container nữa)
        ├── block [col-left] ← cấp 3: block
        │   ├── block [text-group]  ← block
        │   │   ├── text-basic
        │   │   └── heading
        │   ├── text-basic
        │   ├── div [cert-wrap]    ← div wrapper cho ảnh
        │   │   └── image [cert]
        │   └── button
        └── block [col-right]  ← block
            └── div [profile-wrap] ← div wrapper cho ảnh
                └── image [profile]
```
---

## Confirmed Settings Keys (từ templates thực tế)

### `section`
```json
{
  "_padding": {"top": "40px", "bottom": "40px", "left": "40px", "right": "40px"},
  "_margin": {"bottom": "48px"},
  "_background": {"color": {"hex": "#f2f3f5"}},
  "_gradient": {
    "angle": "90",
    "colors": [
      {"id": "xxx", "stop": "0", "color": {"hex": "#007cfc"}},
      {"id": "yyy", "stop": "100", "color": {"hex": "#2d86cc"}}
    ]
  },
  "_position": "relative",
  "_overflow": "hidden",
  "_heightMin": "350",
  "_justifyContent": "center",
  "_alignItems": "stretch"
}
```

### `container` — chỉ dùng ở Level 1

> `container` trong Bricks là layout wrapper full-width aware, tương ứng với `.container` CSS (giới hạn max-width + auto margin). Chỉ dùng làm **con trực tiếp của `section`**.

```json
{
  "_padding": {"top": "56px", "bottom": "56px"},
  "_direction": "row",
  "_alignItems": "center",
  "_columnGap": "24px",
  "_rowGap": "24px"
}
```

### `block` — dùng cho mọi cấp từ Level 2 trở xuống

> Thái thế của `container` bên trong. Dùng cho row, col, group, card...

```json
{
  "_display": "flex",
  "_direction": "row",
  "_direction": "column",
  "_alignItems": "center",
  "_alignItems": "stretch",
  "_justifyContent": "center",
  "_alignSelf": "stretch",
  "_columnGap": "24px",
  "_rowGap": "16px",
  "_flexWrap": "nowrap",
  "_padding": {"top": "20px", "bottom": "20px", "left": "20px", "right": "20px"},
  "_margin": {"bottom": "12"},
  "_width": "30%",
  "_height": "440px",
  "_background": {
    "color": {"hex": "#f2f3f5"},
    "image": {
      "id": 12345,
      "filename": "bg.png",
      "size": "full",
      "url": "https://..."
    },
    "position": "bottom center"
  },
  "_border": {
    "radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"},
    "width": {"top": "1", "right": "1", "bottom": "1", "left": "1"},
    "style": "solid",
    "color": {"hex": "#ffffff", "rgb": "rgba(255,255,255,0.2)"}
  },
  "_overflow": "hidden",
  "_position": "relative",
  "_flexShrink": "0",
  "_cssClasses": "custom-class-name"
}
```

### `heading`
```json
{
  "text": "Nội dung heading",
  "tag": "h1",
  "_typography": {
    "font-size": "44px",
    "font-weight": "700",
    "line-height": "56px",
    "font-family": "Inter",
    "color": {"hex": "#282829"},
    "text-transform": "uppercase",
    "text-align": "left"
  },
  "_margin": {"bottom": "12px"},
  "_alignSelf": "stretch"
}
```
> `tag` values: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"`, `"custom"` (khi dùng custom cần thêm `"customTag": "p"`)

### `text-basic`

> 📌 **HTML tag mặc định của `text-basic` là `div`** (không phải `p`). Nếu không set `tag`, Bricks sẽ render ra `<div>`.

| `tag` value | HTML output | Khi nào dùng |
|-------------|-------------|--------------|
| *(không set)* | `<div>` | Mặc định — paragraph thông thường |
| `"div"` | `<div>` | Tương đương mặc định, khai báo tường minh |
| `"p"` | `<p>` | Đoạn văn có semantic paragraph |
| `"span"` | `<span>` | Inline text |
| `"strong"` | `<strong>` | Bold có semantic |

```json
{
  "text": "<p>Nội dung text</p>",
  "tag": "div",
  "_typography": {
    "font-size": "18px",
    "font-weight": "400",
    "line-height": "30px",
    "font-family": "Inter",
    "color": {"hex": "#282829"}
  },
  "_padding": {"bottom": "20px"},
  "_alignSelf": "stretch"
}
```

> 💡 Lưu ý: dù `tag` là `div`, nội dung `text` vẫn nên bọc HTML tags bên trong (`<p>`, `<strong>`...) để đúng semantic. Ví dụ: `"text": "<p>Chuyên viên R&D</p>"`


### `image`

> ⚠️ **BẮT BUỘC: `image` widget LUÔN phải có 1 `div` bọc bên ngoài.** Không đặt `image` trực tiếp vào `block`/`container`.

> 📐 **Khi ảnh chưa upload:** Dùng `div` với kích thước cố định theo Figma làm placeholder — KHÔNG tạo `image` element bên trong. Khi có ảnh, chỉ cần thêm `image` vào trong `div` đó.

**Lý do:** Trong Bricks Builder, `image` element cần wrapper `div` để:
- Control sizing (`_width`, `_height`) chính xác
- Tránh layout collapse khi ảnh chưa load
- Cho phép `overflow: hidden` + `border-radius` hoạt động đúng
- Cho phép positioning (`relative`/`absolute`) hoạt động đúng

**3 trường hợp sử dụng:**

```json
// ❌ Sai — image trực tiếp trong block
{"id": "imgX", "name": "image", "parent": "blkLeft", "settings": {...}}

// ✅ Case 1: Ảnh CHƯA có → div placeholder với kích thước Figma
// Chỉ tạo div, KHÔNG tạo image bên trong. Bổ sung image sau.
{"id": "divImg", "name": "div", "parent": "blkLeft", "settings": {
  "_width": "520px",        // lấy chính xác từ Figma
  "_height": "520px",       // lấy chính xác từ Figma
  "_background": {"color": {"hex": "#e8e8e8"}},  // màu placeholder xám nhạt
  "_border": {"radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"}},
  "_overflow": "hidden",
  "_flexShrink": "0"
}}

// ✅ Case 2: Ảnh ĐÃ có → div wrapper + image bên trong
{"id": "divImg", "name": "div", "parent": "blkLeft", "settings": {
  "_width": "520px",        // kích thước Figma (giữ nguyên trên div)
  "_height": "520px",
  "_overflow": "hidden",
  "_flexShrink": "0"
}}
{"id": "imgX", "name": "image", "parent": "divImg", "settings": {
  "image": {"id": 468144, "filename": "photo.png", "size": "full", "url": "https://..."},
  "_width": "100%",         // image fill đầy div
  "_height": "100%",
  "_objectFit": "cover"
}}

// ✅ Case 3: Background absolute overlay (ngoại lệ — không cần div)
{"id": "imgBg", "name": "image", "parent": "blkWrap", "settings": {
  "image": {"id": 468145, "url": "https://..."},
  "_position": "absolute",
  "stretch": true,
  "_objectFit": "cover",
  "_zIndex": "0"
}}
```

> 💡 **Workflow:** Build template trước với div placeholder (kích thước Figma) → sau khi upload ảnh → dùng `content.add` hoặc `update_content` để thêm `image` element vào bên trong div placeholder.


**Settings của `image` widget:**
```json
{
  "image": {
    "id": 12345,
    "filename": "photo.png",
    "size": "full",
    "url": "https://..."
  },
  "_width": "100%",
  "_height": "100%",
  "_objectFit": "cover",
  "_objectFit": "scale-down",
  "_objectFit": "contain",
  "_border": {
    "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
  },
  "_alignSelf": "center",
  "caption": "none"
}
```
> Dynamic data: `"image": {"useDynamicData": "{author_avatar}", "size": "large", "url": "https://..."}`

**Ngoại lệ — `stretch: true` (background absolute):**
Khi dùng image làm background overlay (`_position: absolute`, `stretch: true`), KHÔNG cần div wrapper:
```json
{"id": "imgBg", "name": "image", "parent": "blkWrap", "settings": {
  "image": {"id": 12345, "url": "https://..."},
  "_position": "absolute",
  "stretch": true,
  "_objectFit": "cover",
  "_zIndex": "0"
}}
```

### `button`
```json
{
  "text": "Xem bài chia sẻ",
  "link": {"url": "#"},
  "_typography": {
    "font-size": "18px",
    "font-weight": "500",
    "color": {"hex": "#fcfcfc"}
  },
  "_background": {"color": {"hex": "#007cfc"}},
  "_border": {
    "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
  },
  "_padding": {"top": "12px", "bottom": "12px", "left": "32px", "right": "32px"}
}
```

### `div` (wrapper đơn giản, không có default layout)
```json
{
  "_display": "block",
  "_width": "100%"
}
```

### `image` dùng làm background absolute overlay
```json
{
  "name": "image",
  "settings": {
    "image": {"id": 12345, "url": "https://..."},
    "_position": "absolute",
    "stretch": true,
    "_objectFit": "cover"
  }
}
```
> Đây là cách đúng để làm background image absolute — dùng native `image` widget với `_position: "absolute"` và `stretch: true`

---

## Pattern: 2-col layout (Hero style)

> ✅ Áp dụng đúng phân cấp: `section → container → block → block/div`

```json
[
  {
    "id": "sec001", "name": "section", "parent": "0",
    "settings": {
      "_padding": {"top": "40px", "bottom": "40px", "left": "40px", "right": "40px"}
    }
  },
  {
    "id": "ctn001", "name": "container", "parent": "sec001",
    "settings": {
      "_background": {"color": {"hex": "#f2f3f5"}},
      "_border": {"radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"}},
      "_overflow": "hidden",
      "_position": "relative",
      "_padding": {"top": "0", "bottom": "0", "left": "0", "right": "0"}
    }
  },
  {
    "id": "img-bg", "name": "image", "parent": "ctn001",
    "settings": {
      "image": {"id": 12345, "url": "https://..."},
      "_position": "absolute",
      "stretch": true,
      "_objectFit": "cover",
      "_zIndex": "0"
    }
  },
  {
    "id": "blkRow", "name": "block", "parent": "ctn001",
    "settings": {
      "_direction": "row",
      "_alignItems": "flex-end",
      "_columnGap": "24px",
      "_zIndex": "1",
      "_width": "100%"
    }
  },
  {
    "id": "blkLeft", "name": "block", "parent": "blkRow",
    "settings": {
      "_direction": "column",
      "_rowGap": "24px",
      "_padding": {"top": "64px", "bottom": "64px"},
      "_flexShrink": "0",
      "_width": "684px"
    }
  },
  {
    "id": "blkRight", "name": "block", "parent": "blkRow",
    "settings": {
      "_alignSelf": "stretch",
      "_alignItems": "center",
      "_justifyContent": "center",
      "_overflow": "hidden",
      "_position": "relative"
    }
  },
  {
    "id": "divProfile", "name": "div", "parent": "blkRight",
    "settings": {
      "_width": "520px",
      "_height": "520px",
      "_overflow": "hidden",
      "_flexShrink": "0"
    }
  },
  {
    "id": "imgProfile", "name": "image", "parent": "divProfile",
    "settings": {
      "image": {"id": 12345, "url": "https://..."},
      "_width": "100%",
      "_height": "100%",
      "_objectFit": "cover"
    }
  }
]
```

## Pattern: Card grid (3 cols)

```json
{
  "name": "block",
  "settings": {
    "_direction": "row",
    "_columnGap": "24px",
    "_alignItems": "stretch"
  }
}
```
Mỗi card child:
```json
{
  "name": "block",
  "settings": {
    "_direction": "column",
    "_rowGap": "16px",
    "_padding": {"top": "20px", "right": "20px", "bottom": "20px", "left": "20px"},
    "_background": {"color": {"hex": "#ecf7ff"}},
    "_border": {
      "radius": {"top": "8px", "right": "8px", "bottom": "8px", "left": "8px"},
      "width": {"top": "2", "right": "2", "bottom": "2", "left": "2"},
      "style": "solid",
      "color": {"hex": "#007cfc", "rgb": "rgba(0,124,252,0.5)"}
    },
    "_overflow": "hidden"
  }
}
```

---

## Lưu ý quan trọng khi dùng `update_content`

1. **ID bị regenerate**: `update_content` luôn tạo ID mới từ Bricks. Sau khi update, phải `get` lại để lấy ID thực.
2. **Dùng `move` để fix parent**: Nếu element bị parent sai, dùng `content.move` với `target_parent_id`
3. **`children` array**: Khi truyền vào `update_content`, không cần set `children` — Bricks tự tính theo `parent` field
4. **`parent: "0"` vs `parent: 0`**: Section root dùng `parent: "0"` (string), không phải integer

---

## Thứ tự build đúng

```
1. Tạo template: template.create(type: "section", title: "...", status: "publish")
   → Lưu template_id
2. Build elements array với đúng parent relationships
3. update_content(post_id: template_id, elements: [...])
4. GET lại để xác nhận element IDs thực tế
5. Nếu cần fix parent: content.move(element_id, target_parent_id)
```

---

## Opacity cho image element

Bricks không có `_opacity` trực tiếp. Thay vào đó:
- Dùng `_background.color` với rgba: `{"hex": "#f2f3f5", "rgb": "rgba(242,243,245,0.5)"}`
- Hoặc dùng `_cssCustom` (nếu Dangerous Actions được bật)
- **Alternative an toàn**: Bọc thêm 1 `block` wrapper với semi-transparent background overlay thay vì image opacity

---

## Gradient background trên section/block

```json
"_gradient": {
  "angle": "180",
  "colors": [
    {"id": "aaa", "stop": "0", "color": {"hex": "#f2f3f5"}},
    {"id": "bbb", "stop": "100", "color": {"hex": "#ffffff", "rgb": "rgba(255,255,255,0)"}}
  ]
}
```
