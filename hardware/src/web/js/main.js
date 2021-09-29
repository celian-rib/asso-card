const gotTo = (url) => window.location.replace(url);

if (document.getElementById("helloWorldButton"))
    document.getElementById("helloWorldButton").addEventListener("click", () => { eel.hello_world() }, false);

if (document.getElementById("goToScan"))
    document.getElementById("goToScan").addEventListener("click", () => { gotTo('./pages/scan.html') }, false);

if (document.getElementById("goToStats"))
    document.getElementById("goToStats").addEventListener("click", () => { gotTo('./pages/stats.html') }, false);

if (document.getElementById("goToHome"))
    document.getElementById("goToHome").addEventListener("click", () => { gotTo('../index.html') }, false);

if (document.getElementById("goBackToScan"))
    document.getElementById("goBackToScan").addEventListener("click", () => { gotTo('./scan.html') }, false);

    

eel.expose(prompt_alerts);

function prompt_alerts(description) {
    alert(description);
}

eel.expose(get_current_url)

function get_current_url() {
    console.log(window.location.href);
    return window.location.href;
}