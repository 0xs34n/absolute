var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

router.post('/newuser', function(req, res){
	var newUser = new User({
		username: req.body.username,
		password: req.body.password
	});
	newUser.save(function(err){
		if (err) throw err;
	});
});

router.post('/auth', function(req, res){
	var checkUser = new User({
		username: req.body.username,
		password: req.body.password
	});
	User.getAuthenticated(checkUser.username, checkUser.password, function(err, user, reason){
		if (err) throw err;
		// login was successful if we have a user
        if (user) {
            // handle login success
            return res.redirect('/sales/addSales');
        }
        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            	res.redirect('../');
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                break;
        }
	})
});


module.exports = router;