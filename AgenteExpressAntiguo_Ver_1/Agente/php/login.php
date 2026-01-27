<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include('config.php'); // Incluir el archivo de configuración

// Obtener los datos del formulario
$correo = $_POST['correo'];
$clave = $_POST['clave'];

// Abrir la conexión
$conn = open_connection();

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Depuración: Verificar la conexión
//echo "Conexión exitosa";

// Llamar al procedimiento almacenado
$sql = "CALL verificar_credenciales2(?, ?, @p_nombre, @p_cod_agen, @p_status)";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error al preparar la consulta: " . $conn->error);
}

$stmt->bind_param("ss", $correo, $clave);
$stmt->execute();

// Obtener los valores de salida del procedimiento almacenado
$result = $conn->query("SELECT @p_nombre, @p_cod_agen, @p_status");
$row = $result->fetch_assoc();

$nombre = $row['@p_nombre'];
$cod_agen = $row['@p_cod_agen'];
$status = $row['@p_status'];

if ($status == 'exito') {
    // El usuario está autenticado
    $_SESSION['correo'] = $correo;
    $_SESSION['nombre'] = $nombre;
    $_SESSION['cod_agen'] = $cod_agen;

    header("Location: ../index.php");
    exit(); 
} elseif ($status == 'cuenta_bloqueada') {
    // Usuario bloqueado
    echo "Cuenta bloqueada. Demasiados intentos fallidos.";
} else {
    //echo("<script>console.log('".$status.",".$correo."')</script>");

    header("Location: ../../login.html?error=1");
    var_dump($status); // Depuración adicional
    exit();
}

// Cerrar la conexión
close_connection($conn);
?>