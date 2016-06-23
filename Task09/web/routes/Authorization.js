var express = require('express');
var router = express.Router();
// var orm = require("orm");
var crypto = require('crypto');
var User = require('../models/user.js');
var flash = require('connect-flash');
var settings = require('../settings');
var Entities = require('html-entities').AllHtmlEntities;

htmlent = new Entities();


function convertHtmlEncode(str) {

    if (str == undefined) {
        console.log("string undefied");
        return undefined;
    } else if (str.length == 0) {
        console.log("string " + str);
        return str;
    } else {
        console.log("string " + htmlent.encode(str));
        return htmlent.encode(str);
    }
}

router.post('/', function(req, res) {

    var userid = convertHtmlEncode(req.body.userid);
    var password = convertHtmlEncode(req.body.password);

    console.log("password=" + password);

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('base64');

    console.log("passwordMD5=" + password);

    User.get(userid, function(err, user) {

        var errmsg = "";
        console.log("user=" + user);

        var result = {};

        switch (user) {
            case undefined:
                errmsg += "" + userid + "用户不存在！";
                break;
            default:
                if (user.password != password) {
                    errmsg += "" + userid + "密码错误";
                }
                //用户名密码都匹配后，将用户信息存入 session
                req.session.user = user;

                if (user.role != 'Admin') {
                    errmsg += "" + userid + "没有管理权限！";
                }

                break;

        }


        if (errmsg.length > 0) {
            req.flash('error', errmsg);
            res.set('Content-Type', 'application/json');

            result.desc = "Fail";
            result.error = errmsg;
            res.send(JSON.stringify(result));

        } else {
            console.log('Convert to Admin');

            res.set('Content-Type', 'application/json');
            result.desc = "OK";
            result.error = "登陆成功";
            res.send(JSON.stringify(result));
        }

    });
});








module.exports = router;
