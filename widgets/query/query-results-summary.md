# Widget: `query-results-summary`

> **Source:** `bricks/includes/elements/query-results-summary.php` (Bricks ≥ 1.10, verified 2.3.4)
> **Category:** query
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Hiển thị thống kê kết quả query — số bài, trang hiện tại, tổng kết quả. Tự động cập nhật khi dùng AJAX pagination/filters.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `elementInfo` | info | Thông báo khi `queryId` chưa được set |
| `queryId` | query-list | ID query cần hiển thị thống kê (**bắt buộc**, **không hỗ trợ main query**) |
| `statsFormat` | text | Format khi có nhiều kết quả. Placeholders: `%start%`, `%end%`, `%total%` (default: `"Results: %start% - %end% of %total% posts"`) |
| `oneResultText` | text | Text khi chỉ có 1 kết quả (default: `"One post found"`) |
| `noResultsText` | text | Text khi không có kết quả (default: `"No posts found"`) |

---

## Lưu ý

- Phải kết hợp với **Query Loop element** cụ thể (không dùng main query)
- Hỗ trợ query types: post, term, user
- Tự động cập nhật khi dùng AJAX pagination/filters

---

## Ví dụ JSON

```json
{
  "id": "qrsStats",
  "name": "query-results-summary",
  "parent": "ctnArchiveHeader",
  "settings": {
    "queryId": "postsLoopContainer",
    "statsFormat": "Hiển thị %start%–%end% trong tổng số %total% bài viết",
    "oneResultText": "Tìm thấy 1 bài viết",
    "noResultsText": "Không tìm thấy bài viết nào",
    "_typography": {
      "font-size": "14px",
      "color": {"hex": "#888888"}
    }
  }
}
```
