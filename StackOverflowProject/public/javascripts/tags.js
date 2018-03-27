$(document).on("click", ".delete", function () {
    var myTagId = $(this).data('id');
    $(".form-group #tag").val(myTagId);
    $('#deleteTagModal').modal('show');
});

$(document).on("click", ".edit", function () {
    var myTagId = $(this).data('id');
    $(".form-group #tag").val(myTagId);
    $('#editTagModal').modal('show');
});