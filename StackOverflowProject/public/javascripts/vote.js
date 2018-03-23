function like() {
    $.ajax({
        url: "http://localhost:1337/profile/like",
        type: "POST",
        data: { like: 'yes' }, //send this to server
        success: function (returned) {
            
        },
        error: function () {

        }
    });
}

function dislike() {
    $.ajax({
        url: "http://localhost:1337/profile/dislike",
        type: "POST",
        data: { dislike: 'yes' }, //send this to server
        success: function (returned) {
            
        },
        error: function () {

        }
    });
    alert("DISLIKED");
}