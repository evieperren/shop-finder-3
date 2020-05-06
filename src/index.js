require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const expressValidator = require('express-validator');
const basicAuth = require('express-basic-auth');
const routerPage = require('./routes/router');

const app = express();
const { authoriseUsers, unauthorisedResponse } = require('../utils/authorisation');

mongoose.connect(`${process.env.DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(basicAuth({
      authorizer: authoriseUsers,
      authorizeAsync: true,
      challenge: true,
      unauthorizedResponse: unauthorisedResponse,
    }));
    // [winston] Attempt to write logs with no transports {"message":"connected to database","level":"debug"}
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: './logs/errors.log',
        }),
        new winston.transports.File({
          level: 'debug',
          filename: './logs/debug.log',
        }),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
    }));

    app.use('/api', routerPage);
    winston.debug('connected to database');
  })
  .catch((error) => {
    console.log(process.env.DATABASE)
    winston.error(error.message);
  });
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
module.exports = app;
