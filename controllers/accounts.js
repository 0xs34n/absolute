var express  = require('express');
var router   = express.Router();
var accounts = require('../models/accounts');
	
//User to Update Info
router.get('/updateInfo', function(req, res){

	res.render('./updateInfo');
});

router.post('/updateInfo', function(req, res){
	accounts.create(req.body.ID, req.body.firstName, req.body.lastName, req.body.Designation, req.body.trainerID, req.body.teamName, req.body.teamTag, req.body.seniorTeam, req.body.Gender, req.body.Email, req.body.Nationality, req.body.mNumber, req.body.IC, req.body.Manager, req.body.Master);
	res.redirect('./updateInfo');
});

module.exports = router;