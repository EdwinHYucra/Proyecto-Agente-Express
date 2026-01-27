<?php
require_once('config.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=UTF-8'); // Asegura respuesta JSON

session_start();

header('Content-Type: application/json; charset=UTF-8'); // Asegura respuesta JSON

$codigoAgente = $_SESSION['cod_agen'];

// Manejo de peticiones GET
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'obtenercajas':
            echo json_encode(obtener_cajas_chicas($codigoAgente)); // FUNCIÓN CORRECTA
            break;

        case 'verBalance':
            if (isset($_GET['id_caja'])) {
                echo json_encode(ver_balance_caja($_GET['id_caja']));
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Falta el ID de la caja.']);
            }
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
            break;
    }
};

// Manejo de peticiones POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty(file_get_contents("php://input"))) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['action'])) {
        $action = $data['action'];

        switch ($action) {
            case 'abrirCaja':
                if (isset($data['fechaApertura'], $data['montocuentaA'], $data['montoefectivoA'])) {
                    echo json_encode(apertura_caja_chica($codigoAgente, $data['fechaApertura'], $data['montocuentaA'], $data['montoefectivoA']));
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Faltan parámetros en la solicitud']);
                }
                break;

            case 'cerrarCaja':

                $id_caja = isset($data['id']) ? $data['id'] : null;

                if ($id_caja === null) {
                    echo json_encode(['status' => 'error', 'message' => 'El ID de la caja es nulo o no se recibió correctamente']);
                    exit;
                }

                echo json_encode(cierre_caja_chica($id_caja, $data['fechaCierre'], $data['montocuentaC'], $data['montoefectivoC']));
                break;

            case 'insertarDetalleCaja':
                if (isset($data['tipoDetalle'], $data['monto'],$data['nroOperacion'])) {
                    echo json_encode(insertar_detalle_caja($codigoAgente,$data['tipoDetalle'], $data['monto'],$data['nroOperacion']));
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Faltan parámetros para insertar el detalle en la caja']);
                }
                break;


            default:
                echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
                break;
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Acción no especificada']);
    }
};

function apertura_caja_chica($cod_agent, $fecha_aper, $monto_cue_aper, $monto_efe_aper) {
    try {
        //  Activar el modo estricto de MySQL para capturar excepciones
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        // Conectar a la base de datos
        $conn = open_connection();
        $conn->set_charset('utf8mb4');

        //  Validar la conexión
        if (!$conn) {
            throw new Exception('Connection failed: ' . mysqli_connect_error());
        }

        //  Validar el formato de la fecha antes de usarla
        $fecha_aper_f = DateTime::createFromFormat('Y-m-d H:i:s', $fecha_aper);
        if (!$fecha_aper_f) {
            throw new Exception("Formato de fecha incorrecto: " . $fecha_aper);
        }

        // Convertir valores a tipo decimal
        $monto_cue_aper_d = floatval($monto_cue_aper);
        $monto_efe_aper_d = floatval($monto_efe_aper);

        //  Preparar la consulta para llamar al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_InsertarCaja(?,?,?,?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vincular los parámetros
        $stmt->bind_param("ssdd", $cod_agent, $fecha_aper, $monto_cue_aper_d, $monto_efe_aper_d);

        //  Ejecutar la consulta
        $stmt->execute();

        //  Respuesta exitosa
        return [
            'status' => 'success',
            'message' => 'Caja abierta correctamente',
            'datos' => [
                'codigo_agente' => $cod_agent,
                'fecha_apertura' => $fecha_aper,
                'monto_cuenta_apertura' => $monto_cue_aper_d,
                'monto_efectivo_apertura' => $monto_efe_aper_d
            ]
        ];
    } catch (mysqli_sql_exception $e) {
        //  Capturar errores de MySQL (procedimientos almacenados)
        return [
            'status' => 'error',
            'message' => "Error en la base de datos: " . $e->getMessage()
        ];
    } catch (Exception $e) {
        //  Capturar errores generales (validación de fecha, conexión, etc.)
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    } finally {
        //  Cerrar el statement y la conexión si fueron creados
        if (isset($stmt)) $stmt->close();
        if (isset($conn)) $conn->close();
    }
}

function cierre_caja_chica($id_caja, $fecha_cierre, $monto_cuenta_cierre, $monto_efectivo_cierre) {
    
    try {
        // Activar el modo estricto de MySQL para capturar excepciones
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        // Conectar a la base de datos
        $conn = open_connection();
        $conn->set_charset('utf8mb4');

        // Validar la conexión
        if (!$conn) {
            throw new Exception('Connection failed: ' . mysqli_connect_error());
        }

        // Convertir monto a decimales
        $monto_cue_cier_d = floatval($monto_cuenta_cierre);
        $monto_efe_cier_d = floatval($monto_efectivo_cierre);

        //  Preparar la consulta para llamar al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_CerrarCaja(?,?,?,?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vincular los parámetros
        $stmt->bind_param("ssdd", $id_caja, $fecha_cierre, $monto_cue_cier_d, $monto_efe_cier_d);

        //  Ejecutar la consulta
        $stmt->execute();

        //  Respuesta exitosa
        return [
            'status' => 'success',
            'message' => 'Caja cerrada correctamente',
            'datos' => [
                'id_caja' => $id_caja,
                'fecha_cierre' => $fecha_cierre,
                'monto_cuenta_cierre' => $monto_cue_cier_d,
                'monto_efectivo_cierre' => $monto_efe_cier_d
            ]
        ];
    } catch (mysqli_sql_exception $e) {
        //  Capturar errores de MySQL (procedimientos almacenados)
        return [
            'status' => 'error',
            'message' => "Error en la base de datos: " . $e->getMessage()
        ];
    } catch (Exception $e) {
        //  Capturar errores generales
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    } finally {
        //  Cerrar la conexión y el statement si fueron creados
        if (isset($stmt)) $stmt->close();
        if (isset($conn)) $conn->close();
    }
}

function obtener_cajas_chicas($cod_agent){

    $conn = open_connection();

    if (!$conn) {
        // Retornar error de conexión como un array
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    };
    // Preparar la consulta para llamar al procedimiento almacenado
    $stmt = $conn->prepare("CALL sp_ConsultarCajasPorAfiliado(?)");
    
    // Vincular el parámetro
    $stmt->bind_param("s", $cod_agent);
    if($stmt->execute()){

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {

            $cajas_chicas = $result->fetch_all(MYSQLI_ASSOC);  // Esto obtiene todas las filas en un solo paso
            
            $result->free();

            return [
                'status' => 'success',
                'cajas' => $cajas_chicas
            ];
            
        }
        else {
            return [
                'status' => 'error',
                'message' => 'No se encontraron cajas.'
            ];
        };
    }
    else{
        return [
            'status' => 'error',
            'message' => 'No se puedo obtener un resultado de cajas: '. $stmt->error
        ];
    };

    // Cerrar la sentencia
    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);        
    

}
function buscar_caja_chica($_id_Caja){
    
    $conn = open_connection();

    if (!$conn) {
        // Retornar error de conexión como un array
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }
    // Preparar la consulta para llamar al procedimiento almacenado
    $stmt = $conn->prepare("CALL sp_ConsultarCajaPorID(?)");
    if ($stmt === false) {
            // Error en la preparación del statement
            $response = [
                'status' => 'error',
                'message' => 'Failed to prepare statement: ' . $conn->error
            ];
            echo json_encode($response);
            exit;
        }
    // Vincular el parámetro
    $stmt->bind_param("s", $_id_Caja);

    if ($stmt->execute()) {

        $result = $stmt->get_result();
    
        // Obtener solo la primera fila del resultado
        $caja_chica = $result->fetch_assoc(); // Obtiene solo la primera fila

        $result->free();
    
        if ($caja_chica) { // Verificar si se obtuvo un resultado
            return [
                'status' => 'success',
                'caja_chica' => $caja_chica // Aquí devolvemos la fila obtenida
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'No se encontraron caja.'
            ];
        };
    }
    else{
        return [
            'status' => 'error',
            'message' => 'No se obtuvo informacion: '. $stmt->error
        ];
    };

    // Cerrar la sentencia
    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);
}

function insertar_detalle_caja($codigoAgente, $tipoDetalle, $monto,$nro_Oper) {
    try {
        // Conectar a la base de datos
        $conn = open_connection();
        $conn->set_charset('utf8mb4');

        // Validar la conexión
        if (!$conn) {
            throw new Exception('Error de conexión: ' . mysqli_connect_error());
        }

        // Convertir monto a decimal
        $monto_decimal = floatval($monto);

        // Preparar la consulta para llamar al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_insertar_caja_detalle(?, ?, ?,?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vincular los parámetros
        $stmt->bind_param("ssds", $codigoAgente, $tipoDetalle, $monto_decimal,$nro_Oper);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return [
                'status' => 'success',
                'message' => 'Detalle de caja insertado correctamente',
            ];
        } else {
            throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
        }

    } catch (mysqli_sql_exception $e) {
        return [
            'status' => 'error',
            'message' => "Error en la base de datos: " . $e->getMessage()
        ];
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    } finally {
        // Cerrar la conexión y el statement si fueron creados
        if (isset($stmt)) $stmt->close();
        if (isset($conn)) $conn->close();
    }
}

// ✅ Nueva función para obtener el balance de la caja
function ver_balance_caja($id_caja) {
    try {
        $conn = open_connection();
        $conn->set_charset('utf8mb4');

        if (!$conn) {
            throw new Exception('Error de conexión: ' . mysqli_connect_error());
        }

        // Preparar la consulta para ejecutar el procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_calcular_balance_caja(?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vincular el parámetro
        $stmt->bind_param("i", $id_caja);
        $stmt->execute();

        // Obtener resultados
        $result = $stmt->get_result();

        if (!$result || $result->num_rows === 0) {
            throw new Exception("No se encontraron datos de balance para la caja.");
        }

        $balance = $result->fetch_assoc();
        $stmt->close();
        $conn->close();

        return [
            'status' => 'success',
            'datos' => $balance
        ];

    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    }
}

?>