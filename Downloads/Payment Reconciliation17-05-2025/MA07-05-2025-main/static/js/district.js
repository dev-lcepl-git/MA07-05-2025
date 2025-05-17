     window.onload = function () {
        document.getElementById('district_Name').focus();
    };


    $(document).ready(function () {
        $("#district_Name").on("input", function () {
            let districtName = $(this).val();
            // Remove numbers and special characters automatically
            let cleanedName = districtName.replace(/[^A-Za-z ]/g, "");
            $(this).val(cleanedName);
        });

        $("#district_Name, #state_Id").on("input change", function () {
            let districtName = $("#district_Name").val().trim();
            let stateId = $("#state_Id").val();

            if (districtName === "" || stateId === "") {
                $("#districtMessage").text("").css("color", "");
                $("#submitButton").prop("disabled", true);
                return;
            }

            $.ajax({
                url: "/check_district",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ district_Name: districtName, state_Id: stateId }),
                success: function (response) {
                    if (response.status === "available") {
                        $("#districtMessage").text(response.message).css("color", "green");
                        $("#submitButton").prop("disabled", false);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 409) {
                        $("#districtMessage").text("District already exists!").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    } else if (xhr.status === 400) {
                        $("#districtMessage").text("Invalid district name! Only letters are allowed.").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    }
                }
            });
        });

        $("#districtForm").on("submit", function (event) {
            event.preventDefault();
            $.ajax({
                url: "/add_district",
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