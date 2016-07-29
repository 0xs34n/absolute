var mongoose = require('mongoose');

//Account Schema
var accountsSchema = new mongoose.Schema({
	ID: {type: String, unique: true},
	firstName: String,
	lastName: String,
	Designation: {type: String, default: "Field Representative"},
	trainerID: String,
	teamName: String,
	teamTag: String,
	seniorTeam: String, 
	Gender: String,
	Email: String,
	Nationality: String,
	mNumber: Number,
	IC: {type: Boolean, default: 0},
	Manager: {type: Boolean, default: 0},
	Master: {type: Boolean, default: 0}
},{collection: "accounts"});

var accounts = mongoose.model("accounts", accountsSchema);

//Create a new Account or update if account exists in database
exports.create = function(ID, firstName, lastName, Designation, trainerID, teamName, teamTag, seniorTeam, Gender, Email, Nationality, mNumber, IC, Manager, Master){
	var item = {
			ID: ID,
            firstName: firstName,
            lastName: lastName,
            Designation: Designation,
            trainerID: trainerID,
            teamName: teamName,
            teamTag: teamTag,
            seniorTeam: seniorTeam,
            Gender: Gender,
            Email: Email,
            Nationality: Nationality,
            mNumber: mNumber,
            IC: IC,
            Manager: Manager,
            Master: Master
	};
    var newAccount = new accounts(item);
    newAccount.save(function(err, data){
        if(err) {
            console.log(err);
            return res.status(500).send();
        };
    });
};

//Returns array of distinct value
exports.getDistinct = function(value){
    accounts.distinct(value, function(err, doc){
        if (err) return cb(err);
        cb(null, docs);
    })
};


//Get a account by ID, returns single object
exports.get = function(ID, cb) {
	accounts.findOne({ID: ID}, function(err, docs){
		if (err) return cb(err);
		cb(null, docs);
	});
};

//Returns list of all accounts
exports.all = function(cb) {
	accounts.find({}, function(err, docs){
		if (err) return cb(err);
		cb(null, docs);
	});
}

exports.delete = function(id, cb){


};

exports.agg = function(seniorTeam, cb){
	accounts.aggregate([
		{$project:{ _id: 0, seniorTeam: 1, ID: 1, firstName: 1, lastName: 1}},
		{$match: {seniorTeam: seniorTeam}},
		{$sort: {ID: 1, Date: 1}},
		{$lookup: {from:"sales", localField:"ID", foreignField:"ID", as: "sales"}},
		{$unwind: {path: "$sales"}}

	], function(err, docs){
		if (err) return cb(err);
		cb(null, docs);
	});
};




