module.exports = function(app) {

  const Authentication = require('./controllers/authentication');
  const passportService = require('./services/passport');
  const passport = require('passport');

  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  const fs = require('fs');

  const requireAuth = passport.authenticate('jwt', { session: false });
  const requireSignin = passport.authenticate('local', { session: false });




  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a secure path with a message from the API server' });
  });

  app.post('/upload', upload.single('spreadsheet'), function (req, res) {
    console.log(req.file);
    // res.send(req);
  });
  // app.post('/upload', upload.single('file'), function (req, res, next) {
  //   res.send({ responseText: req.file.path }); // You can send any response to the user here
  // });

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
}
