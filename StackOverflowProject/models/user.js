var crypto = require('crypto');
var mongoose = require('mongoose');
Schema = mongoose.Schema;
async = require('async');

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    reputation: {
        type: Number,
        default: 0
    },
    access: {
        type: Boolean,
        default: false
    }
});

User.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', "A").update(password).digest('hex');
};

User.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', User);