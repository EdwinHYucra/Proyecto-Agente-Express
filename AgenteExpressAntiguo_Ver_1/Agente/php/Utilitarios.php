<?php

include_once('config.php');

//Buscar a un afiliado y traer sus datos
function buscarAfiliado($cod_agent){

    $conn = open_connection();

    if (!$conn) {
        // Retornar error de conexión como un array
        return [
            'status' => 'error',
            'message' => 'Connection failed: ' . mysqli_connect_error()
        ];
    }

    // Preparar la consulta para llamar al procedimiento almacenado
    $stmt = $conn->prepare("CALL sp_buscarAfiliado(?)");

    // Vincular el parámetro
    $stmt->bind_param("s", $cod_agent);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Obtener el resultado del procedimiento almacenado
        $result = $stmt->get_result();

        // Verificar si hay resultados
        if ($result->num_rows > 0) {
            // Obtener los datos y almacenarlos en un array
            $data = $result->fetch_assoc();

            // Retornar los datos en un array asociativo
            return [
                'status' => 'success',
                'data' => $data
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

function calcularMembresia($fecha_apertura, $comisiones) {
    // Crear objeto DateTime para la fecha de apertura
    $fecha = new DateTime($fecha_apertura);
    
    // Obtener el día de la apertura del mes
    $dia_apertura = $fecha->format('d');
    
    // Calcular la fecha de finalización del bono
    if ($dia_apertura <= 15) {
        // Si la apertura es antes del 15, el bono es por 3 meses
        $fecha_bono_final = (clone $fecha)->modify('+3 months');
    } else {
        // Si la apertura es después del 15, el bono es por 2 meses
        $fecha_bono_final = (clone $fecha)->modify('+2 months');
    }
    
    // Obtener la fecha actual del sistema
    $fecha_actual = new DateTime();
    
    // Comparar si la fecha actual está dentro del período del bono
    if ($fecha_actual <= $fecha_bono_final) {
        $membresia = 50;
    } else {
        if ($comisiones <= 1000) {
            $membresia = 100; 
        }//Puedes añadir mas parametros o una calculadorade parametos con elseif
        else {
            $membresia = 200; 
        }
    }


    return $membresia;
}
?>