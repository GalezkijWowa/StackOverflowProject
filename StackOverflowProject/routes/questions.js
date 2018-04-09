'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var Question = require("../models/question");
var Answer = require("../models/answer");
var config = require('../config');
var pagination = require('pagination');
var rowsPerPage = 3;

router.get('/questions/all', function (req, res) {
    var result = database.getAllQuestions(req.user._id);
    result.then(function (result) {
        var current = 1;
        var totalCount = Object.keys(result).length;
        var questions = new Array();
        questions = [].concat(result);

        if (req.query.page) {
            current = req.query.page;
        }
        if (req.query.rowsPerPage) {
            rowsPerPage = req.query.rowsPerPage;
        }
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/all', current: current, rowsPerPage: rowsPerPage, totalResult: totalCount });
        var text = new String();
        text = paginator.render();

        //text.replace('<a', '<button id="btn - login" type="submit" class="btn btn - warning"><a', function (s, newString) {
        //    console.log(text);
        //});
        //text.replace('/a>', '/a></button>');

        res.render('questions/list.hbs', { questions: questions.slice((current - 1) * rowsPerPage, current * rowsPerPage), page: text });
    });
});

router.get('/questions/search', function (req, res) {
    database.searchQuestions(req.query.text).then(function (questions) {
        res.render('questions/list', {questions: questions})
    });
});

router.get('/questions/top', function (req, res) {

    const topItems = config.get("rating:topItems");
    Promise.all([
        database.getTopQuestions(topItems),
        database.getTopAnswers(topItems)
    ]).then(function (results) {
        var totalTop = new Array();
        totalTop = results[0].concat(results[1]);
        totalTop.sort(function (a, b) {
            if (a.rating < b.rating) {
                return 1;
            }
            else if (a.rating > b.rating) {
                return -1;
            }
            else {
                return 0;
            }
        });
        totalTop = totalTop.slice(0, topItems);
        console.log(totalTop);
        res.render('questions/top.hbs', {topList: totalTop});
    })
    
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
    database.getQuestionsByTag(req.params.id).then(function (questions) {
        res.render('questions/list.hbs', { questions: questions });
    });
});

module.exports = router;