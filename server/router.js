module.exports = function(app) {

  const Authentication = require('./controllers/authentication');
  const passportService = require('./services/passport');
  const passport = require('passport');
  const db = require('./services/mongod');
  const jwt = require('jwt-simple');
  const config = require('./config');

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

  function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  }

  var upload = multer({ storage : storage });
  const fs = require('fs');

  const requireAuth = passport.authenticate('jwt', { session: false });
  // const requireSignin = passport.authenticate('local', { session: false });


  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a secure path with a message from the API server' });
  });

  app.get('/getemail', requireAuth, function(req, res) {
    var userEmail = req.user.email;
    res.send({ email: userEmail });
  });

  app.get('/getdata', requireAuth, function(req, res) {
    var userData = req.user.data;
    res.send({ data: userData });
  });

  app.use('./upload', requireAuth);
  app.post('/upload', upload.single('file'), db.saveFileToMongo);

  // app.post('/signin', requireSignin, Authentication.signin);

  app.post('/signin', function(req, res, next){
    if (!req.body.email) {
      return res.send({ message: 'No user supplied' });
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) { return (err); }
      if (!user) { return res.send({ message: 'Bad login info' }); }
      if (user.error) { return res.send({ message: 'Invalid password' }); }
      res.send( { token: tokenForUser(user) });
    })(req, res, next);
  });

  app.post('/signup', Authentication.signup);
}
