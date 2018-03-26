var mongoose = require('mongoose');
Schema = mongoose.Schema;


var Answer = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    text: {
        type: String,
        required: true
    },
    authorname: {
        type: String,
        required: true
    },
    dateofcreating: {
        type: Date,
        default: Date.now
    },
    dateofupdate: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    }
    
});

module.exports = mongoose.model('Answer', Answer);