const { Router } = require('express');
const winston = require('winston');
const router = new Router();
const { authenticateUsers, unauthorisedResponse } = require('../auth')

router.use((req, res, next) => {
  winston.debug('Reached router page');
  // check they can follow a route
  if(authenticateUsers(req.query.role)){
    next()
  } else {
    unauthorisedResponse()
  }
});



if(authenticateUsers('admin')){
  router.use('/shops', require('../controller/shopController'));
  router.use('/employees', require('../controller/employeeController'));
} else if(authenticateUsers('shopowner')){
  router.use('/shops', require('../controller/shopController'));
  router.use('/employees', require('../controller/error'))
} else if (authenticateUsers('employee')){
  router.use('/employees', require('../controller/employeeController'));
} else {
  unauthorisedResponse()
}


module.exports = router;
