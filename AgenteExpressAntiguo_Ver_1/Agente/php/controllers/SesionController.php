<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['cod_agen'])) {
        echo json_encode([
            'status' => 'success',
            'cod_agen' => $_SESSION['cod_agen']
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'El afiliado no está en sesión.'
        ]);
    }
}
?>