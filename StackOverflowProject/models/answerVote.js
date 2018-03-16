var crypto = require('crypto');
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var AnswerVote = new Schema({
    author: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('AnswerVote', AnswerVote);