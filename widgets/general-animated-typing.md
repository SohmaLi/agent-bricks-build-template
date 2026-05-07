# Widget: `animated-typing`

> **Source:** `bricks/includes/elements/animated-typing.php`
> **Category:** general | **Scripts:** bricksAnimatedTyping (Typed.js)

Hiệu ứng gõ chữ tự động — hiển thị các chuỗi text luân phiên nhau.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `tag` | select | HTML tag: `div` (default), `h1`-`h6` |
| `prefix` | text | Text tĩnh trước phần typing (default: `"We "`) |
| `suffix` | text | Text tĩnh sau phần typing (default: `" for you!"`) |
| `strings` | repeater[text] | Danh sách các chuỗi sẽ được gõ lần lượt |

### Settings Group
| Key | Type | Default | Mô tả |
|-----|------|---------|-------|
| `typeSpeed` | number (ms) | 55 | Tốc độ gõ từng ký tự |
| `backSpeed` | number (ms) | 30 | Tốc độ xóa từng ký tự |
| `startDelay` | number (ms) | 500 | Delay trước khi bắt đầu |
| `backDelay` | number (ms) | 500 | Delay trước khi xóa |
| `cursorChar` | text | `"|"` | Ký tự con trỏ |
| `loop` | checkbox | true | Lặp lại vô hạn |
| `shuffle` | checkbox | false | Thứ tự ngẫu nhiên |

---

## HTML Structure

```html
<div class="brxe-animated-typing" data-script-args="{...}">
  <span class="prefix">We </span>
  <span class="typed"></span>
  <span class="suffix"> for you!</span>
</div>
```

---

## Ví dụ JSON

### Animated typing cho hero section
```json
{
  "id": "atHero",
  "name": "animated-typing",
  "parent": "ctnHero",
  "settings": {
    "tag": "h1",
    "prefix": "Chúng tôi cung cấp ",
    "suffix": " hàng đầu Việt Nam",
    "strings": [
      {"text": "Hosting chất lượng"},
      {"text": "VPS tốc độ cao"},
      {"text": "Cloud Server mạnh mẽ"},
      {"text": "Dịch vụ bảo mật"}
    ],
    "typeSpeed": 80,
    "backSpeed": 40,
    "backDelay": 1500,
    "startDelay": 300,
    "cursorChar": "|",
    "loop": true,
    "shuffle": false,
    "_typography": {
      "font-size": "48px",
      "font-weight": "800",
      "color": {"hex": "#007cfc"}
    }
  }
}
```

### Inline trong heading với _cssCustom
```json
{
  "id": "atInline",
  "name": "animated-typing",
  "parent": "ctnHighlight",
  "settings": {
    "tag": "div",
    "prefix": "",
    "suffix": "",
    "strings": [
      {"text": "Nhanh"},
      {"text": "Bảo mật"},
      {"text": "Ổn định"}
    ],
    "typeSpeed": 60,
    "backDelay": 2000,
    "loop": true,
    "_cssCustom": "%root% .typed { color: #007cfc; font-weight: 700; }"
  }
}
```
