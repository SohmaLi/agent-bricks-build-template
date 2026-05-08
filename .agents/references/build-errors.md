# Reference: Build Errors & Pre-Push Checklist

> Danh sách lỗi đã xác nhận qua thực tế khi build Bricks sections từ Figma.
> **Đọc file này trước mỗi lần push JSON.**

---

## 🚫 LỖI 1 — Dùng block riêng làm background image

```
❌ SAI:  container > block[position:absolute, image] + block[content]
✅ ĐÚNG: container[_background.image + color] > block[content]
```

**Khi nào trigger:** Figma có background image trên frame/container.

**Fix:** Dùng `_background.image` native trực tiếp trên container/section:

```json
"_background": {
  "color": {"hex": "#F2F3F5"},
  "image": {
    "url": "http://localhost:3845/assets/abc.png",
    "external": true,
    "filename": "abc.png"
  }
}
```

> Không tạo thêm `block` wrapper với `_position: "absolute"` + `image` widget bên trong.

---

## 🚫 LỖI 2 — Bỏ qua layout properties khi đọc Figma

```
❌ SAI: Chỉ extract color, font-size, text → bỏ qua gap, justify, align
✅ ĐÚNG: Map TẤT CẢ Tailwind classes → Bricks keys
```

**Xem bảng mapping đầy đủ:** `.agents/references/tailwind-bricks-map.md`

Các class hay bị bỏ qua nhất:

| Tailwind class | Bricks key | Value |
|----------------|------------|-------|
| `gap-[Xpx]` | `_rowGap` (flex-col) / `_columnGap` (flex-row) | `"Xpx"` |
| `justify-center` | `_justifyContent` | `"center"` |
| `items-center` | `_alignItems` | `"center"` |
| `self-stretch` | `_alignSelf` | `"stretch"` |
| `p-[Xpx]` | `_padding` | `{top/right/bottom/left: "Xpx"}` |
| `opacity-50` | `_opacity` | `0.5` |
| `z-[1]` | `_zIndex` | `"1"` |

---

## 🚫 LỖI 3 — Dùng `_flexGrow: "1"` + `_flexShrink: "0"` cùng lúc

```
❌ SAI:  { "_flexGrow": "1", "_flexShrink": "0" }
✅ ĐÚNG: { "_cssCustom": "#brxe-[id] { flex: 1; }" }
```

Nếu chỉ cần giữ kích thước cố định: dùng `_width: "Xpx"` — không set flexGrow/Shrink.

---

## 🚫 LỖI 4 — Element ID sai format

```
❌ SAI:  "s1outerwrap", "s1titlg"   ← dài hơn 6 ký tự
✅ ĐÚNG: "s1ow01", "s1tg01"        ← đúng 6 ký tự [a-z0-9]
```

Validate: `id.length === 6` + `/^[a-z0-9]+$/.test(id)` + không trùng trong template.

---

## 🚫 LỖI 5 — Gán responsive settings nhầm element (duplicate padding)

```
❌ SAI:  Section  → _padding:mobile_portrait: 12px
         Container → _padding:mobile_portrait: 12px   ← 2 lớp chồng nhau!

✅ ĐÚNG: Xác định đúng element CÓ p-[12px] trong Figma code output → chỉ ghi 1 lần
```

**Fix:** Khi parse mobile Figma, trace về `data-node-id` của element có `p-[Xpx]`.

---

## 🚫 LỖI 6 — Container dùng `_width` px cứng thay vì `_widthMax`

```
❌ SAI:  container → _width: "1180px"
✅ ĐÚNG: container → _width: "100%", _widthMax: "1400px"
         inner block → _width: "1140px"  (content wrapper)
```

Container Bricks tự apply max-width khi dùng `_widthMax`. Width pixel cứng trên container gốc phá vỡ responsive.

---

## 🚫 LỖI 7 — RULE 4D bị dùng sai làm auto-pass trong Review

```
❌ SAI:  Figma = 5 imgs (RULE 4D) → Bricks = 1 img → đánh ✅ "RULE 4D accepted"
✅ ĐÚNG: RULE 4D là BUILD strategy — KHÔNG phải giấy phép bỏ qua element count trong review
```

**RULE 4D chỉ áp dụng khi:**
- Frame chứa vector/illustration phức tạp không thể tách thành individual Bricks widgets
- User đã xác nhận rõ ràng chấp nhận placeholder

**Photo collage ở S2 là sai dùng RULE 4D vì:**
- 5 ảnh real photos (không phải vector) → có thể build absolute positioned trong Bricks
- Emoji assets cũng có URL trực tiếp từ localhost:3845 → dùng `image` widget được

**Quy tắc cứng cho review:**
```
1. So sánh element count Figma vs Bricks: PHẢI khớp (không áp dụng "RULE 4D" để bypass)
2. Nếu count không khớp → tự động FAIL → rebuild
3. RULE 4D placeholder chỉ pass khi: user screenshot xác nhận composite trông đúng
4. Sau retry: KHÔNG tự pass khi chưa có user screenshot confirm
```

---

## 🚫 LỖI 8 — Tự pass sau retry khi chưa có user screenshot

```
❌ SAI:  AI tự rebuild → verify JSON tree → tự chấm ✅ 100%
✅ ĐÚNG: Sau retry → báo user → CHỜ screenshot user gửi vào → mới chấm điểm lại
```

**Tại sao JSON tree verify không đủ:**
- `_cssCustom` → cần Ctrl+S mới render (có thể invisible)
- `_transform: rotate` → chỉ kiểm tra được qua screenshot
- `_display: none` → không thể verify CSS render qua API
- `inset box-shadow` → chỉ visual check được

**Sau mỗi retry bắt buộc:**
```
→ Nhắc user: "Vui lòng Ctrl+S trong Bricks Editor rồi chụp screenshot section [N] gửi vào chat"
→ AI DỪNG chờ screenshot — KHÔNG tự chấm pass
```

---

## ✅ PRE-PUSH CHECKLIST

Tick hết trước khi gọi `update_content`. **Không push nếu còn ô trống.**

```
STRUCTURE
□ [LỖI 4] Tất cả ID đúng 6 ký tự [a-z0-9], không trùng?
□ [LỖI 4] Root element: "parent": 0 (integer, KHÔNG phải "0" string)?
□ Hierarchy: section → container → block → [...] đúng?
□ children ↔ parent khớp 2 chiều?

LAYOUT
□ [LỖI 2] Đã chạy Mapping Table cho TỪNG element (xem tailwind-bricks-map.md)?
□ [LỖI 2] gap → _rowGap / _columnGap đã map?
□ [LỖI 2] justify-center → _justifyContent đã có?
□ [LỖI 2] items-center → _alignItems đã có?
□ [LỖI 2] self-stretch → _alignSelf đã có?
□ [LỖI 6] Container: _width: "100%" + _widthMax (không dùng width px cứng)?

BACKGROUND
□ [LỖI 1] KHÔNG có block riêng làm background image?
□ [LỖI 1] Background image → _background.image với external: true?

RESPONSIVE
□ [LỖI 5] Mobile padding: chỉ trên 1 element duy nhất, không duplicate?
□ _cssCustom breakpoint: @media (max-width: 478px) đúng?

FLEX
□ [LỖI 3] KHÔNG có "_flexGrow":"1" + "_flexShrink":"0" cùng lúc?
□ Flex chiếm phần còn lại: _cssCustom: "#brxe-[id] { flex: 1; }"?

ELEMENT COUNT
□ [LỖI 7] Đếm elements trong Figma → số lượng widget trong Bricks phải KHỚP?
□ [LỖI 7] Nếu dùng RULE 4D placeholder → user đã confirm OK chưa?
□ [LỖI 7] Photo collage / layered images → KHÔNG dùng RULE 4D, build đủ từng widget?
```

---

## ⚠️ FRAMEWORK GOTCHAS (Bricks-specific behavior)

> Đọc mục này trước khi build. Đây là behavior đặc thù của Bricks không giống CSS thông thường.

---

### G1 — Text Color: PHẢI nằm trong `_typography.color`

```
❌ SAI:  {"_color": {"hex": "#fff"}}          → không render trong UI
✅ ĐÚNG: {"_typography": {"color": {"hex": "#fff"}, "font-family": "Inter"}}
```

Áp dụng cho: `text-basic`, `heading`, `button` — **MỌI text widget**.

---

### G2 — Bricks inject `flex-wrap: wrap` tại 767px ⚠️ QUAN TRỌNG NHẤT

```css
/* Bricks framework CSS mặc định — không thể tắt: */
@media (max-width: 767px) { .brxe-block { flex-wrap: wrap; } }
```

→ **Phá vỡ MỌI flex-row block trên mobile** (icon tách dòng khỏi text, badge vỡ layout, collage ảnh xếp chồng).

**FIX BẮT BUỘC** với mọi block có `_direction: "row"` cần giữ hàng trên mobile:

```json
"_cssCustom": "#brxe-[id] { flex-wrap: nowrap; }"
```

Áp dụng với: feature item rows, guarantee row, badge rows, icon+text rows.

---

### G3 — Ẩn element trên mobile: dùng native key

```json
"_display:mobile_portrait": "none"
```

Hoạt động trên mọi widget. Không cần `_cssCustom`.

---

### G4 — CSS loading "External files" → BẮT BUỘC Ctrl+S sau push

```
Bricks Performance → CSS loading = "External files" (setting phổ biến)
→ _cssCustom KHÔNG render ngay sau API push
→ Cần: Mở template trong Bricks Editor → Ctrl+S → Đóng
```

**Elements cần Ctrl+S:** mọi element có `_cssCustom` (gradient, mask-image, ::before/::after, `flex: 1`).

---

### G5 — `_textAlign` standalone KHÔNG hoạt động cho text widgets

```json
// ❌ SAI — không map sang CSS text-align
{ "_textAlign": "center" }

// ✅ ĐÚNG — phải nằm trong _typography
{ "_typography": { "text-align": "center", "font-size": "18px" } }
```

`_textAlign` = flexbox alignment, không phải `text-align`. Áp dụng cho: `heading`, `text-basic`, `text`, `button`.

---

### G6 — `slider-nested`: 4 gotchas quan trọng

**G6a — `autoHeight: true` → slider height bị cut nếu images chưa load**

```
❌ SAI:  autoHeight: true  → Splide tính chiều cao trước images load → cut content
✅ ĐÚNG: Bỏ autoHeight, dùng _aspectRatio trên image để định chiều cao tự nhiên
```

**G6b — Arrows position: KHÔNG dùng flex trên root slider**

```
❌ SAI:  _cssCustom: "#brxe-[id] { display:flex; flex-direction:column; }"
         → phá Splide internal layout → images bị cut
✅ ĐÚNG: padding-bottom + absolute arrows:
  "#brxe-[id] { padding-bottom: 68px; position: relative; }
   #brxe-[id] .splide__arrows { position: absolute; bottom: 0; left: 50%;
     transform: translateX(-50%); display: flex; gap: 32px; }
   #brxe-[id] .splide__arrow { position: relative !important; top: auto !important; ... }"
```

**G6c — Mobile: PHẢI set `perPage:mobile_portrait: 1`**

```json
"perPage": 3,
"perPage:mobile_portrait": 1,
"gap": "24px",
"gap:mobile_portrait": "12px"
```

**G6d — Editor hiển thị `[object Object]` cho `_typography` {value,unit} — KHÔNG phải lỗi**

```
Editor display quirk khi push qua API.
Frontend PHP parse object → CSS string đúng. Không cần workaround.
```


