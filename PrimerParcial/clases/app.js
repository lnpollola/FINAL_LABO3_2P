"use strict";
var SegundoPARC;
(function (SegundoPARC) {
    var heroeID;
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
        });
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
    }); //fin document.ready
    function mostrarHeroes(valor) {
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        var tBodyTable = $('#tBodyTable')[0];
        var seccionPersonajes = "";
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
        if (valor) {
            //MUESTRO EL LISTADO DE EmpleadoS SEGUN FILTRO
            var stringFinal = heroesStorage
                .filter(function (animal) {
                var animalRet = JSON.parse(animal);
                return animalRet.tipo == valor;
            })
                .map(function (animal) {
                var animalRet = JSON.parse(animal);
                return animalRet;
            });
            heroesStorage = stringFinal;
        }
        // $("#optionNull").
        if ($('#filtrarPor').val() == "todos") {
            location.reload();
        }
        for (var i = 0; i < heroesStorage.length; i++) {
            // let animalActual = JSON.parse(heroesStorage[i]);
            var animalActual = void 0;
            if (valor) {
                animalActual = heroesStorage[i];
            }
            else {
                animalActual = JSON.parse(heroesStorage[i]);
            }
            seccionPersonajes += "<tr>      <td hidden>" + animalActual.ID + "</td>" +
                "<td class='col1'>" + animalActual.nombre + "</td>" +
                "<td class='col2'>" + animalActual.cantPatas + "</td>" +
                "<td class='col3'>" + animalActual.tipo + "</td>" +
                "<td class='col4'>" + animalActual.ruido + "</td>" +
                //   "<td>" +      personasCompleto[i].apellido + "</td>" +
                //   "<td>" +      personasCompleto[i].fecha    + "</td>" +
                //   "<td>" +      personasCompleto[i].sexo     + "</td>"+
                //   "<td>" + "<img src='"+ personasCompleto[i].foto + "'id='imgMuestro' height='80'>"+
                //   "<input type='file' "+" hidden>"+"</td>"+
                // "<td>"+"<button class='btn btn-outline-warning' data-toggle='modal' data-target='#myModal' id='addPopup' hidden=>Modificar"+"<i class='fa fa-folder'></i>"+"</button>"+
                // "<button class='btn btn-outline-danger' data-toggle='modal' data-target='#myModal' id='addPopup'>Eliminar"+"<i class='fa fa-trash'></i></button></td>"+
                "</tr>";
            tBodyTable.innerHTML = seccionPersonajes;
        }
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
})(SegundoPARC || (SegundoPARC = {}));
