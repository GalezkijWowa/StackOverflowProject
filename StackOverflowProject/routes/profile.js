'use strict';
var express = require('express');
var router = express.Router();

router.get('/profile/createQuestion', function (req, res) {
    res.send('CREATE QUSTION');
});

router.get('/profile/editQuestion', function (req, res) {
    res.send('EDIT QUESTION');
});

router.get('/profile/editAnswer', function (req, res) {
    res.send('EDIT ANSWER');
});

module.exports = router;