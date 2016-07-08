const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
var moment = require('moment');

const User = models.User;
var newEntries = 0;
var existsEntries = 0;

var today = moment().startOf('day'),
    tomorrow = moment(today).add(1, 'days');

exports.getDataByDate = function(req, res) {
  const email = req.user.email;
  var start = moment('01/06/2016').format("DD/MM/YYYY");
  var end = moment('10/06/2016').format("DD/MM/YYYY");
  console.log('MOMENT END------------------');
  console.log(end);
  // User.findOne({ email: email }, function(err, user) {
  //   if (err) { console.log(err); }
  //   if (!user) { return res.send({ message: 'no user found' }) }
  //   user.getDataByDateRage(start, end, function(err, data) {
  //     if (err) { console.log(err); }
  //     if (!data) { console.log('no data found'); }
  //     console.log(data);
  //     return res.send({ data: data });
  //   });
  // });
  User.find({ 'data.date': { $gte: today.toDate(), $lt: tomorrow.toDate() } }, function(err, data){
    if (err) { console.log(err); }
    if (!data) {
      return res.send('No data found');
    }
    // console.log('DATA AFTER SEARCH ------------');
    // console.log(data[0]);
    // res.send({ data: data.data })
  });
};

exports.saveFileToMongo = function(req, res) {
  const email = req.body.email;
  const dateFormat = req.body.dateformat;
  const fileName = req.file.originalname;
  const date = new Date();
  const path = './uploads/'+fileName;

  console.log('date Format ------');
  console.log(dateFormat);

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
      if (dateFormat === "eu") {
          var parsedDate = moment(data[0], "DD-MM-YYYY");
      } else {
          var parsedDate = moment(data[0], "MM-DD-YYYY");
      }

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
