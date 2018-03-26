var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Question = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateofcreation: {
        type: Date,
        default: Date.now
    },
    dateofupdate: {
        type: Date,
        default: Date.now
    },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Question', Question);