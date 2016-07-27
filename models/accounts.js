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
   	accounts.update({ID: ID}, {ID: ID}, {upsert: true}, function(err, raw){
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
    });
    if(firstName != "")
    {
    	accounts.update({ID: ID}, {firstName: firstName}, function(err, raw){
        	if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
    };
    if(lastName != "")
    {
        accounts.update({ID: ID}, {lastName: lastName}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
    };
    if(Designation != "")
    {
        accounts.update({ID: ID}, {Designation: Designation}, function(err, raw){
        	if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
    };
    if(trainerID != "")
    {
        accounts.update({ID: ID}, {trainerID: trainerID}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });     
    };
    if(teamName != "")
    {
        accounts.update({ID: ID}, {teamName: teamName}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
    };
    if(teamTag != "")
    {
        accounts.update({ID: ID}, {teamTag: teamTag}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(Nationality != "")
    {
        accounts.update({ID: ID}, {Nationality: Nationality}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(Email != "")
    {
        accounts.update({ID: ID}, {Email: Email}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(mNumber != "")
    {
        accounts.update({ID: ID}, {mobileNumber: mNumber}, function(err, raw){
        if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(IC != "")
    {
        accounts.update({ID: ID}, {IC: IC}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(Manager != "")
    {
        accounts.update({ID: ID}, {Manager: Manager}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(Master != "")
    {
        accounts.update({ID: ID}, {Master: Master}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };
    if(Gender != "")
    {
        accounts.update({ID: ID}, {Gender: Gender}, function(err, raw){
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });    
    };   
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


