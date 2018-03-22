﻿'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');

router.get('/profile', function (req, res) {
    result = database.userQuestions(req.user._id);
    result.exec(function (err, questions) {
        res.render('profile/index.hbs', { questions: questions });
    });
});

router.post('/profile/addAnswer', function (req, res) {
    database.addAnswer(req.body.questionId, req.user._id, req.body.text);
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
    res.send("EDIT QUESTION" + req.body.questionId);
    //res.render('profile/editQuestion.hbs');
});

router.get('/profile/editAnswer', function (req, res) {
    res.render('profile/createAnswer.hbs');
});

router.post('/profile/deleteQuestion', function (req, res) {
    var result = database.deleteQuestion(req.body.questionId);
    result.exec();
    res.redirect('/profile');
});

module.exports = router;