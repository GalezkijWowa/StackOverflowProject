'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.get('/profile', function (req, res) {
    result = database.userQuestions(req.user._id);
    result.exec(function (err, questions) {
        res.render('profile/index.hbs', { questions: questions });
    });
});

router.post('/profile/addAnswer', function (req, res) {
    database.addAnswer(req.body.questionId, req.user.username ,req.user._id, req.body.text);
    res.redirect("/questions/" + req.body.questionId);
});

router.post('/profile/createQuestion', function (req, res) {
    database.addQuestion(req.user._id, req.body.title, req.body.description, req.body.tags);
    res.redirect("/profile");
});

router.get('/profile/createQuestion', function (req, res) {
    var result = database.getTags();
    result.exec(function (err, tags) {
        res.render('profile/createQuestion.hbs', { tags: tags });
    });
});

router.post('/profile/editQuestion', function (req, res) {
    database.editQuestion(req.body.questionId, req.body.title, req.body.description);
    res.redirect("/profile");
});

router.post('/profile/editAnswer', function (req, res) {
    database.editAnswer(req.body.answerId, req.body.text);
    res.redirect('/questions/' + req.body.questionId);  
});

router.post('/profile/deleteAnswer', function (req, res) {
    database.deleteAnswer(req.body.answerId);
    res.redirect('/questions/' + req.body.questionId);  
});

router.post('/profile/deleteQuestion', function (req, res) {
    database.deleteQuestion(req.body.questionId);
    database.deleteAnswers(req.body.questionId);
    res.redirect("/profile");
});

router.post('/profile/vote', function (req, res) {
    database.addQuestionVote(req.body.questionId, req.user._id, req.body.points);
    res.redirect('/questions/' + req.body.questionId);  
});

router.post('/profile/answervote', function (req, res) {
    database.addAnswerVote(req.body.answerId, req.user._id, req.body.points);
    res.redirect('/questions/' + req.body.questionId);  
});

module.exports = router;