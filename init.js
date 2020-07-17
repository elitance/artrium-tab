const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const head = document.querySelector("head");

function checkMobile() {
    if (mobile.test(navigator.userAgent)) {
        location.replace("blocked.html");
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
    checkBeta();
}

init();
