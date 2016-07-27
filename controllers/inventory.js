var express  = require('express');
var router   = express.Router();
var accounts = require('../models/accounts');
var leftStocks = require('../models/leftStocks');
var sales = require('../models/sales');
var outStocks = require('../models/outStocks');

//Display Table of Inventory, authorization: IC
router.get('/', function(req, res){  
	if(req.param("invDate")!=undefined)
    {
        var date = new Date(req.param("invDate"));
        var searchDate = new Date(req.param("invDate"));
    }
    else
    {
        var date = new Date();
        var searchDate = new Date();
    };
    searchDate.setTime(searchDate.getTime() + 28800000);
    searchDate = searchDate.toISOString();
    searchDate = searchDate.substring(0,10);
    var eventSold = {icID: "", Location: "", LB:0, MG:0, DP:0, CG:0, IO:0, SY:0, RO:0, TB:0, EDT:0, Cash:0, Nets:0};
    var finalEvent =[];
    var totalSold = {LB:0, MG:0, DP:0, CG:0, IO:0, SY:0, RO:0, TB:0, EDT:0, Cash:0, Nets:0}
    var endDayClose = {LB:0, MG:0, DP:0, CG:0, IO:0, SY:0, RO:0, TB:0, EDT:0, Cash:0, Nets:0}
    leftStocks.yestDate(date, function(err, leftStocksYst){   //Find Stocks in store
    	outStocks.get(date, function(err, outStocks){              //Find Stocks that have been moved to field (outStocks)
    		sales.getDate(date, function(err, sales){
                accounts.all(function(err, accounts){
                    var closing = {LB:leftStocksYst.LB, MG:leftStocksYst.MG, DP:leftStocksYst.DP, CG:leftStocksYst.CG, IO:leftStocksYst.IO, SY:leftStocksYst.SY, RO:leftStocksYst.RO, TB:leftStocksYst.TB, EDT:leftStocksYst.EDT};
                    var outStocksLength = outStocks.length;
                    for (var i=0; i<outStocksLength; i++)
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
                        eventSold.icID = outStocks[i].ID;
                        eventSold.Location = outStocks[i].Location;
                        var salesLength = sales.length;
                        for(var x=0; x<salesLength; x++){
                            if(sales[x].icID == outStocks[i].ID)
                            {
                                eventSold.LB += sales[x].LB; 
                                eventSold.MG += sales[x].MG; 
                                eventSold.DP += sales[x].DP; 
                                eventSold.CG += sales[x].CG; 
                                eventSold.IO += sales[x].IO; 
                                eventSold.SY += sales[x].SY; 
                                eventSold.RO += sales[x].RO;
                                eventSold.TB += sales[x].TB; 
                                eventSold.EDT += sales[x].EDT; 
                                eventSold.Cash += sales[x].Cash;
                                eventSold.Nets += sales[x].Nets;
                            };
                        };
                        totalSold.LB += eventSold.LB;
                        totalSold.MG += eventSold.MG;
                        totalSold.DP += eventSold.DP;
                        totalSold.CG += eventSold.CG;
                        totalSold.IO += eventSold.IO;
                        totalSold.SY += eventSold.SY;
                        totalSold.RO += eventSold.RO;
                        totalSold.TB += eventSold.TB;
                        totalSold.EDT += eventSold.EDT;
                        totalSold.Cash += eventSold.Cash;
                        totalSold.Nets += eventSold.Nets;
                        finalEvent.push(eventSold);
                        eventSold = {icID: "", Location: "", LB:0, MG:0, DP:0, CG:0, IO:0, SY:0, RO:0, TB:0, EDT:0, Cash:0, Nets:0};  
                    };
                    endDayClose.LB = leftStocksYst.LB - totalSold.LB;
                    endDayClose.MG = leftStocksYst.MG - totalSold.MG;
                    endDayClose.DP = leftStocksYst.DP - totalSold.DP;
                    endDayClose.CG = leftStocksYst.CG - totalSold.CG;
                    endDayClose.IO = leftStocksYst.IO - totalSold.IO;
                    endDayClose.SY = leftStocksYst.SY - totalSold.SY;
                    endDayClose.RO = leftStocksYst.RO - totalSold.RO;
                    endDayClose.TB = leftStocksYst.TB - totalSold.TB;
                    endDayClose.EDT = leftStocksYst.EDT - totalSold.EDT;
                    endDayClose.Cash = totalSold.Cash;
                    endDayClose.Nets = totalSold.Nets;
                    res.render('./inventory', {date: searchDate, leftStocks: leftStocksYst, outStocks: outStocks, sales: sales, accounts: accounts, closing: closing, eventSold: finalEvent, totalSold: totalSold, endDayClose: endDayClose});
    			});
    		});
    	});
    });
});

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

module.exports = router;