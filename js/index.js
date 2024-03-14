const MealOfDay = document.getElementById("ListOfDaysMeals");
const MealOfDayServ= document.getElementById("FinalizedMealsOfTheDayServings")
const ListOfMeals = document.getElementById("MealList");

var dailymeals = [];

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const today = month + "/" + day + '/' + year;

function AddToMealOfDay()
{
    if(ListOfMeals.value != "")
    {

        var EndOfSelected = 1;
        while(EndOfSelected < 11 && document.getElementById(`MealLabel${EndOfSelected}`).innerHTML != "placeholder")
        {
            EndOfSelected++;
        }

        if(EndOfSelected < 11)
        {
            dailymeals[dailymeals.length] = ListOfMeals.value;
            const newest = document.getElementById(`Meal${EndOfSelected}`);
            const newestLabel = document.getElementById(`MealLabel${EndOfSelected}`);
            newestLabel.innerHTML = dailymeals[dailymeals.length -1];
            newestLabel.style.display = "inline";
            newest.style.display = "inline";

            const newestServing = document.getElementById(`Meal${EndOfSelected}Serving`);
            const newestServingLabel = document.getElementById(`MealServingLabel${EndOfSelected}`);
            newestServing.style.display = "inline";
            newestServingLabel.innerHTML = " " + dailymeals[dailymeals.length-1] + " Serving: ";
            newestServingLabel.style.display= "inline";
        }
        else
        {
            alert("Limit of 10 Meals per day");
        }
    }
    else
    {
        alert("you must select something to add to daily meals");
    }
}



async function MakeDay(date)
{
    fetch(`http://localhost:5500/CreateDaily?search=${date}`)
    .then(response => response.json())
    .then(meals => {
        console.log("finished making daily meal");
    })
}


function RemoveSelectedMeals()
{
    var Keeping = [];
    var NewArray = [];
    for(var i = 1; i <= dailymeals.length; ++i)
    {
        const currentMeal = document.getElementById(`Meal${i}`)
        if(!currentMeal.checked)
        {
            NewArray.push(dailymeals[i-1]);
            Keeping.push(i);//index of the data we're keeping
        }
    }

    for(var i = 0; i < 10; ++i)
    {
        const CurrentIngIndex = document.getElementById(`MealLabel${i+1}`);//where we are replacing to
        const CurrentIng = document.getElementById(`Meal${i+1}`);
        const CurrentIngIndexServLabel = document.getElementById(`MealServingLabel${i+1}`);
        const CurrentIngIndexServ = document.getElementById(`Meal${i+1}Serving`);
        if(i < Keeping.length)
        {

            const Save = document.getElementById(`MealLabel${Keeping[i]}`);
            const SaveServLabel = document.getElementById(`MealServingLabel${Keeping[i]}`);
            const SaveServ = document.getElementById(`Meal${Keeping[i]}Serving`);
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
    dailymeals = NewArray;
}

async function UpdateMealsOfDay()
{
    var mealservings = [];
    var zeroes = false;
    for(var i = 0; i < dailymeals.length && zeroes == false; ++i)
    {
        const currentserving = document.getElementById(`Meal${i+1}Serving`);
        const ServingValue = Number(currentserving.value);
        if(isNaN(ServingValue) || ServingValue == 0)
        {
            zeroes = true;
        }
        else
            mealservings[i] = ServingValue;

    }
    if(zeroes)
    {
        alert("one or more meals have a serving of 0. please fix or remove");
    }
    else //good to update the dailymeals
    {
        var fetchString=`date=${today}`;
        var i=0;
        for(; i < dailymeals.length;++i)
        {
            dailymeals[i] = dailymeals[i].replace(" ", "_");
            fetchString += `&meal${i+1}=${dailymeals[i]}&meal${i+1}serving=${mealservings[i]}`
            dailymeals[i] = dailymeals[i].replace("_", " ");
        }
        for(;i<10;++i)
        {
            fetchString += `&meal${i+1}=placeholder&meal${i+1}serving=0`
        }
        console.log(fetchString);
        fetch(`http://localhost:5500/ChangeDaily?${fetchString}`)
        .then( response => response.json())
        .then( update => {
            console.log("daily meals updated");
        })
        console.log(mealservings);

    }

}   


async function InitializeMealsOfTheDay() {
    MealOfDay.innerHTML = ""; //reset to empty
    MealOfDayServ.innerHTML = ""; //reset to empty
    console.log("day: ");
    console.log(day);
    console.log("Month: ");
    console.log(month);
    console.log("Year: ");
    console.log(year);


    for (var i = 1; i <= 10; ++i) 
    {
        //display:none;
        MealOfDay.innerHTML += `<input type="checkbox" id="Meal${i}" style="display:none;"></input>`;
        const Label = document.createElement("label");
        Label.setAttribute("for", `Meal${i}`);
        Label.setAttribute("id", `MealLabel${i}`);
        Label.innerHTML = "placeholder";
        Label.style = "display: none";
        MealOfDay.appendChild(Label);
        MealOfDay.innerHTML += "<br>";

        const Label2 = document.createElement("label");
        Label2.setAttribute("for", `Meal${i}Serving`);
        Label2.setAttribute("id", `MealServingLabel${i}`);
        Label2.innerHTML = "placeholder";
        Label2.style = "display: none";
        MealOfDayServ.appendChild(Label2);
        MealOfDayServ.innerHTML += `<input type="number" id="Meal${i}Serving" placeholder="0" step="1" min="0" style="display:none;">`;

        MealOfDayServ.innerHTML += "<br>";
    }

    fetch(`http://localhost:5500/GetDaily?search=${today}`)
        .then(response => response.json())
        .then(meals => {
            if (meals.length == 0) //meals of day not made yet
            {
                MakeDay(today);
            }
            else //already made, pull what we have and display
            {
                var mealnames = [];
                var mealservs = [];

                console.log(meals);
                var nulled_meal = false;
                var i = 1;
                do
                {
                    switch(i)
                    {
                        case 1:
                            if (meals[0].meal1) {
                                mealnames[0] = meals[0].meal1;
                                mealservs[0] = meals[0].meal1serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 2:
                            if (meals[0].meal2) {
                                mealnames[1] = meals[0].meal2;
                                mealservs[1] = meals[0].meal2serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 3:
                            if (meals[0].meal3) {
                                mealnames[2] = meals[0].meal3;
                                mealservs[2] = meals[0].meal3serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 4:
                            if (meals[0].meal4) {
                                mealnames[3] = meals[0].meal4;
                                mealservs[3] = meals[0].meal4serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 5:
                            if (meals[0].meal5) {
                                mealnames[4] = meals[0].meal5;
                                mealservs[4] = meals[0].meal5serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 6:
                            if (meals[0].meal6) {
                                mealnames[5] = meals[0].meal6;
                                mealservs[5] = meals[0].meal6serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 7:
                            if (meals[0].meal7) {
                                mealnames[6] = meals[0].meal7;
                                mealservs[6] = meals[0].meal7serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 8:
                            if (meals[0].meal8) {
                                mealnames[7] = meals[0].meal8;
                                mealservs[7] = meals[0].meal8serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 9:
                            if (meals[0].meal9) {
                                mealnames[8] = meals[0].meal9;
                                mealservs[8] = meals[0].meal9serving;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                        case 10:
                            if (meals[0].meal10) {
                                mealnames[9] = meals[0].meal10;
                                mealservs[9] = meals[0].meal10serving;
                                nulled_meal = true;
                                i++;
                            }
                            else {
                                nulled_meal = true;
                            }
                            break;
                    }

                } while (nulled_meal == false)
                console.log("MealName Length: ");
                console.log(mealnames.length);
                console.log("servings: ");
                console.log(mealservs);
                dailymeals = mealnames;
                for(var j = 0; j < mealnames.length; ++j) //max length of 10
                {
                    const newest = document.getElementById(`Meal${j+1}`);
                    const newestLabel = document.getElementById(`MealLabel${j+1}`);
                    newestLabel.innerHTML = mealnames[j];
                    newestLabel.style.display = "inline";
                    newest.style.display = "inline";

                    const newestServing = document.getElementById(`Meal${j+1}Serving`);
                    const newestServingLabel = document.getElementById(`MealServingLabel${j+1}`);
                    newestServing.style.display = "inline";
                    newestServing.value = mealservs[j];
                    newestServingLabel.innerHTML = " " + mealnames[j] + " Serving: ";
                    newestServingLabel.style.display= "inline";
                }
            }
        })


}

InitializeMealsOfTheDay();
GetMeals();