var database = require('../database/index');


var restore = function () {
    database.getAllUsers().then(function (users) {
        users.forEach(function (user) {
            badge1Check(user);
            badge2Check(user);
            badge3Check(user);
        });
    });
}

var badge1Check = function (user) {
    var current = 0;
    const badgeName = "for questions";
    const badgeIcon = "glyphicon glyphicon-pencil";
    const needed = 3;
    const ratingLine = 1;

    database.userQuestions(user._id).then(function (questions) {
        for (let question of questions) {
            if (question.rating >= ratingLine) {
                current++;
            }
            if (current == needed) {
                tryAddBadge(user._id, badgeName, badgeIcon);
                break;
            }
        }
    });
}
var badge2Check = function (user) {

    const badgeName = "for answers";
    const badgeIcon = "glyphicon glyphicon-tag";
    var current = 0;
    const needed = 3;
    const ratingLine = 1;

    database.getUserAnswers(user._id).then(function (answers) {
        for (let answer of answers) {
            if (answer.rating >= ratingLine) {
                current++;
            }
            if (current == needed) {
                tryAddBadge(user._id, badgeName, badgeIcon);
                break;
            }
        }
    });
}
var badge3Check = function (user) {

    const badgeName = "for reputation";
    const badgeIcon = "glyphicon glyphicon-ok";
    const value = 50

    if (user.reputation >= value) {
        tryAddBadge(user._id, badgeName, badgeIcon);
    }
}

var tryAddBadge = function (userId, badgeName, badgeIcon) {
    database.checkBadge(userId, badgeName).then(function (badge) {
        if (!badge) {
            database.addBadge(badgeName, badgeIcon, userId);
        }
    });
}

module.exports = restore;