const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const expressWinston = require('express-winston');
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

    // needs express winston or error
    // 'attempt to write logs with no transports...requires middleware function'
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: './logs/errors.log',
        }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      level: 'error',
    }));

    app.use('/api', routerPage);
    console.log('connected to database');
  })
  .catch((error) => {
    winston.log(error, error.message);
    console.log(error, 'Unable to connect to database');
  });

module.exports = app;
