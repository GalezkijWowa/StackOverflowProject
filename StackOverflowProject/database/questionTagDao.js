var mongoose = require("mongoose");
var QuestionTag = require('../models/questionTag');
var Question = require("../models/question");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var editQuestionTags = function (tagName, newTagName) {
    QuestionTag.update({ tagname: tagName }, { tagname: newTagName }).exec();
}

var getQuestionTags = function (questionId, fn) {
    QuestionTag.find({ question: questionId }, function (err, result) {
        fn(result);
        return result;
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

var deleteQuestionTags = function (tagName, fn) {
    QuestionTag.remove({ tagname: tagName }, function (err, result) { });
}

module.exports.addQuestionTag = addQuestionTag;
module.exports.editQuestionTags = editQuestionTags;
module.exports.getQuestionTags = getQuestionTags;
module.exports.deleteQuestionTags = deleteQuestionTags;