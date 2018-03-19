var mongoose = require("mongoose");
var Answer = require("../models/answer");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var addAnswer = function () { }
var getAnswers = function (questionId) { }
var editAnswer = function (answerId) { }
var deleteAnswer = function (answerId) { }
var addVote = function (answerId, vote) { }



module.exports.addAnswer = addAnswer;
module.exports.getAnswers = getAnswers;
module.exports.editAnswer = editAnswer;
module.exports.deleteAnswer = deleteAnswer;
module.exports.addVote = addVote;