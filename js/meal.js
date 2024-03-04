const MealName = document.getElementById("mealName");
const MealServSize = document.getElementById("mealServing");
const MealIngList = document.getElementById("SelectedIngredList");
const SelectedIngList = document.getElementById("SelectedIngredList");
const MealList = document.getElementById("MealList");
const FinalizedSelectedIngredients = document.getElementById("FinalizedSelectedIngredients");
const FinalizedSelectedIngredientServings= document.getElementById("FinalizedSelectedIngredientServings");
var ListOfSelectedIngredients = [];
var ListOfFinalizedSelectedIngredients = [];

const DisplayedMealIngName = document.getElementById("DisplayedMealName");
const DisplayedMealServingSize = document.getElementById("DisplayedMealServ");
const DisplayedMealCalories = document.getElementById("DisplayedMealCal");
const DisplayedMealFat = document.getElementById("DisplayedMealFat");
const DisplayedMealCholesterol = document.getElementById("DisplayedMealChol");
const DisplayedMealSodium = document.getElementById("DisplayedMealSodi");
const DisplayedMealCarbs = document.getElementById("DisplayedMealCarb");
const DisplayedMealProtein = document.getElementById("DisplayedMealProt");






async function getMeal()
{
    fetch(`http://localhost:5500/searchMeal?search=${MealName.value}`)
    .then(response => {
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            throw new Error('Problem Checking Database');
        }
    })
    .catch(err=> {console.log(err); return null;});
}

async function GetMeals()
{
    fetch(`http://localhost:5500/GetMeals`)
    .then(response => {
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            throw new Error('Problem Checking Database');
        }
    })
    .then(meals => {
        MealList.innerHTML = "";
        for(var i=0; i < meals.length; ++i)
        {
            if(meals[i].name != "")
            {
                const opt = document.createElement('option');
                opt.value = meals[i].name;
                opt.appendChild(document.createTextNode(meals[i].name));
                MealList.appendChild(opt);
            }
        }
    })
    .catch(err=> {console.log(err); return null;});
}

async function CreateMeal()
{
    if(!ListOfFinalizedSelectedIngredients.length) //no length
    {
        alert("no ingredients selected");
    }
    else
    {
        var invalid = false;
        var alertmsg= "There were the Following Errors with your input data:\n";
        const nameofmeal = MealName.value;
        if (nameofmeal == "")
        {
            invalid = true;
            alertmsg += "Meal Name Must Not be Blank\n";
        }

        var mealservsize = parseFloat(MealServSize.value);
        if(isNaN(mealservsize))
            mealservsize=0;

        if(mealservsize <= 0)
        {
            invalid=true;
            alertmsg += "Meal Serving Size must be greater than 0\n";
        }


        if(!invalid)
        {
            fetch(`http://localhost:5500/searchMeal?search=${MealName.value}`)
            .then(response => {
                if(response.ok)
                {
                    return response.json();
                }
                else
                {
                    throw new Error('Problem Checking Database');
                }
            }).then(async (meal) => {
                console.log(meal);

                if(meal.length)
                {
                    invalid = true;
                    alert("Meal already exists in the database!\n Please check your name and try again!");
                }
                else
                {
                    var IngNameList = [];
                    var IngServList = [];

                    var calories = 0;
                    var fat = 0;
                    var cholesterol = 0;
                    var sodium = 0;
                    var carbs = 0;
                    var protein = 0;

                    for (var i = 0; i < 20; ++i)
                    {
                        IngNameList[i] = "placeholder";
                        IngServList[i] = 0;
                    }
        
                    for (var i = 0; i < ListOfFinalizedSelectedIngredients.length; ++i) //loop through and prep send data
                    {
                        IngNameList[i] = ListOfFinalizedSelectedIngredients[i]; //add ing name
                        
                        const serving = document.getElementById(`Ingredient${i + 1}Serving`);
                        var serv = parseFloat(serving.value);
                        if (isNaN(serv) || serv == 0) {
                            alertmsg += `Serving size of ${IngNameList[i]} must be greater than 0\n`;
                            invalid = true;
                            serv = 0;
                        }
                        
                        IngServList[i] = serv; //add serving size
                        await fetch(`http://localhost:5500/searchIngredient?search=${IngNameList[i]}`)
                        .then(response => response.json())
                        .then(ingredient => {
                            const servmultiplier = serv /ingredient[0].servingsize;
                            calories += servmultiplier * ingredient[0].calories;
                            fat += servmultiplier * ingredient[0].fat;
                            cholesterol += servmultiplier * ingredient[0].cholesterol;
                            sodium += servmultiplier * ingredient[0].sodium;
                            carbs += servmultiplier * ingredient[0].carbs;
                            protein += servmultiplier * ingredient[0].protein;
                            console.log("calories: ");
                            console.log(calories);
                        })
                        .catch(err=> console.log(err));
                    }

                    if(!invalid) //prep all done, time to send request to make
                    {
                        var searchstring = `name=${nameofmeal}&servingsize=${serv}&calories=${calories}&fat=${fat}&cholesterol=${cholesterol}&sodium=${sodium}&carbs=${carbs}&protein=${protein}`;
                        for(var i = 0; i < 20; ++i) //add in all of the ingredients
                        {
                            searchstring +=`&ing${i+1}=${IngNameList[i]}&ing${i+1}serving=${IngServList[i]}`;
                        }

                        fetch(`http://localhost:5500/CreateMeal?${searchstring}`)
                        .then(async () => {
                            setTimeout(()=>{},1000);
                            await GetMeals();
                            
                        })
                        .then(console.log("Finished Adding Meal to Database"))
                    }
                    else
                    {
                        alert(alertmsg);
                    }
                }


            })
            .catch(err=> {console.log(err); return null;});

        }
        else
        {
            alert(alertmsg);
        }
    }
}

async function DisplayMeal()
{
    
    if(MealList.value == "") //nothing selected
    {
        alert("You haven't selected an ingredient to display");
        return;
    }
    else
    {
        console.log(`Searching for: ${MealList.value}`)
        fetch(`http://localhost:5500/searchMeal?search=${MealList.value}`)
        .then(response => response.json())
        .then((meal) => {
            console.log(meal[0]);
            DisplayedMealIngName.innerHTML = meal[0].name;
            DisplayedMealServingSize.innerHTML = meal[0].servingsize;
            DisplayedMealCalories.innerHTML = meal[0].calories;
            DisplayedMealFat.innerHTML = meal[0].fat;
            DisplayedMealCholesterol.innerHTML = meal[0].cholesterol;
            DisplayedMealSodium.innerHTML = meal[0].sodium;
            DisplayedMealCarbs.innerHTML = meal[0].carbs;
            DisplayedMealProtein.innerHTML = meal[0].protein;
        })
        .catch(err=> console.log(err));
    }

}

async function DeleteMeal()
{
    const Delete = document.getElementById("MealList");
    if(Delete.value == '')
    {
        console.log('nothing selected');
        return;
    }
    if(confirm(`Are you sure you want to Delete ${Delete.value}? THIS IS PERMANENT!`))
    {
        fetch(`http://localhost:5500/DeleteMeal?search=${Delete.value}`)
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





function AddSelectedIngredients() 
{
    console.log("AddSelectedIngredients start");
    console.log("after showing length");
    var EndOfSelected = 1; //starts at 1
    while(document.getElementById(`IngredientLabel${EndOfSelected}`).innerHTML != "placeholder")
    {
        EndOfSelected++;
    }//get to end of what is currently

    for(var i = 0; i < ListOfSelectedIngredients.length; ++i) //all of the newly selected stuff
    {
        var found = false;
        var j = 0;
        while(j < ListOfFinalizedSelectedIngredients.length && !found)
        {
            if(ListOfSelectedIngredients[i] == ListOfFinalizedSelectedIngredients[j])
            {
                console.log("found an instance of:");
                console.log(ListOfSelectedIngredients);
                found = true;
            }
            j++;
        }
        if(!found) //not a duplicate so it's safe to add
        {
            if(EndOfSelected < 21) //size limitation on adding ingredients
            {
                ListOfFinalizedSelectedIngredients[ListOfFinalizedSelectedIngredients.length] = ListOfSelectedIngredients[i];
                const newest = document.getElementById(`Ingredient${EndOfSelected}`);
                const newestLabel = document.getElementById(`IngredientLabel${EndOfSelected}`);
                newestLabel.innerHTML = ListOfSelectedIngredients[i];
                newestLabel.style.display = "inline";
                newest.style.display = "inline";

                const newestServing = document.getElementById(`Ingredient${EndOfSelected}Serving`);
                const newestServingLabel = document.getElementById(`IngredientServingLabel${EndOfSelected}`);
                newestServing.style.display = "inline";
                newestServingLabel.innerHTML = " " + ListOfSelectedIngredients[i] + " Serving: ";
                newestServingLabel.style.display= "inline";



                EndOfSelected++; //move to next open space
            }
        }
    }
    console.log("Final Ingredients");
    console.log(ListOfFinalizedSelectedIngredients);
    ListOfSelectedIngredients = [];
    $('#SelectIngredList').multiSelect('deselect_all');
    console.log();
}

function RemoveSelectedIngredients()
{
    var Keeping = [];
    var NewArray = [];
    for(var i = 1; i <= ListOfFinalizedSelectedIngredients.length; ++i)
    {
        const currentIng = document.getElementById(`Ingredient${i}`)
        if(!currentIng.checked)
        {
            NewArray.push(ListOfFinalizedSelectedIngredients[i-1]);
            Keeping.push(i);//index of the data we're keeping
        }
    }

    for(var i = 0; i < 20; ++i)
    {
        const CurrentIngIndex = document.getElementById(`IngredientLabel${i+1}`);//where we are replacing to
        const CurrentIng = document.getElementById(`Ingredient${i+1}`);
        const CurrentIngIndexServLabel = document.getElementById(`IngredientServingLabel${i+1}`);
        const CurrentIngIndexServ = document.getElementById(`Ingredient${i+1}Serving`);
        if(i < Keeping.length)
        {

            const Save = document.getElementById(`IngredientLabel${Keeping[i]}`);
            const SaveServLabel = document.getElementById(`IngredientServingLabel${Keeping[i]}`);
            const SaveServ = document.getElementById(`Ingredient${Keeping[i]}Serving`);
            CurrentIngIndex.innerHTML = Save.innerHTML;
            CurrentIngIndexServ.value = SaveServ.value;
            CurrentIngIndexServLabel.innerHTML = SaveServLabel.innerHTML; //replace old with new
            
        }
        else
        {
            CurrentIng.style.display = "none";
            CurrentIngIndex.innerHTML = "placeholder";
            CurrentIngIndex.style.display = "none";
            CurrentIngIndexServLabel.style.display = "none";
            CurrentIngIndexServ.style.display="none";
        }
        CurrentIng.checked = false;
    }
    ListOfFinalizedSelectedIngredients = NewArray;
}


async function MealGetIngredients()
{
    fetch(`http://localhost:5500/AllIngredients`)
    .then(response => response.json())
    .then(ingredients => {
        const select = document.getElementById("SelectIngredList");
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
        $('#SelectIngredList').multiSelect({
            keepOrder: true,
            afterSelect: function(value)
            {
                if(ListOfSelectedIngredients.length >=20)
                {
                    alert("Can only select up to 20 ingredients for Meal");
                }
                else
                {
                    ListOfSelectedIngredients[ListOfSelectedIngredients.length] = value[0];
                    // console.log(ListOfSelectedIngredients); 
                }

            },
            afterDeselect: function(value)
            {
                const index = ListOfSelectedIngredients.indexOf(value[0]);
                // console.log(index);
                ListOfSelectedIngredients.splice(index, 1);
                // console.log("After Deletion: ");
                // console.log(ListOfSelectedIngredients);
            },
        });
    })
}

function InitializeMealSelectedIngredients()
{
    FinalizedSelectedIngredients.innerHTML = ""; //reset to empty
    FinalizedSelectedIngredientServings.innerHTML = ""; //reset to empty
    for(var i = 1; i <= 20; ++i)
    {
        //display:none;
        FinalizedSelectedIngredients.innerHTML += `<input type="checkbox" id="Ingredient${i}" style="display:none;"></input>`;
        const Label = document.createElement("label");
        Label.setAttribute("for", `Ingredient${i}`);
        Label.setAttribute("id", `IngredientLabel${i}`);
        Label.innerHTML = "placeholder";
        Label.style = "display: none";
        FinalizedSelectedIngredients.appendChild(Label);
        FinalizedSelectedIngredients.innerHTML += "<br>";

        const Label2 = document.createElement("label");
        Label2.setAttribute("for", `Ingredient${i}Serving`);
        Label2.setAttribute("id", `IngredientServingLabel${i}`);
        Label2.innerHTML = "placeholder";
        Label2.style = "display: none";
        FinalizedSelectedIngredientServings.appendChild(Label2);
        FinalizedSelectedIngredientServings.innerHTML += `<input type="number" id="Ingredient${i}Serving" placeholder="0" step="1" min="0" style="display:none;">`;

        FinalizedSelectedIngredientServings.innerHTML += "<br>";
    }
}






InitializeMealSelectedIngredients();
MealGetIngredients();
GetMeals();