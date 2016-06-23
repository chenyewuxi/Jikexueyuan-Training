
var settings;

settings = {
    cookieSecret: 'you can\'t see the seed.',
    db: {
        host: 'localhost', //本地数据库
        port: '3306',
        user: 'root', //数据库用户名
        password: '=Lindsayc5', //数据库密码
        database: 'phplesson' //数据库名称
    },
    orm: 'mysql://root:=Lindsayc5@localhost/phplesson'

};

module.exports = settings;
