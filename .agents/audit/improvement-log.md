# Improvement Log — Bricks Builder AI Workflow

> Ghi lại các điểm cần cải thiện sau mỗi session.
> Mỗi entry gồm: **lỗi → nguyên nhân gốc → fix đã áp dụng → trạng thái**.

---

## 2026-05-07 — Session: VPS Landing 2026, S1 (Báo Chí & Truyền Hình)

### [IMP-01] Không search template cũ trước khi build
- **Lỗi:** Đi thẳng vào build `slider-nested` mà không search template cũ → nhầm Bricks dùng Swiper, thực tế là **Splide.js**
- **Nguyên nhân gốc:** Bước research (RULE 12) có trong docs nhưng bị bỏ qua trong thực thi
- **Hậu quả:** CSS class sai toàn bộ (`.swiper-*` → `.splide__*`), arrow không hoạt động, 3 vòng fix thủ công
- **Fix đã áp dụng:**
  - Thêm **Bước 1.4** vào `bricks-create-template.md` — search bắt buộc trước khi build widget phức tạp
  - Ví dụ cụ thể được ghi trong workflow để làm nhắc nhở rõ ràng
- **Status:** ✅ Workflow đã cập nhật

---

### [IMP-02] Nhầm Splide.js → Swiper (Bricks slider dùng Splide)
- **Lỗi:** Viết CSS với class `.bricks-button-prev`, `.swiper-pagination`, `.bricks-slider-wrapper`
- **Nguyên nhân gốc:** Không đọc widget docs kỹ, tự suy luận theo thói quen (Swiper phổ biến hơn)
- **Hậu quả:** Pagination không tắt được, arrow không style được, CSS `!important` cũng không hiệu quả
- **Fix đã áp dụng:**
  - Ghi **PATTERN 18** vào `common-patterns.md` với class đúng: `.splide__slide`, `.splide__arrows`, `button.splide__arrow`
  - Ghi rõ note ⚠️ "KHÔNG dùng `.swiper-*`" trong PATTERN 18 checklist
- **Status:** ✅ Pattern đã documented

---

### [IMP-03] Dùng block giả làm prev/next navigation
- **Lỗi:** Build `s1nav1` block + 2 image blocks để giả làm arrow buttons
- **Nguyên nhân gốc:** Không biết Bricks slider đã có native arrow system với đầy đủ styling options
- **Hậu quả:** Arrow không kết nối JS slider, không có prev/next functionality, user phải xóa tay
- **Fix đã áp dụng:**
  - PATTERN 18: default arrow JSON settings (48px circle, border, icon, disabledOpacity) đã được document
  - RULE 4B đã có: "Slider → dùng `slider-nested` native nav, KHÔNG dùng block giả"
- **Status:** ✅ Pattern + Rule đã có, cần tuân thủ nghiêm hơn

---

### [IMP-04] Không set explicit width cho 2-col layout
- **Lỗi:** Dùng `_flexGrow:"1"` + `_flexBasis:"0%"` thay vì `_width:"50%"` explicit
- **Nguyên nhân gốc:** Nghĩ flex-grow sẽ tự chia đều, nhưng Bricks panel hiển thị `Width: 10%` do key mapping không đúng
- **Hậu quả:** Cột render sai size, logo grid bị squeeze vào 1 cột
- **Fix đã áp dụng:**
  - Ghi vào template S1: `_width:"50%"`, `_flexGrow:"0"`, `_flexShrink:"0"`, `_flexBasis:"auto"`
  - PATTERN 13 đã có warning về flex shorthand
- **To-Do:** Cần thêm rule rõ: **"Layout 2+ col → LUÔN set explicit `_width` (%, px, calc) — KHÔNG dùng flex-grow thay thế"**
- **Status:** ⚠️ Chưa có rule cứng — cần thêm

---

### [IMP-05] Dùng flex-wrap thay vì CSS grid cho logo grid nhiều items
- **Lỗi:** Set `_display:"flex"`, `_flexWrap:"wrap"` cho grid 15 logos → logos stack 1 cột
- **Nguyên nhân gốc:** Flex-wrap phụ thuộc vào available width của parent → dễ bị squish nếu parent không đủ rộng
- **Hậu quả:** 15 logos display 1 cột thay vì 5×3 grid
- **Fix đã áp dụng:**
  - Dùng `_display:"grid"`, `_gridTemplateColumns:"repeat(5,1fr)"` → stable, không phụ thuộc parent width
  - User comment trong screenshot: "nên dùng grid cho trường hợp nhiều item bên trong"
- **To-Do:** Ghi rule: **"Grid > 6 items → ưu tiên `display:grid` thay `flex-wrap`"**
- **Status:** ⚠️ Chưa có rule — cần thêm vào rule-build-techniques.md

---

## To-Do Rules (đã implement)

| ID | Nội dung | File đã sửa | Status |
|----|---------|-------------|--------|
| TODO-1 | Layout 2+ col → LUÔN set explicit `_width` | `rule-build-techniques.md` RULE 4E | ✅ Done |
| TODO-2 | Grid > 6 items → ưu tiên `display:grid` thay `flex-wrap` | `rule-build-techniques.md` RULE 4F | ✅ Done |
| TODO-3 | Slider native arrow → LUÔN dùng trước khi nghĩ đến block giả | `common-patterns.md` PATTERN 18 + `bricks-create-template.md` | ✅ Done |

---

## Template cho entry mới

```markdown
### [IMP-XX] Tên lỗi ngắn gọn
- **Lỗi:** Mô tả cụ thể đã làm gì sai
- **Nguyên nhân gốc:** Tại sao xảy ra (thiếu bước nào, hiểu sai gì)
- **Hậu quả:** Impact thực tế
- **Fix đã áp dụng:** File nào đã sửa, pattern nào đã thêm
- **Status:** ✅ Done / ⚠️ Partial / 🔴 Pending
```
