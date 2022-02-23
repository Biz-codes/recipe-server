const { expect } = require("chai");
const app = require('../app')

describe('App', () => {

    it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })

  it('GET /recipes responds with recipe names"', () => {
    return supertest(app)
      .get('/recipes')
      .expect(200, 'Hello, world!')
  })

})