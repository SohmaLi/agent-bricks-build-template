# CSS Property Lookup (Reference for Bricks Keys)

Dùng để tra cứu nhanh khi viết settings hoặc `_cssCustom`. 

## 1. Native Keys phổ biến

| CSS Property            | Native Key                           | Giá trị ví dụ                   |
| ----------------------- | ------------------------------------ | ------------------------------- |
| `width`                 | `_width`                             | `"100%"`, `"480px"`             |
| `height`                | `_height`                            | `"400px"`, `"100vh"`            |
| `min/max-width`         | `_widthMin`, `_widthMax`             | `"320px"`, `"1200px"`           |
| `padding`               | `_padding`                           | `{"top": "20px", ...}`          |
| `margin`                | `_margin`                            | `{"top": "20px", ...}`          |
| `display`               | `_display`                           | `"flex"`, `"grid"`, `"block"`   |
| `flex-direction`        | `_direction`                         | `"row"`, `"column"`             |
| `align-items`           | `_alignItems`                        | `"center"`, `"flex-start"`      |
| `justify-content`       | `_justifyContent`                    | `"space-between"`, `"center"`   |
| `gap (row/col)`         | `_rowGap`, `_columnGap`              | `"24px"`                        |
| `flex-grow/shrink`      | `_flexGrow`, `_flexShrink`           | `"1"`, `"0"`                    |
| `position`              | `_position`                          | `"relative"`, `"absolute"`      |
| `z-index`               | `_zIndex`                            | `1`, `10`, `-1`                 |
| `overflow`              | `_overflow`                          | `"hidden"`, `"auto"`            |
| `object-fit`            | `_objectFit`                         | `"cover"`, `"contain"`          |
| `border`                | `_border`                            | `{width, style, color, radius}` |
| `background-color`      | `_background`                        | `{"color": {"hex": "#fff"}}`    |

## 2. `_cssCustom` Patterns

| Context      | Pattern                                              |
| ------------ | ---------------------------------------------------- |
| Gradient bg  | `"#brxe-[id]{ background: linear-gradient(...) }"`    |
| Inset shadow | `"#brxe-[id]{ box-shadow: inset 0 0 24px ... }"`     |
| :hover       | `"#brxe-[id]:hover{ transform: scale(1.05) }"`       |
| ::before     | `"#brxe-[id]::before{ content: ''; ... }"`           |
| Mask block   | `"#brxe-[id]{ mask-image: url(...); ... }"`          |
| clip-path    | `"#brxe-[id]{ clip-path: polygon(...) }"`            |

## 3. Object-position Formula (Figma → CSS)

```
Figma: left: -X%, top: -Y%, width: W%, height: H%
→ object-position-x = X / (W - 100) * 100 %
→ object-position-y = Y / (H - 100) * 100 %
```
