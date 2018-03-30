'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var Question = require("../models/question");
var Answer = require("../models/answer");

router.get('/questions/all', function (req, res) {
    result = database.getAllQuestions(req.user._id);
    result.exec(function (err, questions) {
        res.render('questions/list.hbs', { questions: questions });
    });
});

router.get('/questions/:id', function (req, res) {
    database.getQuestion(req.params.id, function (question) {
        database.getAnswers(req.params.id, function (answers) {
            database.getQuestionTags(req.params.id, function (tags) {
                res.render('questions/question.hbs', { question: question, answers: answers, tags:tags });
            })
        })
    });
});

router.get('/questions/tag/:id', function (req, res) {
    database.getQuestionsByTag(req.params.id, function (questions) {
        res.render('questions/list.hbs', { questions: questions });
    });
});

module.exports = router;