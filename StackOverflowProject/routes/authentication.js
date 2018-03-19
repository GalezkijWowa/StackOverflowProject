var express = require('express');
var router = express.Router();
var User = require('../models/user');
var database = require('../database/index');

router.get('/auth/register', function (req, res) {
    res.render('authentication/register.hbs');
});
router.post('/auth/register', function (req, res) {
    database.addUser(req.body.username, req.body.password, "user");
    //database.addQuestion(req.body._id, "Test title", "test description");
    res.redirect("/");
});

router.get('/auth/login', function (req, res) {
    res.render('authentication/login.hbs');
});

router.post('/auth/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
        if (err) return next(err);
        if (user) {
            if (user.checkPassword(password)) {
                req.session.user = user._id;
                res.redirect("/");
            } else {
                res.send('ERROR');
            }
        } else {
            res.send('User Not found');
        }
    })
});

router.get('/auth/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;