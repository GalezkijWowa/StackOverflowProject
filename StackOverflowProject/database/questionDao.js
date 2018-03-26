var mongoose = require("mongoose");
var Question = require("../models/question");
var Vote = require("../models/questionVote");
var async = require('async');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var getQuestion = function (questionId) {
    result = Question.findById(id = questionId);
    return result;
}

var addQuestion = function (author, title, description, answers=null, tags=null) {
    var question = new Question({
        author: author,
        title: title,
        description: description,
        answers: answers,
        tags: tags
    });
    question.save(function (err, next) {
        if (err) { next(err) }
    });
}

var getAllQuestions = function () {
    result = Question.find({});
    return result;
}

var userQuestions = function (userId) {
    result = Question.find({ author: userId});
    return result;
}

var getTagQuestions = function (tagId) { }
var editQuestion = function (questionId, title, description) {
    Question.update({ _id: questionId }, { title: title, description: description, dateofupdate: new Date(Date.now())}).exec();
}
var deleteQuestion = function (questionId) {
    Question.findByIdAndRemove(id = questionId).exec();
}
var addQuestionVote = function (questionId, userId, points) {
    Vote.findOne({ question: questionId, author: userId }, function (err, value) {
        if (value == undefined) {
            var vote = new Vote({
                author: userId,
                question: questionId
            });
            vote.save(function (err, next) {
                if (err) { next(err) }
            });
            Question.findById({ _id: questionId }, function (err, value) {
                Question.update({ _id: questionId }, { rating: value.rating + parseInt(points) }).exec();
            });
        }
    });
}

var findQuestionVote = function (questionId, userId) {
    result = Vote.find({author: userId, question: questionId});
    return result;
}

module.exports.addQuestion = addQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getTagQuestions = getTagQuestions;
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addQuestionVote = addQuestionVote;
module.exports.findQuestionVote = findQuestionVote;
module.exports.userQuestions = userQuestions;