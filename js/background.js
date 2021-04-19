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
    if (PREF_JSON !== null) {
        const bgCustom = PREF_JSON.bgCstm;
        if (bgCustom === null) {
            bringPhoto();
        } else if (bgCustom.includes("#")) {
            body.style.background = bgCustom;
        } else {
            setBackground(bgCustom,`${bgCustom}\nCustom background set by User.`);
        }
    } else {
        bringPhoto();
    }
}

init();