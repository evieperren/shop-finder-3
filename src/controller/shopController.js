const mongoose = require('mongoose');
const winston = require('winston');
const { Router } = require('express');
const shopController = new Router();
const axios = require('axios');
const stringify = require('json-stringify-safe');
const { check, validationResult } = require('express-validator/check')
const Shop = mongoose.model('shops', require('../schema/shop'));

shopController.use((req, res, next) => {
  winston.debug('Reached shop controller');
  next();
});

// CREATE
shopController.post('/', [
  check('name', 'Please enter a valid name').isString().isLength({min: 2, max: 144}),
  check('type', 'Please enter a valid shop type').isString().isLength({min: 2, max: 144}),
  check('location.postcode', 'Please enter a valid postcode').matches(/((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/).isUppercase(),
  check('location.town', 'Please enter a valid town').isString().isUppercase(),
  check('location.online', 'Please enter a boolean').isBoolean(),
  check('scale', 'Please enter a valid string').isString().matches(/(local)|(national)|(global)|(international)/)
], async(req, res) => {
  const newShop = new Shop({
    name: req.body.name,
    type: req.body.type,
    location: {
      postcode: req.body.location.postcode,
      town: req.body.location.town,
      online: req.body.location.online,
    },
    scale: req.body.scale,
  });
  try {

    const errors = await validationResult(req)
    if(!errors.isEmpty()){
      res.status(400).json({
        errors: errors.array()
      })
    } else {
      newShop.save();
      res.send(newShop);
    }

  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: `Unable to create new shop. ${error}`,
    });
  }
});
// READ
shopController.get('/', async (req, res) => {
  try {
    const returnedShops = await Shop.find();
    res.send(returnedShops);
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: 'Unable to find shops',
    });
  }
});
// READ ONE
shopController.get('/:shopId', async (req, res) => {
  try {
    const returnedShop = await Shop.findById(req.params.shopId);
    res.send(returnedShop);
  } catch (error) {
    winston.error(error.message);
    res.status(404).json({
      message: `Unable to find shop. ${error}`,
    });
  }
});
// UPDATE
shopController.put('/:shopId', [
  check('name', 'Please enter a valid name').isString().isLength({min: 2, max: 144}),
  check('type', 'Please enter a valid shop type').isString().isLength({min: 2, max: 144}),
  check('location.postcode', 'Please enter a valid postcode').matches(/((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/).isUppercase(),
  check('location.town', 'Please enter a valid town').isString().isUppercase(),
  check('location.online', 'Please enter a boolean').isBoolean(),
  check('scale', 'Please enter a valid string').isString().matches(/(local)|(national)|(global)|(international)/)
], async (req, res) => {
  try {
    const returnedShop = await Shop.findOneAndUpdate({ _id: req.params.shopId}, {
      name: req.body.name,
      type: req.body.type,
      location: {
        postcode: req.body.location.postcode,
        town: req.body.location.town,
        online: req.body.location.online
      },
      scale: req.body.scale
    }, { new: true });

    const errors = await validationResult(req)

    if(!errors.isEmpty()){
      res.status(400).json({
        errors: errors.array()
      })
    } else {
      res.send(returnedShop)
    }

  } catch (error) {
    winston.error(error.message);
    res.status(404).json({
      message: `Unable to update shop. ${error}`,
    });
  }
});
// DELETE
shopController.delete('/:shopId', async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.shopId);
    res.status(200).json({
      message: `${req.params.shopId} has been successfully removed`,
    });
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: `${error}`,
    });
  }
});

// GET ALL EMPLOYEES
shopController.get('/:shopId/employees', (req, res) => {
  axios
    .get('http://localhost:3040/api/employees')
    .then((returnedEmployees) => {
    // "TypeError: Converting circular structure to JSON"
      stringify.getSerialize(returnedEmployees);
      res.send(returnedEmployees.data);
    })
    .catch((error) => {
      res.status(400).json({
        message: `${error}`,
      });
    });
});
// GET ONE EMPLOYEE
// CastError: Cast to ObjectId failed for value "undefined" at path "_id" for model "employee"
shopController.get('/:shopId/employees/:employeeID', (req, res) => {
  axios
    .get(`http://localhost:3040/api/employees/${req.params.employeeId}`)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(400).json({
        message: `${error}`,
      });
    });
});
// ADD AN  EMPLOYEE
shopController.post('/:shopId/employees', [
  check('name.first', 'Please enter a valid name').isLength({min: 2, max: 12}).isString().isUppercase(),
  check('name.last', 'Please enter a valid last name').isLength({min: 2, max: 12}).isString().isUppercase(),
  check('store.name', 'Please enter a valid store name').isLength({min:2, max: 45}).isString().matches(/([a-zA-Z])\w/),
  check('store.shopId', 'Please enter a valid shop ID').matches(/([a-zA-Z0-9])\w/).not().isEmpty(),
  check('contactDetails.telephone', 'Please enter a valid telephone number').matches(/([0-9])\w/),
  check('contactDetails.email', 'Please enter a valid email').matches(/^[a-zA-z]{2,144}((.){1}[a-zA-Z]{2,144})?(@)[a-zA-Z]{2,144}(.){1}([a-zA-Z]{3})/),
  check('contactDetails.postcode', 'Please enter a valid postcode').matches(/((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/).isUppercase(),
  check('startDate', 'Please enter a valid start date').matches(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/),
  check('emergencyContact.name').isLength({min: 2, max: 144}).isUppercase(),
  check('emergencyContact.telephone').isLength({min: 9, max:11}).matches(/([0-9])\w/),
  check('emergencyContact.relation').matches(/(parent)|(sibling)|(guardian)|(friend)|(collegue)|(wife)|(husband)|(child)/),
], (req, res) => {
  axios
    .post('http://localhost:3040/api/employees', {
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
    })
    .then((response) => {
      stringify.getSerialize(response);
      const newEmployee = response.data;

      // const errors = validationResult(req)
      // if(!errors.isEmpty()){
      //   res.status(400).json({
      //     errors: errors.array()
      //   })
      // } else {
        res.send(newEmployee);
      // }
    })
    .catch((error) => {
      res.status(400).json({
        message: `oh no ${error}`,
      });
    });
});
// REMOVE EMPLOYEE
shopController.delete('/:shopId/employees/:employeeId', (req, res) => {
  axios
    .delete(`http://localhost:3040/api/employees/${req.params.employeeId}`)
    .then(() => {
      res.status(200).json({
        message: `${req.params.employeeId} has been successfully removed`,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: `${error}`,
      });
    });
});
module.exports = shopController;