const mongoose = require('mongoose');
const User = mongoose.model('User', require('../schema/user'));
const wintson = require('winston')
const { Router } = require('express')
const userController = new Router()

userController.use((req, res, next) => {
  wintson.debug('reached user page')
  next()
})

// Register
userController.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })

  try {
    await user.validate();
    user.save()
    res.send(user)

  } catch (error){
    res.status(400).json({
      "message": `Unable to create user. ${error}`
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

// delete user
userController.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      "message": `User : ${req.params.id} has been successfully deleted`
    })
  } catch (error) {
    res.status(404).json({
      "message": `${error}`
    })
  }
})

// update a user
userController.put('/:id', async(req, res) => {
  try{
    const returnedUser = await User.findByIdAndDelete(req.params.id)
    const updatedUser = new User({
      ...returnedUser,
      name: req.body.name || returnedUser.name,
      email: req.body.email || returnedUser.email,
      password: req.body.password || returnedUser.password,
      role: req.body.role || returnedUser.role
    })
    await updatedUser.validate();
    updatedUser.save()
    res.send(updatedUser)

  } catch(error){
    res.status(404).json({
      "message": `${error}`
    })
  }
})
module.exports = userController