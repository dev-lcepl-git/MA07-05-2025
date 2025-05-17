function validateFileInput() {
            const fileInput = document.querySelector('input[type="file"]');
            const filePath = fileInput.value;
            const allowedExtensions = /(\.xlsx|\.xls)$/i;

            if (!allowedExtensions.exec(filePath)) {
                alert("Please upload a valid Excel file (.xlsx or .xls only).");
                fileInput.value = '';
                return false;
            }
            return true;
        }