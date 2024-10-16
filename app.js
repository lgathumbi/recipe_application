document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response=> response.json())
    .then(data => {
        console.log(data.meals)
    })
})