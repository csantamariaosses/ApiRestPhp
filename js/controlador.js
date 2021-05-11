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
        console.log("Borrando....")
        //usuarios = resp.data;
        obtenerUsuarios();
        llenarTabla();
        
    }).catch( error => console.error( error));

}


function guardarUsuario(event){
    event.preventDefault();
    console.log("Guardar usuario");
    
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
    axios ({
        method:"GET",
        url:`api/usuarios.php?id=${indice}`,
        responseType: "json"
    }).then(  resp => { 
        usuario = resp.data;
        console.log( indice );
        console.log( resp.data );

        llenarCampos( resp.data );
       
        //obtenerUsuarios();
        //llenarTabla();
        //limpiarCampos();
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
    }).catch( error => console.error( error))  

    obtenerUsuarios();
    llenarTabla();
    limpiarCampos();
} 