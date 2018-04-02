
'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var Question = require("../models/question");
var Answer = require("../models/answer");

router.get('/questions/all', function (req, res) {
    var result = database.getAllQuestions(req.user._id);
    result.then(function (questions) {
        res.render('questions/list.hbs', { questions: questions });
    });
});

router.get('/questions/:id', function (req, res) {
    Promise.all([
        database.getQuestion(req.params.id),
        database.getAnswers(req.params.id),
        database.getQuestionTags(req.params.id)
    ]).then(function (results) {
        res.render('questions/question.hbs', { question: results[0], answers: results[1], tags: results[2] });
    })
});

router.get('/questions/tag/:id', function (req, res) {
    var tagsP = database.getQuestionTagsByTagName(req.params.id);
    tagsP.then(function (tags) {
        if (tags.length == 0) {
            res.render('questions/list.hbs', {});
        }
        else {
            var qIds = [];
            tags.forEach()
        }
    });
});

module.exports = router;