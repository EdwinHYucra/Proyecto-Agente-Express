<?php 

if (
    isset($_POST['txtnombre']) &&
    isset($_POST['txtapellido']) &&
    isset($_POST['prefijo']) &&
    isset($_POST['txtnumero']) &&
    isset($_POST['txtcorreo']) &&
    isset($_POST['txtmensaje'])
){
    $txtnombre = $_POST['txtnombre'];
    $txtapellido = $_POST['txtapellido'];
    $prefijo = $_POST['prefijo'];
    $txtnumero = $_POST['txtnumero'];
    $txtcorreo = $_POST['txtcorreo'];
    $txtmensaje = $_POST['txtmensaje'];
    
    // Establecer la zona horaria de Perú
    date_default_timezone_set('America/Lima');
    
    $fechacontacto = date("d/m/y H:i:s");

    $jsontexto = array('mensaje'=> $txtmensaje);
    $jsonData = json_encode($jsontexto);

    $fullname = $txtnombre . ' ' . $txtapellido;
    $numero = $prefijo. ' '.$txtnumero;

    $host = "104.237.138.218"; // El nombre del host de la base de datos
    $user = "factura3_default_page"; // El nombre de usuario de la base de datos
    $password = "170516FER2810@"; // La contraseña de la base de datos
    $database = "factura3_agenteexpress_db"; // El nombre de la base de datos

    try {
        
        $conn = mysqli_connect($host, $user, $password, $database);
        // Verificar la conexión
        if ($conn->connect_error) {
            throw new Exception("Conexión fallida: " . $conn->connect_error);
        }
    
        // Llamar al procedimiento almacenado
        $sql = "CALL Insertar_UC(?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
    
        // Asignar valores a los parámetros del procedimiento almacenado    
        $stmt->bind_param("sssss", $fullname, $numero, $txtcorreo, $jsonData, $fechacontacto);
    
        // Ejecutar el procedimiento almacenado
        $stmt->execute();
    
        // Cerrar la conexión
        $stmt->close();
        $conn->close();

        echo("<script>alert('Formulario enviado correctamente'); 
        window.location.href = '../index.html';</script>");
        exit();
    } 
    catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}
else{
    //echo('<script>alert("Campos vacios")</script>');
    header('Location: ../Pages/contactos.php');
}
?>