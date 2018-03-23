var mongoose = require("mongoose");
var Answer = require("../models/answer");
var Question = require("../models/question");
var questionDao = require("./questionDao");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var addAnswer = function (questionId, authorname, authorId, text) {
    var answer = new Answer({
        author: authorId,
        authorname: authorname,
        question: questionId,
        text: text
    });

    answer.save(function (err, next) {
        if (err) { next(err) }
    });

}
var getAnswers = function (questionId) {
    result = Answer.find({ question: questionId });
    return result;
}
var editAnswer = function (answerId) { }
var deleteAnswer = function (answerId) { }

var addAnswerVote = function (answerId, vote) { }

var deleteAnswers = function (questionId) {
    Answer.remove({ question: questionId }).exec();
}

module.exports.addAnswer = addAnswer;
module.exports.getAnswers = getAnswers;
module.exports.editAnswer = editAnswer;
module.exports.deleteAnswer = deleteAnswer;
module.exports.deleteAnswers = deleteAnswers;
module.exports.addAnswerVote = addAnswerVote;