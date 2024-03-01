const MealName = document.getElementById("mealName");
const IngList = document.getElementById("IngredList");
const SelectedIngList = document.getElementById("SelectedIngredList");
const MealList = document.getElementById("MealList");

async function getMeal()
{
    fetch(`http://localhost:5500/searchMeal?search=${IngName.value}`)
    .then(response => response.json())
    .then(ingredient => console.log(ingredient))
    .catch(err=> console.log(err));
}

function AddSelectedIngredients() 
{
    console.log(IngList.value);
}