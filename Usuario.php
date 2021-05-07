<?php

class Usuario {
    private $nombre;
    private $apellido;
    private $direccion;
    private $ciudad;
    

    public function __construct($nombre, $apellido, $direccion, $ciudad ) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->direccion = $direccion;
        $this->ciudad = $ciudad;        
    } 


    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre( $nombre ) {
        $this->nombre = $nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function setApellido( $apellido ) {
        $this->apellido = $apellido;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function setDireccion( $direccion ) {
        $this->direccion = $direccion;
    }

    public function getCiudad() {
        return $this->ciudad;
    }

    public function setCiudad( $ciudad ) {
        $this->ciudad = $ciudad;
    }

    public function guardarUsuarios(){
        $contenidoArchivo = file_get_contents("../data/usuarios.json");
        $usuarios = json_decode( $contenidoArchivo, true);
        $usuarios[] = array (
            "nombre"=> $this=>nombre,
            "apellido"=> $this=>apellido,
            "direccion"=> $this=>direccion,
            "ciudad"=> $this=>ciudad
        );
        $archivo = fopen("../data/usuarios.json","w");
        fwrite( $arcivo, json_encode( $usuarios ));
        fclose( $archivo ); 
     }
}