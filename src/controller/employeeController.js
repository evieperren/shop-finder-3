const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

const { Router } = express;
const employeeController = new Router();
const Employee = mongoose.model('employee', require('../schema/employee'));

employeeController.use((req, res, next) => {
  console.log('reached employee controller');
  next();
});

// CREATE
employeeController.post('/', async (req, res) => {
  const newEmployee = new Employee({
    name: {
      first: req.body.name.first,
      last: req.body.name.last,
    },
    store: {
      name: req.body.store.name,
      shopId: req.body.store.shopId,
    },
    contactDetails: {
      telephone: req.body.contactDetails.telephone,
      email: req.body.contactDetails.email,
      postcode: req.body.contactDetails.postcode,
    },
    startDate: req.body.startDate,
    emergencyContact: {
      name: req.body.emergencyContact.name,
      telephone: req.body.emergencyContact.telephone,
      relation: req.body.emergencyContact.relation,
    },
  });
  try {
    newEmployee.validate((error) => {
      if (error) {
        winston.log('error', error.message);
        res.status(400).json({
          message: `${error.message}`,
        });
      } else {
        newEmployee.save();
        res.send(newEmployee);
      }
    });
  } catch (error) {
    winston.log('error', error.message);
    res.status(400).json({
      message: 'Unable to create new employee',
    });
  }
});
// READ
employeeController.get('/', async (req, res) => {
  try {
    const returnedEmployees = await Employee.find();
    res.send(returnedEmployees);
  } catch (error) {
    winston.log('error', error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
// READ ONE
employeeController.get('/:id', async (req, res) => {
  try {
    const returnedEmployees = await Employee.findById(req.params.id);
    res.send(returnedEmployees);
  } catch (error) {
    winston.log('error', error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
// UPDATE
employeeController.put('/:id', async (req, res) => {
  try {
    const returnedEmployee = await Employee.findById(req.params.id);

    returnedEmployee.name.first = req.body.name.first || returnedEmployee.name.first;
    returnedEmployee.name.last = req.body.name.last || returnedEmployee.name.last;
    returnedEmployee.store.name = req.body.store.name || returnedEmployee.store.name;
    returnedEmployee.store.shopId = req.body.store.shopId || returnedEmployee.store.shopId;
    returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone;
    returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email;
    returnedEmployee.contactDetails.postcode = req.body.contactDetails.postcode || returnedEmployee.contactDetails.postcode;
    returnedEmployee.startDate = req.body.startDate || returnedEmployee.startDate;
    returnedEmployee.emergencyContact.name = req.body.emergencyContact.name || returnedEmployee.emergencyContact.name;
    returnedEmployee.emergencyContact.telephone = req.body.emergencyContact.telephone || returnedEmployee.emergencyContact.telephone;
    returnedEmployee.emergencyContact.relation = req.body.emergencyContact.relation || returnedEmployee.emergencyContact.relation;

    returnedEmployee.validate((error) => {
      if (error) {
        winston.log('error', error.message);
        res.status(400).json({
          message: `${error}`,
        });
      } else {
        returnedEmployee.save();
        res.send(returnedEmployee);
      }
    });
  } catch (error) {
    winston.log('error', error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
// DELETE
employeeController.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `${req.params.id} has been successfully removed`,
    });
  } catch (error) {
    winston.log('error', error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
module.exports = employeeController;
