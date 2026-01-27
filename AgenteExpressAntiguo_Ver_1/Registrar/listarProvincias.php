<?php
if (isset($_POST['setid'])){

    $host = "104.237.138.218"; // El nombre del host de la base de datos
    $user = "factura3_default_page"; // El nombre de usuario de la base de datos
    $password = "170516FER2810@"; // La contraseña de la base de datos
    $database = "factura3_agenteexpress_db"; // El nombre de la base de datos

    $parametro = $_POST['setid'];

    //echo("<script>console.log(".$parametro.")</script>");
    $conexion = new mysqli($host, $user, $password, $database);
    
    // Verificar la conexión
    if($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
        
    }
    // Llamada al Stored Procedure sin parámetros
    $sql = "Call sp_listarProvincia(?)"; // Ajusta el nombre del procedimiento
    // Preparar la sentencia
    $sentencia = $conexion->prepare($sql);
    // Vincular el parámetro
    $sentencia->bind_param("i", $parametro);
    // Ejecutar la sentencia
    $sentencia->execute();
    // Obtener resultados
    $resultado = $sentencia->get_result();

    if (!$resultado) {
        die("Error en la ejecución del Stored Procedure: " . $conexion->error);
    }
    
    // Convertir resultados a un array asociativo
    $resultados = array();
    while ($fila = $resultado->fetch_assoc()) {
        $resultados[] = $fila;
    }
    
    // Convertir a JSON
    $json = json_encode($resultados);
    
    // Mostrar JSON
    echo $json;
    
    // Cerrar conexión
    $conexion->close();
}
else{
    header('Location: /register.html');
}
?>