var mongoose = require("mongoose");
var Tag = require('../models/tag')
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var getTags = function () {
    return Tag.find({});
}

var createTag = function (text) {
    var tag = new Tag({
        tagname: text
    });
    tag.save(function (err, next) {
        if (err) { next(err) }
    });
}

var editTag = function (tagId, tagName) {
    return Tag.update({ _id: tagId }, { tagname: tagName }).exec();
}
var deleteTag = function (tagId) {
    Tag.findByIdAndRemove(id = tagId).exec();
}

module.exports.getTags = getTags;
module.exports.createTag = createTag;
module.exports.editTag = editTag;
module.exports.deleteTag = deleteTag;