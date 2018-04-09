var mongoose = require('mongoose');
Schema = mongoose.Schema;


var VerifyKey = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    key: {
        type: String
    }
});

module.exports = mongoose.model('VerifyKey', VerifyKey);