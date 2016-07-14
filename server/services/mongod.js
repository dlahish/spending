const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
var moment = require('moment');

const User = models.User;
const Data = models.Data;

var existsEntries = 0;

exports.getTotal = function(req, res) {
  const email = req.user.email;
  var totalIncome = 0;
  var totalExpense = 0;
  User.findOne({ email: email }, function(err, user) {
    console.log(user.totalIncome);
    if (err) { console.log(err); }
    totalIncome = user.totalIncome;
    totalExpense = user.totalExpense;
    res.send({ income: totalIncome, expense: totalExpense });
  });
}

exports.getDataByDate = function(req, res) {
  const email = req.user.email;
  const userId = req.user._id;
  console.log('REQ.BODY.startDate--------');
  console.log(req.body.startDate);
  console.log('REQ.BODY.endDate--------');
  console.log(req.body.endDate);

  // const startDate = moment(req.body.startDate, "DD/MM/YYYY");
  // const endDate = moment(req.body.endDate, "DD/MM/YYYY");
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  Data.find({ user: userId, date: { $gt: startDate, $lte: endDate } }, function(err, data){
    if (err) { console.log(err); }
    if (!data) {
      return res.send('No data found');
    }
    res.send({ data: data });
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
  var save = true;
  var messageToClient = '';
  var newEntries = 0;

  var finished = function(){
    if(processing === 0 && done){
      if (!save) {
        return res.send({ message: 'Check date Format.'});
      }
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
          if (err) {
            console.log('err');
            processing--;
            done = true;
            save = false;
            finished();
          }
          else {
            if (dData) {
              console.log('Data already exists.');
              processing--;
              finished();
            }
            else {
              if (save) {
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
                  var incomeTemp = 0;
                  var expenseTemp = 0;
                  console.log(nd.amount);
                  if (nd.amount > 0) {
                    incomeTemp = nd.amount;
                  } else if (nd.amount < 0) {
                    expenseTemp = nd.amount;
                  }
                  console.log('incomeTemp  ----' + incomeTemp)
                  User.findByIdAndUpdate(userId,
                    {
                      $push: { data: nd },
                      $inc: { totalIncome: incomeTemp, totalExpense: expenseTemp }
                    }, function(err){
                    if (err) { console.log('err-------------'); }
                  });
                });
                newEntries++;
              }
            }
            processing--;
            finished();
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
