document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('saveForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent normal form submission

        const formData = new FormData(form);

        fetch('/save_data', {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: data.success,
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }).then(() => {
                 const redirectUrl = "{{ url_for('upload_excel_file') }}"; // Redirect after success pop
                });
            } else if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: data.error,
                });
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An unexpected error occurred.',
            });
            console.error('Error:', error);
        });
    });
});