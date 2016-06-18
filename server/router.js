<<<<<<< HEAD
const passport = requre('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/password');

module.exports = function(app) {
  app.post('/signin', requireSignin, Authentication.signin);
=======
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a secure path' });
  });

  app.post('/signin', requireSignin, Authentication.signin)
>>>>>>> origin/master
  app.post('/signup', Authentication.signup);
}
