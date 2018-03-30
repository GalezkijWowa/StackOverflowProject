var express = require('express');
var router = express.Router();
var database = require('../database/index');

router.get('/admin/tags', function (req, res) {
    var result = database.getTags();

    result.exec(function (err, tags) {
        res.render('admin/tagList.hbs', { tags: tags });
    });
});

router.post('/admin/createTag', function (req, res) {
    database.checkTag(req.body.tagName, function (result) {
        if (result) {
            database.createTag(req.body.tagName);
        }
        res.redirect('/admin/tags');
    });
});


router.post('/admin/editTag', function (req, res) {   
    database.checkTag(req.body.tagName, function (result) {
        console.log(result);
        if (result) {
            database.editTag(req.body.tagId, req.body.tagName);
            database.editQuestionTags(req.body.oldTag, req.body.tagName);
        }
        res.redirect('/admin/tags');
    });

});

router.post('/admin/deleteTag', function (req, res) {
    database.deleteQuestionTags(req.body.oldTag, function (result) {

    });
    //database.deleteTag(req.body.tagId);
    res.redirect('/admin/tags');
});

module.exports = router;