const User = require('../models/user');

exports.saveFileToMongo = function(req, res) {
  const email = req.body.email;
  const fileName = req.file.originalname;
  const uploadDate = req.file.lastModifiedDate;

  User.findOne({ email: email }, function(err, user){
    if (err) { return res.send(err); }
    if (!user) { return res.send(false); }

    user.files.push({
      fileName: fileName,
      uploadDate: uploadDate,
      data: [{
        date: '1/1/111',
        category: 'CREDIT',
        amount: 123,
        note: 'shoping'
      }]
    });

    var subdoc = user.files[0];
    console.log(subdoc);

    user.save(function(err) {
      if (err) { return console.log(err); }

      console.log('File was saved!');
    });
  });
};
