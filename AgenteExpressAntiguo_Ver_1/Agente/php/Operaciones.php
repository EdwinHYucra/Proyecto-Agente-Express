<?php
require_once('config.php'); // Asegura la conexión a la base de datos

header('Content-Type: application/json; charset=UTF-8'); // Formato JSON

session_start();

// Obtener el código de agente desde la sesión
$codigoAgente = isset($_SESSION['cod_agen']) ? $_SESSION['cod_agen'] : null;

if (!$codigoAgente) {
    echo json_encode(['status' => 'error', 'message' => 'No se ha iniciado sesión correctamente.']);
    exit;
}

// 🔹 Manejo de peticiones GET
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'obtenerOperaciones':
            $data = obtener_operaciones_por_agente($codigoAgente);
            echo json_encode($data,JSON_UNESCAPED_UNICODE);
            break;
        case 'obtenerOperacion':

            $Id_oper = $_GET['id_oper'] ?? '';

            if (empty($Id_oper)) {
                echo json_encode(['status' => 'error', 'message' => 'Falta el parámetro id_oper.']);
                exit;
            }

            $data = obtenerOperacion($Id_oper);
                echo json_encode($data, JSON_UNESCAPED_UNICODE);
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
            break;
    }
}

// 🔹 Función para obtener las operaciones
function obtener_operaciones_por_agente($cod_agen) {
    try {
        $conn = open_connection(); // Abrimos conexión
        $conn->set_charset('utf8mb4');

        if (!$conn) {
            throw new Exception('Error de conexión: ' . mysqli_connect_error());
        }

        // Preparamos la consulta llamando al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_ListarOperacionesPorAgente(?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vinculamos el parámetro
        $stmt->bind_param("s", $cod_agen);

        // Ejecutamos la consulta
        $stmt->execute();
        $result = $stmt->get_result();

        // Verificamos si hay resultados
        if ($result->num_rows > 0) {
            $operaciones = $result->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            $conn->close();

            return [
                'status' => 'success',
                'operaciones' => $operaciones
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'No se encontraron operaciones para este agente.'
            ];
        }
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    }

    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);  
}

// 🔹 Función para obtener una operación específica en formato JSON
function obtenerOperacion($id_oper) {
    try {
        
        $conn = open_connection(); // Abrimos conexión
        $conn->set_charset('utf8mb4');

        if (!$conn) {
            throw new Exception('Error de conexión: ' . mysqli_connect_error());
        }

        // Preparamos la consulta llamando al procedimiento almacenado
        $stmt = $conn->prepare("CALL sp_obtener_operacion_json(?)");
        if (!$stmt) {
            throw new Exception('Error al preparar la consulta: ' . $conn->error);
        }

        // Vinculamos el parámetro
        $stmt->bind_param("i", $id_oper);

        // Ejecutamos la consulta
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            return json_decode($row['resultado'], true); // Convertimos el JSON a un array asociativo
        } else {
            return [
                'status' => 'error',
                'message' => 'No se encontró la operación.'
            ];
        }
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    }

    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);
}
?>