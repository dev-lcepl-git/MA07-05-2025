
window.onload = function () {
        document.getElementById('Village_Name').focus();
    };

$(document).ready(function () {
        $('#state_Id').change(function () {
            var stateId = $(this).val();
            if (stateId) {
                $.ajax({
                    url: '/get_districts/' + stateId,
                    type: 'GET',
                    success: function (data) {
                        var districtDropdown = $('#district_Id');
                        districtDropdown.empty().append('<option value="" disabled selected>Select District</option>');
                        data.districts.forEach(function (district) {
                            districtDropdown.append('<option value="' + district.District_id + '">' + district.District_Name + '</option>');
                        });
                        districtDropdown.prop('disabled', false);
                    }
                });
            }
        });

        $('#district_Id').change(function () {
            var districtId = $(this).val();
            if (districtId) {
                $.ajax({
                    url: '/get_blocks/' + districtId,
                    type: 'GET',
                    success: function (data) {
                        var blockDropdown = $('#block_Id');
                        blockDropdown.empty().append('<option value="" disabled selected>Select Block</option>');
                        data.blocks.forEach(function (block) {
                            blockDropdown.append('<option value="' + block.Block_Id + '">' + block.Block_Name + '</option>');
                        });
                        blockDropdown.prop('disabled', false);
                    }
                });
            }
        });

        $('#Village_Name').on('input', function () {
            var villageName = $(this).val();
            var validPattern = /^[A-Za-z ]*$/;

            if (!validPattern.test(villageName)) {
                $('#villageMessage').text('Only letters and spaces are allowed!').css('color', 'red');
                $('#submitVillage').prop('disabled', true);
            } else {
                $('#villageMessage').text('');
                $('#submitVillage').prop('disabled', false);
            }
        });

        $('#Village_Name, #block_Id').on('change keyup', function () {
            var blockId = $('#block_Id').val();
            var villageName = $('#Village_Name').val().trim();

            if (blockId && villageName) {
                $.ajax({
                    url: '/check_village',
                    type: 'POST',
                    data: { block_Id: blockId, Village_Name: villageName },
                    success: function (response) {
                        if (response.status === 'exists') {
                            $('#villageMessage').text(response.message).css('color', 'red');
                            $('#submitVillage').prop('disabled', true);
                        } else {
                            $('#villageMessage').text(response.message).css('color', 'green');
                            $('#submitVillage').prop('disabled', false);
                        }
                    },
                    error: function () {
                        $('#villageMessage').text('Error checking village name').css('color', 'red');
                        $('#submitVillage').prop('disabled', true);
                    }
                });
            }
        });

        $('#villageForm').submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            $.ajax({
                url: '/add_village',
                type: 'POST',
                data: $(this).serialize(),
                success: function (response) {
                    if (response.status === 'success') {
                        alert('Village added successfully!');
                        location.reload(); // Refresh the page to show the updated list
                    } else {
                        alert('Error adding village. Please try again.');
                    }
                },
                error: function () {
                    alert('An error occurred. Please try again.');
                }
            });
        });
    });