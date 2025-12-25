var chromeExtensionsIcon = ``
var braveExtensionsIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M14.338 19.333H18c.46 0 .833-.373.833-.833v-2.134c0-.46.373-.834.834-.834a1.667 1.667 0 0 0 0-3.333.833.833 0 0 1-.834-.833V6A.833.833 0 0 0 18 5.167h-3.333a.833.833 0 0 1-.834-.834 1.667 1.667 0 1 0-3.333 0c0 .46-.373.834-.833.834H5.5A.833.833 0 0 0 4.667 6v2.605a3.335 3.335 0 0 1 0 6.457V18.5c0 .46.373.833.833.833h2.305a3.334 3.334 0 0 1 6.533 0M20.5 18.5A2.5 2.5 0 0 1 18 21h-4.434a.833.833 0 0 1-.832-.888l.004-.112a1.667 1.667 0 1 0-3.33.112.833.833 0 0 1-.831.888H5.5A2.5 2.5 0 0 1 3 18.5v-4.167c0-.46.373-.833.833-.833a1.667 1.667 0 0 0 0-3.333A.833.833 0 0 1 3 9.333V6a2.5 2.5 0 0 1 2.5-2.5h3.438a3.335 3.335 0 0 1 6.457 0H18A2.5 2.5 0 0 1 20.5 6v4.637a3.335 3.335 0 0 1 0 6.457z" clip-rule="evenodd"/></svg>`
var edgeExtensionsIcon = `<svg width="14" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3C10.3096 3 9.75 3.55964 9.75 4.25V5H6.5C6.22386 5 6 5.22386 6 5.5V8.75H5.25C4.55964 8.75 4 9.30964 4 10C4 10.6904 4.55964 11.25 5.25 11.25H6V14.5C6 14.7761 6.22386 15 6.5 15H9.75V15.75C9.75 16.4404 10.3096 17 11 17C11.6904 17 12.25 16.4404 12.25 15.75V15H15.5C15.7761 15 16 14.7761 16 14.5V12.25H15.25C14.0074 12.25 13 11.2426 13 10C13 8.75736 14.0074 7.75 15.25 7.75H16V5.5C16 5.22386 15.7761 5 15.5 5H12.25V4.25C12.25 3.55964 11.6904 3 11 3ZM8.76373 4C8.88809 2.87501 9.84186 2 11 2C12.1581 2 13.1119 2.87501 13.2363 4H15.5C16.3284 4 17 4.67157 17 5.5V8.75H15.25C14.5596 8.75 14 9.30964 14 10C14 10.6904 14.5596 11.25 15.25 11.25H17V14.5C17 15.3284 16.3284 16 15.5 16H13.2363C13.1119 17.125 12.1581 18 11 18C9.84186 18 8.88809 17.125 8.76373 16H6.5C5.67157 16 5 15.3284 5 14.5V12.2363C3.87501 12.1119 3 11.1581 3 10C3 8.84186 3.87501 7.88809 5 7.76373V5.5C5 4.67157 5.67157 4 6.5 4H8.76373Z" fillrule="nonzero"></path></svg>`
var vivaldiExtensionsIcon = ``;
var oculusExtensionsIcon = ``;

const saveOptions = () => {
    const turnstileChecked = document.getElementById('turnstile').checked;
    const hcaptchaChecked = document.getElementById('hcaptcha').checked;
    const leminChecked = document.getElementById('lemin').checked;
    const tencentChecked = document.getElementById('tencent').checked;

    chrome.storage.sync.set(
        {
            turnstileChecked: turnstileChecked,
            hcaptchaChecked: hcaptchaChecked,
            leminChecked: leminChecked,
            tencentChecked: tencentChecked
        },
        () => {
            restoreOptions();
        }
    );
};

let permissionsCurrentlyRequestedOnPage = false;
const restoreOptions = () => {
    chrome.storage.sync.get(
        {
            turnstileChecked: true,
            hcaptchaChecked: true,
            leminChecked: false,
            tencentChecked: false,
            animal: 'puppy'
        },
        (items) => {          
            document.getElementById('hcaptcha').checked = items.hcaptchaChecked;
            document.getElementById('lemin').checked = items.leminChecked;
            document.getElementById('tencent').checked = items.tencentChecked;

            document.getElementsByClassName("icon")[0].src = `icons/${items.animal}/512.png`;
            document.querySelector("link[rel~='icon']").href = `icons/${items.animal}/512.png`;
        }
    );
};

document.addEventListener('DOMContentLoaded', () => {
    document.title = chrome.i18n.getMessage('MissingPermissions');
    
    document.getElementById('turnstileLabel').textContent = chrome.i18n.getMessage('CloudflareTurnstile');
    document.getElementById('hCaptchaLabel').textContent = chrome.i18n.getMessage('HCaptcha');
    document.getElementById('leminLabel').textContent = chrome.i18n.getMessage('LeminCaptcha');
    document.getElementById('tencentLabel').textContent = chrome.i18n.getMessage('TencentCloudCaptcha');

    document.getElementById('turnstile').addEventListener('change', saveOptions);
    document.getElementById('hcaptcha').addEventListener('change', saveOptions);
    document.getElementById('lemin').addEventListener('change', saveOptions);
    document.getElementById('tencent').addEventListener('change', saveOptions);
    restoreOptions();
});

setInterval(restoreOptions, 250);
