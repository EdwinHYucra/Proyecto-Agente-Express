<?php
    header('Content-Type: application/json');
    $host = "104.237.138.218"; // El nombre del host de la base de datos
    $user = "factura3_default_page"; // El nombre de usuario de la base de datos
    $password = "170516FER2810@"; // La contraseña de la base de datos
    $database = "factura3_agenteexpress_db"; // El nombre de la base de datos

    $conexion = new mysqli($host, $user, $password, $database);
    
    // Verificar la conexión
    if($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    // Establecer la codificación de caracteres UTF-8
    $conexion->set_charset("utf8");

    // Llamada al Stored Procedure sin parámetros
    $sql = "CALL `sp_listarTipoNegocios`();"; // Ajusta el nombre del procedimiento
    // Preparar la sentencia
    $resultado = $conexion->query($sql);

    if (!$resultado) {
        die("Error en la ejecución del Stored Procedure: " . $conexion->error);
    }
    
    // Convertir resultados a un array asociativo
    $resultados = array();
    while ($fila = $resultado->fetch_assoc()) {
        $resultados[] = $fila;
    }

    // Convertir valores a UTF-8 si es necesario
    /*foreach ($resultados as &$fila) {
        foreach ($fila as &$valor) {
            $valor = utf8_encode($valor);
        }
    }*/

    // Convertir resultados a JSON
    $json = json_encode($resultados);
    if ($json === false) {
        die("Error en la codificación JSON: " . json_last_error_msg());
    }
    //$json = utf8_encode($json);
    // Enviar JSON como respuesta
    echo $json;
    
    // Cerrar conexión
    $conexion->close();
?>