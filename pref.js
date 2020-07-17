const cssLink = document.querySelector("link");
const themeRange = document.querySelector("#range");
const themeText = document.querySelector("#themeI");
const swtBg = document.querySelectorAll(".swtBg");
const prefDel = document.querySelector("#delPref");
const cstmBgClr = document.querySelectorAll("#option button")[0];
const cstmBgImg = document.querySelectorAll("#option button")[1];
const clrInput = document.querySelector("#colorForm");
const fleInput = document.querySelector("#fileLabel");
let textViewable = true;
let plcViewable = true;
let bgClr = null;

function savePref() {
    localStorage.setItem("theme", themeRange.value);
    localStorage.setItem("textViewable", JSON.stringify(textViewable));
    localStorage.setItem("plcViewable", JSON.stringify(plcViewable));
    localStorage.setItem("bgClr", JSON.stringify(bgClr));
}

function clearPref() {
    const result = confirm("Would you really DELETE ALL USER PREFERENCES?\nThis act deletes all preferences.");
    if (result === true) {
        localStorage.removeItem("theme");
        localStorage.removeItem("textViewable");
        localStorage.removeItem("plcViewable");
        localStorage.removeItem("bookmark");
        localStorage.removeItem("bgClr");
    }
}

function saveBgClr(event) {
    event.preventDefault();
    const input = clrInput.querySelector("input");
    bgClr = input.value;
    if (bgClr === "") {
        bgClr = null
        alert("Cleared Custom Background Preferences.");
    }
    input.value = "";
    savePref();
}

function handleSwtClick(event) {
    const swt = event.target;
    if (swt.className === "swtBg" || swt.className === "swtBg swtBgOn") {
        const swtTgg = swt.querySelector(".swtTg");
        swt.classList.toggle("swtBgOn");
        swtTgg.classList.toggle("swtTgOn");
        if (swt.id === "txtTrb") {
            if (!swt.className.includes(" ")) {
                textViewable = true;
            } else {
                textViewable = false;
            }
        } else if (swt.id === "plcTrb") {
            if (!swt.className.includes(" ")) {
                plcViewable = true;
            } else {
                plcViewable = false;
            }
        }
    } else {
        const swtBg = swt.parentElement;
        swtBg.classList.toggle("swtBgOn");
        swt.classList.toggle("swtTgOn");
        if (swtBg.id === "txtTrb") {
            if (!swt.className.includes(" ")) {
                textViewable = true;
            } else {
                textViewable = false;
            }
        } else if (swtBg.id === "plcTrb") {
            if (!swt.className.includes(" ")) {
                plcViewable = true;
            } else {
                plcViewable = false;
            }
        }
    }
    savePref();
}

function shwCst(event) {
    const opt = event.target;
    if (opt.innerText === "Set Color") {
        fleInput.style.display = "none";
        clrInput.style.display = "block";
    } else {
        clrInput.style.display = "none";
        fleInput.style.display = "block";
    }
}

function loadPref() {
    const theme = localStorage.getItem("theme");
    const JSON_textViewable = JSON.parse(localStorage.getItem("textViewable"));
    const JSON_plcViewable = JSON.parse(localStorage.getItem("plcViewable"));
    const JSON_bgClr = JSON.parse(localStorage.getItem("bgClr"));
    if (theme !== null) {
        themeRange.value = theme;
        if (theme === "1") {
            themeText.innerText = "Theme: Acrylic";
            const warn = document.createElement("div");
            warn.innerText = "Acrylic Theme may slow down your PC.";
            warn.style.fontSize = "13px";
            themeText.appendChild(warn);
        } else if (theme === "2") {
            themeText.innerText = "Theme: Solid";
        } else {
            themeText.innerText = "Theme: Glass";
        }
    }
    if (JSON_textViewable !== null || JSON_plcViewable !== null || JSON_bgClr !== null) {
        textViewable = JSON_textViewable;
        plcViewable = JSON_plcViewable;
        bgClr = JSON_bgClr;

        if (JSON_textViewable === false) {
            const swt = document.querySelector("#txtTrb.swtBg");
            const swtTgg = swt.querySelector(".swtTg");
            swt.classList.toggle("swtBgOn");
            swtTgg.classList.toggle("swtTgOn");
        }

        if (JSON_plcViewable === false) {
            const swt = document.querySelector("#plcTrb.swtBg");
            const swtTgg = swt.querySelector(".swtTg");
            swt.classList.toggle("swtBgOn");
            swtTgg.classList.toggle("swtTgOn");
        }
    }
}

function init() {
    loadPref();
    themeRange.addEventListener("input", () => {
        if (themeRange.value === "1") {
            themeText.innerText = "Theme: Acrylic";
            const warn = document.createElement("div");
            warn.innerText = "Acrylic Theme may slow down your PC.";
            warn.style.fontSize = "13px";
            themeText.appendChild(warn);
        } else if (themeRange.value === "2") {
            themeText.innerText = "Theme: Solid";
            if (themeText.querySelector("div")) {
                themeText.removeChild("div");
            }
        } else {
            themeText.innerText = "Theme: Glass";
            if (themeText.querySelector("div")) {
                themeText.removeChild("div");
            }
        }
        savePref();
    });
    swtBg.forEach((swt) => {
        swt.addEventListener("click", handleSwtClick);
    });
    prefDel.addEventListener("click", clearPref);
    cstmBgClr.addEventListener("click", shwCst);
    cstmBgImg.addEventListener("click", shwCst);
    clrInput.addEventListener("submit", saveBgClr);
}

init();