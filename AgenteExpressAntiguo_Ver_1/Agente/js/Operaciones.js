//Comienzo Operacion

var btnRealizarOperacion = document.getElementById('btnReaOper');
var btnFinalizarOperacion = document.getElementById('btnFinOper');

//Impresión de Operación
//var btnImprimirOperacion = document.getElementById('btnImpOper');

//Estandar de Operaciones
const cmbtiOp = document.getElementById('cmbtiOp');
const cmbEnPr = document.getElementById('cmbEnPr');
const txtidAgOp = document.getElementById('txtidAgOp');
const txtFyHOperacion = document.getElementById('txtFyHOperacion');

//Pago de Servicios
const txtCategoria = document.getElementById('txtCategoria');
const txtServicio = document.getElementById('txtServicio');
const txtEmpresa = document.getElementById('txtEmpresa');
const txtNumeroDeRecibo = document.getElementById('txtNumeroDeRecibo');
const txtCodigoDeUsuario = document.getElementById('txtCodigoDeUsuario');
const txtTitular = document.getElementById('txtTitular');

//Depositos
const txtBancoDeDestino = document.getElementById('txtBancoDeDestinoDepos');
const txtTitularDepos = document.getElementById('txtTitularDepos');
const txtNumeroDeCuenta = document.getElementById('txtNumeroDeCuenta');

//Pago Tarjetas de Credito
const txtBancodeDestinoTC = document.getElementById('txtBancodeDestinoTC');
const txtNroTarjetaDeCredito = document.getElementById('txtNroTarjetaDeCredito');
const txtTitularTC = document.getElementById('txtTitularTC');

//Giros
const txtBancoDeDestinoGiro = document.getElementById('txtBancoDeDestinoGiro');
const txtDNIDelBeneficiario = document.getElementById('txtDNIDelBeneficiario');
const txtBeneficiarioGiro = document.getElementById('txtBeneficiarioGiro');

//Cargos
const txtImporte = document.getElementById('txtImporte');
const txtComisión = document.getElementById('txtComisión');
const txtMontoTotal = document.getElementById('txtMontoTotal');


txtComisión.addEventListener('input', () => {
    txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2) ?? 0;
})

//Retiros
const cmbRetiros = document.getElementById('cmbRetiros');
const txtNroTarjetaRetiros = document.getElementById('txtNroTarjetaRetiros');

//Variables globales
var DatosOperacion;

var NroCuentaOperacion;
//Script de Operaciones
//document.getElementById('btnFinOper').disabled
//document.getElementById("btnFinOper").disabled = true;

btnFinalizarOperacion.addEventListener('click', async () => {

    try {
        // Datos generales
        const datosGenerales = {
            "TipoOperacion": cmbtiOp.value,
            "EntidadPrestataria": cmbEnPr.value,
            "NOperacionBancario": txtidAgOp.value,
            "FechayHora": txtFyHOperacion.value,
            "NroCuentaOperacion": NroCuentaOperacion
        }

        const datosOperacion = DatosOperacion;

        // Datos Cargo
        const datosCargo = {
            "Importe": txtImporte.value,
            "Comision": txtComisión.value,
            "MontoTotal": txtMontoTotal.value
        }

        const bodyData = {
            "datosGenerales": datosGenerales,
            "datosCargo": datosCargo,
            "datosOperacion": datosOperacion
        }

        // Usamos `await` para esperar la respuesta de fetch
        const response = await fetch('https://www.agenteexpress.com/Agente/php/GuardarOperacionCashIn.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
            console.log(data.operacion);
            NotificacionAlertaOperacion('success', data.message, "Datos recibidos y procesados correctamente", data.operacion);
        } else {
            NotificacionAlerta('error', 'Error en el procesamiento:', data.message);
        }

    } catch (error) {
        NotificacionAlerta("error", 'Error en la solicitud:', error);
    }
});


//funcion de comision por configuracion de comision de importe

async function ObtenerComisionPorImporte(monto) {

    try {
        const cod_agent = await obtenerAfiliadoIdDesdeSesion();
        const response = await fetch(`php/controllers/ComisionesController.php?action=listar&afiliadoId=${cod_agent}`);
        const data = await response.json();

        if (data.status === "success") {

            const configuraciones = data.data;

            const config = configuraciones.find(conf => monto >= parseFloat(conf.MontoMinimo) && monto <= parseFloat(conf.MontoMaximo));

            if (config) {
                //console.log(config.MontoFijo);
                return parseFloat(config.MontoFijo);
            }
        }
        return null;
    } catch (error) {
        console.error("Error al obtener comisión: ", error);
        return null;
    }

}
//Datos de la operacion

//Cargos

btnRealizarOperacion.addEventListener('click', async () => {
    try {

        const text = await navigator.clipboard.readText();

        const rows = 100;
        let lines = text.split('\n'); // Dividir el texto en líneas

        // Crear un array con las líneas leídas (limitado a 'rows')
        const txt = [];
        for (let r = 0; r < rows && r < lines.length; r++) {
            txt[r] = lines[r].trim();
        }

        var comision;

        switch (txt[0]) {
            case "¡Pago de servicio exitoso!":

                divsOperaciones('divPagoServi');

                cmbtiOp.value = "PAGO DE SERVICIOS";
                cmbEnPr.value = "BCP";

                if (cmbEnPr.value == "BCP") {
                    //if (true)
                    //Datos Generales
                    txtidAgOp.value = txt[37];
                    txtFyHOperacion.value = ObtenerDateTime(txt[5])

                    //Datos de la operacion

                    if (txt[11] == "RECARGA VIRTUAL") {

                        NroCuentaOperacion = txt[29].substring(5, txt[29].length);

                        txtidAgOp.value = txt[33];
                        txtCategoria.value = txt[11];
                        txtServicio.value = txt[15];
                        txtEmpresa.value = txt[9];

                        txtNumeroDeRecibo.value = txt[23]
                        txtCodigoDeUsuario.value = txt[19];
                        txtTitular.value = txt[23];
                    }
                    else {
                        NroCuentaOperacion = txt[33].substring(5, txt[33].length)

                        txtCategoria.value = txt[11];
                        txtServicio.value = txt[15];
                        txtEmpresa.value = txt[9];
                        txtNumeroDeRecibo.value = txt[25].substring(11, txt[21].length);
                        txtCodigoDeUsuario.value = txt[19];
                        txtTitular.value = txt[23];
                    }
                    //Datos del importe
                    txtImporte.value = txt[4].substring(3, txt[4].length);
                    //}
                    if (txtEmpresa.value == "PACIFICO SEGUROS") {
                        txtComisión.value = "4.00";
                    }
                    else {
                        comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                        txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                    }
                    txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                }

                DatosOperacion = {
                    "Categoria": txtCategoria.value,
                    "Servicio": txtServicio.value,
                    "Empresa": txtEmpresa.value,
                    "NumerodelRecibo": txtNumeroDeRecibo.value,
                    "CodigodeUsuario": txtTitular.value,
                    "Titular": txtTitular.value
                }

                document.getElementById("btnFinOper").disabled = false;
                break;

            case "¡Transferencia a terceros BCP exitosa!":

                divsOperaciones('divDeposito');

                cmbtiOp.value = "DEPÓSITOS";
                cmbEnPr.value = "BCP";

                txtidAgOp.value = txt[27];
                txtFyHOperacion.value = ObtenerDateTime(txt[5])

                NroCuentaOperacion = txt[23].substring(5, txt[23].length)

                txtBancoDeDestino.value = txt[17]
                txtTitularDepos.value = txt[9]
                txtNumeroDeCuenta.value = txt[11]

                DatosOperacion = {
                    "BancoDestinatario": txtBancoDeDestino.value,
                    "TitularDeposito": txtTitularDepos.value,
                    "NumeroCuenta": txtNumeroDeCuenta.value
                }

                txtImporte.value = txt[4].substring(3, txt[4].length);

                comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                document.getElementById("btnFinOper").disabled = false;
                break;

            case "¡Transferencia a otros bancos exitosa!":

                divsOperaciones('divDeposito');

                cmbtiOp.value = "DEPÓSITOS";
                cmbEnPr.value = "BCP";

                txtidAgOp.value = txt[45];
                txtFyHOperacion.value = ObtenerDateTime(txt[5])

                NroCuentaOperacion = txt[37].substring(5, txt[37].length)
                console.log(NroCuentaOperacion);

                txtBancoDeDestino.value = txt[15]
                txtTitularDepos.value = txt[9]
                txtNumeroDeCuenta.value = txt[11]

                DatosOperacion = {
                    "BancoDestinatario": txtBancoDeDestino.value,
                    "TitularDeposito": txtTitularDepos.value,
                    "NumeroCuenta": txtNumeroDeCuenta.value
                }

                txtImporte.value = txt[4].substring(3, txt[4].length);

                comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                document.getElementById("btnFinOper").disabled = false;
                break;

            case "¡Envío a celular exitoso!":

                divsOperaciones('divDeposito');

                cmbtiOp.value = "DEPÓSITOS";
                cmbEnPr.value = "BCP";

                txtidAgOp.value = txt[30];
                txtFyHOperacion.value = ObtenerDateTime(txt[5])

                if (txt[12] == "Bcp") {

                    NroCuentaOperacion = txt[26].substring(5, txt[26].length)

                    txtBancoDeDestino.value = "Billetera Electrónica " + txt[12];
                    txtTitularDepos.value = txt[9]
                    txtNumeroDeCuenta.value = txt[11]
                }
                else {

                    NroCuentaOperacion = txt[22].substring(5, txt[22].length)

                    txtidAgOp.value = txt[26];
                    txtBancoDeDestino.value = "Billetera Electrónica " + txt[12];
                    txtTitularDepos.value = txt[9]
                    txtNumeroDeCuenta.value = txt[11]
                }


                DatosOperacion = {
                    "BancoDestinatario": txtBancoDeDestino.value,
                    "TitularDeposito": txtTitularDepos.value,
                    "NumeroCuenta": txtNumeroDeCuenta.value
                }

                txtImporte.value = txt[4].substring(3, txt[4].length);

                comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                document.getElementById("btnFinOper").disabled = false;
                break;
            case "¡Giro nacional exitoso!":

                divsOperaciones('divGiro');

                cmbtiOp.value = "GIROS";
                cmbEnPr.value = "BCP";

                NroCuentaOperacion = txt[29].substring(5, txt[29].length)

                txtidAgOp.value = txt[33];
                txtFyHOperacion.value = ObtenerDateTime(txt[5])

                txtBancoDeDestinoGiro.value = "BCP"
                txtDNIDelBeneficiario.value = txt[11].substring(4, txt[11].length)
                txtBeneficiarioGiro.value = txt[9]

                DatosOperacion = {
                    "BancoDestino": txtBancoDeDestinoGiro.value,
                    "DniBeneficiario": txtDNIDelBeneficiario.value,
                    "Beneficiario": txtBeneficiarioGiro.value
                }

                txtImporte.value = txt[4].substring(3, txt[4].length);

                comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                txtComisión.value = comision !== null ? (5 + comision).toFixed(2) : "6.00";

                txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);

                document.getElementById("btnFinOper").disabled = false;
                break;
            case "¡Pago de tarjeta exitoso!":

                divsOperaciones('divPagoTarjCred')

                cmbtiOp.value = "PAGO DE TARJETA";
                cmbEnPr.value = "BCP";

                NroCuentaOperacion = txt[17].substring(5, txt[17].length)

                txtidAgOp.value = txt[21];
                txtFyHOperacion.value = ObtenerDateTime(txt[5])

                txtBancodeDestinoTC.value = "BCP";
                txtNroTarjetaDeCredito.value = txt[11];
                txtTitularTC.value = txt[9];

                DatosOperacion = {
                    "BancoDestino": txtBancodeDestinoTC.value,
                    "NroTarjetadeCreadito": txtNroTarjetaDeCredito.value,
                    "TitularTC": txtTitularTC.value
                }

                txtImporte.value = txt[4].substring(3, txt[4].length);

                comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);


                document.getElementById("btnFinOper").disabled = false;
                break;
            default:
                lines = text.split('\t'); // Dividir el texto en partes separadas por tabulaciones

                const formattedText = lines.join('\n'); // Unir las partes con saltos de línea

                const txt2 = [];
                for (let r = 0; r < lines.length; r++) {
                    txt2[r] = lines[r].trim();
                }
                switch (lines[2]) {


                    case "Pago con tarjeta celular":

                        divsOperaciones('divRetiro');

                        cmbtiOp.value = "RETIROS";
                        cmbEnPr.value = "RETIROS EXPRESS";

                        txtidAgOp.value = null;
                        txtFyHOperacion.value = txt2[1];

                        NroCuentaOperacion = txt2[0];
                        console.log(NroCuentaOperacion);

                        cmbRetiros.value = "Pago con tarjeta celular"
                        txtNroTarjetaRetiros.value = txt2[5].slice(0, -4);

                        DatosOperacion = {
                            "RetiroTipo": cmbRetiros.value,
                            "NroTarjetadeCreadito": txtNroTarjetaRetiros.value
                        }

                        txtImporte.value = parseFloat(txt2[4]).toFixed(2);
                        // Comisión: calcular el 2.40% del importe
                        const porcentajeComision = 2.40;
                        const comision = (parseFloat(txtImporte.value) * porcentajeComision) / 100;

                        // Agregar la comisión de 2.40% + 1.00
                        const comisionTotal = comision + 1.00;

                        txtComisión.value = comisionTotal.toFixed(2);

                        txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                        document.getElementById("btnFinOper").disabled = false;
                        break;

                    case "sQR":

                        divsOperaciones('divRetiro');

                        cmbtiOp.value = "RETIROS";
                        cmbEnPr.value = "RETIROS EXPRESS";

                        NroCuentaOperacion = txt2[0];
                        console.log(NroCuentaOperacion);

                        txtidAgOp.value = null;
                        txtFyHOperacion.value = txt2[1];

                        cmbRetiros.value = "sQR"
                        txtNroTarjetaRetiros.value = txt2[5]

                        DatosOperacion = {
                            "RetiroTipo": cmbRetiros.value,
                            "NroTarjetadeCreadito": txtNroTarjetaRetiros.value
                        }

                        txtImporte.value = parseFloat(txt2[4]).toFixed(2);

                        comision = await ObtenerComisionPorImporte(parseFloat(txtImporte.value));
                        txtComisión.value = comision !== null ? comision.toFixed(2) : "1.00";

                        txtMontoTotal.value = (parseFloat(txtImporte.value) + parseFloat(txtComisión.value)).toFixed(2);
                        document.getElementById("btnFinOper").disabled = false;
                        break
                }

        }

    } catch (error) {
        NotificacionAlerta("error", 'Error al leer el texto del portapapeles:' + error);
    }
});

//Fin Operacion

//Start Impresion

/*btnImprimirOperacion.addEventListener('click', async () => {
    try {
        // Captura los valores que necesitas enviar

        //Estandar de Operaciones
        const TipoOp = cmbtiOp.value;
        const Entidad = cmbEnPr.value;
        const NumOp = txtidAgOp.value;
        const FechaOp = txtFyHOperacion.value;

        //Pago de Servicios
        const categoria = txtCategoria.value;
        const servicio = txtServicio.value;
        const empresa = txtEmpresa.value;
        const NumRecibo = txtNumeroDeRecibo.value;
        const CodUser = txtCodigoDeUsuario.value;
        const Titular = txtTitular.value;

        //Depositos
        const BancoDestinoDep = txtBancoDeDestino.value;
        const TitutalDep = txtTitularDepos.value;
        const NumCuenta = txtNumeroDeCuenta.value;

        //Pago Tarjetas de Credito
        const BancoDestinoTC = txtBancodeDestinoTC.value;
        const NumTarj = txtNroTarjetaDeCredito.value;
        const TitularTarj = txtTitularTC.value;

        //Giros
        const BancoDestinoGiro = txtBancoDeDestinoGiro.value;
        const DNIBeneficiario = txtDNIDelBeneficiario.value;
        const NomBeneficiario = txtBeneficiarioGiro.value;

        //Cargos
        const Importe = txtImporte.value;
        const Comision = txtComisión.value;
        const MontoTotal = txtMontoTotal.value;

        //Retiros
        const TipoRetiro = cmbRetiros.value;
        const NumTarjetaRetiro = txtNroTarjetaRetiros.value;


        // Agrega más variables según lo que necesites enviar

        // Construye la URL con los parámetros
        //window.open('https://www.agenteexpress.com/agente/Tickets/Print.php', '_blank');
        const url = `https://www.agenteexpress.com/Agente/Tickets/Print.php?TipoOp=${encodeURIComponent(TipoOp)}&Entidad=${encodeURIComponent(Entidad)}&NumOp=${encodeURIComponent(NumOp)}&FechaOp=${encodeURIComponent(FechaOp)}&categoria=${encodeURIComponent(categoria)}&servicio=${encodeURIComponent(servicio)}&empresa=${encodeURIComponent(empresa)}&NumRecibo=${encodeURIComponent(NumRecibo)}&CodUser=${encodeURIComponent(CodUser)}&Titular=${encodeURIComponent(Titular)}&BancoDestinoDep=${encodeURIComponent(BancoDestinoDep)}&TitutalDep=${encodeURIComponent(TitutalDep)}&NumCuenta=${encodeURIComponent(NumCuenta)}&BancoDestinoTC=${encodeURIComponent(BancoDestinoTC)}&NumTarj=${encodeURIComponent(NumTarj)}&TitularTarj=${encodeURIComponent(TitularTarj)}&BancoDestinoGiro=${encodeURIComponent(BancoDestinoGiro)}&DNIBeneficiario=${encodeURIComponent(DNIBeneficiario)}&NomBeneficiario=${encodeURIComponent(NomBeneficiario)}&Importe=${encodeURIComponent(Importe)}&Comision=${encodeURIComponent(Comision)}&MontoTotal=${encodeURIComponent(MontoTotal)}&TipoRetiro=${encodeURIComponent(TipoRetiro)}&NumTarjetaRetiro=${encodeURIComponent(NumTarjetaRetiro)}`;

        // Abre la URL en una nueva pestaña
        window.open(url, '_blank');

        //Aqui el fetch de validacion de datos al php.

    } catch (error) {
        NotificacionAlerta("Error", "Error al enviar los datos a impresión: ", error);
    }
});*/

//btnImprimirOperacion.addEventListener('click', async () => {
//try {
//window.open('https://www.agenteexpress.com/agente/Tickets/Print.php', '_blank');

//} catch (error) {
// console.error('Error al leer data de impresión:', error);
//}
//})
//End Impresion

//Comienzo Impresion


//Funciones Adicionales del archivo

const divPagoServi = document.getElementById('divPagoServi');
const divDeposito = document.getElementById('divDeposito');
const divPagoTarjCred = document.getElementById('divPagoTarjCred');
const divGiro = document.getElementById('divGiro');
const divRetiro = document.getElementById('divRetiro');

const DivsOpera = [divPagoServi, divDeposito, divPagoTarjCred, divGiro, divRetiro];

export function divsOperaciones(nombre) {
    for (let index = 0; index < DivsOpera.length; index++) {
        if (DivsOpera[index].id !== nombre) {
            DivsOpera[index].style.display = 'none';
        } else {
            DivsOpera[index].style.display = 'block';
        }
    }
}



function ObtenerFecha(fechaHoraInicial) {
    // Encontrar el índice del guion
    const indiceGuion = fechaHoraInicial.indexOf('-');

    // Tomar los datos hasta el guion (sin incluirlo)
    const datosAntesGuion = fechaHoraInicial.substring(0, indiceGuion).trim(); // Salida: "Lunes, 29 abril 2024"

    // Dividir la cadena de fecha en partes
    const partesFecha = datosAntesGuion.split(' ');
    const dia = partesFecha[1];
    const mesTexto = partesFecha[2];
    const año = partesFecha[3];

    // Diccionario para convertir el nombre del mes en español a su correspondiente número
    const meses = {
        "enero": "01",
        "febrero": "02",
        "marzo": "03",
        "abril": "04",
        "mayo": "05",
        "junio": "06",
        "julio": "07",
        "agosto": "08",
        "septiembre": "09",
        "octubre": "10",
        "noviembre": "11",
        "diciembre": "12"
    };

    // Obtener el número del mes
    const mesFormateado = meses[mesTexto.toLowerCase()];

    // Obtener los últimos dos dígitos del año
    const añoFormateado = año.substring(2, 4);

    // Crear la cadena de fecha en el formato deseado
    return `${dia}/${mesFormateado}/${añoFormateado}`;
}

function ObtenerHora(fechaHoraInicial) {

    // Encontrar el índice del guion
    const indiceGuion = fechaHoraInicial.indexOf('-');

    // Tomar los datos después del guion (incluyendo el guion)
    const hora12 = fechaHoraInicial.substring(indiceGuion + 1).trim();// Salida: "4:23 p.m."

    // Dividir la cadena de hora en partes: horas, minutos y período (a.m. o p.m.)
    const partesHora = hora12.split(' ');

    // Separar las horas y los minutos
    const [hora, minutos] = partesHora[0].split(':');

    // Convertir la hora a un número entero
    let hora24 = parseInt(hora);

    // Si es p.m. y no es medianoche, agregar 12 horas
    if (partesHora[1] === 'p.m.' && hora24 !== 12) {
        hora24 += 12;
    }

    // Si es medianoche en formato de 12 horas, la hora en formato de 24 horas es 00
    if (partesHora[1] === 'a.m.' && hora24 === 12) {
        hora24 = 0;
    }

    // Formatear la hora de 24 horas y los minutos
    const hora24Formateada = hora24.toString().padStart(2, '0');
    const minutosFormateados = minutos.padStart(2, '0');

    // Devolver la hora en formato de 24 horas
    return `${hora24Formateada}:${minutosFormateados}`;
}

function ObtenerDateTime(fechaHoraInicial) {

    return ObtenerFecha(fechaHoraInicial) + ' ' + ObtenerHora(fechaHoraInicial);
}