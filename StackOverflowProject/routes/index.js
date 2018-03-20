var check = require('../middleware/checkAuth')

'use strict';
var express = require('express'),
        router = express.Router(),
        profile = require('./profile'),
        questions = require('./questions'),
        main = require('./main'),
        authentication = require('./authentication'),
        error = require('./error');

router.get('/',  main.home);
router.get('/auth/*', authentication);
router.post('/auth/*', authentication);

router.get('/questions/*', check, questions);
router.get('/profile', check, profile);
router.get('/profile/*', check, profile);
router.post('/profile/*', check, profile);


module.exports = router;