'use strict';
var express = require('express');
var router = express.Router();
var Question = require('../models/question');
//var database = require('../database/index');
var database = require('../database/questionDao');


router.get('/questions/all', function (req, res) {
    result = database.getAllQuestions();
    result.exec(function (err, questions) {
        res.render('questions/list.hbs', { questions: questions});
    });
});

//router.get('/questions/all', function (req, res) {

//    Question.find({}, function (err, allQuestions) {
//        res.render('questions/list.hbs', { questions: allQuestions });
//    });
//});

router.get('/questions/:id', function (req, res) {
    res.send('questons/question');
});


module.exports = router;