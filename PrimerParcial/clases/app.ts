namespace SegundoPARC{

    
    var heroeID:any;
 

    $(document).ready(function () {
        
        

        mostrarHeroes();
        //Asigno botones por JQUERY
        $("#btnLimpia").click(function () {

            localStorage.clear();
            location.reload();
            
        });

        $("#cancelarForm").click(function() { 
            canceloForm();

        }); 
    
        $("#btnAgregarConfirm").click(function() { 
            altaPersonaje();
        });
    
        $("#btnEliminar").click(function() { 
            let idActual =Number($("#idSeleccionado").val());

            eliminarPersonaje(idActual);
        });

        
        $("#btnModificar").click(function() { 
            let idActual =Number($("#idSeleccionado").val());
            modificarPersonaje(idActual);

        });
    

        
        $("#botonAgregarHeroe").click(function() { 
            canceloForm();
            
            //QUITO BOTON DE AGREGAR
            document.getElementById("cancelarForm")!.style.display='block';
            document.getElementById("btnAgregarConfirm")!.style.display='block';

            
            //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
            document.getElementById("btnModificar")!.style.display='none';
            document.getElementById("btnEliminar")!.style.display='none';

            //ID PARA DAR DE ALTA
            document.getElementById("idHeroe")!.style.display='block';
            document.getElementById("idSeleccionado")!.style.display='none';
        });

    
    
        $("#tBodyTable").click(function () {
            mostrarFormulario();
        });
    


        // $("#checkFORM :checkbox").on("click",function() {

        //     var checkboxON = $('input:checkbox:checked.checkItems').map(function() { return this.value; }).get();

          
        //     if(checkboxON.length == 0)         {  location.reload();}
        //     checkboxON.includes("nombreF")       == true ? $(".col1").css("display","none"):null;
        //     checkboxON.includes("numPatasF")       == true ? $(".col2").css("display","none"):null;
        //     checkboxON.includes("tipoF")       == true ? $(".col3").css("display","none"):null;
        //     checkboxON.includes("sonidoF")       == true ? $(".col4").css("display","none"):null;


        // });

        // $("#btnPrmedio").click(function () {

        //         soluciones.promedio = function(usuarios){
        //         var acumEdad = usuarios
        //         .reduce(function(actual,siguiente){
        //             return actual+siguiente.edad;
        //         },0); //Inicializa y arranca en 0 porque es un numero lo que devuelve y no un objeto
        //         //En la primer iteracion, actual toma 0 como valor
            
        //         var cantidad = usuarios
        //         .reduce (function(actual,siguiente){
        //             return actual + 1;
        //         }, 0);
        //         return (acumEdad / cantidad).toFixed(2);
        //     }
            
        // });

        // $("#filtrarPor").change(function(){
        //     let valorFiltro = $('#filtrarPor').map(function() { return this.value; }).get();
        //     mostrarHeroes(valorFiltro);
        //     // tablaAux = undefined;
        // });

        // $("#tablaID tbody tr").dblclick(function (e) {
            
        
        //    $('#myModal').modal('show');

        //    $("#btnModificar").css("visibility","visible");
        //    $("#btnEliminar").css("visibility","visible");
        //    $("#btnAgregar").css("visibility","hidden");

      
        //     let idSeleccionado = $(e.target).prev().text();
        //     let nombreSelec = $(e.target).text();
        //     let cantPatSelec = $(e.target).next().text();
        //     let tipoSelec = $(e.target).next().next().text();
        //     let ruidoSelec = $(e.target).next().next().next().text();

        //    $("#divTipo").css("visibility","hidden");

        //    $('#nombreA').attr('value', nombreSelec);
        //    $('#sondioA').attr('value', ruidoSelec);

        // });
        
    });//fin document.ready


function mostrarHeroes(valor?:any):void {

        let heroesStorage:any|null =  JSON.parse(
            localStorage.getItem("LocalHeroes") || "[]"
        )
            ; 
        var tBodyTable = $('#tBodyTable')[0];
        var seccionPersonajes:string = "";   

        if(valor)
        {
        //MUESTRO EL LISTADO DE EmpleadoS SEGUN FILTRO
           let stringFinal = heroesStorage
                                    .filter(function(heroe:any){
                                        let heroeRet = JSON.parse(heroe);
                                        return heroeRet.tipo == valor;
                                    })
                                    .map(function(heroe:any){
                                        let heroeRet = JSON.parse(heroe);
                                        return heroeRet;
                                    });   
                        heroesStorage= stringFinal;
        }
       
        if($('#filtrarPor').val() == "todos")
        {
            location.reload();
        }

        for(var i=0; i< heroesStorage.length; i++)
        {
        
            seccionPersonajes += "<tr><td>"+ heroesStorage[i].id       + "</td>" +
                                        "<td>" +      heroesStorage[i].nombre   + "</td>" +
                                        "<td>" +      heroesStorage[i].apellido + "</td>" +
                                        "<td>" +      heroesStorage[i].alias    + "</td>" +
                                        "<td>" +      heroesStorage[i].edad    + "</td>"+
                                        "<td>" +      heroesStorage[i].lado    + "</td>"+
                                "</tr>" ;
        
            tBodyTable.innerHTML = seccionPersonajes;
        }

        transicionSpinner();
        //CARGA DE TABLA INICIAL
        document.getElementById("divTable")!.style.display='block';
}



///SPINNER
function transicionSpinner() {
    
    document.getElementById("spinner")!.style.display = "none";
    document.getElementById("divTable")!.style.display = "block";
}

function canceloForm() {
var dirtyFormID = 'formAlta';
var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
resetForm.reset();
}

function altaPersonaje() {

    document.getElementById("divTable")!.style.display='none';
    document.getElementById("spinner")!.style.display = "block";
    $('#exampleModalCenter').modal('hide'); 

    let flag = true;

    let idHeroe         =Number($("#idHeroe").val());
    let nombreHeroe     =String($("#nombreHeroe").val());
    let apellidoHeroe   =String($("#apellidoHeroe").val());
    let aliasHeroe      =String($("#aliasHeroe").val());
    let edadHeroe       =Number($("#edadHeroe").val());
    
    if ( $("#ladoHeroe").prop("checked") ) 
    {
        var ladoCheck = "Heroe";
    }else {var ladoCheck = "Villano";}   



    let heroesLista = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
 
    if(flag== true)
    {
        let nuevoPersonaje = new heroe (
            idHeroe      ,
            nombreHeroe  ,
            apellidoHeroe,
            aliasHeroe   ,
            edadHeroe    ,
            ladoCheck    
          );
    
          heroesLista.push( nuevoPersonaje );

          let stringHeroesLista = JSON.stringify(heroesLista);

          setTimeout(function (){

            localStorage.setItem("LocalHeroes", stringHeroesLista);
            mostrarHeroes();

            $('#modalOK').modal('show');
            document.getElementById("textoRespuesta")!.innerHTML = "Alta Exitosa";

          }, 5000); 
        
        
    }
    else {
            $('#exampleModalCenter').modal('hide'); 
            $('#modalERROR').modal('show');
        }

        $('#exampleModalCenter').modal('show'); 

    
    }

    
function eliminarPersonaje(idPersonaje:number):void
{
    var indice = determinoIndice(idPersonaje);
   

    document.getElementById("divTable")!.style.display='none';
    document.getElementById("spinner")!.style.display = "block";
    $('#exampleModalCenter').modal('hide'); 

    setTimeout(function (){

        modificarHeroe(indice,"BAJA");
        mostrarHeroes();

        $('#modalOK').modal('show');
        document.getElementById("textoRespuesta")!.innerHTML = "Baja Exitosa";

      }, 5000); 
    
    
} 

    
function modificarPersonaje(idPersonaje:number):void
{
    var indice = determinoIndice(idPersonaje);

    document.getElementById("divTable")!.style.display='none';
    document.getElementById("spinner")!.style.display = "block";
    $('#exampleModalCenter').modal('hide'); 

    setTimeout(function (){

        modificarHeroe(indice,"MODIFICAR");
        mostrarHeroes();

        $('#modalOK').modal('show');
        document.getElementById("textoRespuesta")!.innerHTML = "Modificacion exitosa";

      }, 5000); 
    
    
} 

function determinoIndice (idPersonaje:number)
{
    var retorno;
    let heroesStorage:any|null =  JSON.parse(
        localStorage.getItem("LocalHeroes") || "[]"
    )
        ; 

    for (var i = 0; i < heroesStorage.length ; i++) 
    {
       let heroeActual = heroesStorage[i];
       if (heroeActual.id == idPersonaje)
       {retorno = i;}
    }
    return retorno;
}

function mostrarFormulario()
{
    $('#exampleModalCenter').modal('show'); 

    document.getElementById("idHeroe")!.style.display='none';
    document.getElementById("idSeleccionado")!.style.display='block';

    let target = event!.target || event!.srcElement;

    let fila = ( <HTMLElement>( <HTMLElement>event!.target ).parentNode );

    // let fila = target.parentNode;
    let celdas = fila.getElementsByTagName("td");

    //ARMO PERSONAJE
    let idHeroe         =Number(celdas[0].innerHTML);
    let nombreHeroe     =celdas[1].innerHTML;
    let apellidoHeroe   =celdas[2].innerHTML;
    let aliasHeroe      =celdas[3].innerHTML;
    let edadHeroe       =Number(celdas[4].innerHTML);
    let ladoHeroe       =celdas[5].innerHTML;

    let heroeGlobal = new heroe (
        idHeroe      ,
        nombreHeroe  ,
        apellidoHeroe,
        aliasHeroe   ,
        edadHeroe    ,
        ladoHeroe    
      );
      heroeID = heroeGlobal.Id;

      
    (<HTMLInputElement>document.getElementById("idSeleccionado")).value        = celdas[0].innerHTML; 
    (<HTMLInputElement>document.getElementById("nombreHeroe")).value    = celdas[1].innerHTML;
    (<HTMLInputElement>document.getElementById("apellidoHeroe")).value  = celdas[2].innerHTML;
    (<HTMLInputElement>document.getElementById("aliasHeroe")).value     = celdas[3].innerHTML;
    (<HTMLInputElement>document.getElementById("edadHeroe")).value      = celdas[4].innerHTML;
    (<HTMLInputElement>document.getElementById("ladoHeroe")).value      = celdas[5].innerHTML;

    //QUITO BOTON DE AGREGAR
    document.getElementById("btnAgregarConfirm")!.style.display='none';
    document.getElementById("cancelarForm")!.style.display='none';

    //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
    document.getElementById("btnModificar")!.style.display='block';
    document.getElementById("btnEliminar")!.style.display='block';

}


var auxEmpleado;

function modificarHeroe(indice:any , auxEmpleado:any):void
{
    var indice = indice;
    let heroesStorage:any|null =  JSON.parse(
        localStorage.getItem("LocalHeroes") || "[]"
    )
        ; 

    var heroe = JSON.parse(localStorage.LocalHeroes)[indice];

    if (auxEmpleado == "MODIFICAR")
    {

        heroe.nombre     =String($("#nombreHeroe").val());
        heroe.apellido   =String($("#apellidoHeroe").val());
        heroe.alias      =String($("#aliasHeroe").val());
        heroe.edad       =Number($("#edadHeroe").val());

        if ( $("#ladoHeroe").prop("checked") ) {heroe.ladoHeroe = "Heroe";}
        else { heroe.lado = "Villano";}   
    }
    
    armoJSONmodif(indice,heroe);
}

function armoJSON(indice:any,heroe:any)
{
    let HeroesStringNew  = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
    delete HeroesStringNew[indice];
    var objJsonResp = HeroesStringNew.filter(function(x:any) { return x !== null });
    // objJsonResp.push( heroe);
    localStorage.LocalHeroes = "";
    localStorage.setItem("LocalHeroes",JSON.stringify(objJsonResp));
} 

function armoJSONmodif(indice:any,heroe:any)
{
    let HeroesStringNew  = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
    delete HeroesStringNew[indice];
    var objJsonResp = HeroesStringNew.filter(function(x:any) { return x !== null });
    objJsonResp.push(heroe);
    localStorage.LocalHeroes = "";
    localStorage.setItem("LocalHeroes",JSON.stringify(objJsonResp));
} 




}

