<?php   
    // Habilitar reporte de errores
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
// Verificar si se recibieron todos los campos esperados
if (
    isset($_POST['txtEmal']) &&
    isset($_POST['txtName']) &&
    isset($_POST['txtLastnameP']) &&
    isset($_POST['txtLastnameM']) &&
    isset($_POST['txtDNI']) &&
    isset($_POST['slcpais']) &&
    isset($_POST['slcdepa']) &&
    isset($_POST['slcprov']) &&
    isset($_POST['slcdist']) &&
    isset($_POST['txtPhone']) &&
    isset($_POST['slcTypeBusiness']) &&
    isset($_POST['txtAddressBusiness']) &&
    isset($_POST['q1']) &&
    isset($_POST['q2'])
) {
    
    $nombre = $_POST['txtName'];
    $apellidoPaterno = $_POST['txtLastnameP'];
    $apellidoMaterno = $_POST['txtLastnameM'];
    $tdoc = 1; 
    $ndoc = $_POST['txtDNI'];
    $ncel = $_POST['txtPhone'];
    $email = $_POST['txtEmal'];
    $tiponegocio = $_POST['slcTypeBusiness'];
    $direccion = $_POST['txtAddressBusiness'];
    if(isset($_POST['txtRUC'])){
        $ruc = $_POST['txtRUC'];
    }
    else {
        $ruc = "";
    }
    $pregunta1 = boolval($_POST['q1']);
    $pregunta2 = boolval($_POST['q2']);
    $pais = $_POST['slcpais'];
    $departamento = $_POST['slcdepa'];
    $provincia = $_POST['slcprov'];
    $distrito = $_POST['slcdist'];
    
    // Establecer la zona horaria de Perú
    date_default_timezone_set('America/Lima');
    $fecharegistro = date("d/m/y H:i:s");


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
    $sql = "Call sp_registrarUsuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
    // Preparar la sentencia
    $sentencia = $conexion->prepare($sql);
    // Vincular el parámetro
    $sentencia->bind_param("sssisssissbbiiiis", $nombre,$apellidoPaterno,$apellidoMaterno,$tdoc,$ndoc,$ncel,$email,$tiponegocio,$direccion,$ruc,$pregunta1,$pregunta2,$pais,$departamento,$provincia,$distrito, $fecharegistro);
    // Ejecutar la sentencia
    if (!$sentencia->execute()) {
        // Si hay un error al ejecutar la sentencia
        $sentencia->close();
        $conexion->close();
        echo "Error al ejecutar la consulta: " . mysqli_error($conexion);
    } else {
        // Si se ejecuta correctamente
        $sentencia->close();
        $conexion->close();
        echo "<script> alert('Usuario Registrado Correctamente, nos contactaremos contigo a la brevedad posible.');
                      window.location.href = '../index.html';</script>";
    }

    
} else {

    header("Location: ../register.html");
    exit(); // Terminar la ejecución del script
}

?>