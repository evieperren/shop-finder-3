const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

mongoose.connect('mongodb://localhost:2000/shop-finder-3', { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json())
    app.use('/api', require('./routes/router'))
    console.log('connected to database')
  })
  .catch((error) => {
    console.log(error, 'Unable to connect to database')
  })

module.exports = app