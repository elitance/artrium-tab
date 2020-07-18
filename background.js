const body = document.querySelector("body");
const date = new Date();
const month = date.getMonth();
const bgCustom = JSON.parse(localStorage.getItem("bgCstm"));
let random = Math.floor(Math.random() * 7);

const dateQuery = {
    citys: {
        0: "antartica",
        1: "london",
        2: "paris",
        3: "new york",
        4: "berlin",
        5: "rome",
        6: "venice"
    },
    arts: {
        0: "interior",
        1: "nature",
        2: "business",
        3: "minimal",
        4: "technology",
        5: "architecture",
        6: "fashion"
    }
}

const accessCode = "3CVHz8RtTUrydWpPKmbmNGlOBnZ4zxn6k2YvNn-bjPw";
let query;

if (month % 2 === 0) {
    query = dateQuery.citys[random];
} else {
    query = dateQuery.arts[random];
}

random = Math.floor(Math.random() * 5);

function bringPhoto() {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${random}&client_id=${accessCode}`).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        random = Math.floor(Math.random() * 30);
        const imgURL = json.results[random].urls.full;
        const imgAlt = json.results[random].alt_description;
        const imgOwner = json.results[random].user.name;
        setBackground(imgURL,imgAlt,imgOwner);
    });
}

function setBackground(src,alt,owner) {
    const image = new Image();
    const description = document.createElement("span");
    description.id = "imgDsc";
    description.innerText = `Taken by ${owner}. From Unsplash.`;
    image.src = src;
    image.alt = `${alt}, by ${owner}. Provided by Unsplash.`;
    image.id = "background";
    body.appendChild(image);
    body.appendChild(description);
}

function init() {
    if (bgCustom === null) {
        bringPhoto();
    } else if (bgCustom.includes("#")) {
        body.style.background = bgCustom;
    } else {
        setBackground(bgCustom,"-","User");
    }
}

init();