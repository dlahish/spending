const jwt = require('jwt-simple');
const User = require('../models/user');
<<<<<<< HEAD
const config = require('../congif');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.email;
  const password = req.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and passowrd'});
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

=======
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and paswword auth'd
  // we just need to give them a token
  res.send( { token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password ) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // see if users exists
  User.findOne({ email: email }, function(err, existingUser) {
    if ( err ) { return next(err); }

    //if the users exists return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use '});
    }

    //if user new, create and save user record
>>>>>>> origin/master
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
    });

<<<<<<< HEAD
=======
    //respond to requesr indicating was created
>>>>>>> origin/master
    res.json({ token: tokenForUser(user) });
  });
}
