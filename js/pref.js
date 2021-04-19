const themeRange = document.querySelector("input[type=range]");
const themeIndicator = document.querySelector("#themeI");
const colorForm = document.querySelector("#colorForm");
const imageForm = document.querySelector("#imageForm");

const PREF_LS = "pref";
let pref = {
    theme: themeRange.value,
    txtVisible: true,
    plcVisible: true,
    bgCstm: null
}

function savePref() {
    localStorage.setItem(PREF_LS, JSON.stringify(pref));
}

function clearPref() {
    alert("Delete User Preference","Would you really delete all user preferences?<br>This act cannot be canceled.",true).then((response) => {
        if (response === true) {
            localStorage.removeItem(PREF_LS);
            localStorage.removeItem("bookmark");
            location.reload();
        }
    });
}

function handleBgCstm(event) {
    event.preventDefault();
    const input = event.target.querySelector("input");
    pref.bgCstm = input.value;
    if (pref.bgCstm === "") {
        pref.bgCstm = null;
        alert("Custom Background","Cleared custom background settings.",false);
    } else {
        alert("Custom Background","Saved custom background settings.",false);
    }
    input.value = "";
    savePref();
}

function toggle(element1, element2) {
    element1.classList.toggle("swtBgOn");
    element2.classList.toggle("swtTgOn");
}

function toggleSwitch(event) {
    const swt = event.target;
    function set(element,id,index) {
        if (element.id === id) {
            if (!element.className.includes(" ")) {
                pref[index] = true;
            } else {
                pref[index] = false;
            }
        }
    }
    if (swt.className === "swtBg" || swt.className === "swtBg swtBgOn") {
        const swtTgg = swt.querySelector(".swtTg");
        toggle(swt,swtTgg);
        set(swt,"txtTrb","txtVisible");
        set(swt,"plcTrb","plcVisible");
    } else {
        const swtBg = swt.parentElement;
        toggle(swtBg,swt);
        set(swtBg,"txtTrb","txtVisible");
        set(swtBg,"plcTrb","plcVisible");
    }
    savePref();
}

function switchCstm(event) {
    const option = event.target;
    if (option.innerText === "Set Color") {
        imageForm.style.display = "none";
        colorForm.style.display = "block";
    } else {
        colorForm.style.display = "none";
        imageForm.style.display = "block";
    }
}

function setThemeRange(theme) {
    if (theme === "1") {
        themeIndicator.innerText = "Theme: Acrylic";
        const warn = document.createElement("div");
        warn.innerText = "Acrylic Theme may slow down your device.";
        warn.style.fontSize = "13px";
        themeIndicator.appendChild(warn);
    } else if (theme === "2") {
        themeIndicator.innerText = "Theme: Solid";
        if (themeIndicator.querySelector("div")) {
            themeIndicator.removeChild("div");
        }
    } else {
        themeIndicator.innerText = "Theme: Glass";
        if (themeIndicator.querySelector("div")) {
            themeIndicator.removeChild("div");
        }
    }
}

function getResponse(event) {
    const response = event.target;
    if (response.innerText === "Yes") {
        return true;
    } else {
        return false;
    }
}

function loadPref() {
    const PREF_JSON = JSON.parse(localStorage.getItem(PREF_LS));
    if (PREF_JSON !== null) {
        pref = PREF_JSON;
        themeRange.value = pref.theme;
        setThemeRange(pref.theme);
    }
    if (!pref.txtVisible) {
        const swt = document.querySelector("#txtTrb.swtBg");
        const swtTg= swt.querySelector(".swtTg");
        toggle(swt,swtTg);
    }
    
    if (!pref.plcVisible) {
        const swt = document.querySelector("#plcTrb.swtBg");
        const swtTg = swt.querySelector(".swtTg");
        toggle(swt,swtTg);
    }
}

function init() {
    loadPref();
    const swtBg = document.querySelectorAll(".swtBg");
    const prefDel = document.querySelector("#delPref");
    const cstmBg = document.querySelectorAll("#option button");
    themeRange.addEventListener("input",() => {pref.theme = themeRange.value; console.log("."); setThemeRange(themeRange.value); savePref();});
    swtBg.forEach((swt) => {swt.addEventListener("click",toggleSwitch);});
    prefDel.addEventListener("click", clearPref);
    cstmBg.forEach((option) => {option.addEventListener("click",switchCstm);});
    colorForm.addEventListener("submit",handleBgCstm);
    imageForm.addEventListener("submit",handleBgCstm);
}

init();