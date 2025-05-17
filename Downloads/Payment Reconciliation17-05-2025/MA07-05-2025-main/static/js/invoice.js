// Subcontractor autocomplete functionality
    $(document).ready(function () {
      $("#subcontractor").keyup(function () {
        let query = $(this).val();
        if (query !== "") {
          $.ajax({
            url: "/search_subcontractor",
            method: "POST",
            data: { query: query },
            success: function (data) {
              $("#subcontractor_list").fadeIn().html(data);
            }
          });
        } else {
          $("#subcontractor_list").fadeOut();
        }
      });

      $(document).on("click", "li", function () {
        $("#subcontractor").val($(this).text());
        $("#subcontractor_id").val($(this).attr("data-id"));
        $("#subcontractor_list").fadeOut();
      });
    });

    // Success Alert: show alert and reload after 3 seconds
    function showSuccessAlert() {
      const alertBox = document.getElementById("invoiceSuccessAlert");
      alertBox.classList.add("show");
      setTimeout(() => {
        alertBox.classList.remove("show");
        // Reload page or redirect after alert hides
        window.location.href = '/add_invoice';
      }, 3000);
    }

    // Submit form via AJAX
    $("#invoiceForm").on("submit", function (e) {
      e.preventDefault();
      let formData = $(this).serialize();
      $.ajax({
        url: '/add_invoice',
        method: 'POST',
        data: formData,
        success: function (response) {
          if(response.status === "success") {
            showSuccessAlert();
          } else {
            alert(response.message);
          }
        },
        error: function (xhr, status, error) {
          alert("Submission failed: " + error);
        }
      });
    });



window.onload = function () {
        document.getElementById('subcontractor').focus();
    };