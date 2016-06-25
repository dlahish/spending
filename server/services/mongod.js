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

  // User.findOne({ email: email }, function(err, user){
  //   if (err) { console.log(err); }
  //   if (!user) { console.log('no user found'); }
  //   fs.createReadStream(path, { encoding: 'utf-16le', skipHeader: true })
  //     .pipe(csv())
  //     .on('data', function(data){
  //       var newData = {};
  //       newData = {
  //         fileName: fileName,
  //         uploadDate: date,
  //         date: data[0],
  //         category: data[1],
  //         amount: data[2],
  //         note: data[3]
  //       };
        // var userPush = new User;
        // userPush.data.push({
        //   fileName: fileName,
        //   uploadDate: date,
        //   date: data[0],
        //   category: data[1],
        //   amount: data[2],
        //   note: data[3]
        // });
        // var subdoc = userPush.data[0];
        // console.log(subdoc);
        // console.log(subdoc.isNew);

        // console.log(data[0]);
        // console.log(data[1]);
        // console.log(data[2]);
        // console.log(data[3]);

  //       user.data.push(newData);
  //
  //       user.save(function (err, resp) {
  //         if (err) {
  //           console.log('ERROR FROM SAVE -----');
  //           console.log(err);
  //         }
  //         console.log('Success!');
  //       });
  //     })
  //     .on('end', function(){
  //       console.log('read finished');
  //       fs.unlink(path, function(err) {
  //         if (err) { throw err; }
  //       })
  //     });
  // });

  // User.findOne({'data': {$elemMatch: {amount: 216}}}, function (err, user) {
  //
  //     if (err){
  //         return done(err);
  //     }
  //
  //     if (user) {
  //         console.log("ROOM NAME FOUND");
  //
  //
  //
  //     } else {
  //
  //         console.log("ROOM NAME NOT FOUND");
  //
  //
  //     }
  //
  // });

  // User.update({ email: email }, {$push: { 'data' : newData }},{upsert:true}, function(err, data) {
  // });

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
      console.log('newData.amount');
      console.log(newData.amount);
      if (newData.amount !== ' Amount') {
        newData.amount = parseInt(newData.amount);
      }
      var xxx = typeof newData.amount;
      console.log('---------------');
      console.log(xxx);
      if (typeof newData.amount === 'number' ) {
        User.findOne({'data': {$elemMatch: {amount: newData.amount}}}, function (err, dataMatch) {
          if (err) { console.log(err); }
          if (dataMatch) {
              console.log('data already exists');
          } else {
              // var tempUser = new User;
              // tempUser.data.push(newData);
              // var subdoc = tempUser.data[0];
              // console.log(subdoc);
              User.update({ email: email }, {$push: { 'data' : newData }},{upsert:true}, function(err) {
                if (err) { console.log(err); }
                console.log('Success!');
              });
              // user.save(function (err) {
              //   if (err) {
              //     console.log('ERROR FROM SAVE -----');
              //     console.log(err);
              //   }
              //   console.log('Success!');
              // });
          }
        });
      } else { console.log('not a valid input')};
    })
    .on('end', function(){
      console.log('read finished');
      fs.unlink(path, function(err) {
        if (err) { throw err; }
      })
      res.send({ message: 'File saved!'});
    });
};
