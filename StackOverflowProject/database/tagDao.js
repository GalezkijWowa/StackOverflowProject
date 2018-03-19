var mongoose = require("mongoose");
var Tag = require('../models/tag')
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var getTags = function (questionId) { }
var addTag = function () { }
var editTag = function (tagId) { }
var deleteTag = function (tagId) { }


module.exports.getTags = getTags;
module.exports.addTag = addTag;
module.exports.edtiTag = editTag;
module.exports.deleteTag = deleteTag;