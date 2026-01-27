<?php

include_once('config.php');


// Dependiendo de la acción, ejecutamos la función correspondiente
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'ranking_global':
            session_start();
            echo json_encode(obtenerRankingOperacionesGlobal());
            break;
        case 'evolutivo_comisiones':
            session_start();
            echo json_encode(obtenerEvolutivoComisiones());
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Acción no válida']);
            break;
    }
}

function ObtenerComisiones(){
    $conn = open_connection();

    if (!$conn) {
        // Retornar error de conexión como un array
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }
    
    // Obtener el código del agente desde la sesión
    $codigoAgente = $_SESSION['cod_agen'];

    // Preparar la consulta para llamar al procedimiento almacenado
    $stmt = $conn->prepare("CALL sp_ObtenerMontosComisiones(?)");
    
    // Vincular el parámetro
    $stmt->bind_param("s", $codigoAgente);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Obtener el resultado del procedimiento almacenado
        $result = $stmt->get_result();
        
        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            // Obtener los datos
            $data = $result->fetch_assoc();
            
            // Retornar los datos en un array asociativo
            return [
                'status' => 'success',
                'ComisionTotal' => $data['ComisionTotal'],
                'ComisionMesAnterior' => $data['ComisionMesAnterior'],
                'ComisionMesActual' => $data['ComisionMesActual']
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'No se encontraron resultados para el agente.'
            ];
        }

        // Cerrar el resultado
        $result->free();
    } else {
        // En caso de error al ejecutar el procedimiento almacenado
        return [
            'status' => 'error',
            'message' => 'Error al ejecutar el procedimiento almacenado: ' . $stmt->error
        ];
    }

    // Cerrar la sentencia
    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);

}

function obtenerRankingOperacionesGlobal(){
    
    $conn = open_connection();
    if (!$conn) {
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }
    // Establecer la codificación UTF-8 para la conexión
    if (!$conn->set_charset("utf8")) {
        return [
            'status' => 'error',
            'message' => 'Error al establecer la codificación UTF-8: ' . $conn->error
        ];
    }

    $codigoAgente = $_SESSION['cod_agen'];
    $stmt = $conn->prepare("CALL sp_ConsultarRankingsGlobal(?)");
    $stmt->bind_param("s", $codigoAgente);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $rankings = [];
            while ($row = $result->fetch_assoc()) {
                $rankings[] = $row;
            }
            return [
                'status' => 'success',
                'rankings' => $rankings
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'No se encontraron rankings para el agente.'
            ];
        }
        $result->free();
    } else {
        return [
            'status' => 'error',
            'message' => 'Error al ejecutar el procedimiento almacenado: ' . $stmt->error
        ];
    }
    $stmt->close();
    close_connection($conn);
}

function obtenerRankingOperacionesMes(){
    $conn = open_connection();
    
    // Establecer la codificación UTF-8 para la conexión
    if (!$conn->set_charset("utf8")) {
        return [
            'status' => 'error',
            'message' => 'Error al establecer la codificación UTF-8: ' . $conn->error
        ];
    }
    
    if (!$conn) {
        // Retornar error de conexión como un array
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }

    // Obtener el código del agente desde la sesión
    $codigoAgente = $_SESSION['cod_agen'];

    // Preparar la consulta para llamar al procedimiento almacenado sp_rankingMesActual
    $stmt = $conn->prepare("CALL sp_rankingMesActual(?)");
    
    // Vincular el parámetro (código del agente)
    $stmt->bind_param("s", $codigoAgente);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Obtener el resultado del procedimiento almacenado
        $result = $stmt->get_result();
        
        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            // Almacenar los datos en un array
            $rankingsMes = [];
            while ($row = $result->fetch_assoc()) {
                $rankingsMes[] = $row; // Almacenar el ranking del mes actual
            }
            
            // Retornar los datos en un array asociativo
            return [
                'status' => 'success',
                'rankingsMes' => $rankingsMes
            ];
        } else {
            // Si no se encontraron resultados
            return [
                'status' => 'error',
                'message' => 'No se encontraron rankings para el mes actual.'
            ];
        }

        // Cerrar el resultado
        $result->free();
    } else {
        // En caso de error al ejecutar el procedimiento almacenado
        return [
            'status' => 'error',
            'message' => 'Error al ejecutar el procedimiento almacenado: ' . $stmt->error
        ];
    }

    // Cerrar la sentencia
    $stmt->close();

    // Cerrar la conexión
    close_connection($conn);
}
function obtenerEvolutivoComisiones() {
    $conn = open_connection();
    if (!$conn) {
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }

    // Obtener el código del agente desde la sesión
    $codigoAgente = $_SESSION['cod_agen'];

    // Preparar la consulta para llamar al procedimiento almacenado EvolutivoComisiones
    $stmt = $conn->prepare("CALL sp_EvolutivoComisiones(?)");

    // Vincular el parámetro (código del agente)
    $stmt->bind_param("s", $codigoAgente);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Obtener el resultado del procedimiento almacenado
        $result = $stmt->get_result();

        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            $evolutivoComisiones = [];
            while ($row = $result->fetch_assoc()) {
                $evolutivoComisiones[] = $row; // Almacenar los datos de las comisiones
            }

            // Retornar los datos en un array asociativo
            return [
                'status' => 'success',
                'evolutivoComisiones' => $evolutivoComisiones
            ];
        } else {
            // Si no se encontraron resultados
            return [
                'status' => 'error',
                'message' => 'No se encontraron resultados de comisiones.'
            ];
        }

        $result->free();
    } else {
        return [
            'status' => 'error',
            'message' => 'Error al ejecutar el procedimiento almacenado: ' . $stmt->error
        ];
    }

    $stmt->close();
    close_connection($conn);
}
?>