# Component: Pre-build Checklist

> **Dùng khi:** Trước khi build JSON trong `/bricks-create-template` Sub-bước A.
> Đọc file này + section file tương ứng trước khi viết bất kỳ element nào.
> **Tham khảo patterns:** `.agents/components/common-patterns.md`

---

## Checklist (đọc từ section file)

| # | Kiểm tra | Hành động |
|---|---------|----------|
| 1 | Số item lặp | Build đúng số — không bớt |
| 2 | Slider / Tab? | Verify `→ Status:` plan file **trước** → `slider-nested` / `tabs-nested` |
| 3 | Image absolute? | Parent: `_position: "relative"` |
| 4 | Gradient / shadow? | Lấy **exact CSS từ Figma DevMode** — KHÔNG tự đoán |
| 5 | Slider images? | `_height` cố định + `object-fit: cover` — KHÔNG dùng `_aspectRatio` |
| 6 | Text content? | Copy y chang từ section file |
| 7 | Gotchas? | Áp dụng giải pháp trong section file |
| 8 | Element có `_width`+`_height` cố định trong flex row? | `_flexShrink: "0"` |
| 9 | Badge / text-over-SVG? | Container: `position:absolute` + `w/h`. SVG: `absolute top:0 left:0 100%×100%`. Text: `relative z-index:1` |
| **10** | **Layout engine root?** | `section → container → block` — **KHÔNG** dùng `block` thẳng dưới `section`. Xem PATTERN 6 |
| **11** | **Background block?** | Dùng `pos:absolute, top:0, left:0, w:100%, h:100%` — KHÔNG copy fixed px từ Figma. Xem PATTERN 1 |
| **12** | **Mobile gap trace?** | Trace: element nào là flex-parent khi layout đổi column? Gap set đúng đó. Xem PATTERN 5 |
| **13** | **Mobile centering?** | `left:50% + transform:translateX(-50%)` — KHÔNG dùng `translateX(negative%)`. Xem PATTERN 2 |
| **14** | **Mobile padding riêng?** | Check Figma mobile per-element — card/container có padding riêng khác desktop không? |
| **15** | **Right col self-stretch?** | Nếu flex-row dùng `align-items:flex-end`, right col cần `_alignSelf:"stretch"`. Xem PATTERN 7 |

---

## ⚠️ Bricks Framework Gotchas (BẮT BUỘC đọc trước build)

### G1 — Text Color: PHẢI nằm trong _typography.color
- ❌ SAI:  "_color": {"hex": "#fff"} → không render trong UI
- ✅ ĐÚNG: "_typography": {"color": {"hex": "#fff"}, "font-family": "Inter", ...}
- Áp dụng cho: text-basic, heading, button

### G2 — Bricks inject flex-wrap: wrap cho .brxe-block tại max-width 767px
Bricks framework CSS: @media (max-width:767px) { .brxe-block { flex-wrap: wrap; } }
→ Phá vỡ mọi flex-row block trên mobile (icon tách dòng khỏi text).
FIX BẮT BUỘC với mọi block có _direction: row cần giữ hàng trên mobile:
"_cssCustom": "#brxe-[id] { flex-wrap: nowrap; }"
Áp dụng với: feature item rows, guarantee row, badge rows, icon+text rows.

### G3 — Ẩn element trên mobile dùng native key
"_display:mobile_portrait": "none" — hoạt động trên mọi widget kể cả code widget

### G4 — CSS loading = "External files" → BẮT BUỘC Ctrl+S sau push
```
Bricks Performance → CSS loading method = "External files" (user đang dùng setting này)
→ _cssCustom KHÔNG render sau API push cho đến khi Ctrl+S trong Bricks editor
→ Inline styles (default): render ngay — không cần Ctrl+S
```
**Elements cần Ctrl+S:** mọi element có `_cssCustom` (gradient text, mask-image, ::before/::after, keyframes)
**Quy trình:** Push xong → Mở template trong Bricks editor → Ctrl+S → Đóng (KHÔNG click element trước khi Save)

### G5 — `_textAlign` standalone KHÔNG hoạt động cho text widgets
```json
// ❌ SAI — _textAlign không map sang CSS text-align
{ "_textAlign": "center" }

// ✅ ĐÚNG — phải nằm trong _typography
{ "_typography": { "text-align": "center", "font-size": "18px", "color": {"hex": "#fff"} } }
```
`_textAlign` là flexbox key (align children trong flex), không phải `text-align`.
Áp dụng cho: `heading`, `text-basic`, `text`, `button` — **MỌI text widget**.

---

## 📋 Figma Verification Bắt Buộc (trước khi viết JSON)

- Icon/image size? → Figma DevMode inspect → W×H — KHÔNG assume từ breakpoint khác
- gap/spacing? → Figma Layout panel → đọc từng breakpoint riêng biệt
- align-items? → Copy exact từ Figma CSS — KHÔNG tự đổi vì nghĩ đẹp hơn
- Values mobile? → Mở mobile Figma node riêng, đọc từng value (pt/pb/gap/font-size)
- Element có ở mobile? → So sánh desktop vs mobile node — absent → _display:mobile_portrait: none

RULE CỨNG: Value không confirm từ Figma → DỪNG → gọi mcp_figma_get_design_context trước khi viết.


---

## CSS Inline Validation (mỗi element)

```
□ Có native key? → Dùng native (xem rule-build-techniques.md RULE 5)
□ Không có native? → _cssCustom: "#brxe-[element-id]{ ... }"
□ Target <img> tag? → "#brxe-[element-id] img{ ... }"
□ Mask trên block? → "#brxe-[element-id]{ mask-image: ... }" — KHÔNG cần target img
□ %root% via API: dùng #brxe-[id] cho chắc. Sau Ctrl+S → Bricks tự convert về %root%.
□ _cssCustom responsive? → Dùng _cssCustom:mobile_portrait (KHÔNG @media thủ công)
□ Background block? → Dùng PATTERN 1 (100%/100%) — KHÔNG copy Figma fixed px
□ SVG mask? → Xem PATTERN 4 — mask trên block wrapper, image không cần CSS
```

---

## ID Validation (trước khi push)

```
□ Mỗi id.length === 6
□ /^[a-z0-9]{6}$/.test(id) === true
□ Không có 2 elements cùng ID
□ parent/children khớp 2 chiều
□ Root "parent": 0 (integer, KHÔNG phải "0" string)
□ Direct child của section là "container", không phải "block"  ← RULE 10B BẮT BUỘC
   ✅ "name": "container"  |  ❌ "name": "block" (ngay cả khi comment ghi "Container inner")
```


---

## Mobile Trace (khi section có responsive)

```
Trước khi set responsive keys, vẽ mental model:
□ Desktop layout: [vẽ flex direction]
□ Mobile layout:  [vẽ flex direction sau khi đổi]
□ Mỗi gap: nằm đúng flex-parent? (coi chừng absolute element không chiếm space)
□ Centering oversized elements: dùng PATTERN 2
□ Height chain: khi column stretch, child có height:100% hoạt động không?
□ Overflow: child oversized có bị clip bởi parent overflow:hidden không?
```

---

## Sau khi Push — Verify & Capture IDs

```
mcp_bricks-mcp_content(action: "get", post_id: [id], view: "summary")
→ Section ở depth:0 → ✅ Done
→ Direct child của section là "container" type → ✅
→ Bricks có thể tự generate IDs mới → so sánh với IDs ta đặt
□ IDs khớp → OK
□ IDs khác (Bricks tự gen) → ghi lại actual IDs, dùng cho bulk_update
```
