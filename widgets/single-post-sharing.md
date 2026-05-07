# Widget: `post-sharing`

> **Source:** `bricks/includes/elements/post-sharing.php`
> **Category:** single | **css_selector:** `a`

Nút chia sẻ bài viết lên mạng xã hội — mỗi item có icon brand tự động.

---

## Content Controls

### Items (repeater)
| Sub-key | Type | Mô tả |
|---------|------|-------|
| `service` | select | Mạng XH: `facebook`, `twitter`, `linkedin`, `whatsapp`, `pinterest`, `telegram`, `vkontakte`, `bluesky`, `email` |
| `excerpt` | checkbox | Kèm excerpt (chỉ WhatsApp) |
| `icon` | icon | Override icon mặc định |
| `background` | color → `a` | BG button riêng |
| `color` | color → `a` | Color riêng |

### Layout
| Key | Type | Mô tả |
|-----|------|-------|
| `brandColors` | checkbox | Dùng màu brand mạng XH (default: true) |
| `direction` | direction | `row` hoặc `column` |
| `newTab` | checkbox | Mở trong tab mới |
| `linkRel` | text | Rel attribute (default: `nofollow`) |

---

## HTML Structure

```html
<ul class="brxe-post-sharing brand-colors">
  <li title="Share on Facebook">
    <a class="facebook" href="https://facebook.com/share..." rel="nofollow">
      <!-- Facebook SVG icon -->
    </a>
  </li>
  <!-- ... more items -->
</ul>
```

---

## Ví dụ JSON

```json
{
  "id": "psShare",
  "name": "post-sharing",
  "parent": "ctnSingleFooter",
  "settings": {
    "items": [
      {"id": "s001", "service": "facebook"},
      {"id": "s002", "service": "twitter"},
      {"id": "s003", "service": "linkedin"},
      {"id": "s004", "service": "whatsapp", "excerpt": true}
    ],
    "brandColors": true,
    "direction": "row",
    "newTab": true,
    "linkRel": "nofollow",
    "_cssCustom": "%root% a { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }"
  }
}
```
