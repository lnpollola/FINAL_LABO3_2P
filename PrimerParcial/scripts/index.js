var lista;
const server_url = "http://localhost:3000/";
var xhr;
var jqueryObj = $;
var xml = new XMLHttpRequest();

//Creo un Héroe Global para manejar datos
var heroeGlobal = { "id":"","nombre":"","apellido":"","alias":"","edad":"","lado":"", "active":"", "created_dttm":"" }

window.onload = asignarEventos;

function asignarEventos() {


    ejecutarTransaccion("actualizarLista");

    $("#botonAgregarHeroe").click(function() { 
        document.getElementById("formAlta").reset();
           
        //QUITO BOTON DE AGREGAR
        document.getElementById("cancelarForm").style.display='block';
        document.getElementById("btnAgregarConfirm").style.display='block';
        //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
        document.getElementById("btnModificar").style.display='none';
        document.getElementById("btnEliminar").style.display='none';

        traigoUltimoID();
    });

    
    $("#cancelarForm").click(function() { 
        document.getElementById("formAlta").reset();
    }); 

    $("#btnAgregarConfirm").click(function() { 
        ejecutarTransaccion("Alta");
    });

    $("#btnEliminar").click(function() { 
        ejecutarTransaccion("Baja");
    });

    $("#btnModificar").click(function() { 
        ejecutarTransaccion("Modificacion");
    });


    $("#tBodyTable").click(function () {
        ejecutarTransaccion("Mostrar");
    });


}

function Personaje(id, nombre, apellido, alias, edad, lado) {
    //contructor de objeto Personaje
    this.id= id;
    this.nombre= nombre;
    this.apellido = apellido;
    this.alias = alias;
    this.edad = edad;
    this.lado = lado;
}

function traerIdHeroe(e) {

    //Este manejador de evento se ejecutra cuando se hace click en la grilla dinamica.
    //Propuesta: 1)Busco en el DOM el id del personaje a eliminar

    //2)Me traigo el heroe de la lista, haciendo una funcion de buscar, como por ejemplo:
    //var heroe = lista[buscarHeroe(lista, id)];
    //3)llamo a ejecutarTransaccion
    ejecutarTransaccion("MostrarHeroe", heroe);

}

function altaPersonaje() {


    //genero un nuevo "Personaje", y lo inserto
    var flag = true;

    var idHeroe         =document.getElementById("idHeroe").value;
    var nombreHeroe     =document.getElementById("nombreHeroe").value;
    var apellidoHeroe   =document.getElementById("apellidoHeroe").value;
    var aliasHeroe      =document.getElementById("aliasHeroe").value;
    var edadHeroe       =document.getElementById("edadHeroe").value;
    var ladoHeroe       =document.getElementById("ladoHeroe").value;

    nuevoPersonaje = new Personaje (
      idHeroe      ,
      nombreHeroe  ,
      apellidoHeroe,
      aliasHeroe   ,
      edadHeroe    ,
      ladoHeroe    
    )

    // VALIDO QUE AMBOS CAMPOS TENGAN MAS DE 3 CARACTERES
    if (nombreHeroe.length < 3 || apellidoHeroe.length < 3) {
        flag= false;
    }
    
    if(flag== true && confirm("¿Confirma agregar persona?"))
    {ejecutarTransaccion("Insertar", nuevoPersonaje);}
    else {
            $('#exampleModalCenter').modal('hide'); 
            $('#modalERROR').modal('show');
        }

    $('#exampleModalCenter').modal('show'); 

}


function eliminarPersonaje() {
    //Propuesta: 1)Busco en el DOM el id del personaje a eliminar

    //2)Me traigo el heroe de la lista, haciendo una funcion de buscar, como por ejemplo:
    //var heroe = lista[buscarHeroe(lista, id)];
    //3)llamo a ejecutarTransaccion
    heroe = heroeGlobal;
    ejecutarTransaccion("Eliminar", heroe);

    //Aca va alguna animacion para cerrar el formulario
}

function modificarPersonaje() {
    //agregar codigo que crea necesario

    if (document.getElementById("ladoHeroe").checked) 
    {
        var ladoCheck = "Heroe";
    }else {var ladoCheck = "Villano";}   

    var personajeModificado = new Personaje(
        heroeGlobal.id,   
        document.getElementById("nombreHeroe").value   , 
        document.getElementById("apellidoHeroe").value ,
        document.getElementById("aliasHeroe").value    ,
        document.getElementById("edadHeroe").value     ,
        ladoCheck
    );
    
    ejecutarTransaccion("Modificar", personajeModificado);
    //animacion para cerrar formulario

}


function traerListaHeroes(callback) {
    //ESTA FUNCION RECIBE COMO PARAMETRO UN CALLBACK, POR SI SE QUIERE USAR 
     //PARA REFRESCAR LA TABLA A LA VUELTA DE LA PETICION AL SERVIDOR

     jqueryObj.get("http://localhost:3000/traer?collection=heroes",function (data, status) {

        var personajesCompleto = data.data;
        var tBodyTable = $('#tBodyTable')[0];
         
        var seccionPersonajes = "";
            

        for(var i=0; i< personajesCompleto.length; i++)
        {
        
            seccionPersonajes += "<tr><td>"+ personajesCompleto[i].id       + "</td>" +
                                        "<td>" +      personajesCompleto[i].nombre   + "</td>" +
                                        "<td>" +      personajesCompleto[i].apellido + "</td>" +
                                        "<td>" +      personajesCompleto[i].alias    + "</td>" +
                                        "<td>" +      personajesCompleto[i].edad    + "</td>"+
                                        "<td>" +      personajesCompleto[i].lado    + "</td>"+
                                "</tr>" ;
        
            tBodyTable.innerHTML = seccionPersonajes;
        }

        transicionSpinner();
        //CARGA DE TABLA INICIAL
        document.getElementById("divTable").style.display='block';

    } )//fin $.get
    
    //VER EN CONTROLADOR.JS LA FUNCION ejecutarTransaccion PARA case "actualizarLista"

}

function insertarHeroe(heroe) {

    // Acá va el código de la peticion ajax para insertar el nuevo heroe (POST)
    var data = {
        "collection":"heroes",
        "heroe": heroe
    }
    //AGREGAR CODIGO PARA INSERTAR EL HEROE
    var spinner = document.getElementById("spinner");
    spinner.style.visibility = "visible";

    xml.open("POST","http://localhost:3000/agregar",true);

    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
          transicion();
        }
      };

    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(data));

    document.getElementById("spinner").style.display = "block";
    document.getElementById("divTable").style.display='none';
    $('#exampleModalCenter').modal('hide'); 

}

function eliminarHeroe(heroe) {
    var data = {
        "collection":"heroes",
        "id": heroe.id
    }
    //AGREGAR CODIGO PARA ELIMINAR EL HEROE
    var spinner = document.getElementById("spinner");
    spinner.style.visibility = "visible";

    xml.open("POST","http://localhost:3000/eliminar",true);

    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
          transicion();
        }
      };

    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(data));

    document.getElementById("spinner").style.display = "block";
    document.getElementById("divTable").style.display='none';
    $('#exampleModalCenter').modal('hide'); 
}

function modificarHeroe(heroe) {

      // Acá va el código de la peticion ajax para insertar el nuevo heroe (POST)
      var data = {
        "collection":"heroes",
        "heroe": heroe
    }
    //AGREGAR CODIGO PARA MODIFICAR EL HEROE
    var spinner = document.getElementById("spinner");
    spinner.style.visibility = "visible";

    xml.open("POST","http://localhost:3000/modificar",true);

    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
          transicion();
        }
      };

    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(JSON.stringify(data));

    document.getElementById("spinner").style.display = "block";
    document.getElementById("divTable").style.display='none';
    $('#exampleModalCenter').modal('hide'); 
}



//FUNCIONES PROPIAS
function mostrarFormulario()
{
    $('#exampleModalCenter').modal('show'); 

    var target = event.target || event.srcElement;
    fila = target.parentNode;
    var celdas = fila.getElementsByTagName("td");

    //ARMO PERSONAJE
    var idHeroe         =celdas[0].innerHTML;
    var nombreHeroe     =celdas[1].innerHTML;
    var apellidoHeroe   =celdas[2].innerHTML;
    var aliasHeroe      =celdas[3].innerHTML;
    var edadHeroe       =celdas[4].innerHTML;
    var ladoHeroe       =celdas[5].innerHTML;

    heroeGlobal = new Personaje (
      idHeroe      ,
      nombreHeroe  ,
      apellidoHeroe,
      aliasHeroe   ,
      edadHeroe    ,
      ladoHeroe    
    )

    document.getElementById("idHeroe").value        = celdas[0].innerHTML;
    document.getElementById("nombreHeroe").value    = celdas[1].innerHTML;
    document.getElementById("apellidoHeroe").value  = celdas[2].innerHTML;
    document.getElementById("aliasHeroe").value     = celdas[3].innerHTML;
    document.getElementById("edadHeroe").value      = celdas[4].innerHTML;
    document.getElementById("ladoHeroe").value      = celdas[5].innerHTML;

    //QUITO BOTON DE AGREGAR
    document.getElementById("btnAgregarConfirm").style.display='none';
    document.getElementById("cancelarForm").style.display='none';
    //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
    document.getElementById("btnModificar").style.display='block';
    document.getElementById("btnEliminar").style.display='block';

}

///SPINNER
function transicionSpinner() {
    document.getElementById("spinner").style.display = "none";
}

function transicion() {
    if (xml.readyState ==4) 
    {
        if (xml.status==200) 
        {
            // alert( JSON.parse(xml.response).message );

            $('#modalOK').modal('show');
            document.getElementById("textoRespuesta").innerHTML = JSON.parse(xml.response).message;

            document.getElementById("formAlta").reset();
            traerListaHeroes();
        } 
        else
        {document.getElementById("spinner").style.display = "none";}
    }
}

function traigoUltimoID()
{
    var target = event.target || event.srcElement;
    var filas = target.parentNode.parentElement.getElementsByTagName("td");

    var ultimoIDPos = (filas.length)-6;
    var ultimoID = filas[ultimoIDPos].innerHTML;

    document.getElementById("ultimoIDinsertado").value= "Ultimo ID Insertado: "+ultimoID;
}


