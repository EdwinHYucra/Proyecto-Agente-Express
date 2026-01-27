<?php

session_start();
require_once '../services/comisiones_service.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'listar':
            $afiliadoId = $_GET['afiliadoId'] ?? null;

            if (!$afiliadoId) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'El parámetro afiliadoId es obligatorio.'
                ]);
                exit;
            }

            $resultado = listar_comisiones_afiliado($afiliadoId);
            echo json_encode($resultado);
            break;

        default:
            echo json_encode([
                'status' => 'error',
                'message' => 'Acción GET no válida.'
            ]);
            break;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'insertar':

            $afiliadoId = $_SESSION['cod_agen'] ?? null;

            //$afiliadoId = trim($_POST['afiliadoId'] ?? '');
            $montoMinimo = isset($_POST['montoMinimo']) ? (float)$_POST['montoMinimo'] : null;
            $montoMaximo = isset($_POST['montoMaximo']) ? (float)$_POST['montoMaximo'] : null;
            $montoFijo = isset($_POST['montoFijo']) ? (float)$_POST['montoFijo'] : null;
            $fechaInicio = $_POST['fechaInicio'] ?? date('Y-m-d');
            //$usuarioCreacion = $_SESSION['nombre_usuario'] ?? 'sistema';

            if (!$afiliadoId || is_null($montoMinimo) || is_null($montoMaximo) || is_null($montoFijo)) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Faltan datos obligatorios.'
                ]);
                exit;
            }

            $resultado = insertar_comision_afiliado($afiliadoId, $montoMinimo, $montoMaximo, $montoFijo, $fechaInicio);
            echo json_encode($resultado);
            break;
        case 'eliminar':
            $configId = $_POST['configId'] ?? null;

            if (!$configId) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'El ID de configuración es obligatorio.'
                ]);
                exit;
            }

            require_once '../services/comisiones_service.php';
            $resultado = desactivar_comision_afiliado($configId);
            echo json_encode($resultado);
            break;

        default:
            echo json_encode([
                'status' => 'error',
                'message' => 'Acción POST no válida.'
            ]);
            break;
    }
}
