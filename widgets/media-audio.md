# Widget: `audio`

> **Source:** `bricks/includes/elements/audio.php`
> **Category:** media | **Scripts:** bricksAudio (WP Audio Shortcode)

Player audio WordPress với nhiều nguồn.

---

## Content Controls

| Key | Type | Mô tả |
|-----|------|-------|
| `source` | select | `"file"` (default), `"external"`, `"dynamic"` |
| `file` | audio | File từ media library (khi `source = "file"`) |
| `external` | text | URL ngoài như `.mp3` (khi `source = "external"`) |
| `useDynamicData` | text | Dynamic data tag (khi `source = "dynamic"`) |
| `titleCustom` | text | Title tùy chỉnh thay cho tên file |
| `title` | checkbox | Hiển thị tên file (từ attachment metadata) |
| `artist` | checkbox | Hiển thị tên nghệ sĩ (từ attachment metadata) |
| `tag` | select | HTML tag title: `p` (default), `h1`-`h6` |
| `autoplay` | checkbox | Autoplay (bị block bởi Chrome nếu không có user interaction) |
| `loop` | checkbox | Loop |
| `preload` | select | `"metadata"`, `"auto"` (default: none) |
| `theme` | select | `"light"` (default), `"dark"` |

---

## HTML Structure

```html
<div class="brxe-audio theme-light">
  <p class="audio-title">Tên bài hát - Nghệ sĩ</p>
  <audio controls src="..."></audio>
</div>
```

---

## Ví dụ JSON

```json
{
  "id": "audioPlayer",
  "name": "audio",
  "parent": "ctnMusic",
  "settings": {
    "source": "file",
    "file": {
      "id": 200,
      "url": "https://site.com/audio/track.mp3"
    },
    "title": true,
    "theme": "light",
    "loop": false,
    "preload": "metadata"
  }
}
```
