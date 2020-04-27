const basicAuth = require('express-basic-auth')

function authoriseUsers (username, password) {
  const usernameMatches = basicAuth.safeCompare(username, 'admin')
  const passwordMatches = basicAuth.safeCompare(password, 'adminPassword')

  return usernameMatches & passwordMatches
}

module.exports = authoriseUsers
