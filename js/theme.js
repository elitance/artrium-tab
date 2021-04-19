function changeTheme(themeNo) {
    if (themeNo === "1") {
        cssLink.href = "css/colors/acrylicStyle.css";
    } else if (themeNo === "2") {
        cssLink.href = "css/colors/solidStyle.css";
    } else {
        cssLink.href = "css/colors/transparentStyle.css";
    }
}

function loadTheme() {
    if (PREF_JSON !== null) {
        const loadedTheme = PREF_JSON.theme;
        if (loadedTheme !== null) {
            changeTheme(loadedTheme);
        }
    }
}

function init() {
    loadTheme();
}

init()