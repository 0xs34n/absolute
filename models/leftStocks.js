var mongoose = require('mongoose');

var leftStocksSchema = new mongoose.Schema({
	Date: {type: Date, default: new Date()},			//Date Updated
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number,     	//Energize
	LB: Number,         //Laurelle Bag
	Cash: Number,		//Total Cash for that Day
	Nets: Number		//Total Nets for that Day
},{collection: "leftStocks"});

module.exports = mongoose.model("leftStocks", leftStocksSchema);