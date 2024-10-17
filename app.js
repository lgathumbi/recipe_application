document.getElementById("button").addEventListener('click',(event)=>{
    event.preventDefault();
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
let reviews = [];
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
        <div class="card" style="width: 19rem;">
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
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)

        document.getElementById('reviewSection').style.display = 'block';

        document.getElementById('reviewForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;

            const newReview = { rating: parseInt(rating), comment: comment };
            reviews.push(newReview);
            displayReviews();

        
            this.reset();
        });
        displayReviews(id);
        
        document.getElementById('searchInstructions').addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const filteredSteps = instructionsArray.filter(step => step.toLowerCase().includes(query));
            const instructionsList = document.getElementById('instructionsList');
            
        
            instructionsList.innerHTML = filteredSteps.map(step => `<li>${step}</li>`).join('');
        })
    })
}
function displayReviews() {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = "";
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = "review";
        reviewDiv.innerHTML = `
            <div class="stars">${'★'.repeat(review.rating)}</div>
            <p>${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewDiv);
    });
}