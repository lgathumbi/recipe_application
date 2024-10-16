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
    .then(detail => console.log(detail))
}