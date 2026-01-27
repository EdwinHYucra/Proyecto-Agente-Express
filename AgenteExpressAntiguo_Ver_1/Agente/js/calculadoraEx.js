document.getElementById('abrirFormulario').addEventListener('click', function() {
    Swal.fire({
        title: 'Calculadora de Retiro con Tarjeta',
        html: `
            <div class="text-center">
                <div class="mb-3">
                    <label for="monto" class="form-label">Monto en Soles:</label>
                    <input type="number" id="monto" class="form-control" placeholder="Ingresa el monto en Soles" />
                </div>
                <div id="resultado" class="mt-3"></div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Calcular',
        cancelButtonText: 'Cerrar',
        preConfirm: () => {
            const monto = parseFloat(document.getElementById('monto').value) || 0;
            if (monto <= 0) {
                Swal.showValidationMessage('Por favor, ingresa un monto válido');
                return false;
            }
            // Calculamos el 2.40% y sumamos 1 sol adicional
            const porcentaje = 2.40;
            const incremento = (monto * porcentaje) / 100;
            const totalConIncremento = monto + incremento;
            const totalFinal = totalConIncremento + 1; // Añadimos 1 sol extra al total

            // Actualizamos el resultado en el formulario
            document.getElementById('resultado').innerHTML = `
                <div class="alert alert-info" role="alert">
                    Total con 2.40% + S/1.00 de comisión: <strong>S/ ${totalFinal.toFixed(2)}</strong>
                </div>
            `;
            return false; // Evitamos que el modal se cierre antes de mostrar el resultado
        },
        didOpen: () => {
            // Deshabilitar el botón de confirmación hasta que se ingrese un monto válido
            document.getElementById('monto').addEventListener('input', function() {
                const monto = parseFloat(this.value);
                const button = Swal.getConfirmButton();
                if (monto > 0) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            });
        },
        width: '400px',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
    });
});

document.getElementById('abrirFormularioL').addEventListener('click', function() {
    Swal.fire({
        title: 'Calculadora de Retiro con Tarjeta',
        html: `
            <div class="text-center">
                <div class="mb-3">
                    <label for="monto" class="form-label">Monto en Soles:</label>
                    <input type="number" id="monto" class="form-control" placeholder="Ingresa el monto en Soles" />
                </div>
                <div id="resultado" class="mt-3"></div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Calcular',
        cancelButtonText: 'Cerrar',
        preConfirm: () => {
            const monto = parseFloat(document.getElementById('monto').value) || 0;
            if (monto <= 0) {
                Swal.showValidationMessage('Por favor, ingresa un monto válido');
                return false;
            }
            // Calculamos el 2.40% y sumamos 1 sol adicional
            const porcentaje = 2.40;
            const incremento = (monto * porcentaje) / 100;
            const totalConIncremento = monto + incremento;
            const totalFinal = totalConIncremento + 1; // Añadimos 1 sol extra al total

            // Actualizamos el resultado en el formulario
            document.getElementById('resultado').innerHTML = `
                <div class="alert alert-info" role="alert">
                    Total con 2.40% + S/1.00 de comisión: <strong>S/ ${totalFinal.toFixed(2)}</strong>
                </div>
            `;
            return false; // Evitamos que el modal se cierre antes de mostrar el resultado
        },
        didOpen: () => {
            // Deshabilitar el botón de confirmación hasta que se ingrese un monto válido
            document.getElementById('monto').addEventListener('input', function() {
                const monto = parseFloat(this.value);
                const button = Swal.getConfirmButton();
                if (monto > 0) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            });
        },
        width: '400px',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
    });
});

