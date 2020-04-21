const mongoose = require('mongoose');
const winston = require('winston');
const passportLocalMongoose = require('passport-local-mongoose');
const { checkSchema, validationResult } = require('express-validator/check');
const { Router } = require('express');
const employeeController = new Router();
const employeeSchema = require('../schema/employee');

employeeSchema.plugin(passportLocalMongoose);
const Employee = mongoose.model('employee', employeeSchema);

employeeController.use((req, res, next) => {
  winston.debug('Reached employee controller');
  next();
});

// CREATE
employeeController.post('/', async (req, res) => {
  req.check('first').isLength({min: 2})

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
    const errors = await validationResult(newEmployee)

    if(errors){
      console.log(errors)
      res.status(400).json({
        errors: errors.array()
      })
    } else {
      newEmployee.save();
      res.send(newEmployee);
    }

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
// does not do partial updates?

employeeController.put('/:id', async (req, res) => {
  try {
    const returnedEmployee = await Employee.findOneAndUpdate({_id: req.params.id},  {
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      },
      store: {
        name: req.body.store.name,
        shopId: req.body.store.shopId
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
    }, {new: true});
    res.send(returnedEmployee);

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
