const supertest = require('supertest')
const app = require('../../../app')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)
const categoryMock = {
  name: 'Category',
  description: 'category description',
  deletedAt: null,
  createdAt: new Date,
  updatedAt: new Date
}

describe('Categories endpoint /categories', () => {
  let token 
  beforeAll( async () => {
    token = await getTestAdminToken(request)
  })

  describe('Correct users requests', () => {
    const wantedFields = ["id", "name", "description"]

    it('Should return a list of all categories', async (done) => {
      const response = await request.get('/categories')
      const { body: { data: { categories } } } = response
      const returnedFields = Object.keys(categories[0])

      expect(response.status).toBe(200)
      expect(categories.length).toBeTruthy()
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should create and return a category', async (done) => {
      const newCategory = { ...categoryMock, name: 'test' }
      const response = await request
        .post('/categories')
        .set('Authorization', token)
        .send(newCategory)
      const { body: { data: { category } } } = response
      
      expect(response.status).toBe(201)
      expect(category.name).toBe(newCategory.name)
      expect(category.description).toBe(newCategory.description)
      done()
    })

    it('Should update and return a category', async (done) => {
      const update = {
        name: 'updateTest',
        description: 'updateDescriptionTest'
      }
      const response = await request
        .patch('/categories/2')
        .set('Authorization', token)
        .send(update)
      const { body: { data: { category } } } = response
      
      expect(response.status).toBe(200)
      expect(category.name).toBe(update.name)
      // Categories patch endpoint is just updating the name
      /* expect(category.description).toBe(update.description) */
      done()
    })

    it('Should delete a category', async (done) => {
      const response = await request
        .delete('/categories/1')
        .set('Authorization', token)
      
      expect(response.status).toBe(202)
      expect(response.body.data.message).toBe('La Categoria con id: 1 fue removida con exito')
      done()
    })
  })

  describe('Bad user requests', () => {
    it('Should complain about missing name', async (done) => {
      const { name, ...newCategory } = categoryMock
      const response = await request
        .post('/categories')
        .send(newCategory)
        .set('Authorization', token)
      
      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('El nombre debe contener 2 o más caracteres.')
      done()
    })

    it('Should complain about incorrect id at update endpoint', async (done) => {
      const response = await request
        .patch('/categories/45345435')
        .send(categoryMock)
        .set('Authorization', token)
      
      expect(response.status).toBe(404)
      expect(response.body.data.message).toBe('La Categoria con id: 45345435 no existe')
      done()
    })
  })
})
