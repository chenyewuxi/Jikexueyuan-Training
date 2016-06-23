var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mysqlStore = require('connect-mysql')(session);
var settings = require('./settings');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var admin = require('./routes/admin');
var fetch = require('./routes/fetch');
var Authorization = require('./routes/Authorization');
var user = require('./models/user');

var flash = require('connect-flash');





var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: settings.cookieSecret,
    name: 'testapp',
    cookie: {maxAge: 1000*60*20 },  //20 Minutes
    resave:false,
    saveUninitialized: true,
}));
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/admin', admin);
app.use('/fetch', fetch);
app.use('/Authorization', Authorization);


//app.dynamicHelpers
app.use(function(req, res, next) {
    var error = req.flash('error');
    var success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.error = error.length ? error : null;
    res.locals.success = success ? success : null;
    next();
});




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
