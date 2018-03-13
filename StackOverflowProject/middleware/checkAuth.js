var HttpError = require('../routes/error').HttpError;

//module.exports = function (req, res, next) {
//    if (!req.session.auth) {
//        return next(new HttpError(401, "You are not authorized!"));
//    }
//    next();
//};



module.exports = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/register");
    }
};

