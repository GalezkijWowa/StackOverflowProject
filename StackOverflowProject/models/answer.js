var mongoose = require('mongoose');
Schema = mongoose.Schema;


var Answer = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
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