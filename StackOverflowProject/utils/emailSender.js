var nodemailer = require("nodemailer");
var database = require('../database/index');
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var handlebars = require('handlebars');
mongoose.Promise = global.Promise;


var sendMessage = function (email, host, userId) {

    var key, mailOptions, link;
    var smtpTransport = nodemailer.createTransport({
        service: config.get('email:service'),
        auth: {
            user: config.get('email:login'),
            pass: config.get('email:password'),
        }
    });
    key = generateKey(userId);
    database.addKey(userId, key);
    link = "http://" + host + "/auth/verify/" + key;

    fs.readFile(__dirname + '/messageTemplate.hbs', function (err, data) {
        var source = data.toString();
        var myHtml = renderToString(source, { link: link });

        console.log(typeof myHtml);
        mailOptions = {
            to: email,
            subject: "Please confirm your Email account",
            html: myHtml
        }
        smtpTransport.sendMail(mailOptions);
    });
}

function renderToString(source, data) {
    var template = handlebars.compile(source);
    var outputString = template(data);
    return outputString;
} 


var verifyUser = function (key) {
    return database.checkKey(key).then(function (key) {
        console.log(key);
        if (key) {
            database.openUserAccess(key.user);
            database.deleteKey(key.key);
        }
    });
}

var generateKey = function (userId) {
    return userId + Math.floor((Math.random() * 100) + 54);
}

module.exports.sendMessage = sendMessage;
module.exports.verifyUser = verifyUser;