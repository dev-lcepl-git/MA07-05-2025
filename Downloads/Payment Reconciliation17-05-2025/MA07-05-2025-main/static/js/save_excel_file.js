$("#saveForm").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/save_data",
            type: "POST",
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    alert("Success: " + response.success);  // Show success alert
                    window.location.href = "/upload_excel_file";  // Redirect to the upload page
                }
            },
            error: function (xhr) {
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    alert("Error: " + xhr.responseJSON.error);
                } else {
                    alert("An unexpected error occurred. Please try again.");
                }
            }
        });
    });