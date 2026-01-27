function calculateCommission() {
    var amount = parseFloat(document.getElementById('amount').value);
    var commissionRate = parseFloat(document.getElementById('commission').value);

    if (isNaN(amount) || isNaN(commissionRate)) {
        document.getElementById('result').innerText = "Por favor, ingresa valores válidos.";
        return;
    }

    var commission = amount * (commissionRate / 100);
    var total = amount + commission;

    document.getElementById('result').innerText = "La comisión es: " + commission.toFixed(2) + ", y el total es: " + total.toFixed(2);
}