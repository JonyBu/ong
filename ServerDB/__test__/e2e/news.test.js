const supertest = require('supertest')
const app = require('../../../app')
const { newsMock } = require('../../mocks')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)

describe('News endpoint /news', () => {
  let token 

  beforeAll( async () => {
    token = await getTestAdminToken(request)
  })

  describe('Correct users requests', () => {
    const wantedFields = ["name", "image"]

    it('Should return a list of all news', async (done) => {
      const response = await request.get('/news')
      const { body: { data: { news } } } = response
      const returnedFields = Object.keys(news[0])

      expect(response.status).toBe(200)
      expect(news.length).toBeTruthy()
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should create and return a new', async (done) => {
      const response = await request
        .post('/news')
        .set('Authorization', token)
        .send(newsMock[0])

      expect(response.status).toBe(201)
      expect(response.body.data.new.name).toBe(newsMock[0].name)
      expect(response.body.data.new.image).toBe(newsMock[0].image)
      done()
    })

    it('Should update and return a new', async (done) => {
      const response = await request
        .put('/news/1')
        .set('Authorization', token)
        .send({ ...newsMock[0], name: 'test' })
      
      console.log(response.body.data.updatedNew)
      expect(response.status).toBe(200)
      expect(response.body.data.new.name).toBe('test')
      done()
    })

    it('Should delete a new', async (done) => {
      const response = await request
        .delete('/news/1')
        .set('Authorization', token)
      
      expect(response.status).toBe(202)
      expect(response.body.data.message).toBe(`La Entrada del tipo Novedad con id: 1 fue removida con exito`)
      done()
    })
  })

  describe('Bad users requests', () => {
    it('Should complain about missing name', async (done) => {
      const { name, ...newEntry } = newsMock[0]
      const response = await request
        .post('/news')
        .set('Authorization', token)
        .send(newEntry)
      
      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('El nombre debe contener 3 o más caracteres.')
      done()
    })

    it('Should complain about incorrect id at delete endpoint', async (done) => {
      const response = await request
        .delete('/news/45345435')
        .set('Authorization', token)
      
      expect(response.status).toBe(404)
      expect(response.body.data.message).toBe('La Entrada del tipo Novedad con id: 45345435 no existe')
      done()
    })
  })
})