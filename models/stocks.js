var mongoose = require('mongoose');

var stocksSchema = new mongoose.Schema({
	ID: String,
	Location: String,
	Date: Date, 
	Shift: String, 
	MG: Number,         //Momentum Gold
	DP: Number,			//Desire Purple
	CG: Number,			//City Girl
	IO: Number,         //If Only
	SY: Number,			//Sports Yellow
	RO: Number,			//Royal
	TB: Number,			//Thomas Black
	EDT: Number,     	//Energize
	LB: Number          //Laurelle Bag
},{collection: "stocks"});

module.exports = mongoose.model("stocks", stocksSchema);