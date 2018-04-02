var mongoose = require("mongoose");
var QuestionTag = require('../models/questionTag');
var Question = require("../models/question");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var editQuestionTags = function (tagName, newTagName) {
    return QuestionTag.update({ tagname: tagName }, { tagname: newTagName }).exec();
}

var getQuestionTags = function (questionId) {
    return QuestionTag.find({ question: questionId }).exec();
}

var getQuestionTagsByTagName = function (tagName) {
    return QuestionTag.find({ tagname: tagName }).exec();
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

var deleteQuestionTags = function (questionId) {
    return QuestionTag.remove({ question: questionId }).exec();
}

var deleteQuestionTagsByName = function (tagName) {
    return QuestionTag.remove({ tagname: tagName }).exec();
}

module.exports.addQuestionTag = addQuestionTag;
module.exports.editQuestionTags = editQuestionTags;
module.exports.getQuestionTags = getQuestionTags;
module.exports.getQuestionTagsByTagName = getQuestionTagsByTagName;
module.exports.deleteQuestionTags = deleteQuestionTags;
module.exports.deleteQuestionTagsByName = deleteQuestionTagsByName;