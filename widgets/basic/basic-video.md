# Widget: `video`

> **Source:** `bricks/includes/elements/video.php`
> **Category:** basic | **Scripts:** Plyr (optional)
> **Style keys:** → Xem [../shared-styles.md](../shared-styles.md)

Widget nhúng video từ YouTube, Vimeo, media library hoặc URL file.

---

## Content Controls

### Source
| Key | Options | Mô tả |
|-----|---------|-------|
| `videoType` | `"youtube"` (default), `"vimeo"`, `"media"`, `"file"`, `"meta"` | Nguồn video |

### YouTube
| Key | Type | Mô tả |
|-----|------|-------|
| `iframeTitle` | text | Title attribute cho iframe (accessibility) |
| `youTubeId` | text | YouTube video ID hoặc URL đầy đủ |
| `youtubeAutoplay` | checkbox | Tự phát (không hoạt động trên mobile) |
| `youtubeControls` | checkbox | Hiện controls (default: true) |
| `youtubeLoop` | checkbox | Loop |
| `youtubeMute` | checkbox | Tắt tiếng |
| `youtubeShowinfo` | checkbox | Hiện thông tin video (default: true) |
| `youtubeRel` | checkbox | Hiện related videos từ kênh khác |
| `youtubeDoNotTrack` | checkbox | Dùng youtube-nocookie.com |

### Vimeo
| Key | Type | Mô tả |
|-----|------|-------|
| `vimeoId` | text | Vimeo video ID hoặc URL |
| `vimeoHash` | text | Privacy hash (nếu video unlisted) |
| `vimeoAutoplay` | checkbox | Tự phát |
| `vimeoLoop` | checkbox | Loop |
| `vimeoMute` | checkbox | Tắt tiếng |
| `vimeoByline` | checkbox | Hiện byline (default: true) |
| `vimeoTitle` | checkbox | Hiện title (default: true) |
| `vimeoPortrait` | checkbox | Hiện portrait (default: true) |
| `vimeoDoNotTrack` | checkbox | Do not track |
| `vimeoColor` | color | Player accent color |

### Media / File
| Key | Type | Mô tả |
|-----|------|-------|
| `media` | video | Video từ media library |
| `fileUrl` | text | Direct URL file video |
| `useDynamicData` | select | Dynamic data tag để lấy URL video |
| `filePreload` | select | `"metadata"`, `"auto"`, `"none"` |
| `fileAutoplay` | checkbox | Tự phát |
| `fileLoop` | checkbox | Loop |
| `fileMute` | checkbox | Tắt tiếng |
| `fileInline` | checkbox | `playsinline` — phát inline trên iOS (không fullscreen) |
| `fileControls` | checkbox | Hiện controls HTML5 |
| `videoPoster` | image | Poster image cho video HTML5 |

### Preview Image (YouTube/Vimeo)
| Key | Options | Mô tả |
|-----|---------|-------|
| `previewImage` | `"default"` (API), `"custom"` | Lazy load iframe sau khi click preview |
| `previewImageCustom` | image | Custom preview image |

### Overlay / Icon Group
| Key | Mô tả |
|-----|-------|
| `overlay` | Background overlay trên preview image |
| `overlayIcon` | Icon play button |
| `overlayAriaLabel` | aria-label cho play button (accessibility) |
| `overlayIconTypography` | Typography icon (font-size, color) |
| `overlayIconPadding` | Padding icon |
| `overlayIconBackgroundColor` | Background icon |
| `overlayIconBorder` | Border icon |
| `overlayIconBoxShadow` | Shadow icon |

---

## Ví dụ JSON

### YouTube đơn giản
```json
{
  "id": "vidYT",
  "name": "video",
  "parent": "blkMedia",
  "settings": {
    "videoType": "youtube",
    "youTubeId": "dQw4w9WgXcQ",
    "youtubeControls": true,
    "youtubeRel": false
  }
}
```

### YouTube với preview image và icon play
```json
{
  "id": "vidYTPreview",
  "name": "video",
  "parent": "blkMedia",
  "settings": {
    "videoType": "youtube",
    "youTubeId": "dQw4w9WgXcQ",
    "previewImage": "custom",
    "previewImageCustom": {"id": 301, "url": "https://..."},
    "overlayIcon": {"library": "themify", "icon": "ti-control-play"},
    "overlayIconTypography": {"font-size": "48px", "color": {"hex": "#ffffff"}},
    "overlayIconBackgroundColor": {"hex": "rgba(0,124,252,0.8)"},
    "overlayIconBorder": {
      "radius": {"top": "50%", "right": "50%", "bottom": "50%", "left": "50%"}
    },
    "overlayIconPadding": {"top": "16px", "right": "20px", "bottom": "16px", "left": "20px"}
  }
}
```

### Video từ media library
```json
{
  "id": "vidLocal",
  "name": "video",
  "parent": "blkDemo",
  "settings": {
    "videoType": "media",
    "media": {"id": 401, "url": "https://site.com/video.mp4"},
    "fileControls": true,
    "fileLoop": false,
    "videoPoster": {"id": 402, "url": "https://site.com/poster.jpg"}
  }
}
```
