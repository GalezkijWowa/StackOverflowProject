var mongoose = require("mongoose");
var Tag = require('../models/tag');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var getTags = function () {
    return Tag.find({}).exec();
}

var createTag = function (text) {
    var tag = new Tag({
        tagname: text
    });
    return tag.save();
}

var checkTag = function (tagname) {
    return Tag.findOne({ tagname: tagname });
}

var editTag = function (tagId, tagName) {
    return Tag.update({ _id: tagId }, { tagname: tagName }).exec();
}
var deleteTag = function (tagId) {
    return Tag.findByIdAndRemove(id = tagId).exec();
}

module.exports.checkTag = checkTag;
module.exports.getTags = getTags;
module.exports.createTag = createTag;
module.exports.editTag = editTag;
module.exports.deleteTag = deleteTag;