const showPrice = (element, price) => {
    if ((price / 100) % 1 != 0) {
        //decimal number
        element.innerHTML = (price / 100) + "0€"
    } else {
        // non decimal number
        element.innerHTML = (price / 100) + ".00€"
    }
}

window.onload = function() {
    const urlData = parseURLParams(window.location.href);
    const price = urlData["money"][0];
    const userId = urlData["userID"][0];

    showPrice(document.getElementById("accountMoney"), price);
    document.getElementById("clientNum").innerHTML = userId;
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