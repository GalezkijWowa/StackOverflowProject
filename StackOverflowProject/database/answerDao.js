var mongoose = require("mongoose");
var Answer = require("../models/answer");
var Question = require("../models/question");
var Vote = require("../models/answerVote");
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

    return answer.save();
}
var getAnswers = function (questionId, fn) {
    return Answer.find({ question: questionId }).exec();
}

var editAnswer = function (answerId, text) {
    return Answer.update({ _id: answerId }, { text:text, dateofupdate: new Date(Date.now()) }).exec();
}

var addAnswerVote = function (answerId, userId, points) {
    Vote.findOne({ answer: answerId, author: userId }, function (err, value) {
        if (value == undefined) {
            var vote = new Vote({
                author: userId,
                answer: answerId
            });
            vote.save(function (err, next) {
                if (err) { next(err) }
            });
            Answer.findById({ _id: answerId }, function (err, value) {
                Answer.update({ _id: answerId }, { rating: value.rating + parseInt(points) }).exec();
            });
        }
    });
}

var deleteAnswers = function (questionId) {
    Answer.remove({ question: questionId }).exec();
}

var deleteAnswer = function (answerId) {
    Vote.remove({ answer: answerId }).exec();
    Answer.findByIdAndRemove(answerId).exec();
}

module.exports.addAnswer = addAnswer;
module.exports.getAnswers = getAnswers;
module.exports.editAnswer = editAnswer;
module.exports.deleteAnswer = deleteAnswer;
module.exports.deleteAnswers = deleteAnswers;
module.exports.addAnswerVote = addAnswerVote;