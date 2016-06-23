const User = require('../models/user');

exports.saveFileToMongo = function(req, res) {
  const email = req.body.email;
  const fileName = req.file.originalname;
  const uploadDate = req.file.lastModifiedDate;

  User.findOne({ email: email }, function(err, user){
    if (err) { return res.send(err); }
    if (!user) { return res.send(false); }

    user.data.push({
      fileName: fileName,
      uploadDate: uploadDate,
      date: '2/2/2000',
      category: 'Spring',
      amount: 444,
      note: 'Madame'
    });

    var subdoc = user.data[0];
    console.log(subdoc);

    user.save(function(err) {
      if (err) { return console.log(err); }

      console.log('File was saved!');
    });
  });
};
