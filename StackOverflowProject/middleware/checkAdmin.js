var HttpError = require('../routes/error').HttpError;

module.exports = function (req, res, next) {
    if (req.user.role == "admin") {
        next();
    } else {
        res.redirect("/");
    }
};