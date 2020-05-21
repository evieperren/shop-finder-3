const supertest = require('supertest')
const app = require('../index')
const agent = supertest.agent(app);

describe('Shop test suite', () => {
  it('should return shops on GET request', async (done) => {
    const res = await agent.get('/api/shops/').auth('admin', 'adminPassword')
    console.log(res)
    expect(res.status).toBe(200)
    done()
    });
  xit('should return a single employee on GET request with ID', async done => {
    const res = await supertest(app).get('/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
  xit('should create a employee on POST request', async done => {
    const res = await supertest(app).post('/5e7a7df4e6e64aca175cbd70', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  xit('should update a single employee on PUT request', async done => {
    const res = await supertest(app).put('/5e7a7df4e6e64aca175cbd70', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  xit('should delete an employee on DELETE request', async done => {
    const res = await supertest(app).delete('/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
})