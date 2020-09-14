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
exports.Llamarfuncion = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var N_Error_1 = require("../Errores/N_Error");
var Llamarfuncion = /** @class */ (function (_super) {
    __extends(Llamarfuncion, _super);
    function Llamarfuncion(id, expresiones, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.expresiones = expresiones;
        return _this;
    }
    Llamarfuncion.prototype.ejecutar = function (entorno) {
        var funcion = entorno.obtenerfuncion(this.id);
        if (funcion == null) {
            throw new N_Error_1.N_Error('Semantico', 'La funcion ' + this.id + " no existe", '', this.linea, this.columna);
        }
        funcion.codigo.ejecutar(entorno);
    };
    Llamarfuncion.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Llamar funcion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        return { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
    };
    return Llamarfuncion;
}(Instruccion_1.Instruccion));
exports.Llamarfuncion = Llamarfuncion;
