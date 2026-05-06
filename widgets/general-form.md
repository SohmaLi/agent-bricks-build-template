# Widget: `form`

> **Source:** `bricks/includes/elements/form.php`
> **Category:** general | **Tag:** `form` | **Scripts:** bricksForm

Widget form đa năng với nhiều field types, actions, và spam protection.

---

## Field Types

| Type | Mô tả |
|------|-------|
| `email` | Email input |
| `text` | Text input |
| `textarea` | Multi-line textarea |
| `tel` | Phone number |
| `number` | Số học |
| `url` | URL input |
| `checkbox` | Checkbox (multi-select) |
| `select` | Dropdown |
| `radio` | Radio buttons |
| `file` | File upload |
| `datepicker` | Date picker (Flatpickr) |
| `password` | Password |
| `rememberme` | Remember me checkbox |
| `html` | HTML nội dung trang trí |
| `hidden` | Hidden field |

---

## Field Sub-keys (fields repeater)

| Sub-key | Mô tả |
|---------|-------|
| `type` | Loại field (xem bảng trên) |
| `label` | Label |
| `placeholder` | Placeholder |
| `name` | HTML `name` attribute |
| `value` | Giá trị mặc định |
| `required` | Bắt buộc hay không |
| `width` | Width theo % (0-100) |
| `height` | Height (textarea only) |
| `resize` | Resize: `none`, `vertical`, `horizontal`, `both` (textarea) |
| `options` | Tùy chọn (1 dòng/option) cho checkbox, select, radio |
| `maxLength` | Số ký tự tối đa |
| `errorMessage` | Custom error message |
| `fileUploadLimit` | Số file tối đa |
| `fileUploadSize` | Size tối đa (MB) |
| `fileUploadAllowedTypes` | Loại file cho phép: `"pdf,jpg,png"` |
| `isHoneypot` | Bật honeypot anti-spam |

---

## Form Level Settings

### Fields group
| Key | Mô tả |
|-----|-------|
| `showLabels` | Hiện label |
| `requiredAsterisk` | Hiện dấu * |
| `labelTypography` | Typography `label` |
| `placeholderTypography` | Typography `::placeholder` |
| `fieldMargin` | Spacing `.form-group` |
| `fieldPadding` | Padding `input`, `select`, `textarea` |

### Submit Button group
| Key | Mô tả |
|-----|-------|
| `submitText` | Text nút submit |
| `submitStyle` | Style: `primary`, `secondary`, `outline-dark`, ... |
| `submitSize` | Size: `sm`, `md`, `lg`, `xl` |
| `submitWidth` | Width nút |

### Actions group
| Key | Options | Mô tả |
|-----|---------|-------|
| `actions` | `email`, `redirect`, `mailchimp`, `sendgrid`, `registration`, `login`, `lost-password`, `reset-password`, `save-submission` | Actions sau khi submit |

### Email action
| Key | Mô tả |
|-----|-------|
| `emailTo` | Địa chỉ nhận — dùng `"admin_email"` để gửi về email admin WordPress |
| `emailSubject` | Tiêu đề email |
| `emailContent` | Nội dung (support {field_name} tags) |
| `emailHeaders` | Custom headers |
| `htmlEmail` | `true` — gửi email dạng HTML |
| `fromName` | Tên người gửi hiển thị |
| `successMessage` | Thông báo khi submit thành công |
| `emailErrorMessage` | Thông báo khi gửi email lỗi |

### Redirect action
| Key | Mô tả |
|-----|-------|
| `redirect` | URL redirect sau submit thành công |

### Spam Protection
| Key | Mô tả |
|-----|-------|
| `enableRecaptcha` | Bật Google reCAPTCHA |
| `enableHCaptcha` | Bật hCaptcha |
| `enableTurnstile` | Bật Cloudflare Turnstile |

---

## Ví dụ JSON

### Form liên hệ cơ bản
```json
{
  "id": "frmContact",
  "name": "form",
  "parent": "ctnContact",
  "settings": {
    "fields": [
      {
        "id": "abc123",
        "type": "text",
        "label": "Họ và tên",
        "placeholder": "Nhập họ và tên",
        "name": "full_name",
        "required": true,
        "width": 100
      },
      {
        "id": "def456",
        "type": "email",
        "label": "Email",
        "placeholder": "Nhập email",
        "name": "email",
        "required": true,
        "width": 50
      },
      {
        "id": "ghi789",
        "type": "tel",
        "label": "Số điện thoại",
        "placeholder": "Nhập số điện thoại",
        "name": "phone",
        "width": 50
      },
      {
        "id": "jkl012",
        "type": "textarea",
        "label": "Nội dung",
        "placeholder": "Nội dung cần tư vấn...",
        "name": "message",
        "required": true,
        "height": "120px",
        "width": 100
      }
    ],
    "showLabels": true,
    "actions": ["email"],
    "emailTo": "admin@site.com",
    "emailSubject": "Liên hệ mới từ website",
    "submitText": "Gửi yêu cầu",
    "submitStyle": "primary",
    "fieldMargin": {"bottom": "16px"}
  }
}
```

### Form đăng ký
```json
{
  "id": "frmRegister",
  "name": "form",
  "parent": "ctnSignup",
  "settings": {
    "fields": [
      {
        "id": "usr001",
        "type": "text",
        "label": "Username",
        "name": "user_login",
        "required": true
      },
      {
        "id": "usr002",
        "type": "email",
        "label": "Email",
        "name": "user_email",
        "required": true
      },
      {
        "id": "usr003",
        "type": "password",
        "label": "Password",
        "name": "user_pass",
        "required": true
      }
    ],
    "actions": ["registration"],
    "submitText": "Đăng ký tài khoản"
  }
}
```
