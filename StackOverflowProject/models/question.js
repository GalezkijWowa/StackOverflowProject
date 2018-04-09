var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Question = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorname: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
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