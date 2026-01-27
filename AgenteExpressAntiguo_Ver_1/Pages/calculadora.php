<?php require_once("../PageMaster/header.php") ?>
<head>
    <link rel="stylesheet" href="/CSS/calculadora.css">
    <script src="/JS/calculadora.js"></script>

		<center>
    <h2>Calculo de ganancias por operación</h2>
</center>

</head>
<body>
    <section class="container-calculadora">
        <div class="calculator">
            <h2 class="rows-cal">Ganancias Mensuales</h2>
            <div class="rows-cal">
                <label for="amount">Cantidad de operaciones: </label>
                <input class="input-cal" type="number" id="amount">
            </div>
            <div class="rows-cal">
                <label for="commission">Ganancia por operación:</label>
                <input type="number" id="commission" value="1.00" readonly>
            </div>
            <div class="rows-cal">
                <label for="total">Ganancia Mensual: </label>
                <input type="number" id="total" readonly>
            </div>
            <div class="rows-cal">
                <label for="membership">Membresía Mensual: </label>
                <input type="number" id="membership" readonly>
            </div>
            <p class="rows-cal-bt">*La comisión mínima a ganar es de S/ 1.00. La comisión máxima es de S/ 10.00 por operación. El monto a ganar se deduce de la cantidad de operaciones a realizar, descontando el pago de la membresía mensual.</p>
        </div>
        <div class="caja-informacon-agente">
            <h2>¿Cuándo puedo retirar mis ganancias?</h2>
            <ul>
                <li>Al instante: te depositamos el dinero una vez realizadas tus operaciones, puedes disponer de tus fondos de inmediato. ¡Es así de rápido y sencillo!.</li>
            </ul>
        </div>
    </section>
    
    <script>
        // Obtenemos los elementos de los inputs
        const amountInput = document.getElementById('amount');
        const commissionInput = document.getElementById('commission');
        const totalInput = document.getElementById('total');
        const membershipInput = document.getElementById('membership');

        // Creamos una función para calcular el total
        function calcularTotal() {
            const amount = parseFloat(amountInput.value); // Convertimos el valor del input a un número flotante
            const commission = parseFloat(commissionInput.value); // Convertimos el valor del input a un número flotante

            // Calculamos la membresía mensual
            let membership = 0;
            if (amount < 1000) {
                membership = 100;
            } else {
                membership = amount * 0.1;
            }

            // Calculamos el total de ganancias mensuales
            const totalGananciaMensual = amount * commission - membership;

            // Si el total de ganancias mensuales es menor que cero, lo establecemos en cero
            const total = Math.max(0, totalGananciaMensual);

            // Mostramos los resultados en los inputs correspondientes
            totalInput.value = total.toFixed(2);
            membershipInput.value = membership.toFixed(2);
        }

        // Escuchamos el evento 'input' en los dos primeros inputs para calcular el total cada vez que cambian
        amountInput.addEventListener('input', calcularTotal);
        commissionInput.addEventListener('input', calcularTotal);
    </script>

<center>
    <h2>Calculo de Pasarela de Pagos</h2>
</center>

<section class="container-calculadora">
        <div class="calculator">
            <h2 class="rows-cal">Pasarela de pagos</h2>
            <div class="rows-cal">
                <label for="amount2">Monto de Venta: </label>
                <input class="input-cal" type="number" id="amount2">
            </div>
            <div class="rows-cal">
                <label for="commission2">Comisión Pasarela: </label>
                <input type="number" id="commission2" value="2.3482" readonly>
            </div>
            <div class="rows-cal">
                <label for="deposit2">Te depositamos: </label>
                <input type="number" id="deposit2" readonly>
            </div>
            <p class="rows-cal-bt">*La comisión de la pasarela es del 1.99% del valor de la operación más el 18% de IGV.</p>
        </div>
        <div class="caja-informacon-agente">
            <h2>¿Cuándo puedo retirar mis ganancias?</h2>
            <ul>
                <li>Al instante: te depositamos el dinero una vez realizadas tus ventas, puedes disponer de tus fondos de inmediato. ¡Es así de rápido y sencillo!.</li>
            </ul>
        </div>
    </section>
    
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const amountInput = document.getElementById('amount2');
            const commissionInput = document.getElementById('commission2');
            const depositInput = document.getElementById('deposit2');

            // Función para calcular el monto a depositar
            function calcularMontoADepositar() {
                const montoVenta = parseFloat(amountInput.value);
                const comision = montoVenta * (0.023482);
                const montoADepositar = montoVenta - comision;
                depositInput.value = montoADepositar.toFixed(2); // Redondeamos a dos decimales
            }

            // Escuchamos el evento de cambio en el monto de venta
            amountInput.addEventListener('input', calcularMontoADepositar);
        });
    </script>

<?php require_once("../PageMaster/footer.php") ?>