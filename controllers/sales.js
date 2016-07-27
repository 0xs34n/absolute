var express  = require('express');
var router   = express.Router();

//Form to individual input sales
router.get('/add', function(req, res){				
	res.render('./addSales');
});

//Form for user to search existing sales data
router.get('/search', function(req, res){			

});

	

module.exports = router;