var mongoose = require('mongoose');
Schema = mongoose.Schema;

var AnswerVote = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
});
module.exports = mongoose.model('AnswerVote', AnswerVote);