exports.home = function (req, res, next) {

    var date = new Date(Date.now());
    res.render('main/home.hbs', { body: date });
};