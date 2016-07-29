var express  = require('express');
var router   = express.Router();
var accounts = require('../models/accounts');
var sales = require('../models/sales');
	
/*
router.get('/', function(req, res){
	var todayDate = new Date();
	var todayDay = todayDate.getDay();
	var endDate = new Date();
	if(todayDay==6)
		todayDate.setDate(todayDate.getDate()-1);
	else if(todayDay==0)
		todayDate.setDate(todayDate.getDate()-2);
	else if(todayDay==1)
		todayDate.setDate(todayDate.getDate()-3);
	else if(todayDay==2)
		todayDate.setDate(todayDate.getDate()-4);
	else if(todayDay==3)
		todayDate.setDate(todayDate.getDate()-5);
	else if(todayDay==4)
		todayDate.setDate(todayDate.getDate()-6);
	endDate.setDate(todayDate.getDate()+7);
	sales.agg(todayDate, endDate, function(err, data){
		res.render('./tracker', {data: data});
	})

		
});

*/

module.exports = router;