var express  = require('express');
var router   = express.Router();
var outStocks = require('../models/outStocks');

//Receives all outStocks on date
router.get('/:date', function(req, res){
    var date = new Date(req.params.date);
    outStocks.get(date, function(err, outStocks){
        res.json(outStocks);
    });    
});

//Receives outStocks by ID on date
router.get('/:date/:ID', function(req, res){
    var date = new Date(req.params.date);
    var ID = req.params.ID;
    outStocks.getWithID(date, ID, function(err, outStocks){
        res.json(outStocks);
    });    
});


module.exports = router;