# Component: Pre-build Checklist

> **Dùng khi:** Trước khi build JSON trong `/bricks-create-template` Sub-bước A.
> Đọc file này + section file tương ứng trước khi viết bất kỳ element nào.

---

## Checklist (đọc từ section file)

| # | Kiểm tra | Hành động |
|---|---------|----------|
| 1 | Số item lặp | Build đúng số — không bớt |
| 2 | Slider / Tab? | Verify `→ Status:` plan file **trước** → `slider-nestable` / `tabs-nestable` |
| 3 | Image absolute? | Parent: `_position: "relative"` |
| 4 | Gradient / shadow? | Lấy **exact CSS từ Figma DevMode** — KHÔNG tự đoán |
| 5 | Slider images? | `_height` cố định + `object-fit: cover` — KHÔNG dùng `_aspectRatio` |
| 6 | Text content? | Copy y chang từ section file |
| 7 | Gotchas? | Áp dụng giải pháp trong section file |
| 8 | Element có `_width`+`_height` cố định trong flex row? | `_flexShrink: "0"` |
| 9 | Badge / text-over-SVG? | Container: `position:absolute` + `w/h`. SVG: `absolute top:0 left:0 100%×100%`. Text: `relative z-index:1` |

---

## CSS Inline Validation (mỗi element)

```
□ Có native key? → Dùng native (xem rule-build-techniques.md RULE 5)
□ Không có native? → _cssCustom: "#brxe-[element-id]{ ... }"
□ Target <img>? → "#brxe-[element-id] img{ ... }"
□ %root% → KHÔNG dùng qua MCP API (chỉ Bricks editor UI)
```

---

## ID Validation (trước khi push)

```
□ Mỗi id.length === 6
□ /^[a-z0-9]{6}$/.test(id) === true
□ Không có 2 elements cùng ID
□ parent/children khớp 2 chiều
□ Root "parent": 0 (integer, KHÔNG phải "0" string)
```

---

## Sau khi Push — Verify & Capture IDs

```
mcp_bricks-mcp_content(action: "get", post_id: [id], view: "summary")
→ Section ở depth:0 → ✅ Done
→ Bricks có thể tự generate IDs mới → so sánh với IDs ta đặt
□ IDs khớp → OK
□ IDs khác (Bricks tự gen) → ghi lại actual IDs, dùng cho bulk_update
```
