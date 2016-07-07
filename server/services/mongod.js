const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
var moment = require('moment');
// moment().format("DD/MM/YYYY");

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
      console.log('newEntries');
      console.log(newEntries);
      console.log('existsEntries');
      console.log(existsEntries);
      if (newEntries === 0) {
          return res.send({ message: 'All data already exists'});
      } else if (newEntries > 0) {
          return res.send({ message: newEntries });
      }
    }
  };

  fs.createReadStream(path, { encoding: 'utf-16le', headers: true })
    .pipe(csv())
    .on('data', function(data){
      processing++;
      var parsedDate = moment(data[0], "DD-MM-YYYY");
      // console.log('MOMENT -----');
      // console.log(data[0]);
      var ppp = moment(parsedDate).format("DD/MM/YYYY");
      console.log('parsed date ----');
      console.log(ppp);

      var newData = {};
      newData = {
        fileName: fileName,
        uploadDate: date,
        date: parsedDate,
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
              // console.log('existingData -------');
              existsEntries++;
              // console.log('processing');
              processing--;

              // console.log(processing);
              finished();
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
        finished();
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
