const path = require('path')
const express = require('express')

const recipesRouter = express.Router()
const jsonParser = express.json();

// const dataPath = './data.json';

// const readFile = (
//     callback,
//     returnJson = false,
//     filePath = dataPath,
//     encoding = 'utf8'
// ) => {
//     fs.readFile(filePath, encoding, (err, data) => {
//         if (err) {
//             throw err;
//         }
//         callback(returnJson ? JSON.parse(data) : data);
//     });
// };
    
// const writeFile = (
//     fileData,
//     callback,
//     filePath = dataPath,
//     encoding = 'utf8'
// ) => {
//     fs.writeFile(filePath, fileData, encoding, err => {
//         if (err) {
//             throw err;
//         }

//         callback();
//     });
// };

const serializeRecipe = readFile(data => ({
    name: data.recipes.name,
    ingredients: data.recipes.ingredients,
    instructions: data.recipes.instructions
}))

recipesRouter
    .route('/')
    .get((req, res, next) => {
        const recipes = req.app.get(readFile)
    })