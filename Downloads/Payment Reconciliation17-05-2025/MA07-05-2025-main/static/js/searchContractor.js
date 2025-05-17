$(document).ready(function () {
        function fetchResults() {
            let formData = $('#search-form').serialize();

            $.ajax({
                type: 'POST',
                url: '/search_contractor',
                data: formData,
                success: function (data) {
                    let tableBody = $('#result-table tbody');
                    tableBody.empty();

                    if (data.length === 0) {
                        tableBody.append('<tr><td colspan="6">No data found</td></tr>');
                    } else {
                        data.forEach(function (row) {
                            tableBody.append(`
                                <tr>
                                    <td><a href="/contractor_report/${row.Contractor_Id}" target="_blank">${row.Contractor_Name}</a></td>
                                    <td><a href="/pmc_report/${row.PMC_No}" target="_blank">${row.PMC_No}</a></td>
                                    <td>${row.State_Name}</td>
                                    <td>${row.District_Name}</td>
                                    <td>${row.Block_Name}</td>
                                    <td>${row.Village_Name}</td>
                                </tr>
                            `);
                        });
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.error);
                }
            });
        }

        $('#search-form input').on('keyup change', function () {
            fetchResults();
        });
    });

window.onload = function () {
        document.getElementById('subcontractor_name').focus();
    };