<?php
//echo "Method HTTP:" . $_SERVER['REQUEST_METHOD'];
//echo "\nInfo:" . file_get_contents('php://input');

include_once("../Usuario.php");
$mensaje  = "";
header("Content-Type:application/json");
switch( $_SERVER['REQUEST_METHOD'] ) {
    case 'POST':
        $_POST = json_decode( file_get_contents('php://input'), true);  
        $usuario = new Usuario( $_POST['nombre'], $_POST['apellido'], $_POST['direccion'], $_POST['ciudad']);
        $usuario->guardarUsuario();
        $resultado["mensaje"] = "Guardar Usuario, Info:". json_encode( $_POST);
        echo json_encode( $resultado );
        break;
    case 'GET':
        
        if( isset( $_GET['id'])) {            
            //$resultado["mensaje"] = "Retornar usuario con el id:" . $_GET['id'];
            //echo json_encode( $resultado );
            echo json_encode( Usuario::obtenerUsuario($_GET['id'] ));
        } else {
            echo Usuario::obtenerUsuarios();
        }
      
        break;
    case 'PUT':
        
        $_POST = json_decode( file_get_contents('php://input'), true);  
        $resultado["mensaje"] = "Actualizar Usuario con el id:" . $_GET['id'].
                               ", Info:". json_encode( $_POST );
        $usuario = new Usuario( $_POST['nombre'], $_POST['apellido'], $_POST['direccion'], $_POST['ciudad']);
        $usuario->actualizarUsuario( $_GET['id']);

        echo json_encode( $_POST );
        break;
    case 'DELETE':
        $resultado["mensaje"] = "API::Eliminar Usuario con el id:" . $_GET['id'];
        echo json_encode( $resultado );
        Usuario::eliminarUsuario(  $_GET['id'] );
        break;
}
