    $("#updateHoldTypeForm").on("submit", function(event) {
        event.preventDefault();
        let holdTypeId = $("#hold_type_id").val();
        let newHoldType = $("#edit_hold_type").val().trim();
        let reg = /^[A-Za-z]/;

        if (!reg.test(newHoldType)) {
            alert("Hold Type must start with a letter.");
            return;
        }

        $.post(`/update_hold_type/${holdTypeId}`, { hold_type: newHoldType }, function(response) {
            alert(response.message);
            window.location.href = "/";
        }).fail(function(xhr) {
            alert(xhr.responseJSON.message);
        });
    });