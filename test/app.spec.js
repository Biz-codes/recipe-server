const supertest = require('supertest');
const app = require('../app');
const data = require('../data.json');
const recipes = data.recipes

describe('App', () => {

    describe('GET /', () => {
        it('responds with 200 and "Hello, world!"', () => {
            return supertest(app)
                .get('/')
                .expect(200, 'Hello, world!')
        })
        
    })

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

    describe('GET /recipes', () => {
        it('responds with 200 and all recipe names', () => {
            const recipeNames = recipes.map((el) => {
                return el.name
            })
            return supertest(app)
                .get('/recipes')
                .expect(200, {recipeNames} )
        })
    })

})

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

    describe ('GET /recipes/details/:name', () => {

        context('if recipe exists', () => {
            it('responds with 200, recipe ingredients, and number of steps', () => {
                const name = 'garlicPasta'
                const details = {
                    "ingredients": [
                        "500mL water",
                        "100g spaghetti",
                        "25mL olive oil",
                        "4 cloves garlic",
                        "Salt"
                    ],
                    "numSteps":5
                }
                return supertest(app)
                    .get(`/recipes/details/${name}`)
                    .expect(200, {details})
            })
        })

        context('if recipe does not exist', () => {
            it('responds with 200 and {}', () => {
                const name = 'girlicPasta'
                return supertest(app)
                    .get(`/recipes/details/${name}`)
                    .expect(200, {})
            })
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

    describe('POST /recipes', () => {

        context('given the recipe does not exist', () => {
            it('posts the new recipe and responds with 201', () => {
                const newRecipe = {
                    "name": "butteredBagel", 
                	"ingredients": [
                		"1 bagel", 
                		"butter"
                	], 
                    "instructions": [
                    	"cut the bagel", 
                 		"spread butter on bagel"
                 	] 
                }
                return supertest(app)
                    .post('/recipes')
                    .send(newRecipe)
                    .expect(201)
            })
        })

        context('recipe already exists', () => {
            it('responds with 400 and error message', () => {
                const newRecipe = {
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
                }
                return supertest(app)
                    .post('/recipes')
                    .send(newRecipe)
                    .expect(400), {
                        error: `Recipe already exists`
                    }
            })
        })
    })

    // ## Part 4: successful
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

    describe('PUT /recipes', () => {

        context('given recipe does not exist', () => {
            it('responds with 404 and error message', () => {
                const updatedRecipe = {
                    "name": "bitteredBagel", 
                    "ingredients": [
                    	"1 bagel", 
                    	"2 tbsp butter"
                    ], 
                    "instructions": [
                    	"cut the bagel", 
                    	"spread butter on bagel"
                    ] 
                }

                return supertest(app)
                    .put('/recipes')
                    .send(updatedRecipe)
                    .expect(404, {
                        error: `Recipe does not exist`
                    })
            })
        })

        context('given the recipe exists', () => {
            it('updates the recipe and responds with 204', () => {
                const updatedRecipe = {
                    "name": "butteredBagel", 
                    "ingredients": [
                    	"1 bagel", 
                    	"2 tbsp butter"
                    ], 
                    "instructions": [
                    	"cut the bagel", 
                    	"spread butter on bagel"
                    ] 
                }
                return supertest(app)
                    .put('/recipes')
                    .send(updatedRecipe)
                    .expect(204)
            })
        })
    })

})
