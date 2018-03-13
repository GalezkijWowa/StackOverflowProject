
var express = require('express');
var router = express.Router();

router.get('/auth/register', function (req, res) {
    res.render('authentication/register.hbs');
});

router.get('/auth/login', function (req, res) {
    res.render('authentication/login.hbs');
});

module.exports = router;