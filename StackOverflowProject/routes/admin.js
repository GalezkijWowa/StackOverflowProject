var express = require('express');
var router = express.Router();
var database = require('../database/index');

router.get('/admin/tags', function (req, res) {
    res.send("Tags managing");
});

module.exports = router;