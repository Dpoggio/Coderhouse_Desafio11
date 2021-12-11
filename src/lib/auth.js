const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt');
const User = require('../model/user.js');

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

const loginStrategy = new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err)
        return done(err);

      if (!user) {
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
)

const signupStrategy = new LocalStrategy({ passReqToCallback: true },
  (req, username, password, done) => {
    User.findOne({ 'username': username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false)
      }

      const newUser = {
        username: username,
        password: createHash(password),
      }

      User.create(newUser, (err, userWithId) => {
        if (err) {
          return done(err);
        }
        return done(null, userWithId);
      });
    });
  }
)

passport.use('login', loginStrategy)
passport.use('signup', signupStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

module.exports = passport