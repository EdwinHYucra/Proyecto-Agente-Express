<?php

require_once __DIR__ . '/../config.php';

function crearPlataforma($nombre, $logo)
{
    try {
        $conn = open_connection();
        $stmt = $conn->prepare("CALL sp_insertar_plataforma(?, ?)");
        $stmt->bind_param("ss", $nombre, $logo);

        if (!$stmt->execute()) {
            return ['status' => 'error', 'message' => 'Error al crear la plataforma: ' . $stmt->error];
        }

        $stmt->close();
        close_connection($conn);
        return ['status' => 'success', 'message' => 'Plataforma creada correctamente.'];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error al crear la plataforma: ' . $e->getMessage()];
    }
}

function crearCuenta($id_plataforma, $correo, $contraseña, $cantidad_de_perfiles)
{
    try {
        $conn = open_connection();
        $stmt = $conn->prepare("CALL sp_insertar_cuenta(?, ?, ? ,?)");
        $stmt->bind_param("issi", $id_plataforma, $correo, $contraseña, $cantidad_de_perfiles);

        if (!$stmt->execute()) {
            return ['status' => 'error', 'message' => 'Error al crear la cuenta: ' . $stmt->error];
        }

        $stmt->close();
        close_connection($conn);
        return ['status' => 'success', 'message' => 'Plataforma insertada correctamente.'];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error al crear la cuenta: ' . $e->getMessage()];
    }
}
function crearVentaDigital($id_perfil, $cod_agen, $numero_beneficiario, $monto, $comision, $fecha_inicio)
{
    try {
        $conn = open_connection();
        $stmt = $conn->prepare("CALL sp_insertar_venta_digital(?, ?, ? , ?, ? ,?)");
        $stmt->bind_param("issdds", $id_perfil, $cod_agen, $numero_beneficiario, $monto, $comision, $fecha_inicio);

        if (!$stmt->execute()) {
            return ['status' => 'error', 'message' => 'Error al completar la venta: ' . $stmt->error];
        }

        $stmt->close();
        close_connection($conn);
        return ['status' => 'success', 'message' => 'Plataforma insertada correctamente.'];
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => 'Error al completar la venta: ' . $e->getMessage()];
    }
}


