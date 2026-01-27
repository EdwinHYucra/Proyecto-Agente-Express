<?php
require_once __DIR__ . '/../dal/productos_digitales_dal.php';

function insertarPlataforma($nombre, $logo)
{
    return crearPlataforma($nombre, $logo);
}
function insertarCuenta($id_plataforma, $correo, $contraseña, $cantidad_de_perfiles)
{
    return crearCuenta($id_plataforma, $correo, $contraseña, $cantidad_de_perfiles);
}
function insertarVentaDigital($id_perfil, $cod_agen, $numero_beneficiario, $monto, $comision, $fecha_inicio)
{
    return crearVentaDigital($id_perfil, $cod_agen, $numero_beneficiario, $monto, $comision, $fecha_inicio);
}
