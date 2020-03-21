const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router
const employeeController = new Router()
const Employee = mongoose.model('employee', require('../schema/employee'))

employeeController.use((req, res, next) => {
  console.log('reached employee controller')
  next()
})

employeeController.get('/', (req, res, next) => {
  res.send('all employees')
})
module.exports = employeeController