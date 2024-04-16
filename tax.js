document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);

    var selectElems = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selectElems);

    var modalElem = document.querySelectorAll('.modal');
    var modalInstances = M.Modal.init(modalElem);

    document.getElementById('taxForm').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateTax();
    });
});

function calculateTax() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value) || 0;
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const ageGroup = document.getElementById('ageGroup').value;

    const income = grossIncome + extraIncome - deductions;
    let taxDue = 0;

    if (income > 800000) {
        let taxRate = 0;
        switch(ageGroup) {
            case '<40':
                taxRate = 0.3;
                break;
            case '40-59':
                taxRate = 0.4;
                break;
            case '60+':
                taxRate = 0.1;
                break;
            default:
                showError(ageGroup, 'Age group is required');
                return;
        }
        taxDue = (income - 800000) * taxRate;
    }

    displayResult(`Total Taxable Income: ₹${income}, Tax Due: ₹${taxDue.toFixed(2)}`);
}

function showError(field, message) {
    const errorIcon = field.nextElementSibling;
    errorIcon.style.display = 'inline-block';
    errorIcon.setAttribute('data-tooltip', message);
    M.Tooltip.init(errorIcon);
}

function displayResult(message) {
    const modalContent = document.getElementById('modalContent');
    modalContent.textContent = message;
    const instance = M.Modal.getInstance(document.getElementById('resultModal'));
    instance.open();
}
