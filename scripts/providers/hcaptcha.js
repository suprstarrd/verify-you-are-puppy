var langObj = {};
function labelReplaceCheck() {
    if (location.hostname == 'newassets.hcaptcha.com' || location.hostname == 'assets.hcaptcha.com' || location.hostname == 'assets.hcaptcha.com.cn') {
        if (location.pathname.startsWith('/captcha/v1/')) {
            chrome.storage.sync.get(
            {
                hcaptchaChecked: true,
                animal: 'puppy',
                colonThree: true,
                grammaticallyCorrect: false
            },
            (items) => {
                if (!items.hcaptchaChecked) return;
                var animal = items.animal.charAt(0).toUpperCase() + items.animal.slice(1);
                var colonThree = (items.colonThree ? 'ColonThree' : '');
                var A = (items.grammaticallyCorrect ? 'A': '');
                if (animal == 'human') A = '';
                var IAmAnimalHCaptcha = `IAm${A}${animal}${colonThree}HCaptcha`;

                // I am human -> I am puppy!!! :3
                labelReplace(document.getElementById('label'), 'IAmHumanHCaptcha', IAmAnimalHCaptcha);
                labelReplace(document.getElementById('a11y-label'), 'IAmHumanHCaptcha', IAmAnimalHCaptcha);
            })
        }
    }
}
labelReplaceCheck();
var hcaptchaInterval = setInterval(labelReplaceCheck, 250);