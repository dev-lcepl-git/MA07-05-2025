function showSuccessAlert(event) {
            event.preventDefault(); // Prevent form submission
            document.getElementById("successPopup").style.display = "block";
            setTimeout(function() {
                document.getElementById("successPopup").style.display = "none";
                event.target.submit(); // Submit the form after showing the message
            }, 2000);
        }