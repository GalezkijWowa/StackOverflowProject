var check = require('../middleware/checkAuth');
var checkAdmin = require('../middleware/checkAdmin');

'use strict';
var express = require('express'),
    router = express.Router(),
    profile = require('./profile'),
    questions = require('./questions'),
    main = require('./main'),
    authentication = require('./authentication'),
    error = require('./error'),
    admin = require('./admin');

router.get('/',  main.home);
router.get('/auth/*', authentication);
router.post('/auth/*', authentication);

router.get('/questions/*', check, questions);
router.get('/profile', check, profile);
router.get('/profile/*', check, profile);
router.post('/profile/*', check, profile);

router.get('/admin/*', checkAdmin, admin);

module.exports = router;