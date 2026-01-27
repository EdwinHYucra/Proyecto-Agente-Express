const dataTableOptionsOP = {
    lengthMenu: [5, 10, 15, 20, 50, 100],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4,5] },
        { orderable: false, targets: [3, 4] },
        {responsivePriority:1 , targets: 0},
        {responsivePriority:2 , targets: 1},
        {responsivePriority:4 , targets: 2},
        {responsivePriority:6 , targets: 3},
        {responsivePriority:5 , targets: 4},
        {responsivePriority:3 , targets: 5}
    ],
    pageLength: 10,
    order: [[0, "desc"]],
    responsive: true,
    destroy: true,
    language: {
        lengthMenu: "_MENU_ registros por página",
        url: 'https://cdn.datatables.net/plug-ins/2.2.2/i18n/es-MX.json'
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

const cargarOperaciones = async () => {
    try {
        const response = await fetch('https://www.agenteexpress.com/Agente/php/Operaciones.php?action=obtenerOperaciones');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("📌 Datos recibidos en operaciones:", data);

        let content = "";

        if (!data || !data.operaciones || data.status === "error" || data.operaciones.length === 0) {
            content = `
                <tr>
                    <td colspan="6" class="text-center">
                        <strong>No hay operaciones registradas.</strong>
                    </td>
                </tr>`;
        } else {
            data.operaciones.forEach((operacion, index) => {
                content += `
                    <tr>
                        <td>${operacion.cod_oper}</td>
                        <td>${operacion.tipo_oper}</td>
                        <td>S/ ${parseFloat(operacion.importe).toFixed(2)}</td>
                        <td>S/ ${parseFloat(operacion.comision).toFixed(2)}</td>
                        <td>${operacion.fechaOperacion}</td>
                        <td>
                            <button class="btn btn-sm btn-primary btnImprimirOperacion"
                                data-id="${operacion.id_oper}">
                                🖨️ Imprimir
                            </button>
                        </td>
                    </tr>`;
            });
        }

        // 🔥 Destruir DataTable antes de actualizarla para evitar caché
        if ($.fn.DataTable.isDataTable("#datatable_operaciones")) {
            $("#datatable_operaciones").DataTable().clear().destroy();
        }

        // 🔥 Vaciar el tbody antes de agregar nuevos datos
        document.getElementById("tableBody_operaciones").innerHTML = content;

        // 🔄 Volver a inicializar DataTable
        $("#datatable_operaciones").DataTable(dataTableOptionsOP);

    } catch (error) {
        NotificacionAlerta("error", "Error al obtener las operaciones: ", "No se encontraron operaciones");
    }
};

const obtenerOperacionEImprimir = async (id_oper) => {
    try {
        // Petición al backend para obtener los datos de la operación
        const response = await fetch(`https://www.agenteexpress.com/Agente/php/Operaciones.php?action=obtenerOperacion&id_oper=${id_oper}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.status === "error") {
            NotificacionAlerta("error", "❌ No se encontró la operación.");
            return;
        }
        //console.log(data);

        imprimirComprobanteOperacion(data);

    } catch (error) {
        NotificacionAlerta("error", "❌ Error al generar el comprobante.");
        console.error(error);
    }
};




// Ejecutar la función cuando cargue el DOM
document.addEventListener("DOMContentLoaded", async () => {
    await cargarOperaciones();
});


// Delegación de eventos en la tabla
$(document).on("click", ".btnImprimirOperacion", function () {
    const id_oper = $(this).attr("data-id");
    console.log(id_oper);
    obtenerOperacionEImprimir(id_oper);
});