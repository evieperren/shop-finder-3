const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const passportLocalMongoose = require('passport-local-mongoose');
// const { check, validationResult , body} = require('express-validator');
const { Router } = express;
const employeeController = new Router();
const employeeSchema = require('../schema/employee');

employeeSchema.plugin(passportLocalMongoose);
const Employee = mongoose.model('employee', employeeSchema);

employeeController.use((req, res, next) => {
  winston.debug('Reached employee controller');
  next();
});

// CREATE
employeeController.post('/', [
  // this does not have an effect, validation kicks in here instead
  // body('name').escape().trim().isString(),
  // body('email').normalizeEmail()
], async (req, res) => {
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
    await newEmployee.validate();
    newEmployee.save();
    res.send(newEmployee);
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: `Unable to create new employee. ${error}`,
    });
  }
});
// READ
employeeController.get('/', async (req, res) => {
  try {
    const returnedEmployees = await Employee.find();
    res.send(returnedEmployees);
  } catch (error) {
    winston.error(error.message);
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
    winston.error(error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
// UPDATE
employeeController.put('/:id', async (req, res) => {
  try {
    const returnedEmployee = await Employee.findByIdAndDelete(req.params.id);
    const updatedEmployee = new Employee({
      ...returnedEmployee,
      name: {
        first: req.body.name.first || returnedEmployee.name.first,
        last: req.body.name.last || returnedEmployee.name.last,
      },
      store: {
        name: req.body.store.name || returnedEmployee.store.name,
        shopId: req.body.store.shopId || returnedEmployee.store.shopId,
      },
      contactDetails: {
        telephone: req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone,
        email: req.body.contactDetails.email || returnedEmployee.contactDetails.email,
        postcode: req.body.contactDetails.postcode || returnedEmployee.contactDetails.postcode,
      },
      startDate: req.body.startDate || returnedEmployee.startDate,
      emergencyContact: {
        name: req.body.emergencyContact.name || returnedEmployee.emergencyContact.name,
        telephone: req.body.emergencyContact.telephone || returnedEmployee.emergencyContact.telephone,
        relation: req.body.emergencyContact.relation || returnedEmployee.emergencyContact.relation,
      },
    });

    await updatedEmployee.validate();
    updatedEmployee.save();
    res.send(updatedEmployee);
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: `Unable to update Employee. ${error}`,
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
    winston.error(error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});
module.exports = employeeController;
