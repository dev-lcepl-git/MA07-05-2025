
// Search on table using search inpute options
function searchTable() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let rows = document.querySelectorAll("table tbody tr");

    rows.forEach(row => {
        let blockName = row.cells[1].textContent.toLowerCase();
        let districtName = row.cells[2].textContent.toLowerCase();
        let villageName = row.cells[3].textContent.toLowerCase();

        if (blockName.includes(input) || districtName.includes(input)|| villageName.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}





// Common Sorting Script for Tables
function sortTable(n, dir) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("sortableTable"); // Ensure your table has this ID
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// Attach sorting functionality to all sortable tables
document.addEventListener("DOMContentLoaded", function() {
    // Find all elements with the class "sortable-header"
    var sortableHeaders = document.querySelectorAll(".sortable-header");

    sortableHeaders.forEach(function(header) {
        // Attach click event for ascending sort
        if (header.querySelector(".sort-asc")) {
            header.querySelector(".sort-asc").addEventListener("click", function() {
                var columnIndex = Array.from(header.parentNode.children).indexOf(header);
                sortTable(columnIndex, "asc");
            });
        }

        // Attach click event for descending sort
        if (header.querySelector(".sort-desc")) {
            header.querySelector(".sort-desc").addEventListener("click", function() {
                var columnIndex = Array.from(header.parentNode.children).indexOf(header);
                sortTable(columnIndex, "desc");
            });
        }
    });
});


// ADD & Dispaly screen show
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const displayButton = document.getElementById("displayButton");
    const addForm = document.getElementById("addForm");
    const addTable = document.getElementById("addTable");

    // Show "Add State" form by default
    addForm.style.display = "block";
    addButton.classList.add("active-button"); // Optional: Add styling for active button

    addButton.addEventListener("click", function () {
        addForm.style.display = "block";
        addTable.style.display = "none";
        addButton.classList.add("active-button");
        displayButton.classList.remove("active-button");
    });

    displayButton.addEventListener("click", function () {
        addForm.style.display = "none";
        addTable.style.display = "block";
        displayButton.classList.add("active-button");
        addButton.classList.remove("active-button");
    });
});