function saveBookmark() {
    localStorage.setItem("bookmark", JSON.stringify(bkArr));
}

function addBookmark(url,name) {
    const link = document.createElement("a");
    const id = bkArr.length + 1;
    if (name.length >= 17 && crtBkMnl === true) {
        const answer = confirm("If the name of a bookmark is longer than 17 characters, you might not be able to see the name of the bookmark well.\nWould you continue?");
        if (answer === false) {
            crtBkCnl = true;
            hideBkTab();
            return;
        }
    }
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

function prepBkCrt() {
    event.preventDefault();
    crtBkMnl = true;
    crtBkCnl = false;
    const url = crtBkTab.querySelector("#url");
    const name = crtBkTab.querySelector("#name");
    addBookmark(url.value,name.value);
    if (crtBkCnl === false) {
        alert(`Bookmark successfully created!`);
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