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
Object.defineProperty(exports, "__esModule", { value: true });
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Logica = /** @class */ (function (_super) {
    __extends(Logica, _super);
    function Logica(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Logica.prototype.ejecutar = function (entorno) {
        if (this.right != null) {
            var valorizq = this.left.ejecutar(entorno);
            var valorder = this.right.ejecutar(entorno);
            if (this.type == Retorno_1.TipoLogica.AND) {
                if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN || valorder.tipo != Retorno_1.Tipo.BOOLEAN) {
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " && " + valorder.valor, '', this.linea, this.columna);
                }
                else {
                    var resultado = valorizq.valor && valorder.valor;
                    return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
                }
            }
            else {
                if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN || valorder.tipo != Retorno_1.Tipo.BOOLEAN) {
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " || " + valorder.valor, '', this.linea, this.columna);
                }
                else {
                    var resultado = valorizq.valor || valorder.valor;
                    return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
                }
            }
        }
        else {
            //Validamos el not
            var valorizq = this.left.ejecutar(entorno);
            if (valorizq.tipo != Retorno_1.Tipo.BOOLEAN) {
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: !' + valorizq.valor, '', this.linea, this.columna);
            }
            else {
                var resultado = !valorizq.valor;
                return { valor: resultado, tipo: Retorno_1.Tipo.BOOLEAN };
            }
        }
    };
    Logica.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        if (this.right != null) {
            result = this.left.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
            if (this.type == Retorno_1.TipoLogica.AND) {
                result.cadena += result.posdes + " [label =\"AND\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else { //or
                result.cadena += result.posdes + " [label =\"OR\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            result = this.right.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        }
        else {
            if (this.type == Retorno_1.TipoLogica.NOT) {
                Cadena += (ast.posdes + 1) + " [label =\"!\"];\n";
                Cadena += ast.posdes + " -> " + (ast.posdes + 1) + ";\n";
                result = this.left.ejecutarast({ posant: ast.posdes + 1, posdes: ast.posdes + 2, cadena: Cadena });
            }
            else {
                result = { posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena };
            }
        }
        return result;
    };
    return Logica;
}(Expresion_1.Expresion));
exports.Logica = Logica;
