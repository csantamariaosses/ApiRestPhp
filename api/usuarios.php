<?php
echo "Method HTTP:" . $_SERVER['REQUEST_METHOD'];
echo "\nInfo:" . file_get_contents('php://input');

$mensaje  = "";
header("Content-Type:application/json");
switch( $_SERVER['REQUEST_METHOD'] ) {
    case 'POST':
        $_POST = json_decode( file_get_contents('php://input'), true);  
        $resultado["mensaje"] = "Guardar Usuario, Info:" json_encode( $_POST);
        echo json_encode( $resultado );
        break;
    case 'GET':
        if( isset( $_GET['id'])) {            
            $resultado["mensaje"] = "Retornar usuario con el id:" . $_GET['id'];
            echo json_encode( $resultado );
        } else {
            $resultado["mensaje"] = "Retornar todos los usuarios";
            echo json_encode( $resultado );
        }
      
        break;
    case 'PUT':
        
        $_POST = json_decode( file_get_contents('php://input'), true);  
        $resultado["mensaje"] = "Actualizar Usuario con el id:" . $_GET['id'].
                               ", Info:". json_encode( $_POST );
        echo json_encode( $resultado );
        break;
    case 'DELETE':
        $resultado["mensaje"] = "Eliminar Usuario con el id:" . $_GET['id'].
        echo json_encode( $resultado );
        break;
}
