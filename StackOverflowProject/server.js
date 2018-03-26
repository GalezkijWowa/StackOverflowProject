'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var http = require('http');
var config = require('./config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require("mongoose");
var routes = require('./routes');
var app = express();
var exphbs = require('express3-handlebars');
var helpers = require('../StackOverflowProject/helpers/hbHelpers');
var session = require('express-session');
var Handlebars = require('handlebars');
var moment = require('moment');
// view engine setup
hbs.registerPartials(__dirname + "/views/partials");
app.set('views', path.join(__dirname, 'views'));

//HBS Helpers
const {
    eq,
    formatDate
} = require('./helpers/hbs');

app.engine('.hbs', exphbs({
    helpers: {
        eq: eq,
        formatDate: formatDate
    },
    precompiled: ['views/partials'],
    extname: '.hbs', partialsDir: ['views/partials']
}));
app.set("view engine", "hbs");


app.use("/public", express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(config.get('db:connection'));

var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ url: config.get('db:connection')})
}));
app.use(require("./middleware/loadUser"));
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(config.get('port'));