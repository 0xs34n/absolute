// app.js

// set up 
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var configDB = require('./config/database.js');

// configuration 
mongoose.connect(configDB.url); // connect to our database

app.use(express.static('public'));

// set up our express application
app.use(bodyParser()); // get information from html forms
app.use(require('./controllers'));

app.set('view engine', 'ejs'); // set up ejs for templating

// routes ======================================================================
//require('./controllers/index')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);