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
const recipes = data.recipes

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// app.use("/recipes", recipesRouter)

// ## Part 1: successful
// Build a GET route that returns all recipe names.
// A GET request to http://localhost:3000/recipes returns:
// Response body (JSON):
// {
// 	"recipeNames":
// 		[
// 			"scrambledEggs",
// 			"garlicPasta",
// 			"chai"
// 		]
// }
// Status: 200

app.get('/recipes', (req, res) => {
    const recipeNames = recipes.map( (el) => {
        return el.name
    })
    res.json({ recipeNames }).status(200)
});

// ## Part 2: successful
// Build a GET route that takes a recipe name as a **string** param. Return the ingredients and the number of steps in the recipe as JSON
// A GET request to http://localhost:3000/recipes/details/garlicPasta returns:
// If recipe exists: 
// Response body (JSON):
// {
// 	"details":
// 		{
// 			"ingredients": [
// 				"500mL water",
// 				"100g spaghetti",
// 				"25mL olive oil",
// 				"4 cloves garlic",
// 				"Salt"
// 			],
// 			"numSteps":5
// 		}
// }
// Status: 200
// ---
// If recipe does NOT exist: 
// Response body (JSON): {}
// Status: 200

app.get('/recipes/details/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const listing = recipes.filter(recipe => recipe.name.toLowerCase().includes(name)) 
    const details = listing.map(listing => {
        return { ingredients: listing.ingredients, numSteps: listing.instructions.length }
    })
    res.json( {details} )
})

// ## Part 3: successful
// Add a POST route that can add additional recipes in the existing format to the backend with support for the above routes.
// A POST request to http://localhost:3000/recipes with body 
// {
// 	"name": "butteredBagel", 
// 		"ingredients": [
// 			"1 bagel", 
// 			"butter"
// 		], 
// 	"instructions": [
// 		"cut the bagel", 
// 		"spread butter on bagel"
// 	] 
// } 
// returns:
// Response body: None
// Status: 201

// Error Response:
// If the recipe already exists:
// Response body (JSON):
// {
// 	"error": "Recipe already exists"
// }
// Status: 400


app.post('/recipes', (req, res) => {
    const { name, ingredients, instructions } = req.body
    const newRecipe = { name, ingredients, instructions}

    const exists = recipes.find(recipe => recipe.name === name) 
    if(exists) {
        return res.status(400).json ({
            error: `Recipe already exists`
        })
    }
    if(!exists) {
        recipes.push(newRecipe)
        res.sendStatus(201)
    }
})


// ## Part 4: not yet attempted
// Add a PUT route that can update existing recipes.
// A PUT request to http://localhost:3000/recipes with body 
// {
// 	"name": "butteredBagel", 
// 		"ingredients": [
// 			"1 bagel", 
// 			"2 tbsp butter"
// 		], 
// 	"instructions": [
// 		"cut the bagel", 
// 		"spread butter on bagel"
// 	] 
// } returns:
// Response body: None
// Status: 204

// Error Response:
// If the recipe doesn't exist:
// Response body (JSON):
// {
// 	"error": "Recipe does not exist"
// }
// Status: 404

app.put('/recipes', (req, res) => {
    
    const { name, ingredients, instructions } = req.body
    const updatedRecipe = { name, ingredients, instructions}

    const exists = recipes.find(recipe => recipe.name === name) 
    if(!exists) {
        return res.status(404).json ({
            error: `Recipe does not exist`
        })
    }
    if(exists) {
        const index = recipes.findIndex(recipe => recipe.name === name)
        recipes[index] = updatedRecipe
        res.sendStatus(204)
    }
})

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

module.exports = app