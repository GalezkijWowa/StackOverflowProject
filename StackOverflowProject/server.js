'use strict';
var express = require('express'),
    http = require('http'),
    config = require('./config'),
    app = express(),
    middleware = require('./middleware')(app, express)

setInterval(require('./utils/badgeScript'), config.get('badgeScript:period'));

http.createServer(app).listen(config.get('port'));