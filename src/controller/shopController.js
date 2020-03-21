const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router
const shopController = new Router()
const Shop = mongoose.model('shops', require('../schema/shop'))

shopController.use((req, res, next) => {
  console.log('reached shop controller')
  next()
})

module.exports = shopController