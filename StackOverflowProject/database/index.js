var mongoose = require("mongoose");
var userDao = require('./userDao');
var questionDao = require('./questionDao');
var answerDao = require('./answerDao');
var tagDao = require('./tagDao');

module.exports.addUser = userDao.addUser;
module.exports.getUserByName = userDao.getUserByName;
module.exports.getUserById = userDao.getUserById;

module.exports.getQuestionsByTag = questionDao.getQuestionsByTag; 
module.exports.addQuestion = questionDao.addQuestion;
module.exports.getAllQuestions = questionDao.getAllQuestions;
module.exports.getTagQuestions = questionDao.getTagQuestions;
module.exports.getQuestion = questionDao.getQuestion;
module.exports.editQuestion = questionDao.editQuestion;
module.exports.deleteQuestion = questionDao.deleteQuestion;
module.exports.addQuestionVote = questionDao.addQuestionVote;
module.exports.userQuestions = questionDao.userQuestions;

module.exports.addAnswer = answerDao.addAnswer;
module.exports.getAnswers = answerDao.getAnswers;
module.exports.editAnswer = answerDao.editAnswer;
module.exports.deleteAnswer = answerDao.deleteAnswer;
module.exports.deleteAnswers = answerDao.deleteAnswers;
module.exports.addAnswerVote = answerDao.addAnswerVote;

module.exports.checkTag = tagDao.checkTag;
module.exports.getTags = tagDao.getTags;
module.exports.createTag = tagDao.createTag;
module.exports.editTag = tagDao.editTag;
module.exports.deleteTag = tagDao.deleteTag;