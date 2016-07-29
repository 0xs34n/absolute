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
exports.get = function(date, cb) {
    outStocks.aggregate([
        {$project: {ID:1, Date:1, Shift:1, Location:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1}},
        {$match: {Date: date}},
        {$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
        {$unwind: {path:"$accounts"}},
        {$project: {ID:1, Date:1, Shift:1, Location:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, "accounts.firstName": 1, "accounts.lastName": 1}}
    ], function(err, data){
        if (err) return cb(err);
        cb(null, data);
    });
};

//Returns outStocks from Date of ID
exports.getWithID = function(date, ID, cb) {
    outStocks.aggregate([
        {$project: {ID:1, Date:1, Shift:1, Location:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1}},
        {$match: {Date: date, ID: ID}},
        {$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
        {$unwind: {path:"$accounts"}},
        {$project: {ID:1, Date:1, Shift:1, Location:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, "accounts.firstName": 1, "accounts.lastName": 1}}
    ], function(err, data){
        if (err) return cb(err);
        cb(null, data);
    });
};

exports.delete = function(id, cb){
    outStocks.remove({_id: id}, function(err){
        if (err) return cb(err);
        cb(null);
    });     
};

