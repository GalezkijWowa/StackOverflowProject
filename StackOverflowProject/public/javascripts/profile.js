$(document).on("click", ".delete", function () {
    var myQuestionId = $(this).data('id');
    var myAnswerId = $(this).data('answer');
    $(".form-group #answer").val(myAnswerId);
    $(".form-group #questionId").val(myQuestionId);
    $('#deleteQuestionModal').modal('show');
});

$(document).on("click", ".edit", function () {
    var myQuestionId = $(this).data('id');
    var myAnswerId = $(this).data('answer');
    var myTitle = $(this).data('title');
    var myText = $(this).data('text');
    $(".form-group #questionId").val(myQuestionId);
    $(".form-group #answer").val(myAnswerId);
    $(".form-group #title").val(myTitle);
    $(".form-group #text").val(myText);
    $('#editQuestionModal').modal('show');
});