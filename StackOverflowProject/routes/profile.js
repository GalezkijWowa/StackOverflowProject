'use strict';
var express = require('express');
var router = express.Router();
var database = require('../database/index');
var mongoose = require('mongoose');
var config = require("../config");
mongoose.Promise = global.Promise;


router.get('/profile', function (req, res) {
    Promise.all([
        database.userQuestions(req.user._id),
        database.getAllBadges(req.user._id)
    ]).then(function (results) {
        res.render('profile/index.hbs', { questions: results[0], badges: results[1] });
    });
});

router.post('/profile/addAnswer', function (req, res) {
    var result = database.addAnswer(req.body.questionId, req.user.username, req.user._id, req.body.text);
    result.then(function (answer) {
        res.redirect("/questions/" + req.body.questionId);
    });
});


router.post('/profile/createQuestion', function (req, res) {
    var tags = req.body.tags;
    var result = database.addQuestion(req.user._id, req.user.username, req.body.title, req.body.description);
    result.then(function (question) {
        if (tags == null) { }
        else if (typeof tags == 'string') {
            database.addQuestionTag(question._id, tags);
        }
        else {
            tags.forEach(function (element) {
                database.addQuestionTag(question._id, element);
            });
        }
        res.redirect("/profile");
    });
});

router.get('/profile/createQuestion', function (req, res) {
    var result = database.getTags();
    result.then(function(tags) {
        res.render('profile/createQuestion.hbs', { tags: tags });
    });
});

router.post('/profile/editQuestion', function (req, res) {
    database.editQuestion(req.body.questionId, req.body.title, req.body.description)
        .then(function () {
            res.redirect("/profile");
        });
});

router.post('/profile/editAnswer', function (req, res) {
    database.editAnswer(req.body.answerId, req.body.text)
        .then(function () {
            res.redirect('/questions/' + req.body.questionId);  
        });
});

router.post('/profile/deleteAnswer', function (req, res) {
    database.deleteAnswer(req.body.answerId);
    res.redirect('/questions/' + req.body.questionId);  
});

router.post('/profile/deleteQuestion', function (req, res) {
    console.log(req.body.questionId);
    Promise.all([
        database.deleteQuestion(req.body.questionId),
        database.deleteAnswers(req.body.questionId),
        database.deleteQuestionTags(req.body.questionId),
        database.deleteQuestionVotes(req.body.questionId)
    ]).then(function () {
        res.redirect("/profile");
    });
});

router.post('/profile/vote', function (req, res) {

    var points;
    var reputation;

    if (req.body.votetype == "up") {
        points = 1;
        reputation = 20;
    }
    else if (req.body.votetype == "down") {
        points = -1;
        reputation = -20;
    }
    database.checkQuestionVote(req.body.questionId, req.user._id).then(function (vote) {
        if (!vote) { //!vote
            database.setUserReputation(req.body.author, reputation);
            database.addQuestionVote(req.body.questionId, req.user._id, points);
        }
        res.redirect('/questions/' + req.body.questionId);  
    });
});

router.post('/profile/answervote', function (req, res) {

    var points;
    var reputation;

    if (req.body.votetype == "up") {
        points = config.get("reputation:points");
        reputation = config.get("reputation:rep");
    }
    else if (req.body.votetype == "down") {
        points = -config.get("reputation:points");
        reputation = -config.get("reputation:rep");
    }   
    database.checkAnswerVote(req.body.answerId, req.user._id).then(function (vote) {
        if (!vote) {
            database.setUserReputation(req.body.author, reputation);
            database.addAnswerVote(req.body.answerId, req.user._id, points);
        }
        res.redirect('/questions/' + req.body.questionId);
    });
});

module.exports = router;