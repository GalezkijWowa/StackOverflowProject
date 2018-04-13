'use strict';
var express = require('express'),
    https = require('https'),
    http = require('http'),
    config = require('./config'),
    app = express(),
    middleware = require('./middleware')(app, express),
    fs = require('fs');

setInterval(require('./utils/badgeScript'), config.get('badgeScript:period'));

http.createServer(app).listen(config.get('port'));

//var options = {
//    cert: fs.readFileSync('./certificate.pem'),
//    key: fs.readFileSync('./privatekey.pem')
//}
//https.createServer(options, app).listen(config.get('port'));