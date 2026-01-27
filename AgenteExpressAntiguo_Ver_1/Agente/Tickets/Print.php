<?php


header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once 'fpdf/fpdf.php'; 
require_once '../php/Utilitarios.php';
// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validar si se recibió la data
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Datos inválidos"]);
    exit;
}



$cod_agente = $data['cod_agen'] ?? '';


$datoAfiliado = buscarAfiliado($cod_agente);


//Detalles comunes
$TipoOp = $data['tipo_oper'] ?? '';
//$Entidad = isset($data['Entidad']) ? $data['Entidad'] : '';
$NumOpI = $data['cod_oper'] ?? '';
$NumOpE = $data['nro_oper'] ?? '';
$FechaOp = $data['fechaOperacion'] ?? '';


// Cargos con formato decimal asegurado
$Importe = number_format(floatval($data['importe'] ?? 0.00), 2, '.', '');
$Comision = number_format(floatval($data['comision'] ?? 0.00), 2, '.', '');
$MontoTotal = number_format(floatval($data['montototal'] ?? 0.00), 2, '.', '');



//Pago de Servicios

$categoria = $data["detalle"]["datos_hijo"]["categoria"] ?? '';
$servicio = $data["detalle"]["datos_hijo"]['servicio'] ?? '';
$empresa = $data["detalle"]["datos_hijo"]['empresa']??  '';
$NumRecibo = $data["detalle"]["datos_hijo"]['numero_recibo'] ?? '';
$CodUser = $data["detalle"]["datos_hijo"]['codigousuario'] ?? '';
$Titular = $data["detalle"]["datos_hijo"]['titular'] ?? '';

//Depositos
$BancoDestinoDep = $data["detalle"]["datos_hijo"]['nro_cuenta_remi'] ?? '';
$TitutalDep = $data["detalle"]["datos_hijo"]['titular'] ?? '';
$NumCuenta = $data["detalle"]["datos_hijo"]['nro_cuenta_dest'] ?? '';

//Pago Tarjetas de Credito
$BancoDestinoTC = $data["detalle"]["datos_hijo"]['entidad_benf'] ?? '';
$NumTarj = $data["detalle"]["datos_hijo"]['nro_tarjeta'] ?? '';
$TitularTarj = $data["detalle"]["datos_hijo"]['beneficiario'] ?? '';

//Giros
$BancoDestinoGiro = $data["detalle"]["datos_hijo"]['banco_desino'] ?? '';
$DNIBeneficiario = $data["detalle"]["datos_hijo"]['dni'] ?? '';
$NomBeneficiario = $data["detalle"]["datos_hijo"]['beneficiario'] ?? '';

//Retiros
$TipoRetiro = $data["detalle"]["datos_hijo"]['tipo_retiro'] ?? '';


//Interfaz Impresora


$pdf = new FPDF('P','mm', array(58,110));
$pdf->AddPage();
$pdf->SetMargins(3,3,3);
$pdf->SetFont('Arial','B',7);

$pdf->Image('images/logo.png', 10,2,40);

$pdf->Ln(4);

$pdf->Cell(55,4, 'AGENTE MULTIBANCO EXPRESS',0,1,'C');
//VolverDinamico
$pdf->Cell(55,4, mb_convert_encoding($datoAfiliado["data"]["nombre_comercial"],'ISO-8859-1','UTF-8'),0,1,'C');
//VolverDinamico
$pdf->Cell(55,4,$cod_agente,0,1,'C');

$pdf->Ln(1);
$pdf->Cell(25,4,'FECHA/HORA:', 0, 0,'L');
$pdf->Cell(35,4,$FechaOp,0,0,'L');

$pdf->Ln(3);
$pdf->Cell(12,4,'Nro.Ope:', 0, 0,'L');

$pdf->Cell(12,4,$NumOpI, 0, 0,'L');
$pdf->Cell(12,4,'OPEex:',0,0,'L');
$pdf->Cell(17,4,$NumOpE,0,0,'L');

$pdf->Ln(5);

switch ($TipoOp) {
    case "PAGO DE SERVICIOS":

        $pdf->Cell(50,3,'--------------'. $TipoOp . '--------------', 0,1,'C');
        
        $pdf->Ln(1);
        $pdf->Cell(17,4, mb_convert_encoding('CATEGORÍA','ISO-8859-1','UTF-8'), 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4, mb_convert_encoding($categoria,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(17,4,'SERVICIO', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4, mb_convert_encoding($servicio,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(17,4,'EMPRESA', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4, mb_convert_encoding($empresa,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(17,4,'COD. USER', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4,$CodUser,0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(17,4,'TITULAR', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4, mb_convert_encoding($Titular,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(17,4,'Nro. RECIBO', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(40,4,$NumRecibo,0,0,'L');
        break;
        
    case "DEPÓSITOS":
        
        $pdf->Cell(50,3, mb_convert_encoding('---------------------'. $TipoOp . '---------------------','ISO-8859-1','UTF-8'), 0, 1,'C');
        
        $pdf->Ln(1);
        $pdf->Cell(18,4, mb_convert_encoding('BCO.DESTINO','ISO-8859-1','UTF-8'), 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($BancoDestinoDep,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'NOM. TITULAR', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($TitutalDep,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'NUM. CUENTA', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4,$NumCuenta,0,0,'L');
        break;

    case "PAGO DE TARJETA":
        
        $pdf->Cell(50,3, mb_convert_encoding('-------'. $TipoOp . '--------','ISO-8859-1','UTF-8'), 0, 1,'C');
        
        $pdf->Ln(1);
        $pdf->Cell(18,4, mb_convert_encoding('BCO.DESTINO','ISO-8859-1','UTF-8'), 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(38,4, mb_convert_encoding($BancoDestinoTC,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'NUM.TARJETA', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4,$NumTarj,0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'NOM.TITULAR', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($TitularTarj,'ISO-8859-1','UTF-8'),0,0,'L');
        break;
    
    case "GIROS":
        
        $pdf->Cell(50,3,'-------------------------'. $TipoOp . '-------------------------', 0,1,'C');
        
        $pdf->Ln(1);
        $pdf->Cell(18,4, mb_convert_encoding('BCO.DESTINO','ISO-8859-1','UTF-8'), 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($BancoDestinoGiro,'ISO-8859-1','UTF-8'),0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'DNI BENEFIC', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4,$DNIBeneficiario,0,0,'L');
        
        $pdf->Ln(3);
        $pdf->Cell(18,4,'NOM.BENEFIC', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($NomBeneficiario,'ISO-8859-1','UTF-8'),0,0,'L');
        break;

    case "RETIROS":
        
        $pdf->Cell(50,3,'------------------------'. $TipoOp . '------------------------', 0,1,'C');
        
        /*$pdf->Ln(1);
        $pdf->Cell(18,4,'MODALIDAD', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($Entidad,'ISO-8859-1','UTF-8'),0,0,'L');
        */
        $pdf->Ln(3);
        $pdf->Cell(18,4,'TIPO RETIRO', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4, mb_convert_encoding($TipoRetiro,'ISO-8859-1','UTF-8'),0,0,'L');
        
        /*$pdf->Ln(3);
        $pdf->Cell(18,4,'NUM.TARJETA', 0, 0,'L');
        $pdf->Cell(2,4,':', 0, 0,'L');
        $pdf->Cell(39,4,$NumTarjetaRetiro,0,0,'L');
        break;*/
    }


$pdf->Ln(4);
$pdf->Cell(50,2,'------------------------------------------------------------', 0,1,'C');

$pdf->Ln(1);
$pdf->Cell(20,4,'IMPORTE', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,$Importe,0,0,'R');

$pdf->Ln(3);
$pdf->Cell(20,4, mb_convert_encoding('COMISIÓN','ISO-8859-1','UTF-8'), 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,$Comision,0,0,'R');

$pdf->Ln(3);
$pdf->Cell(20,4,'MONTO TOTAL', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,$MontoTotal,0,0,'R');

$pdf->Ln(4);
$pdf->Cell(50,2,'------------------------------------------------------------', 0,1,'C');
$pdf->Ln(4);
$pdf->Cell(55,3, mb_convert_encoding('GRACIAS POR REALIZAR SU','ISO-8859-1','UTF-8'),0,1,'C');
$pdf->Cell(55,3, mb_convert_encoding('OPERACIÓN EN NUESTRA','ISO-8859-1','UTF-8'),0,1,'C');
$pdf->Cell(55,3, mb_convert_encoding('RED DE AGENTES EXPRESS','ISO-8859-1','UTF-8'),0,1,'C');

$pdf->Output();

?>