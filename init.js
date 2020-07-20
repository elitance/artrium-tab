function checkMobile() {
    if (mobile.test(navigator.userAgent)) {
        location.replace("blocked.html");
    }
}

function init() {
    checkMobile();
}

init();