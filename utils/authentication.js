const authenticate = {
  admin: (req, res, next) => {
    if(req.auth.user === 'admin' || req.auth.user === 'employee'|| req.auth.user === 'shop'){
      next()

    } else {
      res.status(401).json({
        'message': 'Unauthorised'
      })
    }
  },
  employee: (req, res, next) => {
    if(req.auth.user === 'employee'){
      next()

    } else {
      res.status(401).json({
        'message': 'Unauthorised'
      })
    }
  },
  shop: (req, res, next) => {
    if(req.auth.user === 'shop'){
      next()

    } else {
      res.status(401).json({
        'message': 'Unauthorised'
      })
    }
  },
  adminAndShop: (req, res, next) => {
    if(req.auth.user === 'admin' || req.auth.user === 'shop'){
      next()

    } else {
      res.status(401).json({
        'message': 'Unauthorised'
      })
    }
  },
  adminAndEmployee: (req, res, next) => {
    if(req.auth.user === 'admin' || req.auth.user === 'employee'){
      next()

    } else {
      res.status(401).json({
        'message': 'Unauthorised'
      })
    }
  }
}
module.exports.admin = authenticate.admin
module.exports.employee = authenticate.employee
module.exports.shop = authenticate.shop
module.exports.adminAndShop = authenticate.adminAndShop
module.exports.adminAndEmployee = authenticate.adminAndEmployee