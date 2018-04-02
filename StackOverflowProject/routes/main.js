var database = require('../database/index');

exports.home = function (req, res, next) {
    var result = database.getTags();

    result.then(function (tags) {
        res.render('main/home.hbs', { tags: tags });
    });
};