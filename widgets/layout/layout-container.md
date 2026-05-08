# Widget: `container`

> **Source:** `bricks/includes/elements/container.php`
> **Category:** layout | **Nestable:** ✅ | **Tag mặc định:** `div`
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

`container`, `block`, `div` đều extend `Element_Container` — **hoàn toàn cùng settings keys**.

Điểm khác biệt thực tế:

| Widget | Behavior đặc biệt | Dùng khi |
|--------|------------------|---------|
| `container` | Bricks tự áp dụng `max-width` + `margin: auto` từ site settings → inner wrapper tự động | **Direct child của `section`** — layout chính |
| `block` | Không có auto max-width | Level 2+ layout wrapper |
| `div` | Giống block, label "Div" trong editor | Element nhỏ: badge, chip, icon wrapper |

> **Quy tắc project:** `container` chỉ là con trực tiếp của `section`. `block`/`div` cho mọi level sâu hơn.

---

## CONTENT Controls

### 1. HTML Tag & Link

| Key | Type | Options / Mô tả |
|-----|------|-----------------|
| `tag` | select | `div`, `section`, `a`, `article`, `nav`, `ol`, `ul`, `li`, `aside`, `address`, `figure`, `custom` |
| `customTag` | text | Bất kỳ HTML tag (chỉ khi `tag = "custom"`) |
| `link` | link | URL + target (chỉ khi `tag = "a"`) |

### 2. Display

| Key | CSS | Options |
|-----|-----|---------|
| `_display` | `display` | `flex` (default), `grid`, `block`, `inline-block`, `inline`, `none` |

### 3. Flex Controls (khi `_display = "flex"`)

| Key | CSS Property | Options / Ví dụ |
|-----|-------------|----------------|
| `_direction` | `flex-direction` | `row`, `column`, `row-reverse`, `column-reverse` |
| `_flexWrap` | `flex-wrap` | `nowrap`, `wrap`, `wrap-reverse` |
| `_justifyContent` | `justify-content` | `flex-start`, `flex-end`, `center`, `space-between`, `space-around` |
| `_alignItems` | `align-items` | `flex-start`, `flex-end`, `center`, `stretch`, `baseline` |
| `_columnGap` | `column-gap` | `"24px"`, `"1rem"` |
| `_rowGap` | `row-gap` | `"16px"` |
| `_flexGrow` | `flex-grow` | `0`, `1` |
| `_flexShrink` | `flex-shrink` | `0`, `1` |
| `_flexBasis` | `flex-basis` | `"auto"`, `"50%"`, `"300px"` |

> ⚠️ **G2 Risk:** Bricks inject `flex-wrap: wrap` cho `.brxe-block` tại max-width 767px.
> Fix cho flex-row block cần giữ hàng: `"_flexWrap": "nowrap"` (native key, không cần `_cssCustom`).

### 4. Grid Controls (khi `_display = "grid"`)

| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridGap` | `grid-gap` | `"24px"` |
| `_gridTemplateColumns` | `grid-template-columns` | `"repeat(3, 1fr)"`, `"1fr 2fr 1fr"` |
| `_gridTemplateRows` | `grid-template-rows` | `"auto 1fr auto"` |
| `_gridAutoColumns` | `grid-auto-columns` | `"minmax(200px, 1fr)"` |
| `_gridAutoRows` | `grid-auto-rows` | `"200px"` |
| `_gridAutoFlow` | `grid-auto-flow` | `row`, `column`, `dense` |
| `_justifyItemsGrid` | `justify-items` | `start`, `end`, `center`, `stretch` |
| `_alignItemsGrid` | `align-items` | `start`, `end`, `center`, `stretch` |
| `_justifyContentGrid` | `justify-content` | standard values |
| `_alignContentGrid` | `align-content` | standard values |

### 5. Grid Item (khi parent dùng `display: grid`)

| Key | CSS Property | Ví dụ |
|-----|-------------|-------|
| `_gridItemColumnSpan` | `grid-column` | `"1 / 3"`, `"span 2"` |
| `_gridItemRowSpan` | `grid-row` | `"1 / 3"`, `"span 2"` |

### 6. Inner Container (chỉ layout elements)

Áp dụng margin/padding lên **direct children** `.brxe-container`, `.brxe-block`, `.brxe-div`:

| Key | CSS selector target | Ví dụ |
|-----|--------------------|----- |
| `_innerContainerMargin` | `> .brxe-container, > .brxe-block, > .brxe-div` | `{"left": "auto", "right": "auto"}` |
| `_innerContainerPadding` | `> .brxe-container, > .brxe-block, > .brxe-div` | `{"left": "24px", "right": "24px"}` |

### 7. Shape Dividers

| Key | Type | Mô tả |
|-----|------|-------|
| `_shapeDividers` | array | Mảng shape objects. Xem [../shared-styles.md](../shared-styles.md#6-shape-dividers-group) |

> Cần `_position: "relative"` khi dùng shape dividers.

### 8. Loop Builder

| Key | Type | Mô tả |
|-----|------|-------|
| `hasLoop` | boolean | Bật Query Loop — có sẵn trên section, container, block, div |

---

## Ví dụ JSON

### Container inner — flex column với max-width

```json
{
  "id": "ctn001",
  "name": "container",
  "parent": "sec001",
  "children": ["blk001", "blk002"],
  "settings": {
    "_display": "flex",
    "_direction": "column",
    "_rowGap": "48px",
    "_widthMax": "1180px",
    "_margin": {"left": "auto", "right": "auto"},
    "_padding": {"top": "80px", "bottom": "80px", "left": "24px", "right": "24px"}
  }
}
```

### Container 2-col flex (responsive về 1 col trên mobile)

```json
{
  "id": "ctn002",
  "name": "container",
  "parent": "sec002",
  "children": ["blkLeft", "blkRight"],
  "settings": {
    "_display": "flex",
    "_direction": "row",
    "_alignItems": "center",
    "_columnGap": "64px",
    "_direction:tablet_portrait": "column",
    "_rowGap:tablet_portrait": "32px"
  }
}
```

### Container grid 3 cột

```json
{
  "id": "ctn003",
  "name": "container",
  "parent": "sec003",
  "children": ["blk1", "blk2", "blk3"],
  "settings": {
    "_display": "grid",
    "_gridTemplateColumns": "repeat(3, 1fr)",
    "_gridGap": "24px",
    "_gridTemplateColumns:tablet_portrait": "repeat(2, 1fr)",
    "_gridTemplateColumns:mobile_portrait": "1fr"
  }
}
```

### ✅ Container với Background Image (opacity overlay)

> **ĐÚNG:** Dùng `_background.image` native trên chính container — KHÔNG tạo block riêng làm background.

```json
{
  "id": "ctn004",
  "name": "container",
  "parent": "sec004",
  "children": ["blkContent"],
  "settings": {
    "_background": {
      "color": {"hex": "#F2F3F5"},
      "image": {
        "url": "http://localhost:3845/assets/abc123.png",
        "external": true,
        "filename": "abc123.png",
        "size": "cover",
        "position": "center center",
        "repeat": "no-repeat"
      }
    },
    "_border": {"radius": {"top": "24px", "right": "24px", "bottom": "24px", "left": "24px"}},
    "_overflow": "hidden",
    "_position": "relative",
    "_width": "100%",
    "_widthMax": "1400px"
  }
}
```

> ❌ **TRÁNH**: Tạo `block` với `_position: "absolute"` + `_opacity` để làm background image overlay.
> Cách đó thêm 2 elements thừa (`block` wrapper + `image` widget) và gây phức tạp layout không cần thiết.
> Thay bằng `_cssCustom` nếu cần opacity: `#brxe-[id]::before { opacity: 0.5; background-image: url(...) }`

