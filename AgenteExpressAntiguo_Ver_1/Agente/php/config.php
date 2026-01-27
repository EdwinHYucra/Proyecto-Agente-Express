<?php
// Definimos las constantes para conexión
define('DB_SERVER',   'localhost');
define('DB_USER',     'factura3_default_page');
define('DB_PASSWORD', '170516FER2810@');

// Nombres de bases de datos
define('DB_CORE', 'factura3_agenteexpress_db');
define('DB_AUTH', 'factura3_agenteexpress_auth');

// ✅ Función para abrir conexión a cualquier base usando constantes
function open_connection($dbname = DB_CORE) {
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión a la base '$dbname': " . $conn->connect_error);
    }

    return $conn;
}

// ✅ Cierre de conexión
function close_connection($conn) {
    if ($conn) {
        $conn->close();
    }
}
?>