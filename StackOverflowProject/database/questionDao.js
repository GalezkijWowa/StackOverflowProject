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

var getAllQuestions = function (from, to) {
    return result = Question.find({}).skip(from).limit(to-from).exec();
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
var getTopQuestions = function (from, to, sign) {
    return Question.find({}).sort({ rating: sign }).skip(from).limit(to - from).exec();
}
var getQuestionsByTitle = function (from, to, sign) {
    return Question.find({}).sort({ title: sign }).skip(from).limit(to - from).exec();
}
var getQuestionsByDate = function (from, to, sign) {
    return Question.find({}).sort({ dateofcreation: sign }).skip(from).limit(to - from).exec();
}
var getQuestionsByLastUpdate = function (from, to, sign) {
    return Question.find({}).sort({ dateofupdate: sign }).skip(from).limit(to - from).exec();
}
var getQuestionsSize = function () {
    return Question.count().exec();
}

var searchQuestions = function (text) {
    return Question.find({
        $or: [
            {  'title' : { $regex: new RegExp(text, 'i') } },
            { 'description': { $regex: new RegExp(text, 'i') } }
        ]
    }).exec();
}

module.exports.getQuestionsSize = getQuestionsSize
module.exports.getQuestionsByTitle = getQuestionsByTitle;
module.exports.getQuestionsByDate = getQuestionsByDate;
module.exports.getQuestionsByLastUpdate = getQuestionsByLastUpdate;
module.exports.searchQuestions = searchQuestions;
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