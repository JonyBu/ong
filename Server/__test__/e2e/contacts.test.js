const supertest = require('supertest')
const app = require('../../app')
const { contactsMock } = require('../../mocks')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)

describe('Contacts endpoint /contacts', () => {
  describe('Correct user requests', () => {
    it('Should return a list of all contacts messages', async (done) => {
      const token = await getTestAdminToken(request)
      const response = await request
        .get('/contacts')
        .set('Authorization', token)
      const { body: { data: { contacts } } } = response
      const returnedFields = Object.keys(contacts[0])
      const wantedFields = Object.keys(contactsMock[0])

      expect(response.status).toBe(200)
      expect(contacts.length).toBeTruthy()
      expect(returnedFields).toEqual(expect.arrayContaining(wantedFields))
      done()
    })

    it('Should create and return a new contacts message', async (done) => {
      const response = await request
        .post('/contacts')
        .send(contactsMock[2])
      const { body: { data: { contact } } } = response
  
      expect(response.status).toBe(201)
      expect(contact.message).toBe(contactsMock[2].message)
      done()
    })  
  })

  describe('Bad users requests', () => {
    it('Should complain about missing token', async (done) => {
      const response = await request.get('/contacts')
      
      expect(response.status).toBe(401)
      expect(response.body.data.message).toBe('No autorizado.')
      done()
    })

    it('Should complain about missing message', async (done) => {
      const { message, ...newContact } = contactsMock[0]
      const response = await request
        .post('/contacts')
        .send(newContact)

      expect(response.status).toBe(400)
      expect(response.body.data.message).toBe('El campo Mensaje es obligatorio')
      done()
    })
  })

  
})

