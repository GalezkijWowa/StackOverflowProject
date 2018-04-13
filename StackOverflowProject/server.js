'use strict';
var express = require('express'),
    https = require('https'),
    http = require('http'),
    config = require('./config'),
    app = express(),
    middleware = require('./middleware')(app, express),
    fs = require('fs');

setInterval(require('./utils/badgeScript'), config.get('badgeScript:period'));

var options = {
    key: fs.readFileSync('abels-key.pem'),
    cert: fs.readFileSync('abels-cert.pem')
}

http.createServer(app).listen(config.get('port'));
https.createServer(options, app).listen(8080);
