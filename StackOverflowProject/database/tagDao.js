var mongoose = require("mongoose");
var Tag = require('../models/tag');
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

var checkTag = function (tagname, fn) {
    Tag.find({ tagname: tagname }, function (err, result) {
        if (result.length == 0) {
            fn(true);
            return true;
        } else {
            fn(false);
            return false;
        }
    });
}

var editTag = function (tagId, tagName) {
    return Tag.update({ _id: tagId }, { tagname: tagName }).exec();
}
var deleteTag = function (tagId) {
    Tag.findByIdAndRemove(id = tagId).exec();
}

module.exports.checkTag = checkTag;
module.exports.getTags = getTags;
module.exports.createTag = createTag;
module.exports.editTag = editTag;
module.exports.deleteTag = deleteTag;