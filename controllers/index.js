var express  = require('express');
var router   = express.Router();

router.use('/inventory', require('./inventory'));
router.use('/sales', require('./sales'));
router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));
router.use('/tracker', require('./tracker'));
router.use('/leftStocks', require('./leftStocks'));
router.use('/outStocks', require('./outStocks'));
router.use('/location', require('./location'));


router.get('/', function(req, res){
	res.render('./login');
});

router.get('/salestracker', function(request, response) {
	response.render('./new/sales_tracker');
});

module.exports = router;
