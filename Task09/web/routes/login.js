
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
 	res.render('login.ejs');
});


router.post('/', function(req, res) {
 	res.render('login.ejs');
});


module.exports = router;

