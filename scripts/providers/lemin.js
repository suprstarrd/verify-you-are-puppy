var langObj = {};
function labelReplaceCheck() {
    chrome.storage.sync.get(
    {
        leminChecked: true,
        animal: 'puppy',
        colonThree: true
    },
    (items) => {
        if (!items.leminChecked) return;
        if (document.getElementById('lemin-cropped-captcha')) {
            var animal = items.animal.charAt(0).toUpperCase() + items.animal.slice(1);
            var colonThree = (items.colonThree ? 'ColonThree' : '');
            var A = (items.grammaticallyCorrect ? 'A': '');
            if (animal == 'human') A = '';
            var ImAnimalLemin = `Im${A}${animal}${colonThree}Lemin`;
            var leminLabel = document.getElementById('lemin-cropped-captcha').getElementsByClassName('label')[0];

            // I'm Human -> I'm Puppy!!! :3
            labelReplace(leminLabel, 'ImHumanLemin', ImAnimalLemin);
        }
    })
}
labelReplaceCheck();
var leminInterval = setInterval(labelReplaceCheck, 250);
