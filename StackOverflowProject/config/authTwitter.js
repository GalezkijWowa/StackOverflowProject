const TwitterStrategy = require('passport-twitter').Strategy;
var config = require('../config');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new TwitterStrategy({
        consumerKey: config.get('oauth:twitter:key'),
        consumerSecret: config.get('oauth:twitter:secret'),
        callbackURL: config.get('oauth:twitter:callback'),
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};