var langObj = {};
function labelReplaceCheck() {
    if (location.hostname == 'challenges.cloudflare.com' || location.hostname == 'challenges-staging.cloudflare.com' || location.hostname == 'challenges.cloudflare.com.cn') {
        if (location.pathname.startsWith('/cdn-cgi/challenge-platform/')) {
            chrome.storage.sync.get(
            {
                turnstileChecked: true,
                animal: 'puppy',
                colonThree: true,
                grammaticallyCorrect: false,
                affirmation: 'puppyHeart'
            },
            (items) => {
                if (!items.turnstileChecked) return;

                var animal = items.animal.charAt(0).toUpperCase() + items.animal.slice(1);
                var affirmation = items.affirmation.charAt(0).toUpperCase() + items.affirmation.slice(1);
                var A = (items.grammaticallyCorrect ? 'A': '');
                if (!affirmation.startsWith('Boy') && !affirmation.startsWith('Girl')) {
                    if (animal == 'Human') affirmation = 'Success' 
                    else if (items.affirmation.endsWith('Heart')) affirmation = 'Good' + animal + 'Heart'
                    else affirmation = 'Good' + animal
                }
                if (animal != 'Puppy' && animal != 'Kitty' && animal != 'Robot' && animal != 'Human') {
                    animal = 'Puppy'
                }
                var colonThree = (items.colonThree ? 'ColonThree' : '');
                var VerifyYouAreAnimalCloudflare = `VerifyYouAre${A}${animal}${colonThree}Cloudflare`;
                var GoodAnimalCloudflare = `${affirmation}Cloudflare`;

                // Verify you are human -> Verify you are puppy!!! :3
                labelReplace(safeOpenOrClosedShadowRoot(document.body).querySelector('.cb-lb-t'), 'VerifyYouAreHumanCloudflare', VerifyYouAreAnimalCloudflare);

                // Success! -> Good puppy <3
                labelReplace(safeOpenOrClosedShadowRoot(document.body).getElementById('success-text'), 'SuccessCloudflare', GoodAnimalCloudflare);
            }
            );
        }
    }
}
labelReplaceCheck();
var cloudflareInterval = setInterval(labelReplaceCheck, 250);