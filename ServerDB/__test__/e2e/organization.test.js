const supertest = require('supertest')
const app = require('../../app')
const { getTestAdminToken } = require('../../utils/testSuiteSetup')

const request = supertest(app)

describe('Organizations endpoint /organizations/1/public', () => {
  it('Should return the organization data', async (done) => {
    const fields = ['name', 'image', 'phone', 'address', 'welcomeText', 'id', 'socialNetworks', 'slidesData']
    const response = await request.get('/organizations/1/public')
    const { body: { data: { organization } } } = response

    expect(response.status).toBe(200)
    expect(Object.keys(organization)).toStrictEqual(fields)
    done()
  })

  // Until the endpoint gets updated with AWS upload's service 
  it('Should update the desired organization data', async (done) => {
    const token = await getTestAdminToken(request)
    const update = {
      name: "testname",
      welcomeText: "testwelcome"
    }
    const response = await request
      .put('/organizations/1/public/1')
      .set('Authorization', token)
      .send(update)

    const { body: { data: { organization } } } = response

    expect(response.status).toBe(200)
    expect(organization).toHaveProperty('updatedAt')
    expect(organization).toHaveProperty('deletedAt')
    expect(organization).toHaveProperty('createdAt')
    expect(organization.name).toBe('testname')
    expect(organization.welcomeText).toBe('testwelcome')
    done()
  })
})
