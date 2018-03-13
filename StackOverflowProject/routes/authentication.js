
var express = require('express');
var router = express.Router();

router.get('/auth/register', function (req, res) {
    res.send('register');
});

router.get('/auth/login', function (req, res) {
    res.send('login');
});

module.exports = router;