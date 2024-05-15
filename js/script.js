// This file is intentionally left blank.
// Add your custom JavaScript code here.
let incomeInputs = Array.from(document.querySelectorAll('input[id$="-income"]'));
let expenseInputs = Array.from(document.querySelectorAll('input[id$="-expense"]'));

let incomeArray = incomeInputs.map(input => input.value);
let expenseArray = expenseInputs.map(input => input.value);

var ctx = document.getElementById('incomeExpenseChart').getContext('2d');
var incomeExpenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Income',
            data: incomeArray, // Add your income data here
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Expense',
            data: expenseArray, // Add your expense data here
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Get references to the chart's datasets
let incomeDataset = incomeExpenseChart.data.datasets.find(dataset => dataset.label === 'Income');
let expenseDataset = incomeExpenseChart.data.datasets.find(dataset => dataset.label === 'Expense');

// Function to update the chart
function updateChart() {
    incomeArray = incomeInputs.map(input => input.value);
    expenseArray = expenseInputs.map(input => input.value);

    incomeDataset.data = incomeArray;
    expenseDataset.data = expenseArray;

    incomeExpenseChart.update();
}

// Add event listeners to the input fields
// incomeInputs.forEach(input => input.addEventListener('input', updateChart));
// expenseInputs.forEach(input => input.addEventListener('input', updateChart));

document.querySelector('a[href="#chart"]').addEventListener('click', function() {
    updateChart();
});

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportChartDataToCSV(filename) {
    var csv = [];
    var datasets = incomeExpenseChart.data.datasets;
    var labels = incomeExpenseChart.data.labels; // Assuming labels are the months
    
    // Add the header row
    var headerRow = ['Month'].concat(datasets.map(dataset => dataset.label));
    csv.push(headerRow.join(","));
    
    // Add the data rows
    for (var i = 0; i < labels.length; i++) {
        var row = [labels[i]];
        for (var j = 0; j < datasets.length; j++) {
            row.push(datasets[j].data[i]);
        }
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

document.querySelector('#downloadChart').addEventListener('click', function() {
    exportChartDataToCSV('chart_data.csv');
});

document.querySelector('#saveImage').addEventListener('click', function() {
    incomeExpenseChart.canvas.toBlob(function(blob) {
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chart.png';
        link.click();
    });
});

document.querySelector('#goToDataTab').addEventListener('click', function() {
    var dataTab = document.querySelector('#data');
    var chartTab = document.querySelector('#chart');
    dataTab.classList.add('active', 'show');
    chartTab.classList.remove('active', 'show');
    var dataNav = document.querySelector('#data-nav');
    var chartNav = document.querySelector('#chart-nav');
    dataNav.classList.add('active');
    chartNav.classList.remove('active');
});