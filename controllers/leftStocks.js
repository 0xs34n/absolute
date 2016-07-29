var express  = require('express');
var router   = express.Router();
var leftStocks = require('../models/leftStocks');

//Receives leftStocks (Opening) for given date
router.get('/:date', function(req, res){
    var date = new Date(req.params.date);
    leftStocks.yestDate(date, function(err, leftStocksYst){
        res.json(leftStocksYst);
    });    
});


module.exports = router;