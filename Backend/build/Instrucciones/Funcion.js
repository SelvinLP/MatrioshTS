"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(id, parametros, codigo, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.parametros = parametros;
        _this.codigo = codigo;
        return _this;
    }
    Funcion.prototype.ejecutar = function (entorno) {
        entorno.guardarfuncion(this.id, this, this.linea, this.columna);
    };
    return Funcion;
}(Instruccion_1.Instruccion));
exports.Funcion = Funcion;
