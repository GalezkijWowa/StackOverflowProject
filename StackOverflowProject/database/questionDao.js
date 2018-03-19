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
    question.save(function (err) {
        mongoose.disconnect();
    });
}

var getAllQuestions = function () {
    return Question;
}

var getTagQuestions = function (tagId) { }
var getQuestion = function (questionId) { }
var editQuestion = function (questionId) { }
var deleteQuestion = function (questionId) { }
var addVote = function (questionId, vote) { }

module.exports.addQuestion = addQuestion;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getTagQuestions = getTagQuestions
module.exports.getQuestion = getQuestion;
module.exports.editQuestion = editQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.addVote = addVote;