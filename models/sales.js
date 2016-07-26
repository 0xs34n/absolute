var mongoose = require('mongoose');

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
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number,		//Energize
	LB: Number			//Laurelle Bag
},{collection: "sales"});

module.exports = mongoose.model("sales", salesSchema);