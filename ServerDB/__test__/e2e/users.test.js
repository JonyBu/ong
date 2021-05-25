const supertest = require('supertest')
const app = require('../../../app')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)

describe('Users endpoint /users', () => {
  let token 

  beforeAll( async () => {
    token = await getTestAdminToken(request)
  })

  describe('Correct users requests', () => {
    it('Should return a list of users', async (done) => {
      const response = await request
        .get('/users')
        .set('Authorization', token)

      const wantedFields = ["id", "firstName", "lastName", "email"]
      const returnedFields = Object.keys(response.body.data.users[0])
      
      expect(response.status).toBe(200)
      expect(response.body.data.users.length).toBeGreaterThan(0)
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should delete an user', async (done) => {
      const response = await request
        .delete('/users/5')
        .set('Authorization', token)
        
      expect(response.status).toBe(202)
      expect(response.body.data.message).toBe('Usuario con id 5 eliminado exitosamente.')
      done()
    })
  })

  describe('Bad users requests', () => {
    it('Should complain about missing token', async (done) => {
      const response = await request.get('/users')

      expect(response.status).toBe(401)
      expect(response.body.data.message).toBe('No autorizado.')
      done()
    })

    it('Should complain about incorrect id to delete', async (done) => {
      const response = await request
        .delete('/users/test')
        .set('Authorization', token)

      expect(response.status).toBe(404)
      expect(response.body.data.message).toBe('Usuario con id test no encontrado.')
      done()
    })
  })
})