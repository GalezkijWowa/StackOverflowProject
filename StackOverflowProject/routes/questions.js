'use strict';
var express = require('express');
var router = express.Router();

router.get('/questions/all', function (req, res) {
    res.send('All questions');
});

router.get('/questions/:id', function (req, res) {
    res.send('Direct question');
});


module.exports = router;