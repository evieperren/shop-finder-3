const supertest = require('supertest')
const app = require('../src/index')
const mongoDB = require('./test.config')

describe('Shop test suite', () => {
  beforeAll(() => {
    mongoDB.connect();
  it('should return shops on GET request', async done => {
    try {
      const res = await supertest(app).get('/').auth('username', 'password')
      expect(res.statusCode).toBe(200);

      done()
    } catch (error) {
      console.log(error)
    }
  });
  })
  it('should return a single employee on GET request with ID', async done => {
    const res = await supertest(app).get('/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
  it('should create a employee on POST request', async done => {
    const res = await supertest(app).post('/5e7a7df4e6e64aca175cbd70', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should update a single employee on PUT request', async done => {
    const res = await supertest(app).put('/5e7a7df4e6e64aca175cbd70', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should delete an employee on DELETE request', async done => {
    const res = await supertest(app).delete('/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
})