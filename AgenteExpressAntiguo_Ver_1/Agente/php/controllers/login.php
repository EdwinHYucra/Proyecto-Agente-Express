<?php

session_start();
require_once __DIR__ . '/../services/login_service.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre_usuario = trim($_POST['usuario'] ?? '');
    $contrasenia = trim($_POST['contrasenia'] ?? '');

    // Validación básica del input
    if (empty($nombre_usuario) || empty($contrasenia)) {
        echo json_encode([
            'success' => false,
            'mensaje' => 'Por favor ingrese su usuario y contraseña.'
        ]);
        exit();
    }

    // Autenticación
    $usuario = autenticarUsuario($nombre_usuario, $contrasenia);

    if ($usuario) {
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['nombre_usuario'] = $usuario['nombre_usuario'];
        $_SESSION['roles'] = $usuario['roles'];
        if (isset($usuario['afiliado'])) {
            $_SESSION['afiliado'] = $usuario['afiliado'];
        }

        echo json_encode([
            'success' => true,
            'mensaje' => 'Inicio de sesión exitoso',
            'usuario' => $usuario
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'mensaje' => 'Usuario o contraseña incorrectos'
        ]);
    }
}

?>