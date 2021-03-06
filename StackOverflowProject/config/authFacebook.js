﻿const FaceBookStrategy = require('passport-facebook').Strategy;
var config = require('../config');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FaceBookStrategy({
        clientID: config.get('oauth:facebook:key'),
        clientSecret: config.get('oauth:facebook:secret'),
        callbackURL: config.get('oauth:facebook:callback'),
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};