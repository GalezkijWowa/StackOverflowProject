﻿var express = require('express');
var app = express();

var hbs = require('hbs'),
    debug = require('debug'),
    path = require('path'),
    logger = require('morgan'),
    http = require('http'),
    config = require('../config'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    routes = require('../routes'),
    exphbs = require('express3-handlebars'),
    session = require('express-session')

module.exports = function (app, express) {
    //HBS Helpers
    hbs.registerPartials(__dirname + "../views/partials");
    app.set('views', path.join(__dirname, '../views'));
    const {
        eq,
        formatDate
    } = require('../helpers/hbs');

    app.engine('.hbs', exphbs({
        helpers: {
            eq: eq,
            formatDate: formatDate
        },
        precompiled: ['views/partials'],
        extname: '.hbs', partialsDir: ['views/partials']
    }));
    app.set("view engine", "hbs");

    app.use("/public", express.static(path.join(__dirname, '../public')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    mongoose.connect(config.get('db:connection'));

    var MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: config.get('session:secret'),
        key: config.get('session:key'),
        cookie: config.get('session:cookie'),
        store: new MongoStore({ url: config.get('db:connection') })
    }));
    app.use(require("./loadUser"));
    app.use(routes);

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};