chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == 'install') chrome.runtime.openOptionsPage();
})

var turnstilePermissions = {
    origins: [
        "https://challenges.cloudflare.com/cdn-cgi/challenge-platform/*",
        "https://challenges-staging.cloudflare.com/cdn-cgi/challenge-platform/*",
        "https://challenges.cloudflare-cn.com/cdn-cgi/challenge-platform/*"
    ]
}

if (!chrome.action) chrome.action = chrome.browserAction;
chrome.action.onClicked.addListener((details) => {
    var tab = chrome.tabs.get(details.id);
    console.log(tab.url, chrome.runtime.getURL('missing_permissions.html'))
    if (!(tab.url == chrome.runtime.getURL('missing_permissions.html'))) {
        if (chrome.runtime.getURL(chrome.runtime.getManifest()['options_page'])) chrome.runtime.openOptionsPage();
        return;
    }
    let turnstilePermissions = false;
    let hCaptchaPermissions = false;
    let allURLPermissions = false;
    chrome.permissions.contains({ origins: [ "<all_urls>" ]}, (hasPermissions) => {
        if (hasPermissions) {
            allURLPermissions = true;
            if (!items.leminChecked && !items.tencentChecked) {
                allURLPermissions = false;
                chrome.permissions.remove({ "origins": [ "<all_urls>" ] })
            }
        }
    })
    if (allURLPermissions && (items.leminChecked || items.tencentChecked)) {
        chrome.permissions.request({ origins: [ "<all_urls>" ]})
    }
    // chrome.permissions.contains({ origins: [ turnstilePermissions ]}, (hasPermissions) => {
    //     if (hasPermissions) {
    //         if (!items.leminChecked && !items.tencentChecked) chrome.permissions.remove({ "origins": [ "<all_urls>" ] })
    //     } else {
    //         if ((items.leminChecked || items.tencentChecked) && !permissionsCurrentlyRequestedOnPage) {
    //             permissionsCurrentlyRequestedOnPage = true;
    //             chrome.permissions.request({ origins: [ "<all_urls>" ]})
    //         }
    //     }
    // })
    chrome.permissions.request(turnstilePermissions, (isGranted) => {
        console.log(isGranted)
    })
})

chrome.permissions.onRemoved.addListener((permissions) => {
    console.log(permissions);
})