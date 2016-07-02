const csv = require('fast-csv');
const fs = require('fs');
var models = require('../models/user');
const User = models.User;

exports.saveFileToMongo = function(req, res) {
  const email = req.body.email;
  const fileName = req.file.originalname;
  // const uploadDate = req.file.lastModifiedDate;
  const date = new Date();
  const path = './uploads/'+fileName;

  fs.createReadStream(path, { encoding: 'utf-16le', headers: true })
    .pipe(csv())
    .on('data', function(data){
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
              // console.log('existingUser -------');
              // console.log(existingUser);
              // console.log(existingUser.data.length);
              console.log('data already exists');
          } else {
            if(!existingUser.totalIncome) {
              existingUser.totalIncome = 0;
            }
            console.log('existingUser.totalIncome -----------');
            console.log(existingUser.totalIncome);
            console.log('newData.amount -------');
            console.log(newData.amount);
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
              console.log('Success!');
            });
          }
        });
      } else { console.log('not a valid input')};


      // if (typeof newData.amount === 'number' ) {
      //   User.findOne({'data': {$elemMatch: {amount: newData.amount}}}, function (err, dataMatch) {
      //     if (err) { console.log(err); }
      //     if (dataMatch) {
      //         console.log('data already exists');
      //     } else {
      //         User.update({ email: email }, {$push: { 'data' : newData }},{upsert:true}, function(err, userr) {
      //           if (err) { console.log(err); }
      //           console.log('User.update -------');
      //           console.log(user);
      //           console.log('Success!');
      //         });
      //     }
      //   });
      // } else { console.log('not a valid input')};
    })
    .on('end', function(){
      console.log('read finished');
      fs.unlink(path, function(err) {
        if (err) { throw err; }
      })
      res.send({ message: 'File saved!'});
    });
};

function addTotalAmount() {

}
