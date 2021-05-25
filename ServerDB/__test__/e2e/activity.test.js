const supertest = require('supertest')
const app = require('../../../app')
const { activitiesMock } = require('../../mocks')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)

describe('Activities endpoint /activities', () => {
  let token
  beforeAll(async () => {
    token = await getTestAdminToken(request)
  })

  describe('Correct users requests', () => {
    const wantedFields = ["id", "name", "image", "content"]

    it('Should return a list of all activities', async (done) => {
      const response = await request.get('/activities')
      const { body: { data: { activities } } } = response
      const returnedFields = Object.keys(activities[0])

      expect(response.status).toBe(200)
      expect(activities.length).toBe(activitiesMock.length)
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should create and return an activity', async (done) => {
      const response = await request
        .post('/activities')
        .set('AUthorization', token)
        .send(activitiesMock[0])
      
      expect(response.status).toBe(201)
      expect(response.body.data.activity.name).toBe(activitiesMock[0].name)
      expect(response.body.data.activity.content).toBe(activitiesMock[0].content)
      done()
    })

    it('Should update and return an activity', async (done) => {
      const response = await request
        .put('/activities/5')
        .set('Authorization', token)
        .send(activitiesMock[0])
      
      expect(response.status).toBe(200)
      expect(response.body.data.activity.name).toBe(activitiesMock[0].name)
      expect(response.body.data.activity.content).toBe(activitiesMock[0].content)
      done()
    })

    it('Should delete an activity', async (done) => {
      const response = await request
        .delete('/activities/5')
        .set('Authorization', token)
      
      expect(response.status).toBe(202)
      expect(response.body.data.message).toBe(`La actividad con id: 5 fue removido con éxito`)
      done()
    })
  })

  describe('Bad user requests', () => {
    it('Should complain about missing content', async (done) => {
      const { content, ...newActivity } = activitiesMock[0]
      const response = await request
        .post('/activities')
        .set('AUthorization', token)
        .send(newActivity)
      
      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('El Contenido debe tener al menos 5 caracteres.')
      done()
    })

    it('Should complain about incorrect id at update endpoint', async (done) => {
      const response = await request
        .put('/activities/45345435')
        .set('Authorization', token)
        .send(activitiesMock[0])
      
      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('no existe una Actividad registrada con ese Id ')
      done()
    })

    it('Should complain about missing token at delete endpoint', async (done) => {
      const response = await request
        .delete('/activities/1')
      
      expect(response.status).toBe(401)
      expect(response.body.data.message).toBe('No autorizado.')
      done()
    })
  })
})