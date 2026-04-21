# Changelog: Bricks Template Workflow Optimizations

**Ngày:** 2026-04-21
**Tác giả:** Antigravity AI
**Dựa trên:** Kinh nghiệm thực tế build Blog Author Profile (6 sections, ~130 elements)

---

## 🔴 Vấn đề phát hiện khi thực thi

| # | Vấn đề | Tần suất | Impact |
|---|--------|---------|--------|
| 1 | Parent Flatten sau `update_content` | 100% các section | HIGH |
| 2 | `_position: "relative"` không hoạt động trên block | Mỗi section có absolute positioning | HIGH |
| 3 | Figma MCP `unknown_tool` error | Session mới ~ 30% | MEDIUM |
| 4 | Không phân biệt `summary` vs `detail` khi verify | Gây verify thừa | MEDIUM |
| 5 | Không có công thức tính `object-position` từ Figma crop | Mỗi khi có cropped image | MEDIUM |
| 6 | Section lớn (>30 elements) không có Move Map sẵn | Section 5, 6 | MEDIUM |
| 7 | Bớt số lượng card/box so với Figma | Section 5 (cert cards) | HIGH |
| 8 | Tự ý dùng dynamic tag khi Figma dùng static text | Sporadic | HIGH |
| 9 | Slider/Tab dùng block thông thường thay vì nestable | Section 3 | HIGH |
| 10 | Section CSS gradient dùng `set_page_css` thay vì `_cssCustom` | Section 4 | MEDIUM |

---

## ✅ Các cải thiện đã implement

### 1 — RULE 3: Static-First Content
**File:** `rule-template-bricks.md`
**Nội dung:**
- Quy tắc cứng: KHÔNG đổi text sang dynamic tag khi Figma dùng static
- Bắt buộc đếm chính xác số card/box lặp → build đủ số đó
- Dynamic data chỉ khi user yêu cầu rõ ràng hoặc plan đánh dấu `[DYNAMIC]`
- Bảng ví dụ đúng/sai cụ thể

**Giải quyết vấn đề:** #7, #8

---

### 2 — RULE 4: Kỹ thuật Build Nâng Cao (3 sub-rules)
**File:** `rule-template-bricks.md`

**4A — Image Positioning:**
- Bắt buộc check Figma trước khi build image widget
- Bảng câu hỏi: absolute? kích thước cố định? crop? parent relative?
- Gotcha: `_position: "relative"` không hoạt động → phải dùng `_cssCustom`

**4B — Slider & Tabs → Nestable:**
- Bảng map: Slider → `slider-nestable`, Tabs → `tabs-nestable`, Accordion → `accordion-nestable`
- Cấm dùng `block` giả slider/tab

**4C — Section CSS → `_cssCustom` của widget:**
- Gradient/bg/shadow → ghi vào `_cssCustom` của chính widget đó
- `set_page_css` chỉ cho global CSS

**Giải quyết vấn đề:** #2, #9, #10

---

### 3 — RULE 5: Bricks Known Invalid Settings
**File:** `rule-template-bricks.md`

**5A — Invalid Settings Table:**
| Setting | Trạng thái | Thay thế |
|---------|-----------|---------|
| `_position: "relative"` | ❌ Bỏ qua | `_cssCustom` |
| `_position: "absolute"` | ❌ Bỏ qua | `_cssCustom` |
| `_height` + absolute | ⚠️ Xung đột | Gộp vào `_cssCustom` |
| `_overflow: "hidden"` + `_cssCustom` | ⚠️ Xung đột | Gộp vào `_cssCustom` |

**5B — Object-position Formula:**
```
Figma: left: -X%, top: -Y%, width: W%, height: H%
→ object-position-x = X / (W - 100) * 100 %
→ object-position-y = Y / (H - 100) * 100 %
```

**5C — Figma MCP Fallback:**
- Khi `unknown_tool`: đọc plan file → dùng URLs trong plan → ghi chú "audit dựa 100% plan file"
- Không được gọi browser agent thay thế

**Giải quyết vấn đề:** #2, #3, #5

---

### 4 — Bổ sung Pre-build Checklist trong Flow 2 (Bước 3.A)
**File:** `bricks-create-template.md`

5 điểm kiểm tra bắt buộc trước khi viết JSON cho mỗi section:
1. Đếm chính xác số card/box lặp
2. Slider/tab → nestable widget
3. Image nào cần `position: absolute` → parent cần `_cssCustom: position:relative`
4. Section có gradient/bg/shadow → ghi CSS vào `_cssCustom`
5. Text content → copy y chang từ Figma, không dùng dynamic tag

**Giải quyết vấn đề:** #7, #8, #9, #10 (phòng ngừa từ sớm)

---

### 5 — Cải thiện Bước 3.D: Pre-compute Move List
**File:** `bricks-create-template.md`

**Thay đổi từ:** Move từng element một mà không có kế hoạch
**Thành:** Quy trình 3 bước chuẩn:

1. **D1** — `get(view: "summary")` → lấy IDs thực tế
2. **D2** — Lập bảng move list đầy đủ (parent → child)
3. **D3** — Execute tất cả moves tuần tự
4. **Verify** → check chỉ 1 element ở `depth:0`

**Thêm:**
- Phân biệt rõ `summary` (check tree) vs `detail` (check settings)
- `bulk_update` với `null` để xóa stale settings

**Giải quyết vấn đề:** #1, #4

---

### 6 — Thêm Section 8 & 9 vào Plan Template (Flow 1)
**File:** `figma-create-plan-template.md`

**Section 8 — Move Map:**
- Template sẵn để điền Move Map khi tạo plan
- Flow 2 đọc Move Map này thay vì tự tính lại sau flatten
- Định dạng rõ ràng: Level → element → parent → position

**Section 9 — Bricks Gotchas:**
- Bảng liệt kê các settings không hoạt động đặc thù của thiết kế đó
- Flow 2 và Flow 3 đọc để biết trước, tránh lỗi

**Giải quyết vấn đề:** #1 (giảm 80% thời gian restore tree), #6

---

## 📁 Files đã thay đổi

| File | Thay đổi | Lines thêm |
|------|---------|-----------|
| `.agents/rules/rule-template-bricks.md` | +RULE 3, +RULE 4, +RULE 5 | +80 lines |
| `.agents/workflows/bricks-create-template.md` | +Pre-build checklist, +Cải thiện Bước 3.D | +40 lines |
| `.agents/workflows/figma-create-plan-template.md` | +Section 8 (Move Map), +Section 9 (Gotchas) | +45 lines |

---

## 📊 Tác động kỳ vọng

| Metric | Trước | Sau |
|--------|-------|-----|
| API calls để restore tree 1 section | 15-25 calls | 8-12 calls (pre-compute) |
| Lỗi static → dynamic content | Sporadic | Ngăn chặn từ checklist |
| Lỗi `_position` không hoạt động | Phát hiện ở Audit | Ngăn chặn từ Rule 5 |
| Slider/Tab sai widget | Build lại từ đầu | Ngăn chặn từ Rule 4B |
| Lỗi image crop position | Audit manual | Công thức tự động (Rule 5B) |

---

## 🔮 Các tối ưu tiếp theo (chưa implement)

- [ ] **Batch move API:** Nếu Bricks MCP hỗ trợ `bulk_move` → giảm N calls xuống 1
- [ ] **Template naming convention:** Enforce format `[YYYY] [PageName] - SectionName`
- [ ] **Section >30 elements:** Chiến lược break nhỏ JSON để dễ debug
- [ ] **Audit linter cho Invalid Settings:** Tự động scan `_position` trong JSON và flag
