<?php

require_once __DIR__ . '/../config.php';

function obtener_comisiones_por_afiliado($afiliadoId) {
    try {
        $conn = open_connection();
        $stmt = $conn->prepare("CALL sp_listar_configuraciones_por_afiliado(?)");
        $stmt->bind_param("s", $afiliadoId);
        $stmt->execute();

        $result = $stmt->get_result();
        $datos = [];

        while ($row = $result->fetch_assoc()) {
            $datos[] = $row;
        }

        $stmt->close();
        $conn->close();

        return ['status' => 'success', 'data' => $datos];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error al listar comisiones: ' . $e->getMessage()];
    }
}

function ejecutar_insertar_comision($afiliadoId, $montoMinimo, $montoMaximo, $montoFijo, $fechaInicio) {
    try {
        $conn = open_connection();
        $stmt = $conn->prepare("CALL sp_insertar_configuracion_comision_afiliado(?, ?, ?, ?, ?)");
        $stmt->bind_param("sddds", $afiliadoId, $montoMinimo, $montoMaximo, $montoFijo, $fechaInicio,);

        if (!$stmt->execute()) {
            return ['status' => 'error', 'message' => 'Error al insertar comisión: ' . $stmt->error];
        }

        $stmt->close();
        $conn->close();

        return ['status' => 'success', 'message' => 'Comisión insertada correctamente.'];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error al insertar comisión: ' . $e->getMessage()];
    }
}

function ejecutar_desactivar_comision($configId) {
    try {
        $conn = open_connection();

        $stmt = $conn->prepare("CALL sp_desactivar_configuracion_comision_afiliado(?)");
        $stmt->bind_param("i", $configId);

        if (!$stmt->execute()) {
            return [
                'status' => 'error',
                'message' => 'Error al desactivar configuración: ' . $stmt->error
            ];
        }

        $stmt->close();
        $conn->close();

        return [
            'status' => 'success',
            'message' => 'Configuración desactivada correctamente.'
        ];
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => 'Excepción: ' . $e->getMessage()
        ];
    }
}
?>