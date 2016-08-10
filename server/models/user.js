const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  fileName: String,
  uploadDate: Date,
  date: Date,
  category: String,
  amount: Number,
  note: String
});

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
  totalIncome: Number,
  totalExpense: Number,
  categories: [],
  data: [{ type: Schema.Types.ObjectId, ref: 'Data' }]
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

dataSchema.pre('save', function (next) {
  if ('invalid' == this.fileName) return next(new Error('#noFileName'));
  next();
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);
const Data = mongoose.model('Data', dataSchema);

module.exports = {
  User: User,
  Data: Data
};
