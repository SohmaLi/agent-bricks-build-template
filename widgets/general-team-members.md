# Widget: `team-members`

> **Source:** `bricks/includes/elements/team-members.php`
> **Category:** general | **Tag:** `ul`

Grid thành viên nhóm với ảnh, tên, chức danh và mô tả.

---

## Content Controls

### Items (repeater)
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `image` | image | Ảnh thành viên (render as background-image) |
| `title` | text | Tên thành viên |
| `subtitle` | text | Chức danh |
| `description` | textarea | Mô tả ngắn |

### Layout Group
| Key | Type | Mô tả |
|-----|------|-------|
| `membersPerRow` | number (1-6) | Số cột → CSS `grid-template-columns: repeat(N, 1fr)` |
| `memberGutter` | number+unit | Gap giữa các member cards |
| `contentBackgroundColor` | color → `.member` | Background card |
| `contentBorder` | border → `.member` | Border card |
| `contentBoxShadow` | box-shadow → `.member` | Shadow card |

### Image Group
| Key | Type | Mô tả |
|-----|------|-------|
| `imagePosition` | select | `"top"` (default), `"right"`, `"left"`, `"bottom"` |
| `imageRatio` | select | Aspect ratio ảnh |
| `imageWidth` | number+unit → `.image` | Width ảnh |
| `imageMargin` | spacing → `.image` | Margin ảnh |
| `imageBorder` | border → `.image` | Border ảnh |

### Content Group
| Key | Type | Mô tả |
|-----|------|-------|
| `contentPadding` | spacing → `.content` | Padding phần text |
| `contentAlign` | text-align → `.content` | Text alignment |
| `memberTitleTag` | select | HTML tag: `h4` (default), `h2`-`h6`, `p`, `div` |
| `memberTitleTypography` | typography → `.title` | Typography tên |
| `memberSubtitleTypography` | typography → `.subtitle` | Typography chức danh |
| `memberDescriptionTypography` | typography → `.description` | Typography mô tả |

---

## HTML Structure

```html
<ul class="brxe-team-members image-top">
  <li class="member">
    <div class="image css-filter" style="background-image: url(...)"></div>
    <div class="content">
      <h4 class="title">Tên</h4>
      <div class="subtitle">Chức danh</div>
      <div class="description">Mô tả</div>
    </div>
  </li>
</ul>
```

---

## Ví dụ JSON

### Team grid 4 cột
```json
{
  "id": "tmTeam",
  "name": "team-members",
  "parent": "ctnTeam",
  "settings": {
    "items": [
      {
        "image": {"id": 501, "url": "https://site.com/team1.jpg"},
        "title": "Nguyễn Văn An",
        "subtitle": "CEO & Co-Founder",
        "description": "10 năm kinh nghiệm trong lĩnh vực hosting và cloud."
      },
      {
        "image": {"id": 502, "url": "https://site.com/team2.jpg"},
        "title": "Trần Thị Bình",
        "subtitle": "CTO",
        "description": "Chuyên gia về hạ tầng đám mây và bảo mật."
      }
    ],
    "membersPerRow": 4,
    "memberGutter": "24px",
    "imageRatio": "1:1",
    "imagePosition": "top",
    "contentPadding": {"top": 20, "right": 20, "bottom": 20, "left": 20},
    "contentAlign": "center",
    "memberTitleTag": "h4",
    "memberTitleTypography": {
      "font-size": "18px",
      "font-weight": "600",
      "color": {"hex": "#282829"}
    },
    "memberSubtitleTypography": {
      "font-size": "14px",
      "color": {"hex": "#007cfc"}
    },
    "memberDescriptionTypography": {
      "font-size": "14px",
      "color": {"hex": "#666666"}
    },
    "contentBackgroundColor": {"hex": "#ffffff"},
    "contentBorder": {
      "radius": {"top": "12px", "right": "12px", "bottom": "12px", "left": "12px"}
    },
    "contentBoxShadow": {"values": "0 4px 16px rgba(0,0,0,0.08)"}
  }
}
```
