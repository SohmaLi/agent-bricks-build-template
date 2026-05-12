---
trigger: always_on
description: Rules bắt buộc khi thực thi các workflow Bricks Builder
---

# Rules: Bricks Template Workflow

Các rule này **bắt buộc áp dụng** không có ngoại lệ.

---

## RULE 2 — Tuyệt đối không dùng Browser Agent
**KHÔNG BAO GIỜ** gọi `browser_subagent` dưới bất kỳ hình thức nào. 
- Mọi tương tác lấy design, content, cấu trúc phải dùng MCP Tools tương ứng.
- Nếu cần xem frontend, nhờ user chụp screenshot.

---

## RULE 3 — Nội dung luôn lấy từ Figma (Static-First)
1. **Copy y nguyên**: Đếm chính xác số lượng element và copy exact text từ Figma.
2. **Không tự ý convert**: Không dùng dynamic data (`{post_title}`, v.v.) trừ khi được yêu cầu.
3. **Build đủ**: Không rút gọn số lượng cards/items so với thiết kế gốc.

---

## Ghi chú áp dụng
- Chi tiết tra cứu ví dụ tại: `.agents/references/miss-refe.md` (mục 3).
- RULE 2-3 là yêu cầu ép buộc (Violate = Fail).
   |
| RULE 9 Section-1-by-1   | ❌ Ép buộc   | Batch build → lỗi nhân 3+                                    |
| RULE 10 Widget Docs     | ❌ Ép buộc   | **HARD GATE:** Paste Key Validation Table trước khi viết JSON |
| RULE 11 API & Visual    | ❌ Ép buộc   | update vs update_content; checkbox default; layout ≠ images  |
| RULE 12 Pre-Build Read  | ❌ Ép buộc   | **HARD GATE:** Đọc widgets + build-errors + common-patterns TRƯỚC khi viết JSON — xem `rule-pre-build-reading.md` |

- Rules ưu tiên cao hơn instruction trong workflow files.
- Cùng session đã verify MCP → không cần check lại.
- Check MCP có thể song song (Bricks + Figma cùng lúc).
