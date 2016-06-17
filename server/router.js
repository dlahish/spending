const passport = requre('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/password');

module.exports = function(app) {
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
