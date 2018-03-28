'use strict';
var express = require('express'),
    http = require('http'),
    config = require('./config'),
    app = express(),
    middleware = require('./middleware')(app, express)


http.createServer(app).listen(config.get('port'));