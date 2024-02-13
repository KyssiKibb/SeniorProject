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
    console.log("we in here");
    console.log(req.query.search);
    const result = await db.QueryIng(req.query.search);
    res.json(result);
});

app.listen(5500, () => console.log('Listening on port 5500'));

// import express from 'express';

// const app = express();

// app.listen(8080, () => {
//     console.log("server is listening on port 8080");
// });