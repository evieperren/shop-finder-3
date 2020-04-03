const express = require('express');
const passport = require('../passport')
const { Router } = express;
const router = new Router();

router.use((req, res, next) => {
  console.log(passport)
  console.log('reached router page!');
  // authorisation and authentication ...
  next();
});

router.use('/shops', require('../controller/shopController')); // 400 bad request but should be 401
router.use('/employees', require('../controller/employeeController'));

module.exports = router;
