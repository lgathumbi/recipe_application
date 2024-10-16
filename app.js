document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value
    
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
                console.log(meal);
                const itemDiv = document.createElement("div");
                itemDiv.className = "m-2 singleItem"
                const itemInfo = `
                <div class="card" style="width: 12rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
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