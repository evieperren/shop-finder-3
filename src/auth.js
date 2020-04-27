const basicAuth = require('express-basic-auth')

function authoriseUsers (username, password, cb) {
  if(basicAuth.safeCompare(username, 'admin') & basicAuth.safeCompare(password, 'adminPassword') ){
    return cb(null, true)
  } else if (basicAuth.safeCompare(username, 'shop') & basicAuth.safeCompare(password, 'shopPassword')){
    return cb(null, true)
  } else {
    return cb(null, false)
  }

}
function authenticateUsers(role){
  if(basicAuth.safeCompare(role, 'admin') | basicAuth.safeCompare(role, 'shopOwner') | basicAuth.safeCompare(role, 'employee') ){
    return true
  } else {
    return false
  }
}
function unauthorisedResponse(){
  throw new Error('User is not authorised')
}

module.exports = { authoriseUsers, unauthorisedResponse, authenticateUsers }
