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
    eq2: function (v1, v2, v3, v4) {
        if (v1.toString() == v2.toString() || v3.toString() == v4.toString()) {
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