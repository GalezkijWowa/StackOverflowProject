var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Badge = new Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Badge', Badge);

