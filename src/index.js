const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('../utils/logger');

const cors = require('cors');
const routerPage = require('./routes/router');
const passport =  require('./passport')

const app = express();

mongoose.connect(`${process.env.DATABASE_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(passport.initialize())
    app.use(winston);

    app.use('/api', routerPage);
    // Cannot read property 'end' of undefined
    // winston('connected to database');
    console.log('connected to database');
  })
  .catch((error) => {
    // winston.log(error.message);
    console.log(error, 'Unable to connect to database');
  });

module.exports = app;
