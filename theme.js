const cssLink = document.querySelector("link");

function changeTheme(themeNo) {
    if (themeNo === "1") {
        cssLink.href = "acrylicStyle.css";
    } else if (themeNo === "2") {
        cssLink.href = "solidStyle.css";
    } else {
        cssLink.href = "transparentStyle.css";
    }
}

function loadTheme() {
    if (JSON.parse(localStorage.getItem("pref")) !== null) {
        const loadedTheme = JSON.parse(localStorage.getItem("pref")).theme;
        if (loadedTheme !== null) {
            changeTheme(loadedTheme);
        }
    }
}

function init() {
    loadTheme();
}

init()