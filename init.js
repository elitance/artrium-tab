const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const head = document.querySelector("head");

function checkMobile() {
    const main = document.querySelector("main");
    if (mobile.test(navigator.userAgent)) {
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        if (main === null) {
            cssLink.href = "mobile-main.css";
        } else {
            cssLink.href = "mobile-pref.css";
        }
        head.appendChild(cssLink);
    }
}

function checkBeta() {
    const betaFeature = JSON.parse(localStorage.getItem("beta"));
    if (betaFeature === false) {
        location.replace("https://ldhan0715.github.io/artrium");
    }
}

function init() {
    checkMobile();
    // checkBeta();
}

init();
