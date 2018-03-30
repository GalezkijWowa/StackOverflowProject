var mongoose = require("mongoose");
var Question = require("../models/question");
var Vote = require("../models/questionVote");
var QuestionTag = require('../models/questionTag');
var async = require('async');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var getQuestion = function (questionId, fn) {
    Question.findById(id = questionId, function (err, result) {
        fn(result);
        return result;
    });
}

var addQuestion = function (author, title, description, tags) {
    var question = new Question({
        author: author,
        title: title,
        description: description
    });
    question.save(function (err, next) {
        if (err) { next(err) }
    });
    if (typeof tags == 'string') {
        addQuestionTag(question._id, tags);
    }
    else {
        tags.forEach(function (element) {
            addQuestionTag(question._id, element);
        });
    }
    
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
    Question.findByIdAndRemove(id = questionId, function (err, question) {
        Vote.remove({ question: questionId }).exec();
    }).exec();
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

var addQuestionTag = function (questionId, tagname) {
    var questionTag = new QuestionTag({
        question: questionId,
        tagname: tagname
    });
    questionTag.save(function (err, next) {
        if (err) { next(err) }
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
}

var deleteQuestionTags = function (questionId) {
    QuestionTag.remove({ question: questionId }).exec();
}

module.exports.deleteQuestionTags = deleteQuestionTags;
module.exports.getQuestionsByTag = getQuestionsByTag;
module.exports.addQuestion = addQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getTagQuestions = getTagQuestions;
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addQuestionVote = addQuestionVote;
module.exports.userQuestions = userQuestions;