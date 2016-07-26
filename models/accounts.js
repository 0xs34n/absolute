var mongoose = require('mongoose');

var accountsSchema = new mongoose.Schema({
	ID: {type: String, unique: true},
	firstName: String,
	lastName: String,
	Designation: {type: String, default: "Field Representative"},
	trainerID: String,
	teamName: String,
	teamTag: String,
	Gender: String,
	Email: String,
	Nationality: String,
	mobileNumber: Number,
	IC: {type: Boolean, default: 0},
	Manager: {type: Boolean, default: 0},
	Master: {type: Boolean, default: 0}
},{collection: "accounts"});

module.exports = mongoose.model("accounts", accountsSchema);