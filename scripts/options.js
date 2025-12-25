
const saveOptions = () => {
    const turnstileChecked = document.getElementById('turnstile').checked;
    const hcaptchaChecked = document.getElementById('hcaptcha').checked;
    const leminChecked = document.getElementById('lemin').checked;
    const tencentChecked = document.getElementById('tencent').checked;
    const animal = document.getElementById('animal').value;
    const colonThree = document.getElementById('colonThree').checked;
    const grammaticallyCorrect = document.getElementById('grammaticallyCorrect').checked;
    const affirmation = document.getElementById('affirmation').value;

    chrome.storage.sync.set(
        {
            turnstileChecked: turnstileChecked,
            hcaptchaChecked: hcaptchaChecked,
            leminChecked: leminChecked,
            tencentChecked: tencentChecked,
            animal: animal,
            colonThree: colonThree,
            grammaticallyCorrect: grammaticallyCorrect,
            affirmation: affirmation
        },
        () => {
            restoreOptions();
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(
        {
            turnstileChecked: true,
            hcaptchaChecked: true,
            leminChecked: false,
            tencentChecked: false,
            animal: 'puppy',
            colonThree: true,
            grammaticallyCorrect: false,
            affirmation: 'puppyHeart'
        },
        (items) => {
            document.getElementById('hcaptcha').checked = items.hcaptchaChecked;
            document.getElementById('lemin').checked = items.leminChecked;
            document.getElementById('tencent').checked = items.tencentChecked;
            document.getElementById('animal').value = items.animal;
            document.getElementById('colonThree').checked = items.colonThree;
            document.getElementById('grammaticallyCorrect').checked = items.grammaticallyCorrect;
            document.getElementById('affirmation').value = items.affirmation;

            if (items.animal == 'puppy') {
                document.getElementById('goodPuppyLabel').hidden = false;
                document.getElementById('goodPuppyHeartLabel').hidden = false;
                document.getElementById('goodKittyLabel').hidden = true;
                document.getElementById('goodKittyHeartLabel').hidden = true;
                document.getElementById('goodRobotLabel').hidden = true;
                document.getElementById('goodRobotHeartLabel').hidden = true;
            } else if (items.animal == 'kitty') {
                document.getElementById('goodPuppyLabel').hidden = true;
                document.getElementById('goodPuppyHeartLabel').hidden = true;
                document.getElementById('goodKittyLabel').hidden = false;
                document.getElementById('goodKittyHeartLabel').hidden = false;
                document.getElementById('goodRobotLabel').hidden = true;
                document.getElementById('goodRobotHeartLabel').hidden = true;
            } else if (items.animal == 'robot') {
                document.getElementById('goodPuppyLabel').hidden = true;
                document.getElementById('goodPuppyHeartLabel').hidden = true;
                document.getElementById('goodKittyLabel').hidden = true;
                document.getElementById('goodKittyHeartLabel').hidden = true;
                document.getElementById('goodRobotLabel').hidden = false;
                document.getElementById('goodRobotHeartLabel').hidden = false;
            } else if (items.animal == 'human') {
                document.getElementById('goodPuppyLabel').hidden = true;
                document.getElementById('goodPuppyHeartLabel').hidden = true;
                document.getElementById('goodKittyLabel').hidden = true;
                document.getElementById('goodKittyHeartLabel').hidden = true;
                document.getElementById('goodRobotLabel').hidden = true;
                document.getElementById('goodRobotHeartLabel').hidden = true;
            }
            if (!chrome.action) chrome.action = chrome.browserAction;
            chrome.action.setIcon({ 
                path: {
                    "512": `icons/${items.animal}/512.png`,
                    "256": `icons/${items.animal}/256.png`,
                    "192": `icons/${items.animal}/192.png`,
                    "128": `icons/${items.animal}/128.png`,
                    "96": `icons/${items.animal}/96.png`,
                    "72": `icons/${items.animal}/72.png`,
                    "64": `icons/${items.animal}/64.png`,
                    "48": `icons/${items.animal}/48.png`,
                    "32": `icons/${items.animal}/32.png`,
                    "16": `icons/${items.animal}/16.png`
                }
            });
            document.querySelector("link[rel~='icon']").href = `icons/${items.animal}/512.png`;
            if (!items.affirmation.startsWith('boy') && !items.affirmation.startsWith('girl')) {
                if (items.animal == 'human') document.getElementById('affirmation').value = 'success' 
                else if (items.affirmation.endsWith('Heart')) document.getElementById('affirmation').value = items.animal + 'Heart'
                else document.getElementById('affirmation').value = items.animal
            }
            if (items.turnstileChecked == false) document.getElementById('affirmationTurnstile').hidden = true;
            else document.getElementById('affirmationTurnstile').hidden = false;

            let missingPermissionsPageOpened = false;
            var turnstilePermissions = {
                origins: [
                    "https://challenges.cloudflare.com/cdn-cgi/challenge-platform/*",
                    "https://challenges-staging.cloudflare.com/cdn-cgi/challenge-platform/*",
                    "https://challenges.cloudflare-cn.com/cdn-cgi/challenge-platform/*"
                ]
            }
            chrome.permissions.contains({ origins: [ "<all_urls>" ] }, (hasPermissions) => {
                console.log(hasPermissions, items.leminChecked, items.tencentChecked);
                if (hasPermissions) {
                    if (!items.leminChecked && !items.tencentChecked) chrome.permissions.remove({ "origins": [ "<all_urls>" ] })
                } else {
                    if ((items.leminChecked || items.tencentChecked) && !missingPermissionsPageOpened) {
                        missingPermissionsPageOpened = true;
                        window.open(chrome.runtime.getURL('missing_permissions.html'), 'missingPermissionsTab').focus();
                    }
                }
            })
            chrome.permissions.contains(turnstilePermissions, (hasPermissions) => {
                console.log(hasPermissions, items.turnstileChecked);
                if (hasPermissions) {
                    if (!items.turnstileChecked) chrome.permissions.remove(turnstilePermissions)
                } else {
                    if (items.turnstileChecked && !missingPermissionsPageOpened) {
                        missingPermissionsPageOpened = true;
                        window.open(chrome.runtime.getURL('missing_permissions.html'), 'missingPermissionsTab').focus();
                    }
                }
            })
        }
    );
    document.getElementById('options').hidden = false;
};

document.addEventListener('DOMContentLoaded', () => {
    document.title = chrome.i18n.getMessage('Options');

    if (document.getElementById('chooseCaptcha')) document.getElementById('chooseCaptcha').textContent = chrome.i18n.getMessage('ChooseCaptcha');
    if (document.getElementById('turnstileLabel')) document.getElementById('turnstileLabel').textContent = chrome.i18n.getMessage('CloudflareTurnstile');
    document.getElementById('hCaptchaLabel').textContent = chrome.i18n.getMessage('HCaptcha');
    document.getElementById('leminLabel').textContent = chrome.i18n.getMessage('LeminCaptcha');
    document.getElementById('tencentLabel').textContent = chrome.i18n.getMessage('TencentCloudCaptcha');
    document.getElementById('animalLabel').textContent = chrome.i18n.getMessage('ChooseAnAnimal');
    document.getElementById('puppyLabel').textContent = chrome.i18n.getMessage('Puppy');
    document.getElementById('kittyLabel').textContent = chrome.i18n.getMessage('Kitty');
    document.getElementById('robotLabel').textContent = chrome.i18n.getMessage('Robot');
    document.getElementById('humanLabel').textContent = chrome.i18n.getMessage('Human');
    document.getElementById('affirmationLabel').textContent = chrome.i18n.getMessage('ChooseAffirmation');
    document.getElementById('goodPuppyLabel').textContent = chrome.i18n.getMessage('GoodPuppyCloudflare');
    document.getElementById('goodPuppyHeartLabel').textContent = chrome.i18n.getMessage('GoodPuppyHeartCloudflare');
    document.getElementById('goodKittyLabel').textContent = chrome.i18n.getMessage('GoodKittyCloudflare');
    document.getElementById('goodKittyHeartLabel').textContent = chrome.i18n.getMessage('GoodKittyHeartCloudflare');
    document.getElementById('goodRobotLabel').textContent = chrome.i18n.getMessage('GoodRobotCloudflare');
    document.getElementById('goodRobotHeartLabel').textContent = chrome.i18n.getMessage('GoodRobotHeartCloudflare');
    document.getElementById('goodBoyLabel').textContent = chrome.i18n.getMessage('GoodBoyCloudflare');
    document.getElementById('goodBoyHeartLabel').textContent = chrome.i18n.getMessage('GoodBoyHeartCloudflare');
    document.getElementById('goodGirlLabel').textContent = chrome.i18n.getMessage('GoodGirlCloudflare');
    document.getElementById('goodGirlHeartLabel').textContent = chrome.i18n.getMessage('GoodGirlHeartCloudflare');
    document.getElementById('successLabel').textContent = chrome.i18n.getMessage('SuccessCloudflare');
    document.getElementById('colonThreeLabel').textContent = chrome.i18n.getMessage('ColonThree');
    document.getElementById('grammaticallyCorrectLabel').textContent = chrome.i18n.getMessage('GrammaticallyCorrect');

    document.getElementById('turnstile').addEventListener('change', saveOptions);
    document.getElementById('hcaptcha').addEventListener('change', saveOptions);
    document.getElementById('lemin').addEventListener('change', saveOptions);
    document.getElementById('tencent').addEventListener('change', saveOptions);
    document.getElementById('animal').addEventListener('change', saveOptions);
    document.getElementById('colonThree').addEventListener('change', saveOptions);
    document.getElementById('grammaticallyCorrect').addEventListener('change', saveOptions);
    document.getElementById('affirmation').addEventListener('change', saveOptions);
    restoreOptions();
});
