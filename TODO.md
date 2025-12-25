# TODO
* Finish moving away from content scripts in manifest to service workers / background pages
* Get existing localized strings for hCaptcha, Turnstile, and Tencent
* Add icons for robot and human

```json
    "content_scripts": [
        {
            "js": ["scripts/common.js", "scripts/providers/hcaptcha.js"],
            "all_frames": true,
            "matches": [
                "https://newassets.hcaptcha.com/captcha/v1/*",
                "https://assets.hcaptcha.com/captcha/v1/*",
                "https://assets.hcaptcha.com.cn/captcha/v1/*"
            ]
        },
        {
            "js": ["scripts/common.js", "scripts/providers/cloudflare.js"],
            "all_frames": true,
            "matches": [
                "https://challenges.cloudflare.com/cdn-cgi/challenge-platform/*",
                "https://challenges-staging.cloudflare.com/cdn-cgi/challenge-platform/*",
                "https://challenges.cloudflare-cn.com/cdn-cgi/challenge-platform/*"
            ]
        },
        {
            "js": ["scripts/common.js", "scripts/providers/lemin.js"],
            "matches": [
                "<all_urls>"
            ]
        },
        {
            "js": ["scripts/common.js", "scripts/providers/tencent.js"],
            "matches": [
                "<all_urls>"
            ]
        }
    ],
```