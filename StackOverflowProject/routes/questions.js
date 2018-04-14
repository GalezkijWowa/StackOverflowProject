'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var Question = require("../models/question");
var Answer = require("../models/answer");
var config = require('../config');
var pagination = require('pagination');
var searcher = require('../utils/search/questionSearcher');

var rowsPerPage = 3;
var bTitle = -1;
var bDate = -1;
var bUpdate = -1;
var bRating = -1;

router.get('/questions/all', function (req, res) {
    var current = 1;
    var rowsPerPage = 3;
    if (req.query.page) {
        current = req.query.page;
    }
    if (req.query.rowsPerPage) {
        rowsPerPage = req.query.rowsPerPage;
    }

    Promise.all([
        database.getQuestionsRange((current - 1) * rowsPerPage, current * rowsPerPage),
        database.getQuestionsSize()
    ]).then(function (results) {
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/all', current: current, rowsPerPage: rowsPerPage, totalResult: results[1] });
        var text = new String();
        text = paginator.render();
        res.render('questions/list.hbs', { questions: results[0], page: text });
    })
});

router.get('/questions/date', function (req, res) {
    var current = 1;
    if (req.query.page) {
        current = req.query.page;
    }
    if (req.query.rowsPerPage) {
        rowsPerPage = req.query.rowsPerPage;
    }

    Promise.all([
        database.getQuestionsByLastUpdate((current - 1) * rowsPerPage, current * rowsPerPage, bDate),
        database.getQuestionsSize()
    ]).then(function (results) {
        bDate = - bDate;
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/update', current: current, rowsPerPage: rowsPerPage, totalResult: results[1] });
        var text = new String();
        text = paginator.render();
        res.render('questions/list.hbs', { questions: results[0], page: text });
    })
});

router.get('/questions/title', function (req, res) {
    var current = 1;
    if (req.query.page) {
        current = req.query.page;
    }
    if (req.query.rowsPerPage) {
        rowsPerPage = req.query.rowsPerPage;
    }

    Promise.all([
        database.getQuestionsByTitle((current - 1) * rowsPerPage, current * rowsPerPage, bTitle),
        database.getQuestionsSize()
    ]).then(function (results) {
        bTitle = -bTitle;
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/title', current: current, rowsPerPage: rowsPerPage, totalResult: results[1] });
        var text = new String();
        text = paginator.render();
        res.render('questions/list.hbs', { questions: results[0], page: text });
    })
});

router.get('/questions/update', function (req, res) {
    var current = 1;
    if (req.query.page) {
        current = req.query.page;
    }
    if (req.query.rowsPerPage) {
        rowsPerPage = req.query.rowsPerPage;
    }

    Promise.all([
        database.getQuestionsByLastUpdate((current - 1) * rowsPerPage, current * rowsPerPage, bUpdate),
        database.getQuestionsSize()
    ]).then(function (results) {
        bUpdate = - bUpdate;
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/update', current: current, rowsPerPage: rowsPerPage, totalResult: results[1] });
        var text = new String();
        text = paginator.render();
        res.render('questions/list.hbs', { questions: results[0], page: text });
    })
});

router.get('/questions/rating', function (req, res) {
    var current = 1;
    if (req.query.page) {
        current = req.query.page;
    }
    if (req.query.rowsPerPage) {
        rowsPerPage = req.query.rowsPerPage;
    }

    Promise.all([
        database.getTopQuestions((current - 1) * rowsPerPage, current * rowsPerPage, bRating),
        database.getQuestionsSize()
    ]).then(function (results) {
        bRating = -bRating;
        var paginator = new pagination.SearchPaginator({ prelink: '/questions/rating', current: current, rowsPerPage: rowsPerPage, totalResult: results[1] });
        var text = new String();
        text = paginator.render();
        res.render('questions/list.hbs', { questions: results[0], page: text });
    })
});

router.get('/questions/search', function (req, res) {
    searcher.search(req.query.text).then(function (body) {
        var questions = body.hits.hits.map(function(element) {
            return {
                _id: element._id,
                title: element._source.title,
                description: element._source.description,
                author: element._source.author,
                authorname: element._source.authorname,
                dateofcreation: element._source.dateofcreation,
                dateofupdate: element._source.dateofupdate,
                rating: element._source.rating
            };
        });
        res.render('questions/list', { questions: questions })
    }).catch(function (err) {
        res.redirect('/');
    });
});

router.get('/questions/top', function (req, res) {
    const topItems = config.get("rating:topItems");
    Promise.all([
        database.getTopQuestions(0, topItems, -1),
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