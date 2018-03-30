var mongoose = require('mongoose');
Schema = mongoose.Schema;


var QuestionTag = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    tagname: {
        type: String
    }
});
module.exports = mongoose.model('QuestionTag', QuestionTag);