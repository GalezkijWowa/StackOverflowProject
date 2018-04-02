var mongoose = require("mongoose");
var Question = require("../models/question");
var Vote = require("../models/questionVote");
var QuestionTag = require('../models/questionTag');
var async = require('async');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var getQuestion = function (questionId) {
    return Question.findById(id = questionId).exec();
}

var addQuestion = function (author, title, description) {
    var question = new Question({
        author: author,
        title: title,
        description: description
    });
    return question.save();
}

var getAllQuestions = function () {
    result = Question.find({}).exec();
    return result;
}

var userQuestions = function (userId) {
    result = Question.find({ author: userId});
    return result.exec();
}

var editQuestion = function (questionId, title, description) {
    return Question.update({ _id: questionId }, { title: title, description: description, dateofupdate: new Date(Date.now())}).exec();
}
var deleteQuestion = function (questionId) {
    return Question.findByIdAndRemove(id = questionId).exec();
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

var getQuestionsByTag = function (tagName, fn) {
    var result = [];
    QuestionTag.find({ tagname: tagName }, function (err, tags) {
        if (tags.length == 0) {
            fn(result);
            return result;
        }
        else {
            tags.forEach(function (element) {
                Question.findOne({ _id: element.question }, function (err, question) {
                    result.push(question);
                    if (tags[tags.length - 1].question.toString() == question._id.toString()) {
                        fn(result);
                        return result;
                    }
                });
            });
        }
    });

    Question.where('_id').in(tags);
}

module.exports.addQuestion = addQuestion;
module.exports.getQuestionsByTag = getQuestionsByTag;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addQuestionVote = addQuestionVote;
module.exports.userQuestions = userQuestions;