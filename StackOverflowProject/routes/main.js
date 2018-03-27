var database = require('../database/index');

exports.home = function (req, res, next) {
    var result = database.getTags();

    result.exec(function (err, tags) {
        res.render('main/home.hbs', { tags: tags });
    });
};