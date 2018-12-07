"use strict";
var SegundoPARC;
(function (SegundoPARC) {
    var heroeID;
    $(document).ready(function () {
        mostrarHeroes();
        //Asigno botones por JQUERY
        $("#btnLimpia").click(function () {
            localStorage.clear();
            location.reload();
        });
        $("#cancelarForm").click(function () {
            canceloForm();
        });
        $("#btnAgregarConfirm").click(function () {
            altaPersonaje();
        });
        // $("#btnEliminar").click(function() { 
        //     ejecutarTransaccion("Baja");
        // });
        // $("#btnModificar").click(function() { 
        //     ejecutarTransaccion("Modificacion");
        // });
        // $("#tBodyTable").click(function () {
        //     ejecutarTransaccion("Mostrar");
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
    }); //fin document.ready
    function mostrarHeroes(valor) {
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        var tBodyTable = $('#tBodyTable')[0];
        var seccionPersonajes = "";
        if (valor) {
            //MUESTRO EL LISTADO DE EmpleadoS SEGUN FILTRO
            var stringFinal = heroesStorage
                .filter(function (heroe) {
                var heroeRet = JSON.parse(heroe);
                return heroeRet.tipo == valor;
            })
                .map(function (heroe) {
                var heroeRet = JSON.parse(heroe);
                return heroeRet;
            });
            heroesStorage = stringFinal;
        }
        if ($('#filtrarPor').val() == "todos") {
            location.reload();
        }
        for (var i = 0; i < heroesStorage.length; i++) {
            seccionPersonajes += "<tr><td>" + heroesStorage[i].id + "</td>" +
                "<td>" + heroesStorage[i].nombre + "</td>" +
                "<td>" + heroesStorage[i].apellido + "</td>" +
                "<td>" + heroesStorage[i].alias + "</td>" +
                "<td>" + heroesStorage[i].edad + "</td>" +
                "<td>" + heroesStorage[i].lado + "</td>" +
                "</tr>";
            tBodyTable.innerHTML = seccionPersonajes;
        }
        transicionSpinner();
        //CARGA DE TABLA INICIAL
        document.getElementById("divTable").style.display = 'block';
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
        document.getElementById("spinner").style.display = "none";
        document.getElementById("divTable").style.display = "block";
    }
    function canceloForm() {
        var dirtyFormID = 'formAlta';
        var resetForm = document.getElementById(dirtyFormID);
        resetForm.reset();
    }
    function altaPersonaje() {
        document.getElementById("divTable").style.display = 'none';
        document.getElementById("spinner").style.display = "block";
        $('#exampleModalCenter').modal('hide');
        var flag = true;
        var idHeroe = Number($("#idHeroe").val());
        var nombreHeroe = String($("#nombreHeroe").val());
        var apellidoHeroe = String($("#apellidoHeroe").val());
        var aliasHeroe = String($("#aliasHeroe").val());
        var edadHeroe = Number($("#edadHeroe").val());
        if ($("#ladoHeroe").prop("checked")) {
            var ladoCheck = "Heroe";
        }
        else {
            var ladoCheck = "Villano";
        }
        var heroesLista = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        if (flag == true) {
            var nuevoPersonaje = new SegundoPARC.heroe(idHeroe, nombreHeroe, apellidoHeroe, aliasHeroe, edadHeroe, ladoCheck);
            heroesLista.push(nuevoPersonaje);
            var stringHeroesLista_1 = JSON.stringify(heroesLista);
            setTimeout(function () {
                localStorage.setItem("LocalHeroes", stringHeroesLista_1);
                mostrarHeroes();
                $('#modalOK').modal('show');
                document.getElementById("textoRespuesta").innerHTML = "Alta Exitosa";
            }, 5000);
        }
        else {
            $('#exampleModalCenter').modal('hide');
            $('#modalERROR').modal('show');
        }
        $('#exampleModalCenter').modal('show');
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
        //    heroes.forEach(Programa.hablar);
        //    location.reload();
        //    let unJson = JSON.parse(localStorage.getItem("heroes")); //me dijo el profesor
        //    alert(unJson[0]);
        //    alert(localStorage.getItem("heroes"));
    }
})(SegundoPARC || (SegundoPARC = {}));
