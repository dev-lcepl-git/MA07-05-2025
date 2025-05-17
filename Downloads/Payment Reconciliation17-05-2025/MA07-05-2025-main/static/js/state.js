 window.onload = function () {
        document.getElementById('state_Name').focus();
    };


$(document).ready(function () {
        $("#state_Name").on("input", function () {
            let stateName = $(this).val();
            // Remove numbers and special characters automatically
            let cleanedName = stateName.replace(/[^A-Za-z ]/g, "");
            $(this).val(cleanedName);
        });

        $("#state_Name").on("input", function () {
            let stateName = $("#state_Name").val().trim();

            if (stateName === "") {
                $("#stateMessage").text("").css("color", "");
                $("#submitButton").prop("disabled", true);
                return;
            }

            $.ajax({
                url: "/check_state",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ state_Name: stateName }),
                success: function (response) {
                    if (response.status === "available") {
                        $("#stateMessage").text(response.message).css("color", "green");
                        $("#submitButton").prop("disabled", false);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 409) {
                        $("#stateMessage").text("State already exists!").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    } else if (xhr.status === 400) {
                        $("#stateMessage").text("Invalid state name! Only letters are allowed.").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    }
                }
            });
        });

        $("#stateForm").on("submit", function (event) {
            event.preventDefault();
            $.ajax({
                url: "/add_state",
                type: "POST",
                data: $(this).serialize(),
                success: function (response) {
                    alert(response.message);
                    location.reload();
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                }
            });
        });
});