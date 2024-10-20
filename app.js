document.getElementById("button").addEventListener('click',(event)=>{
    event.preventDefault();
    let inputValue = document.getElementById('inputName').value;
    let details = document.getElementById("details");
    details.innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response=> response.json())
    .then(data => {
        const items =document.getElementById("items");
        items.innerHTML = "";
        if(data.meals == null){
           document.getElementById("msg").style.display = "block";
        }else{
            document.getElementById("msg").style.display = "none";
            data.meals.forEach(meal => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "m-2 singleItem";
                itemDiv.setAttribute('onclick', `details(${meal.idMeal})`);
                const itemInfo = `
                <div class="card" style="width: 15rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body text-center">
                      <h5 class="card-text">${meal.strMeal}</h5>
                    </div>
                </div>
                `
                itemDiv.innerHTML = itemInfo;
                items.appendChild(itemDiv);
            })
        }
    })  
    .catch((error) => {
        console.error('Error', error)
    });
    
})
function details(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(detail =>{
        let meal = detail.meals[0];
        let details = document.getElementById("details");
        details.innerHTML = "";
        let detailsDiv = document.createElement("div");

        let ingredientsList = '';
        let instructions = meal.strInstructions.split('.').map(step => step.trim()).filter(step => step).join('</li><li>');
        let instructionsArray = meal.strInstructions.split('.').map(step => step.trim()).filter(step => step);

            for (let i = 1; i <= 20; i++) { 
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient) { 
                    ingredientsList += `<li>${ingredient}: ${measure ? measure : ''}</li>`;
                }
            }
        let detailsInfo = `
        <div class="card" style="width: 50rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
               <h3 class="card-text">${meal.strMeal}</h3>
               <h6>Ingredients</h6>
               <ul>
                   ${ingredientsList}
               </ul>
               <h6>Instructions</h6>
                    <input type="text" id="searchInstructions" placeholder="Search instructions..." />
                    <div id="filteredInstructions">
                        <ol id="instructionsList">
                            ${instructions} 
                        </ol>
                    </div>
                <h6>Category</h6>
                <p>${meal.strCategory}</p>
                <h6>Area</h6>
                <p>${meal.strArea}</p>
            </div>
        </div>
        `
        detailsDiv.innerHTML = detailsInfo;
        details.appendChild(detailsDiv);

        document.getElementById('searchInstructions').addEventListener('input', function(event) {
            event.preventDefault();
            const query = this.value.toLowerCase();
            const filteredSteps = instructionsArray.filter(step => step.toLowerCase().includes(query));
            const instructionsList = document.getElementById('instructionsList');
            
        
            instructionsList.innerHTML = filteredSteps.map(step => `<li>${step}</li>`).join('');
        })
    })
    .catch((error) => {
        console.error('Error', error)
    });
}
