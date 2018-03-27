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
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Question', Question);