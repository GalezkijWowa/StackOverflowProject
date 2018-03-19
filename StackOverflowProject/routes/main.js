exports.home = function (req, res, next) {
    //req.session.number = req.session.number + 1 || 1;
    
    //res.send('asd');
    res.render('main/home.hbs');
};