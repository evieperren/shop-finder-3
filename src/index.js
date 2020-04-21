const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston')
const expressValidator = require('express-validator')
const routerPage = require('./routes/router');
// const passport = require('./passport');

const app = express();

mongoose.connect(`${process.env.DATABASE_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator())
// [winston] Attempt to write logs with no transports {"message":"connected to database","level":"debug"}
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: './logs/errors.log',
        }),
        new winston.transports.File({
          level: 'debug',
          filename: './logs/debug.log'
        })
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      level: 'error',
      level: 'debug'
    }));

    app.use('/api', routerPage);
    winston.debug('connected to database');
  })
  .catch((error) => {
    winston.error(error.message);
  });
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
module.exports = app;
