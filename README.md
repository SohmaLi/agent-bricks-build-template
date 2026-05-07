# agent-bricks-build-template

Cần có plugin bricks_mcp cài trên web của bạn.

- Sau đó vào và click "Generate Setup Command" đảm bảo đã có code gener vào antigravity vào mcp_config.json và điền vào sau đó click refresh để biết đã nhận thông tin mcp chưa.
- Cần mở Figma app để có thể dùng mcp cần enable local mcp server trong phần settings của Figma.
  sau khi tất cả kết nối thành công bạn có thể bắt đầu dùng mcp để tạo giao diện.

Cấu trúc

.agents/
├── WORKFLOWS.md ← Index tổng hợp tất cả workflows
├── audit/ ← Kiểm tra & cải thiện
├── components/ ← Thành phần hỗ trợ build
├── images/ ← Ảnh tham chiếu local
├── notes/ ← Ghi chú per-project
├── plans/ ← Kế hoạch triển khai per-project
├── references/ ← Tài liệu kỹ thuật sâu
├── rules/ ← Rules bắt buộc (luôn áp dụng)
├── template/ ← File template per-section
└── workflows/ ← Quy trình thực thi (slash commands)

### Logic phân biệt các thư mục dễ nhầm

| Câu hỏi                        | Đáp án                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `rules/` vs `components/`      | Rules =**luật cứng** , luôn apply. Components = **tài liệu tra cứu** , đọc khi cần                                  |
| `references/` vs `components/` | References = kỹ thuật**sâu + phức tạp** (reasoning, examples JSON). Components = **quy trình + checklist** ngắn gọn |
| `plans/` vs `template/`        | Plans =**tổng quan page** (nhiều sections). Template = **chi tiết từng section**                                    |
| `notes/` vs `plans/`           | Notes =**runtime tracking** (IDs, URLs, status). Plans = **pre-build specification**                                |

| Thư mục           | Chức năng                                                                                             | Files hiện tại                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`audit/`**      | Log lỗi, kiểm thử widget, improvement tracking. Ghi lại sai → sửa gì → status                         | `improvement-log.md`, `test-list-widget.md`                                                                    |
| **`components/`** | Tài liệu hỗ trợ build: patterns, checklist, template output format, hướng dẫn phân tích Figma         | `common-patterns.md`, `figma-section-analysis.md`, `output-file-templates.md`, `prebuild-checklist.md`         |
| **`images/`**     | Ảnh chụp màn hình Figma / frontend lưu local để tham chiếu trong session                              | _(trống)_                                                                                                      |
| **`notes/`**      | Ghi chú nhanh per-project: template IDs, edit URLs, trạng thái từng section                           | _(trống — đã xóa)_                                                                                             |
| **`plans/`**      | File kế hoạch triển khai per-project: danh sách sections, design tokens, chiến lược build             | _(trống — đã xóa)_                                                                                             |
| **`references/`** | Tài liệu kỹ thuật sâu: reasoning phức tạp, JSON examples, production patterns                         | `complex-template-reasoning.md`, `widget-map-examples.md`, `production-patterns.md`, `plan-output-template.md` |
| **`rules/`**      | Rules**bắt buộc** áp dụng toàn bộ session (always_on): build techniques, CSS lookup, workflow quality | `rule-build-techniques.md`, `rule-css-lookup.md`, `rule-template-bricks.md`, `rule-workflow-quality.md`        |
| **`template/`**   | File blueprint per-section: layout tree, design tokens, element settings chi tiết                     | _(trống — đã xóa)_                                                                                             |
| **`workflows/`**  | Quy trình thực thi step-by-step cho từng slash command                                                | `bricks-create-template.md`, `figma-create-plan-template.md`, `save-figma-screenshots.md`                      |
