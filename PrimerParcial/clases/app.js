"use strict";
var SegundoPARC;
(function (SegundoPARC) {
    var heroeID;
    //Creo un Héroe Global para manejar datos
    var heroeGlobal = { "id": "", "nombre": "", "apellido": "", "alias": "", "edad": "", "lado": "" };
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
        $("#btnEliminar").click(function () {
            var idActual = Number(heroeGlobal.id);
            eliminarPersonaje(idActual);
        });
        $("#botonAgregarHeroe").click(function () {
            canceloForm();
            //QUITO BOTON DE AGREGAR
            document.getElementById("cancelarForm").style.display = 'block';
            document.getElementById("btnAgregarConfirm").style.display = 'block';
            //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
            document.getElementById("btnModificar").style.display = 'none';
            document.getElementById("btnEliminar").style.display = 'none';
            traigoUltimoID();
        });
        // $("#btnModificar").click(function() { 
        //     ejecutarTransaccion("Modificacion");
        // });
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
    }
    // function eliminarHeroe(heroe) {
    //     var data = {
    //         "collection":"heroes",
    //         "id": heroe.id
    //     }
    //     //AGREGAR CODIGO PARA ELIMINAR EL HEROE
    //     var spinner = document.getElementById("spinner");
    //     spinner.style.visibility = "visible";
    //     xml.open("POST","http://localhost:3000/eliminar",true);
    //     xml.onreadystatechange = function() {
    //         if (xml.readyState == 4) {
    //         transicion();
    //         }
    //     };
    //     xml.setRequestHeader('Content-Type', 'application/json');
    //     xml.send(JSON.stringify(data));
    //     document.getElementById("spinner").style.display = "block";
    //     document.getElementById("divTable").style.display='none';
    //     $('#exampleModalCenter').modal('hide'); 
    // }
    function eliminarPersonaje(idPersonaje) {
        var indice = determinoIndice(idPersonaje);
        modoficarHeroe(indice, "BAJA");
    }
    function determinoIndice(idPersonaje) {
        var retorno;
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        for (var i = 0; i < heroesStorage.length; i++) {
            var heroeActual = JSON.parse(heroesStorage[i]);
            if (heroeActual.id == idPersonaje) {
                retorno = i;
            }
        }
        return retorno;
    }
    function mostrarFormulario() {
        $('#exampleModalCenter').modal('show');
        var target = event.target || event.srcElement;
        var fila = event.target.parentNode;
        // let fila = target.parentNode;
        var celdas = fila.getElementsByTagName("td");
        //ARMO PERSONAJE
        var idHeroe = Number(celdas[0].innerHTML);
        var nombreHeroe = celdas[1].innerHTML;
        var apellidoHeroe = celdas[2].innerHTML;
        var aliasHeroe = celdas[3].innerHTML;
        var edadHeroe = Number(celdas[4].innerHTML);
        var ladoHeroe = celdas[5].innerHTML;
        var heroeGlobal = new SegundoPARC.heroe(idHeroe, nombreHeroe, apellidoHeroe, aliasHeroe, edadHeroe, ladoHeroe);
        document.getElementById("idHeroe").value = celdas[0].innerHTML;
        document.getElementById("nombreHeroe").value = celdas[1].innerHTML;
        document.getElementById("apellidoHeroe").value = celdas[2].innerHTML;
        document.getElementById("aliasHeroe").value = celdas[3].innerHTML;
        document.getElementById("edadHeroe").value = celdas[4].innerHTML;
        document.getElementById("ladoHeroe").value = celdas[5].innerHTML;
        //QUITO BOTON DE AGREGAR
        document.getElementById("btnAgregarConfirm").style.display = 'none';
        document.getElementById("cancelarForm").style.display = 'none';
        //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
        document.getElementById("btnModificar").style.display = 'block';
        document.getElementById("btnEliminar").style.display = 'block';
    }
    var auxEmpleado;
    function modoficarHeroe(indice, auxEmpleado) {
        var indice = indice;
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        var heroe = JSON.parse(JSON.parse(localStorage.LocalHeroes)[indice]);
        if (auxEmpleado == "MODIFICAR") {
            // persona._nombre = String ($('#nombre').val());
            // persona._edad   = Number ($('#edad').val());
            // persona._sexo   = String ($('#sexo').val());
            // persona._tipo  = tipoEMP ; 
            // persona._clave  = String ($('#ClaveUsuario').val());
            // var fechaIniciocontrato =  String ($('#fechaDesde').val());
            // if(fechaIniciocontrato=="")
            // {
            //     persona._fechaDesde = new Date().toLocaleDateString();
            // } 
            // else
            // { 
            //     persona._fechaDesde = fechaIniciocontrato;
            // }
            // persona._fechaHasta = String ($('#fechaHasta').val());;
        }
        else {
            // persona._estado = auxEmpleado;
        }
        armoJSON(indice, heroe);
    }
    function armoJSON(indice, heroe) {
        var HeroesStringNew = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        delete HeroesStringNew[indice];
        var objJsonResp = HeroesStringNew.filter(function (x) { return x !== null; });
        objJsonResp.push(JSON.stringify(heroe));
        localStorage.LocalHeroes = "";
        localStorage.setItem("Empleados", JSON.stringify(objJsonResp));
    }
})(SegundoPARC || (SegundoPARC = {}));
