$(document).ready(function () {
    $("#hold_type").on("input", function () {
        let holdType = $(this).val().replace(/^\s+/, "");
        $(this).val(holdType);

         let reg = /^[A-Za-z]/;

        if (!reg.test(holdType)) {
            $("#holdTypeMessage").text("Hold Type must start with a letter.").css("color", "red");
            $("#addButton").prop("disabled", true);
            return;
        } else {
            $("#holdTypeMessage").text("").css("color", "");
            $("#addButton").prop("disabled", false);
        }
    });

    $("#holdTypeForm").on("submit", function (event) {
        event.preventDefault();
        $.post("/add_hold_type", $(this).serialize(), function (response) {
            alert(response.message);
            location.reload();
        }).fail(function (xhr) {
            alert(xhr.responseJSON.message);
        });
    });

    $(".delete-button").on("click", function () {
        let id = $(this).data("id");
        if (confirm("Are you sure?")) {
            $.post(`/delete_hold_type/${id}`, function (response) {
                alert(response.message);
                location.reload();
            }).fail(function (xhr) {
                alert(xhr.responseJSON.message);
            });
        }
    });
});
