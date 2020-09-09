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
        var valorizq = this.left.ejecutar(entorno);
        var valorder = this.right.ejecutar(entorno);
        var tipoDominante = this.Tipo_dominante(valorizq.tipo, valorder.tipo);
        if (this.type == Retorno_1.TipoAritmetico.MAS) {
            console.log(tipoDominante);
            if (tipoDominante == Retorno_1.Tipo.STRING)
                return { valor: (valorizq.valor.toString() + valorder.valor.toString()), tipo: Retorno_1.Tipo.STRING };
            else if (tipoDominante == Retorno_1.Tipo.NUMBER)
                return { valor: (valorizq.valor + valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " + " + valorder.valor, this.linea, this.columna);
        }
        else if (this.type == Retorno_1.TipoAritmetico.MENOS) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                return { valor: (valorizq.valor - valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " - " + valorder.valor, this.linea, this.columna);
        }
        else if (this.type == Retorno_1.TipoAritmetico.MULT) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                return { valor: (valorizq.valor * valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " * " + valorder.valor, this.linea, this.columna);
        }
        else if (this.type == Retorno_1.TipoAritmetico.DIV) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                if (valorder.valor != 0)
                    return { valor: (valorizq.valor / valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede dividir entre 0', this.linea, this.columna);
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " / " + valorder.valor, this.linea, this.columna);
        }
        else if (this.type == Retorno_1.TipoAritmetico.POT) {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                return { valor: (Math.pow(valorizq.valor, valorder.valor)), tipo: Retorno_1.Tipo.NUMBER };
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " ** " + valorder.valor, this.linea, this.columna);
        }
        else {
            if (tipoDominante == Retorno_1.Tipo.NUMBER)
                if (valorder.valor != 0)
                    return { valor: (valorizq.valor % valorder.valor), tipo: Retorno_1.Tipo.NUMBER };
                else
                    throw new N_Error_1.N_Error('Semantico', 'No se puede sacar modulo entre 0', this.linea, this.columna);
            else
                throw new N_Error_1.N_Error('Semantico', 'No se puede operar: ' + valorizq.valor + " % " + valorder.valor, this.linea, this.columna);
        }
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
