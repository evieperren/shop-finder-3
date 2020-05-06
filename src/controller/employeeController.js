const mongoose = require('mongoose');
const winston = require('winston');
const { validationResult, check } = require('express-validator/check');
const { Router } = require('express');

const employeeController = new Router();
const employeeSchema = require('../schema/employee');
const authenticate = require('../../utils/authentication');

const Employee = mongoose.model('employee', employeeSchema);

employeeController.use((req, res, next) => {
  winston.debug('Reached employee controller');
  next();
});

// CREATE
employeeController.post('/', authenticate.adminAndEmployee, [
  check('name.first', 'Please enter a valid name').isLength({ min: 2, max: 12 }).isString().isUppercase(),
  check('name.last', 'Please enter a valid last name').isLength({ min: 2, max: 12 }).isString().isUppercase(),
  check('store.name', 'Please enter a valid store name').isLength({ min: 2, max: 45 }).isString().matches(/([a-zA-Z])\w/),
  check('store.shopId', 'Please enter a valid shop ID').matches(/([a-zA-Z0-9])\w/).not().isEmpty(),
  check('contactDetails.telephone', 'Please enter a valid telephone number').matches(/([0-9])\w/),
  check('contactDetails.email', 'Please enter a valid email').matches(/^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/).normalizeEmail({ all_lowercase: true }),
  check('contactDetails.postcode', 'Please enter a valid postcode').matches(/((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/).isUppercase(),
  check('startDate', 'Please enter a valid start date').matches(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/),
  check('emergencyContact.name').isLength({ min: 2, max: 144 }).isUppercase(),
  check('emergencyContact.telephone').isLength({ min: 9, max: 11 }).matches(/([0-9])\w/),
  check('emergencyContact.relation').matches(/(parent)|(sibling)|(guardian)|(friend)|(collegue)|(wife)|(husband)|(child)/),
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
    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
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
employeeController.get('/', authenticate.admin, async (req, res) => {
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
employeeController.get('/:id', authenticate.admin, async (req, res) => {
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

employeeController.put('/:id', authenticate.adminAndEmployee, [
  check('name.first', 'Please enter a valid name').isLength({ min: 2, max: 12 }).isString().isUppercase(),
  check('name.last', 'Please enter a valid last name').isLength({ min: 2, max: 12 }).isString().isUppercase(),
  check('store.name', 'Please enter a valid store name').isLength({ min: 2, max: 45 }).isString().matches(/([a-zA-Z])\w/),
  check('store.shopId', 'Please enter a valid shop ID').matches(/([a-zA-Z0-9])\w/).not().isEmpty(),
  check('contactDetails.telephone', 'Please enter a valid telephone number').matches(/([0-9])\w/),
  check('contactDetails.email', 'Please enter a valid email').matches(/^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/).normalizeEmail({ all_lowercase: true }),
  check('contactDetails.postcode', 'Please enter a valid postcode').matches(/((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/).isUppercase(),
  check('startDate', 'Please enter a valid start date').matches(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/),
  check('emergencyContact.name').isLength({ min: 2, max: 144 }).isUppercase(),
  check('emergencyContact.telephone').isLength({ min: 9, max: 11 }).matches(/([0-9])\w/),
  check('emergencyContact.relation').matches(/(parent)|(sibling)|(guardian)|(friend)|(collegue)|(wife)|(husband)|(child)/),
], async (req, res) => {
  try {
    const returnedEmployee = await Employee.findByIdAndUpdate(req.params.id);

    returnedEmployee.name.first = req.body.name.first || returnedEmployee.name.first;
    returnedEmployee.name.last = req.body.name.last || returnedEmployee.name.last;
    returnedEmployee.store.name = req.body.store.name || returnedEmployee.store.name;
    returnedEmployee.store.shopId = req.body.store.shopId || returnedEmployee.store.shopId;
    returnedEmployee.contactDetails.telephone = req.body.contactDetails.telephone || returnedEmployee.contactDetails.telephone;
    returnedEmployee.contactDetails.email = req.body.contactDetails.email || returnedEmployee.contactDetails.email;
    returnedEmployee.contactDetails.postcode = req.body.contactDetails.postcode || returnedEmployee.contactDetails.postcode;
    returnedEmployee.startDate = req.body.startDate || returnedEmployee.startDate;
    returnedEmployee.emergencyContact.name = req.body.emergencyContact.name || returnedEmployee.emergencyContact.name;
    returnedEmployee.contactDetails.telephone = req.body.emergencyContact.telephone || returnedEmployee.contactDetails.telephone;
    returnedEmployee.contactDetails.relation = req.body.emergencyContact.relation || returnedEmployee.contactDetails.relation;

    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      res.send(returnedEmployee);
    }
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: `Unable to update Employee. ${error}`,
    });
  }
});

// DELETE
employeeController.delete('/:id', authenticate.adminAndEmployee, async (req, res) => {
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
