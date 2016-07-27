var express  = require('express');
var router   = express.Router();

router.use('/inventory', require('./inventory'));
router.use('/sales', require('./sales'));
router.use('/users', require('./users'));
router.use('/accounts', require('./accounts'));

router.get('/', function(req, res){
	res.render('./login');
});
	
module.exports = router;
