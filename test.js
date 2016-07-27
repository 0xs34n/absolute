var configDB = require('./config/database.js');
var mongoose = require('mongoose');
mongoose.connect(configDB.url);
var accounts = require('./models/accounts');
var leftStocks = require('./models/leftStocks');
var sales = require('./models/sales');
var outStocks = require('./models/outStocks');


var date = new Date();
leftStocks.yestData(date, function(err, docs){
	console.log(docs);
})