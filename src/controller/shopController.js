const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router
const shopController = new Router()
const Shop = mongoose.model('shops', require('../schema/shop'))

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
    newShop.save()
    res.send(newShop)
  } catch (error){
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

    returnedShop.save()
    res.send(returnedShop)

  } catch (error){
    res.status(404).json({
      "message": `${error}`
    })
  }
})
// DELETE
shopController.delete('/:shopId', async(req, res) => {
  try {
    const returnedShop = await Shop.findByIdAndDelete(req.params.shopId)
    res.status(200).json({
      "message": `${req.params.shopId} has been successfully removed`
    })
  } catch (error){
    res.status(400).json({
      "message": `${error}`
    })
  }
})
// GET ALL EMPLOYEES
shopController.get('/:shopId/employees', (req, res) => {
})
// CREATE EMPLOYEE
shopController.post('/:shopId/employees', (req, res) => {
})
// DELETE EMPLOYEE
shopController.post('/:shopId/employees/:employeeId', (req, res) => {
})
module.exports = shopController