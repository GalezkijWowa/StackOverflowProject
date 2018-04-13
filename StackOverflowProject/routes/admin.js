var express = require('express');
var router = express.Router();
var database = require('../database/index');

router.get('/admin/tags', function (req, res) {
    var result = database.getTags();

    result.then(function(tags) {
        res.render('admin/tagList.hbs', { tags: tags });
    });
});

router.post('/admin/createTag', function (req, res) {
    database.checkTag(req.body.tagName).then(function (tag) {
        if (!tag) {
            database.createTag(req.body.tagName).then();
        }
        res.redirect('/admin/tags');
    });
});

router.post('/admin/editTag', function (req, res) {   
    database.checkTag(req.body.tagName).then(function (tag) {
        if (!tag) {
            Promise.all([
                database.editTag(req.body.tagId, req.body.tagName),
                database.editQuestionTags(req.body.oldTag, req.body.tagName)
            ]).then();
        }
        res.redirect('/admin/tags');
    });

});

router.post('/admin/deleteTag', function (req, res) {
    database.deleteQuestionTagsByName(req.body.oldTag).then(function () {
        res.redirect('/admin/tags');
    });
    database.deleteTag(req.body.tagId);
});

module.exports = router;