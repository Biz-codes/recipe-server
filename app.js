const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = require("./data.json");
const { callbackify } = require("util");

// const recipes = [
//       {
//         "name": "scrambledEggs",
//         "ingredients": [
//           "1 tsp oil",
//           "2 eggs",
//           "salt"
//         ],
//         "instructions": [
//           "Beat eggs with salt",
//           "Heat oil in pan",
//           "Add eggs to pan when hot",
//           "Gather eggs into curds, remove when cooked",
//           "Salt to taste and enjoy"
//         ]
//       },
//       {
//         "name": "garlicPasta",
//         "ingredients": [
//           "500mL water",
//           "100g spaghetti",
//           "25mL olive oil",
//           "4 cloves garlic",
//           "Salt"
//         ],
//         "instructions": [
//           "Heat garlic in olive oil",
//           "Boil water in pot",
//           "Add pasta to boiling water",
//           "Remove pasta from water and mix with garlic olive oil",
//           "Salt to taste and enjoy"
//         ]
//       },
//       {
//         "name": "chai",
//         "ingredients": [
//           "400mL water",
//           "100mL milk",
//           "5g chai masala",
//           "2 tea bags or 20 g loose tea leaves"
//         ],
//         "instructions": [
//           "Heat water until 80 C",
//           "Add milk, heat until 80 C",
//           "Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes",
//           "Remove mixture from heat; strain and enjoy"
//         ]
//       }
//     ]


const recipes = data.recipes
const recipeNames = recipes.map( (el) => {
    return el.name
})

// app.use("/recipes", recipesRouter)

app.get('/', (req, res) => {
    res.json({ data });
});

app.get('/recipes', (req, res) => {
    res.json({ recipeNames }).status(200)
});
 
app.get('recipes/details/:name', (req, res) => {
    const { name } = req.params;
    const recipe = recipes.filter((recipe) => recipe.name === name)[0];
    res.json({ recipe })
})

app.post('/recipes', (req, res, next) => {
    const { name, ingredients, instructions } = req.body;
    const newRecipe = { name, ingredients, instructions }
    const jsonObj = JSON.parse(newRecipe)
    const jsonContent = JSON.stringify(jsonObj);
    fs.writeFile('./data.json', jsonContent, 'utf8', function(err) {
        if(err) {
            throw err
        }
        callbackify();
    })
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

module.exports = app