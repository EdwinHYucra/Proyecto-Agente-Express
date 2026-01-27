const NotificacionAlerta = (msgEstatusResponse,msgtitulo = "", msgResponse) => {

    switch (msgEstatusResponse) {
        case "success":
            Swal.fire({
                title: msgtitulo || "Operación Exitosa",
                text: msgResponse,
                icon: msgEstatusResponse,
                allowEscapeKey: false,
                allowOutsideClick : false
            });

            break;
        case "error":
            Swal.fire({
                title: msgtitulo || "Ocurrio algo inseperado",
                text: msgResponse,
                icon: msgEstatusResponse,
                allowEscapeKey: false,
                allowOutsideClick : false
            });
            break;
        case "Error":
            Swal.fire({
                title: msgtitulo || "Ocurrio algo inseperado",
                text: msgResponse,
                icon: msgEstatusResponse,
                allowEscapeKey: false,
                allowOutsideClick : false
            });
            break;
        default:
            break;
    }
}

const NotificacionAlertaOperacion = async (msgEstatusResponse, msgtitulo, msgResponse, operacion) => {
    // 🔥 Esperamos un poco para asegurar que la BD refleje los cambios
            
    await cargarOperaciones();
    
    Swal.fire({
        title: msgtitulo || "Operación Exitosa",
        text: msgResponse,
        icon: msgEstatusResponse,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ver detalles"
    }).then((result) => {
        if (result.isConfirmed) {
            // 📌 Obtener detalles específicos según el tipo de operación
            let detallesHTML = `<div style="text-align: left;">`;
            
            // Información común a todas las operaciones
            detallesHTML += `

                <p><strong>📌 ID Operación:</strong> ${operacion.id_oper}</p>
                <p><strong>🏦 Banco:</strong> ${operacion.entidad_prestataria}</p>
                <p><strong>💰 Importe:</strong> S/ ${operacion.importe.toFixed(2)}</p>
                <p><strong>🔹 Comisión:</strong> S/ ${operacion.comision.toFixed(2)}</p>
                <p><strong>💳 Total Pagado:</strong> S/ ${operacion.montototal.toFixed(2)}</p>
                <p><strong>📅 Fecha:</strong> ${operacion.fechaOperacion}</p>
                <p><strong>📝 Nº de operación:</strong> ${operacion.nro_oper}</p>
            `;

            // 📌 Campos dinámicos según el tipo de operación
            if (operacion.tipo_oper === "PAGO DE SERVICIOS") {
                detallesHTML += `
                    <p><strong>🏢 Empresa:</strong> ${operacion.detalle.datos_hijo.empresa}</p>
                    <p><strong>📞 Servicio:</strong> ${operacion.detalle.datos_hijo.servicio}</p>
                    <p><strong>👤 Código Usuario:</strong> ${operacion.detalle.datos_hijo.codigousuario}</p>
                `;
            } else if (operacion.tipo_oper === "DEPÓSITOS") {
                detallesHTML += `
                    <p><strong>🏦 Cuenta Destino:</strong> ${operacion.detalle.datos_hijo.nro_cuenta_dest}</p>
                    <p><strong>👤 Titular:</strong> ${operacion.detalle.datos_hijo.titular}</p>
                `;
            } else if (operacion.tipo_oper === "GIROS") {
                detallesHTML += `
                    <p><strong>🏦 Banco Destino:</strong> ${operacion.detalle.datos_hijo.banco_destino}</p>
                    <p><strong>👤 Beneficiario:</strong> ${operacion.detalle.datos_hijo.beneficiario}</p>
                    <p><strong>📄 DNI Beneficiario:</strong> ${operacion.detalle.datos_hijo.dni}</p>
                `;
            } else if (operacion.tipo_oper === "PAGO DE TARJETA") {
                detallesHTML += `
                    <p><strong>💳 Nro. Tarjeta:</strong> ${operacion.detalle.datos_hijo.nro_tarjeta}</p>
                    <p><strong>🏦 Entidad Beneficiaria:</strong> ${operacion.detalle.datos_hijo.entidad_benf}</p>
                    <p><strong>👤 Beneficiario:</strong> ${operacion.detalle.datos_hijo.beneficiario}</p>
                `;
            } else if (operacion.tipo_oper === "RETIROS") {
                detallesHTML += `
                    <p><strong>💰 Tipo de Retiro:</strong> ${operacion.detalle.datos_hijo.tipo_retiro}</p>
                `;
            }

            detallesHTML += `</div>`; // Cerrar el contenedor HTML dinámico

            // Mostrar segunda alerta con opción de imprimir
            Swal.fire({
                title: "Detalles de la Operación",
                html: detallesHTML,
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: "🖨️ Imprimir",
                cancelButtonText: "Cerrar",
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    // Función de impresión (debes implementarla)
                    imprimirComprobanteOperacion(operacion);
                }
            });
        }
    });
};

//Funcion imprimir

const imprimirComprobanteOperacion = async (data) => {
    try {
        // Enviar datos al PHP que generará el comprobante
        const response = await fetch('https://www.agenteexpress.com/Agente/Tickets/Print.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Recibir la respuesta como un Blob (PDF u otro formato de impresión)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Abrir una nueva pestaña con el comprobante listo para imprimir
        const newTab = window.open(url, '_blank');
        if (!newTab) {
            alert("⚠️ Permite las ventanas emergentes para ver el comprobante.");
        }

    } catch (error) {
        NotificacionAlerta("error", "Error en impresión", `Error al enviar datos a impresión: ${error.message}`);
    }
};

//Obtener el CodAgent
function obtenerAfiliadoIdDesdeSesion() {
    return fetch("php/controllers/SesionController.php")
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                return data.cod_agen;

                // Si quieres listar comisiones después de obtener el ID:
                //listarConfiguracionesAfiliado(afiliadoId);
            } else {
                return Swal.fire("Error", data.message || "No se pudo obtener el afiliado.", "error");
            }
        })
        .catch(err => {
            console.error(err);
            return Swal.fire("Error", "Error de red al consultar afiliado en sesión", "error");
        });
}