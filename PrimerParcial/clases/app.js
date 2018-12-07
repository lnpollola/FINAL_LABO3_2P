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
        $("#btnEliminar").click(function () {
            var idActual = Number($("#idSeleccionado").val());
            eliminarPersonaje(idActual);
        });
        $("#btnModificar").click(function () {
            var idActual = Number($("#idSeleccionado").val());
            modificarPersonaje(idActual);
        });
        $("#botonAgregarHeroe").click(function () {
            canceloForm();
            //QUITO BOTON DE AGREGAR
            document.getElementById("cancelarForm").style.display = 'block';
            document.getElementById("btnAgregarConfirm").style.display = 'block';
            //ACTIVO BOTONES DE MODIFICAR Y ELIMINAR
            document.getElementById("btnModificar").style.display = 'none';
            document.getElementById("btnEliminar").style.display = 'none';
            //ID PARA DAR DE ALTA
            document.getElementById("idHeroe").style.display = 'block';
            document.getElementById("idSeleccionado").style.display = 'none';
        });
        $("#filtrarPor").change(function () {
            var valorFiltro = $('#filtrarPor').val();
            mostrarHeroes(valorFiltro);
            // tablaAux = undefined;
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
    }); //fin document.ready
    function mostrarHeroes(valor) {
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        var tBodyTable = $('#tBodyTable')[0];
        var seccionPersonajes = "";
        if (valor && valor != 'todos') {
            //MUESTRO EL LISTADO DE EmpleadoS SEGUN FILTRO
            var stringFinal = heroesStorage
                .filter(function (heroe) {
                return heroe.lado == valor;
            })
                .map(function (heroe) {
                return heroe;
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
        //Personaje mas Viejo
        var personajeResult = determinoPersonajeEdad(personajeMasViejo(heroesStorage));
        document.getElementById("personajeViejo").value = personajeResult.alias;
        //Promedio de  edad
        document.getElementById("promedioEdad").value = promedioEdad(heroesStorage);
        transicionSpinner();
        //CARGA DE TABLA INICIAL
        document.getElementById("divTable").style.display = 'block';
    }
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
    function personajeMasViejo(arr) {
        return arr.reduce(function (p, v) {
            return (p < v.edad ? v.edad : p);
        }, 0);
    }
    function promedioEdad(heroes) {
        var acumEdad = heroes
            .reduce(function (actual, siguiente) {
            return actual + siguiente.edad;
        }, 0);
        var cantidad = heroes
            .reduce(function (actual, siguiente) {
            return actual + 1;
        }, 0);
        return (acumEdad / cantidad).toFixed(2);
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
    function eliminarPersonaje(idPersonaje) {
        var indice = determinoIndice(idPersonaje);
        document.getElementById("divTable").style.display = 'none';
        document.getElementById("spinner").style.display = "block";
        $('#exampleModalCenter').modal('hide');
        setTimeout(function () {
            modificarHeroe(indice, "BAJA");
            mostrarHeroes();
            $('#modalOK').modal('show');
            document.getElementById("textoRespuesta").innerHTML = "Baja Exitosa";
        }, 5000);
    }
    function modificarPersonaje(idPersonaje) {
        var indice = determinoIndice(idPersonaje);
        document.getElementById("divTable").style.display = 'none';
        document.getElementById("spinner").style.display = "block";
        $('#exampleModalCenter').modal('hide');
        setTimeout(function () {
            modificarHeroe(indice, "MODIFICAR");
            mostrarHeroes();
            $('#modalOK').modal('show');
            document.getElementById("textoRespuesta").innerHTML = "Modificacion exitosa";
        }, 5000);
    }
    function determinoIndice(idPersonaje) {
        var retorno;
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        for (var i = 0; i < heroesStorage.length; i++) {
            var heroeActual = heroesStorage[i];
            if (heroeActual.id == idPersonaje) {
                retorno = i;
            }
        }
        return retorno;
    }
    function determinoPersonajeEdad(edad) {
        var retorno;
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        for (var i = 0; i < heroesStorage.length; i++) {
            var heroeActual = heroesStorage[i];
            if (heroeActual.edad == edad) {
                retorno = heroeActual;
            }
        }
        return retorno;
    }
    function mostrarFormulario() {
        $('#exampleModalCenter').modal('show');
        document.getElementById("idHeroe").style.display = 'none';
        document.getElementById("idSeleccionado").style.display = 'block';
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
        heroeID = heroeGlobal.Id;
        document.getElementById("idSeleccionado").value = celdas[0].innerHTML;
        document.getElementById("nombreHeroe").value = celdas[1].innerHTML;
        document.getElementById("apellidoHeroe").value = celdas[2].innerHTML;
        document.getElementById("aliasHeroe").value = celdas[3].innerHTML;
        document.getElementById("edadHeroe").value = celdas[4].innerHTML;
        document.getElementById("ladoHeroe").value = celdas[5].innerHTML;
        //QUITO BOTON DE AGREGAR
        document.getElementById("btnAgregarConfirm").style.display = 'none';
        document.getElementById("cancelarForm").style.display = 'none';
        $("#btnModificar").css("display", "block");
        $("#btnEliminar").css("display", "block");
    }
    var auxEmpleado;
    function modificarHeroe(indice, auxEmpleado) {
        var indice = indice;
        var heroesStorage = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        var heroe = JSON.parse(localStorage.LocalHeroes)[indice];
        if (auxEmpleado == "MODIFICAR") {
            heroe.nombre = String($("#nombreHeroe").val());
            heroe.apellido = String($("#apellidoHeroe").val());
            heroe.alias = String($("#aliasHeroe").val());
            heroe.edad = Number($("#edadHeroe").val());
            if ($("#ladoHeroe").prop("checked")) {
                heroe.ladoHeroe = "Heroe";
            }
            else {
                heroe.lado = "Villano";
            }
            armoJSONmodif(indice, heroe);
        }
        else {
            armoJSON(indice, heroe);
        }
    }
    function armoJSON(indice, heroe) {
        var HeroesStringNew = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        delete HeroesStringNew[indice];
        var objJsonResp = HeroesStringNew.filter(function (x) { return x !== null; });
        // objJsonResp.push( heroe);
        localStorage.LocalHeroes = "";
        localStorage.setItem("LocalHeroes", JSON.stringify(objJsonResp));
    }
    function armoJSONmodif(indice, heroe) {
        var HeroesStringNew = JSON.parse(localStorage.getItem("LocalHeroes") || "[]");
        delete HeroesStringNew[indice];
        var objJsonResp = HeroesStringNew.filter(function (x) { return x !== null; });
        objJsonResp.push(heroe);
        localStorage.LocalHeroes = "";
        localStorage.setItem("LocalHeroes", JSON.stringify(objJsonResp));
    }
})(SegundoPARC || (SegundoPARC = {}));
