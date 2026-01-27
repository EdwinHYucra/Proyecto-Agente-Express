<?php
require_once __DIR__ . '/../dal/usuario_dal.php';
require_once __DIR__ . '/../dal/rol_dal.php';
require_once __DIR__ . '/../dal/afiliado_dal.php';

function autenticarUsuario($nombre_usuario, $contrasenia) {
    $usuario = obtenerUsuarioPorNombre($nombre_usuario);

    // Si no existe
    if (!$usuario) {
        return null;
    }

    /*//Si la contraseña no coincide
    if (!password_verify($contrasenia, $usuario['contrasenia'])) {
        return null;
    }*/
    if ($contrasenia != $usuario['contrasenia']) {
        return null;
    }

    // Obtener roles
    $roles = obtenerRolesPorUsuario($usuario['id']);
    $usuario['roles'] = $roles;

    // Si es afiliado, obtener su info
    if (in_array('Afiliado', $roles)) {
        $afiliado = obtenerAfiliadoPorUsuario($usuario['id']);
        if (!$afiliado) {
            // Puedes controlar errores aquí si el afiliado no está activo, por ejemplo
            $usuario['afiliado'] = null;
        } else {
            $usuario['afiliado'] = $afiliado;
        }
    }

    return $usuario;
}

?>