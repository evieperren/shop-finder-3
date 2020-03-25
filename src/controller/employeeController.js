const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router
const employeeController = new Router()
const Employee = mongoose.model('employee', require('../schema/employee'))

employeeController.use((req, res, next) => {
  console.log('reached employee controller')
  next()
})

// CREATE 
employeeController.post('/', async(req, res) => {
  const newEmployee = new Employee({
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName,
    },
    store: {
      name: req.body.store.name,
      shopId: req.body.store.shopId,
    },
    contactDetails: {
      telephone: req.body.contactDetails.telephone,
      email: req.body.contactDetails.email,
      postcode: req.body.contactDetails.postcode
    },
    startDate: req.body.startDate,
    emergencyContact: {
      name: req.body.emergencyContact.name,
      telephone: req.body.emergencyContact.telephone,
      relation: req.body.emergencyContact.relation
    }
  })
  try {
    newEmployee.validate((error) => {
      if(error){
        res.status(400).json({
          "message": `${error.message}`
        })
      } else {
        newEmployee.save()
        res.send(newEmployee)
      }
    })
  } catch (error) {
    res.status(400).json({
      "message": "Unable to create new employee"
    })
  }
})
// READ 
employeeController.get('/', async(req, res, next) => {
  try {
    const returnedEmployees = await Employee.find()
    res.send(returnedEmployees)

  } catch (error) {
    res.status(400).json({
      "message": `${error}`
    })
  }
})
// READ ONE
employeeController.get('/:employeeId', async(req, res, next) => {
  try {
    const returnedEmployees = await Employee.findById(req.params.employeeId)

    if(returnedEmployees === null){
      res.status(400).json({
        "message": "This employee was unable to be found. Please check this is the employee ID"
      })
    } else {
      res.send(returnedEmployees)
    }
  } catch (error) {
    res.status(400).json({
      "message": `${error}`
    })
  }
})
// UPDATE
employeeController.put('/:employeeId', async(req, res) => {
  try {
    const returnedEmployee = await Employee.findById(req.params.employeeId)

    returnedEmployee.name.firstName = req.body.name.firstName || returnedEmployee.name.firstName,
    returnedEmployee.name.lastName = req.body.name.lastName || returnedEmployee.name.lastName,
    returnedEmployee.store.name = req.body.store.name || returnedEmployee.store.name,
    returnedEmployee.store.shopId = req.body.store.shopId || returnedEmployee.store.shopId,
    returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone,
    returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email,
    returnedEmployee.contactDetails.postcode = req.body.contactDetails.postcode || returnedEmployee.contactDetails.postcode,
    returnedEmployee.startDate = req.body.startDate || returnedEmployee.startDate,
    returnedEmployee.emergencyContact.name = req.body.emergencyContact.name || returnedEmployee.emergencyContact.name,
    returnedEmployee.emergencyContact.telephone = req.body.emergencyContact.telephone || returnedEmployee.emergencyContact.telephone,
    returnedEmployee.emergencyContact.relation = req.body.emergencyContact.relation || returnedEmployee.emergencyContact.relation

    returnedEmployee.validate((error) => {
      if(error){
        res.status(400).json({
          "message": `${error}`
        })
      } else {
        returnedEmployee.save()
        res.send(returnedEmployee)
      }
    })
  } catch (error) {
    res.status(400).json({
      "message": `${error}`
    })
  }
})
// DELETE
employeeController.delete('/:employeeId', async(req, res) => {
  try {
    const returnedEmployee = await Employee.findByIdAndDelete(req.params.employeeId)
    res.status(200).json({
      "message": `${req.params.employeeId} has been successfully removed`
    })
  } catch (error) {
    res.status(400).json({
      "message": `${error}`
    })
  }
})
module.exports = employeeController