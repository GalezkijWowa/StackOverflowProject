var HttpError = require('../routes/error').HttpError;

module.exports = function (req, res, next) {
    if ((req.user && req.user.access == true)) {   
        next();
    } else {
        res.redirect("/auth/register");
    }
};

