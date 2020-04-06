const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User', require('../schema/user'));
const wintson = require('winston')
const Router = express.Router
const userController = new Router()

userController.use((req, res, next) => {
  wintson.debug('reached user page')
  next()
})

// Register
userController.post('/register', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try {
    user.validate((error) => {
      if(error){
        res.status(400).json({
          "message": `${error}`
        })
      } else {
        user.save()
        res.send(user)
      }
    })
  } catch (error){
    res.status(400).json({
      "message": `${error}`
    })
  }
})
// get all
userController.get('/', async (req, res) => {
  try {
    const returnedUsers = await User.find()
    res.send(returnedUsers)
  } catch (error){
    res.status(404).json({
      "message": `${error}`
    })
  }
})

// get one user
userController.get('/:id', async (req, res) => {
  try {
    const returnedUser = await User.findById(req.params.id)
    res.send(returnedUser)
  } catch (error) {
    res.status(400).json({
      "message": `${error}`
    })
  }
})
module.exports = userController