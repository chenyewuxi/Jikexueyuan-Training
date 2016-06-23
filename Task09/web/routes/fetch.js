var express = require('express');
var router = express.Router();
var orm = require("orm");
var mysql = require("mysql");
var settings = require('../settings');
var Entities = require('html-entities').AllHtmlEntities;
var mydata = require('../utils/date-utils');

// var uid = require('../utils/uuid'); //用于生成id


htmlent = new Entities();

/* GET Fetch page. */
router.post('/', function(req, res) {

    orm.connect(settings.orm, function(err, db) {

        if (err) throw err;

        var curtcategory = convertHtmlEncode(req.body.category);

        var News = db.define("news", {
            news_id: {
                type: 'serial',
                key: true
            },
            category: ['推荐', '百家', '本地', '图片'], // ENUM type 
            news_title: String,
            news_image: String,
            news_content: String,
            news_addtime: Date
                // age: Number, // FLOAT 
                // male: Boolean,
                // photo: Buffer, // BLOB/BINARY 
                // data: Object // JSON encoded 
        }, {
            method: {
                addFromatTime: function() {
                    return this.news_addtime.replaceWith(/T/,' ');
                }
            }
        });

        switch (curtcategory) {
            case "ALL":
                News.find({}, ["news_id", "Z"], function(err, news) {
                    if (err) throw err;



                    res.set('Content-Type', 'application/json');
                    // console.log（req.params.category）；
                    var result = {};
                    result.desc = "OK";
                    result.result = news;
                    result.recordcount = news.length;
                    result.columncount = 6;
                    res.send(JSON.stringify(result));
                    // 
                    // res.json(news);
                });
                break;
            default:
                News.find({ category: curtcategory }, ["news_id", "Z"],function(err, news) {
                    if (err) throw err;
                    
                    res.set('Content-Type', 'application/json');
                    // console.log（req.params.category）；
                    var result = {};
                    result.desc = "OK";
                    result.result = news;
                    result.recordcount = news.length;
                    result.columncount = 6;
                    res.send(JSON.stringify(result));
                    // 
                    // res.json(news);
                });
                break;

        }

    });


});


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

router.post('/Save', function(req, res) {

    orm.connect(settings.orm, function(err, db) {

        if (err) throw err;

        // var conn =orm.connection;

        var category = convertHtmlEncode(req.body.category);
        var news_id = convertHtmlEncode(req.body["news_id"]);

        var news_title = convertHtmlEncode(req.body["news_title"]);
        var news_image = convertHtmlEncode(req.body["news_image"]);
        var news_content = convertHtmlEncode(req.body["news_content"]);
        var news_addtime = convertHtmlEncode(req.body["news_addtime"]);

        console.log("news_title=" + news_title);

        var News = db.define("news", {
            news_id: {
                type: 'serial',
                key: true
            },
            category: ['推荐', '百家', '本地', '图片'], // ENUM type 
            news_title: String,
            news_image: String,
            news_content: String,
            news_addtime: Date
                // age: Number, // FLOAT 
                // male: Boolean,
                // photo: Buffer, // BLOB/BINARY 
                // data: Object // JSON encoded 
        });

        console.log("news_id=" + news_id);
        switch (news_id) {
            case "":
            case " ":
            case undefined:
                console.log("transfer into INSERT routine");
                News.create({
                    // "news_id": 'NULL',
                    "category": category,
                    "news_title": news_title,
                    "news_image": news_image,
                    "news_content": news_content,
                    "news_addtime": news_addtime //,
                }, function(err, items) {
                    if (err) throw err;

                    res.set('Content-Type', 'application/json');
                    // console.log（req.params.category）；
                    var result = {};
                    result.desc = "OK";
                    res.send(JSON.stringify(result));
                    // 
                    // res.json(news);
                });
                break;
            default:
                News.find({ news_id: news_id }).each(function(news) {
                    news.category = category;
                    news.news_title = news_title;
                    news.news_image = news_image;
                    news.news_content = news_content;
                    news.news_addtime = news_addtime;
                }).save(function(err) {
                    if (err) throw err;

                    res.set('Content-Type', 'application/json');
                    // console.log（req.params.category）；
                    var result = {};
                    result.desc = "OK";
                    res.send(JSON.stringify(result));
                });


                break;

        }

    });


});


router.post('/Delete', function(req, res) {

    orm.connect(settings.orm, function(err, db) {

        if (err) throw err;

        var news_id = req.body['news_id'];
        console.log("news_id=" + news_id);
        var News = db.define("news", {
            news_id: {
                type: 'serial',
                key: true
            },
            category: ['推荐', '百家', '本地', '图片'], // ENUM type 
            news_title: String,
            news_image: String,
            news_content: String,
            news_addtime: Date
                // age: Number, // FLOAT 
                // male: Boolean,
                // photo: Buffer, // BLOB/BINARY 
                // data: Object // JSON encoded 
        });

        console.log(News.find({ 'news_id': news_id }));

        News.find({ 'news_id': news_id }).remove(function(err) {

            if (err) throw err;

            res.set('Content-Type', 'application/json');
            // console.log（req.params.category）；
            var result = {};
            result.desc = "OK";
            res.send(JSON.stringify(result));
        });

    });


});
module.exports = router;
