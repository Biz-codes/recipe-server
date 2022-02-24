const { expect } = require("chai");
const app = require('../app')
const data = require('../data.json')

describe('App', () => {

    it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })

  it('GET /recipes responds with 200 and all recipe names"', () => {
    const recipes = data.recipes
    const recipeNames = recipes.map( (el) => {
        return el.name})
    return supertest(app)
      .get('/recipes')
      .expect(200, recipeNames)
  })

})