var mongoose = require("mongoose");
var Badge = require('../models/badge');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var getAllBadges = function (userId) {
    return Badge.find({user: userId}).exec();
}

var addBadge = function (name, icon, userId) {
    var badge = new Badge({
        name: name,
        icon: icon,
        user: userId
    });
    badge.save(function (err, next) {
        if (err) { next(err) }
    });
}

var checkBadge = function (userId, badgeName) {
    return Badge.findOne({ name: badgeName, user: userId }).exec();
}

module.exports.checkBadge = checkBadge;
module.exports.getAllBadges = getAllBadges;
module.exports.addBadge = addBadge;