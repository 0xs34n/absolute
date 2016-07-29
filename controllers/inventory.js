var express  = require('express');
var router   = express.Router();
var accounts = require('../models/accounts');
var leftStocks = require('../models/leftStocks');
var sales = require('../models/sales');
var outStocks = require('../models/outStocks');

//Receives closing amount for each perfume on date
router.get('/closing/:date', function(req,res){
    var date = new Date(req.params.date);
    leftStocks.yestDate(date, function(err, leftStocksYst){   //Find Stocks in store
        outStocks.get(date, function(err, outStocks){              //Find Stocks that have been moved to field (outStocks)        
            if(leftStocksYst==null)
                leftStocksYst = 0;
            if(outStocks==null)
                outStocks = 0;
            var closing = {LB:leftStocksYst.LB, MG:leftStocksYst.MG, DP:leftStocksYst.DP, CG:leftStocksYst.CG, IO:leftStocksYst.IO, SY:leftStocksYst.SY, RO:leftStocksYst.RO, TB:leftStocksYst.TB, EDT:leftStocksYst.EDT};
            for (var i=0; i<outStocks.length; i++)
            {     
                closing.LB -= outStocks[i].LB;
                closing.MG -= outStocks[i].MG;
                closing.DP -= outStocks[i].DP;
                closing.CG -= outStocks[i].CG;
                closing.IO -= outStocks[i].IO;
                closing.SY -= outStocks[i].SY;
                closing.RO -= outStocks[i].RO;
                closing.TB -= outStocks[i].TB;
                closing.EDT -= outStocks[i].EDT;    
            };  
            res.json({closing: closing});
        });
    });      
});


/*
//Save leftStocks that user submits
router.post('/addLeftStocks', function(req, res){
	console.log(req.body.date);
	leftStocks.create(req.body.date, req.body.LB, req.body.MG, req.body.DP, req.body.CG, req.body.IO, req.body.SY, req.body.RO, req.body.TB, req.body.EDT, req.body.Cash, req.body.Nets);
	res.redirect('./');
})

//Form for users to add outStock, authorization: to be confirmed
router.get('/addOutStocks', function(req, res){
	res.render('./addOutStocks');
});

//Receives out stocks from users and stores into outStock database
router.post('/addOutStocks', function(req, res){
	outStocks.create(req.body.ID, req.body.Location, req.body.Date, req.body.Shift, req.body.LB, req.body.MG, req.body.DP, req.body.CG, req.body.IO, req.body.SY, req.body.RO, req.body.TB, req.body.EDT);
	res.redirect('./');
});

//Form for users to add end day, authorization: everyone
router.get('/addEndDay', function(req, res){
	res.render('./addEndDay', {user: req.user});
});

//Receive end day from users and store into sales database
router.post('/addEndDay', function(req, res){
	sales.create(req.body.icID, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.icDemo, req.body.icClose, req.body.icUpSale, req.body.icDownSale, req.body.icLB, req.body.icMG, req.body.icDP, req.body.icCG, req.body.icIO, req.body.icSY, req.body.icRO, req.body.icTB, req.body.icEDT, req.body.icCash, req.body.icNets);
	if(req.body.ID1 != ""){sales.create(req.body.ID1, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.Demo1, req.body.Close1, req.body.UpSale1, req.body.DownSale1, req.body.LB1, req.body.MG1, req.body.DP1, req.body.CG1, req.body.IO1, req.body.SY1, req.body.RO1, req.body.TB1, req.body.EDT1, req.body.Cash1, req.body.Nets1)};
	if(req.body.ID2 != ""){sales.create(req.body.ID2, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.Demo2, req.body.Close2, req.body.UpSale2, req.body.DownSale2, req.body.LB2, req.body.MG2, req.body.DP2, req.body.CG2, req.body.IO2, req.body.SY2, req.body.RO2, req.body.TB2, req.body.EDT2, req.body.Cash2, req.body.Nets2)};
	if(req.body.ID3 != ""){sales.create(req.body.ID3, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.Demo3, req.body.Close3, req.body.UpSale3, req.body.DownSale3, req.body.LB3, req.body.MG3, req.body.DP3, req.body.CG3, req.body.IO3, req.body.SY3, req.body.RO3, req.body.TB3, req.body.EDT3, req.body.Cash3, req.body.Nets3)};
	if(req.body.ID4 != ""){sales.create(req.body.ID4, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.Demo4, req.body.Close4, req.body.UpSale4, req.body.DownSale4, req.body.LB4, req.body.MG4, req.body.DP4, req.body.CG4, req.body.IO4, req.body.SY4, req.body.RO4, req.body.TB4, req.body.EDT4, req.body.Cash4, req.body.Nets4)};
	if(req.body.ID5 != ""){sales.create(req.body.ID5, req.body.icID, req.body.Date, req.body.Type, req.body.Shift, req.body.Location, req.body.Demo5, req.body.Close5, req.body.UpSale5, req.body.DownSale5, req.body.LB5, req.body.MG5, req.body.DP5, req.body.CG5, req.body.IO5, req.body.SY5, req.body.RO5, req.body.TB5, req.body.EDT5, req.body.Cash5, req.body.Nets5)};
	res.redirect('./');
});

router.post('/deleteStocks', function(req, res){
    outStocks.delete(req.body.deleteStocks, function(err){
        if(err) {
            console.log(err);
            return res.status(500).send();
        };
    })
    res.redirect('/inventory');
})

*/

module.exports = router;