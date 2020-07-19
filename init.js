const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const PREF_JSON = JSON.parse(localStorage.getItem("pref"));

function checkMobile() {
    if (mobile.test(navigator.userAgent)) {
        location.replace("blocked.html");
    }
}

function init() {
    checkMobile();
}

init();
