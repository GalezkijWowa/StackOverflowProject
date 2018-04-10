var HttpError = require('../routes/error').HttpError;

module.exports = function (req, res, next) {
    //(req.user && req.user.access == true) || (req.user.token)
    if (true) {   
        console.log(req.session.token);
        console.log("bla-bla");
        next();
    } else {
        res.redirect("/auth/register");
    }
};

