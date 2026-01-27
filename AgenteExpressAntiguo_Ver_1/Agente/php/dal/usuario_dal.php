<?php
require_once __DIR__ . '/../config.php';

function obtenerUsuarioPorNombre($nombre_usuario) {
    $conn = open_connection(DB_AUTH);
    $sql = "CALL sp_obtenerUsuarioPorNombre(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nombre_usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    $stmt->close();
    $conn->close();
    return $usuario;    
}
?>
