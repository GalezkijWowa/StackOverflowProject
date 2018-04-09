var mongoose = require("mongoose");
var userDao = require('./userDao');
var questionDao = require('./questionDao');
var answerDao = require('./answerDao');
var tagDao = require('./tagDao');
var questionTagDao = require('./questionTagDao');
var keyDao = require('./keyDao');
var badgeDao = require('./badgeDao');

module.exports.getAllBadges = badgeDao.getAllBadges;
module.exports.addBadge = badgeDao.addBadge;
module.exports.checkBadge = badgeDao.checkBadge;

module.exports.addUser = userDao.addUser;
module.exports.getUserByName = userDao.getUserByName;
module.exports.getUserById = userDao.getUserById;
module.exports.setUserReputation = userDao.setUserReputation;
module.exports.openUserAccess = userDao.openUserAccess;
module.exports.getAllUsers = userDao.getAllUsers;

module.exports.getQuestionsByTag = questionDao.getQuestionsByTag; 
module.exports.addQuestion = questionDao.addQuestion;
module.exports.getAllQuestions = questionDao.getAllQuestions;
module.exports.getTagQuestions = questionDao.getTagQuestions;
module.exports.getQuestion = questionDao.getQuestion;
module.exports.editQuestion = questionDao.editQuestion;
module.exports.deleteQuestion = questionDao.deleteQuestion;
module.exports.addQuestionVote = questionDao.addQuestionVote;
module.exports.userQuestions = questionDao.userQuestions;
module.exports.checkQuestionVote = questionDao.checkQuestionVote;
module.exports.deleteQuestionVotes = questionDao.deleteQuestionVotes;
module.exports.getTopQuestions = questionDao.getTopQuestions;

module.exports.getTopAnswers = answerDao.getTopAnswers;
module.exports.addAnswer = answerDao.addAnswer;
module.exports.getAnswers = answerDao.getAnswers;
module.exports.editAnswer = answerDao.editAnswer;
module.exports.deleteAnswer = answerDao.deleteAnswer;
module.exports.deleteAnswers = answerDao.deleteAnswers;
module.exports.addAnswerVote = answerDao.addAnswerVote;
module.exports.checkAnswerVote = answerDao.checkAnswerVote;
module.exports.getUserAnswers = answerDao.getUserAnswers;

module.exports.checkTag = tagDao.checkTag;
module.exports.getTags = tagDao.getTags;
module.exports.createTag = tagDao.createTag;
module.exports.editTag = tagDao.editTag;
module.exports.deleteTag = tagDao.deleteTag;

module.exports.addQuestionTag = questionTagDao.addQuestionTag;
module.exports.deleteQuestionTags = questionTagDao.deleteQuestionTags;
module.exports.deleteQuestionTagsByName = questionTagDao.deleteQuestionTagsByName;
module.exports.getQuestionTags = questionTagDao.getQuestionTags;
module.exports.editQuestionTags = questionTagDao.editQuestionTags;
module.exports.getQuestionTagsByTagName = questionTagDao.getQuestionTagsByTagName;

module.exports.addKey = keyDao.addKey;
module.exports.checkKey = keyDao.checkKey;
module.exports.deleteKey = keyDao.deleteKey;