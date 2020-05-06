const { Router } = require('express');
const winston = require('winston');

const router = new Router();

router.use((req, res, next) => {
  winston.debug('Reached router page');
  next();
});

router.use('/shops', require('../controller/shopController'));
router.use('/employees', require('../controller/employeeController'));

module.exports = router;
