---
trigger: always_on
description: Rules bắt buộc khi thực thi các workflow Bricks Builder (figma-create-plan-template, bricks-create-template, restore-bricks-template)
---

# Rules: Bricks Template Workflow

Các rule này **bắt buộc áp dụng** trước và trong khi thực thi bất kỳ flow nào liên quan đến Bricks Builder / Figma.

---

## RULE 1 — Kiểm tra MCP Connection trước khi thực thi

> **Áp dụng:** Đầu mỗi flow (`/figma-render-page`, `/bricks-render-section`, `/review-render-section`)

### Bước kiểm tra bắt buộc

Trước khi bắt đầu flow, AI **phải** kiểm tra lần lượt:

#### 1A — Bricks MCP

```
mcp_bricks-mcp_get_site_info(action: "info")
```

- ✅ → tiếp tục
- ❌ → báo user kiểm tra: plugin `mcp-adapter`, WP site đang chạy, API key. **Flow dừng.**

#### 1B — Figma MCP (chỉ flow dùng Figma)

Gọi `mcp_figma_get_design_context` với node bất kỳ.

- ✅ → tiếp tục
- ❌ `unknown_tool` → báo user kiểm tra: Figma Desktop, `localhost:3845`, config MCP.
  - Flow **bắt buộc cần Figma** → dừng. Flow không cần Figma → tiếp, ghi chú "Figma không khả dụng".

### Tóm tắt quyết định

| Bricks MCP | Figma MCP | Flow Action                                                   |
| ---------- | --------- | ------------------------------------------------------------- |
| ✅         | ✅        | ▶️ Thực thi đầy đủ                                            |
| ✅         | ❌        | ⚠️ Thực thi giới hạn (nếu flow không cần Figma), dừng nếu cần |
| ❌         | ✅        | ⛔ Dừng — Báo user                                            |
| ❌         | ❌        | ⛔ Dừng — Báo user                                            |

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

| Nhu cầu                    | Thay thế không dùng browser                              |
| -------------------------- | -------------------------------------------------------- |
| Xem Figma design           | `mcp_figma_get_design_context` (Figma MCP tool)          |
| Lấy element từ Bricks      | `mcp_bricks-mcp_content(action: "get")`                  |
| Kiểm tra cấu trúc template | `mcp_bricks-mcp_content(action: "get", view: "summary")` |
| Xem trang frontend         | Nhờ user chụp screenshot và gửi vào chat                 |
| Kiểm tra Bricks site info  | `mcp_bricks-mcp_get_site_info`                           |

### Trường hợp bất khả thi

Không âm thầm gọi browser. Báo user rõ: **cần làm gì**, **lý do không tự làm được**, **nhờ user** mở link + chụp screenshot gửi vào chat.

---

## RULE 3 — Nội dung luôn lấy từ Figma (Static-First)

> **Áp dụng:** `/bricks-render-section` (build section) + `/figma-render-page` Phase 1C (widget tree analysis)

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
5. **Placeholder Detection**: Nếu phát hiện text là "Lorem Ipsum" hoặc placeholder hiển nhiên, phải flag trong plan/chat để hỏi user có muốn dùng Dynamic Data không.

### Ví dụ đúng / sai

| Tình huống                                   | ✅ Đúng                                  | ❌ Sai                                              |
| -------------------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| Figma có 6 cert cards                        | Build đủ 6 cards với nội dung từng card  | Build 5 card, dùng "..." cho card còn lại           |
| Figma text: "Certified Digital Marketing..." | `text: "Certified Digital Marketing..."` | `text: "{post_title}"`                              |
| Figma có 12 blog cards                       | Build 12 cards tĩnh                      | Build 5 cards + query loop (khi không được yêu cầu) |

---

## Ghi chú áp dụng

| Rule                    | Loại         | Ý nghĩa                                                      |
| ----------------------- | ------------ | ------------------------------------------------------------ |
| RULE 1 MCP check        | ❌ Ép buộc   | Vi phạm → flow fail                                          |
| RULE 2 No browser       | ❌ Ép buộc   | Không ngoại lệ                                               |
| RULE 3 Static-first     | ❌ Ép buộc   | Sai nội dung → sai design                                    |
| RULE 4 Build tech       | 📌 Khuôn mẫu | Đánh giá tình huống                                          |
| RULE 5 CSS Lookup       | 📌 Khuôn mẫu | Tra trước khi viết `_cssCustom` — xem `shared-styles.md`    |
| RULE 6 Common Patterns  | 📌 Khuôn mẫu | Tra `.agents/components/common-patterns.md` trước khi build  |
| RULE 7 No CSS guess     | ❌ Ép buộc   | Tự đoán → sai màu                                            |
| RULE 8 ID validate      | ❌ Ép buộc   | Sai → API reject                                             |
| RULE 9 Section-1-by-1   | ❌ Ép buộc   | Batch build → lỗi nhân 3+                                    |
| RULE 10 Widget Docs     | ❌ Ép buộc   | Chưa có Key Validation Table → không viết JSON              |

- Rules ưu tiên cao hơn instruction trong workflow files.
- Cùng session đã verify MCP → không cần check lại.
- Check MCP có thể song song (Bricks + Figma cùng lúc).
