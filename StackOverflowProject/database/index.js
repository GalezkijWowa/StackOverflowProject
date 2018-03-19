var mongoose = require("mongoose");
var userDao = require('./userDao');
var questionDao = require('./questionDao');
var answerDao = require('./answerDao');
var tagDao = require('./tagDao');

module.exports.addUser = userDao.addUser

module.exports.addQuestion = questionDao.addQuestion;
module.exports.getAllQuestions = questionDao.getAllQuestions;
module.exports.getTagQuestions = questionDao.getTagQuestions
module.exports.getQuestion = questionDao.getQuestion;
module.exports.editQuestion = questionDao.editQuestion;
module.exports.deleteQuestion = questionDao.deleteQuestion;
module.exports.addVote = questionDao.addVote;

module.exports.addAnswer = answerDao.addAnswer;
module.exports.getAnswers = answerDao.getAnswers;
module.exports.editAnswer = answerDao.editAnswer;
module.exports.deleteAnswer = answerDao.deleteAnswer;
module.exports.addVote = answerDao.addVote;

module.exports.getTags = tagDao.getTags;
module.exports.addTag = tagDao.addTag;
module.exports.edtiTag = tagDao.editTag;
module.exports.deleteTag = tagDao.deleteTag;