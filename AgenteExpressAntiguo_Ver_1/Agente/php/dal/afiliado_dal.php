<?php
require_once __DIR__ . '/../config.php';

function obtenerAfiliadoPorUsuario($usuario_id) {
    $conn = open_connection();
    $sql = "CALL obtenerAfiliadoPorUsuario(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $afiliado = $result->fetch_assoc();
    $stmt->close();
    $conn->close();
    return $afiliado;
}
?>
