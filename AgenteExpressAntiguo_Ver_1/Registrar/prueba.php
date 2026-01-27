<?php
$host = "104.237.138.218"; // El nombre del host de la base de datos
$user = "factura3_default_page"; // El nombre de usuario de la base de datos
$password = "170516FER2810@"; // La contraseña de la base de datos
$database = "factura3_agenteexpress_db"; // El nombre de la base de datos

$conexion = new mysqli($host, $user, $password, $database);

// Verificar la conexión
if($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Llamada al Stored Procedure sin parámetros
$sql = "Call sp_listarTipoNegocios()"; // Ajusta el nombre del procedimiento

// Preparar la sentencia
if ($resultado = $conexion->query($sql)) {
    $resultados = array();
    while ($fila = $resultado->fetch_assoc()) {
        $resultados[] = $fila;
    }
    // Convertir a JSON
    //$json_resultados = json_encode($resultados);
    echo "<script>console.log('Resultados:', ".$resultados['id'].");</script>";
    
    // Cerrar el procedimiento y la conexión
    $resultado->close();
} else {
    // En caso de error al ejecutar el SP
    echo "<script>console.log('Error ejecutando el Stored Procedure:', '" . $conexion->error . "');</script>";
}

$conexion->close();
    
?>