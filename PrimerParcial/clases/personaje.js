"use strict";
var SegundoPARC;
(function (SegundoPARC) {
    var personaje = /** @class */ (function () {
        function personaje(Nombre, apellido, edad) {
            this.nombre = Nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Object.defineProperty(personaje.prototype, "Nombre", {
            get: function () { return this.nombre; },
            set: function (v) { this.nombre = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personaje.prototype, "Apellido", {
            get: function () { return this.apellido; },
            set: function (v) { this.apellido = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(personaje.prototype, "Edad", {
            get: function () { return this.edad; },
            set: function (v) { this.edad = v; },
            enumerable: true,
            configurable: true
        });
        personaje.prototype.personajeCompleto = function () {
            return this.nombre + ";" + this.apellido + ";" + this.edad;
        };
        personaje.prototype.toString = function () {
            return this.personajeCompleto();
        };
        return personaje;
    }());
    SegundoPARC.personaje = personaje;
})(SegundoPARC || (SegundoPARC = {}));
