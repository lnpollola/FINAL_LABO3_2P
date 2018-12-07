"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SegundoPARC;
(function (SegundoPARC) {
    var heroe = /** @class */ (function (_super) {
        __extends(heroe, _super);
        function heroe(id, nombre, apellido, alias, edad, lado) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.id = id;
            _this.alias = alias;
            _this.lado = lado;
            return _this;
        }
        Object.defineProperty(heroe.prototype, "Id", {
            get: function () { return this.id; },
            set: function (v) { this.id = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(heroe.prototype, "Alias", {
            get: function () { return this.alias; },
            set: function (v) { this.alias = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(heroe.prototype, "Lado", {
            get: function () { return this.lado; },
            set: function (v) { this.lado = v; },
            enumerable: true,
            configurable: true
        });
        //GETTERS
        heroe.prototype.heroeCompleto = function () {
            return _super.prototype.personajeCompleto.call(this) + ";" + this.Id + ";" + this.Alias + ";" + this.Lado + ";";
        };
        heroe.prototype.toString = function () {
            return JSON.stringify(this.heroeCompleto());
        };
        return heroe;
    }(SegundoPARC.personaje));
    SegundoPARC.heroe = heroe;
})(SegundoPARC || (SegundoPARC = {}));
