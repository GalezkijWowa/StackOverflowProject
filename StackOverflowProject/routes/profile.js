'use strict';
var express = require('express');
var router = express.Router();

router.get('/profile', function (req, res) {
    res.render('profile/index.hbs');
});

router.get('/profile/createQuestion', function (req, res) {
    res.render('profile/createQuestion.hbs');
});

router.get('/profile/editQuestion', function (req, res) {
    res.render('profile/editQuestion.hbs');
});

router.get('/profile/editAnswer', function (req, res) {
    res.render('profile/createAnswer.hbs');
});

module.exports = router;