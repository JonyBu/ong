const supertest = require('supertest')
const app = require('../../../app')
const { emailSender } = require('../../utils')
const { usersMocks } = require('../../mocks')

const request = supertest(app)

describe('Auth endpoint /auth', () => {
  const randomNewEmail = `testemail${Math.random()*10000}@test.com`

  describe('Correct users requests', () => {
    it('Should register an user and return its data and the token', async (done) => {
      const { firstName, lastName } = usersMocks[0]
      const newUser = { 
        firstName,
        lastName,
        email: randomNewEmail,
        password: '123456'
      }
      const response = await request
        .post('/auth/register')
        .send(newUser)
      const { body: { data } } = response
  
      expect(response.status).toBe(201)
      expect(data.user.name).toBe(newUser.name)
      expect(data.user.email).toBe(newUser.email)
      expect(typeof data.token).toBe('string')
      done()
    })
  
    it('Should login an user and return its data and the token', async (done) => {
      const user = { email: randomNewEmail, password: '123456' }
      const response = await request
        .post('/auth/login')
        .send(user)
      const { body: { data } } = response
  
      expect(response.status).toBe(200)
      expect(data.user.email).toBe(user.email)
      expect(typeof data.token).toBe('string')
      done()
    })
  })

  describe('Bad users requests', () => {
    it('Should complain about a already taken email', async (done) => {
      const newUser = usersMocks[0]
      const response = await request
        .post('/auth/register')
        .send(newUser)

      expect(response.status).toBe(400)
      expect(response.body.ok).toBeFalsy()
      expect(response.body.data.message).toBe('El email no es válido o ya está en uso.')
      done()
    })

    it('Should complain about a invalid email format', async (done) => {
      const user = { email: 123123123213, password: 213123213 }
      const response = await request
        .post('/auth/login')
        .send(user)

      expect(response.status).toBe(400)
      expect(response.body.ok).toBeFalsy()
      expect(response.body.data.message).toBe('Email inválido.')
      done()
    })

    it('Should complain about invalid password', async (done) => {
      const user = { email: randomNewEmail, password: '' }
      const response = await request
        .post('/auth/login')
        .send(user)

      expect(response.body.data.message).toBe('La contraseña debe contener 6 o más caracteres.')
      done()
    })

    it('Should complain about incorrect password', async (done) => {
      const user = { email: randomNewEmail, password: 'nonetest' }
      const response = await request
        .post('/auth/login')
        .send(user)

      expect(response.body.data.message).toBe('Mail o contraseña incorrectos')
      done()
    })
  })  
})