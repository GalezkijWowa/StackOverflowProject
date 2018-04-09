var mongoose = require("mongoose");
var Key = require('../models/verifyKey');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var addKey = function (userId, key) {
    var myKey = new Key({
        user: userId,
        key: key
    });
    myKey.save(function (err, next) {
        if (err) { next(err) }
    });
}

var checkKey = function (key) {
    return Key.findOne({key : key});
}

var deleteKey = function (key) {
    Key.remove({key: key}).exec();
}

module.exports.deleteKey = deleteKey;
module.exports.checkKey = checkKey;
module.exports.addKey = addKey;