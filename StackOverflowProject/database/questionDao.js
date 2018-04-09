var mongoose = require("mongoose");
var Question = require("../models/question");
var Vote = require("../models/questionVote");
var QuestionTag = require('../models/questionTag');
var async = require('async');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userQuestions = function (userId) {
    result = Question.find({ author: userId });
    return result.exec();
}

var getQuestion = function (questionId) {
    return Question.findById(id = questionId).exec();
}

var addQuestion = function (author, authorname, title, description) {
    var question = new Question({
        author: author,
        authorname: authorname,
        title: title,
        description: description
    });
    return question.save();
}

var getAllQuestions = function () {
    result = Question.find({}).exec();
    return result;
}

var editQuestion = function (questionId, title, description) {
    return Question.update({ _id: questionId }, { title: title, description: description, dateofupdate: new Date(Date.now())}).exec();
}
var deleteQuestion = function (questionId) {
    return Question.findByIdAndRemove(id = questionId).exec();
}
var addQuestionVote = function (questionId, userId, points) {
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

var checkQuestionVote = function (questionId, userId) {
    return Vote.findOne({ question: questionId, author: userId }).exec();
}

var deleteQuestionVotes = function (quesionId) {
    return Vote.remove({ question: quesionId }).exec();
}

var getQuestionsByTag = function (tagName) {
    var result = [];
    return QuestionTag.find({ tagname: tagName }).then(function (qTags) {
        var qIds = qTags.map(q => q.question);
        return Question.find({ _id: { $in: qIds } }).exec();
    });
}
var getTopQuestions = function (number) {
    return Question.find({}).sort({ rating: -1 }).limit(number).exec();
}

module.exports.getTopQuestions = getTopQuestions;
module.exports.deleteQuestionVotes = deleteQuestionVotes;
module.exports.checkQuestionVote = checkQuestionVote;
module.exports.addQuestion = addQuestion;
module.exports.getQuestionsByTag = getQuestionsByTag;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addQuestionVote = addQuestionVote;
module.exports.userQuestions = userQuestions;