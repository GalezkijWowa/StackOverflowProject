'use strict';
var express = require('express');
var router = express.Router();

router.get('/questions/all', function (req, res) {
    res.send('questons/list');
});

router.get('/questions/:id', function (req, res) {
    res.send('questons/question');
});


module.exports = router;