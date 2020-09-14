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
exports.Aritmetica = void 0;
var Expresion_1 = require("../Abstracto/Expresion");
var Retorno_1 = require("../Abstracto/Retorno");
var N_Error_1 = require("../Errores/N_Error");
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Aritmetica.prototype.ejecutar = function (entorno) {
        if (this.type != Retorno_1.TipoAritmetico.UMAS && this.type != Retorno_1.TipoAritmetico.UMENOS) {
            var valorizq = this.left.ejecutar(entorno);
            var valorder = this.right.ejecutar(entorno);
            var tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);
            if (this.type == Retorno_1.TipoAritmetico.MAS) {
                if (tipoDominante == Retorno_1.Tipo.STRING)
                    return { valor: (valorizq.valor.toString() + valorder.valor.toString()), tipo: Retorno_1.Tipo.STRING };
                else if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    return { valor: (valorizq.valor + valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " + " + valorder.valor, '', this.linea, this.columna);
            }
            else if (this.type == Retorno_1.TipoAritmetico.MENOS) {
                if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    return { valor: (valorizq.valor - valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " - " + valorder.valor, '', this.linea, this.columna);
            }
            else if (this.type == Retorno_1.TipoAritmetico.MULT) {
                if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    return { valor: (valorizq.valor * valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " * " + valorder.valor, '', this.linea, this.columna);
            }
            else if (this.type == Retorno_1.TipoAritmetico.DIV) {
                if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    if (valorder.valor != 0)
                        return { valor: (valorizq.valor / valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                    else
                        throw new N_Error_1.N_Error('Semantico', 'No se puede dividir entre 0', '', this.linea, this.columna);
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " / " + valorder.valor, '', this.linea, this.columna);
            }
            else if (this.type == Retorno_1.TipoAritmetico.POT) {
                if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    return { valor: (Math.pow(valorizq.valor, valorder.valor)), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " ** " + valorder.valor, '', this.linea, this.columna);
            }
            else {
                if (tipoDominante == Retorno_1.Tipo.NUMBER)
                    if (valorder.valor != 0)
                        return { valor: (valorizq.valor % valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                    else
                        throw new N_Error_1.N_Error('Semantico', 'No se puede sacar modulo entre 0', '', this.linea, this.columna);
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " % " + valorder.valor, '', this.linea, this.columna);
            }
        }
        else { //evitamos el error de validar el lado derecho con umas y u menos
            var valorizq = this.left.ejecutar(entorno);
            if (this.type == Retorno_1.TipoAritmetico.UMENOS) {
                if (valorizq.tipo == Retorno_1.Tipo.NUMBER)
                    return { valor: (valorizq.valor * -1), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: -' + valorizq.valor, '', this.linea, this.columna);
            }
            else {
                if (valorizq.tipo == Retorno_1.Tipo.NUMBER)
                    return { valor: (valorizq.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede operar: +' + valorizq.valor, '', this.linea, this.columna);
            }
        }
    };
    Aritmetica.prototype.ejecutarast = function (ast) {
        var Cadena = ast.cadena + "\n";
        Cadena += ast.posdes + " [label =\"Expresion\"];\n";
        Cadena += ast.posant + " -> " + ast.posdes + ";\n";
        var result;
        if (this.type != Retorno_1.TipoAritmetico.UMAS && this.type != Retorno_1.TipoAritmetico.UMENOS) {
            result = this.left.ejecutarast({ posant: ast.posdes, posdes: ast.posdes + 1, cadena: Cadena });
            if (this.type == Retorno_1.TipoAritmetico.MAS) {
                result.cadena += result.posdes + " [label =\"+\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else if (this.type == Retorno_1.TipoAritmetico.MENOS) {
                result.cadena += result.posdes + " [label =\"-\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else if (this.type == Retorno_1.TipoAritmetico.MULT) {
                result.cadena += result.posdes + " [label =\"*\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else if (this.type == Retorno_1.TipoAritmetico.DIV) {
                result.cadena += result.posdes + " [label =\"/\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else if (this.type == Retorno_1.TipoAritmetico.POT) {
                result.cadena += result.posdes + " [label =\"**\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            else {
                result.cadena += result.posdes + " [label =\"%\"];\n";
                result.cadena += ast.posdes + " -> " + result.posdes + ";\n";
            }
            result = this.right.ejecutarast({ posant: ast.posdes, posdes: result.posdes + 1, cadena: result.cadena });
        }
        else {
            result = this.left.ejecutarast(ast);
            var Cadena_1 = result.cadena + "\n";
            if (this.type == Retorno_1.TipoAritmetico.UMENOS) {
                Cadena_1 += result.posdes + " [label =\"Umenos\"];\n";
                Cadena_1 += ast.posant + " -> " + result.posdes + ";\n";
            }
            else {
                Cadena_1 += result.posdes + " [label =\"Umas\"];\n";
                Cadena_1 += ast.posant + " -> " + result.posdes + ";\n";
            }
            result = { posant: result.posdes, posdes: result.posdes + 1, cadena: Cadena_1 };
        }
        return result;
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
