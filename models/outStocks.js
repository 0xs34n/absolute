var mongoose = require('mongoose');

//Stocks brought out to field on a particular day
var outStocksSchema = new mongoose.Schema({
	ID: String,			// ID of the IC
	Location: String,	//Location Code
	Date: Date, 		//Date of outStock
	Shift: String,		//Time of Shift
	LB: Number,         //Laurelle Bag
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number      	//Energize
},{collection: "outStocks"});

var outStocks = mongoose.model("outStocks", outStocksSchema);

//Create a new outStock in database
exports.create = function(ID, Location, Date, Shift, LB, MG, DP, CG, IO, SY, RO, TB, EDT){
	var item = {
        ID: ID,
        Location: Location,
        Date: Date, 
        Shift: Shift,
        LB: LB,
        MG: MG,        
        DP: DP,         
        CG: CG,         
        IO: IO,         
        SY: SY,      
        RO: RO,         
        TB: TB,         
        EDT: EDT 
    };
    var newOutStocks = new outStocks(item);
    newOutStocks.save(function(err, data){
       	if(err) {
            console.log(err);
            return res.status(500).send();
        };
    });
};

//Get a outStocks by date, returns array of outStocks on that date
exports.get = function(currentDate, cb) {
    currentDate.setTime(currentDate.getTime() + 28800000);    //Add to take into account time zone
    currentDate = currentDate.toISOString();
    currentDate = currentDate.substring(0,10);
	outStocks.find({Date: currentDate}, function(err, docs){
		if (err) return cb(err);
		cb(null, docs);
	});
};

exports.delete = function(id, cb){
    outStocks.remove({_id: id}, function(err){
        if (err) return cb(err);
        cb(null);
    });     
};

