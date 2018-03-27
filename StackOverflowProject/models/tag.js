var mongoose = require('mongoose');
Schema = mongoose.Schema;


var Tag = new Schema({
    tagname: {
        type: String,
        unique: true,
        required: true
    }
});
module.exports = mongoose.model('Tag', Tag);