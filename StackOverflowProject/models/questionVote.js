var mongoose = require('mongoose');
Schema = mongoose.Schema;


var QuastionVote = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
});
module.exports = mongoose.model('QuetsionVote', QuationVote);