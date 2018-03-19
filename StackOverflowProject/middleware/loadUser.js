var User = require('../models/user');

module.exports = function (req, res, next) {
    res.locals.user = null;
    if (!req.session.user) return next();

    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        res.locals.user = user;
        next();
    });
}