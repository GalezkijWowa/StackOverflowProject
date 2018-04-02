var User = require('../models/user');
var database = require('../database/index');

module.exports = function (req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user) return next();

    database.getUserById(req.session.user)
        .then(function (user) {
            req.user = res.locals.user = user;
            next();
        });
}