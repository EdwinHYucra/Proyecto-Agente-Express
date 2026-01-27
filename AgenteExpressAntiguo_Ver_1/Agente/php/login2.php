<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include('config.php'); // Incluir el archivo de configuración

// Obtener los datos del formulario
$correo = $_POST['usuario'];
$clave = $_POST['contrasenia'];

// Abrir la conexión
$conn = open_connection();

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Preparar la consulta para llamar al procedimiento almacenado
$query = "CALL verificar_credenciales(?, ?)";

if ($stmt = $conn->prepare($query)) {
    // Si la consulta se preparó correctamente, vinculamos los parámetros de entrada
    $stmt->bind_param("ss", $correo, $clave);
    $stmt->execute();

    // Obtener el resultado
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Si se devuelve un resultado, verificamos que no sea NULL (credenciales incorrectas)
        $row = $result->fetch_assoc();

        if ($row['correo'] !== NULL) {
            // El usuario está autenticado
            $_SESSION['correo'] = $row['correo'];
            $_SESSION['nombre'] = $row['nombre'];
            $_SESSION['cod_agen'] = $row['cod_agen'];

            // Redirigir a index.php
            header("Location: ../index.php");
            exit();
        } else {
            // Credenciales incorrectas
            header("Location: ../../login.html?error=1");
            exit();
        }
    } else {
        // Si no se devuelve ningún resultado (algo inesperado), redirigir con error genérico
        header("Location: ../../login.html?error=2");
        exit();
    }

    // Cerrar el statement
    $stmt->close();
} else {
    // Si la preparación del statement falla, mostramos el error
    echo "Error en la consulta SQL: " . $conn->error;
}

// Cerrar la conexión
close_connection($conn);
?>