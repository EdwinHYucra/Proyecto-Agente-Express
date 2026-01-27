<?php
require_once '../dal/comisiones_dal.php';

function listar_comisiones_afiliado($afiliadoId) {
    return obtener_comisiones_por_afiliado($afiliadoId);
}

function insertar_comision_afiliado($afiliadoId, $montoMinimo, $montoMaximo, $montoFijo, $fechaInicio) {
    return ejecutar_insertar_comision($afiliadoId, $montoMinimo, $montoMaximo, $montoFijo, $fechaInicio);
}

function desactivar_comision_afiliado($configId) {
    return ejecutar_desactivar_comision($configId);
}
?>