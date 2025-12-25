var langObj = {};
function labelReplaceCheck() {
    chrome.storage.sync.get(
    {
        tencentChecked: true,
        animal: 'puppy',
        colonThree: true
    },
    (items) => {
        if (!items.tencentChecked) return;
        var animal = items.animal.charAt(0).toUpperCase() + items.animal.slice(1);
        var colonThree = (items.colonThree ? 'ColonThree' : '');
        var A = (items.grammaticallyCorrect ? 'A': '');
        if (animal == 'human') A = '';
        var IAmAnimalTencent = `IAm${A}${animal}${colonThree}Tencent`;

        // I am human -> I am puppy!!! :3
        labelReplace(document.getElementsByClassName('tencent-captcha-dy__robot-left-div')[0], 'IAmHumanTencent', IAmAnimalTencent);
    })
}
labelReplaceCheck();
var tencentInterval = setInterval(labelReplaceCheck, 250);