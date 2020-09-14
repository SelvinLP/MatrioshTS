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
exports.Relacional = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Relacional.prototype.ejecutar = function (entorno) {
        var valorizq = this.left.ejecutar(entorno);
        var valorder = this.right.ejecutar(entorno);
        if (this.type == Retorno_1.TipoRelacional.MAYORQUE) {
            var resultado = valorizq.valor > valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == Retorno_1.TipoRelacional.MENORQUE) {
            var resultado = valorizq.valor < valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == Retorno_1.TipoRelacional.MAYORIGUAL) {
            var resultado = valorizq.valor >= valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == Retorno_1.TipoRelacional.MENORIGUAL) {
            var resultado = valorizq.valor <= valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == Retorno_1.TipoRelacional.IGUAL) {
            var resultado = valorizq.valor == valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == Retorno_1.TipoRelacional.DIFERENCIA) {
            var resultado = valorizq.valor != valorder.valor;
            return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
        }
        else {
            throw new N_Error_1.N_Error('Semantico', 'No se reconoce el operador relacional', '', this.linea, this.columna);
        }
    };
    Relacional.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        result = this.left.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
        if (this.type == Retorno_1.TipoRelacional.DIFERENCIA) {
            result.cadena += result.posdes + " [label =\"DIFERENTE\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        else if (this.type == Retorno_1.TipoRelacional.IGUAL) {
            result.cadena += result.posdes + " [label =\"IGUAL\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        else if (this.type == Retorno_1.TipoRelacional.MAYORIGUAL) {
            result.cadena += result.posdes + " [label =\"MAYOR IGUAL\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        else if (this.type == Retorno_1.TipoRelacional.MAYORQUE) {
            result.cadena += result.posdes + " [label =\"MAYOR QUE\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        else if (this.type == Retorno_1.TipoRelacional.MENORIGUAL) {
            result.cadena += result.posdes + " [label =\"MENOR IGUAL\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        else if (this.type == Retorno_1.TipoRelacional.MENORQUE) {
            result.cadena += result.posdes + " [label =\"MENOR QUE\"];\n";
            result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
        }
        result = this.right.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        return result;
    };
    return Relacional;
}(Expresion_1.Expresion));
exports.Relacional = Relacional;
