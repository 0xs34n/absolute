var express  = require('express');
var router   = express.Router();
var sales = require('../models/sales');
var accounts = require('../models/accounts');
var mongoose = require('mongoose');


//Returns all sales on date
router.get('/day/:date', function(req, res){
    var date = new Date(req.params.date);
    sales.getDateWithName(date, function(err, data){
        res.json(data);
    });
});

//Returns sales by ID on date
router.get('/day/:date/:ID', function(req, res){
    var date = new Date(req.params.date);
    var ID = req.params.ID;
    sales.getDateWithID(date, ID, function(err, data){
        res.json(data);
    });
});

//Returns sales of week 
router.get('/week/:date', function(req, res){
    var date = new Date(req.params.date);
    var day = date.getDay();
    if(day==6)
        date.setDate(date.getDate()-1);
    else if(day==0)
        date.setDate(date.getDate()-2);
    else if(day==1)
        date.setDate(date.getDate()-3)
    else if(day==2)
        date.setDate(date.getDate()-4);
    else if(day==3)
        date.setDate(date.getDate()-5);
    else if(day==4)
        date.setDate(date.getDate()-6);
    var startDate = new Date(date);
    var endDate = new Date(date);
    endDate.setDate(date.getDate()+6);
    sales.findSalesWeek(startDate, endDate, function(err, data){
        res.json(data);
    });
});

//Returns sales of week by ID
router.get('/week/:date/:ID', function(req, res){
    var date = new Date(req.params.date);
    var ID = req.params.ID
    var day = date.getDay();
    if(day==6)
        date.setDate(date.getDate()-1);
    else if(day==0)
        date.setDate(date.getDate()-2);
    else if(day==1)
        date.setDate(date.getDate()-3)
    else if(day==2)
        date.setDate(date.getDate()-4);
    else if(day==3)
        date.setDate(date.getDate()-5);
    else if(day==4)
        date.setDate(date.getDate()-6);
    var startDate = new Date(date);
    var endDate = new Date(date);
    endDate.setDate(date.getDate()+6);
    sales.findSalesWeekID(startDate, endDate, ID, function(err, data){
        res.json(data);
    });
});

/*
//Form for user to search existing sales data
router.get('/search', function(req, res){
    var conditions = {
        ID: "A000382"      //Use logged in user info. Login not setup
    };
	if ((req.params.Date!="")&&(req.params.Date!=undefined))
        conditions.Date = req.params.Date;
    if(req.params.Type!="Both"&&(req.params.Type!=undefined))
        conditions.Type = req.params.Type;
    if(req.params.Shift!="All"&&(req.params.Shift!=undefined))
        conditions.Shift = req.param(req.params.Shift);
    if(req.params.Location!=""&&(req.params.Location!=undefined))
        conditions.Location = req.params.Location;
    if(req.params.Demo!=""&&(req.params.Demo!=undefined))
        conditions.Demo = req.params.Demo;
    if(req.params.Close!=""&&(req.params.Close!=undefined))
        conditions.Close = req.params.Close;
    if(req.params.UpSale!=""&&(req.params.UpSale!=undefined))
        conditions.UpSale = req.params.UpSale;
    if(req.params.DownSale!=""&&(req.params.DownSale!=undefined))
        conditions.DownSale = req.params.DownSale;
	sales.searchSales(conditions, function(err, data){
		res.render('./tracker', {sales: data});
	});
    sales.findBagsWeek("A000382", function(err, data){
        console.log(data);
    });

	
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
*/


module.exports = router;