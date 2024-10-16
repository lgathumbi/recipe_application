document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value
    let details = document.getElementById("details")
    details.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response=> response.json())
    .then(data => {
        const items =document.getElementById("items")
        items.innerHTML = "";
        if(data.meals == null){
           document.getElementById("msg").style.display = "block"
        }else{
            document.getElementById("msg").style.display = "none"
            data.meals.forEach(meal => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "m-2 singleItem"
                itemDiv.setAttribute('onclick', `details(${meal.idMeal})`)
                const itemInfo = `
                <div class="card" style="width: 12rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body text-center">
                      <h5 class="card-text">${meal.strMeal}</h5>
                    </div>
                </div>
                `
                itemDiv.innerHTML = itemInfo
                items.appendChild(itemDiv)
            })
        }
    })
})
function details(id){
    console.log(id)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(detail =>{
        let meal = detail.meals[0]
        console.log(meal)
        let details = document.getElementById("details")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")

        let ingredientsList = '';
        let measuresList = '';
            for (let i = 1; i <= 20; i++) { 
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient) { 
                    ingredientsList += `<li>${ingredient}</li>`;
                    measuresList += `<li>${measure ? measure : ''}</li>`;
                }
            }
        let detailsInfo = `
        <div class="card" style="width: 19rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
               <h3 class="card-text">${meal.strMeal}</h3>
               <h6>Ingredients</h6>
               <ul>
                   ${ingredientsList}
               </ul>
               <h6>Measures</h6>
               <ul>
                    ${measuresList}
                </ul>
                <h6>Category</h6>
                <p>${meal.strCategory}</p>
                <h6>Area</h6>
                <p>${meal.strArea}</p>
            </div>
        </div>
        `
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)
    })
}