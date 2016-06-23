const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const fileDataSchema = new Schema({
  date: Date,
  category: String,
  amount: Number,
  note: String
});

const filesSchema = new Schema({
  fileName: String,
  uploadDate: Date
  //data: [fileDataSchema]
});

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  files: [filesSchema]
});

//on save hood , encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

filesSchema.pre('save', function (next) {
  if ('invalid' == this.fileName) return next(new Error('#noName'));
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const UserClass = mongoose.model('user', userSchema);

module.exports = UserClass;
