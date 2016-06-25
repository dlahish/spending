module.exports = function(app) {

  const Authentication = require('./controllers/authentication');
  const passportService = require('./services/passport');
  const passport = require('passport');
  const db = require('./services/mongod');

  const multer = require('multer');
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
      //callback(null, file.fieldname + '-' + Date.now());
    }
  });

  var upload = multer({ storage : storage });
  const fs = require('fs');

  const requireAuth = passport.authenticate('jwt', { session: false });
  const requireSignin = passport.authenticate('local', { session: false });


  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a secure path with a message from the API server' });
  });

  app.get('/getemail', requireAuth, function(req, res) {
    res.send({ email: req.user.email });
  });

  app.use('./upload', requireAuth);
  app.post('/upload', upload.single('file'), db.saveFileToMongo);
  // app.post('/upload', upload.single('file'), function (req, res) {
  //   console.log(req.file);
  // });

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
}
