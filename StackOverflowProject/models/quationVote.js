var crypto = require('crypto');
var mongoose = require('mongoose');
Schema = mongoose.Schema;


var QuastionVote = new Schema({
    author: {
        type: String,
        required: true
    },
    Quastion: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('QuatsionVote', QuationVote);