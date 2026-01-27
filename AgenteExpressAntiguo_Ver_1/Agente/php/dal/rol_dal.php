<?php
require_once __DIR__ . '/../config.php';

function obtenerRolesPorUsuario($usuario_id) {
    $conn = open_connection(DB_AUTH);
    $sql = "CALL sp_obtenerRolesPorUsuario(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $roles = [];
    while ($row = $result->fetch_assoc()) {
        $roles[] = $row['nombre_rol'];
    }

    $stmt->close();
    $conn->close();
    return $roles;
}
?>
