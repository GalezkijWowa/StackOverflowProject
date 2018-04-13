const FaceBookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FaceBookStrategy({
        clientID: "165892810784780",
        clientSecret: "d5e61cb1495bf023b46d60e9d93f9705",
        callbackURL: "http://localhost:1337/auth/facebook/callback",
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};