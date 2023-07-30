const access_key="izdSY-Dnvcs4W2jUsH1LYUUQNDsD9my1nj9nXBuC2gY";


const form_element= document.querySelector("form");

const input_element=document.getElementById("search-input");

const search_results =document.querySelector(".serach-results");

const showMore= document.getElementById("show-more-button");

let inputData="";
let page =1;

async function searchImages(){
    inputData=input_element.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`

    const response=await fetch(url)
    const data = await response.json()

    const results=data.results

    if(page === 1){
        search_results.innerHTML=""
    }

    results.map((results)=>{
        const imageWrapper=document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image= document.createElement('img');
        image.src= results.urls.small;
        image.alt= results.alt_description;
        const imageLink=document.createElement('a');
        imageLink.href=results.links.html;
        imageLink.targer="_blank";
        imageLink.textContent=results.alt_description;

        imageLink.appendChild(image);
        imageWrapper.appendChild(imageLink);
        search_results.appendChild(imageWrapper);

        // imageWrapper.appendChild(image);
        // imageWrapper.appendChild(imageLink);
        // imageWrapper.appendChild(imageWrapper);
    })

    page++
    if(page>1){
        showMore.style.display="block";
    }
}


form_element.addEventListener("submit",(Event)=>{
    Event.preventDefault()
    page=1;
    searchImages();
});

showMore.addEventListener("click",()=>{ 
    searchImages();
});