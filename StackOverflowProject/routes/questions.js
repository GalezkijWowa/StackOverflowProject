'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var Question = require("../models/question");
var Answer = require("../models/answer");

router.get('/questions/all', function (req, res) {
    result = database.getAllQuestions(req.user._id);
    result.exec(function (err, questions) {
        res.render('questions/list.hbs', { questions: questions});
    });
});

router.get('/questions/:id', function (req, res) {
    result = database.getQuestion(req.params.id);

    result.exec(function (err, question) { 

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Answer.find({ question: req.params.id }, function (err, db_answers) {
            res.render('questions/question.hbs', { question: question, answers: db_answers });                 //NEED UPDATE
        });
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
});

module.exports = router;