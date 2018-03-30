$(document).on("click", ".delete", function () {
    var myTagId = $(this).data('id');
    var myOldTag = $(this).data('old');

    $(".form-group #oldtag").val(myOldTag);
    $(".form-group #tag").val(myTagId);
    $('#deleteTagModal').modal('show');
});

$(document).on("click", ".edit", function () {
    var myTagId = $(this).data('id');
    var myOldTag = $(this).data('old');

    $(".form-group #oldtag").val(myOldTag);
    $(".form-group #tag").val(myTagId);
    $('#editTagModal').modal('show');
});