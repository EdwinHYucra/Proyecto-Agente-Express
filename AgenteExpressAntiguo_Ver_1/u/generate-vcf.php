<?php
// Configuración del contacto
$name = "Rose Salón & Spa";
$phone = "+51 994716416";
$email = "bustamanterose2020@gmail.com";
$website = "https://facebook.com/SalonySpaROSE";
$imagePath = "IMG/LogoSalon.png"; // Cambia esto a la ruta real de la imagen

$imageData = base64_encode(file_get_contents($imagePath));
$imageType = pathinfo($imagePath, PATHINFO_EXTENSION); // Obtiene la extensión (ejemplo: jpeg o png)

// Contenido del archivo VCF
$vcfContent = "BEGIN:VCARD\n";
$vcfContent .= "VERSION:3.0\n";
$vcfContent .= "FN:$name\n";
$vcfContent .= "NICKNAME:Salon Rose\n";
$vcfContent .= "TITLE:Cosmetóloga - Cosmiatra\n";
$vcfContent .= "ORG:Rose Salón & Spa\n";
$vcfContent .= "WORK:$phone\n";
$vcfContent .= "EMAIL:$email\n";
$vcfContent .= "ADR;TYPE=WORK:;;Av. Lima 716;Mariano Melgar;Arequipa;04006;Perú\n";
$vcfContent .= "URL:$website\n";
$vcfContent .= "PHOTO;ENCODING=b;TYPE=$imageType:$imageData\n"; // Incrusta la foto aquí
$vcfContent .= "NOTE:Salón & Spa Rose, Servicio de calidad y garantía.\n";
$vcfContent .= "BDAY:1990-02-01\n";
$vcfContent .= "END:VCARD";

// Establece los encabezados para la descarga
header('Content-Type: text/vcard');
header('Content-Disposition: attachment; filename="contacto.vcf"');
header('Content-Length: ' . strlen($vcfContent));

// Envía el contenido
echo $vcfContent;
exit;
?>
