var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.user == undefined) {
        res.redirect('/Login');
    }
    console.log("Authorization get start");
    console.log(req.session.user);
    console.log("req.session.user.role=" + req.session.user.role);
    if (req.session.user.role != 'Admin') {
        res.redirect('/Login');
    } else {
        res.render('admin.ejs');
    }

});

router.post('/', function(req, res) {
    if (req.session.user == undefined) {
        res.redirect('/Login');
    }
    console.log("Authorization post start");
    console.log(req.session.user);
    if (req.session.user.role != 'Admin') {
        res.redirect('/Login');
    } else {
        res.render('admin.ejs');
    }

    res.render('admin.ejs');
});


// router.get('/Admin', function(req, res) {
//     if (req.session.user == undefined) {
//         res.redirect('/Login');
//     }
//     console.log("Authorization get start");
//     console.log(req.session.user);
//     console.log("req.session.user.role=" + req.session.user.role);
//     if (req.session.user.role != 'Admin') {
//         res.redirect('/Login');
//     } else {
//         res.render('admin.ejs');
//     }

// });

// router.post('/Admin', function(req, res) {
//     if (req.session.user == undefined) {
//         res.redirect('/Login');
//     }
//     console.log("Authorization post start");
//     console.log(req.session.user);
//     if (req.session.user.role != 'Admin') {
//         res.redirect('/Login');
//     } else {
//         res.render('admin.ejs');
//     }

//     res.render('admin.ejs');
// });





module.exports = router;
