var moment = require('moment');

module.exports = {
    eq: function (v1, v2) {
        if (v1.toString() == v2.toString()) {
            return true;
        }
        else {
            return false;
        }  
    },
    formatDate: function (date, format) {
        var mmnt = moment(date);
        return mmnt.format(format);
    }
}