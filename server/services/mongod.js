const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
// var Promise = require('bluebird');
// Promise.promisifyAll(fs);
const User = models.User;
var newEntries = 0;
var existsEntries = 0;

exports.saveFileToMongo = function(req, res) {
  const email = req.body.email;
  const fileName = req.file.originalname;
  const date = new Date();
  const path = './uploads/'+fileName;

  var processing = 0, done = false;
  var finished = function(){
    if(processing === 0 && done){
      console.log('FINISHED -------');
      console.log('harey');
      // res.send({ message: 'mongo finished'});
    }
  };

  fs.createReadStream(path, { encoding: 'utf-16le', headers: true })
    .pipe(csv())
    .on('data', function(data){
      processing++;
      var newData = {};
      newData = {
        fileName: fileName,
        uploadDate: date,
        date: data[0],
        category: data[1],
        amount: data[2],
        note: data[3]
      };

      if (newData.amount !== ' Amount') {
        newData.amount = parseInt(newData.amount);
      }

      if (typeof newData.amount === 'number' ) {
        User.findOne({ email: email }, {'data': {$elemMatch: { amount: newData.amount, date: newData.date }}}, function(err, existingUser) {
          if (err) { console.log(err); }
          if (!existingUser || existingUser.data.length > 0) {
              console.log('existingData -------');
              // console.log(existingUser);
              console.log('processing');
              processing--;
              console.log(processing);
              console.log('data already exists');
          } else {
            if(!existingUser.totalIncome) {
              existingUser.totalIncome = 0;
            }

            if (newData.amount > 0) {
              existingUser.update({ $inc: { totalIncome: newData.amount }}, function(err){
                if (err) { console.log(err) ;}
              });
            } else if (newData.amount < 0) {
              existingUser.update({ $inc: { totalExpense: newData.amount }}, function(err){
                if (err) { console.log(err) ;}
              });
            }
            existingUser.update({$push: { 'data': newData }},{ upsert:true }, function(err) {
              if (err) { console.log(err); }
              newEntries++;
              console.log('Success!');
              processing--;
              finished();
            });
          }
        });
      } else {
        console.log('not a valid input');
        processing--;
        // res.send({ message: 'Not a valid input'});
      };
    })
    .on('end', function(){
      console.log('read finished');
      fs.unlink(path, function(err) {
        if (err) { throw err; }
      });
      console.log('processing');
      console.log(processing);
      done = true;
      finished();
    });
};
