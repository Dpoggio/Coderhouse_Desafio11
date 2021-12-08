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
      console.log('Inicia login')
      if (err)
        return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
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
        console.log('Error in SignUp: ' + err);
        return done(err);
      }

      if (user) {
        console.log('User already exists');
        return done(null, false)
      }

      const newUser = {
        username: username,
        password: createHash(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }

      User.create(newUser, (err, userWithId) => {
        if (err) {
          console.log('Error in Saving user: ' + err);
          return done(err);
        }
        console.log(user)
        console.log('User Registration succesful');
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