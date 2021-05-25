const supertest = require('supertest')
const app = require('../../app')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')
const { membersMock } = require('../../mocks')

const request = supertest(app)

describe('Members endpoint /members', () => {
  let token 

  beforeAll( async () => {
    token = await getTestAdminToken(request)
  })

  describe('Correct users requests', () => {
    const wantedFields = ["name", "image"]

    it('Should return a list of all members', async (done) => {
      const response = await request.get('/members')
      const { body: { data: { members } } } = response
      const returnedFields = Object.keys(members[0])

      expect(response.status).toBe(200)
      expect(members.length).toBeTruthy()
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should create and return a member', async (done) => {
      const response = await request
        .post('/members')
        .set('Authorization', token)
        .send(membersMock[2])
      
      expect(response.status).toBe(201)
      expect(response.body.data.member.name).toBe(membersMock[2].name)
      expect(response.body.data.member.image).toBe(membersMock[2].image)
      done()
    })

    it('Should update and return a member', async (done) => {
      const response = await request
        .put('/members/1')
        .set('Authorization', token)
        .send(membersMock[2])
      
      expect(response.status).toBe(202)
      expect(response.body.data.member.name).toBe(membersMock[2].name)
      expect(response.body.data.member.image).toBe(membersMock[2].image)
      done()
    })

    it('Should delete a member', async (done) => {
      const response = await request
        .delete('/members/4')
        .set('Authorization', token)
      
      expect(response.status).toBe(202)
      expect(response.body.data.message).toBe(`Miembro con id 4 eliminado exitosamente`)
      done()
    })
  })

  describe('Bad users requests', () => {
    it('Should complain about missing name', async (done) => {
      const { name, ...newMember } = membersMock[2]
      const response = await request
        .post('/members')
        .set('Authorization', token)
        .send(newMember)
      
      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('El nombre debe ser un string.')
      done()
    })

    it('Should complain about incorrect id at update endpoint', async (done) => {
      const response = await request
        .put('/members/45345435')
        .set('Authorization', token)
        .send(membersMock[1])
      
      expect(response.status).toBe(404)
      expect(response.body.data.message).toBe('Miembro con id 45345435 no encontrado.')
      done()
    })
  })
})