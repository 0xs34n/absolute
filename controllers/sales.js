var express  = require('express');
var router   = express.Router();
var sales = require('../models/sales');
var accounts = require('../models/accounts');
var mongoose = require('mongoose');

//Form to individual input sales
router.get('/add', function(req, res){				
	res.render('./addSales');
});

//Form for user to search existing sales data
router.get('/search', function(req, res){
	sales.agg();
});

router.post('/deleteOne', function(req, res){
	sales.deleteOne(req.body.deleteSales, function(err){
		if(err) {
            console.log(err);
            return res.status(500).send();
        };
	});
	res.redirect('/inventory');
});

router.post('/deleteArray', function(req, res){
	sales.deleteArray([req.body.deleteSales], function(err){
		if(err) {
            console.log(err);
            return res.status(500).send();
        };
	});
	res.redirect('/sales/search');
});

	

module.exports = router;