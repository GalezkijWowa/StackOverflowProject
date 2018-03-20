'use strict';
var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var database = require('../database/index');

router.get('/questions/all', function (req, res) {
    result = database.getAllQuestions(req.user._id);
    result.exec(function (err, questions) {
        res.render('questions/list.hbs', { questions: questions});
    });
});

router.get('/questions/:id', function (req, res) {
    result = database.getQuestion(req.params.id);
    result.exec(function (err, question) {
        res.render('questions/question.hbs', { question: question });
    });
});

module.exports = router;