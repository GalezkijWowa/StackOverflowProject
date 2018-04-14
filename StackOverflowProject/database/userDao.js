var mongoose = require("mongoose");
var User = require("../models/user");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var addUser = function (username, password, phone, email, role, access=false) {
    var user = new User({
        username: username,
        password: password,
        phonenumber: phone,
        email: email,
        role: role, 
        access: access
    });
    return user.save();
}
var openUserAccess = function (userId) {
    User.update({ _id: userId }, { access: true }).exec();
}

var getUserByName = function (username) {
    return User.findOne({ username: username });
}

var getUserByEmail = function (email, username) {
    return User.findOne({ email: email, username: username });
}

var getUserById = function (userid) {
    return User.findOne({ _id: userid });
}

var setUserReputation = function (userid, points) {
    User.findOne({ _id: userid }, function (err, value) {
        User.update({ _id: userid }, { reputation: value.reputation + parseInt(points) }).exec();
    });
}

var getAllUsers = function () {
    return User.find({});
}

module.exports.getAllUsers = getAllUsers;
module.exports.openUserAccess = openUserAccess;
module.exports.setUserReputation = setUserReputation;
module.exports.getUserById = getUserById;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;