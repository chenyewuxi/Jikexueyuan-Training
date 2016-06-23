var express = require('express');
var router = express.Router();
var orm = require("orm");


var crypto = require('crypto');
var user = require('../models/user');
var uid =require('../utils/uuid.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index.ejs', { content: "" });
    // next();
});

router.get('/index', function(req, res) {
    res.render('index.ejs', { content: "" });
    // next();
});

// router.get('/Fetch', function(req, res, next) {


// 	var content = app.get('content');
// 	// console.log(res);
//     res.render('index.ejs', { content: content });

// });


module.exports = router;
