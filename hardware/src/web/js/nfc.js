let price = 'loading ...';

const base = 'En attente de la carte';
const animation_tick = 400;

/**
 * Fonction permettant d'annimer le texte de la
 * page de scan nfc durant l'attente du scan
 */
function textAnimation() {
    const text = document.getElementById('textWriter');
    const anim = async () => {
        text.innerHTML = base;
        await delay(animation_tick);
        text.innerHTML = base + '.';
        await delay(animation_tick);
        text.innerHTML = base + '..';
        await delay(animation_tick);
        text.innerHTML = base + '...';
        await delay(animation_tick);
        anim();
    };
    anim();
}

eel.expose(scan_complete);


/**
 * Fonction appellée par python permettant de transférer vers la
 * page de validaton de la commande
 * 
 * @param money quantité d'argent concernée par la transaction
 * @param userID ID de l'utilisateur concerné par la transaction
 * 
 */
function scan_complete(money, userID) {
    goToWithParam('goToValidTransac', '?money=' + money + '&userID=' + userID);
}

eel.expose(scan_cancel);

/**
 * Fonction appellée par python permettant de transférer vers la
 * page d'annulation
 * 
 * @param money quantité d'argent concernée par la transaction
 * @param userID ID de l'utilisateur concerné par la transaction
 * @param reason motif de l'annulation
 * 
 */
function scan_cancel(money, userID, reason) {
    goToWithParam('goToUnvalidTransac', '?money=' + money + '&userID=' + userID + '&reason=' + reason);
}

/**
 * Fonction appelée lorsque la page est entièrement chargée
 */
window.onload = function () {
    // Retreive price from url
    const urlData = parseURLParams(window.location.href);
    price = Object.keys(urlData)[0];
    priceText.innerHTML = (price > 0 ? '+' : '') + getPriceString(price);

    // Start transaction on python side
    eel.start_transaction(price);

    textAnimation();
};

if (parseURLParams(window.location.href)['raspberry'] != undefined)
    document.getElementsByTagName('html')[0].style = 'transform: rotate(180deg);'