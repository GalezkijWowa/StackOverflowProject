const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: "153149747689-g9t67i40almj4t62oai98fsmcqujllee.apps.googleusercontent.com",
        clientSecret: "X5G5vo6DNbjxaBpZvyER4QcK",
        callbackURL: "http://localhost:1337/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};