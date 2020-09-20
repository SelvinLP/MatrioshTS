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
exports.Opeternario = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Opeternario = /** @class */ (function (_super) {
    __extends(Opeternario, _super);
    function Opeternario(condicion, valortrue, valorfalse, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.valortrue = valortrue;
        _this.valorfalse = valorfalse;
        return _this;
    }
    Opeternario.prototype.ejecutar = function (entorno) {
        var condicion = this.condicion.ejecutar(entorno);
        if (condicion.tipo == Retorno_1.Tipo.BOOLEAN) {
            if (condicion.valor == true) {
                return this.valortrue.ejecutar(entorno);
            }
            else {
                return this.valorfalse.ejecutar(entorno);
            }
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'La operacion no es booleana en el If ' + condicion.valor, '', this.linea, this.columna);
        }
    };
    Opeternario.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Operador Terneario\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var resultado = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
        resultado = this.condicion.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        resultado = this.valortrue.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        resultado = this.valorfalse.ejecutarast({ posant: ast.posdes, posdes: resultado.posdes, cadena: resultado.cadena });
        return resultado;
    };
    return Opeternario;
}(Expresion_1.Expresion));
exports.Opeternario = Opeternario;
