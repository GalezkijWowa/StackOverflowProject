var express = require('express');
var router = express.Router();
var User = require('../models/user');
var database = require('../database/index');
var nodemailer = require('nodemailer');
var emailSender = require('../utils/emailSender');
var passport = require('passport');


router.get('/auth/register', function (req, res) {
    res.render('authentication/register.hbs');
});
router.post('/auth/register', function (req, res) {
    if (req.body.password == req.body.confirmpassword) {
        database.addUser(req.body.username, req.body.password, req.body.email, "user").then(function (user) {
            emailSender.sendMessage(req.body.email, req.get('host'), user._id);
            res.redirect("/auth/login");
        });
    }
    else {
        res.redirect("/auth/register");
    }
});

router.get('/auth/verify/:id', function (req, res) {
    emailSender.verifyUser(req.params.id);
    res.redirect('/auth/login');
});

router.get('/auth/login', function (req, res) {
    res.render('authentication/login.hbs');
});

router.post('/auth/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    database.getUserByName(username).then(function (user) {
        if (user) {
            if (user.checkPassword(password) && user.access) {
                req.session.user = user._id;
                res.redirect("/");
            } else {
                res.send('ERROR! Incorrect password or no email confirmation');
            }
        } else {
            res.send('User Not found');
        }
    });
});

router.get('/auth/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        req.session.token = req.user.token
        res.redirect('/');
    }
);

module.exports = router;