console.log("en controlador");

var usuarios = [];
var usuarioElegido = '';
function obtenerUsuarios() {
  
    axios ({
        method:"GET",
        url:"api/usuarios.php",
        responseType: "json",
        params : {}
    }).then(  resp => { 
        console.log( resp  ); 
        console.log( resp.data);
        usuarios = resp.data;
        llenarTabla();
    }).catch( error => console.error( error));
}


obtenerUsuarios();
llenarTabla();
deshabilitarBotones();


function deshabilitarBotones() {
    document.getElementById("btnActualizar").disabled = true;
}

function llenarTabla(){

    document.querySelector("#tablaInfo tbody").innerHTML = "";
    if( usuarios != null  ) {
        for( let i=0; i< usuarios.length; i++) {
            document.querySelector("#tablaInfo tbody").innerHTML += 
            `<tr>
                <td>${usuarios[i].nombre}</td>
                <td>${usuarios[i].apellido}</td>
                <td>${usuarios[i].direccion}</td>
                <td>${usuarios[i].ciudad}</td>
                <td>
                   <button class="btn btn-danger btn-sm" onClick="eliminarUsuario(${i})">X</button>
                   <button class="btn btn-success btn-sm" onClick="editarUsuario(${i})">Editar</button>
                </td>
            </tr>`
            
        }
    }

    
}


function eliminarUsuario( indice ) {
    console.log("eliminar:" , indice)
    axios ({
        method:"DELETE",
        url:`api/usuarios.php?id=${indice}`,
        responseType: "json"
    }).then(  resp => { 
        console.log("Borrado....")
        obtenerUsuarios();
        llenarTabla();
        
    }).catch( error => console.error( error));

} 


function guardarUsuario(event){
    event.preventDefault();
    console.log("Guardar usuario");

    

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let direccion = document.getElementById("direccion").value;
    let ciudad = document.getElementById("ciudad").value;


    if( nombre.length == 0  || apellido.length == 0  || direccion.length == 0 || ciudad.length == 0) {
        //msg = "Debe ingresar todos los campos";
        document.getElementById("msg").style.color = "red";
        document.getElementById("msg").innerHTML  = "Debe ingresar todos los campos";
        //alert("Debe ingresar todos los campos");
        return;
    }

    console.log("deshabilita Guardar");
    document.getElementById("btnGuardar").disabled = true;
    document.getElementById("btnGuardar").innerHTML = "Guardando...";


    let usuario = {
        nombre : document.getElementById("nombre").value,
        apellido : document.getElementById("apellido").value,
        direccion : document.getElementById("direccion").value,
        ciudad : document.getElementById("ciudad").value
    };
        
    console.log( "Usuario:", usuario);
    //  https://www.youtube.com/watch?v=THkPIm8kGOA&t=1228s
    axios ({
        method:"POST",
        url:"api/usuarios.php",
        responseType: "json",
        data : usuario
    }).then(  resp => { 
        //usuarios = resp.data;
        obtenerUsuarios();
        llenarTabla();
        limpiarCampos();

    }).catch( error => console.error( error));

    console.log("habilita Guardar");
    
    document.getElementById("btnGuardar").innerHTML = "Guardar";
    document.getElementById("btnGuardar").disabled = false;
}   


function limpiarCampos(){
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("ciudad").value = "";
}


function llenarCampos( data ) {
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("apellido").value = data.apellido;
    document.getElementById("direccion").value = data.direccion;
    document.getElementById("ciudad").value = data.ciudad;
}


function editarUsuario( indice ) {
    usuarioElegido = indice;
    document.getElementById("btnGuardar").disabled = true;
    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnActualizar").style.display = "inline";

    axios ({
        method:"GET",
        url:`api/usuarios.php?id=${indice}`,
        responseType: "json"
    }).then(  resp => { 
        usuario = resp.data;
        console.log( indice );
        console.log( resp.data );
        llenarCampos( resp.data );
    }).catch( error => console.error( error));   
}


function actualizarUsuario() {
    let usuario = {
        nombre : document.getElementById("nombre").value,
        apellido : document.getElementById("apellido").value,
        direccion : document.getElementById("direccion").value,
        ciudad : document.getElementById("ciudad").value
    };

    console.log("Por actualizar...indice", usuarioElegido);
    console.log("con info:", usuario);
    
    
    axios ({
        method:"PUT",
        url:`api/usuarios.php?id=${usuarioElegido}`,
        responseType: "json",
        data : usuario
    }).then(  resp => { 
        console.log( resp  );
    }).catch( error => console.error( error));  

    obtenerUsuarios();
    llenarTabla();
    limpiarCampos();
 
    document.getElementById("btnGuardar").disabled = false;
    document.getElementById("btnActualizar").disabled = true;
} 


function limpiarMsg() {
    //document.getElementById("msg").style.color = "red";
    document.getElementById("msg").innerHTML  = "";
}


function nuevoUsuario(event){
    limpiarCampos();
    document.getElementById("btnGuardar").disabled = false;
    document.getElementById("btnActualizar").disabled = true;
}