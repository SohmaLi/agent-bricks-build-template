# Reference: Tailwind → Bricks Key Mapping

> Dùng cho Bước 2B của `/bricks-render-section`.
> Với **mỗi element** trong Figma output, đối chiếu từng Tailwind class với Bricks key tương ứng.

---

## Bảng mapping đầy đủ

| Tailwind class | CSS property | Bricks key | Value example |
|----------------|-------------|------------|---------------|
| `flex` | `display: flex` | `_display` | `"flex"` |
| `grid` | `display: grid` | `_display` | `"grid"` |
| `hidden` | `display: none` | `_display` | `"none"` |
| `flex-col` | `flex-direction: column` | `_direction` | `"column"` |
| `flex-row` | `flex-direction: row` | `_direction` | `"row"` |
| `flex-wrap` | `flex-wrap: wrap` | `_flexWrap` | `"wrap"` |
| `flex-nowrap` | `flex-wrap: nowrap` | `_flexWrap` | `"nowrap"` |
| `gap-[Xpx]` (flex-col) | `row-gap` | `_rowGap` | `"Xpx"` |
| `gap-[Xpx]` (flex-row) | `column-gap` | `_columnGap` | `"Xpx"` |
| `gap-x-[Xpx]` | `column-gap` | `_columnGap` | `"Xpx"` |
| `gap-y-[Xpx]` | `row-gap` | `_rowGap` | `"Xpx"` |
| `items-start` | `align-items: flex-start` | `_alignItems` | `"flex-start"` |
| `items-center` | `align-items: center` | `_alignItems` | `"center"` |
| `items-end` | `align-items: flex-end` | `_alignItems` | `"flex-end"` |
| `items-stretch` | `align-items: stretch` | `_alignItems` | `"stretch"` |
| `justify-start` | `justify-content: flex-start` | `_justifyContent` | `"flex-start"` |
| `justify-center` | `justify-content: center` | `_justifyContent` | `"center"` |
| `justify-end` | `justify-content: flex-end` | `_justifyContent` | `"flex-end"` |
| `justify-between` | `justify-content: space-between` | `_justifyContent` | `"space-between"` |
| `self-auto` | `align-self: auto` | `_alignSelf` | `"auto"` |
| `self-start` | `align-self: flex-start` | `_alignSelf` | `"flex-start"` |
| `self-center` | `align-self: center` | `_alignSelf` | `"center"` |
| `self-end` | `align-self: flex-end` | `_alignSelf` | `"flex-end"` |
| `self-stretch` | `align-self: stretch` | `_alignSelf` | `"stretch"` |
| `shrink-0` | `flex-shrink: 0` | `_flexShrink` | `"0"` ⚠️ không combine với `_flexGrow: "1"` |
| `grow` / `flex-[1_0_0]` | dùng css | `_cssCustom` | `"flex: 1"` |
| `p-[Xpx]` | `padding: Xpx` | `_padding` | `{top:"Xpx",right:"Xpx",bottom:"Xpx",left:"Xpx"}` |
| `px-[Xpx]` | `padding-left/right` | `_padding` | `{left:"Xpx", right:"Xpx"}` |
| `py-[Xpx]` | `padding-top/bottom` | `_padding` | `{top:"Xpx", bottom:"Xpx"}` |
| `pt-[Xpx]` | `padding-top` | `_padding` | `{top:"Xpx"}` |
| `pb-[Xpx]` | `padding-bottom` | `_padding` | `{bottom:"Xpx"}` |
| `m-auto` | `margin: auto` | `_margin` | `{left:"auto",right:"auto"}` |
| `mx-auto` | `margin: 0 auto` | `_margin` | `{left:"auto",right:"auto"}` |
| `w-[Xpx]` | `width: Xpx` | `_width` | `"Xpx"` |
| `w-full` / `size-full` | `width: 100%` | `_width` | `"100%"` |
| `max-w-[Xpx]` | `max-width` | `_widthMax` | `"Xpx"` |
| `h-[Xpx]` | `height` | `_height` | `"Xpx"` |
| `h-full` | `height: 100%` | `_height` | `"100%"` |
| `min-w-[Xpx]` / `min-w-px` | `min-width` | `_minWidth` | `"Xpx"` / `"1px"` |
| `overflow-hidden` / `overflow-clip` | `overflow: hidden` | `_overflow` | `"hidden"` |
| `relative` | `position: relative` | `_position` | `"relative"` |
| `absolute` | `position: absolute` | `_position` | `"absolute"` |
| `top-[Xpx]` | `top` | `_top` | `"Xpx"` |
| `left-[Xpx]` | `left` | `_left` | `"Xpx"` |
| `inset-0` | `top:0 right:0 bottom:0 left:0` | `_cssCustom` | `"inset: 0"` |
| `-translate-x-1/2` | `translateX(-50%)` | `_transform` | `"translateX(-50%)"` |
| `-translate-y-1/2` | `translateY(-50%)` | `_transform` | `"translateX(-50%) translateY(-50%)"` |
| `rounded-[Xpx]` | `border-radius` | `_border.radius` | `{top:"Xpx",right:"Xpx",bottom:"Xpx",left:"Xpx"}` |
| `bg-[#HEX]` | `background-color` | `_background.color.hex` | `"#HEX"` |
| `bg-image/url` | `background-image` | `_background.image` | `{url:"...",external:true}` ⚠️ KHÔNG tạo block riêng |
| `opacity-[X]` | `opacity` | `_opacity` | `0.X` (số, không phải string) |
| `z-[N]` | `z-index` | `_zIndex` | `"N"` |
| `pointer-events-none` | `pointer-events: none` | `_pointerEvents` | `"none"` |
| `object-cover` | `object-fit: cover` | `_objectFit` | `"cover"` |
| `object-contain` | `object-fit: contain` | `_objectFit` | `"contain"` |

---

## Template Mapping Table (dùng trong Bước 2B)

Copy và điền vào khi build mỗi element:

```
TAILWIND → BRICKS MAPPING — [Element Name / data-node-id]
==========================================================
Tailwind class          | Bricks key          | Value applied
------------------------|---------------------|---------------
[class từ figma output] | [key từ bảng trên]  | [giá trị chính xác]
...                     | ...                 | ...
```

> ⚠️ KHÔNG skip class nào dù trông "không quan trọng". `gap`, `justify`, `items` hay bị bỏ qua nhất.

---

## Các trường hợp đặc biệt

### `flex: 1` (chiếm phần còn lại)
```json
"_cssCustom": "#brxe-[id] { flex: 1; }"
```
KHÔNG dùng `_flexGrow: "1"` + `_flexShrink: "0"`.

### `mask-image`
```json
"_cssCustom": "#brxe-[id] { mask-image: url('...svg'); -webkit-mask-image: url('...svg'); mask-size: Xpx Ypx; mask-repeat: no-repeat; mask-position: Xpx Ypx; }"
```
Áp dụng trên **wrapper block**, không phải `image` widget.

### Mobile-only breakpoint trong `_cssCustom`
```json
"_cssCustom": "#brxe-[id] { ... } @media (max-width: 478px) { #brxe-[id] { ... } }"
```
Dùng khi cần override property không có native responsive key tương ứng.

### `grid-template-columns` responsive
```json
{
  "_display": "grid",
  "_gridTemplateColumns": "repeat(5, 1fr)",
  "_gridTemplateColumns:mobile_portrait": "repeat(3, 1fr)"
}
```
