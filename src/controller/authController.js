const mongoose = require('mongoose')
const winston = require('winston');

const { Router } = require('express');
const authController = new Router()

authController.use((req, res, next) => {
  console.log('yay you have authenticated successfully!!')
})

module.exports = authController