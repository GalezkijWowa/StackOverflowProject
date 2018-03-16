var mongoose = require("mongoose");
var userDao = require('./userDao');
var questionDao = require('./quastionDao');
var answerDao = require('./answerDao');
var tagDao = require('./tagDao');


mongoose.connect("mongodb://localhost:27017/TestMyTestDb3");

module.exports.addUser = userDao.addUser
