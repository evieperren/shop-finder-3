const app = require('../src/index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)


describe('Employee test suite', () => {
  it('should return employees on GET request', async done => {
    const res = await request.get('/api/employees?role=employee')
    // expect(res.status).toBe(200)
    console.log(res.status)
    done()
  })
  it('should return a single employee on GET request with ID', async done => {
    const res = await request.get('/api/employees/5e7a7df4e6e64aca175cbd70?role=shopowner')
    expect(res.status).toBe(200)
    done()
  })
  it('should create an employees on POST request', async done => {
    const res = await request.post('/api/employees/5e7a7df4e6e64aca175cbd70?role=shopowner', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should update a single employee on PUT request', async done => {
    const res = await request.put('/api/employees/5e7a7df4e6e64aca175cbd70?role=shopowner', {
      name: 'evie'
    })
    expect(res.status).toBe(200)
    done()
  })
  it('should delete an employee on DELETE request', async done => {
    const res = await request.delete('/api/employees/5e7a7df4e6e64aca175cbd70?role=shopowner')
    expect(res.status).toBe(200)
    done()
  })
})