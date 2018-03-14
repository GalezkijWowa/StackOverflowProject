var HttpError = require('../routes/error').HttpError;

module.exports = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/register");
    }
};

