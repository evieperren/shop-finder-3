const winston = require('winston');

const log = winston.createLogger({
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
