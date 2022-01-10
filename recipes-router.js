// const path = require('path')
const express = require('express')
const recipesRouter = express.Router()

// const data = require("./data.json")

const data = {
    "recipes": [
      {
        "name": "scrambledEggs",
        "ingredients": [
          "1 tsp oil",
          "2 eggs",
          "salt"
        ],
        "instructions": [
          "Beat eggs with salt",
          "Heat oil in pan",
          "Add eggs to pan when hot",
          "Gather eggs into curds, remove when cooked",
          "Salt to taste and enjoy"
        ]
      },
      {
        "name": "garlicPasta",
        "ingredients": [
          "500mL water",
          "100g spaghetti",
          "25mL olive oil",
          "4 cloves garlic",
          "Salt"
        ],
        "instructions": [
          "Heat garlic in olive oil",
          "Boil water in pot",
          "Add pasta to boiling water",
          "Remove pasta from water and mix with garlic olive oil",
          "Salt to taste and enjoy"
        ]
      },
      {
        "name": "chai",
        "ingredients": [
          "400mL water",
          "100mL milk",
          "5g chai masala",
          "2 tea bags or 20 g loose tea leaves"
        ],
        "instructions": [
          "Heat water until 80 C",
          "Add milk, heat until 80 C",
          "Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes",
          "Remove mixture from heat; strain and enjoy"
        ]
      }
    ]
}

const recipes = data.recipes
const recipeNames = recipes.map( (el) => {
    return el.name
})

// recipesRouter.use("/recipes", recipesRouter)

recipesRouter.get('/', (req, res) => {
    res.json({ data });
});

recipesRouter.get('/recipes', (req, res) => {
    res.json({ recipeNames }).status(200)
});

recipesRouter.get('recipes/:name', (req, res) => {
    const { name } = req.params;
    const details = recipes.filter((recipes) => recipes.name === name)[0];
    res.json({ details })
})

recipesRouter.post('/recipes', (req, res) => {
    const { name, ingredients, instructions } = req.body;
    if (name && ingredients && instructions) {
        recipes.push({ name, ingredients, instructions });
        res.status(201)
    }
});

module.exports = recipesRouter;