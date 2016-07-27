var mongoose = require('mongoose');

//Stocks left over in the store
var leftStocksSchema = new mongoose.Schema({
	Date: {type: Date, default: new Date()},			//Date Updated
	LB: Number,         //Laurelle Bag
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number,     	//Energize
	Cash: Number,		//Total Cash for that Day
	Nets: Number		//Total Nets for that Day
},{collection: "leftStocks"});

var leftStocks = mongoose.model("leftStocks", leftStocksSchema);

//Create or update a new leftStocks in database
exports.create = function(Date, LB, MG, DP, CG, IO, SY, RO, TB, EDT, Cash, Nets){
	var item = {
        LB: LB,
        MG: MG,
        DP: DP,
        CG: CG,
        IO: IO,
        SY: SY,
        RO: RO,
        TB: TB,
        EDT: EDT,
        Cash: Cash,
        Nets: Nets
        };
    leftStocks.update({Date: Date}, item, {upsert: true}, function(err, raw){
        if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
    });   
};

//Returns object of yesterdays leftStock data
exports.yestDate = function(yestDate, cb){
    yestDate.setTime(yestDate.getTime() - 57600000); //Set to yesterday's date. Takes into account time diff
    yestDate = yestDate.toISOString();
    yestDate = yestDate.substring(0,10);
    leftStocks.findOne({Date: yestDate}, function(err, docs){
        if (err) return cb(err);
        cb(null, docs);
    });

};

//Returns object of date givens leftStock data
exports.get = function(currentDate, cb){
    currentDate.setTime(currentDate.getTime() + 28800000);    //Add to take into account time zone
    currentDate = currentDate.toISOString();
    currentDate = currentDate.substring(0,10);
	leftStocks.findOne({Date: currentDate}, function(err, docs){
		if (err) return cb(err);
		cb(null, docs);
	});
};
