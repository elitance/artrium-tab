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
let random = Math.floor(Math.random() * 9);

const dateQuery = {
    citys: {
        0: "australia",
        1: "uk",
        2: "france",
        3: "us",
        4: "canada",
        5: "italy",
        6: "ireland",
        7: "russia",
        8: "swiss"
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
        8: "music"
    }
}

const accessCode = "3CVHz8RtTUrydWpPKmbmNGlOBnZ4zxn6k2YvNn-bjPw";
let query;