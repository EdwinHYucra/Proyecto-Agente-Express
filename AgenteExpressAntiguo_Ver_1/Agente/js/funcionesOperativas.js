function obtenerFechaHoraLocal() {
    const fecha = new Date();
    // Formatear la fecha y hora
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

function limpiarCampos() {
    const campos = [
        document.getElementById('txtMontoCuentaA'),
        document.getElementById('txtMontoEfectivoA'),
        document.getElementById('txtMontoCuentaC'),
        document.getElementById('txtMontoEfectivoC')
    ];

    campos.forEach(campo => {
        if (campo) {
            campo.value = ""; // Limpiar el valor del input
            campo.classList.remove("is-invalid"); // Eliminar cualquier error visual previo
        }
    });

    console.log("🧹 Campos limpiados correctamente.");
}

let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    lengthMenu: [10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4] },
        { orderable: false, targets: [3, 4] },
        { searchable: false, targets: [1] },
        {responsivePriority:1 , targets: 0},
        {responsivePriority:2 , targets: 1},
        {responsivePriority:4 , targets: 2},
        {responsivePriority:5 , targets: 3},
        {responsivePriority:3 , targets: 4},
    ],
    pageLength: 10,
    order: [[0, "desc"]],
    destroy: true,
    responsive: true,
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-MX.json',
        lengthMenu: "_MENU_ registros por página"
        /*zeroRecords: "No hay cajas registradas",
        info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }*/
    }
};


const decimalRegex = /^\d+(\.\d{1,2})?$/;

// Capturar los campos de entrada
const txtMontoCuentaA = document.getElementById('txtMontoCuentaA');
const txtMontoEfectivoA = document.getElementById('txtMontoEfectivoA');
const txtMontoCuentaC = document.getElementById('txtMontoCuentaC');
const txtMontoEfectivoC = document.getElementById('txtMontoEfectivoC');
const tipoDetalleDR = document.getElementById("cmbMontoOperacionCaja");
const montoDR = document.getElementById("txtMontoOperacionCaja");
const nroOperacionDR = document.getElementById("txtNroOperacionCaja");

const msgDespositoRetiro = document.getElementById('lblOperacionCajaRD');
const msgAperturaCaja = document.getElementById('lblAperturaCaja');
const msgCierreCaja = document.getElementById('lblCierreCaja')

// Validar Monto y Numeros en Deposito Retiro
function validarCamposDespositoRetiro() {
    let esValido = true;

    // Validar cada campo individualmente
    if (!validarMonto(montoDR, msgDespositoRetiro)) esValido = false;
    if (nroOperacionDR == "") esValido = false;
    //if (!validarMonto(txtMontoEfectivoA, msgDespositoRetiro)) esValido = false;

    return esValido; // Solo si todos los campos son válidos, retorna true
}


// Función para validar campos de monto
function validarMonto(input, msgElement) {
    const valor = input.value.trim(); // Eliminar espacios en blanco al inicio y final

    if (valor === "") {
        input.classList.add("is-invalid"); // Borde rojo si está vacío
        msgElement.textContent = "⚠️ El campo no puede estar vacío.";
        return false;
    }

    if (!decimalRegex.test(valor)) {
        input.classList.add("is-invalid"); // Borde rojo si es inválido
        msgElement.textContent = "⚠️ Solo debe incluir números y hasta 2 decimales.";
        return false;
    }

    // ✅ Si pasa las validaciones, quitar mensajes de error
    input.classList.remove("is-invalid");
    msgElement.textContent = "";
    return true;
}

function validarCamposApertura() {
    let esValido = true;

    // Validar cada campo individualmente
    if (!validarMonto(txtMontoCuentaA, msgAperturaCaja)) esValido = false;
    if (!validarMonto(txtMontoEfectivoA, msgAperturaCaja)) esValido = false;

    return esValido; // Solo si todos los campos son válidos, retorna true
}

function validarCamposCierre() {
    let esValido = true;

    if (!validarMonto(txtMontoCuentaC, msgCierreCaja)) esValido = false;
    if (!validarMonto(txtMontoEfectivoC, msgCierreCaja)) esValido = false;

    return esValido;
}
// Agregar eventos de validación en cada campo
txtMontoCuentaA.addEventListener("input", () => validarMonto(txtMontoCuentaA, msgAperturaCaja));
txtMontoEfectivoA.addEventListener("input", () => validarMonto(txtMontoEfectivoA, msgAperturaCaja));
txtMontoCuentaC.addEventListener("input", () => validarMonto(txtMontoCuentaC, msgCierreCaja));
txtMontoEfectivoC.addEventListener("input", () => validarMonto(txtMontoEfectivoC, msgCierreCaja));
montoDR.addEventListener("input", () => validarMonto(montoDR, msgDespositoRetiro))

const cargarCajas = async () => {
    try {
        const response = await fetch('https://www.agenteexpress.com/Agente/php/caja_chica.php?action=obtenercajas');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        let content = "";

        if (!data || !data.cajas || data.status === "error" || data.cajas.length === 0) {
            content = `
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-center">
                        <strong>No hay cajas registradas aún.</strong>
                    </td>
                    <td></td>
                    <td></td>
                </tr>`;
            NotificacionAlerta("error", "⚠️ No se encontraron cajas en el sistema.");
        } else {
            data.cajas.forEach((data) => {
                content += `
                    <tr>
                        <td>${data.id_Caja}</td>
                        <td>${data.fecha_Apertura}</td>
                        <td>${data.fecha_Cierre == null ? "---- -- -- --:--:--" : data.fecha_Cierre}</td>
                        <td>${data.estado === 1 ? "En Proceso" : "Finalizado"}</td>
                        <td>
                            ${data.estado === 1 ? `
                                <button class="btn btn-sm btn-danger btnCerrarCaja" 
                                    data-id="${data.id_Caja}" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#ModalCierreCaja">
                                    <i class="fa-solid fa-lock"></i> Cerrar Caja
                                </button>
                            ` : `<span class="badge bg-success">Cerrada</span>`}
                            <button class="btn btn-sm btn-info btnVerBalance" data-id="${data.id_Caja}">
                                <i class="fa-solid fa-chart-bar"></i> Ver Balance
                            </button>
                        </td>
                    </tr>`;
            });
        }

        if ($.fn.DataTable.isDataTable("#datatable_cajas")) {
            $("#datatable_cajas").DataTable().clear().destroy();
        }

        document.getElementById("tableBody_cajas").innerHTML = content;

        $("#datatable_cajas").DataTable(dataTableOptions);

    } catch (error) {
        NotificacionAlerta("error", '❌ Error al obtener las cajas:', error);
    }
};

// Obtiene la fecha actual en formato YYYY-MM-DD HH:MM:SS
function obtenerFechaHoraActual() {
    const fecha = new Date();
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
}
// ✅ Delegación de eventos para "Cerrar Caja" y "Ver Balance"
document.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("btnCerrarCaja")) {
        const idCaja = target.getAttribute("data-id");
        console.log("📌 ID de la caja seleccionada para cerrar:", idCaja);
        document.getElementById("btnGuardarCierre").setAttribute("data-id", idCaja);
    }

    if (target.classList.contains("btnVerBalance")) {
        const idCaja = target.getAttribute("data-id");
        console.log("📌 ID de la caja seleccionada para ver balance:", idCaja);
        verBalanceCaja(idCaja);
    }
});
// ✅ Nueva función para obtener y mostrar el balance de caja
const verBalanceCaja = async (id_caja) => {
    try {
        const response = await fetch(`https://www.agenteexpress.com/Agente/php/caja_chica.php?action=verBalance&id_caja=${id_caja}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 Respuesta del servidor:", data); // <-- Log para depuración

        if (data.status !== "success" || !data.datos) {
            throw new Error(data.message || "No se pudo obtener el balance.");
        }

        // Obtener los valores correctos
        const balance = data.datos;

        Swal.fire({
            title: "📊 Cuadre de Caja",
            html: `
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="table-primary text-center">
                            <tr>
                                <th>Descripción</th>
                                <th>Cuenta (S/.)</th>
                                <th>Efectivo (S/.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Saldo Inicial Ingresado</strong></td>
                                <td class="text-end">S/. ${parseFloat(balance.Cuenta_Inicial).toFixed(2)}</td>
                                <td class="text-end">S/. ${parseFloat(balance.Efectivo_Inicial).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Saldo Final Ingresado</strong></td>
                                <td class="text-end">S/. ${parseFloat(balance.Cuenta_Cierre_Ingresada).toFixed(2)}</td>
                                <td class="text-end">S/. ${parseFloat(balance.Efectivo_Cierre_Ingresado).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Saldo Calculado</strong></td>
                                <td class="text-end">S/. ${parseFloat(balance.Cuenta_Calculada).toFixed(2)}</td>
                                <td class="text-end">S/. ${parseFloat(balance.Efectivo_Calculado).toFixed(2)}</td>
                            </tr>
                            <tr class="${(balance.Diferencia_Cuenta > 0 || balance.Diferencia_Efectivo > 0) ? 'table-danger' : ''}">
                                <td><strong>Diferencia</strong></td>
                                <td class="text-end fw-bold ${balance.Diferencia_Cuenta != 0 ? 'text-danger' : ''}">S/. ${parseFloat(balance.Diferencia_Cuenta).toFixed(2)}</td>
                                <td class="text-end fw-bold ${balance.Diferencia_Efectivo != 0 ? 'text-danger' : ''}">S/. ${parseFloat(balance.Diferencia_Efectivo).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
            icon: "none",
            confirmButtonText: "Cerrar",
            customClass: {
                popup: "swal-wide"
            }
        });

    } catch (error) {
        console.error("❌ Error al obtener el balance:", error);
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    }
};
// Función para abrir caja
const abrirCaja = async () => {

    if (!validarCamposApertura()) {
        NotificacionAlerta("success", "⚠️ Por favor, corrija los errores antes de continuar.");
        return;

    }

    const request = {
        action: "abrirCaja",
        fechaApertura: obtenerFechaHoraLocal(),
        montocuentaA: parseFloat(txtMontoCuentaA.value) || 0,
        montoefectivoA: parseFloat(txtMontoEfectivoA.value) || 0
    };

    try {
        const response = await fetch('https://www.agenteexpress.com/Agente/php/caja_chica.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 Respuesta del servidor:", data);

        if (data.status !== "success") {
            throw new Error(`Error en la API: ${data.message}`);
        }

        NotificacionAlerta("success", "✅Caja abierta exitosamente");

        // 🔹 Mover el foco fuera del modal antes de cerrarlo
        btnAbrirCaja.focus();

        // ✅ Cerrar el modal correctamente
        const modalElement = document.getElementById('ModalAperturaCaja');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();

        // ✅ Restaurar el `overflow-y` después de cerrar el modal
        modalElement.addEventListener('hidden.bs.modal', () => {
            document.body.style.overflowY = "auto";
            document.body.style.paddingRight = "";
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            limpiarCampos(); // 🔥 Limpiar los campos después de cerrar el modal
        }, { once: true });


        await cargarCajas(); // 🔄 Asegurar que la tabla se actualiza después de la acción

    } catch (error) {
        NotificacionAlerta("Error", "❌ Error al abrir la caja: " + error.message);
    }
};

// Función para cerrar caja
const cerrarCaja = async () => {

    if (!validarCamposCierre()) {
        NotificacionAlerta("Error", "⚠️ Por favor, corrija los errores antes de continuar.");
        return;
    }

    const btnGuardarCierre = document.getElementById("btnGuardarCierre");
    const idCaja = btnGuardarCierre.getAttribute("data-id"); // Obtener el ID correctamente

    if (!idCaja) {
        NotificacionAlerta("Error", "No se ha seleccionado ninguna caja.");
        return;
    }

    const request = {
        action: "cerrarCaja",
        id: idCaja,  // Asegurar que el ID se envía correctamente
        fechaCierre: obtenerFechaHoraLocal(),
        montocuentaC: parseFloat(txtMontoCuentaC.value) || 0,
        montoefectivoC: parseFloat(txtMontoEfectivoC.value) || 0
    };

    try {
        const response = await fetch('https://www.agenteexpress.com/Agente/php/caja_chica.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "success") {
            throw new Error(`Error en la API: ${data.message}`);
        }

        // ✅ Obtener el modal y cerrarlo correctamente
        const modalElement = document.getElementById('ModalCierreCaja');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();

        // ✅ Restaurar el `overflow-y` cuando el modal se cierre completamente
        modalElement.addEventListener('hidden.bs.modal', () => {
            document.body.style.overflowY = "auto"; // 🔄 Restaurar el scroll en Y
            document.body.style.paddingRight = ""; // 🔄 Restaurar padding si Bootstrap lo modificó

            // 🔥 Eliminar backdrop si quedó en el DOM
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

            console.log("🎯 Modal cerrado completamente y overflow restaurado");

            limpiarCampos();
        }, { once: true });

        NotificacionAlerta("success", '✅ Caja cerrada exitosamente');

        // 🔄 Recargar la tabla
        await cargarCajas();

    } catch (error) {
        NotificacionAlerta("Error", '❌ Error al cerrar la caja:' + error);
    }
};

const insertarDetalleCaja = async () => {

    // Obtener valores
    const tipoDetalle = document.getElementById("cmbMontoOperacionCaja").value;
    const monto = parseFloat(document.getElementById("txtMontoOperacionCaja").value) || 0;
    const nroOperacion = document.getElementById("txtNroOperacionCaja").value.trim();

    // Validaciones
    if (tipoDetalle === "Eliga una opción" || monto <= 0 || nroOperacion === "") {
        NotificacionAlerta("error", "⚠ Todos los campos son obligatorios y deben ser válidos.");
        return;
    }

    try {
        // Enviar los datos al backend
        const response = await fetch("https://www.agenteexpress.com/Agente/php/caja_chica.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "insertarDetalleCaja",
                tipoDetalle,
                monto,
                nroOperacion
            })
        });

        const data = await response.json();

        if (data.status === 'success') {

            // ✅ Obtener el modal y cerrarlo correctamente
            const modalElement = document.getElementById('ModalDepositoRetiro');
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();

            // ✅ Restaurar el `overflow-y` cuando el modal se cierre completamente
            modalElement.addEventListener('hidden.bs.modal', () => {
                document.body.style.overflowY = "auto"; // 🔄 Restaurar el scroll en Y
                document.body.style.paddingRight = ""; // 🔄 Restaurar padding si Bootstrap lo modificó

                // 🔥 Eliminar backdrop si quedó en el DOM
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

                console.log("🎯 Modal cerrado completamente y overflow restaurado");

                limpiarCampos();
            }, { once: true });

            NotificacionAlerta("success", "Detalle insertado correctamente.");

            // 🔄 Recargar la tabla después de insertar
            await cargarCajas();
        } else {
            //console.error("❌ Error al insertar detalle:", data.message);
            NotificacionAlerta("error", data.message);

            const modalElement = document.getElementById('ModalDepositoRetiro');
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();

            // ✅ Restaurar el `overflow-y` cuando el modal se cierre completamente
            modalElement.addEventListener('hidden.bs.modal', () => {
                document.body.style.overflowY = "auto"; // 🔄 Restaurar el scroll en Y
                document.body.style.paddingRight = ""; // 🔄 Restaurar padding si Bootstrap lo modificó

                // 🔥 Eliminar backdrop si quedó en el DOM
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());

                console.log("🎯 Modal cerrado completamente y overflow restaurado");

                limpiarCampos();
            }, { once: true });
        }

    } catch (error) {
        console.error("❌ Error en la solicitud:", error);
        NotificacionAlerta("error", "Error en la solicitud.");
    }
};
// Función para ver detalles de una caja
const verDetalles = async (id_caja) => {
    try {
        const response = await fetch(`https://www.agenteexpress.com/Agente/php/caja_chica.php?action=obtenerdetalles&id_caja=${id_caja}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const detalles = await response.json();
        console.log('Detalles de la caja:', detalles);

        // Aquí podrías actualizar un modal para mostrar los detalles
    } catch (error) {
        console.error('Error al obtener los detalles:', error);
    }
};

// Asignar eventos a los botones
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("btnAbrirCaja").addEventListener("click", abrirCaja);
    document.getElementById("btnGuardarCierre").addEventListener("click", cerrarCaja);
    document.getElementById('btnGuardarCajaDR').addEventListener('click', insertarDetalleCaja);
    await cargarCajas();
});
