var mongoose = require('mongoose');

//Sales Schema
var salesSchema = new mongoose.Schema({
	ID: String,					//ID of Salesman
	icID: String,           	//ID of IC
	Date: Date,					//Date of Sale
	Type: String,				//Events or Streets
	Shift: String,				//AM, PM or SS(full day)
	Location: String,			//Location Code 
	Demo: Number,				
	Close: Number,
	UpSale: Number,
	DownSale: Number,
	Cash: Number,		//Total $ Value of Cash Received
	Nets: Number,		//Total $ Value of Nets Received
	LB: Number,			//Laurelle Bag
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number			//Energize
},{collection: "sales"});

var sales = mongoose.model("sales", salesSchema);

//Create sales in database
exports.create = function(ID, icID, Date, Type, Shift, Location, Demo, Close, UpSale, DownSale, LB, MG, DP, CG, IO, SY, RO, TB, EDT, Cash, Nets){
	var item = {
        ID: ID,
        icID: icID,
        Date: Date,
        Type: Type,
        Shift: Shift,    
        Location: Location,
        Demo: Demo,
        Close: Close,
        UpSale: UpSale,
        DownSale: DownSale,
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
        Nets: Nets,
    };
    var newSales = new sales(item);
    newSales.save(function(err, data){
        if(err) {
            console.log(err);
            return res.status(500).send();
        	}; 
    });	
};

//Find all sales done on date
exports.getDate = function(currentDate, cb){
    currentDate.setTime(currentDate.getTime() + 28800000);    //Add to take into account time zone
    currentDate = currentDate.toISOString();
    currentDate = currentDate.substring(0,10);
	sales.find({Date: currentDate}, function(err, docs){
		if (err) return cb(err);
				cb(null, docs);
	});
};

