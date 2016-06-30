var requireAuth = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(app) {
  const passport = require('passport');
  const initPassport = require('./services/passport_init');
  initPassport(passport);

  // const passport = require('passport');
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

  // const requireAuth = passport.authenticate('jwt', { session: false });
  // const requireSignin = passport.authenticate('local', { session: false });


  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'this is a secure path with a message from the API server' });
    //console.log(req.user);
  });

  app.post('/signup', passport.authenticate('signup', {
		successRedirect: 'http://www.walla.co.il',
		failureRedirect: 'http://www.google.com',
		failureFlash : true
	}));

  app.post('/signin', passport.authenticate('login', {
		// successRedirect: '/home',
		// failureRedirect: '/err',
		failureFlash : true
	}), function(req, res) {
    console.log(req);
    var mmm = req.flash('message');
    res.send({ message: mmm });
  });

  app.get('/err', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.send({ message: req.flash('message') });
	});

  app.post('/home', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.send({ message: req.flash('message') });
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
  // app.post('/upload', upload.single('file'), function (req, res) {
  //   console.log(req.file);
  // });

  // app.post('/signin', requireSignin, Authentication.signin)
  // app.post('/signup', Authentication.signup);
}
