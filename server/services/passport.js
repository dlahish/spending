const passport = require('passport');
const models = require('../models/user');
const User = models.User;
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}

const localLogin = new LocalStrategy(localOptions, function(req, email, password, done) { // done function returns the user in req.user

  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) {
        var newUser = { error: 'Invalid password' };
        return done(null, newUser);
      }

      return done(null, user);
    });
  });
});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
        var logUser = {
          _id: user._id,
          password: user.password,
          email: user.email
        };
        done(null, logUser);
    } else {
        done(null, false);
    }
  });
});


passport.use(jwtLogin);
passport.use(localLogin);
