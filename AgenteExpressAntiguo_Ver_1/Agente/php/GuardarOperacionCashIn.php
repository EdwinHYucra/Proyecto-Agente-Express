<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
// Permitir solicitudes desde cualquier origen (para desarrollo)
header('Access-Control-Allow-Origin: *');

// Permitir métodos HTTP específicos
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

// Permitir encabezados específicos
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Si la solicitud es de tipo OPTIONS (preflight), simplemente devolver una respuesta vacía
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Se podría responder con un 200 para que la solicitud preflight sea exitosa
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

// Procesar datos
$data = json_decode(file_get_contents("php://input"), true);

// Verificar que los datos sean válidos
/*if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos']);
    exit;
}

try {
    // Código para guardar en base de datos (reemplazar con tu lógica)
    // $pdo->prepare(...);
    // $stmt->execute(...);

    echo json_encode(['status' => 'success', 'message' => 'Operación guardada con éxito']);
} catch (Exception $e) {
    // Si ocurre un error al guardar, devolverlo
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar la operación: ' . $e->getMessage()]);
}

exit;*/


session_start();
include('config.php'); // Incluir el archivo de configuración

// Recibir los datos JSON del fetch
$input = file_get_contents('php://input');

// Decodificar el JSON en un arreglo asociativo de PHP
$datos = json_decode($input, true);

// Abrir la conexión
$conn = open_connection();

$conn->set_charset('utf8mb4');

if (!$conn) {
    // Enviar error de conexión en formato JSON
    $response = [
        'status' => 'error',
        'message' => 'Connection failed: ' . mysqli_connect_error()
    ];
    echo json_encode($response);
    exit;
}

// Obtener los datos del formulario
$codigoAgente = $_SESSION['cod_agen'];

// Verificar si hay caja abierta antes de continuar
if (!tieneCajaAbierta($codigoAgente, $conn)) {
    echo json_encode(['status' => 'error', 'message' => 'Debe aperturar una caja antes de realizar una operación.']);
    exit;
}

$db_NroCuentaAfiliado = obtenerNroCuentaAfiliado($codigoAgente,$conn);

// Verificar si los datos fueron recibidos correctamente
if ($datos) {
    // Accedemos a los datos generales y los datos de cargo
    $datosGenerales = $datos['datosGenerales'];
    $datosOperacion = $datos['datosOperacion'];
    $datosCargo = $datos['datosCargo'];

    // Extraer los campos
    $tipoOperacion = $datosGenerales['TipoOperacion'];
    $entidadPrestataria = $datosGenerales['EntidadPrestataria'];
    $nOperacionBancario = $datosGenerales['NOperacionBancario'];
    $NroCuentaOperacion = $datosGenerales['NroCuentaOperacion'];

    //Validacion de numero de operaciones
    if($NroCuentaOperacion == $db_NroCuentaAfiliado['ultimos_digitos'] || 
    $NroCuentaOperacion == $db_NroCuentaAfiliado['nro_Oper_iziPay']){

        // Convertir la fecha de la operación a formato MySQL
    
        if($tipoOperacion == "RETIROS"){
            
            // Eliminar el guion y espacio
            $fechaSinGuion = str_replace(" - ", " ", $datosGenerales['FechayHora']);
            
            // Convertir la fecha de la operación a formato MySQL
            $fechaYHora = DateTime::createFromFormat('d/m/Y H:i:s', $fechaSinGuion);
            if ($fechaYHora === false) {
                die("Error en el formato de la fecha y hora.");
            }
        
            $fechaYHora = $fechaYHora->format('Y-m-d H:i:s');
            //echo $fechaYHora;

        }
        else{
            // Convertir la fecha de la operación a formato MySQL
            $fechaYHora = DateTime::createFromFormat('d/m/y H:i', $datosGenerales['FechayHora']);
            $fechaYHora = $fechaYHora->format('Y-m-d H:i:s'); // Asegura que el formato sea 'Y-m-d H:i:s'
            //echo $fechaYHora;
        }
    
    
        if ($fechaYHora === false) {
            // Manejo de error si el formato es incorrecto
            die("Error en el formato de la fecha y hora.");
        }
        
        $importe = floatval($datosCargo['Importe']);
        $comision = floatval($datosCargo['Comision']);
        $montoTotal = floatval($datosCargo['MontoTotal']);

        // Convertir el JSON de datos de operación a un string
        $dataOperacionString = json_encode($datosOperacion);
        //echo "<script>console.log(".json_encode($datosOperacion).")</script>";

        // Preparar la consulta para llamar al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_GuardarOperaciones_Cash_In(?,?,?,?,?,?,?,?,?)");
        if ($stmt === false) {
            // Error en la preparación del statement
            $response = [
                'status' => 'error',
                'message' => 'Failed to prepare statement: ' . $conn->error
            ];
            echo json_encode($response);
            exit;
        }

        //echo $tipoOperacion;
        // Asociar los parámetros a la consulta
        $stmt->bind_param("sssssddss", $codigoAgente, $tipoOperacion, $entidadPrestataria, $nOperacionBancario, $importe, $comision, $montoTotal, $fechaYHora, $dataOperacionString);

        if (!$stmt->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Error al ejecutar: ' . $stmt->error]);
            exit;
        }

        // Recuperar la respuesta del procedimiento almacenado directamente
        $result = $stmt->get_result();
        $stmt->close();

        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Operación registrada correctamente',
                'operacion' => json_decode($row['resultado'], true) // Convertir JSON a array PHP
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se pudo obtener la operación después de guardarla.']);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'El número de cuenta no coincide con los registros.',
            'indications' => 'Contactar a soporte'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No se recibieron los datos correctamente'
    ]);
}

// Cerrar la conexión si sigue activa
if ($conn) {
    $conn->close();
}

function obtenerNroCuentaAfiliado($codigo_agente, $conn){
    
    $stmt2 = $conn->prepare("CALL sp_obtener_nro_cuentas(?)");
    if ($stmt2 === false) {
        // Error en la preparación del statement
        $response = [
            'status' => 'error',
            'message' => 'Failed to prepare statement: ' . $conn->error
        ];
        echo json_encode($response);
        exit;
    }
    // Asociar los parámetros a la consulta
    $stmt2->bind_param("s",$codigo_agente);

    // Ejecutar la consulta
    if ($stmt2->execute()) {
        // Al ejecutar el procedimiento, obtener los resultados
        $result = $stmt2->get_result();
        
        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            // Almacenar los resultados en un array
            // Obtener la primera fila
            $row = $result->fetch_assoc();

            // Almacenar ambos valores en un solo array asociativo
            $datos_combinados = [
                'ultimos_digitos' => $row['ultimos_digitos'],
                'nro_Oper_iziPay' => $row['nro_Oper_iziPay']
            ];

            // Liberar el result set
            $result->free();

            return $datos_combinados;
        }
        else{
            return null;
        }
    }
    else {
        // Error en la ejecución del statement
        $response = [
            'status' => 'error',
            'message' => 'Error al ejecutar el procedimiento: ' . $stmt2->error
        ];
    }
    $stmt2->close();
}

function tieneCajaAbierta($codigo_agente, $conn) {
    $stmt = $conn->prepare("CALL sp_verificar_caja_abierta(?)");
    $stmt->bind_param("s", $codigo_agente);
    $stmt->execute();
    $result = $stmt->get_result();
    $tieneCaja = $result->num_rows > 0;
    $stmt->close();
    return $tieneCaja;
}
?>

