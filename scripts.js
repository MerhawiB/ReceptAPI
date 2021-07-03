const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.sök-resultat');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'd061c30b';
const APP_key = '739310db6ed32a505c17cc3c90979fba';
const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_key}`;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
  });

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML +=
        `
        <div class="artikel">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank" id="view">Visa recept</a>
            </div>
            <p class="artikel-data">Kcal: ${result.recipe.calories.toFixed(2)}</p>
            <p class="artikel-data">Diet label: ${result.recipe.dietLabels}</p>
            <p class="artikel-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
