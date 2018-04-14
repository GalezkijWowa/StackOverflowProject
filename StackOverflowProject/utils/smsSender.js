var config = require('../config');
const client = require('twilio')(config.get('twilio:key'), config.get('twilio:secret'));
var randomstring = require('randomstring');

var sendSms= function (number) {
    var code = randomstring.generate(config.get("phone:symbols"));
    client.messages.create(
        {
            to: '+79013395277', // number
            from: config.get("phone:number"),
            body: 'Your secret code ' + code
        });
    return code;
}

module.exports.sendSms = sendSms;