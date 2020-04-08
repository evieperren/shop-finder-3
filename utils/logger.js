const winston = require('winston');
// needs express winston or error
// 'attempt to write logs with no transports...requires middleware function'
const expressWinston = require('express-winston');

const log = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: '../logs/errors.log', level: 'error' }),
    new winston.transports.File({ filename: '../logs/debug.log', level: 'debug' }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

module.exports = log;
