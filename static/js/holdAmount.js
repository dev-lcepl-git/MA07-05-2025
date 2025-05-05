$(document).ready(function () {
  let holdCount = 0;
  let holdTypes = [];

  // Function to load hold types from the server
  function loadHoldTypes() {
    $.ajax({
      url: '/get_hold_types',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        holdTypes = data; // Expects data like [{hold_type_id: 1, hold_type: "Retention"}, ...]
      },
      error: function (err) {
        console.error('Failed to load hold types', err);
      }
    });
  }

  // Load hold types on page load
  loadHoldTypes();

  // Function to generate options HTML from holdTypes array
  function generateOptions() {
    let options = '<option value="">Select Hold Type</option>';
    holdTypes.forEach(function (type) {
      options += `<option value="${type.hold_type}">${type.hold_type}</option>`;
    });
    return options;
  }

  // Dynamically add Hold Amount fields with dropdown populated from holdTypes
  $("#add_hold_amount").click(function () {
    holdCount++;
    $("#hold_amount_container").append(`
      <div class="hold-amount-field" id="hold_${holdCount}">
        <select name="hold_type[]" required>
          ${generateOptions()}
        </select>
        <input type="number" step="0.01" name="hold_amount[]" placeholder="Hold Amount" required>
        <button type="button" class="remove-hold" data-id="hold_${holdCount}">X</button>
      </div>
    `);
  });

  // Remove Hold Amount field
  $(document).on("click", ".remove-hold", function () {
    let id = $(this).attr("data-id");
    $("#" + id).remove();
  });
});

