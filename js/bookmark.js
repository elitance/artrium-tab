function saveBookmark() {
    localStorage.setItem("bookmark", JSON.stringify(bkArr));
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
    const url = crtBkTab.querySelector("#url");
    const name = crtBkTab.querySelector("#name");
    if (name.value.length >= 17) {
        alert("Bookmark","If length of the name is over 17,<br>visibility of it will not be good.<br>Would you continue?",true).then((response) => {
            if (response === false) {
                hideBkTab();
                return;
            } else {
                setTimeout(() => {
                    addBookmark(url.value,name.value);
                    alert("Bookmark","Bookmark successfully created!",false);
                },300);
            }
        });
    } else {
        addBookmark(url.value,name.value);
        alert("Bookmark","Bookmark successfully created!",false);
    }
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