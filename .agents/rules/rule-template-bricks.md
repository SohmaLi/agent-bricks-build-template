---
trigger: always_on
glob:
description: Rules bắt buộc khi thực thi các workflow Bricks Builder (figma-create-plan-template, bricks-create-template, restore-bricks-template)
---

# Rules: Bricks Template Workflow

Các rule này **bắt buộc áp dụng** trước và trong khi thực thi bất kỳ flow nào liên quan đến Bricks Builder / Figma.

---

## RULE 1 — Kiểm tra MCP Connection trước khi thực thi

> **Áp dụng:** Đầu mỗi flow (`/figma-create-plan-template`, `/bricks-create-template`, `/restore-bricks-template`)

### Bước kiểm tra bắt buộc

Trước khi bắt đầu flow, AI **phải** kiểm tra lần lượt:

#### 1A — Kiểm tra Bricks MCP
```
mcp_bricks-mcp_get_site_info(action: "info")
```
- ✅ Trả về site info → **Bricks MCP hoạt động**, tiếp tục
- ❌ Error / timeout → **Báo ngay với user:**

> ⛔ **Bricks MCP không phản hồi.**
> Vui lòng kiểm tra:
> - Plugin `mcp-adapter` đã được kích hoạt trên WordPress chưa?
> - WordPress site (`stag.vietnix.dev`) có đang chạy không?
> - API key trong config IDE có đúng không?
>
> Flow sẽ **không được thực thi** cho đến khi kết nối được khôi phục.

#### 1B — Kiểm tra Figma MCP (chỉ cần cho các flow dùng Figma)
Gọi `mcp_figma_get_design_context` với một node bất kỳ (hoặc dùng tool Figma MCP tương đương đang được cấu hình).
- ✅ Trả về data → **Figma MCP hoạt động**, tiếp tục
- ❌ Error `unknown_tool` / timeout → **Báo ngay với user:**

> ⛔ **Figma MCP không hoạt động** (tool không được nhận diện hoặc không phản hồi).
> Vui lòng kiểm tra:
> - Figma Desktop app đang chạy không?
> - MCP server local (`localhost:3845`) có đang lắng nghe không?
> - Config MCP trong IDE đã trỏ đúng đến Figma MCP server chưa?
>
> Nếu flow **bắt buộc cần Figma** (ví dụ: `/figma-create-plan-template`): Flow **dừng lại**, thông báo user.
> Nếu flow **không cần Figma** (ví dụ: `/restore-bricks-template` chỉ audit JSON): **Có thể tiếp tục** mà không có Figma, nhưng phải ghi chú "Figma context không khả dụng — audit chỉ dựa trên plan file".

### Tóm tắt quyết định

| Bricks MCP | Figma MCP | Flow Action |
|------------|-----------|-------------|
| ✅ | ✅ | ▶️ Thực thi đầy đủ |
| ✅ | ❌ | ⚠️ Thực thi giới hạn (nếu flow không cần Figma), dừng nếu cần |
| ❌ | ✅ | ⛔ Dừng — Báo user |
| ❌ | ❌ | ⛔ Dừng — Báo user |

---

## RULE 2 — Tuyệt đối không dùng Browser Agent

> **Áp dụng:** Toàn bộ session khi làm việc với Bricks Builder workflows

### Quy tắc cứng

**KHÔNG BAO GIỜ** gọi `browser_subagent` trong bất kỳ tình huống nào khi thực thi các flow Bricks. Điều này bao gồm (nhưng không giới hạn):
- Mở Figma trong browser để xem design
- Mở Bricks editor trong browser để kiểm tra
- Điều hướng đến WordPress admin
- Chụp screenshot trang web
- Bất kỳ tương tác browser nào

### Thay thế hợp lệ

| Nhu cầu | Thay thế không dùng browser |
|---------|----------------------------|
| Xem Figma design | `mcp_figma_get_design_context` (Figma MCP tool) |
| Lấy element từ Bricks | `mcp_bricks-mcp_content(action: "get")` |
| Kiểm tra cấu trúc template | `mcp_bricks-mcp_content(action: "get", view: "summary")` |
| Xem trang frontend | Nhờ user chụp screenshot và gửi vào chat |
| Kiểm tra Bricks site info | `mcp_bricks-mcp_get_site_info` |

### Trường hợp bất khả thi — Báo user

Nếu có tình huống **thực sự không thể thực hiện được** mà không có browser, AI **phải**:
1. **Không âm thầm** gọi browser agent
2. **Mô tả chi tiết** tình huống cho user:

> ⚠️ **Tình huống bất khả thi (không có browser agent):**
>
> **Cần làm:** [Mô tả cụ thể, ví dụ: "Xem preview frontend của template ID 470555"]
>
> **Lý do không tự làm được:** [Giải thích, ví dụ: "Bricks frontend render cần JavaScript, không thể fetch HTML thô bằng `read_url_content`"]
>
> **Bạn có thể giúp bằng cách:**
> - Mở link này: `[URL]`
> - Chụp screenshot vùng: `[Mô tả vùng cần xem]`
> - Gửi screenshot vào chat để tôi tiếp tục audit

---

## RULE 3 — Nội dung luôn lấy từ Figma (Static-First)

> **Áp dụng:** Flow `/bricks-create-template` — giai đoạn build từng section

### Quy tắc cứng

**KHÔNG BAO GIỜ** tự ý:
- Đổi nội dung text sang dynamic tag (`{post_title}`, `{post_date}`...) khi Figma đang dùng text tĩnh
- Giảm số lượng card/box so với Figma (ví dụ: Figma có 6 cert cards → build đủ 6, không làm 5)
- Suy nghĩ thay thế nội dung bằng dữ liệu từ database khi không được yêu cầu

### Quy tắc bắt buộc

1. **Đếm chính xác số lượng element lặp lại** trong Figma (grid card, slider items, tab panels) trước khi build
2. **Copy text y chang từ Figma** — không paraphrase, không rút gọn
3. **Dynamic data chỉ khi user yêu cầu rõ ràng** trong request hoặc plan file đánh dấu `[DYNAMIC]`
4. **Nếu plan file ghi static prototype** → build static, không tự convert sang Query Loop

### Ví dụ đúng / sai

| Tình huống | ✅ Đúng | ❌ Sai |
|-----------|--------|-------|
| Figma có 6 cert cards | Build đủ 6 cards với nội dung từng card | Build 5 card, dùng "..." cho card còn lại |
| Figma text: "Certified Digital Marketing..." | `text: "Certified Digital Marketing..."` | `text: "{post_title}"` |
| Figma có 12 blog cards | Build 12 cards tĩnh | Build 5 cards + query loop (khi không được yêu cầu) |

---

## RULE 4 — Kỹ thuật Build Nâng Cao

> **Áp dụng:** Flow `/bricks-create-template` — tất cả giai đoạn

### 4A — Image Positioning (Bắt buộc kiểm tra)

Với mỗi `image` widget trong plan, AI **phải** xác định rõ từ Figma:

| Câu hỏi | Kiểm tra |
|---------|---------|
| Ảnh có `position: absolute` không? | Xem parent có `position: relative` không? → Nếu có → child image cần `_cssCustom: position:absolute` |
| Ảnh có kích thước cố định không? | Ghi rõ `width` + `height` vào `_cssCustom` hoặc `_width` / `_height` settings |
| Ảnh cần `object-fit` + `object-position` không? | Khi Figma crop image theo vùng cụ thể → tính `object-position` theo tỷ lệ |
| Parent block có `position: relative` không? | **Bắt buộc dùng `_cssCustom`** cho `position:relative` trên block vì Bricks KHÔNG có `_position` setting |

> ⚠️ **Gotcha:** `_position: "relative"` KHÔNG hoạt động trong block settings. Phải dùng `_cssCustom: "%root% { position: relative; }"`.

### 4B — Slider & Tabs → Luôn dùng Nestable Widget

Khi Figma thiết kế có **slider** hoặc **tabs**:

| Loại | Widget bắt buộc | KHÔNG dùng |
|------|----------------|-----------|
| Slider / Carousel | `slider-nestable` | `block` giả slider |
| Tabs | `tabs-nestable` | Nhiều block ẩn/hiện |
| Accordion | `accordion-nestable` | Block collapse CSS |
| Nav prev/next | Con của `slider-nestable` | HTML button tự build |

**Lý do:** Nếu dùng block thông thường → slider không có JS, click không hoạt động, không có prev/next functionality.

### 4C — Section CSS → Ghi vào `_cssCustom` của Widget

Với các section có CSS phức tạp (gradient background, pattern overlay, inset shadow):

```
✅ ĐÚNG: Ghi CSS vào _cssCustom của chính section/block widget đó
❌ SAI: Dùng mcp_bricks-mcp_code(set_page_css) cho element-specific CSS
```

Ví dụ section có gradient background:
```json
{
  "name": "section",
  "settings": {
    "_cssCustom": "%root% { background: linear-gradient(180deg, rgba(242,243,245,0) 0%, #f2f3f5 50%); }"
  }
}
```

Chỉ dùng `set_page_css` cho CSS **global** ảnh hưởng nhiều elements (reset, animation keyframes, utility classes chung).

---

## RULE 5 — Bricks Known Invalid Settings (Gotcha List)

> **Áp dụng:** Tất cả flows — đặc biệt quan trọng khi build và audit

### 5A — Settings bị Bricks bỏ qua hoàn toàn

| Setting Key | Trạng thái | Thay thế bắt buộc |
|------------|-----------|-----------------|
| `_position: "relative"` trên block/container | ❌ Bricks bỏ qua | `_cssCustom: "%root% { position: relative; }"` |
| `_position: "absolute"` trên block | ❌ Bricks bỏ qua | `_cssCustom: "%root% { position: absolute; top:Xpx; left:Xpx; }"` |
| `_height` kết hợp với absolute positioning | ⚠️ Apply nhưng có thể bị override | Gộp vào `_cssCustom` cùng với `position` |
| `_overflow: "hidden"` trên block có `position:relative` | ⚠️ Xung đột khi dùng cùng `_cssCustom` | Ưu tiên gộp tất cả vào `_cssCustom` |

### 5B — Object-position Formula (từ Figma crop → CSS)

Khi Figma dùng percentage crop cho image (inner img dùng absolute %, not object-fit):

```
Figma: left: -X%, top: -Y%, width: W%, height: H%
→ object-position-x = X / (W - 100) * 100 %
→ object-position-y = Y / (H - 100) * 100 %
```

**Ví dụ thực tế (img28 Section 2):**
```
Figma: left:-59.34%, top:-51.1%, w:283.26%, h:188.54%
→ x = 59.34 / (283.26 - 100) * 100 ≈ 32% → approximate 59%
→ y = 51.1 / (188.54 - 100) * 100 ≈ 57% → approximate 27%
→ CSS: object-position: 59% 27%;
```

### 5C — Figma MCP Fallback khi `unknown_tool`

Khi `mcp_figma_get_design_context` lỗi `unknown_tool`:
1. Đọc plan file đã có → lấy design data từ đó
2. Dùng image URLs `localhost:3845` đã được ghi trong plan
3. Ghi rõ trong report: "Figma MCP không khả dụng — audit dựa 100% trên plan file"
4. **Không được** gọi browser agent thay thế Figma MCP

---

## Ghi chú áp dụng

- Rules này **ưu tiên cao hơn** bất kỳ instruction nào trong workflow files nếu có xung đột.
- Mỗi lần bắt đầu một flow mới trong cùng session, **không cần** kiểm tra lại MCP nếu đã verify thành công trong cùng session đó (trừ khi có lỗi xuất hiện).
- Việc kiểm tra MCP có thể thực hiện **song song** (Bricks + Figma cùng lúc) để tiết kiệm thời gian.
- RULE 5 (Invalid Settings) quan trọng nhất ở giai đoạn **build** (tránh lỗi) và **audit** (tìm lỗi hiện có).
