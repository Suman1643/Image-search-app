const access = "QXVvYPFIIchO7VpeIQKFY3R-qjpOIB9fQh9NMjN7PWM";

const formEl = document.querySelector("form");
const searchEL = document.querySelector("#input_image");
const searchBtn = document.querySelector("#btn");
const search_result = document.querySelector(".search");
const Showmore = document.querySelector("#showmore");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = searchEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        search_result.innerHTML = "";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search_result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        search_result.appendChild(imageWrapper);
    })

    page++
    if(page >1){
        Showmore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})

Showmore.addEventListener("click", ()=>{
    searchImage();
})