var LocalStrategy   = require('passport-local').Strategy;
const models = require('../models/user');
const User = models.User;
var bCrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../config');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true,  // allows us to pass back the entire request to the callback
            usernameField: 'email'
        },
        function(req, email, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+ email);
                        return done(null, false, { message: 'User Already Exists' });
                    } else {
												const newUser = new User({
										      email: email,
										      password: password
										    });

										    newUser.save(function(err) {
										      if (err) { return next(err); }
										    });

										    //respond to requesr indicating was created
												console.log('User Registration succesful');
										    return done(null, newUser);
                        // // if there is no user with that email
                        // // create the user
                        // var newUser = new User();
												//
                        // // set the user's local credentials
                        // newUser.email = email;
                        // newUser.password = createHash(password);
                        // // newUser.email = req.param('email');
                        // // newUser.firstName = req.param('firstName');
                        // // newUser.lastName = req.param('lastName');
												//
                        // // save the user
                        // newUser.save(function(err) {
                        //     if (err){
                        //         console.log('Error in Saving user: '+err);
                        //         throw err;
                        //     }
                        //     console.log('User Registration succesful');
                        //     return done(null, newUser);
                        // });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

		// function tokenForUser(user) {
		//   const timestamp = new Date().getTime();
		//   return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
		// }


    // Generates hash using bCrypt
    // var createHash = function(password){
    //     return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    // }

}
