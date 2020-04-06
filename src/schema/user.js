const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 7,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 1024
  }
})

module.exports = UserSchema