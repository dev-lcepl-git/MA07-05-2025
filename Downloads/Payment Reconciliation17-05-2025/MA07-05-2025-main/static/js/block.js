window.onload = function () {
        document.getElementById('block_Name').focus();
    };


$(document).ready(function () {
        $("#block_Name").on("input", function () {
            let blockName = $(this).val();
            let cleanedName = blockName.replace(/[^A-Za-z ]/g, "");
            $(this).val(cleanedName);
        });

        $("#block_Name, #district_Id").on("input change", function () {
            let blockName = $("#block_Name").val().trim();
            let districtId = $("#district_Id").val();

            if (blockName === "" || districtId === "") {
                $("#blockMessage").text("").css("color", "");
                $("#submitButton").prop("disabled", true);
                return;
            }

            $.ajax({
                url: "/check_block",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ block_Name: blockName, district_Id: districtId }),
                success: function (response) {
                    if (response.status === "available") {
                        $("#blockMessage").text(response.message).css("color", "green");
                        $("#submitButton").prop("disabled", false);
                    }
                },
                error: function (xhr) {
                    if (xhr.status === 409) {
                        $("#blockMessage").text("Block already exists!").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    } else if (xhr.status === 400) {
                        $("#blockMessage").text("Invalid block name! Only letters are allowed.").css("color", "red");
                        $("#submitButton").prop("disabled", true);
                    }
                }
            });
        });

        $("#blockForm").on("submit", function (event) {
            event.preventDefault();
            $.ajax({
                url: "/add_block",
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

        $('#state_Id').change(function() {
            var stateId = $(this).val();
            if (stateId) {
                $.ajax({
                    url: '/get_districts/' + stateId,
                    type: 'GET',
                    success: function(data) {
                        var districtDropdown = $('#district_Id');
                        districtDropdown.empty();
                        districtDropdown.append('<option value="" disabled selected>Select District</option>');

                        data.districts.forEach(function(district) {
                            districtDropdown.append('<option value="' + district.District_id + '">' + district.District_Name + '</option>');
                        });

                        districtDropdown.prop('disabled', false);
                    },
                    error: function() {
                        alert('Error fetching districts. Please try again.');
                    }
                });
            } else {
                $('#district_Id').prop('disabled', true);
            }
        });
    });