const passport = require('../passport');
const { Router } = require('express');
const winston = require('winston');
const router = new Router();

router.use((req, res, next) => {
  console.log(passport)
  winston.debug('Reached router page');
  // authorisation and authentication ...
  next();
});

router.use('/shops', require('../controller/shopController')); // 400 bad request but should be 401
router.use('/employees', require('../controller/employeeController'));

module.exports = router;
