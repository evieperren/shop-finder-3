const supertest = require('supertest')
// const app = require('../src/index') // Link to your server file
// const request = supertest(app)
var express = require('express');
const app = express()

describe('Employee test suite', () => {
  it('should return employees on GET request', async done => {
    const res = await supertest(app).get('/employee')
    expect(res.status).toBe(200)
    console.log(res.status)
    done()
  }, 30000)
  it('should return a single employee on GET request with ID', async done => {
    const res = await supertest(app).get('/employees/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
  it('should create an employees on POST request', async done => {
    const res = await supertest(app).post('/api/employees/', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should update a single employee on PUT request', async done => {
    const res = await supertest(app).put('/api/employees/5e7a7df4e6e64aca175cbd70', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should delete an employee on DELETE request', async done => {
    const res = await supertest(app).delete('/api/employees/5e7a7df4e6e64aca175cbd70')
    expect(res.status).toBe(200)
    done()
  })
})
describe("POST /users", () => {
  let data = {
    name: "dummy",
    email: "dummy@dummy.com",
    password: 123456
  };

  it("Creates a new user", done => {
    supertest(app)
      .post("/api/employees")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(response => {console.log(response)})
      .expect(500);
  });
});