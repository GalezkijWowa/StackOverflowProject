var crypto = require('crypto');
var mongoose = require('mongoose');
var Tag = require('./tag');
var Answer = require('./answer');
Schema = mongoose.Schema;

var Quastion = new Schema({
    author: {
        type: String,
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
    date: {
        type: Date,
        default: Date.now
    },
    answers: [Answer],
    tags: [Tag],
    rating: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Quastion', Quastion);