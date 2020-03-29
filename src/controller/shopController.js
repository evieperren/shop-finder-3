const express = require('express')
const mongoose = require('mongoose')
const winston = require('winston')
const Router = express.Router
const shopController = new Router()
const Shop = mongoose.model('shops', require('../schema/shop'))
const axios = require('axios')

shopController.use((req, res, next) => {
  console.log('reached shop controller')
  next()
})

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
    scale: req.body.scale
  })
  try {
    newShop.validate((error) => {
      if(error){
        winston.log('error', error.message)
        res.status(400).json({
          "message": `${error.message}`
        })
      } else {
        newShop.save()
        res.send(newShop)
      }
    })
  } catch (error){
    winston.log('error', error.message)
    res.status(400).json({
      "message": "Unable to create new shop"
    })
  }

})
// READ 
shopController.get('/', async (req, res) => {
  try{
    const returnedShops = await Shop.find()
    res.send(returnedShops)

  } catch (error) {
    winston.log('error', error.message)
    res.status(400).json({
      "message": "Unable to find shops"
    })
  }
})
// READ ONE
shopController.get('/:shopId', async(req, res) => {
  try{
    const returnedShop = await Shop.findById(req.params.shopId)
    res.send(returnedShop)

  } catch (error){
    winston.log('error', error.message)
    res.status(404).json({
      "message": "Unable to find shop"
    })
  }
})
// UPDATE
shopController.put('/:shopId', async(req, res) => {
  try {
    const returnedShop = await Shop.findById(req.params.shopId)

    returnedShop.name = req.body.name || returnedShop.name,
    returnedShop.type = req.body.type || returnedShop.type,
    returnedShop.location.postcode = req.body.location.postcode || returnedShop.location.postcode,
    returnedShop.location.town = req.body.location.town || returnedShop.location.town,
    returnedShop.location.online = req.body.location.online || returnedShop.location.online,
    returnedShop.scale = req.body.scale || returnedShop.scale

    returnedShop.validate((error) => {
      if(error){
        winston.log('error', error.message)
        res.status(404).json({
          "message": `${error.message}`
        })
      } else {
        returnedShop.save()
        res.send(returnedShop)
      }
    })

  } catch (error){
    winston.log('error', error.message)
    res.status(404).json({
      "message": `${error}`
    })
  }
})
// DELETE
shopController.delete('/:shopId', async(req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.shopId)
    res.status(200).json({
      "message": `${req.params.shopId} has been successfully removed`
    })
  } catch (error){
    winston.log('error', error.message)
    res.status(400).json({
      "message": `${error}`
    })
  }
})

// GET ALL EMPLOYEES
// "TypeError: Converting circular structure to JSON"
shopController.get('/:shopId/employees', (req, res) => {
  axios
  .get('http://localhost:3040/api/employees')
  .then((returnedEmployees) => {
    res.send(returnedEmployees)
    console.log(returnedEmployees)
  })
  .catch((error) => {
    res.status(400).json({
      "message": `${error}`
    })
  })
})
// GET ONE EMPLOYEE 
// CastError: Cast to ObjectId failed for value "undefined" at path "_id" for model "employee"
shopController.get('/:shopId/employees/:employeeID', (req, res) => {
  axios
    .get(`http://localhost:3040/api/employees/${req.params.employeeId}`)
    .then((response) => {
      // console.log(response)
      res.send(response)
    })
    .catch((error) => {
      res.status(400).json({
        "message": `${error}`
      })
    })
})
// ADD AN  EMPLOYEE
// "TypeError: Converting circular structure to JSON"
shopController.post('/:shopId/employees', (req, res) => {
  axios
    .post('http://localhost:3040/api/employees', {
      name: {
        first: "Richard",
        last: "Butland"
      },
      store: {
        name: "Hovis",
        shopId: "5e77b1a75af80d85a8"
      },
      contactDetails: {
        telephone: "07775467890",
        email: "richard.butland@gmail.com",
        postcode: "SP10 6GH"
      },
      startDate: "30/03/2020",
      emergencyContact: {
        name: "Dean",
        telephone: "01234567858",
        relation: "child"
      }
    })
    .then((response) => {
      // response.save()
      res.send(response)
      console.log(response)
    })
    .catch((error) => {
      res.status(400).json({
        "message": `${error}`
      })
    })
})
// REMOVE EMPLOYEE
shopController.delete('/:shopId/employees/:employeeId', (req, res) => {
  axios
    .delete(`http://localhost:3040/api/employees/${req.params.employeeId}`)
    .then((response)=> {
      console.log(response)
      res.status(200).json({
        "message": `${req.params.employeeId} has been successfully removed`
      })
    })
    .catch((error) => {
      res.status(400).json({
        "message": `${error}`
      })
    })
})
module.exports = shopController