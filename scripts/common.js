function isValidChromeRuntime() {
    return chrome.runtime && !!chrome.runtime.getManifest();
}
function safeOpenOrClosedShadowRoot(element) {
    try {
        if (chrome.dom && chrome.dom.openOrClosedShadowRoot(element)) return chrome.dom.openOrClosedShadowRoot(element)
        else if (element.openOrClosedShadowRoot) return element.openOrClosedShadowRoot
        else return undefined
    } catch (e) {
        try {
            if (isValidChromeRuntime()) console.error(e);
            else window.location.reload();
        } catch {
            window.location.reload();
        }
    }
}
function labelReplace(label, initialTextName, newTextName) {
    if (label && label.textContent) {
        chrome.i18n.detectLanguage(label.textContent)
        .then((result) => {
            for (i = 0; i < result.languages.length; i++) {
                var defaultLang = chrome.runtime.getManifest()['default_locale'] || "en";
                var lang = result.languages[i].language;
                if (!(langObj[lang])) {
                    if (lang == "und") lang = defaultLang;
                    fetch(chrome.runtime.getURL(`_locales/${lang}/messages.json`))
                    .then((response) => response.json())
                    .then((data) => langObj[lang] = data)
                    .catch(() => {
                        if (!(langObj[defaultLang])) {
                            fetch(chrome.runtime.getURL(`_locales/${defaultLang}/messages.json`))
                            .then((response) => response.json())
                            .then((data) => langObj[defaultLang] = data)
                        }
                        langObj[lang] = langObj[defaultLang]
                    })
                }
                if (langObj[lang]) {
                    var initialText = langObj[lang][initialTextName]['message'];
                    var newText = langObj[lang][newTextName]['message'];
                    if (label && label.textContent && label.textContent.includes(initialText)) {
                        label.textContent = label.textContent.replaceAll(initialText, newText)
                    }
                }
            }
        })
    }
}