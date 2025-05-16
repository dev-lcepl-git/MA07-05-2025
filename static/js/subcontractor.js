function validateInput() {
            let isValid = true;

            // Get form elements
            let contractorName = document.getElementById("Contractor_Name").value;
            let mobileNo = document.getElementById("Mobile_No").value;
            let panNo = document.getElementById("PAN_No").value;
            let email = document.getElementById("Email").value;
            let passwordField = document.getElementById("Contractor_password");
            let submitBtn = document.getElementById("submitBtn");

            // Validation patterns
            let mobileRegex = /^[0-9]{10}$/;
            let panRegex = /^[A-Z0-9]{10}$/;
            let emailRegex = /^[a-z]+@[a-z]+\.[a-z]{2,6}$/;

            // Validate Mobile No
            if (!mobileNo.match(mobileRegex)) {
                document.getElementById("mobileError").innerText = "Mobile No must be exactly 10 digits.";
                isValid = false;
            } else {
                document.getElementById("mobileError").innerText = "";
            }

            // Validate PAN No
            if (!panNo.match(panRegex)) {
                document.getElementById("panError").innerText = "PAN No must be uppercase letters or digits (10 chars).";
                isValid = false;
            } else {
                document.getElementById("panError").innerText = "";
            }

            // Validate Email
            if (!email.match(emailRegex)) {
                document.getElementById("emailError").innerText = "Email must be lowercase, contain '@' and '.'";
                isValid = false;
            } else {
                document.getElementById("emailError").innerText = "";
            }



            // Enable or disable the submit button
            submitBtn.disabled = !isValid;
        }

window.onload = function () {
        document.getElementById('Contractor_Name').focus();
    };