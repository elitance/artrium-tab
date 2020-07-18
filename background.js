Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

const body = document.querySelector("body");
const date = new Date();
const week = date.getWeek();
const bgCustom = JSON.parse(localStorage.getItem("bgCstm"));
let random = Math.floor(Math.random() * 9);

const dateQuery = {
    citys: {
        0: "australia",
        1: "uk",
        2: "france",
        3: "us",
        4: "japan",
        5: "canada",
        6: "italy",
        7: "ireland",
        8: "russia"
    },
    arts: {
        0: "interior",
        1: "nature",
        2: "business",
        3: "minimal",
        4: "architecture",
        5: "sustainability",
        6: "textures",
        7: "technology",
        8: "imac"
    }
}

const accessCode = "3CVHz8RtTUrydWpPKmbmNGlOBnZ4zxn6k2YvNn-bjPw";
let query;

if (week % 2 === 0) {
    query = dateQuery.citys[random];
} else {
    query = dateQuery.arts[random];
}

random = Math.floor(Math.random() * 5);

function bringPhoto() {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${random}&client_id=${accessCode}`).then(function(response) {
        return response.json();
    }).then(function(json) {
        random = Math.floor(Math.random() * 30);
        console.log(json);
        const imgURL = json.results[random].urls.full;
        const imgOwner = json.results[random].user.name;
        const imgDesc = `Taken by ${imgOwner}. From Unsplash.`;
        setBackground(imgURL,imgDesc);
    });
}

function setBackground(src,desc) {
    const image = new Image();
    const description = document.createElement("span");
    description.id = "imgDsc";
    description.innerText = desc;
    image.src = src;
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
        setBackground(bgCustom,`${bgCustom}\nCustom background set by User.`);
    }
}

init();