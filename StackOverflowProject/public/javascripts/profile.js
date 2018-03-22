$(document).on("click", ".delete", function () {
    var myQuestionId = $(this).data('id');
    $(".form-group #questionId").val(myQuestionId);
    $('#deleteQuestionModal').modal('show');
});

$(document).on("click", ".edit", function () {
    var myQuestionId = $(this).data('id');
    $(".form-group #questionId").val(myQuestionId);
    $('#editQuestionModal').modal('show');
});