const alert = (headerTxt, descTxt, option) => {
    return new Promise((resolve, reject) => {
        const alert = document.querySelector("#alert");
        const header = alert.querySelector("h2");
        const buttonDiv = alert.querySelector("div");
        const desc = alert.querySelector("span");
        header.innerText = headerTxt;
        desc.innerHTML = descTxt;

        const yBtn = buttonDiv.querySelectorAll("button")[0];
        yBtn.addEventListener("click", (event) => {alert.style.transform = "translateY(-300px)"; resolve(true);});
        
        const nBtn = buttonDiv.querySelectorAll("button")[1];
        nBtn.addEventListener("click", (event) => {alert.style.transform = "translateY(-300px)"; resolve(false);});

        if (option === false) {
            nBtn.style.display = "none";
        } else {
            nBtn.style.display = "block";
        }

        alert.style.transform = "none";
        setTimeout(() => {alert.style.transform = "translateY(-300px)"; resolve(false);},10000);
    });
}