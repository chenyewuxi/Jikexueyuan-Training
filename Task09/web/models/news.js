var uid = require('../utils/uuid'); //用于生成id
var client = require('../database');

function News(User) {
    this.news_id = user.news_id;
    this.news_title = user.news_title;
    this.news_content = user.news_content;
    this.news_add = user.news_content;
    this.news_content = user.news_content;
}

var tabelName = 'news';
var mysql = client.getDbCon();


module.exports = User;

//存储用户信息
User.prototype.save = function save(callback) {
    //要存入数据库的用户文档
    var user = {
        'user_id': this.userid,
        password: this.password,
        role: this.role
    };
    uuid = uid.v4();
    console.log("uuid=" + uuid);

    var sql = "INSERT into users (id,user_id,password,role) values (?,?,?,?)";

    mysql.query(sql, [uuid, user.name, user.password, user.role], function(err, results, fields) {
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });


};

//读取用户信息
User.get = function get(username, callback) {
    //打开数据库
    var sql = "select id,`user_id`,password,role from users where `user_id`='" + username + "'";
    console.log(sql);
    mysql.query(sql, function(err, results,fields) {
        if (err) {
            throw err;
        } else {
            console.log(results[0]);
            callback(err, results[0], fields);
        }
    });
};

 