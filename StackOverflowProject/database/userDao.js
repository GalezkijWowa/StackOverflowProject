var mongoose = require("mongoose");
var User = require("../models/user");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var addUser = function (username, password, role) {
    var user = new User({
        username: username,
        password: password,
        role: role
    });
    user.save(function (err) {
    });
}

var getUserByName = function (username, fn) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return next(err);
        fn(user);
        return user;
    });
}

var getUserById = function (userid, fn) {
    User.findOne({ _id: userid }, function (err, user) {
        if (err) return next(err);
        fn(user);
        return user;
    });
}

module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;