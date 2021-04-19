function handleSearch(event) {
    event.preventDefault();
    var query = searchInput.value;
    if (query[0] === "/") {
        query = query.replace("/", "");
        if (query.includes("https://")) {
            query = query.replace("https://", "");
        } else if (query.includes("http://")) {
            query = query.replace("http://", "");
        }
        location.href = `http://${query}`;
    } else {
        query = query.replace(/ /g, "%20");
        location.href = `https://www.google.com/search?q=${query}`;
    }
}

function loadTextAvailable() {
    if (PREF_JSON !== null) {
        const textViewable = PREF_JSON.txtVisible;
        const plcViewable = PREF_JSON.plcVisible;
        if (textViewable === false) {
            searchInput.style.color = "#353b48";
        } if (plcViewable === false) {
            searchInput.classList.add("sp");
        }
    }
    
}

function init() {
    loadTextAvailable();
    searchForm.addEventListener("submit", handleSearch);
}

init();