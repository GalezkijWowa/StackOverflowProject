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
    return user.save();
}

var getUserByName = function (username) {
    return User.findOne({ username: username });
}

var getUserById = function (userid) {
    return User.findOne({ _id: userid });
}

module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;