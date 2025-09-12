function safeOpenOrClosedShadowRoot(element) {
    if (chrome.dom && chrome.dom.openOrClosedShadowRoot(element)) return chrome.dom.openOrClosedShadowRoot(element)
    else if (element.openOrClosedShadowRoot) return element.openOrClosedShadowRoot
    else return undefined
}

function labelReplace(label, initialText, newText) {
    if (label && label.textContent && label.textContent.includes(initialText)) {
        label.textContent = label.textContent.replaceAll(initialText, newText)
    }
}

function labelReplaceCheck() {
    /* === hCaptcha === */
    if (location.hostname == 'newassets.hcaptcha.com' || location.hostname == 'assets.hcaptcha.com' || location.hostname == 'assets.hcaptcha.com.cn') {
        if (location.pathname.startsWith('/captcha/v1/')) {
            // I am human -> I am puppy!!! :3
            labelReplace(document.getElementById('label'), 'I am human', 'I am puppy!!! :3');
            labelReplace(document.getElementById('a11y-label'), 'I am human', 'I am puppy!!! :3')
        }
    }

    /* === Cloudflare Turnstile === */
    if (location.hostname == 'challenges.cloudflare.com' || location.hostname == 'challenges.cloudflare.com.cn') {
        if (location.pathname.startsWith('/cdn-cgi/challenge-platform/')) {
            // Verify you are human -> Verify you are puppy!!! :3
            labelReplace(safeOpenOrClosedShadowRoot(document.body).querySelector('.cb-lb-t'), 'Verify you are human', 'Verify you are puppy!!! :3');

            // Success! -> Good puppy <3
            labelReplace(safeOpenOrClosedShadowRoot(document.body).getElementById('success-text'), 'Success!', 'Good puppy <3');
        }
    }

    /* === Other CAPTCHAs (where <all_urls> is required) === */
    if (document.getElementById('lemin-cropped-captcha')) {
        var leminLabel = document.getElementById('lemin-cropped-captcha').getElementsByClassName('label')[0]
        // I'm Human -> I'm Puppy!!! :3
        labelReplace(leminLabel, 'I\'m Human', 'I\'m Puppy!!! :3');
    }

    // I am human -> I am puppy!!! :3
    labelReplace(document.getElementsByClassName('tencent-captcha-dy__robot-left-div')[0], 'I am human', 'I am puppy!!! :3');
}
labelReplaceCheck();
setInterval(labelReplaceCheck, 250);