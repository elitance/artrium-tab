function saveBookmark() {
    localStorage.setItem("bookmark", JSON.stringify(bkArr));
}

function poper(headerTxt, descTxt, option) {
    return new Promise((resolve, reject) => {
        const poper = document.querySelector("#poper");
        const header = poper.querySelector("h2");
        const buttonDiv = poper.querySelector("div");
        const desc = poper.querySelector("span");
        header.innerText = headerTxt;
        desc.innerHTML = descTxt;

        const yBtn = buttonDiv.querySelectorAll("button")[0];
        yBtn.addEventListener("click", (event) => {poper.style.transform = "translateY(-300px)"; resolve(true);});
        
        const nBtn = buttonDiv.querySelectorAll("button")[1];
        nBtn.addEventListener("click", (event) => {poper.style.transform = "translateY(-300px)"; resolve(false);});

        if (option === false) {
            nBtn.style.display = "none";
        } else {
            nBtn.style.display = "block";
        }

        poper.style.transform = "none";
        setTimeout(() => {poper.style.transform = "translateY(-300px)"; resolve(false);},10000);
    });
}

function addBookmark(url,name) {
    const link = document.createElement("a");
    const id = bkArr.length + 1;
    link.href = url;
    link.innerText = name;
    link.classList.add("bookmark");
    link.id = id;
    link.style.order = id;
    bkList.appendChild(link);
    const bookmarkObject = {
        url: url,
        name: name,
        id: id
    }
    bkArr.push(bookmarkObject);
    saveBookmark();
    hideBkTab();
}

function removeBookmark(event) {
    event.preventDefault();
    const bookmark = event.target;
    bkList.removeChild(bookmark);
    const filtered = bkArr.filter((bmk) => {
        return bmk.id !== parseInt(bookmark.id);
    })
    bkArr = filtered;
    saveBookmark();
}

function showBkTab() {
    crtBkTab.style.transform = "translateY(25vh)";
}

function hideBkTab() {
    const url = crtBkTab.querySelector("#url");
    const name = crtBkTab.querySelector("#name");
    crtBkTab.style.transform = "translateY(130vh)";
    url.value = "";
    name.value = "";
}

function prepBkCrt(event) {
    event.preventDefault();
    crtBkCnl = false;
    const url = crtBkTab.querySelector("#url");
    const name = crtBkTab.querySelector("#name");
    if (name.value.length >= 17) {
        poper("Bookmark","length too long",false);
    }
    addBookmark(url.value,name.value);
    if (crtBkCnl === false) {
        poper("Bookmark","Bookmark successfully created!",false);
    }
    url.value = "";
    name.value = "";
}

function loadBookmark() {
    const loadedBookmarks = JSON.parse(localStorage.getItem("bookmark"));
    if (loadedBookmarks !== null) {
        loadedBookmarks.forEach((bookmark) => {
            addBookmark(bookmark.url, bookmark.name);
        })
    }
}

function init() {
    loadBookmark();
    const crtBkBtn = document.querySelector("#crtBkBtn");
    const cnlCrtBk = document.querySelector("#cnlCrtBk");
    let bookmarks;
    setTimeout(() => {crtBkTab.style.transition = "all .8s";},1500);
    crtBkBtn.addEventListener("click",showBkTab);
    cnlCrtBk.addEventListener("click",hideBkTab);
    crtBkTab.addEventListener("submit", prepBkCrt);
    setInterval(function() {
        const textViewable = JSON.parse(localStorage.getItem("textViewable"));
        bookmarks = document.querySelectorAll(".bookmark");
        bookmarks.forEach((bookmark) => {
            bookmark.addEventListener("contextmenu", removeBookmark);
        });
        if (textViewable === false) {
            bookmarks.forEach((bookmark) => {
                bookmark.style.color = "#353b48";
            });
        }
        if (bkArr.length >= 10) {
            crtBkBtn.style.display = "none";
        } else {
            crtBkBtn.style.display = "block";
        }
    }, 100);
}

init();