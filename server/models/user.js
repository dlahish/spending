const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
=======
const bcrypt = require('bcrypt-nodejs');
>>>>>>> origin/master
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

<<<<<<< HEAD
userSchema.pre('save', function(next){
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash){
=======
//on save hood , encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
>>>>>>> origin/master
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const UserClass = mongoose.model('user', userSchema);

module.exports = UserClass;
