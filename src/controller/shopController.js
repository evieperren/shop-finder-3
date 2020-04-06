const mongoose = require('mongoose');
const winston = require('winston');
const { Router } = require('express');
const shopController = new Router();
const axios = require('axios');
const stringify = require('json-stringify-safe');
const Shop = mongoose.model('shops', require('../schema/shop'));

shopController.use((req, res, next) => {
  winston.debug('Reached shop controller');
  next();
});

// CREATE
shopController.post('/', (req, res) => {
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
    newShop.validate((error) => {
      if (error) {
        winston.error(error.message);
        res.status(400).json({
          message: `${error.message}`,
        });
      } else {
        newShop.save();
        res.send(newShop);
      }
    });
  } catch (error) {
    winston.error(error.message);
    res.status(400).json({
      message: 'Unable to create new shop',
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
    if(returnedShop === null ){
      res.status(404).json({
        message: 'Unable to find shop',
      });
    } else {
      res.send(returnedShop);
    }
  } catch (error) {
    winston.error(error.message);
    res.status(404).json({
      message: 'Unable to find shop',
    });
  }
});
// UPDATE
shopController.put('/:shopId', async (req, res) => {
  try {
    const returnedShop = await Shop.findById(req.params.shopId);

    const updatedShop = {
      ...returnedShop._doc,
      ...{
        name: req.body.name || returnedShop.name,
        type: req.body.type || returnedShop.type,
        location: {
          postcode: req.body.location.postcode || returnedShop.location.postcode,
          town: req.body.location.town || returnedShop.location.town,
          online: req.body.location.online || returnedShop.location.online
        },
        scale: req.body.scale || returnedShop.scale
      }
    }
    // const { name , type, postcode, town, online, scale } =  returnedShop
    // name = req.body.name || returnedShop.name
    // type = req.body.type || returnedShop.type
    // postcode = req.body.location.postcode || returnedShop.location.postcode
    // town = req.body.location.town || returnedShop.location.town
    // online = req.body.location.online || returnedShop.location.online
    // scale = req.body.scale || returnedShop.scale

    console.log(updatedShop)

    // updatedShop.validate((error) => {
    //   if (error) {
    //     winston.error(error.message);
    //     res.status(404).json({
    //       message: `${error.message}`,
    //     });
    //   } else {
        updatedShop.save();
        res.send(updatedShop);
      // }
    // });
  } catch (error) {
    winston.error(error.message);
    res.status(404).json({
      message: `${error}`,
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
shopController.post('/:shopId/employees', (req, res) => {
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
      res.send(newEmployee);
    })
    .catch((error) => {
      res.status(400).json({
        message: `${error}`,
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


async function returnShop(shopId){
  const returnedShop = await Shop.findById(shopId)
  res.send(returnedShop)
}