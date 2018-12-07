

namespace SegundoPARC{

    
    let heroeID;
    

    $(document).ready(function () {
        

        // $("#addPopup").click(function () {
      
        // $("#btnModificar").css("visibility","hidden");
        // $("#btnEliminar").css("visibility","hidden");
        // $("#btnAgregar").css("visibility","visible");
        // $("#divTipo").css("visibility","visible");
        // $('#nombreA').attr('value', "");
        // $('#sondioA').attr('value', "");


        // });

        // $("#btnCerrar").click(function () {
        // $("#divOculto1").css("visibility","hidden");
         
        // });

        $("#btnLimpia").click(function () {

            localStorage.clear();
            location.reload();
            
        })


        mostrarHeroes();




        // $("#radGatoA").on("click",function () {
        //     $("#radPerroA").prop("checked",false);
        //     $("#radPajaroA").prop("checked",false);            
        // });
        // $("#radPerroA").on("click",function () {
        //     $("#radGatoA").prop("checked",false);
        //     $("#radPajaroA").prop("checked",false);            
        // });
        // $("#radPajaroA").on("click",function () {
        //     $("#radGatoA").prop("checked",false);
        //     $("#radPerroA").prop("checked",false);
            
        // });

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
        
      


        // $("#btnAgregar").click(function () {
          
        //    // window.location.href="./index2.html"; //Tomo otro html
        //    let nombreA:string = String($("#nombreA").val());
        //    let sondioA:string = String($("#sondioA").val());

        //    let radGatoA:boolean = $("#radGatoA").prop("checked");
        //    let radPerroA:boolean = $("#radPerroA").prop("checked");
        //    //    let radPajaroA:boolean = $("#radPajaroA").prop("checked");


        //     let heroesLista = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");

        //     // let heroes:Array<animal> = new Array<animal>();
        //     // let heroes:JSON;
           

        //    if (radGatoA) {
        //     let unGato: gato = new gato(nombreA,sondioA);
        //     heroesLista.push(JSON.stringify(unGato));       
        //    }
        //    else if (radPerroA) {
        //     let unPerro: perro = new perro(nombreA,sondioA);
        //     heroesLista.push(JSON.stringify(unPerro));
        //    }
        //    else{
        //     let unPajaro: pajaro = new pajaro(nombreA,sondioA);
        //     heroesLista.push(JSON.stringify(unPajaro));
        //    }
        // //    heroes.forEach(Programa.hablar);

        //    let stringHeroesLista = JSON.stringify(heroesLista);
          
        //    localStorage.setItem("LocalHeroes", stringHeroesLista);

        //    location.reload();
        // //    let unJson = JSON.parse(localStorage.getItem("heroes")); //me dijo el profesor
        // //    alert(unJson[0]);
        // //    alert(localStorage.getItem("heroes"));
        // })
       
        
    
    
    });//fin document.ready

    function mostrarHeroes(valor?:any):void {
        let heroesStorage:any|null =  JSON.parse(localStorage.getItem("LocalHeroes") || "[]"); 
        var tBodyTable = $('#tBodyTable')[0];
        var seccionPersonajes:string = "";   
    
        // let stringFinal = heroesString
        //                         .filter(function(empleado){
        //                             let empleadoRet = JSON.parse(empleado);
        //                             return empleadoRet._tipo == valor;
        //                         })
        //                         .map(function(empleado){
        //                             let empleadoRet = JSON.parse(empleado);
        //                             return empleadoRet;
        //                         });   
        // EmpleadosString= stringFinal;
       

        if(valor)
        {
        //MUESTRO EL LISTADO DE EmpleadoS SEGUN FILTRO
           let stringFinal = heroesStorage
                                    .filter(function(animal:any){
                                        let animalRet = JSON.parse(animal);
                                        return animalRet.tipo == valor;
                                    })
                                    .map(function(animal:any){
                                        let animalRet = JSON.parse(animal);
                                        return animalRet;
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

// function eliminarAnimal(idAnimal:number):void
// {
//     var indice = determinoIndice(idAnimal);
//     modificarEmpleado(indice,Clases.estadoCLIEMP.BAJA);
// } 

// function determinoIndice (idEmpleado:number)
// {
//     var retorno;
//     let heroesStorage:string|null =  JSON.parse(localStorage.getItem("LocalHeroes") || "[]"); 
//     for (var i = 0; i < heroesStorage.length ; i++) 
//     {
//        let empleadoActual = JSON.parse(heroesStorage[i]);
//        if (empleadoActual._id == idEmpleado)
//        {retorno = i;}
//     }
//     return retorno;
// }



///SPINNER
function transicionSpinner() {
    document.getElementById("spinner")!.style.display = "none";
}

// function transicion() {
//     if (xml.readyState ==4) 
//     {
//         if (xml.status==200) 
//         {
//             // alert( JSON.parse(xml.response).message );

//             $('#modalOK').modal('show');
//             document.getElementById("textoRespuesta")!.innerHTML = JSON.parse(xml.response).message;

//             document.getElementById("formAlta")!.reset();
//             mostrarHeroes();
//         } 
//         else
//         {document.getElementById("spinner")!.style.display = "none";}
//     }
// }




}

