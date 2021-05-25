const db = require('../models/index')
const { emailSender } = require('./index')

beforeAll(() => {
  const mockedFunc = () => null
  jest.spyOn(db.sequelize, 'log').mockImplementation(mockedFunc)
  jest.spyOn(console, 'log').mockImplementation(mockedFunc)
  jest.spyOn(emailSender, 'sendEmail').mockImplementation(mockedFunc)
})

afterAll(() => {
  db.sequelize.close()
})

const getTestAdminToken = async (requestObject) => {
  const response = await requestObject
  .post('/auth/login')
  .send({
    email: 'rdejuares0@xing.com',
    password: '123456'
  })
  return `Bearer ${response.body.data.token}`
}

module.exports = {
  getTestAdminToken
}