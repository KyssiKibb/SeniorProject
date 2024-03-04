
const IngName = document.getElementById("ingredientName");
const ServingSize = document.getElementById("ServingSize");
const Calories = document.getElementById("Calories");
const Fat = document.getElementById("Fat");
const Cholesterol = document.getElementById("Cholesterol");
const Sodium = document.getElementById("Sodium");
const Carbs = document.getElementById("Carbs");
const Protein = document.getElementById("Protein");

const DisplayedIngName = document.getElementById("DisplayedName");
const DisplayedServingSize = document.getElementById("DisplayedServ");
const DisplayedCalories = document.getElementById("DisplayedCal");
const DisplayedFat = document.getElementById("DisplayedFat");
const DisplayedCholesterol = document.getElementById("DisplayedChol");
const DisplayedSodium = document.getElementById("DisplayedSodi");
const DisplayedCarbs = document.getElementById("DisplayedCarb");
const DisplayedProtein = document.getElementById("DisplayedProt");

const SelectedIng = document.getElementById("IngredList");




function VerifyWord(word)
{
//do checking for special characters
//return true if no special characters
//return false if special characters
}

async function getIng()
{
    console.log(IngName.value);
    fetch(`http://localhost:5500/searchIngredient?search=${IngName.value}`)
    .then(response => response.json())
    .then(ingredient => console.log(ingredient[0]))
    .catch(err=> console.log(err));
}

async function getIngred(name)
{
    fetch(`http://localhost:5500/searchIngredient?search=${name}`)
    .then(response => response.json())
    .then(ingredient => {return ingredient[0];})
    .catch(err=> console.log(err));
}

async function DisplayIng()
{
    
    if(SelectedIng.value == "") //nothing selected
    {
        alert("You haven't selected an ingredient to display");
        return;
    }
    else
    {
        console.log(`Searching for: ${SelectedIng.value}`)
        fetch(`http://localhost:5500/searchIngredient?search=${SelectedIng.value}`)
        .then(response => response.json())
        .then((ingredient) => {
            console.log(ingredient[0]);
            DisplayedIngName.innerHTML = ingredient[0].name;
            DisplayedServingSize.innerHTML = ingredient[0].servingsize;
            DisplayedCalories.innerHTML = ingredient[0].calories;
            DisplayedFat.innerHTML = ingredient[0].fat;
            DisplayedCholesterol.innerHTML = ingredient[0].cholesterol;
            DisplayedSodium.innerHTML = ingredient[0].sodium;
            DisplayedCarbs.innerHTML = ingredient[0].carbs;
            DisplayedProtein.innerHTML = ingredient[0].protein;
        })
        .catch(err=> console.log(err));
    }

}

async function CreateIngredient() {
    //checking for valid data
    var invalid = false;
    var alertmsg= "There were the Following Errors with your input data:\n";


    var ServSize = parseFloat(ServingSize.value); //serving size converted to float
    if(isNaN(ServSize))
        ServSize=0;

    var cal = parseInt(Calories.value);
    if(isNaN(cal))
        cal=0;

    var fat = parseInt(Fat.value);
    if(isNaN(fat))
        fat=0;

    var cholesterol = parseInt(Cholesterol.value);
    if(isNaN(cholesterol))
        cholesterol=0;

    var sodium = parseInt(Sodium.value);
    if(isNaN(sodium))
        sodium=0;

    var carbs = parseInt(Carbs.value);
    if(isNaN(carbs))
        carbs=0;

    var protein = parseInt(Protein.value);
    if(isNaN(protein))
        protein=0;

    if (IngName.value == "") {
        //display error message for name needing to not be blank
        invalid = true;
        alertmsg += "Name Must Not be Blank\n";
    }
    if(ServSize <= 0)
    {
        //display error message for serving size needing to be number > 0
        invalid = true;
        alertmsg += "Serving size must be greater than 0\n";
    }
    if(cal < 0)
    {
        //display error message for negative calorie number
        invalid = true;
        alertmsg += "Calorie Count must not be negative\n";
    }
    if(fat < 0)
    {
        invalid = true;
        alertmsg += "Fat must not be negative\n";
    }
    if(cholesterol < 0)
    {
        invalid = true;
        alertmsg += "Cholesterol must not be negative\n";
    }
    if(sodium < 0)
    {
        invalid = true;
        alertmsg += "Sodium must not be negative\n";
    }
    if(carbs < 0)
    {
        invalid = true;
        alertmsg += "Carbs must not be negative\n";
    }
    if(protein < 0)
    {
        invalid = true;
        alertmsg += "Protein must not be negative\n";
    }

    if(!invalid)
    {
        fetch(`http://localhost:5500/searchIngredient?search=${IngName.value}`)
        .then(response => {
            if(response.ok)
            {
                console.log("was able to query");
                return response.json()
            }
            else
                throw new Error('Problem checking database to see if Ingredient Exists');
        })
        .then(async (ingredient) => {
            console.log(ingredient);
            if (ingredient.length != 0) //if there was something in the database with that name already
            {
                //display error message for ingredient already being there
                throw new Error("Ingredient already exists in the database!\n Please check your name and try again!");
            }
            else {
                fetch(`http://localhost:5500/CreateIng?name=${IngName.value}&servingsize=${ServSize}&calories=${cal}&fat=${fat}&cholesterol=${cholesterol}&sodium=${sodium}&carbs=${carbs}&protein=${protein}`)
                .then(async() => {
                    setTimeout(()=>{},1000); //give database time to fully update and settle
                    await GetIngredients();
                
                }).then(console.log("Finished adding data to database."))

                //make fetch request for inserting into database
            }
        })
        .catch(err => alert(err));
    }
    else
    {
        alert(alertmsg);
    }
}

async function UpdateIngredient()
{
        //checking for valid data
        var invalid = false;
        var alertmsg= "There were the Following Errors with your input data:\n";
    
    
        var ServSize = parseFloat(ServingSize.value); //serving size converted to float
        if(isNaN(ServSize))
            ServSize=0;
    
        var cal = parseInt(Calories.value);
        if(isNaN(cal))
            cal=0;
    
        var fat = parseInt(Fat.value);
        if(isNaN(fat))
            fat=0;
    
        var cholesterol = parseInt(Cholesterol.value);
        if(isNaN(cholesterol))
            cholesterol=0;
    
        var sodium = parseInt(Sodium.value);
        if(isNaN(sodium))
            sodium=0;
    
        var carbs = parseInt(Carbs.value);
        if(isNaN(carbs))
            carbs=0;
    
        var protein = parseInt(Protein.value);
        if(isNaN(protein))
            protein=0;
    
        if (IngName.value == "") {
            //display error message for name needing to not be blank
            invalid = true;
            alertmsg += "Name Must Not be Blank\n";
        }
        if(ServSize <= 0)
        {
            //display error message for serving size needing to be number > 0
            invalid = true;
            alertmsg += "Serving size must be greater than 0\n";
        }
        if(cal < 0)
        {
            //display error message for negative calorie number
            invalid = true;
            alertmsg += "Calorie Count must not be negative\n";
        }
        if(fat < 0)
        {
            invalid = true;
            alertmsg += "Fat must not be negative\n";
        }
        if(cholesterol < 0)
        {
            invalid = true;
            alertmsg += "Cholesterol must not be negative\n";
        }
        if(sodium < 0)
        {
            invalid = true;
            alertmsg += "Sodium must not be negative\n";
        }
        if(carbs < 0)
        {
            invalid = true;
            alertmsg += "Carbs must not be negative\n";
        }
        if(protein < 0)
        {
            invalid = true;
            alertmsg += "Protein must not be negative\n";
        }
    
        if(!invalid)
        {
            fetch(`http://localhost:5500/searchIngredient?search=${IngName.value}`)
            .then(response => {
                if(response.ok)
                {
                    //console.log("was able to query");
                    return response.json()
                }
                else
                    throw new Error('Problem checking database to see if Ingredient Exists');
            })
            .then(async (ingredient) => {
                console.log(ingredient);
                if (ingredient.length == 0) //if there was something in the database with that name already
                {
                    throw new Error("Ingredient Doesn't exist in the database!\n Please check your name and try again!\n(or click Create Ingredient to add to database!");
                }
                else {
                    fetch(`http://localhost:5500/UpdateIng?name=${IngName.value}&servingsize=${ServSize}&calories=${cal}&fat=${fat}&cholesterol=${cholesterol}&sodium=${sodium}&carbs=${carbs}&protein=${protein}`)
                    .then(async() => {
                        setTimeout(()=>{},1000); //give database time to fully update and settle
                        await GetIngredients()
                        DisplayIng();
                    }).then(console.log("Finished updating in database."))
    
                    //make fetch request for inserting into database
                }
            })
            .catch(err => alert(err));
        }
        else
        {
            alert(alertmsg);
        }
}

async function FillIngredientData()
{
    IngName.value = DisplayedIngName.innerHTML;

    ServingSize.value = DisplayedServingSize.innerHTML
    Calories.value = DisplayedCalories.innerHTML
    Fat.value = DisplayedFat.innerHTML
    Cholesterol.value = DisplayedCholesterol.innerHTML
    Sodium.value = DisplayedSodium.innerHTML
    Carbs.value = DisplayedCarbs.innerHTML
    Protein.value = DisplayedProtein.innerHTML
}

async function GetIngredients()
{
    fetch(`http://localhost:5500/AllIngredients`)
    .then(response => response.json())
    .then(ingredients => {
        const select = document.getElementById("IngredList");
        select.innerHTML = "";
        console.log(select.innerHTML);
        console.log(ingredients.length);
        for(var i=0; i < ingredients.length; ++i)
        {
            if(ingredients[i].name != "")
            {
                const opt = document.createElement('option');
                opt.value = ingredients[i].name;
                opt.appendChild(document.createTextNode(ingredients[i].name));
                select.appendChild(opt);
            }
        }
        console.log("Ingredient list made");
        console.log(select.innerHTML);
    })
}

async function DeleteIngredient()
{
    const Delete = document.getElementById("IngredList");
    if(Delete.value == '')
    {
        console.log('nothing selected');
        return;
    }
    if(confirm(`Are you sure you want to Delete ${Delete.value}? THIS IS PERMANENT!`))
    {
        fetch(`http://localhost:5500/DeleteIng?search=${Delete.value}`)
        .then(response => 
        {
            if(response.ok)
            {
                //alert(`${Delete.value} has been successfully deleted`);
                Delete.remove(Delete.selectedIndex);
                Delete.value = '';
                
            }
            else
            {
                alert("Failed to delete, please try again");
            }

        })
        
    }
    else
    {
        return;
    }


}






GetIngredients();