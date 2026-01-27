<?php

require 'fpdf/fpdf.php'; 

$pdf = new FPDF('P','mm', array(58,110));
$pdf->AddPage();
$pdf->SetMargins(3,3,3);
$pdf->SetFont('Arial','B',7);

$pdf->Image('images/logo.png', 10,2,40);

$pdf->Ln(4);

$pdf->Cell(55,4, 'AGENTE MULTIBANCO EXPRESS',0,1,'C');
$pdf->Cell(55,4, mb_convert_encoding('LIBRERÍA FERDI','ISO-8859-1','UTF-8'),0,1,'C');
$pdf->Cell(55,4, 'CGDT-170501',0,1,'C');

$pdf->Ln(1);
$pdf->Cell(25,4,'FECHA/HORA:', 0, 0,'L');
$pdf->Cell(35,4,'29/06/2024  17:07:05',0,0,'L');

$pdf->Ln(3);
$pdf->Cell(12,4,'Nro.Ope:', 0, 0,'L');
$pdf->Cell(12,4,'00151', 0, 0,'L');
$pdf->Cell(12,4,'OPEex:',0,0,'L');
$pdf->Cell(17,4,'#00142476',0,0,'L');

$pdf->Ln(5);
$pdf->Cell(50,3,'--------------PAGO DE SERVICIOS--------------', 0,1,'C');

$pdf->Ln(1);
$pdf->Cell(17,4, mb_convert_encoding('CATEGORÍA','ISO-8859-1','UTF-8'), 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4, mb_convert_encoding('Telefonía','ISO-8859-1','UTF-8'),0,0,'L');

$pdf->Ln(3);
$pdf->Cell(17,4,'SERVICIO', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4, mb_convert_encoding('Entel pago con número','ISO-8859-1','UTF-8'),0,0,'L');

$pdf->Ln(3);
$pdf->Cell(17,4,'EMPRESA', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4, mb_convert_encoding('Entel Perú SA','ISO-8859-1','UTF-8'),0,0,'L');

$pdf->Ln(3);
$pdf->Cell(17,4,'COD. USER', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4,'922789962',0,0,'L');

$pdf->Ln(3);
$pdf->Cell(17,4,'TITULAR', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4, mb_convert_encoding('LUIS GOYZUETA LINARES','ISO-8859-1','UTF-8'),0,0,'L');

$pdf->Ln(3);
$pdf->Cell(17,4,'Nro. RECIBO', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(40,4,'SB02-0147175717',0,0,'L');

$pdf->Ln(4);
$pdf->Cell(50,2,'------------------------------------------------------------', 0,1,'C');

$pdf->Ln(1);
$pdf->Cell(20,4,'IMPORTE', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,'46.72',0,0,'R');

$pdf->Ln(3);
$pdf->Cell(20,4, mb_convert_encoding('COMISIÓN','ISO-8859-1','UTF-8'), 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,'1.00',0,0,'R');

$pdf->Ln(3);
$pdf->Cell(20,4,'MONTO TOTAL', 0, 0,'L');
$pdf->Cell(2,4,':', 0, 0,'L');
$pdf->Cell(17,4,'S/', 0, 0,'R');
$pdf->Cell(12,4,'47.72',0,0,'R');

$pdf->Ln(4);
$pdf->Cell(50,2,'------------------------------------------------------------', 0,1,'C');
$pdf->Ln(4);
$pdf->Cell(55,3, mb_convert_encoding('GRACIAS POR REALIZAR SU','ISO-8859-1','UTF-8'),0,1,'C');
$pdf->Cell(55,3, mb_convert_encoding('OPERACIÓN EN NUESTRA','ISO-8859-1','UTF-8'),0,1,'C');
$pdf->Cell(55,3, mb_convert_encoding('RED DE AGENTES EXPRESS','ISO-8859-1','UTF-8'),0,1,'C');

$pdf->Output();