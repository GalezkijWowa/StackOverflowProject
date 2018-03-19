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

module.exports.addUser = addUser;