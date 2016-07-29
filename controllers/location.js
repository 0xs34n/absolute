var express  = require('express');
var router   = express.Router();
var sales = require('../models/sales');

//Receive sales with specific icID on date
router.get('/:date/:icID', function(req, res){
    var date = new Date(req.params.date);
    var icID = req.params.icID;
    sales.getDateWithicID(date, icID, function(err, sales){
        res.json(sales);
    });    
});

/*
//Receive totalSold by icID team on date
router.get('/:date/:icID/totalSold', function(req, res){
    var date = new Date(req.params.date);
    var icID = req.params.icID;
    console.log('test');
});
*/

module.exports = router;