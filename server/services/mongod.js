const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
var moment = require('moment');
const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const User = models.User;
const Data = models.Data;

var existsEntries = 0;

exports.deleteRecord = function(req, res) {
  const userId = req.user._id;
  const email = req.user.email;
  console.log('DELETE RECORD -------');
  console.log(req.body);
  Data.findOneAndRemove({ _id: ObjectId(req.body.idToDelete), user: ObjectId(userId) }, function(err, delRecord){
    if (err) {
      console.log(err);
      return res.send({ error: err});
    }
    // res.send({ messgae: delRecord + ' was deleted.'});
    var thisMonth = moment().month();
    const nextMonth = thisMonth + 1;
    var thisYear = moment().year();
    const startMonth = moment('01/'+thisMonth+'/'+thisYear, "DD/M/YYYY");
    const endMonth = moment('01/'+nextMonth+'/'+thisYear, "DD/M/YYYY");
    Data.find({ user: userId, date: { $gt: startMonth, $lte: endMonth } }, function(err, data){
      if (err) { console.log(err); }
      if (!data) {
        return res.send('No data found');
      }
      var searchTotalIncome = 0;
      var searchTotalExpenses = 0;
      data.map((d) => {
        if (d.amount > 0) {
          searchTotalIncome += d.amount;
        } else {
          searchTotalExpenses += d.amount;
        }
      });
      res.send({
        data: data,
        searchTotalIncome: searchTotalIncome,
        searchTotalExpenses: searchTotalExpenses,
        messgae: delRecord + ' was deleted.'
      });
    });
  });
}

exports.addRecord = function(req, res) {
  const userId = req.user._id;
  console.log('REQ BODY -----');
  console.log(req.user);
  console.log(req.body);
  const newData = new Data({
    user: userId,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    notes: req.body.notes
  });
  newData.save(function(err, nd){
    if (err) {
      console.log(err);
      return res.send({ error: err});
    }
    var incomeTemp = 0, expenseTemp = 0;
    if (req.body.amount < 0) {
        expenseTemp = req.body.amount;
    } else {
        incomeTemp = req.body.amount;
    }
    User.findByIdAndUpdate(userId,
      {
        $push: { data: nd },
        $inc: { totalIncome: incomeTemp, totalExpense: expenseTemp }
      }, function(err){
      if (err) { console.log(err); }
    });
    res.send({ message: 'Record saved'});
  });
}

exports.deleteCategory = function(req, res) {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { $pullAll: { categories: [req.body.category] } }, function(err) {
    if (err) {
      console.log(err);
      return res.send({ error: err});
    }
    res.send({ message: 'Category was deleted.'});
  })
}

exports.fetchCategories = function(req, res) {
  const userId = req.user._id;
  User.findById(userId, function(err, user) {
    if (err) { console.log(err); }
    if (!user) { console.log('no user found'); }
    res.send({ categories: user.categories });
  })
}

exports.newCategory = function(req, res) {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId,
    {
      $push: { categories: req.body.category }
    },
    function(err) {
      if (err) {
        console.log(err);
        return res.send({ error: 'Something went wrong with push new category.'})
      }
      res.send({ message: 'Category was saved.' });
    }
  );
}

exports.getTotal = function(req, res) {
  const email = req.user.email;
  var totalIncome = 0;
  var totalExpense = 0;
  User.findOne({ email: email }, function(err, user) {
    if (err) { console.log(err); }
    totalIncome = user.totalIncome;
    totalExpense = user.totalExpense;
    res.send({ income: totalIncome, expense: totalExpense });
  });
}

exports.getMonthsTotal = function(req, res) {
  var userId = req.user._id;
  var year = req.body.year;
  var yearIncomeTotal = [];
  var yearExpensesTotal = [];
  var monthStart;
  var monthEnd;
  var yearArray = [];
  // monthStart = moment(1 + '/' + i + '/' + year, "DD/MM/YYYY");
  console.log('MONTH START------------');
  console.log(typeof year);
  console.log(year);

  function asyncLoop(iterations, func, callback) {
    var index = 1;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback(yearArray);
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
  }

  function getMonth(year, j, callback) {
    var nextYear = parseInt(year);
    nextYear += 1;
    nextYear = nextYear.toString();
    yaer = year.toString();
    var jj = j + 1;

    var monthStart = moment(1 + '/' + j + '/' + year, "DD/MM/YYYY");
    if (j === 12) {
        var monthEnd = moment(31 + '/12/' + year, "DD/MM/YYYY");
    } else {
        var monthEnd = moment(1 + '/' + jj + '/' + year, "DD/MM/YYYY");
    }

    Data.find({ user: userId, date: { $gt: monthStart, $lte: monthEnd } }, function(err, data){
      if (err) { console.log(err); }
      if (!data) { console.log('No data found'); }
      callback(data);
    });
  }

  asyncLoop(
    13,
    function(loop) {
      var j = loop.iteration();

      var monthIncome = 0;
      var monthExpenses = 0;
      getMonth(2016, j, function(data){


        console.log('DATA FROM  MONGO -----');
        data.map((d) => {
          if (!d.amount) {
            yearArray.push([0,0]);
          } else if (d.amount > 0) {
              monthIncome += d.amount;
          } else {
              d.amount = Math.abs(d.amount);
              monthExpenses += d.amount;
          }
        });
        console.log('AFTER MAPPING ------');
        yearArray.push({ income: monthIncome, expenses: monthExpenses });
        // console.log(yearArray);
        // console.log(j);
        loop.next();
      })},
    function(yearArray){
      console.log('cycle ended');
      console.log(yearArray);
      if (!yearArray) {
          res.send({ message: 'Something went wrong.'});
      } else {
          res.send({ data: yearArray });
      }
    }
  );
};

exports.getDataByDate = function(req, res) {
  const email = req.user.email;
  const userId = req.user._id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  Data.find({ user: userId, date: { $gt: startDate, $lte: endDate } }, function(err, data){
    if (err) { console.log(err); }
    if (!data) {
      return res.send('No data found');
    }
    var searchTotalIncome = 0;
    var searchTotalExpenses = 0;
    data.map((d) => {
      if (d.amount > 0) {
        searchTotalIncome += d.amount;
      } else {
        searchTotalExpenses += d.amount;
      }
    });
    res.send({ data: data, searchTotalIncome: searchTotalIncome, searchTotalExpenses: searchTotalExpenses });
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

      data[1] = data[1].trim();

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
