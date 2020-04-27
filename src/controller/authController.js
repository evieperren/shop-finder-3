const { Router } = require('express');
const authController = new Router()
const { authenticateUsers } = require('../auth')

authController.use((req, res, next) => {
  console.log(req.query)
  // authenticateUsers(req.query)
  console.log('yay you have authenticated successfully!!')
})

module.exports = authController