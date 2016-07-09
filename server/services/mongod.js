const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
var moment = require('moment');

const User = models.User;
const Data = models.Data;

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

  User.find({ 'data.date': { $gte: today.toDate(), $lt: tomorrow.toDate() } }, function(err, data){
    if (err) { console.log(err); }
    if (!data) {
      return res.send('No data found');
    }
  });
};

exports.saveFileToMongo = function(req, res) {
  const userId = req.user._id;
  const email = req.body.email;
  const dateFormat = req.body.dateformat;
  const fileName = req.file.originalname;
  const date = new Date();
  const path = './uploads/'+fileName;

  var processing = 0, done = false;
  var finished = function(){
    if(processing === 0 && done){
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

      var tempAmount = data[2],
          tempDate = parsedDate;


      if (tempAmount !== ' Amount') {
        tempAmount = parseInt(tempAmount);
      }

      if (typeof tempAmount === 'number' ) {
        Data.findOne({ user: userId, amount: tempAmount, date: tempDate }, function(err, dData) {
          if (err) { console.log(err); }
          if (dData) { console.log('Data already exists.'); }
          else {
            const newData = new Data({
              user: userId,
              fileName: fileName,
              uploadDate: date,
              date: parsedDate,
              category: data[1],
              amount: tempAmount,
              note: data[3]
            });
            newData.save(function(err, nd) {
              if (err) { console.log(err); }
              console.log('data was saved');
              console.log(nd._id);
              User.findById(userId, function(err, saveDataUser){
                if (err) { console.log(err); }
                if (!saveDataUser) {console.log('user was not found.'); }
                saveDataUser.data.push(nd);
                saveDataUser.save(function(err){
                  if (err) { console.log(err); }
                });
              });
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
