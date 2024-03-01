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
    //console.log("we in here");
    console.log(req.query.search);
    const result = await db.QueryIng(req.query.search);
    res.json(result);
});
app.get('/AllIngredients', async (req,res) => {
    //console.log("we in here");
    const result = await db.GetIngredients();
    res.json(result);
    //console.log(res);
});
app.get('/DeleteIng', async(req, res) => {
    console.log(req.query.search);
    const result = await db.DeleteIngredient(req.query.search);
    res.json(result);
})
app.get('/CreateIng', async(req, res) => {
    // console.log("inside create ing");
    // console.log(req.query);
    // console.log(req.query.name);
    // console.log("serv");
    // console.log(req.query.servingsize);
    // console.log("cal");
    // console.log(req.query.calories);
    param = req.query;
    const result = await db.CreateIngredient(
                    param.name, param.servingsize, param.calories,
                    param.fat, param.cholesterol, param.sodium,
                    param.carbs, param.protein);
    res.json(req.query.name);
})
app.get('/GetMeals', async (req,res) => {
    //console.log("we in here");
    console.log(req.query.search);
    const result = await db.GetMeals();
    res.json(result);
});


app.listen(5500, () => console.log('Listening on port 5500'));

// import express from 'express';

// const app = express();
// db.GetIngredients().then(res => {
//         for(var i =0; i < res.length; ++i)
//         {
//             console.log("ingredient" + i);
//             console.log(res[i].name);
//         }
//     });
db.GetMeals().then(res => {
        for(var i =0; i < res.length; ++i)
        {
            console.log("meal " + i);
            console.log(res[i].name);
        }
})

// app.listen(8080, () => {
//     console.log("server is listening on port 8080");
// });