const { expect } = require("chai");
const supertest = require("supertest");
const app = require('../app')
const data = require('../data.json')
const recipes = data.recipes

describe('App', () => {

    describe('GET /', () => {
        it('GET / responds with 200 containing "Hello, world!"', () => {
            return supertest(app)
                .get('/')
                .expect(200, 'Hello, world!')
        })
    })
    
    describe('GET /recipes', () => {    
        it('responds with 200 and all recipe names', () => {
            const recipeNames = recipes.map( (el) => {
                return el.name})
            return supertest(app)
                .get('/recipes')
                .expect(200, {recipeNames})
        })
    })

    describe('GET /recipes/details/:name', () => {

        context('Given the recipe exists', () => {
            it('responds with 200 and recipe details', () => {
                const name = 'garlicPasta'
                const details = {
                    "ingredients": [
                        "500mL water",
                        "100g spaghetti",
                        "25mL olive oil",
                        "4 cloves garlic",
                        "Salt"
                    ],
                    "numSteps": 5
                }
                return supertest(app)
                    .get(`/recipes/details/${name}`)
                    .expect(200, {details})
            })
        })

        context('Given the recipe does NOT exist', () => {
            it('responds with 200 and {}', () => {
                const name = 'girlicPasta'
                return supertest(app)
                    .get(`/recipes/details/${name}`)
                    .expect(200, {})
      })
    })

    describe('POST /recipes', () => {

        context('Given the recipe doesnt already exist', () => {
            it('creates a new recipe and responds with 201', () => {
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

        context('Given the recipe already exists', () => {
            it('responds with 400 and an error message', () => {
                const newRecipe = {
                    "name": "garlicPasta",
                    "ingredients": [
                        "garlic",
                        "pasta"
                    ],
                    "instructions": [
                        "cook pasta",
                        "add garlic"
                    ]
                }
                return supertest(app)
                    .post('/recipes')
                    .send(newRecipe)
                    .expect(400, {
                        error: `Recipe already exists`
                    })
            })
        })
    })
  
    describe('PUT /recipes', () => {

        context('Given the recipe exists', () => {
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
                    .put(`/recipes`)
                    .send(updatedRecipe)
                    .expect(204)
            })
        })

        context('Given the recipe does NOT exist', () => {
            it('responds with 404 and an error message', () => {
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
                    .put(`/recipes`)
                    .send(updatedRecipe)
                    .expect(404, {
                        error: `Recipe does not exist`
                    })
            })
        })
    })
  

  })
})