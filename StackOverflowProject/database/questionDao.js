var mongoose = require("mongoose");
var Question = require("../models/question");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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

var getQuestion = function (questionId) {
    result = Question.findById(id = questionId);
    return result;
}

var userQuestions = function (userId) {
    result = Question.find({ author: userId});
    return result;
}

var getTagQuestions = function (tagId) { }
var editQuestion = function (questionId) { }
var deleteQuestion = function (questionId) { }
var addVote = function (questionId, vote) { }

module.exports.addQuestion = addQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getTagQuestions = getTagQuestions;
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addVote = addVote;
module.exports.userQuestions = userQuestions;