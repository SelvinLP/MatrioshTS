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
exports.Imprimir = void 0;
var Instruccion_1 = require("../Abstracto/Instruccion");
var L_Print_1 = require("../Otros/L_Print");
var Imprimir = /** @class */ (function (_super) {
    __extends(Imprimir, _super);
    function Imprimir(value, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.value = value;
        return _this;
    }
    Imprimir.prototype.ejecutar = function (entorno) {
        var resultado = this.value.ejecutar(entorno);
        console.log(resultado);
        L_Print_1.L_Print.push(resultado.valor);
    };
    Imprimir.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Console.log\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        //Expresion
        try {
            result = this.value.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
        }
        catch (error) {
        }
        return result;
    };
    return Imprimir;
}(Instruccion_1.Instruccion));
exports.Imprimir = Imprimir;
