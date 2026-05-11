# Reference: Build Errors & Pre-Push Checklist

> Danh sách lỗi đã xác nhận qua thực tế khi build Bricks sections từ Figma.
> **Đọc file này trước mỗi lần push JSON.**

**Index nhanh:** [LỖI 1](#lỗi-1) [LỖI 2](#lỗi-2) [LỖI 3](#lỗi-3) [LỖI 4](#lỗi-4) [LỖI 5](#lỗi-5) [LỖI 6](#lỗi-6) [LỖI 7](#lỗi-7) [LỖI 8](#lỗi-8) [LỖI 9](#lỗi-9) [LỖI 10](#lỗi-10) [LỖI 11](#lỗi-11) [LỖI 12](#lỗi-12) [LỖI 13](#lỗi-13)

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
□ [LỖI 4]  Tất cả ID đúng 6 ký tự [a-z0-9], không trùng?
□ [LỖI 4]  Root element: "parent": 0 (integer, KHÔNG phải "0" string)?
□          Hierarchy: section → container → block → [...] đúng?
□          children ↔ parent khớp 2 chiều?

TYPOGRAPHY
□ [LỖI 9]  font-size, font-weight, line-height đều là plain string ("24px")?
□ [LỖI 9]  KHÔNG có {value: 24, unit: "px"} format?
□ [G1]     color nằm trong _typography.color.hex (không phải _color)?

LAYOUT
□ [LỖI 2]  Đã chạy Mapping Table cho TỪNG element?
□ [LỖI 2]  gap → _rowGap / _columnGap đã map?
□ [LỖI 2]  justify, items, self-stretch đã map?
□ [LỖI 6]  Container: _width: "100%" + _widthMax?

CSS CUSTOM
□ [RULE4C] _cssCustom dùng #brxe-[id], KHÔNG có %root%?
□ [LỖI 10] Absolute element + text overlay: SVG z-index:0, text z-index:2?
□ [G4]     Có _cssCustom → nhắc user Ctrl+S sau push?

BACKGROUND
□ [LỖI 1]  KHÔNG có block riêng làm background image?
□ [LỖI 1]  _background.image: có external:true + size + position?

FLEX
□ [LỖI 3]  KHÔNG có _flexGrow:"1" + _flexShrink:"0" cùng lúc?
□ [LỖI 3]  flex:1 → dùng _cssCustom: "#brxe-[id]{flex:1;min-width:0}"?
□ [G2]     flex-row cần giữ hàng mobile → _cssCustom flex-wrap:nowrap?

RESPONSIVE — MOBILE CHECKLIST
□           Đã đọc Mobile Diff Table từ plan?
□           [DIRECTION-CHANGE]: _direction:mobile_portrait đã set?
□           [ABSENT-MOBILE]: _display:mobile_portrait:"none" cho element ẩn?
□           [SIZE-CHANGE]: width/height:mobile_portrait đã set?
□           section padding mobile riêng biệt, không duplicate với desktop?

ELEMENT COUNT & TOKEN
□ [LỖI 7]  Count Figma elements → Bricks elements PHẢI khớp?
□ [LỖI 11] Section COMPLEX >60 elements: response text đã compact?
□ [LỖI 13] Items lặp nội dung ≥3: đã flag [PLACEHOLDER] và chờ user confirm?
□ [LỖI 12] Status section detail vs table: không mâu thuẫn (hoặc đã confirm)?
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

---

## 🚫 LỖI 9 — Typography font-size dùng sai format → render 15px thay vì 24px

```
❌ SAI:  "_typography": {"font-size": {"value": 24, "unit": "px"}}
❌ SAI:  "_typography": {"fontSize": "24px"}
✅ ĐÚNG: "_typography": {"font-size": "24px"}   ← plain string, không phải object
```

**Lý do:** Bricks API chỉ parse plain string. Object format → Bricks nhận giá trị `[object Object]` → render fallback 15px.

**Áp dụng cho tất cả typography props:**
```json
"_typography": {
  "font-size": "24px",
  "font-weight": "600",
  "line-height": "36px",
  "color": {"hex": "#282829"},
  "font-family": "Inter"
}
```

> ⚠️ `color` là ngoại lệ duy nhất được dùng object `{"hex": "..."}`. Tất cả props còn lại → plain string.

---

## 🚫 LỖI 10 — Absolute-positioned element với text overlay thiếu z-index

```
❌ SAI:  SVG (position:absolute) che lên text → text không visible
✅ ĐÚNG: SVG z-index: 0, text z-index: 2 (hoặc position:relative không cần z-index nếu sau trong DOM)
```

**Khi nào trigger:** Badge/overlay có SVG background + text label trên cùng 1 container absoluted.

**Fix bắt buộc cho pattern này:**
```json
// SVG/background shape:
{ "_zIndex": "0" }

// Text label phía trên:
{ "_zIndex": "2", "_position": "relative" }
```

> ✔️ Phải set NGAY khi build — không chờ review phát hiện.

---

## 🚫 LỖI 11 — Response JSON vượt token limit 16384 với section COMPLEX

```
❌ SAI:  Viết analysis dài + push JSON >80 elements trong 1 response → exceed token limit
✅ ĐÚNG: Estimate element count TRƯỚC → nếu >60 elements → rút ngắn analysis text
```

**Quy tắc cho section COMPLEX (>60 elements):**
1. Estimate element count = widgets × depth trước khi viết bất kỳ analysis nào
2. Nếu > 60 elements → analysis text ≤ 300 chars, chỉ giữ KEY DATA
3. Nếu > 100 elements → cân nhắc đơn giản hóa card structure, merge intermediate blocks

**Estimate nhanh:**
```
Element count ≈ (elements/card) × (số card) + structure + pagination
Ví dụ: 7 × 12 cards + 10 structure + 3 pagination = 97 → COMPLEX → compact mode
```

---

## 🚫 LỖI 12 — Status mâu thuẫn giữa section detail và plan table

```
❌ XỬ LÝ SAI: Thấy table ghi "ok" → build luôn, bỏ qua section detail ghi "pending"
✅ ĐÚNG: Kiểm tra CẢ HAI → nếu mâu thuẫn → flag + hỏi user → DỪNG
```

**Check trong BƯỚC 0:**
```
Section detail: status: pending
Table: status: ok
→ Mâu thuẫn! ⚠️ Báo user: "Section SN có status không thống nhất (detail=pending, table=ok). 
   Bạn muốn tiếp tục build không?"
→ AI DỪNG chờ confirm
```

---

## 🚫 LỖI 13 — Không flag PLACEHOLDER khi tất cả items có cùng nội dung

```
❌ SAI:  Build 12 cards với cùng title/excerpt mà không hỏi user
✅ ĐÚNG: Phát hiện ≥3 items lặp nội dung → flag [PLACEHOLDER] → hỏi user trước
```

**Template flag cứng:**
```
⚠️ [PLACEHOLDER] Tôi phát hiện [field] giống nhau cho [N] items:
   "[content]"

Bạn muốn:
[A] Giữ nguyên static (build đúng như Figma)
[B] Dùng Dynamic Data (Query Loop) → DỪNG để plan lại

→ AI DỪNG chờ user chọn A hoặc B
```

---

