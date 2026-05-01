# Component: Figma Section Analysis

> **Dùng khi:** Phân tích từng section trong `/figma-create-plan-template` Phase A4.
> Đọc file này tại Bước A4 để đánh giá độ phức tạp và phát hiện Slider/Tabs.

---

## A. Đánh giá độ phức tạp

| Tiêu chí | SIMPLE | MEDIUM | COMPLEX |
|----------|--------|--------|---------|
| Layout | 1 col | 2-3 cols, flex | Grid không đều, overlap, absolute |
| Animation | Không | Hover | Scroll, JS |
| Custom CSS | Không | `_cssCustom` | `html` element |
| Images | Standard | Background | Mask, clip-path |

---

## B. Slider / Tab / Accordion Detection (bắt buộc)

**Bước 1 — Gọi `get_metadata` trên node section:**
```
mcp_figma_get_metadata(nodeId: "[section_node_id]")
→ Đọc tên FRAME và COMPONENT trong XML output
```

**Bước 2 — Đọc tên layers:**

| Tên layer chứa | Widget xác nhận |
|---------------|----------------|
| `Slider`, `Carousel`, `Swiper`, `Gallery`, `Slide N` | `slider-nestable` |
| `Tab`, `Tabs`, `TabPanel`, `Tab N`, `Tab Item` | `tabs-nestable` |
| `Accordion`, `FAQ`, `Collapse`, `Expand` | `accordion-nestable` |

**Bước 3 — Nếu tên layer KHÔNG rõ ràng:**
> ❌ Không được đoán. Không được dùng safe default.

→ Đưa vào câu hỏi trong **Bước A5**, bắt buộc user xác nhận:
```
❓ Section [Tên]: Có [N] item lặp + nav buttons. Đây là:
   A) Slider (dùng slider-nestable với JS)
   B) Static layout (dùng block thông thường)
```

---

## C. CSS Property Validation

```
→ Có native key? (xem rule-build-techniques.md RULE 5) → Dùng native
→ Không có? → _cssCustom: "#brxe-[id]{ ... }"
→ Cần target <img>? → _cssCustom: "#brxe-[id] img{ ... }"
```

**Capture exact CSS từ Figma cho gradient/shadow:**
```
mcp_figma_get_design_context → Figma DevMode > Code > CSS
→ Copy CHÍNH XÁC vào Settings JSON — không tự đoán giá trị
```

---

## D. Settings JSON checklist mỗi element

```
□ native key? → dùng native
□ _cssCustom? → format #brxe-[id]{ ... } (KHÔNG %root% qua MCP)
□ flex row + fixed size? → _flexShrink: "0"
□ badge/overlay? → container absolute + SVG absolute top:0 left:0 + text z-index:1
□ slider images? → fixed _height thay vì _aspectRatio
```
