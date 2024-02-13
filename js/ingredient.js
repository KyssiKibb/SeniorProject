
const IngName = document.getElementById("ingredientName");
const ServingSize = document.getElementById("ServingSize");
const Calories = document.getElementById("Calories");



async function basicreq()
{
    fetch(`http://localhost:5500/searchIngredient?search=${IngName.value}`)
    .then(response => response.json())
    .then(ingredient => console.log(ingredient.length))
    .catch(err=> console.log(err));
}
async function CreateIngredient() {
    var invalid = false;
    const ServSize = parseFloat(ServingSize.value); //serving size converted to float
    const cal = parseInt(Calories.value);
    if (IngName.value == "") {
        //display error message for name needing to not be blank
        invalid = true;
    }
    if(ServSize == 'NaN' || ServSize <= 0)
    {
        //display error message for serving size needing to be number > 0
        invalid = true;
    }
    if(cal == 'NaN' || cal < 0)
    {
        //display error message for negative calorie number
        invalid = true;
    }

    if(invalid == false)
        fetch(`http://localhost:5500/searchIngredient?search=${IngName.value}`)
        .then(response => response.json())
        .then(ingredient => {
            if (ingredient.length != 0) //if there was something in the database with that name already
            {
                //display error message for ingredient already being there
            }
            else {
                console.log("adding data to database.");
                //make fetch request for inserting into database
            }
        })
        .catch(err => console.log(err));
}