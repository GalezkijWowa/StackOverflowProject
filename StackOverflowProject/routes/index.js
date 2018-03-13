//var main = require('./main'),
//    register = require('./register'),
//    users = require('./users'),
//    authentication = require('./authentication'),
//    error = require('./error');

//module.exports = function (app) {
//    app.get('/', main.home);

//    app.post('/register', register.requestRegistration);

//    app.get('/users', authentication.users);
//    app.get('/users/:id', authentication.user);

//    app.get('*', error['404']);
//};


'use strict';
var express = require('express'),
        router = express.Router(),
        profile = require('./profile'),
        questions = require('./questions'),
        main = require('./main'),
        authentication = require('./authentication'),
        error = require('./error');

router.get('/', main.home);
router.get('/auth/*', authentication);
router.get('/questions/*', questions);
router.get('/profile/*', profile);


module.exports = router;