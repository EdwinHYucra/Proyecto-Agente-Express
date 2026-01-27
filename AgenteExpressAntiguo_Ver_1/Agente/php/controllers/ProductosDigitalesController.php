<?php
session_start();
require_once '../services/productos_digitales_service.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {

        case 'crearPlataforma':
            if($_POST['rol'] != 'SuperAdmin'){
                echo json_encode([
                    'status' => 'error',
                    'message' => 'No tienes los privilegios necesarios para hacer esta accion.'
                ]);
                exit;
            }
            $nombre = $_POST['nombre'] != null ? $_POST['nombre']: null;
            $logo = $_POST['logo_url']  != null ? $_POST['logo_url']: null;
            if ($nombre != null && $logo != null){
                $resultado = insertarPlataforma($nombre, $logo);
                echo json_encode($resultado);
            }
            else{
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Faltan parametos.'
                ]);
                exit;
            }

            

            break;
        case 'crearCuenta':
            break;
        case 'crearVentaDigital':
            break;
        default:
            echo json_encode([
                'status' => 'error',
                'message' => 'Acción POST no válida.'
            ]);
            break;
    }
}
