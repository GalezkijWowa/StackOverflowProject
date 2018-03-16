var crypto = require('crypto');
var mongoose = require('mongoose');
var Question = require('./Question');
Schema = mongoose.Schema;


var Tag = new Schema({
    tagname: {
        type: String,
        unique: true,
        required: true
    },
    questions: [Quastion]
});
module.exports = mongoose.model('Tag', Tag);