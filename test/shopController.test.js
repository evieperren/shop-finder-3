const supertest = require('supertest')
const app = require('../src/controller/shopController')
// const mongoDB = require('./test.config')

describe('Shop test suite', () => {
  // TypeError: Cannot read property 'apply' of undefined
  it('should return shops on GET request', function (done) {
    supertest(app)
    .get('/api/shops')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
    });

  })
    // try {
    //   const res = await supertest(app).get('/').auth('username', 'password')
    //   expect(res.statusCode).toBe(200);

    // } catch (error) {
    //   console.log(error)
    // }
  // });
  // })
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
// })