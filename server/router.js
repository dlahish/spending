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

  app.post('/getdata', requireAuth, db.getDataByDate);

  app.get('/gettotal', requireAuth, db.getTotal);

  app.post('/upload', upload.single('file'), requireAuth, db.saveFileToMongo);

  app.post('/getmonthstotal', requireAuth, db.getMonthsTotal);

  app.post('/addnewcategory', requireAuth, db.newCategory);

  app.get('/fetchcategories', requireAuth, db.fetchCategories);

  app.post('/deletecategory', requireAuth, db.deleteCategory);

  app.post('/addrecord', requireAuth, db.addRecord);

  app.post('/deleterecord', requireAuth, db.deleteRecord);

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
