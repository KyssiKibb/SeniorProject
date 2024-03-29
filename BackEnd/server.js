const express = require('express');
const QueryIng = require("../database/database.js");
const path = require("path");
const cors = require("cors");
const db = new QueryIng.A;

const app = express();
app.use(cors());

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/searchIngredient', async (req,res) => {
    const result = await db.QueryIng(req.query.search);
    res.json(result);
});
app.get('/AllIngredients', async (req,res) => {
    const result = await db.GetIngredients();
    res.json(result);
});
app.get('/DeleteIng', async(req, res) => {
    const result = await db.DeleteIngredient(req.query.search);
    res.json(result);
})
app.get('/CreateIng', async(req, res) => {
    param = req.query;
    const result = await db.CreateIngredient(
                    param.name, param.servingsize, param.calories,
                    param.fat, param.cholesterol, param.sodium,
                    param.carbs, param.protein);
    res.json(req.query.name);
})

app.get('/UpdateIng', async(req, res) => {
    param = req.query;
    const result = await db.UpdateIngredient(
                    param.name, param.servingsize, param.calories,
                    param.fat, param.cholesterol, param.sodium,
                    param.carbs, param.protein);
    res.json(req.query.name);
})

app.get('/GetMeals', async (req,res) => {
    const result = await db.GetMeals();
    res.json(result);
});
app.get('/searchMeal', async (req,res) => {
    const result = await db.GetMeal(req.query.search);
    res.json(result);
})
app.get('/CreateMeal', async (req,res) => {
    param = req.query;
    var ingr = [];
    ingr.push(param.ing1);
    ingr.push(param.ing2);
    ingr.push(param.ing3);
    ingr.push(param.ing4);
    ingr.push(param.ing5);
    ingr.push(param.ing6);
    ingr.push(param.ing7);
    ingr.push(param.ing8);
    ingr.push(param.ing9);
    ingr.push(param.ing10);
    ingr.push(param.ing11);
    ingr.push(param.ing12);
    ingr.push(param.ing13);
    ingr.push(param.ing14);
    ingr.push(param.ing15);
    ingr.push(param.ing16);
    ingr.push(param.ing17);
    ingr.push(param.ing18);
    ingr.push(param.ing19);
    ingr.push(param.ing20);
    var serv = [];
    serv.push(param.ing1serving);
    serv.push(param.ing2serving);
    serv.push(param.ing3serving);
    serv.push(param.ing4serving);
    serv.push(param.ing5serving);
    serv.push(param.ing6serving);
    serv.push(param.ing7serving);
    serv.push(param.ing8serving);
    serv.push(param.ing9serving);
    serv.push(param.ing10serving);
    serv.push(param.ing11serving);
    serv.push(param.ing12serving);
    serv.push(param.ing13serving);
    serv.push(param.ing14serving);
    serv.push(param.ing15serving);
    serv.push(param.ing16serving);
    serv.push(param.ing17serving);
    serv.push(param.ing18serving);
    serv.push(param.ing19serving);
    serv.push(param.ing20serving);

    var ingredients = [];
    var ingredientservings = [];
    var stop = false;
    var i=0;
    while(i < 20 && !stop)
    {
        if(ingr[i] == "placeholder") //it isn't actual data
        {
            stop = true;
        }
        else
        {
            ingredients.push(ingr[i]);
            ingredientservings.push(serv[i]);
            ++i;
        }
    }

    const result = await db.CreateMeal(param.name, param.servingsize,
        param.calories, param.fat, param.cholesterol,
        param.sodium, param.carbs, param.protein, ingredients, ingredientservings);
    res.json(param);
});
app.get('/DeleteMeal', async(req, res) => {
    const result = await db.DeleteMeal(req.query.search);
    res.json(result);
})

app.get('/ChangeDaily', async(req, res) => {
    param = req.query;
    var meal = [];
    meal.push(param.meal1);
    meal.push(param.meal2);
    meal.push(param.meal3);
    meal.push(param.meal4);
    meal.push(param.meal5);
    meal.push(param.meal6);
    meal.push(param.meal7);
    meal.push(param.meal8);
    meal.push(param.meal9);
    meal.push(param.meal10);
    var serv = [];
    serv.push(param.meal1serving);
    serv.push(param.meal2serving);
    serv.push(param.meal3serving);
    serv.push(param.meal4serving);
    serv.push(param.meal5serving);
    serv.push(param.meal6serving);
    serv.push(param.meal7serving);
    serv.push(param.meal8serving);
    serv.push(param.meal9serving);
    serv.push(param.meal10serving);

    var meals = [];
    var mealservings = [];
    var stop = false;
    var i=0;
    while(i < 10 && !stop)
    {
        if(meal[i] == "placeholder") //it isn't actual data
        {
            stop = true;
        }
        else
        {
            meal[i] = meal[i].replace('_',' ');
            meals.push(meal[i]);
            mealservings.push(serv[i]);
            ++i;
        }
    }
    var calories = 0;
    var fat = 0;
    var cholesterol = 0;
    var sodium = 0;
    var carbs = 0;
    var protein = 0;
    for(var j = 0; j < i; ++j)
    {
        const mealres = await db.GetMeal(meal[j]);
        const CAL = Math.floor(mealres[0].calories * mealservings[j]);
        if(!isNaN(CAL))
            calories += CAL;
        const FAT = Math.floor(mealres[0].fat * mealservings[j]);
        if(!isNaN(FAT))
            fat += FAT;
        const CHOL = Math.floor(mealres[0].cholesterol * mealservings[j]);
        if(!isNaN(CHOL))
            cholesterol += CHOL;
        const SOD = Math.floor(mealres[0].sodium * mealservings[j]);
        if(!isNaN(SOD))
            sodium += SOD;
        const CARB = Math.floor(mealres[0].carbs * mealservings[j]);
        if(!isNaN(CARB))
            carbs += CARB;
        const PROT = Math.floor(mealres[0].protein * mealservings[j]);
        if(!isNaN(PROT))
            protein += PROT;
    }

    const result = await db.UpdateDaily(param.date, meals, mealservings,calories,fat,cholesterol,sodium,carbs,protein);
    res.json(result);
})

app.get('/CreateDaily', async(req,res) => {
    const result = await db.CreateDaily(req.query.search);
    res.json(result);
})

app.get('/GetDaily', async(req,res) => {
    const result = await db.GetDaily(req.query.search);

    res.json(result);
})

app.listen(5500, () => console.log('Listening on port 5500'));
