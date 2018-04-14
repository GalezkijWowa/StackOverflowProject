var express = require('express');
var router = express.Router();
var User = require('../models/user');
var database = require('../database/index');
var nodemailer = require('nodemailer');
var emailSender = require('../utils/emailSender');
var passport = require('passport');
var config = require('../config');
var smsSender = require('../utils/smsSender');
var mySexyCode;

router.post('/auth/verifyPhone', function (req, res) {
    if (req.body.code == req.session.code) {
        req.session.user = req.body.userId;
        res.redirect('/');
    } else {
        res.render('authentication/verifyPhone.hbs', { userId: req.body.userId });
    }
});

router.get('/auth/register', function (req, res) {
    res.render('authentication/register.hbs');
});

router.post('/auth/register', function (req, res) {
    if (req.body.password == req.body.confirmpassword) {
        database.addUser(req.body.username, req.body.password, req.body.phoneNumber, req.body.email, "user", req.body.access).then(function(user) {
            if (req.body.access == "false") {
                emailSender.sendMessage(req.body.email, req.get('host'), user._id);
            } else {
                req.session.user = user._id;
            }
            res.redirect("/");
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
                req.session.code = smsSender.sendSms(user.phonenumber); //user.phonenumber
                res.render('authentication/verifyPhone.hbs', {userId: user._id});
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
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
        database.getUserByEmail(req.user.profile.emails[0].value, req.user.profile.displayName).then(function (user) {
            if (user) {
                req.session.user = user._id;
                res.redirect("/");
            } else {
                res.render("authentication/oauthPassword.hbs", { username: req.user.profile.displayName, email: req.user.profile.emails[0].value });
            }
        });
    });

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
        var name = req.user.profile.name.familyName + " " + req.user.profile.name.givenName;
        var email = req.user.profile.emails[0].value;
        database.getUserByEmail(email, name).then(function (user) {
            if (user) {
                req.session.user = user._id;
                res.redirect("/");
            } else {
                res.render("authentication/oauthPassword.hbs", { username: name, email: email });
            }
        });
    });


router.get('/auth/twitter', passport.authenticate('twitter', {
    scope: ['profile',
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        'email'
    ]
}));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }), function (req, res) {
        database.getUserByEmail(req.user.profile.emails[0].value, req.user.profile.displayName).then(function (user) {
            if (user) {
                req.session.user = user._id;
                res.redirect("/");
            } else {
                res.render("authentication/oauthPassword.hbs", { username: req.user.profile.displayName, email: req.user.profile.emails[0].value });
            }
        });
    });
module.exports = router;