let price = "loading ...";

const base = "En attente de la carte";
const delay = 200;

const showPrice = (price) => {
    if ((price / 100) % 1 != 0) {
        //decimal number
        document.getElementById("priceText").innerHTML = (price > 0 ? "+" : "") + (price / 100) + "0€"
    } else {
        // non decimal number
        document.getElementById("priceText").innerHTML = (price > 0 ? "+" : "") + (price / 100) + ".00€"
    }
}

window.onload = function() {
    // fonctionnement du bouton retour
    if (document.getElementById("imgBack")) {
        document.getElementById("imgBack").addEventListener("click", () => { gotTo('../index.html') }, false);
    }

    console.log(window.location.href)
    const urlData = parseURLParams(window.location.href);
    price = Object.keys(urlData)[0];
    showPrice(price);

    // appel de la fonction de scan de carte
    eel.await_card_scan(price);

    const text = document.getElementById("textWriter");
    const anim = () => {
        text.innerHTML = base
        setTimeout(() => {
            text.innerHTML = base + "."
            setTimeout(() => {
                text.innerHTML = base + ".."
                setTimeout(() => {
                    text.innerHTML = base + "..."
                    setTimeout(() => {
                        anim()
                    }, delay)
                }, delay)
            }, delay)
        }, delay)
    }
    anim()
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {},
        i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

eel.expose(scan_complete)

function scan_complete(money, userID) {
    window.location.replace("../pages/validTransac.html?money=" + money + "&userID=" + userID);
}

eel.expose(scan_cancel)

function scan_cancel(money, userID, reason) {
    window.location.replace("../pages/unvalidTransac.html?money=" + money + "&userID=" + userID + "&reason=" + reason);
}