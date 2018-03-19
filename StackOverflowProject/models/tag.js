var mongoose = require('mongoose');
Schema = mongoose.Schema;


var Tag = new Schema({
    tagname: {
        type: String,
        unique: true,
        required: true
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});
module.exports = mongoose.model('Tag', Tag);