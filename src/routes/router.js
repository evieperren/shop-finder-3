const express = require('express')
const winston = require('winston')

const Router = express.Router
const router = new Router()

router.use((req, res, next) => {
  console.log('reached router page!')
  // authorisation and authentication ...
  next()
})

router.use('/shops', require('../controller/shopController'))
router.use('/employees', require('../controller/employeeController'))

module.exports = router