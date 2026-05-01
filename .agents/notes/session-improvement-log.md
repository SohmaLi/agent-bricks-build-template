# Session Improvement Log — Blog Author Profile Build

> **Mục đích:** Tổng kết lỗi, điểm sai, thông tin thiếu trong session build S1–S6.
> **Sử dụng:** Cải thiện quy trình cho các page tiếp theo.

---

## 1. Lỗi về Workflow (Quy trình)

### 1A. Build song song nhiều section trước khi user review

|                |                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Lỗi**        | Sau khi user nói "ok tiếp tục", AI build S4 → S5 → S6 liên tiếp mà không dừng chờ review từng section               |
| **Root cause** | AI hiểu "tiếp tục" = "hoàn thành tất cả", trong khi workflow yêu cầu build 1 section → báo user → chờ review → tiếp |
| **Hậu quả**    | User phải review 3 sections cùng lúc; các lỗi giống nhau lặp lại 3 lần                                              |
| **Rule mới**   | Tuyệt đối không build section tiếp khi chưa có explicit "ok [tên section]" từ user                                  |

### 1B. Không cross-check Status trong plan trước khi build

|                |                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **Lỗi**        | S3 build thành static layout, trong khi plan đã ghi Status: slider                                     |
| **Root cause** | AI đọc template file (đã sai) thay vì verify lại Status field trong plan file                          |
| **Rule mới**   | Template file chỉ là bản nháp. Plan file `→ Status:` > template file. Luôn check plan trước khi build. |

---

## 2. Lỗi CSS / Layout

### 2A. Slider arrows: `transform: none !important` xóa cả directional rotate

|                |                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Lỗi**        | Cả 2 arrow đều hiện `>` — prev arrow không flip thành `<`                                                               |
| **Root cause** | `transform: none !important` xóa cả `rotate(180deg)` (hướng) của prev arrow                                             |
| **Fix**        | `.splide__arrow--prev { transform: rotate(180deg) !important }` / `.splide__arrow--next { transform: none !important }` |
| **Rule mới**   | Khi reset Splide arrow position, KHÔNG dùng `transform: none` chung — tách riêng prev/next                              |

### 2B. Slider arrows DOM order: arrows trước track → hiện ở TOP

|                |                                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| **Lỗi**        | Arrows xuất hiện TRÊN TOP của cards thay vì bên dưới sau khi set `position: relative` |
| **Root cause** | `.splide__arrows` nằm TRƯỚC `.splide__track` trong DOM                                |
| **Fix**        | Dùng CSS `order`: `.splide__track { order: 1 }` / `.splide__arrows { order: 2 }`      |
| **Rule mới**   | Splide arrows dưới cards → dùng `order`, không dùng absolute + bottom                 |

### 2C. Thiếu `flex-shrink: 0` trên fixed-size elements trong flex row

|                |                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Lỗi**        | Icon circle 100×100px bị squish thành 90×100 trong header flex row                            |
| **Root cause** | Không set `_flexShrink: "0"` → flex container co bóp element                                  |
| **Fix**        | Thêm `_flexShrink: "0"` cho icon circle block VÀ SVG image bên trong                          |
| **Rule mới**   | **Bất kỳ element có `_width`+`_height` cố định trong flex row → BẮT BUỘC `_flexShrink: "0"`** |

### 2D. `justify-content: center` không có tác dụng nếu container không có width

|                |                                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| **Lỗi**        | "Xem thêm" không căn giữa dù wrapper có `justify-content: center`                       |
| **Root cause** | Wrapper auto-width = text width → không có không gian để center                         |
| **Fix A**      | Thêm `_width: "1140px"` để wrapper full width                                           |
| **Fix B**      | Hoặc:`flex-direction: column; align-items: center` — cross axis của column = horizontal |
| **Rule mới**   | `justify-content: center` chỉ hoạt động khi container rộng hơn tổng children            |

### 2E. Gradient opacity quá thấp → element gần như vô hình

|                |                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Lỗi**        | Icon circles render gần như trắng/vô hình                                                                                       |
| **Root cause** | Tự ước đoán `rgba(0,124,252,0.2)` thay vì lấy exact CSS từ Figma                                                                |
| **Đúng**       | `radial-gradient(52.5% 40.5% at 52.5% 74%, #007CFC 0%, #1EAFFF 100%)` + `box-shadow: 0 4px 24px 0 rgba(255,255,255,0.88) inset` |
| **Rule mới**   | **KHÔNG tự đoán CSS** (màu, gradient, shadow). Luôn dùng Figma DevMode / `mcp_figma_get_design_context`                         |

---

## 3. Lỗi Element ID

### 3A. Element ID không đủ 6 ký tự

|                     |                                                               |
| ------------------- | ------------------------------------------------------------- |
| **Lỗi**             | ID `s4bh1` (5 chars) → API reject `invalid_element_structure` |
| **Rule**            | Bricks MCP yêu cầu ID phải đúng**6 ký tự [a-z0-9]**           |
| **Pattern đề xuất** | `[s{n}][role2][idx2]` → `s4hd10` (S4, header, item 1)         |

---

## 4. Lỗi Figma Data (Thông tin thiếu)

### 4A. Không lấy exact CSS → tự đoán màu

| Thông tin thiếu       | Hậu quả                      | Fix                                    |
| --------------------- | ---------------------------- | -------------------------------------- |
| Gradient icon circles | Màu sai, phải fix lại 3 lần  | Luôn mở Figma DevMode > Code > CSS     |
| Box-shadow inset      | Thiếu hiệu ứng depth         | Cần document từng element phức tạp     |
| Badge SVG dimensions  | Badge render sai vị trí/size | Lấy W/H exact (81×52px) từ Figma layer |

### 4B. Badge SVG với text overlay — Pattern chưa chuẩn hóa

**Cách đúng:**

```
badge-container (position: absolute, left: 22px, top: -2px)
  width: 81px, height: 52px
  display: flex, align-items: center, justify-content: center

  SVG image
    position: absolute, top: 0, left: 0
    width: 100%, height: 100%, object-fit: contain

  text label
    position: relative, z-index: 1
```

**Cách sai (ban đầu):**

- SVG `position: absolute` không có `top/left` → container width = 0 → render lỗi

---

## 5. Lỗi Image Sizing

### 5A. Ảnh slider không đều nhau

|                |                                                                                        |
| -------------- | -------------------------------------------------------------------------------------- |
| **Lỗi**        | 3 ảnh slider S3 có chiều cao khác nhau                                                 |
| **Root cause** | Mỗi ảnh có `_aspectRatio` khác nhau theo tỷ lệ ảnh gốc                                 |
| **Fix**        | `_height: "220px"` cố định + `_objectFit: "cover"` cho tất cả → loại bỏ `_aspectRatio` |
| **Rule mới**   | Slider/grid repeating cards → dùng**fixed height** thay vì aspect ratio                |

---

## 6. Tổng kết: Thông tin PHẢI có trong plan trước khi build

| Thông tin                    | Trước                | Sau                                          |
| ---------------------------- | -------------------- | -------------------------------------------- |
| CSS gradient/shadow phức tạp | Mô tả text mờ        | **Exact CSS từ Figma DevMode**               |
| Kích thước fixed elements    | Một phần             | **W, H, padding, `flex-shrink`** explicit    |
| Status slider/static         | `→ Status:` field ✅ | Giữ nguyên nhưng AI phải verify TRƯỚC        |
| Badge/overlay pattern        | Không có             | **Thêm vào `widget-map-examples.md`**        |
| Element ID format            | Không có             | `6-char [a-z0-9]`, pattern `s{n}{role}{idx}` |

---

## 7. Rules Mới Đề Xuất Bổ Sung

### RULE 6 — `flex-shrink: 0` cho fixed-size elements trong flex row

```
Bất kỳ element có _width VÀ _height cố định trong flex row
→ BẮT BUỘC thêm _flexShrink: "0"
Áp dụng: icon circles, avatar, badge container, thumbnail
```

### RULE 7 — Lấy CSS từ Figma, KHÔNG tự đoán

```
Với gradient, box-shadow, border phức tạp:
1. Gọi mcp_figma_get_design_context trên node đó
2. Copy exact CSS từ Figma DevMode > Code > CSS
3. Ghi vào plan file trước khi build
```

### RULE 8 — Element ID validation trước khi push

```
Pattern: [s{n}][role2][index2] → 6 chars, e.g. s4hd10, s5bg20
Validate: length === 6, only /^[a-z0-9]{6}$/
```

### RULE 9 — Build 1 section → Dừng → Chờ "ok" → Tiếp

```
Không bao giờ build section N+1 khi chưa có confirm của user cho section N.
"ok tiếp tục" = "ok section hiện tại, bắt đầu section kế tiếp"
→ Chỉ build section kế tiếp đó, không build thêm nữa.
```

---

_Tạo sau session build Blog Author Profile (S1–S6) — 2026-05-01_
