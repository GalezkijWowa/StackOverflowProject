const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: config.get('oauth:google:key'),
        clientSecret: config.get('oauth:google:secret'),
        callbackURL: config.get('oauth:google:callback')
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};