const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model('Users', userSchema)

passport.use(new LocalStratergy(
  function(username, password, done){
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
))

module.exports = passport