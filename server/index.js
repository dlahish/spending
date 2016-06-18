<<<<<<< HEAD
=======
//Main starting point
>>>>>>> origin/master
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
<<<<<<< HEAD
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./router');

mongoose.connect('mongoose://localhost:spending/spending');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json( { type: '*/*' }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ' + port);
=======
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:spending/spending');

// App Setup
app.use(morgan('combined'));  //Login framwork
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: '+port);
>>>>>>> origin/master
