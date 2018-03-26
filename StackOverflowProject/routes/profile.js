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
    database.addQuestion(req.user._id, req.body.title, req.body.description);
    res.redirect("/profile");
});

router.get('/profile/createQuestion', function (req, res) {
    res.render('profile/createQuestion.hbs');
});

router.post('/profile/editQuestion', function (req, res) {
    database.editQuestion(req.body.questionId, req.body.title, req.body.description);
    res.redirect("/profile");
});

router.get('/profile/editAnswer', function (req, res) {
    res.render('profile/createAnswer.hbs');
});

router.post('/profile/deleteQuestion', function (req, res) {
    //database.deleteQuestion(req.body.questionId);
    //database.deleteAnswer(req.body.questionId);
    res.send(req.body.questionId);
    res.send("DELETED");
    res.redirect('/profile/deleteQuestionAnswers');
});

router.post('/profile/deleteQuestionAnswers', function (req, res) {
    res.send("/profile/deleteQuestionAnswers");
    //var answersDeleteResult = database.deleteAnswer(req.body.questionId);
    //answersDeleteResult.exec();
    //res.redirect('/profile');
});

router.post('/profile/vote', function (req, res) {

    //var v = database.findQuestionVote(req.body.questionId, req.user._id).exec();
    
    //v.exec(function (err, vote) {
    //    if (vote._id == null) {
    //        database.addQuestionVote(req.body.questionId, req.user._id, req.body.points).exec();
    //    }
    //});
    //database.findQuestionVote(req.body.questionId, req.user._id).exec();
    database.addQuestionVote(req.body.questionId, req.user._id, req.body.points);

    res.send("ADDED");
   
});

router.post('/profile/answervote', function (req, res) {
    res.send(req.body.points);
});

module.exports = router;