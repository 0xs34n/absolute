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

exports.getDateWithName = function(date, cb){
    sales.aggregate([
    	{$project: {ID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1}},
    	{$match: {Date: date}},
    	{$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
    	{$unwind: {path:"$accounts"}},
    	{$project: {ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1, "accounts.firstName": 1, "accounts.lastName": 1}}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

exports.getDateWithID = function(date, ID, cb){
    sales.aggregate([
    	{$project: {ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1}},
    	{$match: {Date: date, ID: ID}},
    	{$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
    	{$unwind: {path:"$accounts"}},
    	{$project: {ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1, "accounts.firstName": 1, "accounts.lastName": 1}}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

exports.getDateWithicID = function(date, icID, cb){
	sales.aggregate([
    	{$project: {ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1}},
    	{$match: {Date: date, icID: icID}},
    	{$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
    	{$unwind: {path:"$accounts"}},
    	{$project: {ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1, "accounts.firstName": 1, "accounts.lastName": 1}}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});

};

exports.getDateRange = function(startDate, endDate, cb){
	var startYear = startDate.getFullYear();
	var startMonth = startDate.getMonth();
	var startDay = startDate.getDate();
	var endYear = endDate.getFullYear();
	var endMonth = endDate.getMonth();
	var endDay = endDate.getDate()+1;         //Add to until end of the day
	sales.find({Date: {"$gte": new Date(startYear, startMonth, startDay), "$lt": new Date(endYear, endMonth, endDay)}}, function(err, docs){
		if (err) return cb(err);
			cb(null, docs);
	});
};



//Search for sales with conditons given, returns array
exports.search = function(conditions, cb){
	sales.find(conditions, function(err, docs){
        if (err) return cb(err);
		cb(null, docs);
    });
};

//Delete one sales based on mongodb stored id
exports.deleteOne = function(id, cb){
	sales.remove({_id: id}, function(err){
        if (err) return cb(err);
        cb(null);
    });
};

//Delete an array of sales id (mongodb id)
exports.deleteArray = function(id, cb){
	var idLength = id.length;
	for(var x = 0; x < idLength; x++)
	{
		sales.remove({_id: id[x]}, function(err){
			if (err) return cb(err);
        	cb(null);
		});
	};	
};

exports.findSalesWeek = function(startDate, endDate, cb){
	var startYear = startDate.getFullYear();
	var startMonth = startDate.getMonth();
	var startDay = startDate.getDate();
	var endYear = endDate.getFullYear();
	var endMonth = endDate.getMonth();
	var endDay = endDate.getDate()+1; 
	sales.aggregate([
		{$project:{_id:0, ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1}},
		{$match: {Date: {"$gte": (new Date(startYear, startMonth, startDay)), "$lt": (new Date(endYear, endMonth, endDay))}}},
		{$sort: {ID: 1, Date: 1}},
		{$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
		{$unwind: {path:"$accounts"}},
		{$project:{_id:0, ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1, "accounts.firstName":1, "accounts.lastName":1, "accounts.seniorTeam":1 }}
	], function(err, data){
		if (err) return cb(err);
        cb(null, data);
	});
};

exports.findSalesWeekID = function(startDate, endDate, ID, cb){
	var startYear = startDate.getFullYear();
	var startMonth = startDate.getMonth();
	var startDay = startDate.getDate();
	var endYear = endDate.getFullYear();
	var endMonth = endDate.getMonth();
	var endDay = endDate.getDate()+1;
	sales.aggregate([
		{$project:{_id:0, ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1}},
		{$match: {ID: ID, Date: {"$gte": new Date(startYear, startMonth, startDay), "$lt": new Date(endYear, endMonth, endDay)}}},
		{$lookup: {from:"accounts", localField:"ID", foreignField:"ID", as: "accounts"}},
		{$unwind: {path:"$accounts"}},
		{$project:{_id:0, ID:1, icID:1, Date:1, Type:1, Shift:1, Location:1, Demo:1, Close: 1, UpSale:1, DownSale:1, LB:1, MG:1, DP:1, CG:1, IO:1, SY:1, RO:1, TB:1, EDT:1, Cash:1, Nets:1, "accounts.firstName":1, "accounts.lastName":1, "accounts.seniorTeam":1 }}
	], function(err, data){
		if (err) return cb(err);
        cb(null, data);
	});
};


exports.test = function(cb){
	sales.find({Date: {$dayOfWeek: 4}}, function(err, docs){
		if (err) return cb(err);
		cb(null, docs)
	});
};

exports.searchSales = function(conditions, cb){ 
	sales.aggregate([
		{$match:conditions}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

exports.findPB = function(ID, cb){
	sales.aggregate([
		{$project: {_id:0, ID:1, LB:1}},
		{$match: {ID:ID}},
		{$group: {_id: null, PB: {$max:"$LB"}}}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

exports.findTotals = function(ID, cb){
	sales.aggregate([
		{$project: {_id:0, ID:1, Demo:1, Close:1, LB:1}},
		{$match: {ID: ID}},
		{$group: {_id: null, totalDemo:{$sum: "$Demo"}, totalClose:{$sum:"$Close"}, totalBag:{$sum:"$LB"}}}
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

exports.findBagsWeek = function(ID, cb){
	sales.aggregate([
		{$project: {_id:0, ID:1, LB:1, Date:1, week:{$week:"$Date"}}}  //WTF DAYS OF WEEK???
	], function(err, data){
		if (err) return cb(err);
		cb(null, data);
	});
};

