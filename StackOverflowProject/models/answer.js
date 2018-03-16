var crypto = require('crypto');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var Answer = new Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    }
    
});

module.exports = mongoose.model('Answer', Answer);